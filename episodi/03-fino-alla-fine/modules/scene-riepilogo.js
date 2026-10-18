const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.10 · Riepilogo: solo il monitor, una riga alla volta. Nessuna voce.
const RI_RIGHE = [
  ['1. Tokenizer: testo → numeri', '(fuori)'],
  ['2. Modello: numeri → secchio', '(deterministico)'],
  ['   carte → sguardi + ingranaggi, x = x + Δ → ultima riga · U → softmax', ''],
  ['3. Pesca con il termostato', '(fuori)'],
  ['4. La parola torna in fila → di nuovo al 2', ''],
  ['5. Stop: Fine (EOS) oppure la forbice', ''],
];
kit.scene('riepilogo', {
  init(kit) {
    let righe = '';
    RI_RIGHE.forEach(([a, b], i) => {
      righe += '<g class="ri-r"><text x="170" y="' + (300 + i * 100) + '" font-family="JetBrains Mono, monospace" font-size="' + (i === 2 ? 26 : 38) + '" fill="' + (i === 2 ? '#9BE7C4' : '#E6FFF4') + '">' + a + '</text>' +
        '<text x="1760" y="' + (300 + i * 100) + '" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="30" fill="#5FB89A">' + b + '</text></g>';
    });
    kit.stage.append(kit.h('<div class="ground" style="background:#0F2A2A"><svg class="art" viewBox="0 0 1920 1080">' +
      '<rect x="60" y="60" width="1800" height="960" rx="30" fill="none" stroke="#C9973F" stroke-width="12"/>' +
      '<text x="170" y="170" font-family="JetBrains Mono, monospace" font-size="26" letter-spacing="2" fill="#5FB89A">MONITOR DI ADA · IL VIAGGIO DI OGNI PAROLA</text>' + righe + '</svg></div>'));
    this.r = [...kit.stage.querySelectorAll('.ri-r')];
  },
  render(t) {
    this.r.forEach((g, i) => { const p = seg(t, 1.0 + i * 3.0, 1.6 + i * 3.0); g.setAttribute('opacity', eo(p).toFixed(2)); g.setAttribute('transform', 'translate(' + (20 * (1 - eo(p))).toFixed(1) + ' 0)'); });
  },
});
