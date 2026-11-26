/*
 * Valeria - 🎵 background music + medieval interface sounds (no sound files: WebAudio synthesis)
 * Music: tracks from Valeria.MUSIC (js/data/music.js, built from Music/ by portreleri-guncelle.bat), played in order and looped.
 *   Browsers block autoplay, so it starts on the first tap. Paused while the page is hidden.
 * Sounds: pluck (lute string, every button), seal (wax seal thump, sending), bell (a letter arrives), rustle (page turn).
 * Settings in localStorage: valeria:music ('0' = off), valeria:vol (0-1, default .35), valeria:sfx ('0' = off).
 */
window.Valeria = window.Valeria || {};

Valeria.Sound = (() => {
  const V = Valeria;
  const get = (k, d) => { const v = localStorage.getItem(k); return v == null ? d : v; };
  const set = (k, v) => { try { localStorage.setItem(k, String(v)); } catch (e) {} };

  /* ---------- music ---------- */
  let audio = null, track = 0, unlocked = false;
  const musicOn = () => get('valeria:music', '1') !== '0';
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
  function play() { if (!musicOn() || !unlocked) return; const a = load(); if (a) { a.volume = 0; a.play().then(() => fade(volume())).catch(() => {}); } }
  function fade(to) {
    if (!audio) return;
    const from = audio.volume, t0 = performance.now();
    const step = now => { const k = Math.min(1, (now - t0) / 1200); audio.volume = from + (to - from) * k; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function setMusic(on) { set('valeria:music', on ? '1' : '0'); if (on) play(); else if (audio) audio.pause(); }
  function setVolume(v) { set('valeria:vol', v); if (audio) audio.volume = volume(); }
  const playing = () => !!(audio && !audio.paused);

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
  function pluckBuf(c, freq) {
    const key = Math.round(freq);
    if (cache.has(key)) return cache.get(key);
    const sr = c.sampleRate, N = Math.round(sr / freq), len = Math.floor(sr * 0.9);
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
      if (!audio) return;
      if (document.hidden) audio.pause(); else if (musicOn() && unlocked) audio.play().catch(() => {});
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

  return { init, pluck, seal, bell, rustle, setMusic, setVolume, setSfx, musicOn, sfxOn, volume, playing };
})();
