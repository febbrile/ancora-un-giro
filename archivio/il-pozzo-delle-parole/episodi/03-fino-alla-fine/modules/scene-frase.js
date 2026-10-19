const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.8 · La frase intera: «Al parco Emma corre felice.» e Emma che corre sul prato con Corre e Felice.
kit.scene('frase', {
  init(kit) {
    const P = window.PZ;
    let alberi = '';
    for (let k = 0; k < 7; k++) alberi += '<g transform="translate(' + (120 + k * 300) + ' 640)"><rect x="-14" y="0" width="28" height="140" fill="#5A3E2E"/><circle cx="0" cy="-30" r="90" fill="' + (k % 2 ? '#2E7A45' : '#3B8F52') + '"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="fr-A"><rect width="1920" height="1080" fill="#F3EADB"/><rect x="0" y="820" width="1920" height="260" fill="#A9744F"/>' +
      '<rect x="280" y="140" width="1360" height="640" rx="14" fill="#E2D6BF"/><rect x="290" y="130" width="1340" height="640" rx="10" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' +
      '<path d="M340 290 L1580 290 M340 420 L1580 420 M340 550 L1580 550 M340 680 L1580 680" stroke="#E8DFCB" stroke-width="2"/>' +
      '<text x="350" y="250" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#2E2A26">Esperimento 2, fino alla Fine</text>' +
      '<text class="fr-frase" x="350" y="400" font-family="Fredoka, sans-serif" font-size="86" fill="#2E2A26">Al parco Emma corre felice.</text></g>' +
      '<g class="fr-B"><defs><linearGradient id="fr-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A7FB0"/><stop offset="1" stop-color="#BFD7FF"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#fr-cielo)"/><circle cx="1500" cy="180" r="70" fill="#FFE9A8"/>' +
      '<g class="fr-alberi">' + alberi + '</g><path d="M0 780 C500 760 1400 790 1920 770 L1920 1080 L0 1080 Z" fill="#6FB66A"/>' +
      '<g class="fr-corre"><g transform="scale(1.1)">' + P.viaggiatore('Corre') + '</g></g>' +
      '<g class="fr-emma"><g transform="scale(1.25)">' + P.viaggiatore('Emma', P.VESTITO.parco[3]) + '</g></g>' +
      '<g class="fr-felice"><g transform="scale(1.0)">' + P.viaggiatore('Felice') + '</g></g></g></svg>' +
      P.sott('NARRATORE', 'Una parola alla volta, un viaggio alla volta. Così è nata una frase intera.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.A = q('.fr-A'); this.B = q('.fr-B'); this.frase = q('.fr-frase'); this.alberi = q('.fr-alberi');
    this.corre = q('.fr-corre'); this.emma = q('.fr-emma'); this.felice = q('.fr-felice');
    this.sub = window.PZ.subs(kit, [[0.4, 7.4]]);
  },
  render(t) {
    const ab = eio(seg(t, 8.0, 9.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    this.frase.setAttribute('opacity', eo(seg(t, 0.6, 1.6)).toFixed(2));
    this.alberi.setAttribute('transform', 'translate(' + (-((t * 120) % 300)).toFixed(1) + ' 0)');
    const run = k => Math.abs(Math.sin(t * 7 + k));
    this.emma.setAttribute('transform', 'translate(' + (960 + 30 * Math.sin(t * 0.7)).toFixed(1) + ' ' + (820 - 24 * run(0)).toFixed(1) + ') rotate(' + (5 - 3 * run(0)).toFixed(1) + ')');
    this.corre.setAttribute('transform', 'translate(' + (720 + 20 * Math.sin(t * 0.9)).toFixed(1) + ' ' + (830 - 20 * run(1)).toFixed(1) + ')');
    this.felice.setAttribute('transform', 'translate(' + (1220 + 20 * Math.sin(t * 0.8)).toFixed(1) + ' ' + (700 - 30 * run(2)).toFixed(1) + ') rotate(' + ((t * 40) % 360).toFixed(0) + ' 0 -60)');
    this.sub(t);
  },
});
