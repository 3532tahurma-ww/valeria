/*
 * Valeria - bot mode engine
 * Data: js/data/events.js (Valeria.EVENTS), js/data/talk.js (questions, ASKS, TOPICS, DURING, ECHO), js/data/origins.js (homeland)
 *
 * Event: { id, kind, cat, icon, prio, effect, traits, gender, chars, origin,
 *          name: {en, fr}, when: {en: [], fr: []}, reply: {en: [], fr: []}, variants: [...], counter: [ask ids] }
 *   kind 'talk' : just a reply (greeting, compliment, questions…), the current event does not change
 *   kind 'act'  : starts / switches the current event; a "❦ 💋 Kissing ❦" note is added when it changes
 *   kind 'cmd'  : only used when no talk/act matched. 'again' repeats the current event, 'stop' ends it
 * Conditions (on an event = it only matches for such characters; on a variant = these lines replace the base ones):
 *   traits: ['Shy', 'Bold|Passionate']  ALL items; "a|b" = either one
 *   gender: '♂' | '♀'    chars: ['Isabeau'] (full or first name)    origin: ['scotland', 'realm:fr'] (homeland region / realm)
 *   Most specific variant wins (trait ×2, gender 1, origin 2, chars 3); a variant missing the language falls back to the base lines.
 * Triggers (when): both languages. 'kiss' = word starting with it; '=fair' = whole word. Accents / case / apostrophes ignored.
 * Scoring: longest trigger; prio +100 per level; conditions +10 per specificity point.
 *
 * Turn order in respond():
 *   1. she asked a question last turn (asked) and you did not start an act → her ASK is answered (yes / no / other / place)
 *   2. talk or act event → its lines; questions may get a counter question (counter, 40%); normal talk 10% her own question;
 *      climax / cuddle 35% an 'after' question; talk 15% a homeland bubble
 *   3. command (again / faster / slower / stop / name / look)
 *   4. fallback linked to the topic: TOPICS word → topic line; in an act → DURING; else 30% her question, 20% ECHO of a long word,
 *      12% homeland line, 10% homeland proverb, else fallback lines (with personality variants)
 *   🌍 homeReact after every event: greeting / farewell in her tongue, her oath on strong moments, a line when her land likes / dislikes it
 * Placeholders: {sen}/{you} user, {ben}/{me} her name, {city} {region} {house} {title} {age} {food} {drink} {oath} {custom} {event} {word} {place} {placecustom}
 *   homeland: {pet} {saint} {feast} {song} {proverb} {greetword} {byeword}
 *   ⚔️ {chron}: the latest event of 1415 from her side (js/data/chronicle.js); plain fallback 15% mentions it within 7 days
 */
window.Valeria = window.Valeria || {};

Valeria.Bot = (() => {
  const V = Valeria;
  const norm = s => ' ' + String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/(\p{L})\1{2,}/gu, '$1$1')
    .replace(/\s+/g, ' ').trim() + ' ';
  const lower = s => String(s || '').toLowerCase().trim();
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const roll = p => Math.random() < p;

  const regionOf = c => (V.Gen && c ? V.Gen.regionOf(c) : '');
  const regionObj = id => (V.REGIONS || []).find(r => r.id === id);

  function fits(char, req) {
    const tr = (char && char.traits) || [];
    if (req.traits && req.traits.length && !req.traits.every(x => String(x).split('|').some(a => tr.includes(a.trim())))) return false;
    if (req.gender && ((char && char.gender) || '♀') !== req.gender) return false;
    if (req.chars && req.chars.length) {
      const nm = lower(char && char.name);
      if (!req.chars.some(n => nm === lower(n) || nm.split(' ')[0] === lower(n))) return false;
    }
    if (req.origin && req.origin.length) {
      const id = regionOf(char), r = regionObj(id);
      if (!req.origin.some(o => o === id || (r && o === 'realm:' + r.realm))) return false;
    }
    return true;
  }
  const spec = r => ((r.traits || []).length * 2) + (r.gender ? 1 : 0) + ((r.origin || []).length ? 2 : 0) + ((r.chars || []).length ? 3 : 0);

  // does the normalized text contain trigger w ('=' = whole word)?
  function hitLen(text, w) {
    const whole = w[0] === '=';
    const k = norm(whole ? w.slice(1) : w).trim();
    return k && text.includes(' ' + k + (whole ? ' ' : '')) ? k.length : 0;
  }
  function score(ev, text) {
    let best = 0;
    ['en', 'fr'].forEach(l => ((ev.when || ev.words || {})[l] || []).forEach(w => {
      const k = hitLen(text, w);
      if (k) best = Math.max(best, k + (ev.prio || 0) * 100);
    }));
    return best ? best + spec(ev) * 10 : 0;
  }
  function best(list, text, char) {
    let top = null, topS = 0;
    list.forEach(ev => {
      if (!fits(char, ev)) return;
      const s = score(ev, text);
      if (s > topS) { topS = s; top = ev; }
    });
    return top;
  }

  // reply lines in language L, from the most specific fitting variant
  function lines(obj, L, char) {
    const vs = (obj.variants || []).filter(v => fits(char, v) && v.reply && (v.reply[L] || []).length);
    if (vs.length) {
      const top = Math.max(...vs.map(spec));
      return pick(vs.filter(v => spec(v) === top)).reply[L];
    }
    return obj.reply ? obj.reply[L] : obj[L];
  }

  const yesNo = n => {
    const has = list => list.some(w => n.includes(' ' + norm(w).trim() + ' '));
    const no = has(V.NO || []), yes = has(V.YES || []);
    return no ? 'no' : yes ? 'yes' : '';
  };

  // a map place named in the text → { name, id }
  function findPlace(n, L) {
    let found = null;
    (V.REGIONS || []).forEach(r => {
      r.cities.forEach(c => { const k = norm(c[0]).trim(); if (k && n.includes(' ' + k + ' ') && (!found || k.length > found.k)) found = { name: c[0], id: r.id, k: k.length }; });
      ['en', 'fr'].forEach(l => [r.name[l], (r.short || {})[l]].filter(Boolean).forEach(nm => {
        const k = norm(nm).trim();
        if (k && n.includes(' ' + k + ' ') && (!found || k.length > found.k)) found = { name: r.name[L], id: r.id, k: k.length };
      }));
    });
    return found;
  }

  // the longest unusual word of the message, as typed
  function echoWord(text) {
    const stop = new Set((V.STOP || []).concat(V.YES || [], V.NO || []).map(w => norm(w).trim()));
    const words = String(text || '').split(/[^\p{L}'-]+/u).filter(w => w.length >= 6 && !stop.has(norm(w).trim()));
    return words.sort((a, b) => b.length - a.length)[0] || '';
  }

  function varsFor(char, L, you, current) {
    const i = L === 'fr' ? 1 : 0, reg = regionObj(regionOf(char)), O = (V.ORIGINS || {})[reg && reg.id] || {};
    const h = (V.HOUSES || []).find(x => x.id === (char && char.house));
    const ev = current && V.EVENTS.events.find(e => e.id === current);
    const o = (k, d) => (O[k] || d)[i];
    return {
      sen: you || '', you: you || '', ben: (char && char.name) || '', me: (char && char.name) || '',
      city: (char && char.city) || (L === 'fr' ? 'un petit bourg' : 'a little town'),
      region: reg ? reg.name[L] : (L === 'fr' ? 'un pays lointain' : 'a faraway land'),
      house: h ? h.name[L] : (L === 'fr' ? 'maison sans nom' : 'nameless house'),
      title: (char && char.job) || (L === 'fr' ? 'une dame' : 'a lady'),
      age: (char && char.age) || '?',
      food: o('food', ['bread and honey', 'pain et miel']), drink: o('drink', ['wine', 'vin']),
      oath: o('oath', ['By all the saints!', 'Par tous les saints !']), custom: o('custom', ['the bells ring for every feast', 'les cloches sonnent à chaque fête']),
      event: ev ? ev.name[L] : '', word: '', place: '', placecustom: '',
      // 🌍 homeland voice (js/data/homeland.js)
      pet: o('pet', ['my dear', 'mon cher']), saint: o('saint', ['all the saints', 'tous les saints']), feast: o('feast', ['the harvest feast', 'la fête des moissons']),
      song: o('song', ['an old ballad', 'une vieille ballade']), proverb: o('proverb', ['Slowly goes far', 'Qui va lentement va loin']),
      greetword: o('greet', ['Good morrow', 'Bonjour']), byeword: o('bye', ['Farewell', 'Adieu']),
      // ⚔️ the latest event of 1415, as her land sees it (js/data/chronicle.js)
      chron: V.Chronicle ? V.Chronicle.line(char, L, null, you) : ''
    };
  }
  const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m));

  const askById = id => (V.ASKS || []).find(a => a.id === id);
  const askPool = (when, char, ids) => (V.ASKS || []).filter(a => (ids ? ids.includes(a.id) : a.when === when) && fits(char, a));
  // her questions asked right after an event (ask.on = [event ids])
  const askOn = (evId, char) => (V.ASKS || []).filter(a => a.on && a.on.includes(evId) && fits(char, a));
  // character + your own pseudo-traits ("Dick Size: Large" from 👑 Me), like Carmen
  const withUser = (char, userTraits) => (userTraits && userTraits.length ? Object.assign({}, char, { traits: ((char && char.traits) || []).concat(userTraits) }) : char);

  /*
   * → { event, sys, replies: [bubbles], effect, ask: id of the question she just asked (or null),
   *     rec: { ev: event / question id you triggered, ans: { id, val } your answer to her question } → stored in her memory by the app }
   * mem: her memory (character.mem: { first: {id: ts}, count: {id: n}, asks: {askId: 'yes'|'no'|text} }), gapDays: days since your last letter
   */
  function respond({ text, char: char0, lang, current, you, asked, mem, gapDays, userTraits }) {
    const char = withUser(char0, userTraits), M = mem || {}, MEM = V.MEMORY || {};
    const D = V.EVENTS, L = lang === 'fr' ? 'fr' : 'en', n = norm(text);
    const evs = D.events, cur = current ? evs.find(e => e.id === current) : null;
    const v = varsFor(char, L, you, current);
    const O = (V.ORIGINS || {})[regionOf(char)];
    let event = cur ? cur.id : null, sys = '', ls = null, effect = '', ask = null;
    const rec = { ev: null, ans: null };
    const evName = id => { const e = evs.find(x => x.id === id); return e ? e.name[L] : id; };
    const fmtDate = ts => new Date(ts).toLocaleDateString(L, { day: 'numeric', month: 'long' });
    const memLine = (arr, extra) => { if (arr && arr[L] && arr[L].length) out.push(fill(pick(arr[L]), Object.assign({}, extra))); };
    const out = [];
    const say = arr => { if (arr && arr.length) out.push(pick(arr)); };
    const addAsk = pool => { const a = pool.length ? pick(pool) : null; if (a) { out.push(a.q[L]); ask = a.id; } };
    const RG = V.REGIONAL || {}, i = L === 'fr' ? 1 : 0;
    const addOrigin = () => { if (O && O.lines && O.lines[L]) out.push(pick(O.lines[L].concat(O.pet ? (RG.talk || {})[L] || [] : []))); };
    // 🌍 how her homeland colours a reply to an event: greeting / farewell in her tongue, oath, likes and dislikes
    const homeReact = e => {
      if (!O || !out.length) return;
      if (e.id === 'greet' && O.greet && roll(0.6)) out[0] = `${O.greet[i]}! ${out[0]}`;
      if (e.id === 'farewell' && O.bye && roll(0.7)) out.push(pick(RG.bye[L]));
      if (['climax', 'jealousy', 'spank', 'war', 'sorry'].includes(e.id) && O.oath && roll(0.3)) out[0] = `${O.oath[i]} ${out[0]}`;
      if ((O.likes || []).includes(e.id) && roll(0.5)) memLine(RG.like, { event: e.name[L] });
      else if ((O.dislikes || []).includes(e.id) && roll(0.6)) memLine(RG.dislike, { event: e.name[L] });
    };

    const ev = best(evs.filter(e => e.kind !== 'cmd'), n, char);
    const A = asked ? askById(asked) : null;
    // 🧠 a long silence: she says so before anything else
    if (gapDays >= 1 && MEM.away) memLine(MEM.away, { days: Math.floor(gapDays) });

    // 1. answer to her question
    if (A && !(ev && ev.kind === 'act')) {
      const yn = yesNo(n), place = A.kind === 'open' && A.place ? findPlace(n, L) : null;
      let ans = null;
      if (A.kind === 'yn' && yn) {
        ans = A[yn];
        const was = (M.asks || {})[A.id];
        if ((was === 'yes' || was === 'no') && was !== yn && MEM.contra) {
          const w = { yes: L === 'fr' ? 'oui' : 'yes', no: L === 'fr' ? 'non' : 'no' };
          memLine(MEM.contra, { was: w[was], now: w[yn] });
        }
        rec.ans = { id: A.id, val: yn };
      }
      else if (place) {
        const PO = (V.ORIGINS || {})[place.id] || {}, i = L === 'fr' ? 1 : 0;
        Object.assign(v, { place: place.name, placecustom: PO.custom ? PO.custom[i] : v.custom, food: PO.food ? PO.food[i] : v.food });
        ans = A.place;
        rec.ans = { id: A.id, val: place.name };
      } else if (A.other && (!ev || A.kind === 'open')) { ans = A.other; if (A.kind === 'open') rec.ans = { id: A.id, val: String(text).slice(0, 60) }; }
      if (ans) {
        say(ans[L]);
        return finish();
      }
    }

    // 2. talk / act / question
    if (ev) {
      rec.ev = ev.id;
      if (ev.id === 'q_memory') { remember(); return finish(); }
      say(lines(ev, L, char));
      homeReact(ev);
      if (ev.kind === 'act') {
        if (ev.id !== event) { sys = `${ev.icon} ${ev.name[L]}`; effect = ev.effect || ''; }
        event = ev.id;
        // 🧠 first time / done often
        const cnt = (M.count || {})[ev.id] || 0;
        if (!cnt && M.count && roll(0.5)) memLine(MEM.first, { event: ev.name[L] });
        else if (cnt >= 2 && roll(0.2)) memLine(MEM.often, { event: ev.name[L], n: cnt + 1 });
        const after = askOn(ev.id, char);
        if (after.length && roll(0.35)) addAsk(after);
        else if ((ev.id === 'climax' || ev.id === 'cuddle') && roll(0.35)) addAsk(askPool('after', char));
      } else {
        effect = ev.effect || '';
        if (ev.counter && roll(0.4)) addAsk(askPool('', char, ev.counter));
        else if (roll(0.15)) addOrigin();
        else if (!(cur && cur.kind === 'act') && roll(0.1)) addAsk(askPool('talk', char));
      }
      return finish();
    }

    // 3. commands
    const cmd = best(evs.filter(e => e.kind === 'cmd'), n, char);
    if (cmd) {
      if (cmd.id === 'again') ls = cur ? lines(cur, L, char) : null;
      else {
        ls = lines(cmd, L, char);
        if (cmd.id === 'stop') event = null;
      }
      if (ls && ls.length) { say(ls); return finish(); }
    }

    // 4. fallback, linked to the topic when possible
    const topic = best(V.TOPICS || [], n, char);
    if (topic) {
      say(topic.reply[L]);
      if (roll(0.15)) addOrigin();
      return finish();
    }
    if (cur && cur.kind === 'act') { say(V.DURING[L]); return finish(); }
    const r = Math.random(), word = echoWord(text), talkAsks = askPool('talk', char);
    // 🧠 she brings back something you told her
    const recall = Object.keys(M.asks || {}).filter(k => ((MEM.recall || {})[k] || {})[M.asks[k]]);
    if (recall.length && roll(0.2)) { const k = pick(recall); memLine(MEM.recall[k][M.asks[k]], {}); return finish(); }
    if (r < 0.3 && talkAsks.length) addAsk(talkAsks);
    else if (r < 0.5 && word) { v.word = word; say(V.ECHO[L]); }
    else if (r < 0.62 && O) addOrigin();
    else if (r < 0.72 && O && O.proverb && RG.proverb) memLine(RG.proverb, {});
    else if (V.Chronicle && roll(0.15) && V.Chronicle.fresh(char, L, null, you)) out.push(V.Chronicle.fresh(char, L, null, you));
    else say(lines(D.fallback, L, char));
    return finish();

    // answer to "do you remember…": a first time with its date, the favourite, or something you told her
    function remember() {
      const firsts = Object.keys(M.first || {}).filter(id => evs.some(e => e.id === id && e.kind === 'act'));
      const counts = Object.keys(M.count || {}).filter(id => evs.some(e => e.id === id && e.kind === 'act')).sort((a, b) => M.count[b] - M.count[a]);
      const opts = [];
      if (firsts.length) opts.push(() => { const id = pick(firsts); memLine(MEM.remember, { event: evName(id), date: fmtDate(M.first[id]) }); });
      if (counts.length && M.count[counts[0]] >= 2) opts.push(() => memLine(MEM.fav, { event: evName(counts[0]), n: M.count[counts[0]] }));
      const rc = Object.keys(M.asks || {}).filter(k => ((MEM.recall || {})[k] || {})[M.asks[k]]);
      if (rc.length) opts.push(() => { const k = pick(rc); memLine(MEM.recall[k][M.asks[k]], {}); });
      if (opts.length) pick(opts)(); else say(lines(evs.find(e => e.id === 'q_memory'), L, char));
    }

    function finish() {
      const replies = out.map(s => fill(s, v)).join(' || ').split('||').map(s => s.trim()).filter(Boolean)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1));
      return { event, sys, replies, effect, ask, rec };
    }
  }

  // event (or command) a message would trigger, ignoring a pending question
  function match(text, char) {
    const n = norm(text), evs = V.EVENTS.events;
    return best(evs.filter(e => e.kind !== 'cmd'), n, char) || best(evs.filter(e => e.kind === 'cmd'), n, char) || null;
  }

  // 🧪 Bot lab: why respond() would answer the way it does (same decision order, no randomness)
  function explain({ text, char: char0, current, asked, userTraits }) {
    const char = withUser(char0, userTraits);
    const n = norm(text), evs = V.EVENTS.events, cur = current ? evs.find(e => e.id === current) : null;
    const topics = (V.TOPICS || []).map(tp => Object.assign({ kind: 'topic' }, tp));
    const candidates = evs.concat(topics).map(e => ({ e, ok: fits(char, e), s: score(e, n) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 8);
    const ev = best(evs.filter(e => e.kind !== 'cmd'), n, char), cmd = best(evs.filter(e => e.kind === 'cmd'), n, char), topic = best(topics, n, char);
    const A = asked ? askById(asked) : null, yn = yesNo(n), place = findPlace(n, 'en');
    let path;
    if (A && !(ev && ev.kind === 'act') && ((A.kind === 'yn' && yn) || (A.kind === 'open' && A.place && place) || (A.other && (!ev || A.kind === 'open')))) path = 'ask';
    else if (ev) path = 'event';
    else if (cmd && !(cmd.id === 'again' && !cur)) path = 'cmd';
    else if (topic) path = 'topic';
    else if (cur && cur.kind === 'act') path = 'during';
    else path = 'fallback';
    const winner = path === 'event' ? ev : path === 'cmd' ? (cmd.id === 'again' ? cur : cmd) : path === 'topic' ? topic : null;
    const vars = (winner || (path === 'fallback' ? V.EVENTS.fallback : null) || {}).variants || [];
    const fitting = vars.filter(v => fits(char, v)), top = fitting.length ? Math.max(...fitting.map(spec)) : 0;
    return { path, winner, ask: A, yn, place, candidates, variants: vars.map(v => ({ v, ok: fits(char, v), used: fits(char, v) && spec(v) === top })), echo: echoWord(text) };
  }

  return { norm, respond, fits, findPlace, match, explain, spec };
})();
