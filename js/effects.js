/*
 * Valeria - visual effects
 * Message effect ids are Carmen-compatible (message.effect):
 *   bubble: shake, slam, loud, gentle, glow, rainbow (illuminated ink), ink (invisible lemon ink, tap to reveal)
 *   screen: hearts (rose petals), confetti (flowers), fireworks (gold sparks), rain, fire (embers) + Valeria: fleur, snow
 * FX.play(id) runs a screen effect once; bubble effects are CSS classes "eff-<id>" (css/style.css).
 * FX.ambient() starts the drifting dust / embers layer (#ambient).
 */
window.Valeria = window.Valeria || {};

Valeria.FX = (() => {
  const BUBBLE = ['shake', 'slam', 'loud', 'gentle', 'glow', 'rainbow', 'ink'];
  const SCREEN = {
    hearts: { e: ['🌹', '🥀', '🌸', '💗'], mode: 'fall', n: 26 },
    confetti: { e: ['🌼', '🌸', '🎀', '🌷'], mode: 'fall', n: 32 },
    fireworks: { e: ['✨', '⭐', '💫'], mode: 'burst', n: 3 },
    rain: { e: ['💧'], mode: 'rain', n: 55 },
    fire: { e: ['🔥', '✨', '🔸'], mode: 'rise', n: 30 },
    fleur: { e: ['⚜️'], mode: 'fall', n: 22 },
    snow: { e: ['❄️', '❅', '•'], mode: 'fall', n: 34 }
  };
  const ICON = {
    shake: '〰️', slam: '🛡️', loud: '📯', gentle: '🤫', glow: '🕯️', rainbow: '🎨', ink: '🍋',
    hearts: '🌹', confetti: '🌼', fireworks: '🎆', rain: '🌧️', fire: '🔥', fleur: '⚜️', snow: '❄️'
  };
  const LIST = [...BUBBLE, ...Object.keys(SCREEN)];
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);

  function play(id) {
    const s = SCREEN[id];
    if (!s || calm()) return;
    const layer = document.createElement('div');
    layer.className = 'fx-layer fx-' + s.mode;
    let html = '';
    if (s.mode === 'burst') {
      for (let b = 0; b < s.n; b++) {
        const x = rnd(20, 80), y = rnd(20, 55), d = b * 0.35;
        for (let i = 0; i < 18; i++) {
          const a = (i / 18) * Math.PI * 2, r = rnd(70, 140);
          html += `<span style="left:${x}%;top:${y}%;--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r).toFixed(0)}px;animation-delay:${d}s;font-size:${rnd(12, 22).toFixed(0)}px">${s.e[i % s.e.length]}</span>`;
        }
      }
    } else {
      for (let i = 0; i < s.n; i++) {
        html += `<span style="left:${rnd(0, 100).toFixed(1)}%;animation-delay:${rnd(0, s.mode === 'rain' ? 1.2 : 1.8).toFixed(2)}s;animation-duration:${rnd(s.mode === 'rain' ? 0.7 : 2.4, s.mode === 'rain' ? 1.2 : 4).toFixed(2)}s;--drift:${rnd(-60, 60).toFixed(0)}px;font-size:${rnd(14, 28).toFixed(0)}px">${s.e[i % s.e.length]}</span>`;
      }
    }
    layer.innerHTML = html;
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 6000);
  }

  function ambient() {
    const el = document.getElementById('ambient');
    if (!el || el.childElementCount || calm()) return;
    let html = '';
    for (let i = 0; i < 18; i++) {
      html += `<i style="left:${rnd(0, 100).toFixed(1)}%;animation-delay:-${rnd(0, 20).toFixed(1)}s;animation-duration:${rnd(14, 26).toFixed(1)}s;--drift:${rnd(-40, 40).toFixed(0)}px;--s:${rnd(2, 5).toFixed(1)}px"></i>`;
    }
    el.innerHTML = html;
  }

  // wax seal pressed over an element (send button)
  function seal(target) {
    if (!target || calm()) return;
    const r = target.getBoundingClientRect(), s = document.createElement('div');
    s.className = 'seal-stamp';
    s.textContent = 'V';
    s.style.left = (r.left + r.width / 2) + 'px';
    s.style.top = (r.top + r.height / 2) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }

  return { BUBBLE, SCREEN, LIST, ICON, play, ambient, seal, isScreen: id => !!SCREEN[id] };
})();
