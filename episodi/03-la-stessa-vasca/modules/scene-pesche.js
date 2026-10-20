const { seg, eo, ei, eio, lerp } = kit;
// Fuori, alla bancarella. Il primo treno esce sopra la vasca: Emma è blu, e sotto di lei cadono le paperelle, tantissime
// blu, parecchie turchesi, poche di altri colori. Ada pesca a occhi chiusi: blu. La paperella sale su un vagone nuovo,
// le altre scivolano via, il treno riparte. Esce il secondo: la stessa vasca; Ada pesca: turchese. Esce il terzo: la
// stessa vasca; Ada pesca una delle due sole verdi. Stacco sulle tre case: nuota, gioca, corre. Ada guarda la vasca
// vuota, poi la sua mano.
// Si apre dalla luce dell'uscita; finisce su Ada alla bancarella, col terzo treno in stazione (la riprende «manopola»).
const PE_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 2.4, cx: 772, cy: 856, z: 4.0 },
  { t: 8.0, cx: 772, cy: 856, z: 4.0 },
  { t: 9.6, cx: 700, cy: 846, z: 4.6 },
  { t: 11.6, cx: 700, cy: 846, z: 4.6 },
  { t: 13.0, cx: 520, cy: 816, z: 2.8 },
  { t: 15.4, cx: 640, cy: 820, z: 2.6 },
  { t: 17.4, cx: 772, cy: 856, z: 4.0 },
  { t: 21.0, cx: 772, cy: 856, z: 4.0 },
  { t: 22.4, cx: 700, cy: 846, z: 4.6 },
  { t: 24.2, cx: 700, cy: 846, z: 4.6 },
  { t: 25.6, cx: 520, cy: 816, z: 2.8 },
  { t: 27.8, cx: 640, cy: 820, z: 2.6 },
  { t: 29.8, cx: 772, cy: 856, z: 4.0 },
  { t: 33.6, cx: 772, cy: 856, z: 4.0 },
  { t: 35.0, cx: 700, cy: 846, z: 4.6 },
  { t: 36.8, cx: 700, cy: 846, z: 4.6 },
  { t: 38.4, cx: 520, cy: 816, z: 2.8 },
  { t: 43.6, cx: 690, cy: 846, z: 4.8, da: 43.59 },
  { t: 48.4, cx: 690, cy: 846, z: 5.2 },
];
// Le tre uscite: uguali, una dopo l'altra (tempi della scena).
const PE_VEL = [[0, 110], [2.8, 60], [5.4, 60], [6.4, 160], [7.6, 160], [8.8, 0]];
const PE_GIRI = [0.6, 13.2, 25.8].map((a, n) => ({
  esce: a, vel: PE_VEL.map(([t, v]) => [a + t, v]),
  pesca: { giu: a + 9.2, su: a + 10.2, preso: a + 10.6 }, salta: a + 11.2, vagone: a + 11.6, sale: a + 12.8, via: a + 11.4,
  riparte: n < 2 ? [a + 13.2, a + 16.4] : undefined,
}));
const PE_PAROLE = ['nuota', 'gioca', 'corre'];
const PE_CASE = [39.0, 39.6, 43.0, 43.6];
const PE_RISPOSTE = [39.9, 40.5, 41.1];
kit.scene('pesche', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri, MN = G.MOD.manopola;
    const chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]].map(([tipo, x]) => ({ tipo, biglietto: x.biglietto, uscita: x.tratti[2] }));
    // Tre volte la stessa vasca (la manopola sta sulla tacca di mezzo): stesse paperelle, negli stessi posti.
    this.giri = PE_GIRI.map((T, n) => G.pescata({ id: 'pe' + n, chi, vasca: MN.vasche.mezzo, parola: PE_PAROLE[n], nuovo: MN.nuovo[PE_PAROLE[n]], t: T }));
    const sopra = this.giri.map(g => g.treno).join('') +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pe-ada"></g>' + this.giri.map(g => g.mano).join('');
    // Le tre case, affiancate: sotto la stessa frase, tre parole diverse.
    const MURI = [{}, { muro: ['#203A3F', '#35585A', '#3D5E6E'] }, { muro: ['#3E2E22', '#5E4632', '#7A5A3C'] }];
    const pannello = k => {
      const z = 0.74, tx = 320 - 947 * z, ty = 560 - 522 * z;
      return '<g transform="translate(' + (k * 640) + ' 0)"><clipPath id="g-pe-pan' + k + '"><rect width="640" height="1080"/></clipPath><g clip-path="url(#g-pe-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto('<g>' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="pe-risposta" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: PE_PAROLE[k] }) + '</g>', MURI[k]) + '</g></g></g>';
    };
    const case3 = '<g class="pe-case" opacity="0">' + pannello(0) + pannello(1) + pannello(2) + '<path d="M640 -10 L640 1090 M1280 -10 L1280 1090" stroke="#05070F" stroke-width="12"/></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesche', manopola: 0,
      davanti: '<defs><radialGradient id="g-pe-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="pe-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-pe-luce)"/>' + case3,
      html: G.sottotitolo('NARRATORE', 'Tre volte Emma esce blu, e tre volte la vasca si riempie uguale.') +
        G.sottotitolo('NARRATORE', 'La vasca è sempre la stessa. Ma Ada pesca a occhi chiusi.') +
        G.sottotitolo('ADA', 'Nuota. Gioca. Corre!') +
        G.sottotitolo('NARRATORE', 'Le blu sono tante, ed escono spesso. Ma non sempre.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.giri.forEach(g => g.monta(this.m));
    this.G = G;
    this.ada = this.m.q('.pe-ada'); this.uscita = this.m.q('.pe-uscita');
    this.case = this.m.q('.pe-case'); this.risposte = this.m.qa('.pe-risposta');
    this.stato = '';
    this.sub = G.subs(kit, [[1.0, 7.6], [20.4, 26.4], [39.8, 42.6], [43.8, 48.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'pesche', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PE_CAM, t));
    G.animaMondo(m, t + 1000);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.4)))).toFixed(3));
    // Le tre uscite; Ada segue quella in corso.
    let giu = 0, n = 0;
    this.giri.forEach((g, k) => { const x = g.render(t); if (t >= PE_GIRI[k].esce - 0.5) { n = k; giu = x; } });
    const T = PE_GIRI[n];
    const pesca = t >= T.pesca.giu - 1.2 && t < T.salta + 1.6;
    const posa = t > 43 ? 'base' : pesca ? 'pesca' : 'quaderno';
    const espr = t > 43 ? (t < 45.6 ? 'pensa' : 'sorpresa') :
      t < T.pesca.giu - 0.6 ? (n === 0 ? 'base' : 'felice') : t < T.pesca.preso ? 'chiusi' : n === 2 ? 'sorpresa' : 'felice';
    const k = posa + espr + giu;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { giu }) + '</g>'; this.stato = k; }
    // Le tre case: sotto la stessa frase compaiono tre parole diverse.
    this.case.setAttribute('opacity', (seg(t, PE_CASE[0], PE_CASE[1]) * (1 - seg(t, PE_CASE[2], PE_CASE[3]))).toFixed(3));
    this.risposte.forEach((r, i) => r.setAttribute('opacity', eo(seg(t, PE_RISPOSTE[i], PE_RISPOSTE[i] + 0.4)).toFixed(3)));
    this.sub(t);
  },
});
