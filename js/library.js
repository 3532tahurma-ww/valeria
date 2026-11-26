/*
 * Valeria - 📚 Library (data: js/data/books.js)
 * Screens: library (shelves), book {id} (cover + contents), page {id, n} (chapter reader, ‹ › and swipe).
 * Generated books (book.gen) read the live data: events, questions, asks, topics, traits, origins, effects.
 * Last page read per book: localStorage 'valeria:bookpos'.
 */
window.Valeria = window.Valeria || {};

Valeria.Library = (() => {
  const V = Valeria;
  const POS = 'valeria:bookpos';
  const pos = () => { try { return JSON.parse(localStorage.getItem(POS)) || {}; } catch (e) { return {}; } };
  const setPos = (id, n) => { const p = pos(); p[id] = n; try { localStorage.setItem(POS, JSON.stringify(p)); } catch (e) {} };

  // ---------- generated chapters ----------
  function GEN(UI) {
    const L = UI.lang(), esc = UI.esc, T = (en, fr) => (L === 'fr' ? fr : en);
    const trig = ev => ['en', 'fr'].map(l => ((ev.when || ev.words || {})[l] || []).slice(0, 4).map(w => `<code>${esc(w.replace(/^=/, ''))}</code>`).join(' ')).filter(Boolean).join('<br>');
    const cond = r => [
      ...(r.traits || []).map(x => x.split('|').map(UI.traitLabel).join(' / ')),
      r.gender ? (r.gender === '♂' ? T('♂ men', '♂ hommes') : T('♀ women', '♀ femmes')) : '',
      ...(r.origin || []).map(o => o.startsWith('realm:') ? (V.REALMS[o.slice(6)] || { name: {} }).name[L] : ((V.REGIONS.find(x => x.id === o) || { name: {} }).name[L])),
      ...(r.chars || [])
    ].filter(Boolean).join(', ');
    const vars = ev => (ev.variants || []).map(cond).filter(Boolean);
    const sample = arr => (arr && arr.length ? `<i>“${esc(arr[0])}”</i>` : '');
    const table = (head, rows) => `<table class="bk-t"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
    const fxName = id => id ? `${V.FX.ICON[id] || ''} ${esc(UI.t('fx.' + id))}` : '';
    const CAT = { courtship: T('💐 Courtship', '💐 Galanterie'), tender: T('🫂 Tenderness', '🫂 Tendresse'), intimacy: T('🔥 Intimacy', '🔥 Intimité'), command: T('🗣️ Commands', '🗣️ Ordres') };

    const evN = id => { const e = V.EVENTS.events.find(x => x.id === id); return e ? `${e.icon} ${esc(e.name[L])}` : esc(id); };
    return {
      // 📅 feast days (js/data/feasts.js, engine js/feasts.js)
      calendar() {
        const F = V.Feasts, y = new Date().getFullYear(), dt = d => d.toLocaleDateString(L, { day: 'numeric', month: 'long' });
        const cur = F.current(), nx = F.next(), LK = V.FEAST_LOOKS;
        const MONTHS = [[1, 3], [4, 6], [7, 9], [10, 12]];
        const mName = m => new Date(y, m - 1, 1).toLocaleDateString(L, { month: 'long' });
        const row = x => `<tr${cur && cur.id === x.f.id ? ' class="on"' : ''}><td>${dt(x.date)}</td><td>${x.f.icon} <b>${esc(x.f.name[L])}</b><br><small>${esc(x.f.desc[L])}</small></td><td>${LK[x.f.look] ? LK[x.f.look].banner : ''} ${(F.look(x.f).fall || F.look(x.f).rise || []).join('')}</td></tr>`;
        return [
          { title: T('Feast days', 'Les jours de fête'), html: `
            <p>${T('The year of Valeria is the year of the Church and of the countryside: saints’ days, the great feasts, and the old festivals of fire, May and harvest.', 'L’année de Valeria est celle de l’Église et des campagnes : jours des saints, grandes fêtes, et vieilles fêtes du feu, de mai et des moissons.')}</p>
            <p>${T('<b>On a feast day the whole app dresses up</b>: new colours, snowflakes, petals, candles or shamrocks drifting across the screen instead of the dust, a banner on the Home page, and a burst of the feast’s effect the first time you open Valeria that day.', '<b>Un jour de fête, toute l’application se pare</b> : nouvelles couleurs, flocons, pétales, chandelles ou trèfles qui dérivent à l’écran au lieu de la poussière, une bannière sur l’Accueil, et l’effet de la fête la première fois que vous ouvrez Valeria ce jour-là.')}</p>
            <p>${T('<b>She speaks of it</b> in her first answer of the day; if it is the saint of her own land, she is prouder still. Dame Mathilde reminds you to wish her a happy feast.', '<b>Elle en parle</b> dans sa première réponse du jour ; si c’est le saint de sa propre terre, elle en est plus fière encore. Dame Mathilde vous rappelle de lui souhaiter bonne fête.')}</p>
            <p>${T('In the <b>🧪 Laboratory → 🎉 Feast day lab</b> you can celebrate any feast now, switch the designs off, and add your own special days.', 'Dans le <b>🧪 Laboratoire → 🎉 Labo des jours de fête</b>, vous pouvez fêter n’importe quelle fête maintenant, couper les décors et ajouter vos propres jours de fête.')}</p>
            <p>📅 ${cur ? `${T('Today', 'Aujourd’hui')}: ${cur.icon} <b>${esc(cur.name[L])}</b>` : `${T('Next', 'Prochaine')}: ${nx.f.icon} <b>${esc(nx.f.name[L])}</b>, ${dt(nx.date)}`}</p>` },
          ...MONTHS.map(([a, b2]) => ({ title: `🗓️ ${mName(a)} – ${mName(b2)}`, html: table([T('Date', 'Date'), T('Feast', 'Fête'), T('Design', 'Décor')], F.year(y).filter(x => x.date.getMonth() + 1 >= a && x.date.getMonth() + 1 <= b2).map(row)) })),
          { title: T('✝ Movable feasts', '✝ Les fêtes mobiles'), html: `
            <p>${T('Some feasts follow Easter, which moves every year with the moon. This year Easter falls on', 'Certaines fêtes suivent Pâques, qui change chaque année avec la lune. Cette année, Pâques tombe le')} <b>${dt(F.easter(y))}</b>${T(', next year on', ', l’an prochain le')} ${dt(F.easter(y + 1))}.</p>
            ${table([T('Feast', 'Fête'), T('Easter', 'Pâques'), y, y + 1], (V.FEASTS || []).filter(f => f.e != null).map(f => `<tr><td>${f.icon} ${esc(f.name[L])}</td><td>${f.e > 0 ? '+' : ''}${f.e}</td><td>${dt(F.dateOf(f, y))}</td><td>${dt(F.dateOf(f, y + 1))}</td></tr>`))}` },
          { title: T('🎨 The designs', '🎨 Les décors'), html: table([T('Design', 'Décor'), T('Colours', 'Couleurs'), T('Drifting', 'Dérive'), T('Effect', 'Effet'), T('Feasts', 'Fêtes')],
            Object.keys(LK).map(k => `<tr><td>${LK[k].banner} ${k}</td><td>${Object.values(LK[k].vars || {}).map(v => `<span class="feast-sw" style="background:${esc(v)}"></span>`).join('')}</td><td>${(LK[k].fall || LK[k].rise || []).join(' ')} ${LK[k].fall ? '⬇️' : '⬆️'}</td><td>${fxName(LK[k].fx)}</td><td><small>${F.all().filter(f => f.look === k).map(f => f.icon + ' ' + esc(f.name[L])).join(', ')}</small></td></tr>`)) },
          { title: T('🏠 Saints of the lands', '🏠 Les saints des terres'), html: `<p>${T('On these days, a lady from the land speaks of her own saint with pride.', 'Ces jours-là, une dame de la terre parle avec fierté de son propre saint.')}</p>` +
            table([T('Feast', 'Fête'), T('Their own saint in', 'Leur saint en')], (V.FEASTS || []).filter(f => f.home).map(f => `<tr><td>${f.icon} ${esc(f.name[L])}</td><td>${f.home.map(o => o.startsWith('realm:') ? (V.REALMS[o.slice(6)] || { name: {} }).name[L] : ((V.REGIONS.find(r => r.id === o) || { name: {} }).name[L])).map(esc).join(', ')}</td></tr>`)) },
          { title: T('💝 Your own days', '💝 Vos propres jours'), html: (UI.S().myFeasts || []).length
            ? table([T('Date', 'Date'), T('Day', 'Jour'), T('Design', 'Décor')], UI.S().myFeasts.map(f => ({ f, date: F.dateOf(f, y) })).map(row))
            : `<p>${T('None yet. Add a birthday, the day you met or any day dear to you in the 🎉 Feast day lab.', 'Aucun pour l’instant. Ajoutez un anniversaire, le jour de votre rencontre ou tout jour qui vous est cher dans le 🎉 Labo des jours de fête.')}</p>` }
        ];
      },

      // 🤝❤️🔥 feelings and 📰 status cards (js/data/feelings.js, engine js/feel.js)
      feelings() {
        const F = V.FEELINGS, fn = k => { const m = F.find(x => x.id === k); return `${m.icon} ${esc(m.name[L])}`; };
        const dl = o => Object.keys(o || {}).filter(k => o[k]).map(k => `${F.find(x => x.id === k).icon}${o[k] > 0 ? '+' : ''}${o[k]}`).join(' ');
        const sayRow = (k, when) => `<tr><td>${when}</td><td>${V.FEEL_SAY[k][L].map(s => { const [e, l] = s.split('|'); return `${e} <i>“${esc(l.replace(/\{sen\}/g, '…'))}”</i>`; }).join('<br>')}</td></tr>`;
        const ev = V.EVENTS.events.filter(e => e.kind !== 'cmd' || V.FEEL_EV[e.id]);
        return [
          { title: T('Her heart', 'Son cœur'), html: `
            <p>${T('Every character carries three feelings for you, from 0 to 100:', 'Chaque personnage porte trois sentiments pour vous, de 0 à 100 :')} ${fn('trust')}, ${fn('love')}, ${fn('desire')}. ${T('They are shown above the letter in bot mode and on her profile.', 'Ils sont affichés au-dessus de la lettre en mode bot et sur son profil.')}</p>
            <p>${T('Each letter you send changes them. Under her first answer, a small line such as <code>🤝+2 ❤️+1</code> tells you exactly what your letter did to her heart. Courtship and tenderness build trust and love; intimacy builds desire, and the climax releases it.',
              'Chaque lettre envoyée les modifie. Sous sa première réponse, une petite ligne comme <code>🤝+2 ❤️+1</code> vous dit exactement ce que votre lettre a fait à son cœur. La cour et la tendresse bâtissent la confiance et l’amour ; l’intimité nourrit le désir, et l’extase le libère.')}</p>
            <p>${T('Doing the same thing again within three letters touches her only half as much. What her homeland loves raises her love; what it frowns upon lowers her trust. Completing scenes and episodes, answering her questions all count; a silence of two days or more cools her love a little.',
              'Refaire la même chose dans les trois lettres ne la touche qu’à moitié. Ce que sa terre aime fait monter son amour ; ce qu’elle désapprouve fait baisser sa confiance. Accomplir des scènes et des épisodes, répondre à ses questions, tout compte ; un silence de deux jours ou plus refroidit un peu son amour.')}</p>
            <p>${T('Her temper matters: a Romantic lady’s love grows faster, a Passionate one burns quicker, a Proud one is slow to trust.', 'Son caractère compte : l’amour d’une Romantique grandit plus vite, une Passionnée s’embrase plus tôt, une Fière tarde à faire confiance.')}</p>
            ${table([T('Temper', 'Caractère'), T('Starts with', 'Commence avec'), T('Grows', 'Croît')], Object.keys(V.FEEL_MUL).map(tr => `<tr><td>${esc(UI.traitLabel(tr))}</td><td>${dl(V.FEEL_INIT.traits[tr])}</td><td>${Object.keys(V.FEEL_MUL[tr]).map(k => `${F.find(x => x.id === k).icon}×${V.FEEL_MUL[tr][k]}`).join(' ')}</td></tr>`))}` },
          { title: T('📰 Status cards', '📰 Cartes d’humeur'), html: `
            <p>${T('When a feeling crosses a threshold, a card appears in the letter, in her own words: <i>🤝 Trust 48 → 52 · “I think I can trust you.”</i> Trust and love cross at', 'Quand un sentiment franchit un seuil, une carte apparaît dans la lettre, avec ses propres mots : <i>🤝 Confiance 48 → 52 · « Je crois que je peux vous faire confiance. »</i> La confiance et l’amour franchissent')} ${V.FEEL_STEPS.join(' / ')} (${T('up or down', 'en montant ou en descendant')}), ${T('desire at', 'le désir à')} ${V.DESIRE_STEPS.join(' / ')}. ${T('At most two cards per letter.', 'Deux cartes au plus par lettre.')}</p>
            <p>${T('<b>⋮ → 📰 Status cards</b> switches between Off, Cards, and Cards + changes (the default, with the change line under her answers).', '<b>⋮ → 📰 Cartes d’humeur</b> passe de Aucune à Cartes, puis Cartes + changements (par défaut, avec la ligne de changement sous ses réponses).')}</p>
            ${table([T('When', 'Quand'), T('She says', 'Elle dit')], [
              sayRow('trustUp', `🤝 ${T('trust rises', 'la confiance monte')}`), sayRow('trustDn', `🤝 ${T('trust falls', 'la confiance baisse')}`),
              sayRow('loveUp', `❤️ ${T('love rises', 'l’amour monte')}`), sayRow('loveDn', `❤️ ${T('love falls', 'l’amour baisse')}`),
              sayRow('desireUp50', '🔥 50'), sayRow('desireUp80', '🔥 80'), sayRow('tooSoon', `😟 ${T('too soon', 'trop tôt')}`), sayRow('fin', `✨ ${T('after the climax', 'après l’extase')}`)])}` },
          { title: T('😟 Too soon', '😟 Trop tôt'), html: `
            <p>${T('Some acts need her trust (or love) first. Below it she lets it happen but hesitates: a “too soon” card, and her trust falls. Dame Mathilde warns you.', 'Certains actes demandent d’abord sa confiance (ou son amour). En dessous, elle se laisse faire mais hésite : une carte « trop tôt », et sa confiance baisse. Dame Mathilde vous prévient.')}</p>
            ${table([T('Act', 'Acte'), T('Needs', 'Demande')], V.EVENTS.events.filter(e => e.kind === 'act' && V.Feel.needOf(e)).map(e => `<tr><td>${e.icon} ${esc(e.name[L])}</td><td>${Object.keys(V.Feel.needOf(e)).map(k => `${fn(k)} ${V.Feel.needOf(e)[k]}`).join(', ')}</td></tr>`))}` },
          { title: T('What each letter does', 'Ce que fait chaque lettre'), html: table([T('Event', 'Événement'), T('Change', 'Changement')],
            ev.map(e => `<tr><td>${e.icon} ${esc(e.name[L])}</td><td>${dl(V.Feel.of(e.id))}</td></tr>`)) +
            `<p><small>${T('Also', 'Aussi')}: ${T('scene completed', 'scène accomplie')} ${dl(V.FEEL_MORE.sceneEnd)} · ${T('episode', 'épisode')} ${dl(V.FEEL_MORE.epEnd)} · ${T('scene broken', 'scène brisée')} ${dl(V.FEEL_MORE.sceneFail)} · ${T('answer', 'réponse')} ${dl(V.FEEL_MORE.answer)} · ${T('her land loves it', 'sa terre aime')} ${dl(V.FEEL_MORE.like)} · ${T('frowns upon it', 'désapprouve')} ${dl(V.FEEL_MORE.dislike)} · ${T('2+ days of silence', '2 jours de silence ou plus')} ${dl(V.FEEL_MORE.away)}</small></p>` }
        ];
      },

      // 🎬 scenes and 📖 episodes (js/data/scenes.js, engine js/scenes.js)
      scenes() {
        const SC = V.SCENES || [], EP = V.EPISODES || [], scN = id => { const s = SC.find(x => x.id === id); return s ? `${s.icon} ${esc(s.name[L])}` : esc(id); };
        const N = V.SCENE_NOTES;
        return [
          { title: T('How scenes work', 'Comment fonctionnent les scènes'), html: `
            <p>${T('A scene turns a single moment into a little story of several letters. One event <b>opens</b> it (a dance, a bath, the silk ribbon…); a note appears in the letter and a red strip above the ⚡ bar shows the scene and its progress ●●○.',
              'Une scène transforme un simple moment en une petite histoire de plusieurs lettres. Un événement l’<b>ouvre</b> (une danse, un bain, le ruban de soie…) ; une note apparaît dans la lettre et une bande rouge au-dessus de la barre ⚡ montre la scène et sa progression ●●○.')}</p>
            <p>${T('Then come the <b>steps</b>. <i>Free</i> scenes need a number of them in any order; <i>in order</i> scenes need every step, one after the other. The ⚡ bar and Dame Mathilde always put the steps left first. When the steps are done, the <b>finish</b> (🏁, usually the climax) completes the scene; scenes without a finish complete at once.',
              'Viennent ensuite les <b>étapes</b>. Les scènes <i>libres</i> en demandent un certain nombre, dans n’importe quel ordre ; les scènes <i>dans l’ordre</i> demandent chaque étape, l’une après l’autre. La barre ⚡ et Dame Mathilde proposent toujours d’abord les étapes restantes. Quand elles sont faites, la <b>fin</b> (🏁, souvent l’extase) accomplit la scène ; les scènes sans fin s’accomplissent aussitôt.')}</p>
            <p>${T('A finish too early ends the scene without completing it, “stop” ends it, ✕ on the strip too, and too many other acts break it (“the moment has passed”). Talk and questions never break a scene. Steps she cannot do (her gender or figure) are skipped, and a scene without enough steps for her never opens.',
              'Une fin trop précoce termine la scène sans l’accomplir, « arrêtez » la termine, le ✕ de la bande aussi, et trop d’autres actes la brisent (« le moment est passé »). La conversation et les questions ne brisent jamais une scène. Les étapes qu’elle ne peut faire (son genre ou sa silhouette) sont sautées, et une scène sans assez d’étapes pour elle ne s’ouvre pas.')}</p>
            <p>${T('A completed scene is kept in her 🧠 memory (on her profile) and counts for the episodes. When your letter means nothing to her, she sometimes offers a scene herself.',
              'Une scène accomplie reste dans sa 🧠 mémoire (sur son profil) et compte pour les épisodes. Quand votre lettre ne lui dit rien, elle propose parfois elle-même une scène.')}</p>
            <p>${T('Try any scene without writing a real letter in <b>🧪 Laboratory → 🎬 Scene lab</b>: her real memory is not touched.', 'Essayez n’importe quelle scène sans écrire de vraie lettre dans <b>🧪 Laboratoire → 🎬 Labo des scènes</b> : sa vraie mémoire n’est pas touchée.')}</p>
            <p><small>${T('Notes in the letter', 'Notes dans la lettre')}: <i>${esc(N.open[L])}</i> · <i>${esc(N.ready[L])}</i> · <i>${esc(N.end[L])}</i></small></p>` },
          { title: T('🎬 All the scenes', '🎬 Toutes les scènes'), html: table([T('Scene', 'Scène'), T('Opens with', 'S’ouvre par'), T('Steps', 'Étapes'), T('Finish', 'Fin')],
            SC.map(s => `<tr><td>${s.icon} <b>${esc(s.name[L])}</b><br><small>${esc(s.desc[L])}</small></td><td>${evN(s.open)}</td><td><small>${s.mode === 'seq' ? T('in order', 'dans l’ordre') + ': ' : `${s.need} ${T('of', 'parmi')}: `}${s.steps.map(evN).join(s.mode === 'seq' ? ' → ' : ', ')}</small></td><td>${s.fin ? evN(s.fin) : '—'}</td></tr>`)) },
          { title: T('📖 Episodes', '📖 Les épisodes'), html: `
            <p>${T('An episode chains several scenes in order, over one evening or many days. Finishing its first scene starts it (📖 note); each next scene moves it on, and the last one ends it with fireworks. Her memory keeps the episode in progress, so you can come back days later: she reminds you of the next scene.',
              'Un épisode enchaîne plusieurs scènes dans l’ordre, sur une soirée ou plusieurs jours. Accomplir sa première scène le commence (note 📖) ; chaque scène suivante le fait avancer, et la dernière le termine en feu d’artifice. Sa mémoire garde l’épisode en cours : vous pouvez revenir des jours plus tard, elle vous rappelle la scène suivante.')}</p>
            <p>${T('Episodes open by <b>rank</b>: the more different scenes you have completed with her, the further you go. Some also need another episode first.', 'Les épisodes s’ouvrent par <b>rang</b> : plus vous avez accompli de scènes différentes avec elle, plus vous allez loin. Certains demandent aussi un autre épisode avant.')}</p>
            ${table([T('Rank', 'Rang'), T('Scenes completed', 'Scènes accomplies')], (V.EP_TIERS || []).map(x => `<tr><td>${x.icon} ${esc(x.name[L])}</td><td>${x.need}</td></tr>`))}` },
          { title: T('📖 All the episodes', '📖 Tous les épisodes'), html: table([T('Episode', 'Épisode'), T('Scenes', 'Scènes'), T('Rank', 'Rang')],
            EP.map(e => { const tr = (V.EP_TIERS || []).find(x => x.n === e.tier); return `<tr><td>${e.icon} <b>${esc(e.name[L])}</b><br><small>${esc(e.desc[L])}</small><br><small><i>“${esc(e.ask[L][0])}”</i></small></td><td><small>${e.scenes.map(scN).join(' → ')}</small></td><td>${tr ? `${tr.icon} ${esc(tr.name[L])}` : ''}${(e.after || []).length ? `<br><small>${T('after', 'après')}: ${e.after.map(id => { const a = EP.find(x => x.id === id); return a ? esc(a.name[L]) : id; }).join(', ')}</small>` : ''}</td></tr>`; })) },
          { title: T('🕯️ Dame Mathilde', '🕯️ Dame Mathilde'), html: `
            <p>${T('Above the ⚡ bar, Dame Mathilde, the old confidante, whispers advice after each answer, like Lia in Carmen: answer her question first; the steps of the scene in progress; a greeting for a first letter; tenderness after the climax; the next scene of the episode; what follows the act in progress; and when nothing is happening, an episode she dreams of or a scene you have never played. Tap a chip to put it in your letter.',
              'Au-dessus de la barre ⚡, Dame Mathilde, la vieille confidente, souffle un conseil après chaque réponse, comme Lia dans Carmen : répondez d’abord à sa question ; les étapes de la scène en cours ; un salut pour une première lettre ; de la tendresse après l’extase ; la scène suivante de l’épisode ; la suite de l’acte en cours ; et quand rien ne se passe, un épisode dont elle rêve ou une scène jamais jouée. Touchez une puce pour la mettre dans votre lettre.')}</p>
            <p>${T('✕ hides her; <b>⋮ → 🕯️ Dame Mathilde</b> brings her back.', '✕ la cache ; <b>⋮ → 🕯️ Dame Mathilde</b> la fait revenir.')}</p>` }
        ];
      },

      events() {
        const evs = V.EVENTS.events.filter(e => e.cat !== 'question');
        const intro = { title: T('How events work', 'Comment fonctionnent les événements'), html: `
          <p>${T('When bot mode is on, every letter you send is read for <b>trigger words</b>, in English and in French, whatever her language. Accents, capitals and apostrophes do not matter, and a word only needs to <i>start</i> like the trigger: <code>kiss</code> also catches “kisses” and “kissing”.',
            'Quand le mode bot est actif, chaque lettre envoyée est lue à la recherche de <b>mots déclencheurs</b>, en anglais et en français, quelle que soit sa langue. Accents, majuscules et apostrophes ne comptent pas, et il suffit que le mot <i>commence</i> comme le déclencheur : <code>embrass</code> attrape aussi « embrasse » et « embrasser ».')}</p>
          <p>${T('<b>Talk</b> events are just answers. <b>Acts</b> change what is happening: a note like “❦ 💋 Kissing ❦” appears and the act continues until another one starts. <b>Intimacy</b> acts win over a simple kiss in the same letter. <b>Commands</b> (again, faster, slower, stop…) only work when nothing else matched; “again” repeats the current act.',
            'Les événements de <b>conversation</b> ne sont que des réponses. Les <b>actes</b> changent ce qui se passe : une note « ❦ 💋 Baiser ❦ » apparaît et l’acte continue jusqu’au suivant. Les actes d’<b>intimité</b> l’emportent sur un simple baiser dans la même lettre. Les <b>ordres</b> (encore, plus vite, doucement, arrête…) ne servent que si rien d’autre n’a été reconnu ; « encore » répète l’acte en cours.')}</p>
          <p>${T('Some events bring an effect (rose petals for a kiss, gold sparks at the climax). The “Variants” column lists who answers differently.', 'Certains événements apportent un effet (pétales de rose pour un baiser, étincelles d’or à l’extase). La colonne « Variantes » indique qui répond autrement.')}</p>` };
        const chs = ['courtship', 'tender', 'intimacy', 'command'].map(cat => ({
          title: CAT[cat],
          html: table([T('Event', 'Événement'), T('Write…', 'Écrivez…'), T('Effect', 'Effet'), T('Variants', 'Variantes')],
            evs.filter(e => e.cat === cat).map(e => `<tr><td>${e.icon} <b>${esc(e.name[L])}</b>${e.traits ? `<br><small>${T('only', 'seulement')}: ${esc(cond(e))}</small>` : ''}</td><td>${trig(e)}</td><td>${fxName(e.effect)}</td><td><small>${esc(vars(e).join(' · '))}</small></td></tr>`))
        }));
        return [intro, ...chs];
      },

      questions() {
        const qs = V.EVENTS.events.filter(e => e.cat === 'question');
        return [
          { title: T('Asking her', 'L’interroger'), html: `
            <p>${T('Ask her about her life and she answers from her own profile: her seat, her title, her age, her house, and from her <b>homeland</b> (its food, drink and customs, see the <i>Book of Realms</i>).',
              'Interrogez-la sur sa vie : elle répond à partir de son propre profil (son fief, son titre, son âge, sa maison) et de sa <b>terre natale</b> (mets, boisson et coutumes, voir le <i>Livre des royaumes</i>).')}</p>
            <p>${T('After answering, she sometimes asks the same question back (“And you?”). Your next letter is then read as your answer; see <i>Her Questions</i>.',
              'Après avoir répondu, elle vous retourne parfois la question (« Et vous ? »). Votre lettre suivante est alors lue comme votre réponse ; voir <i>Ses questions</i>.')}</p>` },
          { title: T('All the questions', 'Toutes les questions'), html: table([T('Question', 'Question'), T('Write…', 'Écrivez…'), T('Example', 'Exemple'), T('Variants', 'Variantes')],
            qs.map(q => `<tr><td>${q.icon} <b>${esc(q.name[L])}</b>${q.counter ? `<br><small>↩️ ${T('may ask back', 'peut la retourner')}</small>` : ''}</td><td>${trig(q)}</td><td><small>${sample(q.reply[L])}</small></td><td><small>${esc(vars(q).join(' · '))}</small></td></tr>`)) }
        ];
      },

      asks() {
        const ask = (V.ASKS || []);
        const grp = (w, title, intro) => ({ title, html: `<p>${intro}</p>` + table([T('She asks', 'Elle demande'), T('Answer', 'Réponse'), T('Only', 'Seulement')],
          ask.filter(a => a.when === w).map(a => `<tr><td><i>“${esc(a.q[L])}”</i></td><td>${a.kind === 'yn' ? T('yes / no', 'oui / non') : T('free answer', 'réponse libre')}${a.place ? `<br><small>🗺️ ${T('name a place!', 'nommez un lieu !')}</small>` : ''}</td><td><small>${esc(cond(a))}</small></td></tr>`)) });
        return [
          { title: T('How to answer her', 'Comment lui répondre'), html: `
            <p>${T('Sometimes she ends her letter with a question. Your <b>next letter</b> is read as the answer.', 'Parfois, elle termine sa lettre par une question. Votre <b>lettre suivante</b> est lue comme la réponse.')}</p>
            <p>${T('For yes/no questions she understands', 'Pour les questions oui/non, elle comprend')}: ${(V.YES || []).slice(0, 10).map(w => `<code>${esc(w)}</code>`).join(' ')} … ${T('and', 'et')} ${(V.NO || []).slice(0, 8).map(w => `<code>${esc(w)}</code>`).join(' ')} …</p>
            <p>${T('For open questions any answer works. If you name a place of the map (“I was born in Rouen”), she knows something about it.', 'Pour les questions ouvertes, toute réponse convient. Si vous nommez un lieu de la carte (« je suis né à Rouen »), elle en sait quelque chose.')}</p>
            <p>${T('If your letter starts an act instead (a kiss…), the question is forgotten.', 'Si votre lettre déclenche plutôt un acte (un baiser…), la question est oubliée.')}</p>` },
          grp('counter', T('↩️ Asked back', '↩️ Questions retournées'), T('After you ask her something, 40% of the time.', 'Après une de vos questions, 4 fois sur 10.')),
          grp('talk', T('🗨️ In conversation', '🗨️ En conversation'), T('Now and then in normal talk, and often when she has nothing to answer.', 'De temps en temps en conversation, et souvent quand elle n’a rien à répondre.')),
          grp('after', T('🌙 Afterwards', '🌙 Après'), T('After the climax or while cuddling.', 'Après l’extase ou pendant un câlin.'))
        ];
      },

      conversation() {
        return [
          { title: T('When she does not understand', 'Quand elle ne comprend pas'), html: `
            <p>${T('When your letter matches no event, question or command, she still answers, in this order:', 'Quand votre lettre ne correspond à aucun événement, question ou ordre, elle répond tout de même, dans cet ordre :')}</p>
            <ol><li>${T('<b>Topic</b>: a word of the list on the next page (horse, rain, king…) → she talks about it.', '<b>Sujet</b> : un mot de la liste page suivante (cheval, pluie, roi…) → elle en parle.')}</li>
            <li>${T('<b>In the middle of an act</b>: she hushes you and goes on.', '<b>Au milieu d’un acte</b> : elle vous fait taire et continue.')}</li>
            <li>${T('Otherwise one of: <b>her own question</b> (3 in 10), <b>echo</b> of the longest unusual word you wrote (“Falconry? Tell me more…”), a line about <b>her homeland</b>, or a general answer shaped by her personality.',
              'Sinon, au choix : <b>sa propre question</b> (3 fois sur 10), l’<b>écho</b> du mot le plus long que vous avez écrit (« Fauconnerie ? Parlez-m’en… »), une phrase sur <b>sa terre natale</b>, ou une réponse générale marquée par son caractère.')}</li></ol>` },
          { title: T('Topics she follows', 'Les sujets qu’elle suit'), html: table([T('Topic', 'Sujet'), T('Words', 'Mots'), T('Example', 'Exemple')],
            (V.TOPICS || []).map(tp => `<tr><td>${tp.icon} <b>${esc(tp.name[L])}</b></td><td>${trig(tp)}</td><td><small>${sample(tp.reply[L])}</small></td></tr>`)) },
          { title: T('🌍 The voice of her land', 'La voix de sa terre'), html: `
            <p>${T('Her homeland colours what she says:', 'Sa terre natale colore ce qu’elle dit :')}</p>
            <ul><li>${T('She greets and says farewell in her own tongue (<i>Fàilte</i>, <i>Demat</i>, <i>Kaixo</i>… <i>Kenavo</i>, <i>Slán</i>, <i>Agur</i>) and calls you by a word of home (<i>cariad</i>, <i>a stór</i>, <i>mon còr</i>…).', 'Elle salue et dit adieu dans sa langue (<i>Fàilte</i>, <i>Demat</i>, <i>Kaixo</i>… <i>Kenavo</i>, <i>Slán</i>, <i>Agur</i>) et vous appelle d’un mot de chez elle (<i>cariad</i>, <i>a stór</i>, <i>mon còr</i>…).')}</li>
            <li>${T('At strong moments (climax, jealousy, a spank, war, an apology) she may swear by her saints.', 'Aux moments forts (extase, jalousie, fessée, guerre, excuses), elle peut jurer par ses saints.')}</li>
            <li>${T('Every land <b>loves</b> some things and <b>frowns upon</b> others (see each land in the <i>Book of Realms</i>): she says so when you do them.', 'Chaque terre <b>aime</b> certaines choses et en <b>désapprouve</b> d’autres (voir chaque terre dans le <i>Livre des royaumes</i>) : elle le dit quand vous les faites.')}<br>${((V.REGIONAL || {}).like || {})[L] ? V.REGIONAL.like[L].concat(V.REGIONAL.dislike[L]).map(s => `<i>“${esc(s)}”</i>`).join('<br>') : ''}</li>
            <li>${T('When she has nothing to answer, she may speak of home or quote a saying of her land.', 'Quand elle n’a rien à répondre, elle peut parler de chez elle ou citer un dicton de sa terre.')}<br>${(((V.REGIONAL || {}).talk || {})[L] || []).concat(((V.REGIONAL || {}).proverb || {})[L] || []).map(s => `<i>“${esc(s)}”</i>`).join('<br>')}</li>
            <li>${T('Ask her about her patron saint, a feast at home, a song of her land, a saying or her tongue (<i>Book of Questions</i>); she may ask you to visit her land or taste its food (<i>Her Questions</i>).', 'Demandez-lui son saint patron, une fête de chez elle, un chant de sa terre, un dicton ou sa langue (<i>Livre des questions</i>) ; elle peut vous inviter chez elle ou vous faire goûter sa cuisine (<i>Ses questions</i>).')}</li></ul>` },
          { title: T('Echo and silence', 'Écho et silence'), html: `
            <p>${T('Echo lines', 'Phrases d’écho')}: ${(V.ECHO[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>
            <p>${T('During an act', 'Pendant un acte')}: ${(V.DURING[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>
            <p>${T('General answers', 'Réponses générales')}: ${(V.EVENTS.fallback[L] || []).map(s => `<i>“${esc(s)}”</i>`).join(' · ')}</p>` }
        ];
      },

      traits() {
        const evs = V.EVENTS.events.concat([Object.assign({ icon: '🔁', name: { en: 'General answers', fr: 'Réponses générales' } }, V.EVENTS.fallback)]);
        const row = tr => {
          const hits = evs.filter(e => (e.variants || []).some(v => (v.traits || []).some(x => x.split('|').includes(tr))));
          const asks = (V.ASKS || []).filter(a => (a.traits || []).some(x => x.split('|').includes(tr)));
          const ex = hits.length ? (hits[0].variants.find(v => (v.traits || []).some(x => x.split('|').includes(tr))).reply[L] || [])[0] : '';
          return `<tr><td><b>${esc(UI.traitLabel(tr))}</b></td><td>${hits.map(e => `<span title="${esc(e.name[L])}">${e.icon}</span>`).join(' ')}${asks.length ? ` · ❔×${asks.length}` : ''}</td><td><small>${ex ? `<i>“${esc(ex)}”</i>` : '—'}</small></td></tr>`;
        };
        const homes = V.REGIONS.map(r => `<tr><td><b>${esc(r.name[L])}</b></td><td>${((V.ORIGINS[r.id] || {}).traits || []).map(x => esc(UI.traitLabel(x))).join(', ')}</td></tr>`);
        return [
          { title: T('Temper shapes every answer', 'Le tempérament façonne chaque réponse'), html: `
            <p>${T('Many events and questions have <b>variants</b>: special lines for a shy, bold, pious or passionate character. When several fit, the most specific wins. Men also have their own lines where it matters.',
              'Beaucoup d’événements et de questions ont des <b>variantes</b> : des répliques propres à un caractère timide, audacieux, pieux ou passionné. Quand plusieurs conviennent, la plus précise l’emporte. Les hommes ont aussi leurs répliques là où cela compte.')}</p>
            <p>${T('Some things only certain characters do: only the cunning or mischievous take the bait of a secret plot, only the pious ask whether you went to mass.',
              'Certaines choses ne sont faites que par certains : seuls les rusés ou les malicieux mordent à l’hameçon d’un complot, seuls les pieux demandent si vous êtes allé à la messe.')}</p>` },
          { title: T('Personality', 'Caractère'), html: table([T('Trait', 'Trait'), T('Changes', 'Change'), T('Example', 'Exemple')], V.TRAITS.personality.map(row)) },
          { title: T('Writing style', "Style d'écriture"), html: table([T('Trait', 'Trait'), T('Changes', 'Change'), T('Example', 'Exemple')], V.TRAITS.style.map(row)) },
          { title: T('📏 Figure', '📏 Silhouette'), html: `<p>${T('Figure traits are chosen in the character form (or rolled with 🎲) and stored like Carmen’s: “Boob Size: 85”, “Pussy Size: Tight”. Your own “Dick Size” is set in 👑 Me. They change these answers:', 'Les traits de silhouette se choisissent dans le formulaire (ou au 🎲) et sont enregistrés comme dans Carmen : « Boob Size: 85 », « Pussy Size: Tight ». Votre propre « Dick Size » se règle dans 👑 Moi. Ils changent ces réponses :')}</p>` +
            table([T('Trait', 'Trait'), T('Values', 'Valeurs'), T('Changes', 'Change')], (V.FIGURE || []).concat([{ id: 'Dick Size', icon: '🍆', label: { en: 'Dick Size (you)', fr: 'Dick Size (vous)' }, items: V.USER_DICK || [] }]).map(g => {
              const uses = x => (x.traits || []).some(tr => tr.includes(g.id + ':'));
              const evs = V.EVENTS.events.filter(e => uses(e) || (e.variants || []).some(uses));
              const asks = (V.ASKS || []).filter(uses);
              return `<tr><td>${g.icon} <b>${esc(g.label[L])}</b></td><td><small>${esc(g.items.map(v => L === 'fr' ? (V.FIGURE_FR[v] || v) : v).join(' · '))}</small></td><td>${evs.map(e => `<span title="${esc(e.name[L])}">${e.icon}</span>`).join(' ')}${asks.length ? ` · ❔×${asks.length}` : ''}</td></tr>`;
            })) },
          { title: T('Born to it', 'De naissance'), html: `<p>${T('Random characters receive one trait typical of their homeland:', 'Les personnages tirés au hasard reçoivent un trait typique de leur terre natale :')}</p>` + table([T('Homeland', 'Terre natale'), T('Typical traits', 'Traits typiques')], homes) }
        ];
      },

      realms() {
        const court = UI.S().characters;
        return [
          { title: T('Lands and their people', 'Les terres et leurs gens'), html: `
            <p>${T('Every character belongs to a homeland: the region of the map chosen in the form, or found from her seat. The homeland gives her names, houses, one typical trait, and a voice: she speaks of her food and drink, swears by her saints, and sometimes adds a line about home.',
              'Chaque personnage appartient à une terre natale : la région choisie dans le formulaire, ou déduite de son fief. Elle lui donne ses noms, ses maisons, un trait typique et une voix : elle parle de ses mets et de sa boisson, jure par ses saints, et ajoute parfois une phrase sur son pays.')}</p>
            <p>${T('Ask her “where are you from?” or “favourite food?” to hear it.', 'Demandez-lui « d’où venez-vous ? » ou « plat préféré ? » pour l’entendre.')}</p>` },
          ...V.REGIONS.map(r => {
            const O = V.ORIGINS[r.id] || {}, i = L === 'fr' ? 1 : 0, here = court.filter(c => V.Gen.regionOf(c) === r.id);
            const kv = (k, v) => (v ? `<tr><th>${k}</th><td>${v}</td></tr>` : '');
            return {
              title: r.name[L],
              html: `<p class="bk-realm"><span style="background:${V.REALMS[r.realm].fill}"></span>${esc(V.REALMS[r.realm].name[L])}</p>
                <table class="bk-kv">${kv(T('Ruler', 'Souveraine'), esc(r.ruler[i]))}${kv(T('Cities', 'Villes'), esc(r.cities.map(c => c[0]).join(', ')))}
                ${kv(T('Houses', 'Maisons'), esc(r.houses.map(UI.houseLabel).join(', ')))}${kv(T('Tongue', 'Langue'), esc(UI.t('lang.' + r.lang)))}
                ${kv(T('Table', 'Table'), O.food ? `🍲 ${esc(O.food[i])} · 🍷 ${esc(O.drink[i])}` : '')}${kv(T('Oath', 'Juron'), O.oath ? `<i>${esc(O.oath[i])}</i>` : '')}
                ${kv(T('Custom', 'Coutume'), O.custom ? esc(O.custom[i]) : '')}${kv(T('Temper', 'Humeur'), esc((O.traits || []).map(UI.traitLabel).join(', ')))}
                ${kv(T('Hello · farewell', 'Bonjour · adieu'), [O.greet, O.bye].filter(Boolean).map(x => `<i>${esc(x[i])}</i>`).join(' · '))}
                ${kv(T('Endearment', 'Mot doux'), O.pet ? `<i>${esc(O.pet[i])}</i>` : '')}${kv(T('Patron saint', 'Saint patron'), O.saint ? esc(O.saint[i]) : '')}
                ${kv(T('Feast', 'Fête'), O.feast ? esc(O.feast[i]) : '')}${kv(T('Song', 'Chant'), O.song ? esc(O.song[i]) : '')}${kv(T('Saying', 'Dicton'), O.proverb ? `« ${esc(O.proverb[i])} »` : '')}
                ${kv(T('Loves', 'Aime'), (O.likes || []).map(x => V.EVENTS.events.find(e => e.id === x)).filter(Boolean).map(e => `${e.icon} ${esc(e.name[L])}`).join(', '))}
                ${kv(T('Frowns upon', 'Désapprouve'), (O.dislikes || []).map(x => V.EVENTS.events.find(e => e.id === x)).filter(Boolean).map(e => `${e.icon} ${esc(e.name[L])}`).join(', '))}
                ${kv(T('Your court', 'Votre cour'), here.length ? esc(here.map(c => c.name).join(', ')) : '—')}</table>
                ${O.lines ? `<p>${O.lines[L].map(s => `<i>“${esc(s.replace('{sen}', UI.S().user.name || UI.t('you')))}”</i>`).join('<br>')}</p>` : ''}
                <p><button class="btn ghost" data-act="lib-map" data-id="${r.id}">🗺️ ${T('Show on the map', 'Voir sur la carte')}</button></p>`
            };
          })
        ];
      },

      memory() {
        const M = V.MEMORY || {}, court = UI.S().characters;
        const ln = k => ((M[k] || {})[L] || []).map(s => `<i>“${esc(s)}”</i>`).join('<br>');
        const recall = Object.keys(M.recall || {}).map(id => { const a = (V.ASKS || []).find(x => x.id === id); return a ? `<tr><td><i>${esc(a.q[L])}</i></td><td><small>✅ ${esc(((M.recall[id].yes || {})[L] || [])[0] || '')}<br>❌ ${esc(((M.recall[id].no || {})[L] || [])[0] || '')}</small></td></tr>` : ''; });
        return [
          { title: T('What she remembers', 'Ce dont elle se souvient'), html: `
            <p>${T('Every character keeps her own memory of you, across all your correspondences with her:', 'Chaque personnage garde sa propre mémoire de vous, à travers toutes vos correspondances :')}</p>
            <ul><li>${T('🌟 the <b>first time</b> of every event, with its date;', '🌟 la <b>première fois</b> de chaque événement, avec sa date ;')}</li>
            <li>${T('❤️ <b>how often</b> you did each one;', '❤️ <b>combien de fois</b> vous avez fait chacun ;')}</li>
            <li>${T('❔ your <b>answers</b> to her questions;', '❔ vos <b>réponses</b> à ses questions ;')}</li>
            <li>${T('📮 the day of your <b>last letter</b>.', '📮 le jour de votre <b>dernière lettre</b>.')}</li></ul>
            <p>${T('You see it on her profile, under 🧠 Memory, and ✕ makes her forget one line.', 'Vous la voyez sur son profil, sous 🧠 Mémoire, et ✕ lui fait oublier une ligne.')}</p>` },
          { title: T('When she brings it up', 'Quand elle en parle'), html: `
            <ul><li>${T('A <b>first time</b>: one time in two she marks it.', 'Une <b>première fois</b> : une fois sur deux, elle le souligne.')}<br>${ln('first')}</li>
            <li>${T('From the <b>third time</b>: now and then she counts.', 'À partir de la <b>troisième fois</b> : de temps en temps, elle compte.')}<br>${ln('often')}</li>
            <li>${T('After <b>a day or more</b> without a letter, she says so first.', 'Après <b>un jour ou plus</b> sans lettre, elle le dit d’abord.')}<br>${ln('away')}</li>
            <li>${T('If you answer a question <b>differently</b> from last time, she notices.', 'Si vous répondez <b>autrement</b> que la dernière fois, elle le remarque.')}<br>${ln('contra')}</li>
            <li>${T('Ask “<b>do you remember…</b>” and she recalls a first time with its date, your favourite, or something you told her.', 'Demandez « <b>vous souvenez-vous…</b> » et elle évoque une première fois avec sa date, votre favori, ou ce que vous lui avez dit.')}<br>${ln('remember')}<br>${ln('fav')}</li></ul>` },
          { title: T('Things you told her', 'Ce que vous lui avez dit'), html: `<p>${T('When she has nothing to answer, 2 times in 10 she brings back one of your answers:', 'Quand elle n’a rien à répondre, 2 fois sur 10 elle revient sur l’une de vos réponses :')}</p>` + table([T('Her question', 'Sa question'), T('Later she says', 'Plus tard elle dit')], recall) },
          { title: T('Your court remembers', 'Votre cour se souvient'), html: court.length ? table([T('Character', 'Personnage'), '🌟', '❤️', '❔', '📮'], court.map(c => {
            const m = c.mem || {}, n = o => Object.keys(o || {}).length;
            return `<tr><td><button class="link" data-char="${esc(c.id)}">${esc(c.name)}</button></td><td>${n(m.first)}</td><td>${Object.values(m.count || {}).reduce((a, b) => a + b, 0)}</td><td>${n(m.asks)}</td><td><small>${m.last ? new Date(m.last).toLocaleDateString(L, { day: 'numeric', month: 'short' }) : '—'}</small></td></tr>`;
          })) : `<p class="muted">${T('No one at court yet.', 'Personne à la cour pour l’instant.')}</p>` }
        ];
      },

      effects() {
        const fx = ids => table([T('Effect', 'Effet'), T('What happens', 'Ce qui se passe')], ids.map(id => `<tr><td>${fxName(id)}</td><td><small>${esc(UI.t('fxd.' + id))}</small></td></tr>`));
        const byEv = V.EVENTS.events.filter(e => e.effect).map(e => `<tr><td>${e.icon} ${esc(e.name[L])}</td><td>${fxName(e.effect)}</td></tr>`);
        return [
          { title: T('Giving a letter an effect', 'Donner un effet à une lettre'), html: `
            <p>${T('In a correspondence, <b>✨</b> picks an effect for your next letter. To change a letter already sent, tap it and choose <b>✨ Effect</b>.', 'Dans une correspondance, <b>✨</b> choisit un effet pour votre prochaine lettre. Pour une lettre déjà envoyée, touchez-la puis <b>✨ Effet</b>.')}</p>
            <p>${T('Screen effects leave a small badge on the letter: tap it to play the effect again.', 'Les effets d’écran laissent un petit badge sur la lettre : touchez-le pour rejouer l’effet.')}</p>` },
          { title: T('On the letter', 'Sur la lettre'), html: fx(V.FX.BUBBLE) },
          { title: T('On the whole screen', "Sur tout l'écran"), html: fx(Object.keys(V.FX.SCREEN)) },
          { title: T('Brought by events', 'Apportés par les événements'), html: table([T('Event', 'Événement'), T('Effect', 'Effet')], byEv) }
        ];
      }
    };
  }

  const chaptersOf = (book, UI) => {
    const L = UI.lang();
    if (book.gen) return GEN(UI)[book.gen]();
    return book.chapters.map(c => ({ title: c.title[L], html: c.body[L] }));
  };
  const bookById = id => V.BOOKS.find(b => b.id === id);
  const cover = (b, L) => `<button class="tome" data-act="lib-open" data-id="${b.id}" style="--bk:${b.color}">
      <span class="tome-ic">${b.icon}</span><b>${b.title[L]}</b><small>${b.sub[L]}</small></button>`;

  function screens(UI) {
    const t = UI.t, esc = UI.esc;
    return {
      library() {
        const L = UI.lang();
        UI.main.innerHTML = `
          <header class="top"><h1 class="title">${t('nav.library')}</h1><p class="sub">${t('lib.sub')}</p></header>
          <button class="lab-banner" data-go="labs"><span>🧪</span><b>${t('labs.title')}</b><small>${t('labs.sub')}</small><em>›</em></button>
          ${V.SHELVES.map(s => `<section class="shelf"><h3 class="sec">${s.name[L]}</h3><div class="tomes">${V.BOOKS.filter(b => b.shelf === s.id).map(b => cover(b, L)).join('')}</div><div class="plank"></div></section>`).join('')}`;
      },
      book() {
        const L = UI.lang(), b = bookById(UI.view().id);
        if (!b) return UI.go('library');
        const chs = chaptersOf(b, UI), at = pos()[b.id];
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-go="library">‹</button><span></span></header>
          <section class="bk-cover" style="--bk:${b.color}"><span class="tome-ic">${b.icon}</span><h2>${b.title[L]}</h2><p>${b.sub[L]}</p></section>
          ${at != null && chs[at] ? `<div class="row-actions"><button class="btn" data-act="lib-page" data-n="${at}">📖 ${t('lib.continue')}: ${esc(chs[at].title)}</button></div>` : ''}
          <h3 class="sec">${t('lib.contents')}</h3>
          <ol class="toc">${chs.map((c, i) => `<li><button data-act="lib-page" data-n="${i}"><span>${esc(c.title)}</span><em>${i + 1}</em></button></li>`).join('')}</ol>`;
      },
      page() {
        const L = UI.lang(), b = bookById(UI.view().id);
        if (!b) return UI.go('library');
        const chs = chaptersOf(b, UI), n = Math.max(0, Math.min(chs.length - 1, UI.view().n || 0)), c = chs[n];
        setPos(b.id, n);
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-act="lib-open" data-id="${b.id}">‹</button><h2 class="bk-runner">${b.icon} ${b.title[L]}</h2><span></span></header>
          <article class="leaf" id="leaf">
            <h2 class="leaf-t">${esc(c.title)}</h2>
            <div class="leaf-b">${c.html}</div>
            <footer class="leaf-f">❦ ${n + 1} / ${chs.length} ❦</footer>
          </article>
          <nav class="leaf-nav">
            <button class="btn ghost" data-act="lib-page" data-n="${n - 1}" ${n === 0 ? 'disabled' : ''}>‹ ${t('lib.prev')}</button>
            <button class="btn ghost" data-act="lib-open" data-id="${b.id}">☰</button>
            <button class="btn ghost" data-act="lib-page" data-n="${n + 1}" ${n >= chs.length - 1 ? 'disabled' : ''}>${t('lib.next')} ›</button>
          </nav>`;
        // swipe to turn the page
        const leaf = document.getElementById('leaf');
        let x0 = null;
        leaf.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
        leaf.addEventListener('touchend', e => {
          if (x0 == null) return;
          const dx = e.changedTouches[0].clientX - x0; x0 = null;
          if (Math.abs(dx) > 60) { const to = n + (dx < 0 ? 1 : -1); if (to >= 0 && to < chs.length) UI.go('page', { id: b.id, n: to, turn: dx < 0 ? 'next' : 'prev' }); }
        });
        if (UI.view().turn) leaf.classList.add('turn-' + UI.view().turn);
      }
    };
  }

  const actions = UI => ({
    'lib-open': a => UI.go('book', { id: a.dataset.id }),
    'lib-page': a => { const v = UI.view(); UI.go('page', { id: v.id, n: +a.dataset.n, turn: +a.dataset.n > (v.n || 0) ? 'next' : 'prev' }); },
    'lib-map': a => { V.MapView.select(a.dataset.id); UI.go('map'); }
  });

  return { screens, actions, count: () => V.BOOKS.length };
})();
