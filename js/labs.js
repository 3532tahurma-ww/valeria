/*
 * Valeria - 🧪 Laboratory (like Carmen's #/deneyler): try the bot without writing a real letter
 * Screens: labs (hub), lab {id}. LABS = [id, icon, title EN/FR, what it shows EN/FR].
 *   bot    : type a message → path (her question / event / command / topic / during / fallback), candidates with scores,
 *            variant used, three sample replies (Bot.explain + Bot.respond)
 *   temper : one event or question → base lines and every variant side by side
 *   origin : one region → homeland data and how a lady from there answers
 *   quick  : the ⚡ shortcuts a letter would show now, with their reasons (Suggest.quick)
 *   fx     : play every effect
 *   scene  : 🎬 play a scene on a sandbox memory (open / steps / finish / break / stop), episode chain and feelings, log of notes and lines;
 *            ⚠️ marks a step whose ⚡ SAY sentence does not trigger its own event
 *   feast  : 📅 preview any feast's design (sessionStorage, until stopped), her lines, designs on / off, add / remove your own special days
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
    ['fx', '✨', ['Effects lab', 'Labo des effets'], ['Play every effect on letters and on the screen.', "Jouez chaque effet sur les lettres et à l'écran."]],
    ['scene', '🎬', ['Scene lab', 'Labo des scènes'], ['Play a scene step by step: progress, breaking, finish, episodes and feelings.', 'Jouez une scène pas à pas : progression, rupture, fin, épisodes et sentiments.']],
    ['feast', '🎉', ['Feast day lab', 'Labo des jours de fête'], ['Celebrate any saint’s day now, hear her speak of it, add your own special days.', 'Fêtez n’importe quel saint maintenant, écoutez-la en parler, ajoutez vos propres jours de fête.']]
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

  // 📅 feast days: preview any feast's design on the whole app, hear her speak of it, add your own special days (state.myFeasts)
  function feastLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en), F = V.Feasts, y = new Date().getFullYear();
    const cur = F.current(), prev = F.previewId();
    if (!st.feast || !F.byId(st.feast)) st.feast = (cur || F.next().f).id;
    const f = F.byId(st.feast), lk = F.look(f), c = testChar(UI), cl = langOf(c);
    const dt = d => d.toLocaleDateString(L, { day: 'numeric', month: 'long' });
    const mine = UI.S().myFeasts || [];
    const lines = [...new Set([0, 1, 2, 3].map(() => F.line(f, c, cl, UI.S().user.name || T('my lord', 'messire'))))];
    return `
      <section class="lab-out">
        <h4>📅 ${T('Today', 'Aujourd’hui')}</h4>
        <p>${cur ? `${cur.icon} <b>${esc(cur.name[L])}</b>${prev ? ` <small>(${T('preview', 'aperçu')})</small>` : ''}` : `${T('No feast today. Next', 'Pas de fête aujourd’hui. Prochaine')}: ${F.next().f.icon} <b>${esc(F.next().f.name[L])}</b>, ${dt(F.next().date)}`}</p>
        <div class="chips">
          ${prev ? `<button class="chip on" data-act="lab-feast-stop">✕ ${T('Stop the preview', 'Arrêter l’aperçu')}</button>` : ''}
          <button class="chip ${F.enabled() ? 'on' : ''}" data-act="lab-feast-toggle">🎨 ${T('Feast designs', 'Décors de fête')}: <b>${F.enabled() ? UI.t('chat.on') : UI.t('chat.off')}</b></button>
        </div>
      </section>
      <section class="lab-out">
        <h4>${f.icon} ${esc(f.name[L])} <small>${dt(F.dateOf(f, y))}${f.e != null ? ` · ${T('movable', 'mobile')}` : ''}</small></h4>
        <p>${esc(f.desc[L])}</p>
        <p class="feast-row">🎨 ${Object.values(lk.vars || {}).map(v => `<span class="feast-sw" style="background:${esc(v)}"></span>`).join('')} · ${(lk.fall || lk.rise || []).join(' ')} ${lk.fall ? '⬇️' : '⬆️'} · ${V.FX.ICON[lk.fx] || ''} ${esc(UI.t('fx.' + lk.fx))} · ${lk.banner}</p>
        ${f.home ? `<p class="small">🏠 ${T('Her own saint in', 'Son saint à elle en')}: ${esc(f.home.map(o => originName(o, L)).join(', '))}</p>` : ''}
        <button class="btn" data-act="lab-feast-preview" data-id="${esc(f.id)}">🎉 ${T('Celebrate it now (preview)', 'La fêter maintenant (aperçu)')}</button>
        <h4>💬 ${T('What she says', 'Ce qu’elle dit')} <small>${esc(c.name)}</small></h4>
        ${lines.map(s => `<div class="msg her"><div class="bubble"><p>${esc(s)}</p></div></div>`).join('')}
      </section>
      ${charPicker(UI)}
      <section class="lab-out">
        <h4>🗓️ ${T('The calendar', 'Le calendrier')} ${y}</h4>
        <div class="chips feast-list">${F.year(y).map(x => `<button class="chip ${x.f.id === st.feast ? 'on' : ''}" data-act="lab-feast-pick" data-id="${esc(x.f.id)}">${x.f.icon} ${esc(x.f.name[L])} <small>${dt(x.date)}</small></button>`).join('')}</div>
      </section>
      <section class="lab-out">
        <h4>➕ ${T('Add your own special day', 'Ajouter votre propre jour de fête')}</h4>
        <p class="small muted">${T('A birthday, the day you met, your own saint… It gets its design and she speaks of it that day.', 'Un anniversaire, le jour de votre rencontre, votre saint… Il a son décor et elle en parle ce jour-là.')}</p>
        <div class="two"><label>${T('Name', 'Nom')}<input id="mfName" maxlength="40" placeholder="${T('Our first letter', 'Notre première lettre')}"></label>
          <label>${T('Date', 'Date')}<input id="mfDate" type="date"></label></div>
        <div class="two"><label>${T('Icon', 'Icône')}<input id="mfIcon" maxlength="4" value="💝"></label>
          <label>${T('Design', 'Décor')}<select id="mfLook">${Object.keys(V.FEAST_LOOKS).map(k => `<option value="${k}" ${k === 'love' ? 'selected' : ''}>${V.FEAST_LOOKS[k].banner} ${k}</option>`).join('')}</select></label></div>
        <label>${T('What it is', 'Ce que c’est')}<input id="mfDesc" maxlength="120"></label>
        <button class="btn" data-act="lab-feast-add">➕ ${T('Add', 'Ajouter')}</button>
        ${mine.length ? `<ul class="feast-mine">${mine.map(m => `<li>${esc(m.icon)} <b>${esc(m.name[L])}</b> <small>${dt(F.dateOf(m, y))}</small> <button class="icon" data-act="lab-feast-pick" data-id="${esc(m.id)}">👁️</button><button class="icon" data-act="lab-feast-del" data-id="${esc(m.id)}">✕</button></li>`).join('')}</ul>` : ''}
      </section>`;
  }

  // 🎬 scenes and 📖 episodes (like Carmen's #/sahne): play a scene step by step on a sandbox (her real memory is untouched)
  const scSand = () => (st.sc = st.sc || { id: (V.SCENES[0] || {}).id, st: null, mem: { first: {}, count: {}, asks: {} }, feel: null, log: [] });
  function sceneLab(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en), S = V.Scenes, X = scSand();
    const c0 = testChar(UI), cl = langOf(c0);
    const c = Object.assign({}, c0, { mem: X.mem, feel: X.feel || Object.assign({}, V.Feel.init(Object.assign({}, c0, { feel: null }))) });
    X.feel = c.feel;
    const sc = S.byId(X.id) || V.SCENES[0], ok = S.usable(sc, c), p = S.progress(X.st, c), nx = S.next(X.st, c);
    const evN = id => { const e = V.EVENTS.events.find(x => x.id === id); return e ? `${e.icon} ${esc(e.name[L])}` : esc(id); };
    const fits = id => { const e = V.EVENTS.events.find(x => x.id === id); return !!e && V.Bot.fits(c, e); };
    const say = id => V.Suggest.sayOf(id, c, L), routes = id => { const m = V.Bot.match(say(id), c); return !!m && m.id === id; };
    const btn = (id, role) => {
      const done = X.st && X.st.done.includes(id), lock = role === 'fin' && !(p && p.ready), want = nx.includes(id) || (!X.st && role === 'open');
      return `<button class="chip ${want ? 'on' : ''}" data-act="lab-sc-do" data-id="${esc(id)}" title="${esc(say(id))}" ${fits(id) ? '' : 'disabled'}>${done ? '✓ ' : lock ? '🔒 ' : ''}${evN(id)}${routes(id) ? '' : ' ⚠️'}</button>`;
    };
    const others = V.EVENTS.events.filter(e => e.kind === 'act' && e.id !== sc.open && e.id !== sc.fin && !sc.steps.includes(e.id) && V.Bot.fits(c, e)).slice(0, 4);
    const fm = V.Feel.KEYS.map(k => `${V.Feel.meta(k).icon} ${c.feel[k]}`).join(' · ');
    const eps = (V.EPISODES || []), E = X.mem.ep && S.epById(X.mem.ep.id);
    return `
      ${charPicker(UI)}
      <section class="lab-out">
        <label>${T('Scene', 'Scène')}<select id="labScene">${V.SCENES.map(s => `<option value="${s.id}" ${s.id === sc.id ? 'selected' : ''}>${s.icon} ${esc(s.name[L])}${S.usable(s, c) ? '' : ' 🚫'}</option>`).join('')}</select></label>
        <p class="small">${esc(sc.desc[L])}</p>
        <p class="small muted">${sc.mode === 'seq' ? T('In order, every step', 'Dans l’ordre, chaque étape') : `${T('Free', 'Libre')}: ${S.needOf(sc, c)} ${T('of', 'parmi')} ${S.stepsOf(sc, c).length}`} · ttl ${sc.ttl} · ${sc.fin ? `🏁 ${evN(sc.fin)}` : T('no finish', 'sans fin')}${ok ? '' : ` · <b>🚫 ${T('not usable for this character', 'impossible pour ce personnage')}</b>`}</p>
        <div class="quick static">${p ? `<span class="qscene">${p.sc.icon} ${esc(p.sc.name[L])} <b>${'●'.repeat(p.n)}${'○'.repeat(Math.max(0, p.need - p.n))}</b> ${p.n}/${p.need}${p.ready && sc.fin ? ' 🏁' : ''} · idle ${X.st.idle || 0}/${sc.ttl}</span>` : `<span class="small muted">${T('No scene running: tap the opening event.', 'Aucune scène en cours : touchez l’événement d’ouverture.')}</span>`}</div>
        <h4>▶️ ${T('Opening', 'Ouverture')}</h4><div class="chips">${btn(sc.open, 'open')}</div>
        <h4>👣 ${T('Steps', 'Étapes')}</h4><div class="chips">${sc.steps.map(id => btn(id, 'step')).join('')}</div>
        ${sc.fin ? `<h4>🏁 ${T('Finish', 'Fin')}</h4><div class="chips">${btn(sc.fin, 'fin')}</div>` : ''}
        <h4>💥 ${T('Break it', 'La briser')}</h4><div class="chips">${others.map(e => `<button class="chip" data-act="lab-sc-do" data-id="${e.id}">${e.icon} ${esc(e.name[L])}</button>`).join('')}<button class="chip" data-act="lab-sc-do" data-id="stop">✋ stop</button><button class="chip" data-act="lab-sc-do" data-id="compliment">💬 ${T('talk (never breaks)', 'parole (ne brise jamais)')}</button></div>
        <p class="small muted">${T('Hover a chip for its ⚡ sentence; ⚠️ = that sentence does not trigger its own event.', 'Survolez une puce pour sa phrase ⚡ ; ⚠️ = cette phrase ne déclenche pas son propre événement.')}</p>
        <div class="chips"><button class="chip" data-act="lab-sc-reset">↺ ${T('Reset the sandbox', 'Réinitialiser le bac à sable')}</button></div>
      </section>
      <section class="lab-out">
        <h4>🧠 ${T('Sandbox memory', 'Mémoire du bac à sable')}</h4>
        <p>${fm}</p>
        <p class="small">🎬 ${Object.keys(X.mem.scenes || {}).map(id => { const s = S.byId(id); return s ? `${s.icon} ${esc(s.name[L])} ×${X.mem.scenes[id]}` : ''; }).join(', ') || '—'}
          · 📖 ${E ? `${E.icon} ${esc(E.name[L])} ${X.mem.ep.i}/${E.scenes.length}` : '—'}${Object.keys(X.mem.eps || {}).length ? ` · ✔ ${Object.keys(X.mem.eps).map(id => esc(S.epById(id).name[L])).join(', ')}` : ''}</p>
        <h4>📖 ${T('Episodes for this character', 'Épisodes pour ce personnage')}</h4>
        <ul class="small">${eps.map(e => `<li>${S.epOk(e, c, X.mem) ? '🔓' : '🔒'} ${e.icon} <b>${esc(e.name[L])}</b>: ${e.scenes.map(id => { const s = S.byId(id); return `<button class="linkish" data-act="lab-sc-pick" data-id="${id}">${s.icon} ${esc(s.name[L])}</button>`; }).join(' → ')}</li>`).join('')}</ul>
      </section>
      <section class="lab-out">
        <h4>📜 ${T('What happened', 'Ce qui s’est passé')}</h4>
        ${X.log.length ? X.log.slice().reverse().map(x => `<div class="lab-sclog"><b>${x.ev}</b> <small>${esc(x.say)}</small>${x.feel ? ` <small class="feelchip">${esc(x.feel)}</small>` : ''}${x.out.map(o => o.sys ? `<div class="msg sys"><span>❦ ${esc(o.t)} ❦</span></div>` : `<div class="msg her"><div class="bubble"><p>${esc(o.t)}</p></div></div>`).join('')}</div>`).join('') : `<p class="small muted">—</p>`}
      </section>`;
  }

  const BODY = { bot: botLab, temper: temperLab, origin: originLab, quick: quickLab, fx: fxLab, feast: feastLab, scene: sceneLab };

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
          on('labScene', v => { const X = scSand(); X.id = v; X.st = null; });
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
    'lab-snd': a => V.Sound[a.dataset.s](),
    // 🎬 scene lab: one letter triggering this id, on the sandbox (Scenes.step + Feel.step, like botReply)
    'lab-sc-do': a => {
      const X = scSand(), id = a.dataset.id, L = UI.lang(), c0 = testChar(UI);
      const c = Object.assign({}, c0, { mem: X.mem, feel: X.feel });
      const cl = langOf(c), recent = X.log.slice(0, 3).map(x => x.id);
      const r = V.Scenes.step({ st: X.st, id, char: c, mem: X.mem, lang: cl });
      const f = V.Feel.step({ char: c, id, recent, scene: r.kinds, lang: cl, you: UI.S().user.name || '' });
      X.st = r.st; X.feel = c.feel;
      if (r.st && r.st.id !== X.id) X.id = r.st.id; // another scene opened: follow it
      const e = V.EVENTS.events.find(x => x.id === id);
      const out = [].concat(f.cards.map(t => ({ sys: 1, t })), r.notes.map(t => ({ sys: 1, t })), r.lines.map(t => ({ t: t.replace(/\{(sen|you)\}/g, UI.S().user.name || '') })));
      X.log.unshift({ id, ev: e ? `${e.icon} ${e.name[L]}` : id, say: V.Suggest.sayOf(id, c, L), feel: f.chip, out });
      if (r.effect) V.FX.play(r.effect);
      st.redraw && st.redraw();
    },
    'lab-sc-reset': () => { const id = scSand().id; st.sc = null; scSand().id = id; st.redraw && st.redraw(); },
    'lab-sc-pick': a => { const X = scSand(); X.id = a.dataset.id; X.st = null; st.redraw && st.redraw(); },
    'lab-feast-pick': a => { st.feast = a.dataset.id; st.redraw && st.redraw(); },
    'lab-feast-preview': a => { V.Feasts.setPreview(a.dataset.id); st.redraw && st.redraw(); },
    'lab-feast-stop': () => { V.Feasts.setPreview(null); st.redraw && st.redraw(); },
    'lab-feast-toggle': () => { V.Feasts.setEnabled(!V.Feasts.enabled()); st.redraw && st.redraw(); },
    'lab-feast-add': () => {
      const v = id => (document.getElementById(id) || {}).value || '';
      const name = v('mfName').trim(), date = v('mfDate');
      if (!name || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { UI.toast(UI.lang() === 'fr' ? 'Un nom et une date, je vous prie.' : 'A name and a date, please.'); return; }
      const [, m, d] = date.split('-').map(Number), desc = v('mfDesc').trim();
      const f = { id: 'my-' + V.Store.uid(), m, d, icon: v('mfIcon').trim() || '💝', look: v('mfLook') || 'love', name: { en: name, fr: name }, desc: { en: desc, fr: desc } };
      const s = UI.S(); (s.myFeasts = s.myFeasts || []).push(f); UI.save();
      st.feast = f.id; V.Feasts.apply(); st.redraw && st.redraw();
    },
    'lab-feast-del': a => {
      const s = UI.S(); s.myFeasts = (s.myFeasts || []).filter(f => f.id !== a.dataset.id); UI.save();
      if (V.Feasts.previewId() === a.dataset.id) V.Feasts.setPreview(null); else V.Feasts.apply();
      st.redraw && st.redraw();
    }
  });

  return { screens, actions, LABS };
})();
