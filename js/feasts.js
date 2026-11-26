/*
 * Valeria - 📅 feast days engine (data: js/data/feasts.js)
 * all()       → FEASTS + your own special days (state.myFeasts, added in the 🎉 Feast lab: { id: 'my-…', m, d, icon, look, name, desc })
 * dateOf(f,y) → Date of a feast in year y (movable ones from Easter, Gregorian computus)
 * current()   → today's feast (or the one previewed in the lab), else null · next() → { f, date } the coming one
 * apply()     → dresses the app for the day: body.feast.feast-<look>, palette (look.vars), drifting emojis instead of the dust,
 *               the look's screen effect once a day. Designs can be switched off ('valeria:feasts' = '0'); a lab preview always shows.
 * line(f, char, L, you) → what she says about it (feast lines, else the look's), prouder when it is her homeland's saint (f.home)
 * In letters (app.js botReply) she speaks of the feast once a day (mem.feastDay = 'YYYY-M-D:id').
 */
window.Valeria = window.Valeria || {};

Valeria.Feasts = (() => {
  const V = Valeria, OFF = 'valeria:feasts', SEEN = 'valeria:feastFx', PREV = 'valeria:feastPreview';
  const get = (s, k) => { try { return s.getItem(k); } catch (e) { return null; } };
  const set = (s, k, v) => { try { if (v == null) s.removeItem(k); else s.setItem(k, v); } catch (e) {} };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rnd = (a, b) => a + Math.random() * (b - a);

  function easter(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  const all = () => (V.FEASTS || []).concat(((V.Store && V.Store.state.myFeasts) || []).filter(f => f && f.m && f.d));
  const byId = id => all().find(f => f.id === id);
  function dateOf(f, y) {
    if (f.e != null) { const e = easter(y); return new Date(y, e.getMonth(), e.getDate() + f.e); }
    return new Date(y, f.m - 1, f.d);
  }
  const dayKey = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const same = (a, b) => dayKey(a) === dayKey(b);
  const on = d => all().find(f => same(dateOf(f, d.getFullYear()), d)) || null;
  const year = y => all().map(f => ({ f, date: dateOf(f, y) })).sort((a, b) => a.date - b.date);
  function next(d0) {
    const d = d0 || new Date(), t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return year(d.getFullYear()).find(x => x.date > t) || year(d.getFullYear() + 1)[0];
  }
  const previewId = () => get(sessionStorage, PREV);
  const current = () => (previewId() && byId(previewId())) || on(new Date());
  const enabled = () => get(localStorage, OFF) !== '0';
  const look = f => (V.FEAST_LOOKS || {})[f && f.look] || V.FEAST_LOOKS.saint;
  const isHome = (f, char) => {
    if (!f || !f.home || !char) return false;
    const id = V.Gen.regionOf(char), r = (V.REGIONS || []).find(x => x.id === id);
    return f.home.some(o => o === id || (r && o === 'realm:' + r.realm));
  };
  const HOME = { en: ['{feast} is our own saint at home! The whole of {region} is feasting today.', 'At home in {region} they ring every bell for {feast}. I miss it.'],
    fr: ['{feast}, c’est notre saint à nous ! Tout le pays de {region} est en fête aujourd’hui.', 'Chez moi, en {region}, on sonne toutes les cloches pour {feast}. Cela me manque.'] };
  // your own special days (state.myFeasts)
  const MINE = { en: ['Today is {feast}! Did you think I would forget, {sen}?', 'I marked {feast} in my book of hours. Happy day to us.', '{feast}… I wore my best gown, just in case your letter came.'],
    fr: ['C’est aujourd’hui {feast} ! Pensiez-vous que j’oublierais, {sen} ?', 'J’ai marqué {feast} dans mon livre d’heures. Belle journée à nous.', '{feast}… j’ai mis ma plus belle robe, au cas où votre lettre viendrait.'] };
  function line(f, char, lang, you) {
    const L = lang === 'fr' ? 'fr' : 'en', r = (V.REGIONS || []).find(x => x.id === V.Gen.regionOf(char));
    const pool = isHome(f, char) ? HOME[L] : String(f.id).startsWith('my-') ? MINE[L] : ((f.say && f.say[L] && f.say[L].length) ? f.say[L] : look(f).say[L]);
    return pick(pool).replace(/\{feast\}/g, f.name[L]).replace(/\{(sen|you)\}/g, you || '').replace(/\{region\}/g, r ? r.name[L] : '');
  }

  // dress the app for the day
  function apply() {
    const prev = previewId(), f = (prev || enabled()) ? current() : null, b = document.body, amb = document.getElementById('ambient');
    [...b.classList].filter(c => c === 'feast' || c.startsWith('feast-')).forEach(c => b.classList.remove(c));
    ['--wine', '--wine2', '--gold'].forEach(k => b.style.removeProperty(k));
    if (amb) { amb.innerHTML = ''; amb.className = ''; }
    if (!f) { V.FX.ambient(); return null; }
    const lk = look(f);
    b.classList.add('feast', 'feast-' + f.look);
    Object.keys(lk.vars || {}).forEach(k => b.style.setProperty(k, lk.vars[k]));
    if (amb && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const emo = lk.fall || lk.rise || ['✨'];
      amb.className = 'fe ' + (lk.fall ? 'down' : 'up');
      amb.innerHTML = Array.from({ length: 16 }, () => `<i style="left:${rnd(0, 100).toFixed(1)}%;animation-delay:-${rnd(0, 20).toFixed(1)}s;animation-duration:${rnd(14, 26).toFixed(1)}s;--drift:${rnd(-40, 40).toFixed(0)}px;--fs:${rnd(12, 22).toFixed(0)}px">${pick(emo)}</i>`).join('');
    }
    const k = dayKey(new Date()) + ':' + f.id;
    if (!prev && get(localStorage, SEEN) !== k) { set(localStorage, SEEN, k); setTimeout(() => V.FX.play(lk.fx), 900); }
    return f;
  }
  function setPreview(id) { set(sessionStorage, PREV, id || null); const f = apply(); if (f && id) V.FX.play(look(f).fx); }
  function setEnabled(on) { set(localStorage, OFF, on ? null : '0'); apply(); }

  return { easter, all, byId, dateOf, dayKey, on, year, next, current, enabled, setEnabled, previewId, setPreview, look, isHome, line, apply };
})();
