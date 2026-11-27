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

  /* 💾 Split storage (like Carmen): each chat in its own key (KEY:c:<thread id>), the main record has chats: {} + __split list.
   * Big, rarely changing fields go to KEY:p:<field> (null in the main record). Only keys whose text changed are written.
   * Without __split (old single-key record) the chat keys are merged by message id, so nothing is lost. */
  const CPRE = KEY + ':c:', PPRE = KEY + ':p:', PARTS = ['monia'];
  const written = new Map();
  const getItem = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const parse = s => { try { return JSON.parse(s); } catch (e) { return null; } };
  const chatKeys = () => { const a = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(CPRE)) a.push(k); } } catch (e) {} return a; };

  function read() {
    const raw = getItem(KEY), data = parse(raw);
    if (!isObj(data)) return null;
    const split = Array.isArray(data.__split);
    if (!isObj(data.chats)) data.chats = {};
    chatKeys().forEach(k => {
      const id = k.slice(CPRE.length), s = getItem(k), msgs = parse(s);
      if (!Array.isArray(msgs)) return;
      if (split) { if (data.__split.includes(id)) { data.chats[id] = msgs; written.set(k, s); } return; }
      const have = Array.isArray(data.chats[id]) ? data.chats[id] : [], ids = new Set(have.map(m => m.id));
      data.chats[id] = have.concat(msgs.filter(m => !ids.has(m.id))).sort((a, b) => (a.ts || 0) - (b.ts || 0));
    });
    if (split) {
      written.set(KEY, raw);
      PARTS.forEach(p => {
        if (data[p] != null) return;
        const s = getItem(PPRE + p), v = parse(s);
        if (v != null) { data[p] = v; written.set(PPRE + p, s); } else delete data[p];
      });
    }
    delete data.__split;
    return data;
  }
  let state = fill(read());

  // false when the storage quota is full
  function save() {
    try {
      const chats = state.chats || {}, ids = Object.keys(chats), keep = new Set([KEY]), nul = {};
      // chats first, then the main record (if the quota fills halfway, the main record still lists the old chats)
      ids.forEach(id => {
        const k = CPRE + id, s = JSON.stringify(chats[id] || []);
        keep.add(k);
        if (written.get(k) !== s) { localStorage.setItem(k, s); written.set(k, s); }
      });
      PARTS.forEach(p => {
        if (state[p] == null) return;
        const k = PPRE + p, s = JSON.stringify(state[p]);
        keep.add(k); nul[p] = null;
        if (written.get(k) !== s) { localStorage.setItem(k, s); written.set(k, s); }
      });
      const main = JSON.stringify(Object.assign({}, state, nul, { chats: {}, __split: ids }));
      if (written.get(KEY) !== main) { localStorage.setItem(KEY, main); written.set(KEY, main); }
      [...written.keys()].forEach(k => { if (!keep.has(k)) { localStorage.removeItem(k); written.delete(k); } });
      if (!save.swept) { save.swept = true; chatKeys().forEach(k => { if (!keep.has(k)) localStorage.removeItem(k); }); }
      return true;
    } catch (e) { return false; }
  }

  function replace(data) {
    const prev = state;
    state = fill(data);
    if (save()) return true;
    state = prev;
    save();
    return false;
  }

  // 💾 bytes used by Valeria in localStorage (UTF-16: 2 bytes per char)
  function usage() {
    let n = 0;
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(KEY)) n += (k.length + (localStorage.getItem(k) || '').length) * 2; } } catch (e) {}
    return n;
  }

  return { get state() { return state; }, save, replace, uid, usage };
})();
