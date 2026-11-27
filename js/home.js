/*
 * Valeria - 🏠 Home page (like Carmen's portal home)
 * Sections: date line (canonical hour, weather, feast day) · 📯 ticker of today's tidings · 📯 Herald card (js/news.js) · 🌹 lady of the day · 👑 your court carousel ·
 *           ✉️ recent letters · 📜 proclamations (notables asking for letters) · 🗺️ ladies of the realms · 📚 library · map card.
 * Everything "of the day" is seeded by the date (Gen.rng), so it stays the same all day and changes tomorrow.
 * Notables come from MapView.notables (same people as on the map).
 */
window.Valeria = window.Valeria || {};

Valeria.Home = (() => {
  const V = Valeria;
  const HOURS = [['Matins', 'Matines'], ['Lauds', 'Laudes'], ['Prime', 'Prime'], ['Terce', 'Tierce'], ['Sext', 'Sexte'], ['None', 'None'], ['Vespers', 'Vêpres'], ['Compline', 'Complies']];
  const WEATHER = {
    winter: [['❄️', 'Snow', 'Neige'], ['🌫️', 'Mist', 'Brume'], ['🌬️', 'Bitter wind', 'Vent glacial'], ['☁️', 'Grey skies', 'Ciel gris']],
    spring: [['🌦️', 'Showers', 'Averses'], ['☀️', 'Fair', 'Beau temps'], ['🌸', 'Mild', 'Doux']],
    summer: [['☀️', 'Hot sun', 'Grand soleil'], ['⛈️', 'Storm', 'Orage'], ['🌤️', 'Fair', 'Beau temps']],
    autumn: [['🌧️', 'Rain', 'Pluie'], ['🍂', 'Falling leaves', 'Feuilles mortes'], ['🌫️', 'Mist', 'Brume'], ['🌬️', 'Wind', 'Vent']]
  };
  const SLOGANS = [['Every letter is a little conquest.', 'Chaque lettre est une petite conquête.'], ['Between two crowns, a thousand hearts.', 'Entre deux couronnes, mille cœurs.'],
    ['Seal it with wax, send it with hope.', 'Scellez-la de cire, envoyez-la avec espoir.'], ['The war is outside. The letters are in here.', 'La guerre est dehors. Les lettres sont ici.']];
  const PROCLAIM = [['Seeking a knight who writes better than he jousts.', 'Cherche chevalier qui écrive mieux qu’il ne joute.'],
    ['My window faces the river. My heart faces whoever writes first.', 'Ma fenêtre donne sur le fleuve. Mon cœur, sur le premier qui m’écrira.'],
    ['Bored at court. Rescue me with a scandalous letter.', 'Je m’ennuie à la cour. Sauvez-moi par une lettre scandaleuse.'],
    ['I light a candle every night. Tell me for whom.', 'J’allume une chandelle chaque nuit. Dites-moi pour qui.'],
    ['Promised to an old baron. Looking for a reason to refuse.', 'Promise à un vieux baron. Je cherche une raison de refuser.'],
    ['They say I am dangerous. Write and find out.', 'On me dit dangereuse. Écrivez et vous verrez.'],
    ['Fluent in French, English and sighs.', 'Je parle français, anglais et soupirs.'],
    ['My chaperone sleeps at nine. I do not.', 'Mon chaperon dort à neuf heures. Pas moi.']];
  const dayKey = () => new Date().toISOString().slice(0, 10);
  const season = m => (m === 12 || m <= 2 ? 'winter' : m <= 5 ? 'spring' : m <= 8 ? 'summer' : 'autumn');
  const pickR = (r, a) => a[Math.floor(r() * a.length)];
  const shuffle = (r, a) => { const c = a.slice(); for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; };

  // 📅 today's feast (js/feasts.js) or the next one
  function feast(L) {
    const f = V.Feasts.current();
    if (f) return { today: true, f, name: f.name[L] };
    const n = V.Feasts.next();
    return { today: false, f: n.f, name: n.f.name[L], date: n.date.toLocaleDateString(L, { day: 'numeric', month: 'long' }) };
  }

  // n notables from different regions, seeded by the day: [{ nb, region, i }]
  function notablesOfDay(UI, n, salt) {
    const r = V.Gen.rng(dayKey() + salt);
    return shuffle(r, V.REGIONS).slice(0, n).map(reg => {
      const list = V.MapView.notables(UI, reg.id), i = Math.floor(r() * list.length);
      return { nb: list[i], region: reg, i };
    });
  }
  const atCourt = (UI, nb) => UI.S().characters.find(c => c.set === nb.set);

  function render(UI) {
    const L = UI.lang(), i = L === 'fr' ? 1 : 0, t = UI.t, esc = UI.esc, s = UI.S();
    const r = V.Gen.rng(dayKey());
    const now = new Date(), hour = HOURS[Math.floor(now.getHours() / 3)][i];
    const w = pickR(r, WEATHER[season(now.getMonth() + 1)]), f = feast(L);
    const slogan = pickR(r, SLOGANS)[i];
    const court = s.characters;

    // 🌹 lady of the day: someone from your court, else a notable
    const ladyC = court.length ? court[Math.floor(r() * court.length)] : null;
    const ladyN = ladyC ? null : notablesOfDay(UI, 1, 'lady')[0];
    const lady = ladyC || ladyN.nb;
    const regOfLady = V.REGIONS.find(x => x.id === V.Gen.regionOf(lady));
    const O = regOfLady && V.ORIGINS[regOfLady.id];
    const quote = O ? O.lines[L][Math.floor(r() * O.lines[L].length)].replace('{sen}', s.user.name || t('you')) : pickR(r, PROCLAIM)[i];
    const pic = (c, cls) => c.photo ? `<img class="${cls}" src="${esc(c.photo)}" alt="" loading="lazy" onerror="this.remove()">` : UI.crest(c, 'xl');

    // 📯 ticker
    // 📯 ticker and Herald card: today's tidings (js/news.js) + the latest proclamation
    const tids = V.News.tidings(UI, 8);
    const ticker = tids.map(n => `<button data-act="tiding-open" data-k="${n.k}">${n.icon} ${esc(n.title)}</button>`).join('<span class="dot">❦</span>');
    const head = V.PROCLAMATIONS[0], unread = V.News.unread(), chr = V.Chronicle.latest();

    // 📜 proclamations + 🗺️ ladies of the realms
    const pro = notablesOfDay(UI, 2, 'pro');
    const proCard = (x, k) => {
      const nb = x.nb, have = atCourt(UI, nb);
      return `<article class="procl" style="--c1:${esc(nb.colors[0])};--c2:${esc(nb.colors[1])}">
        <span class="procl-tag">📜 ${t('home.proclamation')}</span>
        <div class="procl-pic">${pic(nb, 'procl-img')}</div>
        <div class="procl-t"><small>${esc(x.region.name[L])}</small><b>${esc(nb.name)}</b><em>${esc(nb.job)} · ${esc(t('profile.age', { n: nb.age }))}</em>
          <q>${esc(PROCLAIM[(Math.floor(r() * 99) + k) % PROCLAIM.length][i])}</q>
          <button class="btn" data-act="home-answer" data-r="${x.region.id}" data-i="${x.i}">${have ? '✒️ ' + t('profile.write') : '✉️ ' + t('home.answer')}</button></div></article>`;
    };
    const realm = notablesOfDay(UI, 8, 'realm');

    const recent = s.threads.slice().sort((a, b) => UI.lastTs(b) - UI.lastTs(a)).slice(0, 3);

    UI.main.innerHTML = `
      <header class="home-top">
        <p class="home-date">${esc(V.I18n.date(now, { weekday: 'long' }))} · 🔔 ${esc(hour)} · ${w[0]} ${esc(w[i + 1])}</p>
        <h1 class="title">Valeria</h1>
        <p class="sub">${esc(slogan)}</p>
        ${f.today ? '' : `<p class="home-feast"><button class="linkish" data-act="lib-open" data-id="calendar">${f.f.icon} ${t('home.feastNext', { name: f.name, date: f.date })}</button></p>`}
      </header>
      ${f.today ? `<section class="feast-banner" data-act="lib-open" data-id="calendar">
        <span class="fb-orn">${V.Feasts.look(f.f).banner}</span>
        <div><small>📅 ${t('home.feastDay')}</small><b>${f.f.icon} ${esc(f.name)}</b><em>${esc(f.f.desc[L])}</em></div>
        <span class="fb-orn">${V.Feasts.look(f.f).banner}</span></section>` : ''}

      <div class="ticker"><div class="ticker-in">${ticker}<span class="dot">❦</span>${ticker}</div></div>

      <section class="h-sec herald">
        <h3 class="sec">📯 ${t('news.title')} <button class="more" data-go="news">${t('home.all')}${unread ? ` · 🆕 ${unread}` : ''} ›</button></h3>
        <button class="news-item headline" data-act="news-open" data-id="${head.id}"><span class="news-ic">${head.icon}</span><span class="news-t"><small>${V.News.CAT[head.cat][i]}</small><b>${esc(head.title[i])}</b><em>${esc(head.sum[i])}</em></span></button>
        ${chr ? `<button class="news-item small" data-act="news-tab" data-k="chr"><span class="news-ic">${chr.icon}</span><span class="news-t"><small>⚔️ ${t('news.chr')}${V.Chronicle.isToday(chr) ? ' · ' + t('news.chrToday') : ''}</small><b>${esc(chr.t[i])}</b></span></button>` : ''}
        ${tids.slice(0, 2).map(n =>`<button class="news-item small" data-act="tiding-open" data-k="${n.k}"><span class="news-ic">${n.icon}</span><span class="news-t"><small>${esc(n.region.name[L])}</small><b>${esc(n.title)}</b></span></button>`).join('')}
      </section>

      <section class="lady" style="--c1:${esc((lady.colors || [])[0] || '#7a1f2b')};--c2:${esc((lady.colors || [])[1] || '#b08d3c')}">
        <span class="lady-tag">🌹 ${t('home.lady')}</span>
        <div class="lady-pic">${pic(lady, 'lady-img')}</div>
        <div class="lady-t">
          <h2>${esc(lady.name)}</h2>
          <p>${esc([lady.job, regOfLady && regOfLady.name[L]].filter(Boolean).join(' · '))}</p>
          ${lady.bio ? `<p class="lady-motto">“${esc(lady.bio)}”</p>` : ''}
          <blockquote>${esc(quote)}</blockquote>
          <div class="row-actions">${ladyC
            ? `<button class="btn" data-act="home-write" data-id="${esc(ladyC.id)}">✒️ ${t('home.writeHer')}</button><button class="btn ghost" data-char="${esc(ladyC.id)}">👁️ ${t('home.profile')}</button>`
            : `<button class="btn" data-act="home-answer" data-r="${ladyN.region.id}" data-i="${ladyN.i}">✉️ ${t('home.answer')}</button>`}</div>
        </div>
      </section>

      <section class="h-sec">
        <h3 class="sec">👑 ${t('home.court')} <button class="more" data-go="court">${t('home.all')} ›</button></h3>
        <div class="rail">
          ${court.map(c => `<button class="mini" data-char="${esc(c.id)}">${c.photo ? `<img src="${esc(c.photo)}" alt="" loading="lazy" onerror="this.remove()">` : UI.crest(c, 'lg')}<b>${esc(c.name.split(' ')[0])}</b><small>${esc(c.job || '')}</small></button>`).join('')}
          <button class="mini add" data-go="edit"><span>✒️</span><b>${t('nav.create')}</b></button>
          <button class="mini add" data-act="summon"><span>🎲</span><b>${t('court.summon')}</b></button>
        </div>
      </section>

      ${recent.length ? `<section class="h-sec"><h3 class="sec">✉️ ${t('home.recent')} <button class="more" data-go="letters">${t('home.all')} ›</button></h3>
        <ul class="list">${recent.map(th => { const cs = UI.threadChars(th); return `<li><button class="item" data-thread="${esc(th.id)}"><span class="crests">${cs.slice(0, 3).map(c => UI.crest(c, 'sm')).join('')}</span><span class="txt"><strong>${esc(th.title)}</strong><em>${esc(UI.snippet(th))}</em></span></button></li>`; }).join('')}</ul></section>` : ''}

      ${proCard(pro[0], 0)}

      <section class="h-sec">
        <h3 class="sec">🗺️ ${t('home.realms')} <button class="more" data-go="map">${t('nav.map')} ›</button></h3>
        <div class="rail">${realm.map(x => `<button class="mini nb" data-act="home-map" data-r="${x.region.id}">${x.nb.photo ? `<img src="${esc(x.nb.photo)}" alt="" loading="lazy" onerror="this.remove()">` : UI.crest(x.nb, 'lg')}<b>${esc(x.nb.name.split(' ')[0])}</b><small>${esc(x.nb.job)}</small><i style="background:${V.REALMS[x.region.realm].fill}">${esc((x.region.short || x.region.name)[L])}</i></button>`).join('')}</div>
      </section>

      <section class="h-cards">
        <button class="h-card lib" data-go="library"><span class="spines">${V.BOOKS.map(b => `<i style="--bk:${b.color}">${b.icon}</i>`).join('')}</span><b>📚 ${t('nav.library')}</b><small>${t('home.libSub', { n: V.BOOKS.length })}</small></button>
        <button class="h-card labs" data-go="labs"><span class="h-card-ic">🧪</span><b>${t('labs.title')}</b><small>${t('labs.sub')}</small></button>
        <button class="h-card map" data-go="map"><span class="h-card-ic">🗺️</span><b>${t('home.mapCard')}</b><small>${t('home.mapSub', { n: V.REGIONS.length, c: court.filter(c => V.Gen.regionOf(c)).length })}</small></button>
      </section>

      ${proCard(pro[1], 1)}`;
  }

  function invite(UI, regionId, i) {
    const nb = V.MapView.notables(UI, regionId)[i];
    if (!nb) return null;
    const have = atCourt(UI, nb);
    if (have) return have;
    Object.assign(nb, { id: V.Store.uid(), created: Date.now(), mod: 'valeria' });
    UI.S().characters.push(nb);
    UI.save();
    UI.toast(UI.t('map.joined', { name: nb.name }));
    V.FX.play('fleur');
    return nb;
  }

  const actions = UI => ({
    'home-map': a => { V.MapView.select(a.dataset.r); UI.go('map'); },
    'home-write': a => UI.write(a.dataset.id),
    'home-answer': a => { const c = invite(UI, a.dataset.r, +a.dataset.i); if (c) UI.write(c.id); }
  });

  return { render, actions };
})();
