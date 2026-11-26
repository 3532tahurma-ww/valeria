/*
 * Valeria - 📯 The Herald (data: js/data/news.js)
 * Screens: news { tab: 'pro' | 'tid' }, article { id } (a proclamation), tiding { k } (one of today's tidings)
 * Today's tidings: TIDINGS templates × notables of random lands, seeded by the date (same all day, like Home).
 *   They also feed the 📯 ticker and the Herald card on Home. A tiding links to its land on the map and to its lady.
 * Unread proclamations: localStorage 'valeria:seen' (ids) → 🆕 badge.
 */
window.Valeria = window.Valeria || {};

Valeria.News = (() => {
  const V = Valeria;
  const SEEN = 'valeria:seen';
  const seen = () => { try { return JSON.parse(localStorage.getItem(SEEN)) || []; } catch (e) { return []; } };
  const markSeen = id => { const s = seen(); if (!s.includes(id)) { s.push(id); try { localStorage.setItem(SEEN, JSON.stringify(s)); } catch (e) {} } };
  const unread = () => V.PROCLAMATIONS.filter(p => !seen().includes(p.id)).length;
  const dayKey = () => new Date().toISOString().slice(0, 10);
  const CAT = { decree: ['📜 Decree', '📜 Décret'], court: ['💌 Court', '💌 Cour'], realms: ['🌍 Realms', '🌍 Royaumes'] };

  // today's tidings: [{ k, icon, title, story, region, i, nb }]
  function tidings(UI, n) {
    const L = UI.lang(), x = L === 'fr' ? 1 : 0, r = V.Gen.rng(dayKey() + 'tidings');
    const regs = V.REGIONS.slice().sort(() => r() - 0.5), tpl = V.TIDINGS.slice().sort(() => r() - 0.5);
    return tpl.slice(0, n || 8).map((tp, k) => {
      const fits = g => tp.home.some(o => o === g.id || o === 'realm:' + g.realm);
      const reg = (tp.home && regs.find(fits)) || regs[k % regs.length], list = V.MapView.notables(UI, reg.id), i = Math.floor(r() * list.length), nb = list[i];
      const O = V.ORIGINS[reg.id] || {}, city = reg.cities[Math.floor(r() * reg.cities.length)][0];
      const vars = { lady: `${nb.name}, ${nb.job}`, name: nb.name.split(' ')[0], title: nb.job, city, region: reg.name[L],
        saint: O.saint ? O.saint[x] : '', feast: O.feast ? O.feast[x] : '', food: O.food ? O.food[x] : '' };
      const fill = s => s.replace(/\{(\w+)\}/g, (m, key) => (vars[key] != null ? vars[key] : m));
      return { k, icon: tp.icon, title: fill(tp.t[x]), story: fill(tp.s[x]), region: reg, i, nb };
    });
  }

  function screens(UI) {
    const t = UI.t, esc = UI.esc;
    const date = d => V.I18n.date(new Date(d + 'T12:00:00'));
    return {
      news() {
        const L = UI.lang(), x = L === 'fr' ? 1 : 0, tab = UI.view().tab || 'pro', s = seen();
        const tids = tidings(UI, 8);
        UI.main.innerHTML = `
          <header class="top herald-top"><h1 class="title">${t('news.title')}</h1><p class="sub">${t('news.sub')}</p></header>
          <nav class="news-tabs">
            <button class="chip ${tab === 'pro' ? 'on' : ''}" data-act="news-tab" data-k="pro">📜 ${t('news.pro')}${unread() ? ` <b class="dot-new">${unread()}</b>` : ''}</button>
            <button class="chip ${tab === 'tid' ? 'on' : ''}" data-act="news-tab" data-k="tid">🗺️ ${t('news.tid')}</button>
          </nav>
          ${tab === 'pro' ? `<ul class="news-list">${V.PROCLAMATIONS.map((p, k) => `<li><button class="news-item ${k === 0 ? 'headline' : ''}" data-act="news-open" data-id="${p.id}">
              <span class="news-ic">${p.icon}</span>
              <span class="news-t"><small>${CAT[p.cat][x]} · ${esc(date(p.date))}${s.includes(p.id) ? '' : ' · <b class="new">🆕</b>'}</small><b>${esc(p.title[x])}</b><em>${esc(p.sum[x])}</em></span></button></li>`).join('')}</ul>`
          : `<ul class="news-list">${tids.map(n => `<li><button class="news-item" data-act="tiding-open" data-k="${n.k}">
              <span class="news-ic">${n.icon}</span>
              <span class="news-t"><small>${esc(n.region.name[L])}</small><b>${esc(n.title)}</b><em>${esc(n.story)}</em></span></button></li>`).join('')}</ul>`}`;
      },
      article() {
        const L = UI.lang(), x = L === 'fr' ? 1 : 0, p = V.PROCLAMATIONS.find(q => q.id === UI.view().id);
        if (!p) return UI.go('news');
        markSeen(p.id);
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-act="news-back" data-k="pro">‹</button><h2>📯 ${t('news.title')}</h2><span></span></header>
          <article class="leaf proclamation">
            <p class="pro-meta">${CAT[p.cat][x]} · ${esc(date(p.date))}</p>
            <h2 class="leaf-t">${p.icon} ${esc(p.title[x])}</h2>
            <p class="pro-sum">${esc(p.sum[x])}</p>
            ${p.sections.map(([h, b]) => `<h4>${esc(h[x])}</h4><p>${esc(b[x])}</p>`).join('')}
            <div class="herald-says"><span>📯</span><div>${p.story[L].map(s => `<p>${esc(s)}</p>`).join('')}<p class="sign">— ${t('news.sign')}</p></div></div>
            ${p.go ? `<div class="row-actions"><button class="btn" data-act="news-go" data-id="${p.id}">${t('news.see')} ›</button></div>` : ''}
          </article>`;
      },
      tiding() {
        const L = UI.lang(), n = tidings(UI, 8)[UI.view().k || 0];
        if (!n) return UI.go('news', { tab: 'tid' });
        const have = UI.S().characters.find(c => c.set === n.nb.set);
        UI.main.innerHTML = `
          <header class="bar"><button class="icon" data-act="news-back" data-k="tid">‹</button><h2>🗺️ ${t('news.tid')}</h2><span></span></header>
          <article class="leaf proclamation">
            <p class="pro-meta">${esc(n.region.name[L])} · ${esc(V.I18n.date(Date.now()))}</p>
            <h2 class="leaf-t">${n.icon} ${esc(n.title)}</h2>
            <div class="tid-lady">${n.nb.photo ? `<img src="${esc(n.nb.photo)}" alt="" onerror="this.remove()">` : UI.crest(n.nb, 'lg')}
              <div><b>${esc(n.nb.name)}</b><small>${esc(n.nb.job)} · ${esc(UI.t('profile.age', { n: n.nb.age }))}</small><i>“${esc(n.nb.bio)}”</i></div></div>
            <p>${esc(n.story)}</p>
            <p class="sign">— ${t('news.sign')}</p>
            <div class="row-actions">
              <button class="btn ghost" data-act="home-map" data-r="${n.region.id}">🗺️ ${t('news.visit')}</button>
              <button class="btn" data-act="home-answer" data-r="${n.region.id}" data-i="${n.i}">${have ? '✒️ ' + t('profile.write') : '✉️ ' + t('home.answer')}</button>
            </div>
          </article>`;
      }
    };
  }

  const actions = UI => ({
    'news-tab': a => UI.go('news', { tab: a.dataset.k }),
    'news-back': a => UI.go('news', { tab: a.dataset.k }),
    'news-open': a => UI.go('article', { id: a.dataset.id }),
    'tiding-open': a => UI.go('tiding', { k: +a.dataset.k }),
    'news-go': a => { const p = V.PROCLAMATIONS.find(q => q.id === a.dataset.id); if (p && p.go) UI.go(p.go[0], Object.assign({}, p.go[1])); }
  });

  return { screens, actions, tidings, unread, CAT };
})();
