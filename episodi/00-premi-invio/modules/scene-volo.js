const { seg, eo, ei, eio, lerp } = kit;
// Il messaggio diventa una striscia di carta, esce dalla finestra e vola sopra i tetti fino alle luci del luna park.
// Si apre con la stessa inquadratura con cui finisce «invio».
const VOLO_FUORI = [4.1, 4.7];
// Il punto di una curva di Bézier cubica.
function voloBez(p, u) {
  const a = 1 - u;
  return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]);
}
kit.scene('volo', {
  init(kit) {
    const G = window.G, C = G.C, r = G.rng(9);
    let stelle = '';
    for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
    // Il luna park lontano, sull'orizzonte.
    let raggi = '', bulbi = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; raggi += '<line x1="0" y1="0" x2="' + (80 * Math.cos(a)).toFixed(1) + '" y2="' + (80 * Math.sin(a)).toFixed(1) + '"/>'; bulbi += '<circle cx="' + (80 * Math.cos(a)).toFixed(1) + '" cy="' + (80 * Math.sin(a)).toFixed(1) + '" r="4.5" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>'; }
    const lunapark = '<circle cx="1700" cy="640" r="300" fill="#FF9E5E" opacity=".28" filter="url(#g-velo)"/>' +
      '<g transform="translate(1720 560)"><g class="volo-ruota"><g stroke="#4A4A86" stroke-width="3">' + raggi + '</g><circle r="80" fill="none" stroke="#5A5AA0" stroke-width="4"/>' + bulbi + '</g></g>' +
      '<path d="M1700 640 L1680 700 M1740 640 L1760 700" stroke="#3B3A6E" stroke-width="5"/>' +
      '<path d="M1560 700 L1600 640 L1640 700 Z" fill="' + C.rossoScuro + '"/><path d="M1790 700 L1830 650 L1870 700 Z" fill="' + C.rossoScuro + '"/>' +
      '<path d="M1520 660 Q1640 690 1760 640" stroke="' + C.luce + '" stroke-width="2" fill="none" stroke-dasharray="2 10" stroke-linecap="round"/>';
    // Due file di tetti, con le finestre accese.
    let finestre = '';
    for (let i = 0; i < 40; i++) { const x = 40 + r() * 1840, y = 790 + r() * 240; if (r() < 0.55) finestre += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.5 + r() * 0.4).toFixed(2) + '"/>'; }
    const tettiDietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L2100 700 L2100 1080 Z" fill="#171A44"/>';
    const tettiDavanti = '<path d="M-100 1080 L-100 800 L60 800 L160 730 L260 800 L420 800 L420 770 L520 770 L520 820 L700 820 L790 760 L880 820 L1080 820 L1080 790 L1180 790 L1180 830 L1360 830 L1450 770 L1540 830 L1700 830 L1700 800 L2100 800 L2100 1080 Z" fill="#0F1233"/>' +
      '<rect x="230" y="700" width="26" height="60" fill="#0F1233"/><rect x="1110" y="752" width="22" height="50" fill="#0F1233"/><path d="M1460 770 L1460 720 M1446 732 L1474 732" stroke="#0F1233" stroke-width="5"/>' +
      '<rect x="146" y="770" width="40" height="50" rx="4" fill="' + C.luce + '"/>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      '<g class="volo-esterno" opacity="0"><g class="volo-pan"><rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
      '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
      lunapark + tettiDietro + finestre + tettiDavanti + '</g></g>' +
      '<g class="volo-dentro"><g class="volo-cam">' + G.salotto(G.telefono({}) +
        '<rect x="66" y="458" width="270" height="84" rx="36" fill="' + C.luce + '" opacity=".72" filter="url(#g-glow)"/>' +
        '<g class="volo-bolla">' + G.bolle(['Al mare Emma']) + '</g>') + '</g></g>' +
      '<g class="volo-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>' +
      '</svg>' + G.sottotitolo('NARRATORE', 'In quell’istante, la frase parte per un viaggio.') + '</div>', 'volo')));
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.volo-cam'); this.bolla = q('.volo-bolla'); this.str = q('.volo-striscia');
    this.dentro = q('.volo-dentro'); this.esterno = q('.volo-esterno'); this.pan = q('.volo-pan'); this.ruota = q('.volo-ruota');
    this.G = G;
    this.sub = G.subs(kit, [[2.2, 7.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('00', 'volo', t);
    const G = this.G, z = 1.16, [bx, by] = G.SALOTTO.bolla;
    this.cam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')');
    // La bolla si stacca e diventa la striscia.
    const stacca = eio(seg(t, 0.8, 1.8));
    this.bolla.setAttribute('opacity', (1 - stacca).toFixed(3));
    this.bolla.setAttribute('transform', 'translate(0 ' + (-30 * stacca).toFixed(1) + ')');
    // Dove sta la striscia: prima nel salotto (verso la finestra), poi fuori (sopra i tetti).
    const fin = [bx + (G.SALOTTO.finestra[0] - bx) * z, by + (G.SALOTTO.finestra[1] - by) * z];
    let x, y, s, rot, op;
    if (t < VOLO_FUORI[0] + 0.5) {
      const u = eio(seg(t, 2.0, 4.2));
      const p = voloBez([[bx, by - 30], [bx + 60, by - 300], [fin[0] - 300, fin[1] - 120], fin], u);
      x = p[0]; y = p[1];
      s = lerp(0.7, 1.15, eo(seg(t, 0.8, 1.9))) * lerp(1, 0.3, ei(seg(t, 2.6, 4.2)));
      rot = -6 + 10 * Math.sin(t * 4) * seg(t, 1.6, 2.2);
      op = Math.min(seg(t, 0.9, 1.4), 1 - seg(t, 4.0, 4.5));
    } else {
      const u = seg(t, 4.6, 13.2);
      const p = voloBez([[220, 760], [600, 380], [1150, 260], [1720, 600]], eio(u));
      x = p[0]; y = p[1] + 26 * Math.sin(t * 2.4);
      s = lerp(0.85, 0.16, eio(u));
      rot = lerp(-24, 20, u) + 9 * Math.sin(t * 3.1);
      op = Math.min(seg(t, 4.5, 5.0), 1 - seg(t, 12.6, 13.4));
    }
    const sk = 10 * Math.sin(t * 6.3);
    this.str.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(2) + ') skewX(' + sk.toFixed(2) + ') scale(' + s.toFixed(3) + ')');
    this.str.setAttribute('opacity', op.toFixed(3));
    // Dal salotto all'esterno.
    const fuori = eio(seg(t, VOLO_FUORI[0], VOLO_FUORI[1]));
    this.dentro.setAttribute('opacity', (1 - fuori).toFixed(3));
    this.esterno.setAttribute('opacity', fuori.toFixed(3));
    this.pan.setAttribute('transform', 'translate(' + (-140 * eio(seg(t, 4.2, 14))).toFixed(1) + ' 0)');
    this.ruota.setAttribute('transform', 'rotate(' + (t * 6).toFixed(1) + ')');
    this.sub(t);
  },
});
