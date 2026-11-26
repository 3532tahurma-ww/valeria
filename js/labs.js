/*
 * Valeria - 🧪 Laboratory (like Carmen's #/deneyler): try the bot without writing a real letter
 * Screens: labs (hub), lab {id}. LABS = [id, icon, title EN/FR, what it shows EN/FR].
 *   bot    : type a message → path (her question / event / command / topic / during / fallback), candidates with scores,
 *            variant used, three sample replies (Bot.explain + Bot.respond)
 *   temper : one event or question → base lines and every variant side by side
 *   origin : one region → homeland data and how a lady from there answers
 *   quick  : the ⚡ shortcuts a letter would show now, with their reasons (Suggest.quick)
 *   fx     : play every effect
 * The test character is one of your court or the 🧪 test lady (traits, gender, region and language chosen here).
 */
window.Valeria = window.Valeria || {};

Valeria.Labs = (() => {
  const V = Valeria;
  const LABS = [
    ['bot', '🤖', ['Bot lab', 'Labo du bot'], ['Type a letter and see exactly why she answers that way.', 'Écrivez une lettre et voyez exactement pourquoi elle répond ainsi.']],
    ['temper', '🎭', ['Temperament lab', 'Labo des tempéraments'], ['One event, every personality: compare the lines.', 'Un événement, tous les caractères : comparez les répliques.']],
    ['origin', '🌍', ['Homeland lab', 'Labo des terres natales'], ['Pick a land and hear a lady born there.', 'Choisissez une terre et écoutez une dame qui y est née.']],
    ['quick', '⚡', ['Shortcut lab', 'Labo des raccourcis'], ['What the shortcut bar would suggest, and why.', 'Ce que la barre de raccourcis proposerait, et pourquoi.']],
    ['fx', '✨', ['Effects lab', 'Labo des effets'], ['Play every effect on letters and on the screen.', "Jouez chaque effet sur les lettres et à l'écran."]]
  ];
  // lab state (kept while the app is open)
  const st = { who: '__test', test: { name: 'Isabeau', gender: '♀', region: 'normandy', lang: 'en', traits: ['Shy', 'Romantic', 'Height: Short', 'Weight: Curvy', 'Boob Size: 85', 'Butt Size: L', 'Pussy Size: Tight', 'Anal Size: Very Tight'], job: 'Lady', city: 'Rouen', age: '24', house: 'valois' },
    text: 'kiss me', current: '', asked: '', ev: 'kiss', region: 'brittany', lady: null };

  function testChar(UI) {
    if (st.who !== '__test') { const c = UI.S().characters.find(x => x.id === st.who); if (c) return c; }
    const r = V.REGIONS.find(x => x.id === st.test.region);
    return Object.assign({}, st.test, { region: st.test.region, city: r ? r.cities[0][0] : '' });
  }
  const langOf = c => (c.lang === 'fr' ? 'fr' : 'en');
  // 'realm:sco' / 'normandy' → readable name
  const originName = (o, L) => o.startsWith('realm:') ? ((V.REALMS[o.slice(6)] || { name: {} }).name[L] || o) : ((V.REGIONS.find(r => r.id === o) || { name: {} }).name[L] || o);

  function charPicker(UI) {
    const t = UI.t, esc = UI.esc, L = UI.lang(), T = (en, fr) => (L === 'fr' ? fr : en);
    const court = UI.S().characters;
    const tc = st.test;
    return `<fieldset class="lab-who"><legend>${T('Test character', 'Personnage de test')}</legend>
      <select id="labWho"><option value="__test">🧪 ${T('Test lady', 'Dame de test')}</option>${court.map(c => `<option value="${esc(c.id)}" ${st.who === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
      ${st.who === '__test' ? `<div class="two">
        <label>${t('edit.gender')}<select id="labGender"><option value="♀">${t('edit.female')}</option><option value="♂" ${tc.gender === '♂' ? 'selected' : ''}>${t('edit.male')}</option></select></label>
        <label>${t('edit.lang')}<select id="labLang"><option value="en">${t('lang.en')}</option><option value="fr" ${tc.lang === 'fr' ? 'selected' : ''}>${t('lang.fr')}</option></select></label></div>
        <label>${t('edit.region')}<select id="labRegion">${V.REGIONS.map(r => `<option value="${r.id}" ${tc.region === r.id ? 'selected' : ''}>${esc(r.name[L])}</option>`).join('')}</select></label>
        <div class="two fig">${(V.FIGURE || []).filter(g => !g.gender || g.gender === tc.gender).map(g => { const cur = ((tc.traits.find(x => x.startsWith(g.id + ': ')) || '').split(': ')[1] || ''); return `<label>${g.icon} ${esc(g.label[L])}<select data-labfig="${esc(g.id)}"><option value="">—</option>${g.items.map(v => `<option ${cur === v ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>`; }).join('')}</div>
        <div class="chips pick">${V.TRAITS.personality.concat(V.TRAITS.style).map(x => `<button type="button" class="chip ${tc.traits.includes(x) ? 'on' : ''}" data-act="lab-trait" data-t="${esc(x)}">${esc(UI.traitLabel(x))}</button>`).join('')}</div>`
      : `<p class="small muted">${esc((testChar(UI).traits || []).map(UI.traitLabel).join(', '))}</p>`}
    </fieldset>`;
  }
  function bindPicker(UI, redraw) {
    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('change', () => { fn(el.value); redraw(); }); };
    on('labWho', v => { st.who = v; });
    on('labGender', v => { st.test.gender = v; });
    on('labLang', v => { st.test.lang = v; });
    on('labRegion', v => { st.test.region = v; });
    document.querySelectorAll('[data-labfig]').forEach(el => el.addEventListener('change', () => {
      const g = el.dataset.labfig;
      st.test.traits = st.test.traits.filter(x => !x.startsWith(g + ': '));
      if (el.value) st.test.traits.push(g + ': ' + el.value);
      redraw();
    }));
  }

  /* ---------- labs ---------- */
  function botLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const acts = V.EVENTS.events.filter(e => e.kind === 'act');
    const c = testChar(UI), cl = langOf(c);
    const u = UI.S().user, ut = u.gender !== '♀' && u.dick ? ['Dick Size: ' + u.dick] : [];
    const x = V.Bot.explain({ text: st.text, char: c, current: st.current || null, asked: st.asked || null, userTraits: ut });
    const PATH = {
      ask: T('❔ Answer to her question', '❔ Réponse à sa question'), event: T('🎯 Event / question', '🎯 Événement / question'), cmd: T('🗣️ Command', '🗣️ Ordre'),
      topic: T('🔁 Topic (fallback)', '🔁 Sujet (secours)'), during: T('🤫 During an act', '🤫 Pendant un acte'), fallback: T('🔁 Fallback (question, echo, homeland or general)', '🔁 Secours (question, écho, terre natale ou général)')
    };
    const samples = [0, 1, 2].map(() => V.Bot.respond({ text: st.text, char: c, lang: cl, current: st.current || null, you: UI.S().user.name || UI.t('you'), asked: st.asked || null, userTraits: ut }));
    const cond = r => [...(r.traits || []).map(t => t.split('|').map(UI.traitLabel).join('/')), r.gender || '', ...(r.origin || []).map(o => originName(o, L)), ...(r.chars || [])].filter(Boolean).join(', ');
    return `
      ${charPicker(UI)}
      <div class="two">
        <label>${T('Current act', 'Acte en cours')}<select id="labCur"><option value="">—</option>${acts.map(e => `<option value="${e.id}" ${st.current === e.id ? 'selected' : ''}>${e.icon} ${esc(e.name[L])}</option>`).join('')}</select></label>
        <label>${T('She asked', 'Elle a demandé')}<select id="labAsk"><option value="">—</option>${(V.ASKS || []).map(a => `<option value="${a.id}" ${st.asked === a.id ? 'selected' : ''}>${esc(a.q[L].slice(0, 40))}</option>`).join('')}</select></label>
      </div>
      <label class="lab-msg">${T('Your letter', 'Votre lettre')}<textarea id="labText" rows="2">${esc(st.text)}</textarea></label>
      <div class="row-actions"><button class="btn" data-act="lab-run">🧪 ${T('Test', 'Tester')}</button></div>
      <section class="lab-out">
        <h4>${PATH[x.path]}${x.winner ? `: ${x.winner.icon} <b>${esc(x.winner.name[L])}</b>` : ''}</h4>
        ${x.ask ? `<p class="small">❔ ${esc(x.ask.q[L])} · ${T('yes/no read', 'oui/non lu')}: <b>${x.yn || '—'}</b>${x.place ? ` · 🗺️ ${esc(x.place.name)}` : ''}</p>` : ''}
        ${x.path === 'fallback' && x.echo ? `<p class="small">${T('Echo word', 'Mot écho')}: <code>${esc(x.echo)}</code></p>` : ''}
        ${x.candidates.length ? `<table class="bk-t"><thead><tr><th>${T('Candidate', 'Candidat')}</th><th>${T('Kind', 'Type')}</th><th>${T('Score', 'Score')}</th><th></th></tr></thead><tbody>
          ${x.candidates.map(k => `<tr class="${k.ok ? '' : 'off'}"><td>${k.e.icon} ${esc(k.e.name[L])}</td><td><small>${esc(k.e.kind || '')}</small></td><td>${k.s}</td><td>${k.ok ? '' : `🚫 <small>${esc(cond(k.e))}</small>`}</td></tr>`).join('')}</tbody></table>`
          : `<p class="small muted">${T('No trigger word found.', 'Aucun mot déclencheur trouvé.')}</p>`}
        ${x.variants.length ? `<p class="small">${T('Variants', 'Variantes')}: ${x.variants.map(v => `<span class="chip ${v.used ? 'on' : ''} ${v.ok ? '' : 'off'}">${esc(cond(v.v))}</span>`).join(' ')}</p>` : ''}
        <h4>${T('Three tries', 'Trois essais')}</h4>
        ${samples.map(r => `<div class="lab-reply">${r.sys ? `<small>❦ ${esc(r.sys)} ❦</small>` : ''}${r.replies.map(s => `<p>${esc(s)}</p>`).join('')}<small>${[r.effect ? '✨ ' + r.effect : '', r.ask ? '❔ ' + r.ask : '', T('act', 'acte') + ': ' + (r.event || '—')].filter(Boolean).join(' · ')}</small></div>`).join('')}
      </section>`;
  }

  function temperLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const withV = V.EVENTS.events.filter(e => (e.variants || []).length);
    const e = withV.find(x => x.id === st.ev) || withV[0];
    const cond = r => [...(r.traits || []).map(t => t.split('|').map(UI.traitLabel).join(' / ')), r.gender ? (r.gender === '♂' ? T('♂ men', '♂ hommes') : '♀') : '', ...(r.origin || []).map(o => originName(o, L))].filter(Boolean).join(', ');
    const court = UI.S().characters;
    const used = court.map(c => { const vs = (e.variants || []).filter(v => V.Bot.fits(c, v)); const top = vs.length ? Math.max(...vs.map(V.Bot.spec)) : 0; return [c, vs.filter(v => V.Bot.spec(v) === top)]; });
    return `
      <label>${T('Event or question', 'Événement ou question')}<select id="labEv">${withV.map(x => `<option value="${x.id}" ${x.id === e.id ? 'selected' : ''}>${x.icon} ${esc(x.name[L])}</option>`).join('')}</select></label>
      <section class="lab-out">
        <div class="lab-col"><h4>${T('Everyone else', 'Tous les autres')}</h4>${(e.reply[L] || []).map(s => `<p>“${esc(s)}”</p>`).join('')}</div>
        ${e.variants.map(v => `<div class="lab-col"><h4>${esc(cond(v)) || '—'}</h4>${((v.reply || {})[L] || [T('(same as everyone in this language)', '(comme tout le monde dans cette langue)')]).map(s => `<p>“${esc(s)}”</p>`).join('')}</div>`).join('')}
        ${court.length ? `<h4>${T('Your court', 'Votre cour')}</h4><ul class="lab-list">${used.map(([c, vs]) => `<li><b>${esc(c.name)}</b> → ${vs.length ? esc(vs.map(cond).join(' | ')) : T('everyone else', 'tous les autres')}</li>`).join('')}</ul>` : ''}
      </section>`;
  }

  function originLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const r = V.REGIONS.find(x => x.id === st.region) || V.REGIONS[0], O = V.ORIGINS[r.id] || {}, i = L === 'fr' ? 1 : 0;
    if (!st.lady || st.lady.region !== r.id) st.lady = V.Gen.character({ region: r.id });
    const c = st.lady, cl = langOf(c);
    const ask = (text) => V.Bot.respond({ text, char: c, lang: cl, current: null, you: UI.S().user.name || UI.t('you'), asked: null }).replies.join(' ');
    const Qs = [['Where are you from?', "D'où venez-vous ?"], ['What is your favourite food?', 'Quel est votre plat préféré ?'], ['What do you drink?', 'Que buvez-vous ?'], ['What do you think of the English?', 'Que pensez-vous des Anglais ?'], ['What do you think of the French?', 'Que pensez-vous des Français ?']];
    return `
      <label>${UI.t('edit.region')}<select id="labOrigin">${V.REGIONS.map(x => `<option value="${x.id}" ${x.id === r.id ? 'selected' : ''}>${esc(x.name[L])}</option>`).join('')}</select></label>
      <section class="lab-out">
        <table class="bk-kv"><tr><th>🍲</th><td>${esc(O.food ? O.food[i] : '')}</td></tr><tr><th>🍷</th><td>${esc(O.drink ? O.drink[i] : '')}</td></tr><tr><th>🗣️</th><td><i>${esc(O.oath ? O.oath[i] : '')}</i></td></tr>
          <tr><th>📜</th><td>${esc(O.custom ? O.custom[i] : '')}</td></tr><tr><th>🎭</th><td>${esc((O.traits || []).map(UI.traitLabel).join(', '))}</td></tr></table>
        <div class="lab-lady">${UI.crest(c, 'lg')}<div><b>${esc(c.name)}</b><br><small>${esc(c.job)} · ${esc(c.city)} · ${esc(UI.t('lang.' + c.lang))}</small><br><small>${esc(c.traits.map(UI.traitLabel).join(', '))}</small></div></div>
        ${Qs.map(q => `<div class="lab-reply"><small>✒️ ${esc(q[i])}</small><p>${esc(ask(q[cl === 'fr' ? 1 : 0]))}</p></div>`).join('')}
        <div class="row-actions"><button class="btn ghost" data-act="lab-lady">🎲 ${T('Another lady', 'Une autre dame')}</button><button class="btn" data-act="lab-invite">✉️ ${UI.t('map.invite')}</button></div>
      </section>`;
  }

  function quickLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const acts = V.EVENTS.events.filter(e => e.kind === 'act');
    const c = testChar(UI);
    const chips = V.Suggest.quick({ char: c, current: st.current || null, asked: st.asked || null, log: [], empty: !st.current && !st.asked, lang: L, user: UI.S().user });
    return `
      ${charPicker(UI)}
      <div class="two">
        <label>${T('Current act', 'Acte en cours')}<select id="labCur"><option value="">—</option>${acts.map(e => `<option value="${e.id}" ${st.current === e.id ? 'selected' : ''}>${e.icon} ${esc(e.name[L])}</option>`).join('')}</select></label>
        <label>${T('She asked', 'Elle a demandé')}<select id="labAsk"><option value="">—</option>${(V.ASKS || []).map(a => `<option value="${a.id}" ${st.asked === a.id ? 'selected' : ''}>${esc(a.q[L].slice(0, 40))}</option>`).join('')}</select></label>
      </div>
      <section class="lab-out">
        <div class="quick static">${chips.map(q => `<span class="qchip">${q.icon} ${esc(q.label)}</span>`).join('')}</div>
        <table class="bk-t"><thead><tr><th>${T('Shortcut', 'Raccourci')}</th><th>${T('Writes', 'Écrit')}</th><th>${T('Why', 'Pourquoi')}</th></tr></thead><tbody>
          ${chips.map(q => `<tr><td>${q.icon} ${esc(q.label)}</td><td><i>${esc(q.text)}</i></td><td><small>${esc(q.why.join(' · '))}</small></td></tr>`).join('')}</tbody></table>
      </section>`;
  }

  function fxLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    return `
      <section class="lab-out">
        <h4>${T('On the letter', 'Sur la lettre')}</h4>
        <div class="lab-fx">${V.FX.BUBBLE.map(id => `<div class="msg her eff-${id} ${id === 'ink' ? '' : 'fresh'}" data-act="lab-bubble" data-fx="${id}"><div class="bubble"><p>${V.FX.ICON[id]} ${esc(UI.t('fx.' + id))}</p></div></div>`).join('')}</div>
        <p class="small muted">${T('Tap a letter to replay it.', 'Touchez une lettre pour la rejouer.')}</p>
        <h4>${T('On the whole screen', "Sur tout l'écran")}</h4>
        <div class="chips">${Object.keys(V.FX.SCREEN).map(id => `<button class="chip" data-act="lab-play" data-fx="${id}">${V.FX.ICON[id]} ${esc(UI.t('fx.' + id))}</button>`).join('')}</div>
        <h4>${T('Sounds', 'Sons')}</h4>
        <div class="chips"><button class="chip" data-act="lab-snd" data-s="pluck">🪕 ${T('Lute', 'Luth')}</button><button class="chip" data-act="lab-snd" data-s="seal">🔏 ${T('Seal', 'Sceau')}</button><button class="chip" data-act="lab-snd" data-s="bell">🔔 ${T('Bell', 'Cloche')}</button><button class="chip" data-act="lab-snd" data-s="rustle">📜 ${T('Page', 'Page')}</button></div>
      </section>`;
  }

  const BODY = { bot: botLab, temper: temperLab, origin: originLab, quick: quickLab, fx: fxLab };

  function screens(UI) {
    return {
      labs() {
        const L = UI.lang(), i = L === 'fr' ? 1 : 0;
        UI.main.innerHTML = `
          <header class="top"><h1 class="title">${UI.t('labs.title')}</h1><p class="sub">${UI.t('labs.sub')}</p></header>
          <div class="lab-grid">${LABS.map(([id, ic, tt, d]) => `<button class="lab-card" data-act="lab-open" data-id="${id}"><span>${ic}</span><b>${tt[i]}</b><small>${d[i]}</small></button>`).join('')}</div>`;
      },
      lab() {
        const L = UI.lang(), i = L === 'fr' ? 1 : 0, lab = LABS.find(x => x[0] === UI.view().id) || LABS[0];
        const draw = () => {
          const box = document.getElementById('labBody');
          if (!box) return;
          box.innerHTML = BODY[lab[0]](UI);
          bindPicker(UI, draw);
          const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('change', () => { fn(el.value); draw(); }); };
          on('labCur', v => { st.current = v; });
          on('labAsk', v => { st.asked = v; });
          on('labEv', v => { st.ev = v; });
          on('labOrigin', v => { st.region = v; });
          const ta = document.getElementById('labText');
          if (ta) ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); st.text = ta.value; draw(); } });
        };
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-go="labs">‹</button><h2>${lab[1]} ${lab[2][i]}</h2><span></span></header>
          <p class="muted small center">${lab[3][i]}</p>
          <nav class="lab-nav">${LABS.map(([id, ic]) => `<button class="chip ${id === lab[0] ? 'on' : ''}" data-act="lab-open" data-id="${id}">${ic}</button>`).join('')}</nav>
          <div class="form" id="labBody"></div>`;
        draw();
        st.redraw = draw;
      }
    };
  }

  const actions = UI => ({
    'lab-open': a => UI.go('lab', { id: a.dataset.id }),
    'lab-run': () => { const ta = document.getElementById('labText'); if (ta) st.text = ta.value; st.redraw && st.redraw(); },
    'lab-trait': a => { const x = a.dataset.t, tr = st.test.traits, k = tr.indexOf(x); if (k < 0) tr.push(x); else tr.splice(k, 1); const ta = document.getElementById('labText'); if (ta) st.text = ta.value; st.redraw && st.redraw(); },
    'lab-lady': () => { st.lady = null; st.redraw && st.redraw(); },
    'lab-invite': () => {
      const c = Object.assign({}, st.lady, { id: V.Store.uid(), created: Date.now(), set: '', mod: 'valeria' });
      UI.S().characters.push(c); UI.save(); UI.toast(UI.t('map.joined', { name: c.name })); V.FX.play('fleur');
      st.lady = null; st.redraw && st.redraw();
    },
    'lab-play': a => V.FX.play(a.dataset.fx),
    'lab-bubble': a => {
      if (a.dataset.fx === 'ink') { a.classList.toggle('revealed'); return; }
      a.classList.remove('fresh'); void a.offsetWidth; a.classList.add('fresh');
    },
    'lab-snd': a => V.Sound[a.dataset.s]()
  });

  return { screens, actions, LABS };
})();
