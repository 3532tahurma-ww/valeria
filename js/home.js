/*
 * Valeria - 🏠 Home page (like Carmen's portal home)
 * Sections: date line (canonical hour, weather, feast day) · 📯 herald ticker · 🌹 lady of the day · 👑 your court carousel ·
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
  // [month, day, EN, FR]
  const FEASTS = [[1, 3, 'Saint Genevieve', 'Sainte Geneviève'], [1, 6, 'Epiphany', "l'Épiphanie"], [1, 21, 'Saint Agnes', 'Sainte Agnès'], [2, 1, 'Saint Brigid', 'Sainte Brigitte'],
    [2, 14, 'Saint Valentine', 'Saint Valentin'], [3, 1, 'Saint David', 'Saint David'], [3, 17, 'Saint Patrick', 'Saint Patrick'], [4, 23, 'Saint George', 'Saint Georges'],
    [6, 24, 'Midsummer, Saint John', 'la Saint-Jean'], [7, 15, 'Saint Swithun', 'Saint Swithun'], [7, 22, 'Saint Mary Magdalene', 'Sainte Marie-Madeleine'], [8, 25, 'Saint Louis', 'Saint Louis'],
    [9, 29, 'Michaelmas', 'la Saint-Michel'], [10, 1, 'Saint Remi', 'Saint Remi'], [10, 9, 'Saint Denis', 'Saint Denis'], [10, 25, 'Saint Crispin', 'Saint Crépin'],
    [11, 1, 'All Saints', 'la Toussaint'], [11, 11, 'Martinmas', 'la Saint-Martin'], [11, 20, 'Saint Edmund', 'Saint Edmond'], [11, 25, 'Saint Catherine', 'Sainte Catherine'],
    [11, 30, 'Saint Andrew', 'Saint André'], [12, 6, 'Saint Nicholas', 'Saint Nicolas'], [12, 13, 'Saint Lucy', 'Sainte Lucie'], [12, 25, 'Christmas', 'Noël'], [12, 29, 'Saint Thomas Becket', 'Saint Thomas Becket']];
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
  const NEWS = [['📯 {lady} seeks a gallant correspondent.', '📯 {lady} cherche un correspondant galant.'],
    ['⚔️ Skirmish near {city}: the roads are unsafe.', '⚔️ Escarmouche près de {city} : les routes sont dangereuses.'],
    ['🏇 A tourney is proclaimed at {city} next Sunday.', '🏇 Un tournoi est proclamé à {city} dimanche prochain.'],
    ['💍 Wedding in {region}: the bells ring for three days.', '💍 Noces en {region} : les cloches sonnent trois jours.'],
    ['🐎 A messenger lost his horse near {city}. Letters will be late.', '🐎 Un messager a perdu son cheval près de {city}. Les lettres seront en retard.'],
    ['🍷 New wine has reached {city}. The taverns are full.', '🍷 Le vin nouveau est arrivé à {city}. Les tavernes sont pleines.'],
    ['🕯️ Pilgrims crowd the roads of {region}.', '🕯️ Les pèlerins se pressent sur les routes de {region}.'],
    ['🎭 Minstrels arrive in {city} with a scandalous new song.', '🎭 Des ménestrels arrivent à {city} avec une chanson scandaleuse.'],
    ['🌹 Rumour at court: {lady} refused another suitor.', '🌹 Rumeur à la cour : {lady} a refusé un nouveau prétendant.']];

  const dayKey = () => new Date().toISOString().slice(0, 10);
  const season = m => (m === 12 || m <= 2 ? 'winter' : m <= 5 ? 'spring' : m <= 8 ? 'summer' : 'autumn');
  const pickR = (r, a) => a[Math.floor(r() * a.length)];
  const shuffle = (r, a) => { const c = a.slice(); for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; };

  function feast(L) {
    const d = new Date(), m = d.getMonth() + 1, day = d.getDate(), i = L === 'fr' ? 3 : 2;
    const today = FEASTS.find(f => f[0] === m && f[1] === day);
    if (today) return { today: true, name: today[i] };
    const doy = (mm, dd) => mm * 31 + dd, now = doy(m, day);
    const next = FEASTS.find(f => doy(f[0], f[1]) > now) || FEASTS[0];
    const date = new Date(d.getFullYear() + (doy(next[0], next[1]) > now ? 0 : 1), next[0] - 1, next[1]);
    return { today: false, name: next[i], date: date.toLocaleDateString(L, { day: 'numeric', month: 'long' }) };
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
    const nbs = notablesOfDay(UI, 9, 'news');
    const news = NEWS.map((n, k) => {
      const x = nbs[k % nbs.length];
      const txt = n[i].replace('{lady}', `${x.nb.name}, ${x.nb.job}`).replace('{city}', x.region.cities[Math.floor(r() * x.region.cities.length)][0]).replace('{region}', x.region.name[L]);
      return `<button data-act="home-map" data-r="${x.region.id}">${esc(txt)}</button>`;
    });
    const ticker = shuffle(r, news).join('<span class="dot">❦</span>');

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
        <p class="home-date">${esc(now.toLocaleDateString(L, { weekday: 'long', day: 'numeric', month: 'long' }))} · 🔔 ${esc(hour)} · ${w[0]} ${esc(w[i + 1])}</p>
        <h1 class="title">Valeria</h1>
        <p class="sub">${esc(slogan)}</p>
        <p class="home-feast">✝ ${f.today ? t('home.feastToday', { name: f.name }) : t('home.feastNext', { name: f.name, date: f.date })}</p>
      </header>

      <div class="ticker"><div class="ticker-in">${ticker}<span class="dot">❦</span>${ticker}</div></div>

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
