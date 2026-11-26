/*
 * Valeria - all screens
 * Screens (view.name): court, map (js/map.js), letters, profile {id}, edit {id?, keep}, group, chat {id, back}, me
 * Clicks, submits and changes are delegated on #main (data-go, data-char, data-thread, data-trait, data-act).
 */
(() => {
  const V = window.Valeria;
  const Store = V.Store;
  V.VERSION = '0.5.1';
  const S = () => Store.state;
  const t = (k, v) => V.I18n.t(k, v);
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const main = $('#main');

  let view = { name: 'home' };
  let draft = null;   // character being edited
  let sel = null;     // selected message id in chat
  let typing = null;  // { tid, name } while the bot "messenger" is on the way
  let pendingFx = ''; // effect for the next message sent
  let fxFor = null;   // 'next' | message id: what the open effect bar applies to
  let fresh = new Set(); // message ids that animate in on the next draw

  /* ---------- helpers ---------- */
  const save = () => { if (!Store.save()) alert(t('err.storage')); };
  const charById = id => S().characters.find(c => c.id === id);
  const threadById = id => S().threads.find(x => x.id === id);
  const userName = () => S().user.name || t('you');
  const charLang = c => (c && (c.lang === 'fr' || c.lang === 'en')) ? c.lang : V.I18n.lang;
  // "Boob Size: 85" → "🍒 Bosom: 85" (figure traits, js/data/body.js); others from the dictionary
  const isFig = tr => String(tr).includes(': ');
  const traitLabel = tr => {
    if (isFig(tr)) {
      const [g, v] = String(tr).split(': '), F = (V.FIGURE || []).find(x => x.id === g), fr = V.I18n.lang === 'fr';
      return F ? `${F.icon} ${F.label[V.I18n.lang]}: ${fr ? (V.FIGURE_FR[v] || v) : v}` : (g === 'Dick Size' ? `🍆 ${fr ? (V.FIGURE_FR[v] || v) : v}` : tr);
    }
    const k = 'trait.' + tr, s = t(k); return s === k ? tr : s;
  };
  const userTraits = () => (S().user.gender !== '♀' && S().user.dick ? ['Dick Size: ' + S().user.dick] : []);
  const houseOf = id => V.HOUSES.find(h => h.id === id);
  const houseLabel = id => { const h = houseOf(id); return h ? h.name[V.I18n.lang] : ''; };
  const fmtDay = ts => ts ? new Date(ts).toLocaleDateString(V.I18n.lang, { day: 'numeric', month: 'short' }) : '';
  const fmtStamp = ts => new Date(ts).toLocaleString(V.I18n.lang, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  // 🤖 bot mode is on unless switched off for that correspondence
  const botOn = id => S().bot[id] !== false;
  const regionLabel = id =>{ const r = V.REGIONS.find(x => x.id === id); return r ? r.name[V.I18n.lang] : ''; };

  // 🧠 her memory on the profile (character.mem, written by botReply): firsts with dates, favourites, your answers; ✕ forgets a row
  function memoryCard(c) {
    const M = c.mem || {}, L = V.I18n.lang, evs = V.EVENTS.events;
    const ev = id => evs.find(e => e.id === id);
    const date = ts => new Date(ts).toLocaleDateString(L, { day: 'numeric', month: 'short', year: 'numeric' });
    const firsts = Object.keys(M.first || {}).filter(id => ev(id) && ev(id).kind === 'act').sort((a, b) => M.first[a] - M.first[b]);
    const favs = Object.keys(M.count || {}).filter(id => ev(id) && M.count[id] >= 2).sort((a, b) => M.count[b] - M.count[a]).slice(0, 5);
    const asks = Object.keys(M.asks || {}).filter(id => (V.ASKS || []).some(a => a.id === id));
    if (!firsts.length && !favs.length && !asks.length) return `<div class="memory empty-mem"><h4>🧠 ${t('mem.title')}</h4><p class="small muted">${t('mem.none')}</p></div>`;
    const x = (k) => `<button class="mem-x" data-act="mem-del" data-k="${esc(k)}" title="${t('mem.forget')}">✕</button>`;
    const ansTxt = v => (v === 'yes' ? '✅ ' + t('mem.yes') : v === 'no' ? '❌ ' + t('mem.no') : '✒️ ' + v);
    return `<div class="memory"><h4>🧠 ${t('mem.title')}</h4>
      ${firsts.length ? `<h5>🌟 ${t('mem.firsts')}</h5><ul>${firsts.map(id => `<li>${ev(id).icon} ${esc(ev(id).name[L])} <small>${date(M.first[id])}</small>${x('first:' + id)}</li>`).join('')}</ul>` : ''}
      ${favs.length ? `<h5>❤️ ${t('mem.favs')}</h5><ul>${favs.map(id => `<li>${ev(id).icon} ${esc(ev(id).name[L])} <b>×${M.count[id]}</b>${x('count:' + id)}</li>`).join('')}</ul>` : ''}
      ${asks.length ? `<h5>❔ ${t('mem.answers')}</h5><ul>${asks.map(id => { const a = V.ASKS.find(q => q.id === id); return `<li><i>${esc(a.q[L].replace('{sen}', userName()))}</i> → ${esc(ansTxt(M.asks[id]))}${x('asks:' + id)}</li>`; }).join('')}</ul>` : ''}
      ${M.last ? `<p class="small muted">📮 ${t('mem.last')}: ${date(M.last)}</p>` : ''}</div>`;
  }

  // 🌍 homeland card on the profile (js/data/origins.js)
  function homeland(c) {
    const id = V.Gen.regionOf(c), O = (V.ORIGINS || {})[id];
    if (!O) return '';
    const i = V.I18n.lang === 'fr' ? 1 : 0;
    return `<div class="homeland"><h4>🌍 ${t('profile.homeland')}: ${esc(regionLabel(id))}</h4>
      <div class="chips">
        <span class="chip">🍲 ${esc(O.food[i])}</span><span class="chip">🍷 ${esc(O.drink[i])}</span><span class="chip">🗣️ <i>${esc(O.oath[i])}</i></span>
        ${O.traits.map(x => `<span class="chip ${c.traits.includes(x) ? 'on' : ''}">${esc(traitLabel(x))}</span>`).join('')}
      </div><p class="small muted">${esc(O.custom[i].charAt(0).toUpperCase() + O.custom[i].slice(1))}.</p></div>`;
  }

  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function crest(c, cls = '') {
    const col = (c && c.colors && c.colors.length) ? c.colors : ['#7a1f2b', '#b08d3c'];
    const img = c && c.photo ? `<img src="${esc(c.photo)}" alt="" onerror="this.remove()">` : '';
    const ch = ((c && c.name) || '?').trim().charAt(0).toUpperCase();
    return `<span class="crest ${cls}" style="--c1:${esc(col[0])};--c2:${esc(col[1] || col[0])}"><b>${esc(ch)}</b>${img}</span>`;
  }
  const userCrest = cls => crest({ name: userName(), photo: S().user.photo, colors: ['#3b2a1a', '#7a5c3a'] }, cls);

  const threadChars = th => (th.group ? th.members || [] : [th.charId]).map(charById).filter(Boolean);
  const lastTs = th => {
    const m = S().chats[th.id] || [];
    return Math.max(th.opened || 0, th.created || 0, m.length ? m[m.length - 1].ts || 0 : 0);
  };
  function snippet(th) {
    const m = (S().chats[th.id] || []).slice(-1)[0];
    if (!m) return t('letters.empty');
    const who = m.from === 'me' ? userName() + ': ' : m.from === 'her' && th.group ? ((charById(m.who) || {}).name || '') + ': ' : '';
    return who + (m.type === 'photo' ? '🖼️ ' : '') + (m.text || '');
  }

  function readImage(file, max = 512) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          const k = Math.min(1, max / Math.max(img.width, img.height));
          const cv = document.createElement('canvas');
          cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          res(cv.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = rej;
        img.src = r.result;
      };
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  /* ---------- threads ---------- */
  function newThread(cid) {
    const n = S().threads.filter(x => x.charId === cid).length + 1;
    const th = { id: Store.uid(), charId: cid, title: t('thread.default', { n }), created: Date.now(), opened: 0 };
    S().threads.push(th);
    S().chats[th.id] = [];
    save();
    return th;
  }
  const lastThreadOf = cid => S().threads.filter(x => x.charId === cid).sort((a, b) => lastTs(b) - lastTs(a))[0];
  function dropThread(id) {
    const s = S();
    s.threads = s.threads.filter(x => x.id !== id);
    ['chats', 'side', 'turns', 'bot', 'botEvent', 'botAsk', 'botLog'].forEach(k => delete s[k][id]);
    s.pinned = s.pinned.filter(x => x !== id);
  }
  function openThread(id) {
    const back = view.name === 'profile' ? { name: 'profile', id: view.id } : { name: view.name === 'chat' ? 'letters' : view.name };
    sel = null;
    go('chat', { id, back });
  }

  /* ---------- navigation ---------- */
  function go(name, params = {}) {
    view = Object.assign({ name }, params);
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    const tab = { court: 'home', profile: 'home', edit: 'home', book: 'library', page: 'library', labs: 'library', lab: 'library', group: 'letters' }[view.name] || view.name;
    document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.go === tab));
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.body.classList.toggle('in-chat', view.name === 'chat');
    (screens[view.name] || screens.home)();
    main.classList.remove('enter');
    void main.offsetWidth;
    main.classList.add('enter');
  }

  /* ---------- screens ---------- */
  const screens = {
    court() {
      const cs = S().characters;
      main.innerHTML = `
        <header class="top"><h1 class="title">${t('app.name')}</h1><p class="sub">${t('court.sub')}</p></header>
        <div class="row-actions">
          <button class="btn" data-go="edit">✒️ ${t('court.create')}</button>
          <button class="btn" data-act="summon">🎲 ${t('court.summon')}</button>
          <button class="btn ghost" data-go="map">🗺️ ${t('court.toMap')}</button>
        </div>
        ${cs.length ? `<div class="grid">${cs.map(c => `
          <button class="card" data-char="${esc(c.id)}" style="--c1:${esc((c.colors || [])[0] || '#7a1f2b')}">${crest(c, 'lg')}
            <strong>${esc(c.name)}</strong>
            <small>${esc([c.job, houseLabel(c.house)].filter(Boolean).join(' · '))}</small>
            <small class="muted">${esc(c.city || '')}</small>
          </button>`).join('')}</div>`
        : `<div class="empty"><p>${t('court.empty')}</p><button class="btn" data-go="edit">${t('court.create')}</button></div>`}`;
    },

    map() { V.MapView.render(UI); },

    letters() {
      const ths = S().threads.slice().sort((a, b) => lastTs(b) - lastTs(a));
      main.innerHTML = `
        <header class="top"><h1 class="title">${t('nav.letters')}</h1></header>
        <div class="row-actions"><button class="btn ghost" data-go="group">${t('letters.newGroup')}</button></div>
        ${ths.length ? `<ul class="list">${ths.map(th => {
          const cs = threadChars(th);
          return `<li><button class="item" data-thread="${esc(th.id)}">
            <span class="crests">${cs.slice(0, 3).map(c => crest(c, 'sm')).join('')}</span>
            <span class="txt"><strong>${esc(th.title || '')}</strong>
              <small>${esc(cs.map(c => c.name).join(', '))}</small>
              <em>${esc(snippet(th))}</em></span>
            <time>${fmtDay(lastTs(th))}</time></button></li>`;
        }).join('')}</ul>` : `<div class="empty"><p>${t('letters.none')}</p></div>`}`;
    },

    profile() {
      const c = charById(view.id);
      if (!c) return go('court');
      const ths = S().threads.filter(x => x.charId === c.id).sort((a, b) => lastTs(b) - lastTs(a));
      const lang = c.lang ? t('lang.' + c.lang) : '';
      main.innerHTML = `
        <header class="bar"><button class="icon" data-go="court">‹</button><span></span><button class="icon" data-act="edit-char">✎</button></header>
        <section class="profile">
          <div class="banner" style="--c1:${esc((c.colors || [])[0] || '#7a1f2b')};--c2:${esc((c.colors || [])[1] || '#b08d3c')}">${crest(c, 'xl')}</div>
          <h2>${esc(c.name)}</h2>
          <p class="muted">${esc([c.job, houseLabel(c.house), c.city].filter(Boolean).join(' · '))}</p>
          ${V.Gen.regionOf(c) ? `<p class="meta">🗺️ ${esc(regionLabel(V.Gen.regionOf(c)))}</p>` : ''}
          <p class="meta">${[c.gender, c.age ? t('profile.age', { n: c.age }) : '', lang].filter(Boolean).map(esc).join(' · ')}</p>
          ${c.bio ? `<p class="bio">“${esc(c.bio)}”</p>` : ''}
          ${c.traits.filter(x => !isFig(x)).length ? `<div class="chips">${c.traits.filter(x => !isFig(x)).map(x => `<span class="chip">${esc(traitLabel(x))}</span>`).join('')}</div>` : ''}
          ${c.traits.some(isFig) ? `<div class="figure"><h4>📏 ${t('profile.figure')}</h4><div class="chips">${c.traits.filter(isFig).map(x => `<span class="chip">${esc(traitLabel(x))}</span>`).join('')}</div></div>` : ''}
          ${c.about ? `<div class="about">${esc(c.about)}</div>` : ''}
          ${homeland(c)}
          ${memoryCard(c)}
          <div class="row-actions">
            <button class="btn" data-act="write">${t('profile.write')}</button>
            <button class="btn ghost" data-act="new-thread">${t('profile.newThread')}</button>
          </div>
        </section>
        <h3 class="sec">${t('profile.threads')}</h3>
        ${ths.length ? `<ul class="list">${ths.map(th => `<li class="item-wrap">
          <button class="item" data-thread="${esc(th.id)}"><span class="txt"><strong>${esc(th.title)}</strong><em>${esc(snippet(th))}</em></span><time>${fmtDay(lastTs(th))}</time></button>
          <button class="icon" data-act="rename-thread" data-id="${esc(th.id)}">✎</button>
          <button class="icon" data-act="del-thread" data-id="${esc(th.id)}">🗑</button></li>`).join('')}</ul>`
        : `<p class="empty">${t('letters.none')}</p>`}
        <div class="danger"><button class="btn danger" data-act="del-char">${t('profile.delete')}</button></div>`;
    },

    edit() {
      const c = view.id ? charById(view.id) : null;
      const L = V.I18n.lang;
      // a new character opens with a random suggestion (like Carmen); view.keep re-renders the current draft
      if (!view.keep || !draft) draft = c ? JSON.parse(JSON.stringify(c)) : V.Gen.character({ lang: L });
      view.keep = false;
      const d = draft;
      const known = [...V.TRAITS.personality, ...V.TRAITS.style];
      const other = d.traits.filter(x => !known.includes(x) && !isFig(x));
      const figVal = g => ((d.traits.find(x => x.startsWith(g + ': ')) || '').split(': ')[1] || '');
      const figSel = grp => `<label>${grp.icon} ${esc(grp.label[L])}<select data-fig="${esc(grp.id)}"><option value="">—</option>${grp.items.map(v => `<option value="${esc(v)}" ${figVal(grp.id) === v ? 'selected' : ''}>${esc(L === 'fr' ? (V.FIGURE_FR[v] || v) : v)}</option>`).join('')}</select></label>`;
      const figGroups = (V.FIGURE || []).filter(g => !g.gender || g.gender === (d.gender === '♂' ? '♂' : '♀'));
      const chip = tr => `<button type="button" class="chip ${d.traits.includes(tr) ? 'on' : ''}" data-trait="${esc(tr)}">${esc(traitLabel(tr))}</button>`;
      const dice = f => `<button type="button" class="dice" data-act="dice" data-f="${f}" title="🎲">🎲</button>`;
      const used = new Set(S().characters.filter(x => !c || x.id !== c.id).map(x => x.photo));
      main.innerHTML = `
        <header class="bar"><button class="icon" data-act="cancel-edit">‹</button><h2>${c ? t('edit.titleEdit') : t('edit.titleNew')}</h2><button type="button" class="btn ghost tiny" data-act="dice" data-f="all">🎲 ${t('edit.diceAll')}</button></header>
        <form class="form" id="charForm">
          <div class="photo-pick">${crest(d, 'xl')}
            <div class="row-actions">
              <label class="btn ghost">${t('edit.photo')}<input type="file" accept="image/*" id="photoIn" hidden></label>
              ${d.photo ? `<button type="button" class="btn ghost" data-act="rm-photo">${t('edit.removePhoto')}</button>` : ''}
            </div>
          </div>
          ${(V.PORTRAITS || []).length ? `<fieldset><legend>${t('edit.portraits')}</legend><div class="portraits">${V.PORTRAITS.map(p => `
            <button type="button" class="pt ${d.photo === p ? 'on' : ''} ${used.has(p) ? 'used' : ''}" data-act="pick-photo" data-src="${esc(p)}"><img src="${esc(p)}" alt="" loading="lazy">${used.has(p) ? `<small>${t('edit.inUse')}</small>` : ''}</button>`).join('')}</div></fieldset>` : ''}
          <label>${t('edit.name')}<span class="with-dice"><input name="name" required value="${esc(d.name)}">${dice('name')}</span></label>
          <div class="two">
            <label>${t('edit.gender')}<select name="gender">
              <option value="♀">${t('edit.female')}</option><option value="♂">${t('edit.male')}</option></select></label>
            <label>${t('edit.age')}<span class="with-dice"><input name="age" type="number" min="18" max="120" required value="${esc(d.age)}">${dice('age')}</span></label>
          </div>
          <div class="two">
            <label>${t('edit.lang')}<select name="lang"><option value="en">${t('lang.en')}</option><option value="fr">${t('lang.fr')}</option></select></label>
            <label>${t('edit.region')}<select name="region"><option value="">—</option>${V.REGIONS.map(r => `<option value="${r.id}">${esc(r.name[L])}</option>`).join('')}</select></label>
          </div>
          <label>${t('edit.house')}<span class="with-dice"><select name="house"><option value="">—</option>${V.HOUSES.map(h => `<option value="${h.id}">${esc(h.name[L])}</option>`).join('')}</select>${dice('house')}</span></label>
          <label>${t('edit.title')}<span class="with-dice"><input name="job" list="titlesDl" value="${esc(d.job)}">${dice('job')}</span></label>
          <datalist id="titlesDl">${V.TITLES.map(x => `<option value="${esc(L === 'fr' ? x[1] : x[0])}">`).join('')}</datalist>
          <label>${t('edit.city')}<span class="with-dice"><input name="city" list="citiesDl" value="${esc(d.city)}">${dice('city')}</span></label>
          <datalist id="citiesDl">${V.CITIES.map(x => `<option value="${esc(x)}">`).join('')}</datalist>
          <label>${t('edit.bio')}<span class="with-dice"><input name="bio" maxlength="140" value="${esc(d.bio)}">${dice('bio')}</span></label>
          <label>${t('edit.about')}<span class="with-dice"><textarea name="about" rows="5">${esc(d.about)}</textarea>${dice('about')}</span></label>
          <fieldset><legend>${t('edit.personality')} ${dice('traits')}</legend><div class="chips pick">${V.TRAITS.personality.map(chip).join('')}</div></fieldset>
          <fieldset><legend>${t('edit.style')}</legend><div class="chips pick">${V.TRAITS.style.map(chip).join('')}</div></fieldset>
          <fieldset><legend>📏 ${t('profile.figure')} ${dice('figure')}</legend><div class="two fig">${figGroups.map(figSel).join('')}</div></fieldset>
          ${other.length ? `<fieldset><legend>${t('edit.other')}</legend><div class="chips pick">${other.map(chip).join('')}</div></fieldset>` : ''}
          <button class="btn wide" type="submit">${t('edit.save')}</button>
        </form>`;
      const f = $('#charForm');
      f.elements.gender.value = d.gender === '♂' ? '♂' : '♀';
      f.elements.lang.value = d.lang === 'fr' ? 'fr' : d.lang === 'en' ? 'en' : L;
      f.elements.house.value = houseOf(d.house) ? d.house : '';
      f.elements.region.value = V.Gen.regionOf(d) || '';
    },

    group() {
      const cs = S().characters;
      main.innerHTML = `
        <header class="bar"><button class="icon" data-go="letters">‹</button><h2>${t('group.title')}</h2><span></span></header>
        <form class="form" id="groupForm">
          <label>${t('group.name')}<input name="title" required></label>
          <fieldset><legend>${t('group.pick')}</legend>
            ${cs.map(c => `<label class="check"><input type="checkbox" name="m" value="${esc(c.id)}">${crest(c, 'xs')} ${esc(c.name)}</label>`).join('')}
          </fieldset>
          <button class="btn wide" type="submit">${t('group.create')}</button>
        </form>`;
    },

    chat() {
      const th = threadById(view.id);
      if (!th) return go('letters');
      th.opened = Date.now();
      save();
      const cs = threadChars(th);
      const bot = botOn(th.id);
      main.innerHTML = `
        <div class="chat">
          <header class="bar chat-bar">
            <button class="icon" data-act="back-chat">‹</button>
            <button class="who" data-act="chat-head"><span class="crests">${cs.slice(0, 3).map(c => crest(c, 'sm')).join('')}</span>
              <span><strong>${esc(th.title)}</strong><small>${esc(cs.map(c => c.name).join(', '))}</small></span></button>
            <button class="icon kebab" data-act="menu" title="${t('chat.menu')}">⋮</button>
            <div class="menu" id="chatMenu" hidden>
              <button data-act="q-more">🎭 ${t('chat.events')}</button>
              <button data-act="fx-open">✨ ${t('chat.effect')}${pendingFx ? `: <b>${V.FX.ICON[pendingFx]}</b>` : ''}</button>
              <button data-act="note">📜 ${t('chat.note')}</button>
              <hr>
              <button data-act="bot">🤖 ${t('chat.bot')}: <b>${bot ? t('chat.on') : t('chat.off')}</b></button>
              <button data-act="quick-toggle">⚡ ${t('chat.quick')}: <b>${quickOn() ? t('chat.on') : t('chat.off')}</b></button>
              ${bot ? '' : `<button data-act="turns">⇄ ${t('chat.turns')}: <b>${S().turns[th.id] !== false ? t('chat.on') : t('chat.off')}</b></button>`}
              <button data-act="rename-thread" data-id="${esc(th.id)}">✎ ${t('chat.rename')}</button>
              ${th.group ? '' : `<button data-act="chat-head">👤 ${t('home.profile')}</button>`}
              <button class="danger-item" data-act="burn">🔥 ${t('chat.burn')}</button>
            </div>
          </header>
          <div class="msgs" id="msgs"></div>
          <div class="quick" id="quick"></div>
          <div class="qsheet" id="qsheet" hidden></div>
          <div class="fxbar" id="fxbar" hidden></div>
          <footer class="composer">
            ${bot ? '' : `<button class="side" data-act="side" title="${t('chat.side')}"></button>`}
            <textarea id="txt" rows="1"></textarea>
            <button class="icon send" data-act="send" title="${t('chat.send')}">🔏</button>
          </footer>
        </div>`;
      drawMsgs();
      drawSide();
      drawQuick();
    },

    me() {
      const u = S().user;
      main.innerHTML = `
        <header class="top"><h1 class="title">${t('nav.me')}</h1></header>
        <form class="form" id="meForm">
          <div class="photo-pick">${userCrest('xl')}
            <label class="btn ghost">${t('edit.photo')}<input type="file" accept="image/*" id="mePhoto" hidden></label></div>
          <label>${t('edit.name')}<input name="name" value="${esc(u.name)}"></label>
          <div class="two">
            <label>${t('edit.age')}<input name="age" value="${esc(u.age)}"></label>
            <label>${t('edit.city')}<input name="city" list="citiesDl" value="${esc(u.city)}"></label>
          </div>
          <datalist id="citiesDl">${V.CITIES.map(x => `<option value="${esc(x)}">`).join('')}</datalist>
          <div class="two">
            <label>${t('edit.gender')}<select id="meGender"><option value="♂" ${u.gender !== '♀' ? 'selected' : ''}>${t('edit.male')}</option><option value="♀" ${u.gender === '♀' ? 'selected' : ''}>${t('edit.female')}</option></select></label>
            ${u.gender !== '♀' ? `<label>🍆 Dick Size<select id="meDick"><option value="">—</option>${V.USER_DICK.map(v => `<option value="${v}" ${u.dick === v ? 'selected' : ''}>${esc(V.I18n.lang === 'fr' ? (V.FIGURE_FR[v] || v) : v)}</option>`).join('')}</select></label>` : ''}
          </div>
          <button class="btn wide" type="submit">${t('me.save')}</button>
        </form>
        <h3 class="sec">${t('me.settings')}</h3>
        <div class="form">
          <label>${t('me.lang')}<select id="langSel"><option value="en">English</option><option value="fr">Français</option></select></label>
          <label>${t('me.theme')}<select id="themeSel"><option value="parchment">${t('me.parchment')}</option><option value="candle">${t('me.candle')}</option></select></label>
          <div class="two">
            <label>🎵 ${t('me.music')}<select id="musicSel"><option value="1">${t('chat.on')}</option><option value="0">${t('chat.off')}</option></select></label>
            <label>🔔 ${t('me.sfx')}<select id="sfxSel"><option value="1">${t('chat.on')}</option><option value="0">${t('chat.off')}</option></select></label>
          </div>
          <label>🔊 ${t('me.volume')}<input type="range" id="volRange" min="0" max="1" step="0.05" value="${V.Sound.volume()}"></label>
        </div>
        <div class="row-actions"><button class="btn ghost" data-go="labs">🧪 ${t('labs.title')}</button><button class="btn ghost" data-go="library">📚 ${t('nav.library')}</button></div>
        <h3 class="sec">${t('me.backup')}</h3>
        <p class="muted small">${t('me.backupNote')}</p>
        <div class="row-actions">
          <button class="btn" data-act="export">${t('me.export')}</button>
          <label class="btn ghost">${t('me.import')}<input type="file" accept=".json,application/json" id="importIn" hidden></label>
        </div>
        <p class="muted small center">Valeria · ${V.VERSION}</p>`;
      $('#langSel').value = V.I18n.lang;
      $('#themeSel').value = theme();
      $('#musicSel').value = V.Sound.musicOn() ? '1' : '0';
      $('#sfxSel').value = V.Sound.sfxOn() ? '1' : '0';
    }
  };

  /* ---------- chat ---------- */
  function sideOf(th) {
    const s = S().side[th.id];
    if (th.group) return s && (s === 'me' || (th.members || []).includes(s)) ? s : 'me';
    return s === 'her' ? 'her' : 'me';
  }
  function nextSide(th) {
    const order = th.group ? ['me', ...(th.members || [])] : ['me', 'her'];
    return order[(order.indexOf(sideOf(th)) + 1) % order.length];
  }
  function drawSide() {
    const th = threadById(view.id), b = $('.composer .side'), ta = $('#txt');
    if (!th || !ta) return;
    const bot = botOn(th.id);
    const s = bot ? 'me' : sideOf(th);
    const c = s === 'me' ? null : charById(th.group ? s : th.charId);
    if (b) b.innerHTML = c ? crest(c, 'sm') : userCrest('sm');
    ta.placeholder = t('chat.placeholder', { name: c ? c.name : userName() });
  }

  function msgHTML(m, th) {
    const acts = `<div class="acts">
      <button data-act="m-edit">✎ ${t('msg.edit')}</button>
      ${m.from !== 'sys' ? `<button data-act="m-swap">⇄ ${t('msg.swap')}</button><button data-act="m-fx">✨ ${t('chat.effect')}</button>` : ''}
      <button data-act="m-del">🗑 ${t('msg.delete')}</button></div>`;
    const on = sel === m.id;
    const cls = [on ? 'sel' : '', fresh.has(m.id) ? 'fresh' : '', m.effect && m.effect !== 'none' ? 'eff-' + m.effect : ''].join(' ');
    if (m.from === 'sys') return `<div class="msg sys ${cls}" data-mid="${esc(m.id)}"><span>❦ ${esc(m.text)} ❦</span>${on ? acts : ''}</div>`;
    const me = m.from === 'me';
    const c = me ? null : charById(th.group ? m.who : th.charId);
    const body = (m.type === 'photo' && m.src ? `<img class="ph" src="${esc(m.src)}" alt="" onerror="this.remove()">` : '')
      + (m.text ? `<p>${esc(m.text)}</p>` : '');
    const from = !me && th.group && c ? `<b class="from" style="color:${esc((c.colors || [])[0] || '')}">${esc(c.name)}</b>` : '';
    const badge = V.FX.isScreen(m.effect) ? `<button class="fx-badge" data-act="fx-replay" data-fx="${esc(m.effect)}">${V.FX.ICON[m.effect]}</button>` : '';
    return `<div class="msg ${me ? 'me' : 'her'} ${cls}" data-mid="${esc(m.id)}">
      ${me ? '' : crest(c, 'xs')}
      <div class="bubble">${from}${body}${m.react ? `<span class="react">${esc(m.react)}</span>` : ''}${badge}</div>
      ${on ? acts : ''}</div>`;
  }

  function drawMsgs(keepScroll) {
    const th = threadById(view.id), box = $('#msgs');
    if (!th || !box) return;
    const msgs = S().chats[th.id] || (S().chats[th.id] = []);
    const top = box.scrollTop;
    let prev = 0, html = '';
    msgs.forEach(m => {
      if (m.ts && m.ts - prev > 600000) html += `<div class="stamp">${fmtStamp(m.ts)}</div>`;
      prev = m.ts || prev;
      html += msgHTML(m, th);
    });
    if (!msgs.length) html = `<div class="empty-chat">${t('chat.empty')}</div>`;
    if (typing && typing.tid === th.id) html += `<div class="typing"><span class="horse">🐎</span> ${esc(t('chat.messenger', { name: typing.name }))}</div>`;
    box.innerHTML = html;
    fresh.clear();
    box.scrollTop = keepScroll ? top : box.scrollHeight;
  }
  const drawIfHere = tid => { if (view.name === 'chat' && view.id === tid) drawMsgs(); };

  function pushMsg(tid, m) {
    const o = Object.assign({ id: Store.uid(), ts: Date.now() }, m);
    if (!o.who) delete o.who;
    if (!o.effect) delete o.effect;
    (S().chats[tid] = S().chats[tid] || []).push(o);
    save();
    fresh.add(o.id);
    drawIfHere(tid);
    if (o.effect && view.name === 'chat' && view.id === tid) V.FX.play(o.effect);
  }

  function send(asNote) {
    const th = threadById(view.id), ta = $('#txt');
    const text = ta.value.trim();
    if (!th || !text) return;
    const bot = botOn(th.id);
    const m = { from: 'me', text, effect: pendingFx };
    pendingFx = '';
    closeFx();
    V.FX.seal($('.composer .send'));
    V.Sound.seal();
    if (asNote) m.from = 'sys';
    else {
      const s = bot ? 'me' : sideOf(th);
      if (s !== 'me') { m.from = 'her'; if (th.group) m.who = s; }
    }
    ta.value = '';
    ta.style.height = '';
    if (!asNote && !bot && S().turns[th.id] !== false) S().side[th.id] = nextSide(th);
    sel = null;
    pushMsg(th.id, m);
    drawSide();
    drawQuick();
    if (bot && m.from === 'me') botReply(th, text);
  }

  function botReply(th, text) {
    const cs = threadChars(th);
    if (!cs.length) return;
    const c = cs[Math.floor(Math.random() * cs.length)];
    // 🧠 her memory: { first: {id: ts}, count: {id: n}, asks: {askId: answer}, last: ts }
    const mem = c.mem = Object.assign({ first: {}, count: {}, asks: {} }, c.mem || {});
    const gapDays = mem.last ? (Date.now() - mem.last) / 86400000 : 0;
    const r = V.Bot.respond({ text, char: c, lang: charLang(c), current: S().botEvent[th.id] || null, you: userName(), asked: S().botAsk[th.id] || null,
      mem, gapDays, userTraits: userTraits() });
    S().botEvent[th.id] = r.event;
    if (r.ask) S().botAsk[th.id] = r.ask; else delete S().botAsk[th.id];
    if (r.rec.ev) {
      if (!mem.first[r.rec.ev]) mem.first[r.rec.ev] = Date.now();
      mem.count[r.rec.ev] = (mem.count[r.rec.ev] || 0) + 1;
    }
    if (r.rec.ans) mem.asks[r.rec.ans.id] = r.rec.ans.val;
    mem.last = Date.now();
    const hit = V.Bot.match(text, c), log = S().botLog[th.id] = (S().botLog[th.id] || []);
    if (hit) { log.push(hit.id); if (log.length > 12) log.splice(0, log.length - 12); }
    const tid = th.id, who = th.group ? c.id : undefined;
    const queue = [];
    if (r.sys) queue.push({ from: 'sys', text: r.sys });
    r.replies.forEach((x, i) => queue.push({ from: 'her', text: x, who, effect: i === 0 ? r.effect : '' }));
    const step = () => {
      const m = queue.shift();
      if (!m) { typing = null; drawIfHere(tid); if (view.name === 'chat' && view.id === tid) drawQuick(); return; }
      if (m.from === 'sys') { pushMsg(tid, m); step(); return; }
      typing = { tid, name: c.name };
      drawIfHere(tid);
      setTimeout(() => { typing = null; pushMsg(tid, m); if (view.name === 'chat' && view.id === tid) V.Sound.bell(); step(); }, 700 + Math.min(2500, m.text.length * 30));
    };
    setTimeout(step, 400);
  }

  /* ---------- ⚡ shortcuts (js/suggest.js) ---------- */
  const quickOn = () => localStorage.getItem('valeria:quick') !== '0';
  let picked = ''; // sentence put in the letter by a shortcut (the bar stays so a second tap sends it)
  // empty input → scored suggestions; typing → 🔮 completions. Only when it is your turn to write (bot on or your side)
  function drawQuick() {
    const box = $('#quick'), th = threadById(view.id), ta = $('#txt');
    if (!box || !th) return;
    const mine = botOn(th.id) || sideOf(th) === 'me';
    const cs = threadChars(th), c = cs[0];
    if (!quickOn() || !mine || !c) { box.innerHTML = ''; box.hidden = true; return; }
    const typed = ta && ta.value.trim();
    let chips = typed && typed !== picked ? V.Suggest.complete(typed, c, V.I18n.lang) : [];
    const mode = typed && chips.length ? 'complete' : 'quick';
    if (mode === 'quick') {
      if (typed && typed !== picked) { box.innerHTML = ''; box.hidden = true; return; }
      chips = V.Suggest.quick({ char: c, current: S().botEvent[th.id] || null, asked: botOn(th.id) ? S().botAsk[th.id] || null : null,
        log: S().botLog[th.id] || [], empty: !(S().chats[th.id] || []).some(m => m.from !== 'sys'), lang: V.I18n.lang, user: S().user });
    }
    box.hidden = false;
    box.innerHTML = `<span class="qlabel">${mode === 'complete' ? '🔮' : '⚡'}</span>` +
      chips.map(q => `<button class="qchip ${['yes', 'no', 'place'].includes(q.id) ? 'ans' : ''}" data-act="q-pick" data-text="${esc(q.text)}" title="${esc(q.why.join(' · '))}">${q.icon} ${esc(q.label)}</button>`).join('') +
      `<button class="qchip more" data-act="q-more" title="${t('quick.more')}">⋯</button>`;
  }
  // 🎭 Events list (like Carmen's event picker): next steps, her favourites, surprise, category tabs, search
  let sheetCat = 'all';
  function drawSheet(filter) {
    const sh = $('#qsheet'), th = threadById(view.id);
    if (!sh || !th) return;
    const L = V.I18n.lang, c = threadChars(th)[0], f = V.Bot.norm(filter || ($('#qsearch') || {}).value || '').trim();
    const chipB = q => `<button class="qchip" data-act="q-pick" data-text="${esc(q.text)}" title="${esc(q.text)}">${q.icon} ${esc(q.label)}</button>`;
    const all = V.Suggest.groups(c, L);
    const groups = all.filter(g => sheetCat === 'all' || g.cat === sheetCat)
      .map(g => Object.assign({}, g, { items: g.items.filter(q => !f || V.Bot.norm(q.label + ' ' + q.text).includes(f)) })).filter(g => g.items.length);
    // top rows (only without a search)
    const cur = S().botEvent[th.id], mem = (c && c.mem) || {};
    const next = cur ? (V.Suggest.FLOW[cur] || []).map(id => V.Suggest.chip(id, c, L)).filter(Boolean) : [];
    const favs = Object.keys(mem.count || {}).filter(id => V.EVENTS.events.some(e => e.id === id && e.kind === 'act')).sort((a, b) => mem.count[b] - mem.count[a]).slice(0, 5).map(id => V.Suggest.chip(id, c, L)).filter(Boolean);
    const top = f || sheetCat !== 'all' ? '' : `
      ${next.length ? `<h5>🔗 ${t('ev.next')}</h5><div class="chips">${next.map(chipB).join('')}</div>` : ''}
      ${favs.length ? `<h5>❤️ ${t('ev.favs')}</h5><div class="chips">${favs.map(chipB).join('')}</div>` : ''}
      <div class="chips"><button class="qchip surprise" data-act="ev-surprise">🎲 ${t('ev.surprise')}</button></div>`;
    const list = top + groups.map(g => `<h5>${g.title} <small>${g.items.length}</small></h5><div class="chips">${g.items.map(chipB).join('')}</div>`).join('');
    if (filter == null) {
      const tabs = [['all', '✦', t('ev.all')]].concat(all.map(g => [g.cat, g.title.split(' ')[0], g.title.split(' ').slice(1).join(' ')]));
      sh.innerHTML = `<div class="qsheet-top"><input id="qsearch" placeholder="🔍 ${t('quick.search')}"><button class="icon" data-act="q-close">✕</button></div>
        <div class="ev-tabs">${tabs.map(([k, ic, nm]) => `<button class="chip ${sheetCat === k ? 'on' : ''}" data-act="ev-tab" data-k="${k}">${ic} ${esc(nm)}</button>`).join('')}</div>
        <div class="qsheet-list">${list}</div>`;
    } else sh.querySelector('.qsheet-list').innerHTML = list;
  }

  /* ---------- effect bar ---------- */
  function openFx(target) {
    const bar = $('#fxbar');
    if (!bar) return;
    if (!bar.hidden && fxFor === target) { closeFx(); return; }
    fxFor = target;
    const cur = target === 'next' ? pendingFx : ((curMsg() || {}).effect || '');
    bar.innerHTML = `<button class="chip ${cur ? '' : 'on'}" data-act="fx-pick" data-fx="">✖ ${t('fx.none')}</button>` +
      V.FX.LIST.map(id => `<button class="chip ${cur === id ? 'on' : ''}" data-act="fx-pick" data-fx="${id}">${V.FX.ICON[id]} ${t('fx.' + id)}</button>`).join('');
    bar.hidden = false;
  }
  function closeFx() {
    const bar = $('#fxbar');
    if (bar) bar.hidden = true;
    fxFor = null;
    // a pending effect makes the seal button glow
    const b = $('.composer .send');
    if (b) b.classList.toggle('fx-on', !!pendingFx);
  }

  /* ---------- saving forms ---------- */
  // copy the edit form into the draft (before a 🎲 re-roll or saving)
  function syncDraft(f) {
    const d = draft, val = n => f.elements[n].value.trim();
    ['name', 'gender', 'age', 'lang', 'region', 'house', 'job', 'city', 'bio'].forEach(k => { d[k] = val(k); });
    d.about = f.elements.about.value.trim();
    return d;
  }
  function saveChar(f) {
    const d = syncDraft(f);
    if (!d.name) return;
    if (!(Number(d.age) >= 18)) { alert(t('edit.ageMin')); return; }
    const h = houseOf(d.house);
    if (!d.colors) d.colors = (h || V.HOUSES[Math.floor(Math.random() * V.HOUSES.length)]).colors.slice();
    const old = view.id && charById(view.id);
    if (old) Object.assign(old, d);
    else {
      Object.assign(d, { id: Store.uid(), created: Date.now(), set: '', mod: 'valeria' });
      S().characters.push(d);
    }
    draft = null;
    save();
    go('profile', { id: d.id });
  }

  function saveGroup(f) {
    const members = [...f.querySelectorAll('input[name=m]:checked')].map(i => i.value);
    if (members.length < 2) { alert(t('group.need2')); return; }
    const th = { id: Store.uid(), group: true, members, title: f.elements.title.value.trim(), created: Date.now(), opened: 0 };
    S().threads.push(th);
    S().chats[th.id] = [];
    save();
    view = { name: 'letters' };
    openThread(th.id);
  }

  function saveMe(f) {
    const u = S().user;
    ['name', 'age', 'city'].forEach(k => { u[k] = f.elements[k].value.trim(); });
    save();
    render();
  }

  /* ---------- backup (Carmen-compatible) ---------- */
  function exportBackup() {
    const data = { format: 'amor-stories-backup', version: 1, app: 'valeria', state: S() };
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `valeria-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  async function importBackup(file) {
    let data = null;
    try { data = JSON.parse(await file.text()); } catch (e) { data = null; }
    if (!data || data.format !== 'amor-stories-backup' || !data.state || typeof data.state !== 'object') { alert(t('me.importBad')); return; }
    if (!confirm(t('me.importConfirm'))) return;
    if (!Store.replace(data.state)) { alert(t('err.storage')); return; }
    alert(t('me.importOk'));
    go('court');
  }

  /* ---------- theme ---------- */
  const theme = () => localStorage.getItem('valeria:theme') === 'candle' ? 'candle' : 'parchment';
  function setTheme(v) {
    localStorage.setItem('valeria:theme', v);
    document.body.classList.toggle('candle', v === 'candle');
    $('meta[name=theme-color]').content = v === 'candle' ? '#1d1510' : '#7a1f2b';
  }

  /* ---------- actions ---------- */
  const curMsg = () => {
    const th = threadById(view.id);
    return th && (S().chats[th.id] || []).find(m => m.id === sel);
  };
  const acts = {
    'edit-char': () => go('edit', { id: view.id }),
    'cancel-edit': () => { draft = null; view.id ? go('profile', { id: view.id }) : go('court'); },
    'rm-photo': () => { syncDraft($('#charForm')); draft.photo = ''; go('edit', { id: view.id, keep: true }); },
    'write': () => openThread((lastThreadOf(view.id) || newThread(view.id)).id),
    'new-thread': () => openThread(newThread(view.id).id),
    'rename-thread': a => {
      const th = threadById(a.dataset.id);
      const v = th && prompt(t('thread.renamePrompt'), th.title || '');
      if (v && v.trim()) { th.title = v.trim(); save(); render(); }
    },
    'del-thread': a => { if (confirm(t('thread.deleteConfirm'))) { dropThread(a.dataset.id); save(); render(); } },
    'del-char': () => {
      const s = S(), c = charById(view.id);
      if (!c || !confirm(t('profile.deleteConfirm', { name: c.name }))) return;
      s.threads.filter(th => th.charId === c.id).forEach(th => dropThread(th.id));
      s.threads.filter(th => th.group).forEach(th => {
        th.members = (th.members || []).filter(x => x !== c.id);
        if (!th.members.length) dropThread(th.id);
      });
      s.characters = s.characters.filter(x => x.id !== c.id);
      s.pinned = s.pinned.filter(x => x !== c.id);
      s.keywords = s.keywords.filter(k => k.charId !== c.id);
      save();
      go('court');
    },
    'back-chat': () => { const b = view.back || { name: 'letters' }; go(b.name, b); },
    'chat-head': () => { const th = threadById(view.id); if (th && !th.group) go('profile', { id: th.charId }); },
    'menu': () => { const m = $('#chatMenu'); if (m) m.hidden = !m.hidden; },
    'turns': () => {
      const id = view.id;
      S().turns[id] = S().turns[id] === false;
      save();
      screens.chat();
      toast(`⇄ ${t('chat.turns')}: ${S().turns[id] !== false ? t('chat.on') : t('chat.off')}`);
    },
    'burn': () => {
      if (!confirm(t('thread.deleteConfirm'))) return;
      const th = threadById(view.id), b = view.back || { name: 'letters' };
      dropThread(th.id);
      save();
      go(b.name, b);
    },
    'bot': () => {
      const id = view.id, on = !botOn(id);
      S().bot[id] = on;
      delete S().botAsk[id];
      if (on) S().side[id] = 'me';
      save();
      screens.chat();
      pushMsg(id, { from: 'sys', text: t(on ? 'chat.botOn' : 'chat.botOff') });
    },
    'side': () => { const th = threadById(view.id); S().side[th.id] = nextSide(th); save(); drawSide(); },
    // 📜 narration line: the text being written, or asked for
    'note': () => {
      const ta = $('#txt');
      if (!ta.value.trim()) { const v = prompt(t('chat.notePrompt')); if (!v || !v.trim()) return; ta.value = v.trim(); }
      send(true);
    },
    'send': () => send(false),
    'm-edit': () => {
      const m = curMsg();
      const v = m && prompt(t('msg.editPrompt'), m.text || '');
      if (v != null && v.trim()) { m.text = v.trim(); save(); drawMsgs(true); }
    },
    'm-swap': () => {
      const th = threadById(view.id), m = curMsg();
      if (!m) return;
      if (m.from === 'me') {
        m.from = 'her';
        if (th.group) { const s = sideOf(th); m.who = s !== 'me' ? s : (th.members || [])[0]; }
      } else { m.from = 'me'; delete m.who; }
      save();
      drawMsgs(true);
    },
    'm-del': () => {
      const th = threadById(view.id);
      S().chats[th.id] = (S().chats[th.id] || []).filter(m => m.id !== sel);
      sel = null;
      save();
      drawMsgs(true);
    },
    'export': exportBackup,
    'summon': () => {
      const d = V.Gen.character({ anyRegion: true });
      Object.assign(d, { id: Store.uid(), created: Date.now(), set: '', mod: 'valeria' });
      S().characters.push(d);
      save();
      V.FX.play('fleur');
      toast(t('map.joined', { name: d.name }));
      go('profile', { id: d.id });
    },
    'dice': a => {
      const f = $('#charForm');
      syncDraft(f);
      const k = a.dataset.f;
      V.Gen.field(k, draft);
      if (k === 'all' || k === 'traits' || k === 'house' || k === 'figure') { go('edit', { id: view.id, keep: true }); return; }
      if (f.elements[k]) f.elements[k].value = draft[k];
    },
    'pick-photo': a => {
      const f = $('#charForm');
      syncDraft(f);
      draft.photo = draft.photo === a.dataset.src ? '' : a.dataset.src;
      const box = $('.portraits'), top = box ? box.scrollLeft : 0;
      go('edit', { id: view.id, keep: true });
      if ($('.portraits')) $('.portraits').scrollLeft = top;
    },
    'fx-open': () => openFx('next'),
    'm-fx': () => openFx(sel),
    'fx-pick': a => {
      const id = a.dataset.fx;
      if (fxFor === 'next') pendingFx = id;
      else {
        const m = curMsg();
        if (m) {
          if (id) m.effect = id; else delete m.effect;
          save();
          fresh.add(m.id);
          drawMsgs(true);
        }
      }
      closeFx();
      if (id) V.FX.play(id);
    },
    'fx-replay': a => V.FX.play(a.dataset.fx),
    // tap a shortcut: it fills the letter; tapping the same one again sends it
    'q-pick': a => {
      const ta = $('#txt'), txt = a.dataset.text;
      const sh = $('#qsheet'); if (sh) sh.hidden = true;
      if (ta.value.trim() === txt) { send(false); return; }
      ta.value = txt;
      picked = txt;
      ta.focus();
      drawQuick();
    },
    'q-more': () => { const sh = $('#qsheet'); if (!sh) return; sh.hidden = !sh.hidden; if (!sh.hidden) drawSheet(); },
    'q-close': () => { const sh = $('#qsheet'); if (sh) sh.hidden = true; },
    'ev-tab': a => { sheetCat = a.dataset.k; drawSheet(); },
    'ev-surprise': () => {
      const th = threadById(view.id), c = threadChars(th)[0], cur = S().botEvent[th.id];
      const pool = V.EVENTS.events.filter(e => e.kind === 'act' && e.id !== cur && V.Bot.fits(c, e) && (e.cat !== 'intimacy' || cur));
      const e = pool[Math.floor(Math.random() * pool.length)];
      if (!e) return;
      $('#qsheet').hidden = true;
      $('#txt').value = picked = V.Suggest.sayOf(e.id, c, V.I18n.lang);
      $('#txt').focus();
      drawQuick();
    },
    'mem-del': a => {
      const c = charById(view.id), [k, id] = a.dataset.k.split(':');
      if (!c || !c.mem || !c.mem[k]) return;
      delete c.mem[k][id];
      if (k === 'first') delete (c.mem.count || {})[id];
      save();
      render();
    },
    'quick-toggle': () => {
      localStorage.setItem('valeria:quick', quickOn() ? '0' : '1');
      screens.chat();
      toast(`⚡ ${t('chat.quick')}: ${quickOn() ? t('chat.on') : t('chat.off')}`);
    }
  };

  const UI = {
    main, S, t, esc, crest, save, toast, go, houseLabel, traitLabel, lastTs, threadChars, snippet,
    lang: () => V.I18n.lang,
    view: () => view,
    write: id => openThread((lastThreadOf(id) || newThread(id)).id)
  };
  Object.assign(acts, V.MapView.actions(UI), V.Library.actions(UI), V.Home.actions(UI), V.Labs.actions(UI));
  Object.assign(screens, V.Library.screens(UI), V.Labs.screens(UI), { home: () => V.Home.render(UI) });

  /* ---------- events ---------- */
  main.addEventListener('click', e => {
    const menu = $('#chatMenu');
    if (menu && !menu.hidden && !e.target.closest('#chatMenu') && !e.target.closest('[data-act=menu]')) menu.hidden = true;
    const a = e.target.closest('[data-act],[data-go],[data-char],[data-thread],[data-trait],.msg');
    if (!a || !main.contains(a)) return;
    if (a.dataset.go) return go(a.dataset.go);
    if (a.dataset.char) return go('profile', { id: a.dataset.char });
    if (a.dataset.thread) return openThread(a.dataset.thread);
    if (a.dataset.trait) {
      const tr = a.dataset.trait, i = draft.traits.indexOf(tr);
      if (i < 0) draft.traits.push(tr); else draft.traits.splice(i, 1);
      a.classList.toggle('on', i < 0);
      return;
    }
    if (a.dataset.act) {
      if (menu && a.closest('#chatMenu')) menu.hidden = true;
      const fn = acts[a.dataset.act]; if (fn) fn(a, e); return;
    }
    if (a.classList.contains('msg')) {
      if (a.classList.contains('eff-ink') && !a.classList.contains('revealed')) { a.classList.add('revealed'); return; }
      sel = sel === a.dataset.mid ? null : a.dataset.mid;
      drawMsgs(true);
    }
  });

  main.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.id === 'charForm') saveChar(f);
    else if (f.id === 'groupForm') saveGroup(f);
    else if (f.id === 'meForm') saveMe(f);
  });

  main.addEventListener('change', async e => {
    const el = e.target;
    try {
      if (el.id === 'photoIn' && el.files[0]) {
        draft.photo = await readImage(el.files[0]);
        screensKeepForm();
      } else if (el.id === 'mePhoto' && el.files[0]) {
        S().user.photo = await readImage(el.files[0]);
        save();
        render();
      } else if (el.id === 'importIn' && el.files[0]) {
        await importBackup(el.files[0]);
        el.value = '';
      }
    } catch (err) { /* unreadable image: ignore */ }
    if (el.id === 'langSel') { V.I18n.setLang(el.value); render(); }
    if (el.id === 'themeSel') setTheme(el.value);
    if (el.id === 'musicSel') V.Sound.setMusic(el.value === '1');
    if (el.id === 'sfxSel') V.Sound.setSfx(el.value === '1');
    // 📏 figure select: one value per group in draft.traits
    if (el.dataset && el.dataset.fig && draft) {
      const g = el.dataset.fig;
      draft.traits = draft.traits.filter(x => !x.startsWith(g + ': '));
      if (el.value) draft.traits.push(g + ': ' + el.value);
    }
    // gender changes which figure groups exist
    if (el.name === 'gender' && draft && $('#charForm')) { syncDraft($('#charForm')); go('edit', { id: view.id, keep: true }); }
    if (el.id === 'meGender') { S().user.gender = el.value; save(); render(); }
    if (el.id === 'meDick') { S().user.dick = el.value; save(); }
    if (el.name === 'house' && draft) {
      const h = houseOf(el.value);
      if (h) { draft.colors = h.colors.slice(); $('.photo-pick .crest').outerHTML = crest(Object.assign({}, draft, { name: $('#charForm').elements.name.value }), 'xl'); }
    }
  });

  // after a new portrait: refresh only the crest + remove button, keep what was typed in the form
  function screensKeepForm() {
    $('.photo-pick .crest').outerHTML = crest(Object.assign({}, draft, { name: $('#charForm').elements.name.value }), 'xl');
    if (!$('[data-act=rm-photo]')) $('.photo-pick .row-actions').insertAdjacentHTML('beforeend', `<button type="button" class="btn ghost" data-act="rm-photo">${t('edit.removePhoto')}</button>`);
  }

  main.addEventListener('keydown', e => {
    if (e.target.id === 'txt' && e.key === 'Enter' && !e.shiftKey && !matchMedia('(pointer: coarse)').matches) {
      e.preventDefault();
      send(false);
    }
  });
  main.addEventListener('input', e => {
    if (e.target.id === 'txt') { e.target.style.height = ''; e.target.style.height = Math.min(140, e.target.scrollHeight) + 'px'; drawQuick(); }
    if (e.target.id === 'qsearch') drawSheet(e.target.value);
    if (e.target.id === 'volRange') V.Sound.setVolume(e.target.value);
  });

  $('#nav').addEventListener('click', e => {
    const b = e.target.closest('button[data-go]');
    if (b) go(b.dataset.go);
  });

  /* ---------- start ---------- */
  setTheme(theme());
  V.FX.ambient();
  V.Sound.init();
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
