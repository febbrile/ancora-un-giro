const { seg, eo, ei, eio, lerp } = kit;
// Il treno sale la salita, corre sul viadotto e sparisce nella montagna. Dentro, nel buio, si accendono i fili di luce,
// da ogni passeggero verso chi gli siede davanti (sottili: il modellino non dà i loro pesi). Poi dalla bandierina
// d'ottone, nell'ultimo vagone, i fili partono verso tutto il treno: il più forte attraversa tutti i vagoni e arriva in
// testa, a Mare; un altro, quasi uguale, va a Parco; uno sottile alla bandierina d'oro (pesi dal modellino). Lungo i fili
// scorrono l'azzurro di Mare e il verde di Parco, e la stoffa della bandierina si fa azzurra.
// Si apre come finisce «salgono», col treno che corre; finisce sulla bandierina azzurra, nel buio (la riprende «finestre»).
const FL_CAM = [
  { t: 0, cx: 160, cy: 760, z: 2.0 },
  { t: 1.2, cx: 200, cy: 560, z: 0.95 },
  { t: 3.6, cx: 700, cy: 470, z: 0.95 },
];
const FL_VEL = [[0, 620], [1.0, 1300]];
const FL_NERO = [3.0, 3.6, 4.0, 5.0];
const FL_DENTRO = [
  { t: 4.0, cx: 1950, cy: 560, z: 0.5 },
  { t: 8.4, cx: 1950, cy: 560, z: 0.5 },
  { t: 9.8, cx: 3380, cy: 560, z: 0.95 },
  { t: 10.8, cx: 3380, cy: 560, z: 0.95 },
  { t: 13.2, cx: 2050, cy: 470, z: 0.5 },
  { t: 21.2, cx: 2050, cy: 470, z: 0.5 },
  { t: 23.4, cx: 3400, cy: 560, z: 1.05 },
];
// I fili sottili di tutti, poi quelli della bandierina d'ottone; i colori che scorrono; la stoffa che si fa azzurra.
const FL_TUTTI = 5.0, FL_ATTENUA = [8.4, 9.4], FL_OTTONE = 10.4, FL_LAMPADINA = 15.6;
const FL_SCORRE = [13.6, 23.0], FL_COLORE = [17.6, 21.2], FL_SPEGNE = [23.6, 25.0];
kit.scene('fili', {
  init(kit) {
    const G = window.G, M = G.MONDO, S2 = G.S2, giro = G.MOD.seconda.parco.giri[0];
    this.chi = S2.treno(giro);
    const N = this.chi.length, U = N - 1, tipi = this.chi.map(c => c.tipo);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="fl-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>';
    const dentro = '<g class="fl-dentro" opacity="0">' + G.interniDefs + '<g class="fl-icam">' + G.interno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o }))) + '</g></g>' +
      '<rect class="fl-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'fili', manopola: 0, banchina: true, morto: true, davanti: dentro,
      html: G.sottotitolo('NARRATORE', 'Nel buio, la bandierina d’ottone guarda avanti, fino in testa al treno.') +
        G.sottotitolo('NARRATORE', 'Il suo filo più forte arriva a Mare, nella frase del parco. Uno quasi uguale va a Parco.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.fl-treno .g-vag');
    this.dentro = q('.fl-dentro'); this.icam = q('.fl-icam'); this.nero = q('.fl-nero');
    G.internoLungo(this.icam);
    // Il buio intorno, per quando la camera si allontana; le pareti lontane e le punte vicine si ripetono ai due lati.
    this.icam.insertAdjacentHTML('afterbegin', '<rect x="-3000" y="-1500" width="9000" height="4500" fill="#07060F"/>');
    const tre = (el, w) => { const x = el.innerHTML; el.innerHTML = '<g transform="translate(' + (-w) + ' 0)">' + x + '</g>' + x + '<g transform="translate(' + w + ' 0)">' + x + '</g>'; };
    tre(q('.fl-dentro .g-int-lontano'), 3640); tre(q('.fl-dentro .g-int-vicino'), 3600);
    this.ivag = this.m.qa('.fl-dentro .g-vag');
    this.basi = this.ivag.map(v => v.getAttribute('transform'));
    // I fili. Quelli di tutti: verso chi siede davanti e verso sé, sottili e uguali. Quelli della bandierina d'ottone
    // (l'ultimo vagone, U): i pesi del modellino, dal più debole al più forte.
    const pesi = [];
    for (let i = 0; i < U; i++) for (let j = 0; j <= i; j++) pesi.push([i, j, 1 / (i + 1), FL_TUTTI + 0.3 * i + 0.05 * j, false]);
    const fo = this.chi[U].fili;
    fo.map((w, j) => [j, w]).filter(([j, w]) => w > 0).sort((a, b) => a[1] - b[1]).forEach(([j, w], n) => pesi.push([U, j, w, FL_OTTONE + 0.7 * n, true]));
    pesi.push([U, U, 0.05, FL_OTTONE + 2.6, true]);
    let fili = '', punti = '';
    this.fili = pesi.map(([i, j, w, t0, ott], k) => {
      let d;
      if (i === j) d = G.anello(i, tipi[i]);
      else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w, quanti = ott && i !== j ? Math.max(1, Math.round(w * 10)) : 0;
      fili += '<path class="fl-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + (ott ? 14 : 6) * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
        '<path class="fl-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + (ott ? 5 : 2) * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
      for (let n = 0; n < quanti; n++) punti += '<circle class="fl-punto" data-k="' + k + '" data-n="' + n + '" r="' + (14 + 10 * w).toFixed(1) + '" fill="' + this.chi[j].biglietto + '" opacity="0"/>';
      return { i, j, w, t0, ott, quanti };
    });
    const forte = this.fili.findIndex(f => f.ott && f.j === fo.indexOf(Math.max(...fo)));
    const [ex, ey] = G.cima(fo.indexOf(Math.max(...fo)), 'mare');
    const strato = q('.fl-dentro .g-int-fili');
    strato.innerHTML = G.unico(fili + '<path class="fl-alone" fill="none" stroke="#FFE9A8" stroke-width="34" stroke-linecap="round" opacity="0" filter="url(#g-soft)"/>' + punti +
      '<circle class="fl-bulbo" cx="' + ex + '" cy="' + ey + '" r="80" fill="#FFF1C9" opacity="0" filter="url(#g-soft)"/>', 'fili');
    this.filiEl = [...strato.querySelectorAll('.fl-filo')]; this.coreEl = [...strato.querySelectorAll('.fl-core')];
    this.alone = strato.querySelector('.fl-alone');
    this.alone.setAttribute('d', this.filiEl[forte].getAttribute('d'));
    this.bulbo = strato.querySelector('.fl-bulbo');
    this.punti = [...strato.querySelectorAll('.fl-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.colori = [this.chi[U].biglietto, this.chi[U].dopo_fili];
    this.stato = '';
    this.sub = G.subs(kit, [[9.0, 15.0], [15.6, 23.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('10', 'fili', t);
    const G = this.G, M = G.MONDO, m = this.m, U = this.chi.length - 1;
    // Fuori: il treno corre sulla salita e sul viadotto, e sparisce nella montagna.
    m.cam.setAttribute('transform', G.camChiavi(FL_CAM, t));
    G.animaMondo(m, t + 1126);
    const s = G.percorso(t, 1330, FL_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    this.nero.setAttribute('opacity', (seg(t, FL_NERO[0], FL_NERO[1]) * (1 - seg(t, FL_NERO[2], FL_NERO[3]))).toFixed(3));
    this.dentro.setAttribute('opacity', t >= FL_NERO[1] ? 1 : 0);
    // Dentro.
    this.icam.setAttribute('transform', G.camChiavi(FL_DENTRO, t));
    G.scorriInterno(kit, 300 * t);
    this.ivag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]));
    // La stoffa della bandierina d'ottone si fa azzurra.
    const p = Math.round(eio(seg(t, FL_COLORE[0], FL_COLORE[1])) * 16) / 16;
    if (String(p) !== this.stato) { G.cambiaPasseggero(this.ivag[U], 'bandierina', G.mix(this.colori[0], this.colori[1], p), this.chi[U].o); this.stato = String(p); }
    const spegne = 1 - eio(seg(t, FL_SPEGNE[0], FL_SPEGNE[1])), attenua = 1 - 0.8 * eio(seg(t, FL_ATTENUA[0], FL_ATTENUA[1]));
    this.fili.forEach((f, k) => {
      const u = eo(seg(t, f.t0, f.t0 + (f.ott ? 1.6 : 0.8))), L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => {
        el.setAttribute('stroke-dasharray', L.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      });
      const brilla = (f.ott ? 0.25 + 0.75 * f.w : 0.18 + 0.3 * f.w * attenua) * spegne * (1 + 0.08 * Math.sin(t * 3 + k));
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, brilla + 0.2) : 0).toFixed(3));
    });
    // Il filo più forte, quello verso Mare, si accende come una lampadina.
    const lamp = eio(seg(t, FL_LAMPADINA, FL_LAMPADINA + 1.2)) * spegne * (0.8 + 0.2 * Math.sin(t * 4));
    this.alone.setAttribute('opacity', (0.5 * lamp).toFixed(3));
    this.bulbo.setAttribute('opacity', (0.55 * lamp).toFixed(3));
    // I colori scorrono lungo i fili, verso la bandierina.
    this.punti.forEach(c => {
      const k = +c.dataset.k, n = +c.dataset.n, f = this.fili[k], L = this.lung[k];
      const sc = seg(t, FL_SCORRE[0], FL_SCORRE[0] + 1) * (1 - seg(t, FL_SCORRE[1] - 1, FL_SCORRE[1]));
      const u = ((t * 0.12 + n / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (sc * spegne * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.sub(t);
  },
});
