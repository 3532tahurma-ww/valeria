/*
 * Valeria - 🎵 background music + medieval interface sounds (no sound files: WebAudio synthesis)
 * Music: tracks from Valeria.MUSIC (js/data/music.js, built from Music/ by portreleri-guncelle.bat), played in order and looped,
 *   or 🪕 lute pieces (js/data/lute.js) played live with the button's lute string + bass, bourdon and tabor (shuffled, offline).
 *   Browsers block autoplay, so it starts on the first tap. Paused while the page is hidden.
 * Sounds: pluck (lute string, every button), seal (wax seal thump, sending), bell (a letter arrives), rustle (page turn).
 * Settings in localStorage: valeria:music ('1' recorded, 'lute', '0' off), valeria:vol (0-1, default .35), valeria:sfx ('0' = off).
 */
window.Valeria = window.Valeria || {};

Valeria.Sound = (() => {
  const V = Valeria;
  const get = (k, d) => { const v = localStorage.getItem(k); return v == null ? d : v; };
  const set = (k, v) => { try { localStorage.setItem(k, String(v)); } catch (e) {} };

  /* ---------- music ---------- */
  let audio = null, track = 0, unlocked = false;
  const musicMode = () => { const m = get('valeria:music', '1'); return m === '1' && !(V.MUSIC || []).length ? 'lute' : m; };
  const musicOn = () => musicMode() !== '0';
  const volume = () => Math.max(0, Math.min(1, parseFloat(get('valeria:vol', '0.35')) || 0));
  function load() {
    const list = V.MUSIC || [];
    if (!list.length) return null;
    if (!audio) {
      audio = new Audio();
      audio.preload = 'none';
      audio.addEventListener('ended', () => { track = (track + 1) % list.length; audio.src = list[track]; audio.play().catch(() => {}); });
    }
    if (!audio.src) { audio.src = list[track]; audio.loop = list.length === 1; }
    audio.volume = volume();
    return audio;
  }
  function play() {
    if (!musicOn() || !unlocked) return;
    if (musicMode() === 'lute') { if (audio) audio.pause(); Lute.start(); return; }
    Lute.stop();
    const a = load(); if (a) { a.volume = 0; a.play().then(() => fade(volume())).catch(() => {}); }
  }
  function fade(to) {
    if (!audio) return;
    const from = audio.volume, t0 = performance.now();
    const step = now => { const k = Math.min(1, (now - t0) / 1200); audio.volume = from + (to - from) * k; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  // mode: '1' recorded tracks, 'lute' composed lute pieces, '0' off (true/false kept for old callers)
  function setMusic(mode) {
    mode = mode === true ? '1' : mode === false ? '0' : String(mode);
    set('valeria:music', mode);
    if (mode !== '0') play(); else { if (audio) audio.pause(); Lute.stop(); }
  }
  function setVolume(v) { set('valeria:vol', v); if (audio) audio.volume = volume(); Lute.level(); }
  const playing = () => !!(audio && !audio.paused) || Lute.on();

  /* ---------- synthesized sounds ---------- */
  let ac = null;
  const sfxOn = () => get('valeria:sfx', '1') !== '0';
  const ctx = () => {
    if (!ac) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ac = new C(); }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  };
  const out = (c, gain) => { const g = c.createGain(); g.gain.setValueAtTime(gain, c.currentTime); g.connect(c.destination); return g; };

  // lute pluck: Karplus-Strong string, buffers cached per note
  const cache = new Map();
  function pluckBuf(c, freq, secs = 0.9) {
    const key = Math.round(freq) + ':' + secs;
    if (cache.has(key)) return cache.get(key);
    const sr = c.sampleRate, N = Math.round(sr / freq), len = Math.floor(sr * secs);
    const buf = c.createBuffer(1, len, sr), d = buf.getChannelData(0), ring = new Float32Array(N);
    for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    let idx = 0;
    for (let i = 0; i < len; i++) {
      const a = ring[idx], b = ring[(idx + 1) % N];
      ring[idx] = (a + b) * 0.5 * 0.994;
      d[i] = a;
      idx = (idx + 1) % N;
    }
    cache.set(key, buf);
    return buf;
  }
  // D dorian notes, as on a lute
  const NOTES = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33];
  let last = -1;
  function pluck(vol = 0.16) {
    const c = sfxOn() && ctx();
    if (!c) return;
    let k; do { k = Math.floor(Math.random() * NOTES.length); } while (k === last && NOTES.length > 1);
    last = k;
    const src = c.createBufferSource(), lp = c.createBiquadFilter(), g = out(c, vol);
    src.buffer = pluckBuf(c, NOTES[k]);
    lp.type = 'lowpass'; lp.frequency.value = 2600;
    src.connect(lp); lp.connect(g);
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.85);
    src.start();
  }

  const noise = (c, dur) => {
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = buf; return s;
  };

  /* ---------- 🪕 lute music: pieces from Valeria.LUTE (js/data/lute.js), scheduled on the WebAudio clock ---------- */
  const Lute = (() => {
    const LEVEL = 0.9, PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let bus = null, timer = null, events = [], pos = 0, end = 0, order = [], last = -1, drones = [];
    const midi = s => { const m = /^([A-G])([#b]?)(\d)$/.exec(s || ''); return m ? 12 * (+m[3] + 1) + PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) : null; };
    const hz = n => 440 * Math.pow(2, (n - 69) / 12);
    const parse = s => s.split(/[\s|]+/).filter(Boolean).map(tok => { const [n, d] = tok.split('/'); return { n: n === '-' ? null : midi(n), d: +d || 1 }; });
    const jit = a => (Math.random() * 2 - 1) * a;

    // small stone hall: dry + generated reverb tail into a master gain that follows the music volume
    function makeBus(c) {
      const master = c.createGain(), input = c.createGain(), rev = c.createConvolver(), wet = c.createGain();
      const sr = c.sampleRate, len = Math.floor(sr * 2.4), ir = c.createBuffer(2, len, sr);
      for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      rev.buffer = ir; wet.gain.value = 0.28; master.gain.value = 0;
      input.connect(master); input.connect(rev); rev.connect(wet); wet.connect(master); master.connect(c.destination);
      return { master, input };
    }
    function note(c, t, n, vol, ring, secs, cut) {
      const src = c.createBufferSource(), lp = c.createBiquadFilter(), g = c.createGain();
      src.buffer = pluckBuf(c, hz(n), secs);
      lp.type = 'lowpass'; lp.frequency.value = cut;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + ring);
      src.connect(lp); lp.connect(g); g.connect(bus.input);
      src.start(t); src.stop(t + ring + 0.05);
    }
    function drum(c, t, strong) {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(strong ? 110 : 140, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.15);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(strong ? 0.3 : 0.15, t + 0.005); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      o.connect(g); g.connect(bus.input); o.start(t); o.stop(t + 0.25);
      const n = noise(c, 0.08), bp = c.createBiquadFilter(), g2 = c.createGain();
      bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 1;
      g2.gain.setValueAtTime(strong ? 0.06 : 0.03, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      n.connect(bp); bp.connect(g2); g2.connect(bus.input); n.start(t);
    }
    // bourdon: root + fifth, filtered saws, fading in and out with the piece
    function drone(c, t, stop, n) {
      const lp = c.createBiquadFilter(), g = c.createGain();
      lp.type = 'lowpass'; lp.frequency.value = 420;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 3);
      g.gain.setValueAtTime(0.035, stop - 3); g.gain.exponentialRampToValueAtTime(0.0001, stop);
      lp.connect(g); g.connect(bus.input);
      return [hz(n), hz(n + 7), hz(n) * 1.003].map(f => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(lp); o.start(t); o.stop(stop + 0.1); return o; });
    }

    // a piece → timed events [time, kind, midi, vol, ring]; repeated sections get grace notes and octave doublings
    function compose(p, start) {
      const out = [], u = p.u, pcs = new Set();
      ['A', 'B'].forEach(s => p[s] && parse(p[s]).forEach(m => m.n != null && pcs.add(m.n % 12)));
      const upper = n => { for (let k = 1; k < 4; k++) if (pcs.has((n + k) % 12)) return n + k; return n + 2; };
      let t = start;
      [...p.form].forEach((sec, i) => {
        const mel = parse(p[sec]), bass = (p['bass' + sec] || '').split(/\s+/).filter(Boolean).map(midi);
        const again = p.form.slice(0, i).includes(sec), total = mel.reduce((a, m) => a + m.d, 0);
        for (let b = 0; b * p.bar < total; b++) {
          const bt = t + b * p.bar * u;
          if (bass[b] != null) { out.push([bt, 'b', bass[b], 0.26, 1.6]); out.push([bt + p.bar / 2 * u, 'b', bass[b] + 7, 0.14, 1.2]); }
          if (p.drum) [...p.drum].forEach((ch, k) => ch !== '.' && out.push([bt + k * u, ch === 'X' ? 'D' : 'd']));
        }
        let at = 0;
        mel.forEach(m => {
          if (m.n != null) {
            const nt = t + at * u + (at ? jit(0.012) : 0), vol = (at % p.bar === 0 ? 0.34 : 0.27) + jit(0.03), ring = Math.min(1.2, Math.max(0.3, m.d * u * 1.8));
            if (again && m.d >= 2 && Math.random() < 0.3) { out.push([nt, 'm', upper(m.n), vol * 0.6, 0.15]); out.push([nt + Math.min(0.08, u / 3), 'm', m.n, vol, ring]); }
            else out.push([nt, 'm', m.n, vol, ring]);
            if (again && m.d >= 3 && Math.random() < 0.35) out.push([nt + 0.02, 'm', m.n - 12, vol * 0.45, ring]);
          }
          at += m.d;
        });
        t += total * u;
      });
      out.sort((a, b) => a[0] - b[0]);
      return { out, stop: t };
    }
    function fire(c, e) {
      if (e[0] < c.currentTime) return;
      if (e[1] === 'm') note(c, e[0], e[2], e[3], e[4], 1.2, 2800);
      else if (e[1] === 'b') note(c, e[0], e[2], e[3], e[4], 1.8, 1200);
      else drum(c, e[0], e[1] === 'D');
    }
    function next() {
      const c = ac, L = V.LUTE || [];
      if (!c || !L.length) return;
      if (!order.length) { order = L.map((_, i) => i).sort(() => Math.random() - 0.5); if (order[0] === last && order.length > 1) order.push(order.shift()); }
      const k = order.shift(), p = L[k], start = c.currentTime + 0.4, r = compose(p, start);
      last = k; events = r.out; pos = 0; end = r.stop;
      drones = p.drone ? drone(c, start, end + 1.5, midi(p.drone)) : [];
    }
    function tick() {
      const c = ac;
      if (!c || !bus) return;
      const horizon = c.currentTime + 0.6;
      while (pos < events.length && events[pos][0] < horizon) fire(c, events[pos++]);
      if (pos >= events.length && c.currentTime > end + 3) next();
    }
    const level = () => { if (bus && ac) bus.master.gain.setTargetAtTime(timer ? volume() * LEVEL : 0, ac.currentTime, 0.4); };
    function start() {
      if (timer) return;
      const c = ctx();
      if (!c) return;
      if (!bus) bus = makeBus(c);
      timer = setInterval(tick, 120);
      level(); next(); tick();
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null; level();
      drones.forEach(o => { try { o.stop(ac.currentTime + 1.5); } catch (e) {} });
      drones = []; events = []; pos = 0;
    }
    return { start, stop, level, on: () => !!timer };
  })();

  // wax seal pressed: low thump + soft crackle
  function seal() {
    const c = sfxOn() && ctx();
    if (!c) return;
    const t = c.currentTime, o = c.createOscillator(), g = out(c, 0.0001);
    o.type = 'sine'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.18);
    o.connect(g); g.gain.exponentialRampToValueAtTime(0.5, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.start(t); o.stop(t + 0.3);
    const n = noise(c, 0.12), bp = c.createBiquadFilter(), g2 = out(c, 0.0001);
    bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 0.8;
    n.connect(bp); bp.connect(g2); g2.gain.exponentialRampToValueAtTime(0.12, t + 0.01); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    n.start(t);
  }

  // small chapel bell: inharmonic partials with long decay
  function bell(vol = 0.07) {
    const c = sfxOn() && ctx();
    if (!c) return;
    const t = c.currentTime, f = 784;
    [[1, 1], [2.76, 0.5], [5.4, 0.25], [8.93, 0.12]].forEach(([m, a]) => {
      const o = c.createOscillator(), g = out(c, 0.0001);
      o.type = 'sine'; o.frequency.value = f * m; o.connect(g);
      g.gain.exponentialRampToValueAtTime(vol * a, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6 / m + 0.2);
      o.start(t); o.stop(t + 2);
    });
  }

  // parchment page turn: filtered noise swish
  function rustle() {
    const c = sfxOn() && ctx();
    if (!c) return;
    const t = c.currentTime, n = noise(c, 0.35), bp = c.createBiquadFilter(), g = out(c, 0.0001);
    bp.type = 'bandpass'; bp.frequency.setValueAtTime(1800, t); bp.frequency.linearRampToValueAtTime(4200, t + 0.3); bp.Q.value = 0.6;
    n.connect(bp); bp.connect(g);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.08); g.gain.exponentialRampToValueAtTime(0.001, t + 0.33);
    n.start(t);
  }

  const setSfx = on => set('valeria:sfx', on ? '1' : '0');

  // first tap unlocks audio (autoplay rules); pause music while the page is hidden
  function init() {
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      ctx();
      play();
    };
    document.addEventListener('pointerdown', unlock, { capture: true });
    document.addEventListener('keydown', unlock, { capture: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (audio) audio.pause(); Lute.stop(); } else play();
    });
    // every button: a lute pluck (sending plays the seal instead, page turns rustle)
    document.addEventListener('click', e => {
      const b = e.target.closest('button, label.btn, [data-act], [data-go]');
      if (!b || b.disabled) return;
      const act = b.dataset.act;
      if (act === 'send' || act === 'note' || act === 'lab-snd') return;
      if (act === 'lib-page') { rustle(); return; }
      pluck();
    }, true);
  }

  return { init, pluck, seal, bell, rustle, setMusic, setVolume, setSfx, musicOn, musicMode, sfxOn, volume, playing };
})();
