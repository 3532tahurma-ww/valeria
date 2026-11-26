/*
 * Valeria - 🎬 scenes and 📖 episodes engine (data: js/data/scenes.js), like Carmen's actStep / epStep
 * Scene state per letter: state.botScene[thread id] = { id, done: [ids], idle } (Valeria-only field).
 * step() runs after each bot answer with the id your letter triggered (Bot.match: event, question or command):
 *   no scene → id is the `open` of a scene she can do → it starts (the next scene of her episode first)
 *   in a scene → a step not done yet counts ('seq': only the next one); when enough are done, `fin` completes it (no fin → at once)
 *     fin too early → ends without completing · 'stop' → ends · another act → idle +1, idle > ttl → breaks
 *   completed → her memory mem.scenes[id] = times, and the episode advances
 * Episodes in her memory: mem.ep = { id, i } (i = index of the next scene), mem.eps[id] = finish time, mem.epSeen = [offered ids]
 *   open when: tier (EP_TIERS need = different scenes completed with her) + after (episodes finished) + every scene usable for her
 *   finishing an episode's first scene starts it; its next scene advances it; the last one ends it 🎉
 *   → { st, notes, lines, effect, kinds: SCENE_NOTES keys that happened ('open', 'end', 'fail', 'epEnd'…; js/feel.js reads them) }
 * offer(): a line she adds when your letter matched nothing: the next scene of her episode, a new episode (once), or a scene.
 */
window.Valeria = window.Valeria || {};

Valeria.Scenes = (() => {
  const V = Valeria;
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const byId = id => (V.SCENES || []).find(s => s.id === id);
  const epById = id => (V.EPISODES || []).find(e => e.id === id);
  const evById = id => V.EVENTS.events.find(e => e.id === id);
  const fitsId = (id, char) => { const e = evById(id); return !!e && V.Bot.fits(char, e); };
  const stepsOf = (sc, char) => sc.steps.filter(id => fitsId(id, char));
  const needOf = (sc, char) => (sc.mode === 'seq' ? stepsOf(sc, char).length : Math.min(sc.need || 1, stepsOf(sc, char).length));
  const usable = (sc, char) => !!sc && fitsId(sc.open, char) && (!sc.fin || fitsId(sc.fin, char)) && stepsOf(sc, char).length >= (sc.mode === 'seq' ? 1 : (sc.need || 1));
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
  const dots = (n, of) => '●'.repeat(Math.min(n, of)) + '○'.repeat(Math.max(0, of - n));
  const label = (sc, L) => `${sc.icon} ${sc.name[L]}`;
  const evLabel = (id, L) => { const e = evById(id); return e ? `${e.icon} ${e.name[L]}` : id; };

  // progress of the scene in a letter → { sc, n, need, ready }
  function progress(st, char) {
    const sc = st && byId(st.id);
    if (!sc) return null;
    const need = needOf(sc, char);
    return { sc, n: st.done.length, need, ready: st.done.length >= need };
  }
  // what to do next in the scene (⚡ bar, advisor): the steps left ('seq': the next one), or the finish when ready
  function next(st, char) {
    const p = progress(st, char);
    if (!p) return [];
    if (p.ready) return p.sc.fin ? [p.sc.fin] : [];
    const left = stepsOf(p.sc, char).filter(id => !st.done.includes(id));
    return p.sc.mode === 'seq' ? left.slice(0, 1) : left;
  }

  const doneCount = mem => Object.keys((mem && mem.scenes) || {}).filter(byId).length;
  const tierOf = n => (V.EP_TIERS || []).find(x => x.n === n);
  const epOk = (ep, char, mem) => {
    const t = tierOf(ep.tier), m = mem || {};
    return (!t || doneCount(m) >= t.need) && (ep.after || []).every(id => (m.eps || {})[id]) && ep.scenes.every(id => usable(byId(id), char));
  };
  // the scene her episode waits for (or null)
  function epNext(mem) {
    const E = mem && mem.ep && epById(mem.ep.id);
    return E ? byId(E.scenes[mem.ep.i]) : null;
  }

  function step({ st, id, char, mem, lang }) {
    const L = lang === 'fr' ? 'fr' : 'en', N = V.SCENE_NOTES, notes = [], lines = [], kinds = [];
    let effect = '';
    const note = (k, o) => { kinds.push(k); notes.push(fmt(N[k][L], o)); };
    const her = k => { const a = (V.SCENE_LINES[k] || {})[L]; if (a && a.length) lines.push(pick(a)); };
    const out = s => ({ st: s, notes, lines, effect, kinds });
    const ev = id && evById(id);
    if (!ev) return out(st);

    const complete = sc => {
      mem.scenes = mem.scenes || {};
      mem.scenes[sc.id] = (mem.scenes[sc.id] || 0) + 1;
      note('end', { name: label(sc, L), end: sc.end[L] });
      effect = 'hearts';
      episode(sc.id);
      return out(null);
    };
    const episode = scId => {
      mem.eps = mem.eps || {};
      const E = mem.ep && epById(mem.ep.id);
      if (E) {
        if (E.scenes[mem.ep.i] !== scId) return;
        mem.ep.i++;
        if (mem.ep.i >= E.scenes.length) {
          mem.eps[E.id] = Date.now();
          delete mem.ep;
          note('epEnd', { name: label(E, L), end: E.end[L] });
          effect = 'fireworks';
        } else note('epStep', { name: label(E, L), n: mem.ep.i, of: E.scenes.length, next: label(byId(E.scenes[mem.ep.i]), L) });
        return;
      }
      const cand = (V.EPISODES || []).filter(e => e.scenes[0] === scId && !mem.eps[e.id] && epOk(e, char, mem));
      if (!cand.length) return;
      const e = cand.find(x => (mem.epSeen || []).includes(x.id)) || cand[0];
      mem.ep = { id: e.id, i: 1 };
      note('epStart', { name: label(e, L), of: e.scenes.length, next: label(byId(e.scenes[1]), L) });
    };

    if (st) {
      const p = progress(st, char);
      if (!p) return out(null);
      const sc = p.sc, nm = label(sc, L);
      if (id === 'stop') { note('stop', { name: nm }); return out(null); }
      if (sc.fin && id === sc.fin) {
        if (p.ready) return complete(sc);
        note('early', { name: nm }); her('early');
        return out(null);
      }
      if (!p.ready && next(st, char).includes(id)) {
        st.done.push(id);
        st.idle = 0;
        if (st.done.length < p.need) note('step', { name: nm, dots: dots(st.done.length, p.need), n: st.done.length, need: p.need });
        else if (!sc.fin) return complete(sc);
        else { note('ready', { name: nm, fin: evLabel(sc.fin, L) }); her('ready'); }
        return out(st);
      }
      if (id === sc.open || sc.steps.includes(id) || ev.kind !== 'act') return out(st);
      st.idle = (st.idle || 0) + 1;
      if (st.idle > (sc.ttl || 4)) { note('fail', { name: nm }); her('fail'); return out(null); }
      return out(st);
    }

    // a new scene: her episode's next one first, then the one done least
    const want = epNext(mem);
    const opts = (V.SCENES || []).filter(s => s.open === id && usable(s, char));
    if (!opts.length) return out(null);
    const times = s => ((mem.scenes || {})[s.id] || 0);
    const sc = (want && opts.includes(want)) ? want : opts.sort((a, b) => times(a) - times(b))[0];
    const need = needOf(sc, char);
    note('open', { name: label(sc, L), dots: dots(0, need), need });
    return out({ id: sc.id, done: [], idle: 0 });
  }

  // her offer when nothing matched → { line, id: event that starts it } or null (marks a new episode as offered)
  function offer({ st, char, mem, lang }) {
    if (st) return null;
    const L = lang === 'fr' ? 'fr' : 'en', m = mem || {};
    const E = m.ep && epById(m.ep.id), nx = epNext(m);
    if (E && nx) return { line: (E.next[L] || [])[m.ep.i - 1] || pick(nx.ask[L]), id: nx.open };
    const fresh = (V.EPISODES || []).filter(e => !(m.eps || {})[e.id] && !(m.epSeen || []).includes(e.id) && epOk(e, char, m));
    if (fresh.length) {
      const e = fresh[0];
      m.epSeen = (m.epSeen || []).concat(e.id);
      return { line: pick(e.ask[L]), id: byId(e.scenes[0]).open };
    }
    const scs = (V.SCENES || []).filter(s => usable(s, char));
    if (!scs.length) return null;
    const least = Math.min(...scs.map(s => (m.scenes || {})[s.id] || 0));
    const sc = pick(scs.filter(s => ((m.scenes || {})[s.id] || 0) === least));
    return { line: pick(sc.ask[L]), id: sc.open };
  }

  return { byId, epById, progress, next, step, offer, epNext, epOk, usable, needOf, stepsOf, doneCount, tierOf, label };
})();
