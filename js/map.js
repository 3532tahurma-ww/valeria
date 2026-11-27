/*
 * Valeria - 🗺️ map screen (data: js/data/map.js)
 * Tap a region → it zooms in and the card below lists the court characters living there and 5 notables
 * (Gen.notables, deterministic per state.world.seed + reroll count). "Invite to court" turns a notable into a character
 * (character.set = 'map:<region>:<seed>:<i>' marks it as already at court).
 * ⚔️ Chronicle layer: past events of js/data/chronicle.js as pins (grouped by CHRONICLE_PLACES), King Henry's road
 * (CHRONICLE_ROUTE) drawn as far as it has gone; a pin opens a card with the events and what the court says of them.
 * app.js calls MapView.render(UI) and merges MapView.actions(UI) into its click actions.
 */
window.Valeria = window.Valeria || {};

Valeria.MapView = (() => {
  const V = Valeria;
  const FULL = [0, 0, 920, 700];
  const proj = ([lon, lat]) => [(lon + 11) * 0.64 * 40, (59 - lat) * 40];
  const xy = p => proj(p).map(n => n.toFixed(1)).join(',');
  const path = poly => 'M' + poly.map(xy).join('L') + 'Z';
  let sel = null, pin = null, open = -1, box = FULL.slice();

  const world = UI => {
    const s = UI.S();
    if (!s.world || !s.world.seed) { s.world = { seed: Math.random().toString(36).slice(2, 8), rolls: {} }; UI.save(); }
    if (!s.world.rolls) s.world.rolls = {};
    return s.world;
  };
  const seedOf = (UI, id) => { const w = world(UI); return `${w.seed}-${w.rolls[id] || 0}`; };
  const region = id => V.REGIONS.find(r => r.id === id);
  // ⚔️ past chronicle events by place, newest first
  function places() {
    const g = {};
    if (V.Chronicle) V.Chronicle.past().forEach(e => { if (e.at && V.CHRONICLE_PLACES[e.at]) (g[e.at] = g[e.at] || []).push(e); });
    return g;
  }
  const recent = e => (Date.now() - new Date(new Date().getFullYear(), e.m - 1, e.d)) / 864e5 <= 7;
  const pinBox = k => { const [x, y] = proj(V.CHRONICLE_PLACES[k].at), w = 240, h = w * (FULL[3] / FULL[2]); return [x - w / 2, y - h / 2, w, h]; };

  function bboxOf(r) {
    const pts = [r.poly].concat(r.isles || []).flat().map(proj), xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const w = Math.max(200, (Math.max(...xs) - Math.min(...xs)) * 2.6), h = w * (FULL[3] / FULL[2]);
    return [cx - w / 2, cy - h / 2, w, h];
  }
  // smooth viewBox animation
  function zoomTo(target) {
    const svg = document.getElementById('mapSvg');
    const from = box.slice(), t0 = performance.now(), dur = 450;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      box = from.map((v, i) => v + (target[i] - v) * e);
      if (svg) svg.setAttribute('viewBox', box.map(n => n.toFixed(1)).join(' '));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function svg(UI) {
    const L = UI.lang(), s = UI.S(), counts = {};
    s.characters.forEach(c => { const r = V.Gen.regionOf(c); if (r) counts[r] = (counts[r] || 0) + 1; });
    const lbl = r => (r.short || r.name)[L];
    let out = `<svg id="mapSvg" class="map" viewBox="${box.join(' ')}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="waves" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 10 q7 -6 14 0 t14 0" fill="none" stroke="currentColor" stroke-width=".8" opacity=".35"/>
        </pattern>
        <radialGradient id="vign" cx="50%" cy="50%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#3b2a1a" stop-opacity=".35"/></radialGradient>
      </defs>
      <rect class="sea" x="-200" y="-200" width="1400" height="1100" data-act="map-reset"/>
      <rect class="sea-w" x="-200" y="-200" width="1400" height="1100" fill="url(#waves)" pointer-events="none"/>`;
    V.BACKDROP.forEach(p => { out += `<path class="back" d="${path(p)}" data-act="map-reset"/>`; });
    V.REGIONS.forEach(r => {
      out += `<path class="reg ${sel === r.id ? 'on' : ''}" d="${[r.poly].concat(r.isles || []).map(path).join('')}" fill="${r.fill || V.REALMS[r.realm].fill}" data-act="map-region" data-id="${r.id}"><title>${UI.esc(r.name[L])}</title></path>`;
    });
    V.REGIONS.forEach(r => {
      r.cities.forEach(([n, lon, lat], i) => {
        const [x, y] = proj([lon, lat]);
        out += `<circle class="city ${i === 0 ? 'cap' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i === 0 ? 2.6 : 1.6}"/>`;
        if (sel === r.id) out += `<text class="cname" x="${(x + 3).toFixed(1)}" y="${(y - 2).toFixed(1)}">${UI.esc(n)}</text>`;
      });
    });
    V.REGIONS.forEach(r => {
      const [x, y] = proj(r.label);
      out += `<text class="lbl ${sel === r.id ? 'on' : ''}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${UI.esc(lbl(r))}</text>`;
      if (counts[r.id]) out += `<g class="badge"><circle cx="${(x + 14).toFixed(1)}" cy="${(y + 7).toFixed(1)}" r="6.5"/><text x="${(x + 14).toFixed(1)}" y="${(y + 9.6).toFixed(1)}">${counts[r.id]}</text></g>`;
    });
    if (V.Chronicle) {
      const done = new Set(V.Chronicle.past().map(e => e.id));
      const road = (V.CHRONICLE_ROUTE || []).filter(([id]) => done.has(id)).map(([, p]) => xy(p));
      if (road.length > 1) out += `<path class="route" d="M${road.join('L')}"/>`;
      Object.entries(places()).forEach(([k, evs]) => {
        const [x, y] = proj(V.CHRONICLE_PLACES[k].at);
        out += `<g class="pin ${pin === k ? 'on' : ''} ${evs.some(recent) ? 'new' : ''}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})" data-act="map-chron" data-k="${k}">
          <title>${UI.esc(V.CHRONICLE_PLACES[k].name[L === 'fr' ? 1 : 0])}</title><circle r="8"/><text y="3.5">${evs[0].icon}</text>
          ${evs.length > 1 ? `<g class="badge"><circle cx="7" cy="-7" r="5"/><text x="7" y="-4.4">${evs.length}</text></g>` : ''}</g>`;
      });
    }
    V.SEAS.forEach(sea => { const [x, y] = proj(sea.at); out += `<text class="seaname" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${UI.esc(sea.name[L])}</text>`; });
    const [cx, cy] = proj([-9.0, 44.3]);
    out += `<g class="compass" transform="translate(${cx.toFixed(0)},${cy.toFixed(0)})">
        <circle r="22"/><path d="M0 -30 L5 0 L0 30 L-5 0 Z"/><path class="w" d="M-30 0 L0 5 L30 0 L0 -5 Z"/><text y="-33">N</text></g>`;
    const [sx, sy] = proj([-9.4, 50.6]), [bx, by] = proj([-6.2, 46.6]), [nx, ny] = proj([2.3, 53.6]);
    out += `<text class="deco serpent" x="${sx.toFixed(0)}" y="${sy.toFixed(0)}">🐉</text>
      <text class="hic" x="${(sx - 10).toFixed(0)}" y="${(sy + 18).toFixed(0)}">Hic sunt dracones</text>
      <text class="deco ship" x="${bx.toFixed(0)}" y="${by.toFixed(0)}">⛵</text>
      <text class="deco ship s2" x="${nx.toFixed(0)}" y="${ny.toFixed(0)}">⛵</text>`;
    const [tx, ty] = proj([4.6, 58.0]);
    out += `<g class="cartouche" transform="translate(${tx.toFixed(0)},${ty.toFixed(0)})"><rect x="-78" y="-18" width="156" height="34" rx="4"/><text y="5">Mappa Occidentis</text></g>
      <rect x="-200" y="-200" width="1400" height="1100" fill="url(#vign)" pointer-events="none"/></svg>`;
    return out;
  }

  // ⚔️ card of a chronicle pin: its events and up to 3 voices of the court (her own side first)
  function chronCard(UI) {
    const t = UI.t, esc = UI.esc, L = UI.lang(), x = L === 'fr' ? 1 : 0, C = V.Chronicle;
    const evs = places()[pin] || [], y = new Date().getFullYear(), day = e => V.I18n.date(new Date(y, e.m - 1, e.d, 12));
    const chars = UI.S().characters, said = s => s.replace(/,?\s*\{sen\}/g, '');
    const voices = e => chars.map(c => ({ c, own: e.her[C.side(c)] })).sort((a, b) => !a.own - !b.own).slice(0, 3)
      .map(v => ({ c: v.c, h: v.own || e.her.far || Object.values(e.her)[0] }));
    return `<section class="region-card chron-card">
      <header><h3>${esc(V.CHRONICLE_PLACES[pin].name[x])}</h3><small>⚔️ ${t('map.chron')}</small></header>
      ${evs.map(e => `<h4>${e.icon} ${esc(e.t[x])}</h4>
        <p class="small"><small class="muted">${esc(day(e))}</small> ${esc(e.s[x])}</p>
        ${voices(e).length ? `<ul class="list">${voices(e).map(v => `<li><button class="item" data-act="map-news" data-id="${esc(v.c.id)}">${UI.crest(v.c, 'sm')}<span class="txt"><strong>${esc(v.c.name)}</strong><em>“${esc(said(v.h[x]))}”</em></span><span class="tag">✉️</span></button></li>`).join('')}</ul>` : ''}`).join('')}
      <p class="muted small">${t('map.askHint')}</p></section>`;
  }

  function card(UI) {
    const t = UI.t, esc = UI.esc, L = UI.lang();
    if (pin) return chronCard(UI);
    if (!sel) return `<p class="empty map-hint">${t('map.hint')}</p>`;
    const r = region(sel), realm = V.REALMS[r.realm];
    const court = UI.S().characters.filter(c => V.Gen.regionOf(c) === r.id);
    const nbs = V.Gen.notables(r.id, seedOf(UI, r.id));
    const atCourt = nb => UI.S().characters.find(c => c.set === nb.set);
    return `<section class="region-card">
      <header><h3>${esc(r.name[L])}</h3><small>${esc(realm.name[L])}</small></header>
      <div class="chips">${r.cities.map(c => `<span class="chip">🏰 ${esc(c[0])}</span>`).join('')}</div>
      <h4>${t('map.court')}</h4>
      ${court.length ? `<ul class="list">${court.map(c => `<li><button class="item" data-char="${esc(c.id)}">${UI.crest(c, 'sm')}<span class="txt"><strong>${esc(c.name)}</strong><small>${esc([c.job, c.city].filter(Boolean).join(' · '))}</small></span></button></li>`).join('')}</ul>`
        : `<p class="muted small">${t('map.nobody')}</p>`}
      <h4>${t('map.notables')} <button class="btn ghost tiny" data-act="map-reroll">🎲 ${t('map.reroll')}</button></h4>
      <ul class="list">${nbs.map((nb, i) => {
        const have = atCourt(nb);
        return `<li class="notable ${open === i ? 'open' : ''}">
          <button class="item" data-act="map-open" data-i="${i}">${UI.crest(nb, 'sm')}<span class="txt"><strong>${esc(nb.name)}</strong><small>${esc(nb.job)} · ${esc(UI.t('profile.age', { n: nb.age }))}</small><em>“${esc(nb.bio)}”</em></span>${have ? '<span class="tag">✓</span>' : ''}</button>
          ${open === i ? `<div class="nb-more">
            ${nb.photo ? `<img class="nb-photo" src="${esc(nb.photo)}" alt="" onerror="this.remove()">` : ''}
            <p class="small">${esc(UI.houseLabel(nb.house))} · ${esc(nb.city)} · ${esc(t('lang.' + nb.lang))}</p>
            <div class="chips">${nb.traits.map(x => `<span class="chip">${esc(UI.traitLabel(x))}</span>`).join('')}</div>
            <p class="about">${esc(nb.about)}</p>
            ${have ? `<button class="btn" data-char="${esc(have.id)}">${t('map.atCourt')}</button>`
              : `<button class="btn" data-act="map-invite" data-i="${i}">${t('map.invite')}</button>`}
          </div>` : ''}</li>`;
      }).join('')}</ul></section>`;
  }

  function render(UI) {
    UI.main.innerHTML = `
      <header class="top"><h1 class="title">${UI.t('nav.map')}</h1><p class="sub">${UI.t('map.sub')}</p></header>
      <div class="map-wrap">${svg(UI)}</div>
      <div id="mapCard">${card(UI)}</div>`;
  }
  const redrawCard = UI => { const el = document.getElementById('mapCard'); if (el) el.innerHTML = card(UI); };
  const redrawSvg = UI => { const w = document.querySelector('.map-wrap'); if (w) w.innerHTML = svg(UI); };

  const actions = UI => ({
    'map-region': a => {
      sel = a.dataset.id; pin = null; open = -1;
      redrawSvg(UI); redrawCard(UI);
      zoomTo(bboxOf(region(sel)));
    },
    'map-chron': a => {
      pin = a.dataset.k; sel = null; open = -1;
      redrawSvg(UI); redrawCard(UI);
      zoomTo(pinBox(pin));
    },
    // open her letters with "What news?" ready to send
    'map-news': a => {
      UI.write(a.dataset.id);
      const ta = document.getElementById('txt');
      if (ta) { ta.value = UI.t('map.askNews'); ta.focus(); }
    },
    'map-reset': () => {
      if (!sel && !pin) return;
      sel = null; pin = null; open = -1;
      redrawSvg(UI); redrawCard(UI);
      zoomTo(FULL);
    },
    'map-open': a => { const i = +a.dataset.i; open = open === i ? -1 : i; redrawCard(UI); },
    'map-reroll': () => {
      const w = world(UI); w.rolls[sel] = (w.rolls[sel] || 0) + 1; open = -1;
      UI.save(); redrawCard(UI);
    },
    'map-invite': a => {
      const nb = V.Gen.notables(sel, seedOf(UI, sel))[+a.dataset.i];
      if (!nb) return;
      Object.assign(nb, { id: V.Store.uid(), created: Date.now(), mod: 'valeria' });
      UI.S().characters.push(nb);
      UI.save();
      UI.toast(UI.t('map.joined', { name: nb.name }));
      V.FX.play('fleur');
      redrawSvg(UI); redrawCard(UI);
    }
  });

  // open the map on a region (Home, Library)
  function select(id) {
    const r = region(id);
    if (!r) return;
    sel = id; pin = null; open = -1; box = bboxOf(r);
  }

  return { render, actions, select, notables: (UI, id) => V.Gen.notables(id, seedOf(UI, id)) };
})();
