const { seg, eo, eio, eob, lerp } = kit;
const PER_BARRE = [['Bovary', 0.72, '#FE717F'], ['e', 0.49, '#FB9494'], ['scivolo', 0.32, '#B8F08F'], ['conchiglie', 0.32, '#B57FF3']];
kit.scene('periscopio', {
  init(kit) {
    const P = window.PZ;
    let barre = '';
    PER_BARRE.forEach(([w, v, c], i) => {
      const y = 290 + i * 64;
      barre += '<text x="1160" y="' + (y + 24) + '" font-family="JetBrains Mono, monospace" font-size="26" fill="#9BE7C4">' + w + '</text>' +
        '<rect class="per-barra" x="1350" y="' + y + '" width="' + (v * 520).toFixed(0) + '" height="32" rx="6" fill="' + c + '"/>' +
        '<text class="per-val" x="' + (1362 + v * 520).toFixed(0) + '" y="' + (y + 24) + '" font-family="JetBrains Mono, monospace" font-size="22" fill="#E6FFF4">' + v.toFixed(2) + '</text>';
    });
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><clipPath id="per-lente"><circle cx="760" cy="380" r="220"/></clipPath><linearGradient id="per-buio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151A36"/><stop offset="1" stop-color="#2C2A57"/></linearGradient></defs>' +
      '<rect y="820" width="1920" height="260" fill="#C9A27A"/><path d="M0 820 L1920 820" stroke="#A9744F" stroke-width="4"/>' +
      '<g class="per-ada" style="transform-origin:330px 820px"><g transform="translate(150 250) scale(1.8)">' + P.ada('periscopio') + '</g></g>' +
      '<path d="M440 330 C520 330 520 380 540 380" stroke="#C9973F" stroke-width="6" stroke-dasharray="4 10" stroke-linecap="round" fill="none" opacity=".7"/>' +
      '<g clip-path="url(#per-lente)"><g class="per-vista">' +
      '<rect x="520" y="140" width="480" height="480" fill="url(#per-buio)"/><rect x="520" y="520" width="480" height="100" fill="#1B2244"/><ellipse cx="770" cy="560" rx="220" ry="30" fill="#6E3347"/>' +
      '<g transform="translate(660 340) rotate(-3) scale(.6)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/><path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/></g>' +
      '<g transform="translate(830 400) scale(.5)">' + P.emma('#FE8787', { dx: -4 }) + '</g></g>' +
      '<circle cx="760" cy="380" r="220" fill="none" stroke="#000000" stroke-opacity=".25" stroke-width="60"/></g>' +
      '<circle cx="760" cy="380" r="224" fill="none" stroke="#C9973F" stroke-width="14"/>' +
      '<rect x="1120" y="130" width="760" height="560" rx="20" fill="#0F2A2A" stroke="#C9973F" stroke-width="8"/>' +
      '<text x="1160" y="184" font-family="JetBrains Mono, monospace" font-size="20" letter-spacing="1.5" fill="#5FB89A">PIANO 0 · LOGIT LENS</text>' +
      '<text x="1160" y="236" font-family="JetBrains Mono, monospace" font-size="24" fill="#9BE7C4">se il pozzo finisse qui, dopo verrebbe:</text>' +
      barre +
      '<text class="per-frase" x="1160" y="600" font-family="JetBrains Mono, monospace" font-size="30" fill="#E6FFF4"></text>' +
      '<text class="per-nota" x="1160" y="650" font-family="JetBrains Mono, monospace" font-size="21" fill="#5FB89A">il contesto non c’è ancora: parla solo «Emma»</text>' +
      '</svg>' +
      P.sott('ADA', 'Guardo col periscopio. Se il pozzo finisse qui, cosa direbbe? «Al mare Emma… Bovary». Ah, come il romanzo!') +
      P.sott('ADA', 'No: Emma non ha ancora guardato i suoi compagni. Per ora conosce solo il proprio nome.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.barre = [...kit.stage.querySelectorAll('.per-barra')];
    this.val = [...kit.stage.querySelectorAll('.per-val')];
    this.frase = q('.per-frase'); this.nota = q('.per-nota');
    this.vista = q('.per-vista'); this.ada = q('.per-ada').style;
    this.typed = kit.typist('Al mare Emma… Bovary?', 3.6, 14);
    this.sub = window.PZ.subs(kit, [[0.5, 6.1], [6.4, 11.7]]);
  },
  render(t) {
    this.barre.forEach((b, i) => {
      const p = eo(seg(t, 1.4 + i * 0.25, 2.2 + i * 0.25));
      b.setAttribute('transform', 'translate(1350 0) scale(' + p.toFixed(3) + ' 1) translate(-1350 0)');
      this.val[i].setAttribute('opacity', eo(seg(t, 2.0 + i * 0.25, 2.4 + i * 0.25)).toFixed(2));
    });
    this.frase.textContent = this.typed.at(t);
    this.nota.setAttribute('opacity', eo(seg(t, 7.0, 7.6)).toFixed(2));
    this.vista.setAttribute('transform', 'translate(' + (14 * Math.sin(t * 0.7)).toFixed(1) + ' ' + (6 * Math.sin(t * 0.9)).toFixed(1) + ')');
    this.ada.transform = 'scale(' + (1 + 0.01 * Math.sin(t * 2 * Math.PI / 3)) + ')';
    this.sub(t);
  },
});
