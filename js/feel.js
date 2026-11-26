/*
 * Valeria - 🤝❤️🔥 feelings and 📰 status cards engine (data: js/data/feelings.js)
 * init(char) → character.feel (created from FEEL_INIT the first time)
 * step({ char, id, recent, answered, scene, gapDays, lang, you }) after each bot answer:
 *   id = event / question / command your letter triggered (Bot.match), recent = ids of the previous letters,
 *   answered = you answered her question, scene = kinds from Scenes.step ('end', 'fail', 'epEnd'…)
 *   → { d: { trust, love, desire } real change, cards: [sys note texts] (max 2), chip: '🤝+2 ❤️+1' }
 * Card: "🤝 Trust 48 → 52 · “her line”". Level (localStorage 'valeria:cards'): '0' off, '1' cards, missing = cards + change chips.
 */
window.Valeria = window.Valeria || {};

Valeria.Feel = (() => {
  const V = Valeria, KEYS = ['trust', 'love', 'desire'];
  const clamp = n => Math.max(0, Math.min(100, Math.round(n)));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const meta = k => V.FEELINGS.find(x => x.id === k);
  // masculine French for a lord
  const MASC = [['blessée', 'blessé'], ['prête', 'prêt'], ['froide', 'froid'], ['sûre', 'sûr']];

  function init(c) {
    if (c.feel && typeof c.feel === 'object') {
      KEYS.forEach(k => { if (typeof c.feel[k] !== 'number') c.feel[k] = V.FEEL_INIT.base[k]; });
      return c.feel;
    }
    const f = Object.assign({}, V.FEEL_INIT.base);
    (c.traits || []).forEach(t => { const x = V.FEEL_INIT.traits[t]; if (x) KEYS.forEach(k => { f[k] += x[k] || 0; }); });
    KEYS.forEach(k => { f[k] = clamp(f[k]); });
    return (c.feel = f);
  }
  const add = (d, o) => KEYS.forEach(k => { if (o && o[k]) d[k] = (d[k] || 0) + o[k]; });
  const needOf = ev => (ev.id in V.FEEL_NEED ? V.FEEL_NEED[ev.id] : V.FEEL_NEED_CAT[ev.cat]) || null;
  // the act needs more trust / love than she has
  const tooSoon = (ev, f) => { const n = ev && needOf(ev); return !!n && KEYS.some(k => n[k] && f[k] < n[k]); };

  function step({ char, id, recent, answered, scene, gapDays, lang, you }) {
    const L = lang === 'fr' ? 'fr' : 'en', f = init(char), before = Object.assign({}, f), d = {}, cards = [];
    const ev = id && V.EVENTS.events.find(e => e.id === id);
    const say = k => {
      let s = pick(V.FEEL_SAY[k][L]).replace(/\{(sen|you)\}/g, you || '');
      if (L === 'fr' && char.gender === '♂') MASC.forEach(([a, b]) => { s = s.split(a).join(b); });
      const [emo, line] = s.split('|');
      return { emo, line };
    };
    const card = (k, key) => {
      const { emo, line } = say(k), m = meta(key);
      cards.push(`${emo} ${m.icon} ${m.name[L]} ${before[key]} → ${f[key]} · “${line}”`);
    };
    let soon = false;
    if (ev) {
      add(d, V.FEEL_EV[ev.id] || V.FEEL_CAT[ev.cat]);
      if (ev.kind === 'act' && tooSoon(ev, f)) { soon = true; add(d, V.FEEL_MORE.tooSoon); }
      // the same thing again so soon: less touching
      if ((recent || []).includes(ev.id)) ['trust', 'love'].forEach(k => { if (d[k] > 0) d[k] = d[k] / 2; });
      const O = (V.ORIGINS || {})[V.Gen.regionOf(char)] || {};
      if ((O.likes || []).includes(ev.id)) add(d, V.FEEL_MORE.like);
      if ((O.dislikes || []).includes(ev.id)) add(d, V.FEEL_MORE.dislike);
    }
    if (answered) add(d, V.FEEL_MORE.answer);
    (scene || []).forEach(k => add(d, { end: V.FEEL_MORE.sceneEnd, fail: V.FEEL_MORE.sceneFail, epEnd: V.FEEL_MORE.epEnd }[k]));
    if (gapDays >= 2) add(d, V.FEEL_MORE.away);
    (char.traits || []).forEach(t => { const m = V.FEEL_MUL[t]; if (m) KEYS.forEach(k => { if (m[k] && d[k] > 0) d[k] *= m[k]; }); });
    KEYS.forEach(k => {
      const x = d[k] || 0;
      f[k] = clamp(f[k] + (x > 0 ? Math.max(1, Math.round(x)) : Math.min(0, Math.round(x))));
      d[k] = f[k] - before[k];
    });

    // 📰 cards
    const up = (k, steps) => steps.filter(s => before[k] < s && f[k] >= s).pop();
    const dn = (k, steps) => steps.find(s => before[k] >= s && f[k] < s);
    if (soon) card('tooSoon', 'trust');
    if (id === 'climax') card('fin', 'desire');
    ['trust', 'love'].forEach(k => {
      if (soon && k === 'trust') return;
      if (up(k, V.FEEL_STEPS)) card(k + 'Up', k);
      else if (dn(k, V.FEEL_STEPS)) card(k + 'Dn', k);
    });
    const dz = id !== 'climax' && up('desire', V.DESIRE_STEPS);
    if (dz) card('desireUp' + dz, 'desire');
    const chip = KEYS.filter(k => d[k]).map(k => `${meta(k).icon}${d[k] > 0 ? '+' : ''}${d[k]}`).join(' ');
    return { d, cards: cards.slice(0, 2), chip };
  }

  // 🧪 / books: what one event does (no randomness)
  const of = id => { const ev = V.EVENTS.events.find(e => e.id === id); return ev ? (V.FEEL_EV[ev.id] || V.FEEL_CAT[ev.cat] || {}) : {}; };

  return { KEYS, init, step, tooSoon, needOf, of, meta };
})();
