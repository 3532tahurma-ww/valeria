/*
 * Valeria - persistent data (localStorage)
 * The state shape is the Carmen / Amor Stories backup "state" (docs: ProjectMemory/backup.md):
 *   user, characters, threads, chats, side, turns, pinned, keywords
 * Valeria-only fields (ignored by Carmen):
 *   characters[].lang ('en' | 'fr'), characters[].house (Valeria.HOUSES id)
 *   bot:      thread id -> false when bot mode was switched off (missing = on, the default)
 *   botEvent: thread id -> current bot event id (e.g. 'missionary') or null
 *   botAsk:   thread id -> id of the question she asked (js/data/talk.js ASKS), answered by your next letter
 *   botLog:   thread id -> last 12 event / question ids you triggered (⚡ shortcuts skip recent ones)
 *   botScene: thread id -> 🎬 scene in progress { id, done: [event ids], idle } (js/scenes.js)
 *   myFeasts: 📅 your own special days [{ id: 'my-…', m, d, icon, look, name: {en, fr}, desc: {en, fr} }] (js/feasts.js, 🎉 Feast lab)
 *   characters[].mem.feastDay: 'YYYY-M-D:feast id' she last spoke of
 *   characters[].feel: 🤝❤️🔥 { trust, love, desire } 0–100 (js/feel.js); her messages may carry feel: '🤝+2 ❤️+1', status-card notes st: 1
 *   characters[].mem.scenes / eps / ep / epSeen: 🎬 scenes completed and 📖 episodes (js/scenes.js)
 * Unknown fields from a Carmen backup (monia, accounts, ...) are kept untouched so a round trip loses nothing.
 */
window.Valeria = window.Valeria || {};

Valeria.Store = (() => {
  const KEY = 'valeria:v1';
  const defaults = () => ({
    user: { name: '', age: '', city: '', photo: '' },
    characters: [],
    threads: [],
    chats: {},
    side: {},
    turns: {},
    pinned: [],
    keywords: [],
    bot: {},
    botEvent: {},
    botAsk: {},
    botLog: {},
    botScene: {},
    myFeasts: []
  });

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

  function fill(data) {
    const s = Object.assign(defaults(), isObj(data) ? data : {});
    ['characters', 'threads', 'pinned', 'keywords', 'myFeasts'].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
    ['chats', 'side', 'turns', 'bot', 'botEvent', 'botAsk', 'botLog', 'botScene'].forEach(k => { if (!isObj(s[k])) s[k] = {}; });
    s.user = Object.assign(defaults().user, isObj(s.user) ? s.user : {});
    s.characters.forEach(c => {
      ['traits', 'album', 'tags'].forEach(k => { if (!Array.isArray(c[k])) c[k] = []; });
      if (c.age != null) c.age = String(c.age);
    });
    s.threads.forEach(th => { if (!Array.isArray(s.chats[th.id])) s.chats[th.id] = []; });
    return s;
  }

  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  let state = fill(read());

  // false when the storage quota is full
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
  }

  function replace(data) {
    const prev = state;
    state = fill(data);
    if (save()) return true;
    state = prev;
    return false;
  }

  return { get state() { return state; }, save, replace, uid };
})();
