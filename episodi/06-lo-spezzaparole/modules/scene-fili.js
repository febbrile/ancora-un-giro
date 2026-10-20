const { seg, eo, ei, eio, lerp } = kit;
// Intanto, dentro la montagna, nel buio. Tra i passeggeri si accendono i fili di luce: tutti guardano avanti, e ognuno
// ha il suo anello di luce; Al, davanti, ha solo il suo. I fili più forti sono quelli tra i tre pezzi: da «pi» a «Zam»,
// e soprattutto da «rù» a «pi» e a «Zam»; da «rù» parte anche un filo più sottile verso Mare, quello verso Al si vede
// appena. Lungo i fili di «rù» scorrono i colori (il corallo, il giallo, un po' d'azzurro) e il suo vestito passa dal
// grigio argento a un giallo oro. Tutti i fili e i colori vengono dal modellino.
// Si apre dal buio; finisce sul treno intero (lo riprende «finestre»).
const FL_CAM = [
  { t: 0, cx: 1190, cy: 560, z: 0.9 },
  { t: 7.0, cx: 1190, cy: 560, z: 0.9 },
  { t: 8.8, cx: 1420, cy: 520, z: 1.2 },
  { t: 17.8, cx: 1420, cy: 520, z: 1.2 },
  { t: 19.8, cx: 1190, cy: 560, z: 0.9 },
];
const FL_ACCENDE = 2.4, FL_SCORRE = [8.6, 19.0], FL_COLORE = [12.8, 17.4], FL_SPEGNE = [18.2, 20.0];
kit.scene('fili', {
  init(kit) {
    const G = window.G, P = G.MOD.zampiru.passeggeri;
    const nomi = G.MOD.zampiru.pezzi;
    this.P = P; this.nomi = nomi;
    this.chi = [['al', P.Al.biglietto, ''], ['mare', P.mare.biglietto, ''], ['pezzo', P.Zam.biglietto, 'd'], ['pezzo', P.pi.biglietto, 'sd'], ['pezzo', P['rù'].biglietto, 's']];
    const fondo = '<rect x="-700" y="-500" width="3800" height="2080" fill="#07060F"/><rect x="-700" y="0" width="3800" height="1080" fill="url(#g-interno)"/>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<g class="fl-cam">' + fondo + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1] }))) + '</g>' +
      '<rect class="fl-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/></svg>' +
      G.sottotitolo('NARRATORE', 'Intanto, nel buio, si accendono i fili di luce. I più forti legano i tre pezzi di Zampirù.') +
      G.sottotitolo('NARRATORE', 'E l’ultimo pezzo, che era grigio, si fa giallo come il primo.') +
      '</div>', 'fili')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fl-cam'); this.nero = q('.fl-nero');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    // I pezzi hanno i bordi strappati.
    this.chi.forEach((c, i) => { if (c[2]) G.cambiaPasseggero(this.vag[i], c[0], c[1], { strappo: c[2] }); });
    // I fili: chi guarda (i) verso chi (j), con il peso del modellino. Si guarda avanti: j ≤ i.
    const tipi = this.chi.map(c => c[0]);
    let fili = '', punti = '';
    this.fili = [];
    nomi.forEach((ni, i) => nomi.slice(0, i + 1).forEach((nj, j) => {
      const w = P[ni].fili[nj] || 0;
      let d;
      if (i === j) d = G.anello(i, tipi[i]);
      else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 70 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w, k = this.fili.length;
      // Lungo i fili di «rù» scorrono i colori di chi gli siede davanti.
      const quanti = i === 4 && i !== j ? Math.round(w * 9) : 0;
      fili += '<path class="fl-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 18 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
        '<path class="fl-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 7 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
      for (let p = 0; p < quanti; p++) punti += '<circle class="fl-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1] + '" opacity="0"/>';
      this.fili.push({ i, j, w, quanti });
    }));
    const strato = q('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fl-filo')]; this.coreEl = [...strato.querySelectorAll('.fl-core')];
    this.punti = [...strato.querySelectorAll('.fl-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[2.0, 9.8], [12.6, 17.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'fili', t);
    const G = this.G, P = this.P;
    this.cam.setAttribute('transform', G.camChiavi(FL_CAM, t));
    G.scorriInterno(kit, 300 * t);
    this.nero.setAttribute('opacity', (1 - eio(seg(t, 0, 2.2))).toFixed(3));
    this.vag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]));
    // Il vestito di «rù» va dal grigio argento del biglietto al giallo oro che gli portano i fili.
    const p = Math.round(eio(seg(t, FL_COLORE[0], FL_COLORE[1])) * 16) / 16;
    G.cambiaPasseggero(this.vag[4], 'pezzo', G.mix(P['rù'].biglietto, P['rù'].dopo_fili, p), { strappo: 's' });
    // I fili si disegnano da chi guarda, restano, poi si spengono piano.
    const spento = 1 - 0.75 * eio(seg(t, FL_SPEGNE[0], FL_SPEGNE[1]));
    // Da vicino risaltano i fili tra i tre pezzi; gli altri si fanno da parte.
    const fuoco = eio(seg(t, 7.0, 8.4)) * (1 - eio(seg(t, 17.8, 19.0)));
    this.fili.forEach((f, k) => {
      const t0 = FL_ACCENDE + 0.6 * f.i + 0.2 * f.j;
      const u = eo(seg(t, t0, t0 + 1.4)), L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => {
        el.setAttribute('stroke-dasharray', L.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      });
      const pezzi = f.i >= 2 && f.j >= 2 && f.i !== f.j;
      const brilla = (0.15 + 0.85 * f.w) * spento * (pezzi ? 1 + 0.6 * fuoco : 1 - 0.5 * fuoco) * (1 + 0.08 * Math.sin(t * 3 + k));
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, 1.3 * brilla) : 0).toFixed(3));
    });
    // I colori scorrono lungo i fili di «rù», da chi gli siede davanti fino a lui.
    const scorre = seg(t, FL_SCORRE[0], FL_SCORRE[0] + 1) * (1 - seg(t, FL_SCORRE[1] - 1, FL_SCORRE[1]));
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const u = ((t * 0.3 + pp / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.sub(t);
  },
});
