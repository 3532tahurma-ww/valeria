/*
 * Valeria - EN / FR
 * Dictionaries: js/lang/en.js, js/lang/fr.js (Valeria.LANG.<code> = { key: text }).
 * t('key', { n: 2 }) → text with {n} replaced; missing FR keys fall back to EN, then to the key.
 */
window.Valeria = window.Valeria || {};
Valeria.LANG = Valeria.LANG || {};

Valeria.I18n = (() => {
  const KEY = 'valeria:lang';
  let lang = localStorage.getItem(KEY) === 'fr' ? 'fr' : 'en';
  document.documentElement.lang = lang;

  function t(key, vars) {
    const d = Valeria.LANG[lang] || {}, en = Valeria.LANG.en || {};
    let s = d[key] != null ? d[key] : en[key] != null ? en[key] : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  }

  function setLang(l) {
    lang = l === 'fr' ? 'fr' : 'en';
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
  }

  return { t, setLang, get lang() { return lang; } };
})();
