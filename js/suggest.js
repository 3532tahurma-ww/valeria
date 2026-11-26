/*
 * Valeria - ⚡ shortcuts (like Carmen's quickSuggest) and 🔮 typing completions
 * SAY[id]   = [EN, FR, FR for a man] sentence put in the input when a chip is tapped; it must trigger that event
 *             ({dame} = my lady / my lord). Tested in headless Edge: every SAY routes back to its own id.
 * FLOW[id]  = events that naturally follow the current one (scored first).
 * quick(ctx)    → [{ id, icon, label, text, why }] top 6, scored:
 *   her pending question → answer chips (yes / no, your birthplace…) first
 *   follow-up of the current act +3 · commands during intimacy +2 · empty letter → greeting +4
 *   question not asked yet +0.6 · suits her temper (a fitting variant) +1.5 · her homeland +1 · night → cuddle / rendezvous +0.5
 *   done in the last 5 letters −2 · question already asked −3 · intimacy with nothing tender before −1
 * complete(text, char) → chips whose name or trigger words start like the last word typed
 * groups(char)  → every event / question by category, for the "⋯" picker
 *   🎬 scene in progress → its next steps +5 · 📖 her episode → the next scene's opening event +2.5
 * tips(ctx) → { say (HTML), ids } 🕯️ Dame Mathilde's advice bar (like Carmen's 💡 Lia)
 * ctx: { char, current, asked, scene (state.botScene of the letter), log (recent event ids, newest last), empty, lang (UI), user }
 */
window.Valeria = window.Valeria || {};

Valeria.Suggest = (() => {
  const V = Valeria;
  const SAY = {
    greet: ['Good morrow, {dame}!', 'Le bonjour, {dame} !'], howareyou: ['How fare you today?', "Comment allez-vous aujourd'hui ?"],
    compliment: ['You look radiant tonight.', 'Vous êtes magnifique ce soir.'], love: ['I love you.', 'Je vous aime.'], missyou: ['I miss you.', 'Vous me manquez.'],
    farewell: ['Good night, {dame}.', 'Bonne nuit, {dame}.'], thanks: ['Thank you, truly.', 'Merci, vraiment.'], sorry: ['Forgive me.', 'Pardonnez-moi.'],
    gift: ['I brought you a gift.', 'Je vous ai apporté un cadeau.'], poem: ['I wrote you a poem.', 'Je vous ai écrit un poème.'],
    jealousy: ['Are you jealous?', 'Êtes-vous jalouse ?', 'Êtes-vous jaloux ?'], war: ['The war calls me away.', "La guerre m'appelle."],
    tourney: ['Will you come to the tourney?', 'Viendrez-vous au tournoi ?'], feast: ['Sit with me at the feast.', 'Asseyez-vous près de moi au festin.'],
    meet: ['Meet me in the garden tonight.', 'Retrouvez-moi au jardin ce soir.'], tease: ['You are wicked.', 'Vous êtes coquine.', 'Vous êtes coquin.'],
    pray: ['Shall we pray together?', 'Allons prier ensemble ?'], scheme: ['Tell me a secret.', 'Dites-moi un secret.'],
    handkiss: ['*kisses your hand*', '*embrasse votre main*'], handhold: ['May I hold your hand?', 'Puis-je prendre votre main ?'],
    hug: ['Come into my arms.', 'Venez dans mes bras.'], kiss: ['Kiss me.', 'Embrassez-moi.'], neckkiss: ['*kisses your neck*', '*embrasse votre cou*'],
    caress: ['*caresses your cheek*', '*caresse votre joue*'], dance: ['Dance with me.', 'Dansez avec moi.'], bath: ['Shall we take a bath?', 'Prenons un bain ?'],
    lapsit: ['Sit on my lap.', 'Asseyez-vous sur mes genoux.'], massage: ['Let me massage your shoulders.', 'Laissez-moi masser vos épaules.'],
    undress: ['Undress for me.', 'Déshabillez-vous pour moi.'], cuddle: ['Stay with me tonight.', 'Restez avec moi cette nuit.'],
    missionary: ['Lie back for me.', 'Allongez-vous pour moi.'], cowgirl: ['Ride me.', 'Chevauchez-moi.'], reverse: ['Ride facing away.', 'Amazone inversée ?'],
    behind: ['Turn around.', 'Retournez-vous.'], spooning: ['Lie beside me.', 'Je me blottis contre vous.'], faceface: ['Sit facing me.', 'Face à face, maintenant.'],
    wall: ['Against the wall.', 'Contre le mur.'], edge: ['To the edge of the bed.', 'Au bord du lit.'], climax: ["I'm close…", 'Je suis proche…'],
    again: ['Again.', 'Encore.'], faster: ['Faster.', 'Plus vite.'], slower: ['Slower…', 'Doucement…'], name: ['Say my name.', 'Dites mon nom.'],
    look: ['Look at me.', 'Regardez-moi.'], stop: ['Wait…', 'Attendez…'],
    q_from: ['Where are you from?', "D'où venez-vous ?"], q_age: ['How old are you?', 'Quel âge avez-vous ?'], q_title: ['What is your title?', 'Quel est votre titre ?'],
    q_house: ['Tell me about your family.', 'Parlez-moi de votre famille.'], q_food: ['What is your favourite food?', 'Quel est votre plat préféré ?'],
    q_drink: ['What do you drink?', 'Que buvez-vous ?'], q_lover: ['Do you have a lover?', 'Avez-vous un amant ?'], q_faith: ['Do you believe in God?', 'Croyez-vous en Dieu ?'],
    q_english: ['What do you think of the English?', 'Que pensez-vous des Anglais ?'], q_french: ['What do you think of the French?', 'Que pensez-vous des Français ?'],
    q_like: ['What do you like?', "Qu'aimez-vous ?"],
    q_saint: ['Who is your patron saint?', 'Quel est votre saint patron ?'], q_feast: ['What festival do you have at home?', 'Quelle est la fête patronale chez vous ?'],
    q_song: ['Sing me a song of your home.', 'Chantez-moi une chanson de chez vous.'], q_proverb: ['Tell me a saying from your land.', 'Dites-moi un dicton de chez vous.'],
    q_tongue: ['Say hello in your tongue.', 'Dites bonjour dans votre langue.'],
    hairplay: ['Let your hair down.', 'Dénouez vos cheveux.'], blindfold: ['Close your eyes…', 'Fermez les yeux…'], window: ['Come by the window.', 'Venez à la fenêtre.'],
    breasts: ['*kisses your breasts*', '*embrasse vos seins*'], bottom: ['*hands on your hips*', '*les mains sur vos hanches*'], spank: ['*spanks you*', '*vous donne une fessée*'],
    lower: ['Let me kiss lower…', 'Laissez-moi embrasser plus bas…'], anal: ['The other way, tonight?', "Par l'autre chemin, ce soir ?"],
    hayloft: ['Come up to the hayloft.', 'Montons dans le grenier à foin.'], table: ['On the table. Now.', 'Sur la table. Maintenant.'],
    q_height: ['How tall are you?', 'Quelle est votre taille ?'], q_figure: ['Tell me about your figure.', 'Parlez-moi de votre silhouette.'],
    q_bust: ['How big are your breasts?', 'Quelle est la taille de votre poitrine ?'], q_hips: ['How are your hips?', 'Vos hanches sont-elles larges ?'],
    q_tight: ['Are you tight?', 'Êtes-vous étroite ?'], q_mysize: ['Am I too big for you?', 'Suis-je trop gros pour vous ?'], q_memory: ['Do you remember our first time?', 'Vous souvenez-vous de notre première fois ?'], q_fear: ['What do you fear?', 'De quoi avez-vous peur ?'], q_dream: ['What is your dream?', 'Quel est votre rêve ?']
  };
  const FLOW = {
    greet: ['howareyou', 'compliment', 'q_from'], howareyou: ['compliment', 'q_like', 'missyou'], compliment: ['handkiss', 'love', 'dance'],
    love: ['kiss', 'hug', 'q_dream'], missyou: ['meet', 'love', 'hug'], meet: ['kiss', 'handhold', 'hug'], feast: ['dance', 'q_drink', 'compliment'],
    handkiss: ['handhold', 'compliment', 'dance'], handhold: ['kiss', 'hug', 'dance'], hug: ['kiss', 'caress', 'cuddle'],
    kiss: ['neckkiss', 'caress', 'hug', 'undress', 'hairplay'], neckkiss: ['caress', 'undress', 'breasts'], caress: ['undress', 'breasts', 'bottom', 'massage'],
    hairplay: ['kiss', 'neckkiss', 'blindfold'], blindfold: ['caress', 'neckkiss', 'lower'], window: ['kiss', 'hug', 'missyou'],
    breasts: ['lower', 'undress', 'missionary', 'cowgirl'], bottom: ['spank', 'behind', 'breasts'], spank: ['behind', 'bottom', 'again'],
    lower: ['missionary', 'cowgirl', 'climax'], anal: ['slower', 'faster', 'climax'], hayloft: ['behind', 'cowgirl', 'climax'], table: ['behind', 'edge', 'climax'],
    dance: ['kiss', 'feast', 'handhold'], bath: ['massage', 'caress', 'kiss'], lapsit: ['kiss', 'caress', 'faceface'], massage: ['caress', 'undress', 'kiss'],
    undress: ['missionary', 'cowgirl', 'behind', 'breasts', 'bath', 'edge'], missionary: ['faster', 'slower', 'cowgirl', 'behind', 'climax'],
    cowgirl: ['reverse', 'faster', 'missionary', 'climax'], reverse: ['faster', 'behind', 'climax'], behind: ['faster', 'slower', 'cowgirl', 'climax'],
    spooning: ['slower', 'climax', 'cuddle'], faceface: ['slower', 'kiss', 'climax'], wall: ['faster', 'edge', 'climax'], edge: ['missionary', 'behind', 'climax'],
    climax: ['cuddle', 'love', 'again', 'q_memory'], cuddle: ['love', 'q_memory', 'farewell', 'q_dream']
  };
  const OPENERS = ['greet', 'compliment', 'howareyou', 'q_from', 'q_like', 'handkiss', 'gift', 'poem', 'love', 'kiss', 'meet', 'dance'];

  const evById = id => V.EVENTS.events.find(e => e.id === id);
  const isQ = e => e.cat === 'question';
  const dame = (char, L) => (char && char.gender === '♂' ? (L === 'fr' ? 'messire' : 'my lord') : (L === 'fr' ? 'ma dame' : 'my lady'));
  function sayOf(id, char, L) {
    const s = SAY[id];
    if (!s) { const e = evById(id); return e ? e.name[L] : ''; }
    const txt = L === 'fr' ? ((char && char.gender === '♂' && s[2]) || s[1]) : s[0];
    return txt.replace('{dame}', dame(char, L));
  }
  const chip = (id, char, L, why) => { const e = evById(id); return e ? { id, icon: e.icon, label: e.name[L], text: sayOf(id, char, L), why: why || [] } : null; };

  // answer chips for the question she asked
  function answers(ctx, L) {
    const A = (V.ASKS || []).find(a => a.id === ctx.asked);
    if (!A) return [];
    const why = [L === 'fr' ? 'Répondre à sa question' : 'Answer her question'];
    if (A.kind === 'yn') return [
      { id: 'yes', icon: '✅', label: L === 'fr' ? 'Oui' : 'Yes', text: L === 'fr' ? 'Oui, bien sûr.' : 'Yes, of course.', why },
      { id: 'no', icon: '❌', label: L === 'fr' ? 'Non' : 'No', text: L === 'fr' ? 'Non, pas vraiment.' : 'No, not really.', why }];
    if (A.id === 'a_from' || A.id === 'a_food') {
      const city = (ctx.user && ctx.user.city) || 'London';
      return [{ id: 'place', icon: '🗺️', label: city, text: L === 'fr' ? `Je suis né à ${city}.` : `I was born in ${city}.`, why }];
    }
    return [];
  }

  function quick(ctx) {
    const L = ctx.lang === 'fr' ? 'fr' : 'en', char = ctx.char, log = ctx.log || [], recent = log.slice(-5);
    const cur = ctx.current ? evById(ctx.current) : null;
    const pool = new Map();
    const add = (id, pts, why) => {
      const e = evById(id);
      if (!e || !V.Bot.fits(char, e)) return;
      const x = pool.get(id) || { id, s: 0, why: [] };
      x.s += pts; if (why) x.why.push(why);
      pool.set(id, x);
    };
    const T = (en, fr) => (L === 'fr' ? fr : en);
    // candidates
    V.EVENTS.events.forEach(e => add(e.id, 0));
    if (cur && FLOW[cur.id]) FLOW[cur.id].forEach((id, k) => add(id, 3 - k * 0.2, T('Natural next step', 'Suite naturelle')));
    if (cur && cur.cat === 'intimacy') ['faster', 'slower', 'again', 'name', 'look'].forEach(id => add(id, 2, T('During intimacy', "Pendant l'intimité")));
    // 🎬 steps of the scene in progress, or 📖 the scene her episode waits for (js/scenes.js)
    if (V.Scenes && ctx.scene) V.Scenes.next(ctx.scene, char).forEach((id, k) => add(id, 5 - k * 0.3, T('🎬 Scene step', '🎬 Étape de la scène')));
    else if (V.Scenes && char) { const ep = V.Scenes.epNext(char.mem); if (ep) add(ep.open, 2.5, T('📖 Next scene of the episode', '📖 Scène suivante de l’épisode')); }
    if (!cur) OPENERS.forEach(id => add(id, isQ(evById(id) || {}) ? 1 : 0.8, ''));
    if (ctx.empty) add('greet', 4, T('A first letter', 'Une première lettre'));
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 5) ['cuddle', 'meet'].forEach(id => add(id, 0.5, T('It is night', "C'est la nuit")));
    const home = char && V.Gen.regionOf(char) && (V.ORIGINS || {})[V.Gen.regionOf(char)];
    // scoring of every candidate
    pool.forEach(x => {
      const e = evById(x.id);
      if (isQ(e)) {
        if (log.includes(x.id)) x.s -= 3; else { x.s += 0.6; x.why.push(T('Not asked yet', 'Pas encore demandé')); }
        if (home && ['q_from', 'q_food', 'q_drink', 'q_saint', 'q_feast', 'q_song', 'q_proverb', 'q_tongue'].includes(x.id) && !log.includes(x.id)) { x.s += 1; x.why.push(T('Her homeland', 'Sa terre natale')); }
      }
      if ((e.variants || []).some(v => (v.traits || v.origin) && V.Bot.fits(char, v))) { x.s += 1.5; x.why.push(T('Suits her temper', 'Convient à son caractère')); }
      if (e.traits) { x.s += 2; x.why.push(T('Only for her kind', 'Réservé à son genre')); }
      if (recent.includes(x.id)) x.s -= 2;
      if (e.cat === 'intimacy' && !(cur && (cur.cat === 'tender' || cur.cat === 'intimacy'))) x.s -= 1;
      if (e.kind === 'cmd' && !(cur && cur.kind === 'act')) x.s -= 3;
      if (cur && x.id === cur.id) x.s -= 4;
    });
    const top = [...pool.values()].filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 6).map(x => chip(x.id, char, L, x.why.slice(0, 2)));
    return answers(ctx, L).concat(top).filter(Boolean).slice(0, 7);
  }

  // 🔮 chips for what is being typed
  function complete(text, char, lang) {
    const L = lang === 'fr' ? 'fr' : 'en';
    const words = V.Bot.norm(text).trim().split(' ');
    const last = words[words.length - 1] || '';
    if (last.length < 2) return [];
    const res = [];
    V.EVENTS.events.forEach(e => {
      if (!V.Bot.fits(char, e)) return;
      let s = 0;
      ['en', 'fr'].forEach(l => {
        if (V.Bot.norm(e.name[l]).includes(' ' + last)) s = Math.max(s, 3);
        (e.when[l] || []).forEach(w => { const k = V.Bot.norm(w.replace(/^=/, '')).trim(); if ((' ' + k).includes(' ' + last)) s = Math.max(s, k.startsWith(last) ? 2.5 : 1.5); });
      });
      if (s) res.push({ s, c: chip(e.id, char, L, []) });
    });
    return res.sort((a, b) => b.s - a.s).slice(0, 6).map(x => x.c);
  }

  // "⋯" picker: everything she can react to, by category
  function groups(char, lang) {
    const L = lang === 'fr' ? 'fr' : 'en';
    const CAT = [['question', '❓', 'Questions', 'Questions'], ['courtship', '💐', 'Courtship', 'Galanterie'], ['tender', '🫂', 'Tenderness', 'Tendresse'], ['intimacy', '🔥', 'Intimacy', 'Intimité'], ['command', '🗣️', 'Commands', 'Ordres']];
    return CAT.map(([cat, ic, en, fr]) => ({ cat, title: `${ic} ${L === 'fr' ? fr : en}`, items: V.EVENTS.events.filter(e => e.cat === cat && V.Bot.fits(char, e)).map(e => chip(e.id, char, L)) }));
  }

  // 🕯️ Dame Mathilde's advice above the letter (like Carmen's 💡 Lia): one sentence for the moment + up to 4 event chips
  // order: her question → 🎬 scene in progress → 📅 feast day not spoken of yet → first letter → after the climax → 📖 episode → intimacy → tenderness → a new episode / scene
  function tips(ctx) {
    const L = ctx.lang === 'fr' ? 'fr' : 'en', char = ctx.char, mem = (char && char.mem) || {}, S = V.Scenes;
    const T = (en, fr) => (L === 'fr' ? fr : en), b = s => `<b>${s}</b>`;
    const cur = ctx.current ? evById(ctx.current) : null, nm = id => { const e = evById(id); return e ? `${e.icon} ${e.name[L]}` : id; };
    const ok = ids => ids.filter((id, i) => ids.indexOf(id) === i && evById(id) && V.Bot.fits(char, evById(id))).slice(0, 4);
    const res = (say, ids) => ({ say, ids: ok(ids || []) });
    const p = S && ctx.scene ? S.progress(ctx.scene, char) : null;
    if (ctx.asked) return res(T('She asked you something. Answer her first: your next letter is your reply.', 'Elle vous a posé une question. Répondez d’abord : votre prochaine lettre sera la réponse.'));
    if (p) {
      const nx = S.next(ctx.scene, char), dots = '●'.repeat(p.n) + '○'.repeat(Math.max(0, p.need - p.n));
      const how = p.ready ? T(`all done, finish it with ${b(nm(p.sc.fin))}.`, `tout est fait, finissez par ${b(nm(p.sc.fin))}.`)
        : p.sc.mode === 'seq' ? T(`in order, next comes ${b(nm(nx[0]))}.`, `dans l’ordre, ensuite ${b(nm(nx[0]))}.`)
        : T(`do any of these, in any order.`, `faites l’un de ceux-ci, dans l’ordre qu’il vous plaira.`);
      return res(`🎬 ${b(S.label(p.sc, L))} ${dots} ${p.n}/${p.need}: ${how}`, nx);
    }
    // 📅 a feast day she has not spoken of yet (js/feasts.js)
    const fe = V.Feasts && V.Feasts.current();
    if (fe && mem.feastDay !== V.Feasts.dayKey(new Date()) + ':' + fe.id) return res(T(`📅 Today is ${b(fe.icon + ' ' + fe.name[L])}. ${fe.desc[L] || ''} Wish her a happy feast, bring a gift, take her dancing.`,
      `📅 C’est aujourd’hui ${b(fe.icon + ' ' + fe.name[L])}. ${fe.desc[L] || ''} Souhaitez-lui bonne fête, offrez un présent, emmenez-la danser.`), ['greet', 'gift', 'feast', 'dance']);
    if (ctx.empty) return res(T('A first letter! Greet her properly, praise her, ask where she comes from.', 'Une première lettre ! Saluez-la comme il se doit, complimentez-la, demandez d’où elle vient.'), ['greet', 'compliment', 'q_from', 'handkiss']);
    if (cur && cur.id === 'climax') return res(T('Do not run off now. Hold her, tell her you love her: she will remember.', 'Ne filez pas maintenant. Serrez-la, dites-lui que vous l’aimez : elle s’en souviendra.'), ['cuddle', 'love', 'q_memory', 'again']);
    const ep = S && S.epNext(mem), E = ep && S.epById(mem.ep.id);
    if (E) return res(T(`📖 ${b(S.label(E, L))} ${mem.ep.i + 1}/${E.scenes.length}: the next scene is ${b(S.label(ep, L))}, it begins with ${b(nm(ep.open))}.`,
      `📖 ${b(S.label(E, L))} ${mem.ep.i + 1}/${E.scenes.length} : la scène suivante est ${b(S.label(ep, L))}, elle commence par ${b(nm(ep.open))}.`), [ep.open]);
    // 🤝❤️🔥 her feelings (js/feel.js)
    const f = V.Feel && char ? V.Feel.init(char) : null, fn = k => `${V.Feel.meta(k).icon} ${V.Feel.meta(k).name[L]} ${f[k]}`;
    if (f && cur && cur.kind === 'act' && V.Feel.tooSoon(cur, f)) {
      const n = V.Feel.needOf(cur), k = Object.keys(n).find(x => f[x] < n[x]);
      return res(T(`She hesitates: ${b(nm(cur.id))} asks for ${b(V.Feel.meta(k).name[L] + ' ' + n[k])} and she has ${b(fn(k))}. Slow down and win her first.`,
        `Elle hésite : ${b(nm(cur.id))} demande ${b(V.Feel.meta(k).name[L] + ' ' + n[k])} et elle en a ${b(fn(k))}. Ralentissez et gagnez-la d’abord.`), ['slower', 'hug', 'handhold', 'love']);
    }
    if (f && f.desire >= 80 && !(cur && cur.cat === 'intimacy')) return res(T(`${b(fn('desire'))}: she is burning. Do not keep her waiting.`, `${b(fn('desire'))} : elle brûle. Ne la faites pas attendre.`), ['undress', 'kiss', 'missionary', 'lower']);
    if (cur && cur.cat === 'intimacy') return res(T('Keep the rhythm or change it; when you cannot hold back, the climax.', 'Gardez le rythme ou changez-le ; quand vous n’en pouvez plus, l’extase.'), (FLOW[cur.id] || []).concat('climax'));
    if (cur && cur.kind === 'act') return res(T('She is warming to you. Go a little further, gently.', 'Elle se laisse aller. Allez un peu plus loin, doucement.'), FLOW[cur.id] || []);
    if (f && f.trust < 15) return res(T(`${b(fn('trust'))}: she does not trust you yet. An apology, an embrace, a question about her fears will help.`, `${b(fn('trust'))} : elle ne vous fait pas encore confiance. Des excuses, une étreinte, une question sur ses peurs aideront.`), ['sorry', 'hug', 'q_fear', 'pray']);
    if (f && f.love < 5) return res(T(`${b(fn('love'))}: her heart is not won yet. Poems, gifts and sweet words.`, `${b(fn('love'))} : son cœur n’est pas encore conquis. Poèmes, présents et mots doux.`), ['poem', 'gift', 'compliment', 'dance']);
    if (S) {
      const e = (V.EPISODES || []).find(x => !(mem.eps || {})[x.id] && S.epOk(x, char, mem));
      if (e) { const first = S.byId(e.scenes[0]); return res(T(`📖 She dreams of ${b(S.label(e, L))}. It starts with the scene ${b(S.label(first, L))}: ${b(nm(first.open))}.`, `📖 Elle rêve de ${b(S.label(e, L))}. Cela commence par la scène ${b(S.label(first, L))} : ${b(nm(first.open))}.`), [first.open]); }
      const scs = (V.SCENES || []).filter(s => S.usable(s, char) && !(mem.scenes || {})[s.id]);
      if (scs.length) { const sc = scs[0]; return res(T(`🎬 You have never played ${b(S.label(sc, L))} with her. It begins with ${b(nm(sc.open))}.`, `🎬 Vous n’avez jamais joué ${b(S.label(sc, L))} avec elle. Cela commence par ${b(nm(sc.open))}.`), [sc.open]); }
    }
    return res(T('Court her: a compliment, a question about her land, a dance.', 'Faites-lui la cour : un compliment, une question sur sa terre, une danse.'), ['compliment', 'q_feast', 'dance']);
  }

  return { SAY, FLOW, quick, complete, groups, sayOf, chip, tips };
})();
