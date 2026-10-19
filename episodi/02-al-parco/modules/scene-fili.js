const { seg, eo, ei, eio, lerp } = kit;
// Dentro la montagna passano i due treni, uno dopo l'altro. Nel primo, come sempre, il filo più forte va da Emma a Mare
// e porta l'azzurro. Il primo esce dall'inquadratura; arriva il secondo: gli stessi fili, ma il più forte va a Parco
// e porta il verde. Al, davanti, ha solo il suo anello, uguale nei due treni.
// Si apre dal buio; finisce sul secondo treno intero (lo riprende «finestre»).
const FL_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 7.0, cx: 960, cy: 540, z: 1 },
  { t: 9.4, cx: 1010, cy: 560, z: 1.32 },
  { t: 13.0, cx: 1010, cy: 560, z: 1.32 },
  { t: 15.0, cx: 960, cy: 540, z: 1 },
  { t: 24.6, cx: 960, cy: 540, z: 1 },
  { t: 27.0, cx: 1010, cy: 560, z: 1.32 },
  { t: 31.0, cx: 1010, cy: 560, z: 1.32 },
  { t: 33.4, cx: 1180, cy: 580, z: 1.75 },
  { t: 35.4, cx: 1180, cy: 580, z: 1.75 },
  { t: 38.6, cx: 960, cy: 540, z: 1 },
];
// I due treni: quando si accendono i fili (Al, chi sta in mezzo, Emma), quando il vestito di Emma cambia, quando si spengono.
const FL_TRENI = [
  { accende: 2.2, colore: [6.4, 11.0], scorre: [5.0, 14.0], spegne: [13.4, 14.8] },
  { accende: 21.8, colore: [26.0, 30.6], scorre: [24.6, 36.4], spegne: [36.4, 38.6] },
];
const FL_ESCE = [15.0, 17.4], FL_ENTRA = [18.4, 21.0];
kit.scene('fili', {
  init(kit) {
    const G = window.G, C = G.C;
    const A = G.MOD.mare.passeggeri, B = G.MOD.parco.passeggeri;
    this.treni = [
      { P: A, chi: [['al', A.Al.biglietto], ['mare', A.mare.biglietto], ['emma', A.Emma.biglietto]], mezzo: 'mare' },
      { P: B, chi: [['al', B.Al.biglietto], ['parco', B.parco.biglietto], ['emma', B.Emma.biglietto]], mezzo: 'parco' },
    ];
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<g class="fl-cam">' + G.interno(this.treni[0].chi.map(c => ({ tipo: c[0], col: c[1] }))) + '</g>' +
      '<rect class="fl-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/></svg>' +
      G.sottotitolo('NARRATORE', 'Nel primo treno, come sempre, il filo più forte va da Emma a Mare, e porta l’azzurro.') +
      G.sottotitolo('NARRATORE', 'Nel secondo, lo stesso filo va a Parco. E questa volta porta il verde.') +
      '</div>', 'fili')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fl-cam'); this.nero = q('.fl-nero');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.mobili = [q('.g-int-treno'), q('.g-int-fili'), q('.g-int-fanale')];
    // I fili di ogni treno: chi guarda (i) verso chi (j), con il peso. Si guarda avanti: j ≤ i.
    let fili = '', punti = '';
    this.fili = [];
    this.treni.forEach((tr, n) => {
      const P = tr.P, tipi = tr.chi.map(c => c[0]), mz = tr.mezzo;
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P[mz].fili.Al], [1, 1, P[mz].fili[mz]], [2, 0, P.Emma.fili.Al], [2, 1, P.Emma.fili[mz]], [2, 2, P.Emma.fili.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i]);
        else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w, k = this.fili.length;
        const quanti = i === 2 && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
        fili += '<path class="fl-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
          '<path class="fl-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
        for (let p = 0; p < quanti; p++) punti += '<circle class="fl-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + tr.chi[j][1] + '" opacity="0"/>';
        this.fili.push({ n, i, j, w, quanti });
      });
    });
    const strato = q('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fl-filo')]; this.coreEl = [...strato.querySelectorAll('.fl-core')];
    this.punti = [...strato.querySelectorAll('.fl-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[2.0, 10.6], [23.0, 30.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'fili', t);
    const G = this.G;
    this.cam.setAttribute('transform', G.camChiavi(FL_CAM, t));
    G.scorriInterno(kit, 300 * t);
    this.nero.setAttribute('opacity', (1 - eio(seg(t, 0, 2.2))).toFixed(3));
    // Il primo treno esce a sinistra; dopo un attimo di buio entra il secondo, da destra.
    const n = t < (FL_ESCE[1] + FL_ENTRA[0]) / 2 ? 0 : 1, tr = this.treni[n];
    const dx = n === 0 ? -2700 * ei(seg(t, FL_ESCE[0], FL_ESCE[1])) : 2700 * (1 - eo(seg(t, FL_ENTRA[0], FL_ENTRA[1])));
    this.mobili.forEach(el => el.setAttribute('transform', 'translate(' + dx.toFixed(1) + ' 0)'));
    this.vag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]));
    // I passeggeri del treno che passa; il vestito di Emma va dal colore del biglietto a quello dopo i fili.
    const F = FL_TRENI[n];
    const p = Math.round(eio(seg(t, F.colore[0], F.colore[1])) * 16) / 16;
    G.cambiaPasseggero(this.vag[1], tr.chi[1][0], tr.chi[1][1]);
    G.cambiaPasseggero(this.vag[2], 'emma', G.mix(tr.P.Emma.biglietto, tr.P.Emma.dopo_fili, p));
    // I fili del treno che passa: si disegnano da chi guarda, restano, poi si spengono.
    this.fili.forEach((f, k) => {
      const Ff = FL_TRENI[f.n], vis = f.n === n;
      const t0 = Ff.accende + 0.7 * f.i + 0.25 * f.j;
      const u = eo(seg(t, t0, t0 + 1.4)), L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => {
        el.setAttribute('stroke-dasharray', L.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      });
      const brilla = vis ? (0.25 + 0.75 * f.w) * (1 - eio(seg(t, Ff.spegne[0], Ff.spegne[1]))) * (1 + 0.08 * Math.sin(t * 3 + k)) : 0;
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, 1.3 * brilla) : 0).toFixed(3));
    });
    // I colori scorrono lungo i fili di Emma, da chi le siede davanti fino a lei.
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], Ff = FL_TRENI[f.n], L = this.lung[k];
      const scorre = f.n === n ? seg(t, Ff.scorre[0], Ff.scorre[0] + 1) * (1 - seg(t, Ff.scorre[1] - 1, Ff.scorre[1])) : 0;
      const u = ((t * 0.32 + pp / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.sub(t);
  },
});
