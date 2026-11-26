/*
 * Valeria - 🎲 random characters (like Carmen) and map notables
 * Gen.character({ region, gender, lang, rng, rank, photo }) → character draft (no id)
 *   rank 0 = the region's ruler (Queen of France…), 1 = region.second if any, otherwise an ordinary title
 * Gen.field(name, draft) re-rolls one field: name, age, house, job, city, bio, about, traits, photo
 * Gen.notables(regionId, seed) → 5 deterministic drafts for the map (same seed = same people)
 * Gen.regionOf(character) → region id from character.region or its city
 * Portraits come from Valeria.PORTRAITS (chars/, list built by portreleri-guncelle.bat); unused ones first.
 */
window.Valeria = window.Valeria || {};

Valeria.Gen = (() => {
  const V = Valeria;

  function hash(s) {
    let h = 1779033703 ^ s.length;
    for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return h >>> 0;
  }
  // mulberry32 seeded random
  function rng(seed) {
    let a = hash(String(seed));
    return () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const sample = (r, a, n) => { const c = a.slice(), o = []; while (o.length < n && c.length) o.push(c.splice(Math.floor(r() * c.length), 1)[0]); return o; };
  const L = d => (d.lang === 'fr' ? 1 : 0);

  const region = id => V.REGIONS.find(x => x.id === id);
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  function regionOf(c) {
    if (c && c.region && region(c.region)) return c.region;
    const city = norm(c && c.city);
    if (!city) return '';
    const r = V.REGIONS.find(x => x.cities.some(k => norm(k[0]) === city) || (x.alias || []).some(a => norm(a) === city));
    return r ? r.id : '';
  }
  V.CITIES = V.REGIONS.reduce((a, r) => a.concat(r.cities.map(k => k[0]), r.alias || []), []);

  const usedPhotos = () => new Set(((V.Store && V.Store.state.characters) || []).map(c => c.photo).filter(Boolean));

  const fields = {
    name(d, r) {
      const reg = region(d.region), pool = reg ? reg.names : (d.lang === 'fr' ? 'fr' : 'en');
      const first = V.POOLS.first[pool] || V.POOLS.first.en, g = d.gender === '♂' ? 'm' : 'f';
      return pick(r, first[g]) + ' ' + pick(r, V.POOLS.surname[pool] || V.POOLS.surname.en);
    },
    age(d, r) { return String(18 + Math.floor(r() * r() * 27)); },
    house(d, r) {
      const reg = region(d.region);
      if (reg && reg.houses.length) return pick(r, reg.houses);
      const realm = d.lang === 'fr' ? ['fr', 'bur', 'bri'] : ['en', 'sco', 'irl'];
      return pick(r, V.HOUSES.filter(h => realm.includes(h.realm))).id;
    },
    job(d, r, rank) {
      const reg = region(d.region), g = d.gender === '♂' ? 'm' : 'f';
      if (reg && g === 'f' && rank === 0) return reg.ruler[L(d)];
      if (reg && g === 'f' && rank === 1 && reg.second) return reg.second[L(d)];
      const t = pick(r, V.POOLS.titles[g]);
      return t[L(d)];
    },
    city(d, r) {
      const reg = region(d.region);
      if (reg) return rank0City(reg, d, r);
      const same = V.REGIONS.filter(x => x.lang === (d.lang === 'fr' ? 'fr' : 'en'));
      return pick(r, pick(r, same).cities)[0];
    },
    bio(d, r) { return pick(r, V.POOLS.mottos)[L(d)]; },
    about(d, r) {
      const i = L(d), first = String(d.name || '').split(' ')[0] || '…', city = d.city || '…';
      const f = s => s.replace(/\{name\}/g, first).replace(/\{city\}/g, city);
      return [pick(r, V.POOLS.origins)[i], pick(r, V.POOLS.secrets)[i], pick(r, V.POOLS.hopes)[i]].map(f).join(' ');
    },
    traits(d, r) {
      const st = V.TRAITS.style.filter(x => x !== 'Uses vous' && x !== 'Uses tu');
      // one trait typical of the homeland (js/data/origins.js), then random ones
      const home = ((V.ORIGINS || {})[d.region || regionOf(d)] || {}).traits || [];
      const out = home.length ? [pick(r, home)] : [];
      sample(r, V.TRAITS.personality.filter(x => !out.includes(x)), 1 + Math.floor(r() * 2)).forEach(x => out.push(x));
      sample(r, st.filter(x => !out.includes(x)), 1).forEach(x => out.push(x));
      if (d.lang === 'fr') out.push(r() < 0.7 ? 'Uses vous' : 'Uses tu');
      return out;
    },
    // 📏 figure ("Height: Tall", "Boob Size: 85"…): build first, bosom and hips follow the build (js/data/body.js FIGURE)
    figure(d, r) {
      const F = V.FIGURE || [], g = d.gender === '♂' ? '♂' : '♀', out = [];
      const W = pick(r, ['Very Thin', 'Thin', 'Slim', 'Slim', 'Average', 'Average', 'Curvy', 'Curvy', 'Chubby', 'Overweight']);
      const range = { 'Very Thin': [0, 2], 'Thin': [0, 2], 'Slim': [1, 3], 'Average': [1, 4], 'Curvy': [3, 5], 'Chubby': [3, 5], 'Overweight': [4, 5] }[W];
      F.forEach(grp => {
        if (grp.gender && grp.gender !== g) return;
        let val;
        if (grp.id === 'Weight') val = W;
        else if (grp.id === 'Boob Size' || grp.id === 'Butt Size') val = grp.items[range[0] + Math.floor(r() * (range[1] - range[0] + 1))];
        else if (grp.id === 'Pussy Size' || grp.id === 'Anal Size') val = grp.items[Math.min(grp.items.length - 1, Math.floor(r() * r() * grp.items.length) + (grp.id === 'Anal Size' ? 0 : 1))];
        else val = pick(r, grp.items);
        out.push(`${grp.id}: ${val}`);
      });
      return out;
    },
    photo(d, r) {
      const all = V.PORTRAITS || [];
      if (!all.length) return '';
      const used = usedPhotos(), free = all.filter(p => !used.has(p) && p !== d.photo);
      return pick(r, free.length ? free : all);
    }
  };
  // rulers live in the region's first city
  function rank0City(reg, d, r) { return d._rank === 0 ? reg.cities[0][0] : pick(r, reg.cities)[0]; }

  function character(o = {}) {
    const r = o.rng || Math.random;
    const reg = region(o.region) || (o.anyRegion ? pick(r, V.REGIONS) : null);
    const d = {
      gender: o.gender || '♀',
      lang: o.lang || (reg ? reg.lang : (r() < 0.5 ? 'fr' : 'en')),
      region: reg ? reg.id : '',
      _rank: o.rank,
      traits: [], tags: [], album: [], photo: ''
    };
    d.house = fields.house(d, r);
    d.name = fields.name(d, r);
    d.age = o.rank === 0 ? String(24 + Math.floor(r() * 18)) : fields.age(d, r);
    d.job = fields.job(d, r, o.rank);
    d.city = fields.city(d, r);
    d.bio = fields.bio(d, r);
    d.about = fields.about(d, r);
    d.traits = fields.traits(d, r).concat(fields.figure(d, r));
    d.photo = o.photo !== undefined ? o.photo : fields.photo(d, r);
    const h = V.HOUSES.find(x => x.id === d.house);
    d.colors = (h || V.HOUSES[0]).colors.slice();
    delete d._rank;
    return d;
  }

  function field(name, d) {
    if (name === 'all') {
      const keep = { gender: d.gender, lang: d.lang, region: d.region };
      return Object.assign(d, character(keep));
    }
    if (!fields[name]) return d;
    const isFig = t => t.includes(': ');
    if (name === 'figure') { d.traits = d.traits.filter(t => !isFig(t)).concat(fields.figure(d, Math.random)); return d; }
    if (name === 'traits') { d.traits = fields.traits(d, Math.random).concat(d.traits.filter(isFig)); return d; }
    d[name] = fields[name](d, Math.random);
    if (name === 'house') { const h = V.HOUSES.find(x => x.id === d.house); if (h) d.colors = h.colors.slice(); }
    return d;
  }

  function notables(regionId, seed) {
    const reg = region(regionId);
    if (!reg) return [];
    const r = rng(`${seed}:${regionId}`);
    const photos = sample(r, V.PORTRAITS || [], 5);
    return [0, 1, 2, 3, 4].map(i => Object.assign(
      character({ region: regionId, gender: '♀', rank: i, rng: r, photo: photos[i] || '' }),
      { set: `map:${regionId}:${seed}:${i}` }
    ));
  }

  return { rng, character, field, notables, regionOf };
})();
