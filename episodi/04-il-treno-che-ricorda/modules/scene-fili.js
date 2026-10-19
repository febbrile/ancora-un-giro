const { seg, eo, ei, eio, lerp } = kit;
// Le sbarre dei vagoni si abbassano e il treno parte da solo: sale piano la salita e sparisce nella montagna.
// Dentro, nel buio, si accendono i fili di luce, sempre verso chi sta davanti: in testa Al, Mare ed Emma si passano i
// colori come la prima volta. La camera scorre lungo il treno fino all'ultimo vagone, a Parco: da lui partono fili
// verso tutti quelli che ha davanti, e un anello di luce intorno a sé. Il filo più forte è anche il più lungo: arriva
// fino a Emma e brilla come una lampadina. Lungo il filo scorre un po' del rosa di Emma; alla fine il vestito di Emma
// si fa lilla grigio e la chioma di Parco di un verde più grigio.
// Si apre come finisce «banchina»; finisce sul treno intero, nel buio (lo riprende «finestre»).
const FI_CAM = [
  { t: 0, cx: 377, cy: 786, z: 2.45 },
  { t: 1.6, cx: 377, cy: 786, z: 2.45 },
  { t: 4.6, cx: 260, cy: 700, z: 1.9 },
  { t: 7.6, cx: 640, cy: 560, z: 1.25 },
  { t: 9.8, cx: 960, cy: 500, z: 1.5 },
];
const FI_VEL = [[0, 0], [1.6, 0], [3.2, 70], [5.0, 110], [6.6, 260], [8.0, 420]];
const FI_SBARRE = [0.4, 1.2];
const FI_NERO = [9.4, 10.0, 10.4, 11.8];
// Dentro: la camera sul treno (coordinate dell'interno).
const FI_DENTRO = [
  { t: 10.4, cx: 960, cy: 560, z: 1 },
  { t: 14.4, cx: 960, cy: 560, z: 1 },
  { t: 17.6, cx: 1460, cy: 520, z: 0.76 },
  { t: 22.0, cx: 1460, cy: 520, z: 0.76 },
  { t: 25.4, cx: 1760, cy: 560, z: 0.98 },
  { t: 31.0, cx: 1760, cy: 560, z: 0.98 },
  { t: 33.0, cx: 1460, cy: 540, z: 0.8 },
];
// I fili: in testa (Al, Mare, Emma), poi quelli di Parco; quando si accendono, quando scorrono i colori, quando si spengono.
const FI_TESTA = 11.8, FI_PARCO = 16.8, FI_LAMPADINA = 19.8;
const FI_SCORRE = [21.4, 30.4], FI_COLORE = [27.0, 30.6], FI_SPEGNE = [31.0, 32.6];
kit.scene('fili', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat, P = H.giro.passeggeri, E = G.MOD.mare.passeggeri;
    const tipi = ['al', 'mare', 'emma', 'paperella', 'al', 'parco'];
    this.tipi = tipi;
    this.chi = tipi.map((tp, i) => [tp, P[i].biglietto]);
    // Fuori: la stazione e la salita.
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="fi-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 0 }) + '</g>' +
      '<g class="fi-ada"></g>';
    // Dentro: il treno grande nel buio, coi fili.
    const dentro = '<g class="fi-dentro" opacity="0">' + G.interniDefs + '<g class="fi-icam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1] }))) + '</g></g>' +
      '<rect class="fi-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'fili', manopola: 0, banchina: true, davanti: dentro,
      html: G.sottotitolo('NARRATORE', 'Nel buio, Parco guarda avanti, fino in testa al treno.') +
        G.sottotitolo('NARRATORE', 'Il suo filo più forte attraversa tutto il treno e arriva a Emma. Lungo il filo, un po’ del suo rosa scorre fino a Parco.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.fi-treno .g-vag'); this.ada = q('.fi-ada');
    this.dentro = q('.fi-dentro'); this.icam = q('.fi-icam'); this.nero = q('.fi-nero');
    G.internoLungo(this.icam);
    this.ivag = this.m.qa('.fi-dentro .g-vag');
    this.basi = this.ivag.map(v => v.getAttribute('transform'));
    this.colori = [E.Emma.biglietto, E.Emma.dopo_fili, P[5].biglietto, P[5].dopo_fili];
    // I fili: chi guarda (i) verso chi (j), con il peso; si guarda avanti (j ≤ i). In testa come la prima volta (dal
    // modellino di «Al mare Emma»), poi Parco (dal modellino della chat). Il secondo Al e la paperella blu non ne hanno.
    const pesi = [[0, 0, E.Al.fili.Al, FI_TESTA], [1, 0, E.mare.fili.Al, FI_TESTA + 0.6], [1, 1, E.mare.fili.mare, FI_TESTA + 0.8],
      [2, 0, E.Emma.fili.Al, FI_TESTA + 1.2], [2, 1, E.Emma.fili.mare, FI_TESTA + 1.4], [2, 2, E.Emma.fili.Emma, FI_TESTA + 1.6]];
    [4, 3, 2, 1, 0, 5].forEach((j, n) => pesi.push([5, j, P[5].fili[j], FI_PARCO + n * 0.35]));
    let fili = '', punti = '';
    this.fili = pesi.map(([i, j, w, t0], k) => {
      let d;
      if (i === j) d = G.anello(i, tipi[i]);
      else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w;
      const quanti = (i === 2 || i === 5) && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
      fili += '<path class="fi-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
        '<path class="fi-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
      for (let n = 0; n < quanti; n++) punti += '<circle class="fi-punto" data-k="' + k + '" data-n="' + n + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1] + '" opacity="0"/>';
      return { i, j, w, t0, quanti, forte: i === 5 && j === 2 };
    });
    // Il filo più forte di Parco brilla come una lampadina: un alone in più, e una luce sulla testa di Emma.
    const forte = this.fili.findIndex(f => f.forte);
    const [ex, ey] = G.cima(2, 'emma');
    const strato = q('.fi-dentro .g-int-fili');
    strato.innerHTML = G.unico(fili + '<path class="fi-alone" fill="none" stroke="#FFE9A8" stroke-width="26" stroke-linecap="round" opacity="0" filter="url(#g-soft)"/>' + punti +
      '<circle class="fi-bulbo" cx="' + ex + '" cy="' + ey + '" r="60" fill="#FFF1C9" opacity="0" filter="url(#g-soft)"/>', 'fili');
    this.filiEl = [...strato.querySelectorAll('.fi-filo')]; this.coreEl = [...strato.querySelectorAll('.fi-core')];
    this.alone = strato.querySelector('.fi-alone');
    this.alone.setAttribute('d', this.filiEl[forte].getAttribute('d'));
    this.bulbo = strato.querySelector('.fi-bulbo');
    this.punti = [...strato.querySelectorAll('.fi-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.statoAda = '';
    this.sub = G.subs(kit, [[15.0, 19.8], [20.4, 31.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'fili', t);
    const G = this.G, M = G.MONDO, m = this.m;
    // Fuori: il treno parte, sale e sparisce nella montagna.
    m.cam.setAttribute('transform', G.camChiavi(FI_CAM, t));
    G.animaMondo(m, t + 1000);
    const s = G.percorso(t, 640 - M.fermo, FI_VEL);
    G.sbarre(this.vag, i => eio(seg(t, FI_SBARRE[0] + i * 0.12, FI_SBARRE[1] + i * 0.12)));
    const passo = lerp(M.passoBanchina, 86, seg(s, 490, 640));
    G.posaTreno(this.vag, m.partenza, s, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true, passo });
    const espr = t < 3 ? 'felice' : 'pensa';
    if (espr !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>'; this.statoAda = espr; }
    this.nero.setAttribute('opacity', (seg(t, FI_NERO[0], FI_NERO[1]) * (1 - seg(t, FI_NERO[2], FI_NERO[3]))).toFixed(3));
    this.dentro.setAttribute('opacity', t >= FI_NERO[1] ? 1 : 0);
    // Dentro.
    this.icam.setAttribute('transform', G.camChiavi(FI_DENTRO, t));
    G.scorriInterno(kit, 300 * t);
    this.ivag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]));
    // Alla fine, insieme, il vestito di Emma e la chioma di Parco cambiano colore.
    const p = Math.round(eio(seg(t, FI_COLORE[0], FI_COLORE[1])) * 16) / 16;
    G.cambiaPasseggero(this.ivag[2], 'emma', G.mix(this.colori[0], this.colori[1], p));
    G.cambiaPasseggero(this.ivag[5], 'parco', G.mix(this.colori[2], this.colori[3], p));
    const spegne = 1 - eio(seg(t, FI_SPEGNE[0], FI_SPEGNE[1]));
    this.fili.forEach((f, k) => {
      const u = eo(seg(t, f.t0, f.t0 + (f.i === 5 ? 1.6 : 1.2))), L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => {
        el.setAttribute('stroke-dasharray', L.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      });
      const brilla = (0.25 + 0.75 * f.w) * spegne * (1 + 0.08 * Math.sin(t * 3 + k));
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, brilla + 0.2) : 0).toFixed(3));
    });
    // Il filo più forte si accende come una lampadina.
    const lamp = eio(seg(t, FI_LAMPADINA, FI_LAMPADINA + 1.2)) * spegne * (0.8 + 0.2 * Math.sin(t * 4));
    this.alone.setAttribute('opacity', (0.55 * lamp).toFixed(3));
    this.bulbo.setAttribute('opacity', (0.6 * lamp).toFixed(3));
    // I colori scorrono lungo i fili: verso Emma in testa, verso Parco in fondo.
    this.punti.forEach(c => {
      const k = +c.dataset.k, n = +c.dataset.n, f = this.fili[k], L = this.lung[k];
      const sc = f.i === 2 ? seg(t, FI_TESTA + 2.0, FI_TESTA + 3.0) * (1 - seg(t, FI_COLORE[1] - 1, FI_COLORE[1])) : seg(t, FI_SCORRE[0], FI_SCORRE[0] + 1) * (1 - seg(t, FI_SCORRE[1] - 1, FI_SCORRE[1]));
      const u = ((t * (f.i === 5 ? 0.16 : 0.32) + n / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (sc * spegne * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.sub(t);
  },
});
