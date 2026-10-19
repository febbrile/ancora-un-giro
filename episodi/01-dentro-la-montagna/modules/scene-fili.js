const { seg, eo, eio, lerp } = kit;
// Dentro la montagna: tra i passeggeri si accendono fili di luce, sempre verso chi sta davanti (e verso sé).
// Il filo più forte è quello tra Emma e Mare: lungo i fili scorrono i colori e il vestito di Emma cambia un poco.
// Si apre come finisce «buio»; finisce sul treno intero (lo riprende «scambi»).
const FI_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 12.0, cx: 960, cy: 540, z: 1 },
  { t: 15.0, cx: 1010, cy: 560, z: 1.32 },
  { t: 25.0, cx: 1010, cy: 560, z: 1.32 },
  { t: 28.0, cx: 1180, cy: 580, z: 1.75 },
  { t: 31.0, cx: 1180, cy: 580, z: 1.75 },
  { t: 34.5, cx: 960, cy: 540, z: 1 },
];
const FI_ACCENDE = { al: 2.4, mare: 3.1, emma: 4.0 };
const FI_COLORE = [18.0, 23.0];
const FI_SPEGNE = [31.5, 34.0];
kit.scene('fili', {
  init(kit) {
    const G = window.G, P = G.MOD.mare.passeggeri, C = G.C;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto]];
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<g class="fi-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1] }))) + '</g></svg>' +
      G.sottotitolo('NARRATORE', 'Nel buio si accendono dei fili di luce. Sulle montagne russe si guarda sempre avanti, e i fili vanno solo verso chi sta davanti.') +
      G.sottotitolo('NARRATORE', 'Il filo tra Emma e Mare è il più forte. Lungo i fili scorrono i colori, e il vestito di Emma prende un po’ dell’azzurro di Mare.') +
      '</div>', 'fili')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fi-cam'); this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    // I fili: chi guarda (i) verso chi (j), con il peso. Si guarda avanti: j ≤ i.
    const pesi = [
      [0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare],
      [2, 0, P.Emma.fili.Al], [2, 1, P.Emma.fili.mare], [2, 2, P.Emma.fili.Emma],
    ];
    const tipi = ['al', 'mare', 'emma'];
    let fili = '', punti = '';
    this.fili = pesi.map(([i, j, w], k) => {
      let d;
      if (i === j) d = G.anello(i, tipi[i]);
      else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w;
      const quanti = i === 2 && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
      fili += '<path class="fi-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
        '<path class="fi-filo-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
      for (let n = 0; n < quanti; n++) punti += '<circle class="fi-punto" data-k="' + k + '" data-n="' + n + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1] + '" opacity="0"/>';
      return { i, j, w, quanti };
    });
    const strato = q('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fi-filo')]; this.coreEl = [...strato.querySelectorAll('.fi-filo-core')];
    this.punti = [...strato.querySelectorAll('.fi-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[1.0, 11.8], [13.4, 24.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'fili', t);
    const G = this.G;
    this.cam.setAttribute('transform', G.camChiavi(FI_CAM, t));
    G.scorriInterno(kit, 300 * t);
    this.vag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]));
    // Il vestito di Emma: dal colore del biglietto a quello dopo i fili.
    const P = G.MOD.mare.passeggeri;
    const p = Math.round(eio(seg(t, FI_COLORE[0], FI_COLORE[1])) * 16) / 16;
    G.cambiaPasseggero(this.vag[2], 'emma', G.mix(P.Emma.biglietto, P.Emma.dopo_fili, p));
    // I fili si disegnano a partire da chi guarda; poi restano, e alla fine si spengono.
    const spegne = 1 - eio(seg(t, FI_SPEGNE[0], FI_SPEGNE[1]));
    this.fili.forEach((f, k) => {
      const t0 = f.i === 0 ? FI_ACCENDE.al : f.i === 1 ? FI_ACCENDE.mare : FI_ACCENDE.emma;
      const u = eo(seg(t, t0 + 0.25 * f.j, t0 + 0.25 * f.j + 1.4));
      const L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => {
        el.setAttribute('stroke-dasharray', L.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      });
      const brilla = (0.25 + 0.75 * f.w) * spegne * (1 + 0.08 * Math.sin(t * 3 + k));
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, brilla + 0.2) : 0).toFixed(3));
    });
    // I colori scorrono lungo i fili di Emma, da chi le siede davanti fino a lei.
    const scorre = seg(t, 15.5, 16.5) * spegne;
    this.punti.forEach(c => {
      const k = +c.dataset.k, n = +c.dataset.n, f = this.fili[k], L = this.lung[k];
      const u = ((t * 0.32 + n / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.sub(t);
  },
});
