const { seg, eo, eio, lerp } = kit;
// Giro dopo giro, a montaggio, sempre più veloce. Il treno esce sopra la vasca: nell'ultimo vagone la paperella blu è
// diventata color sabbia, e sotto di lei cadono paperelle di tanti colori. Ada pesca una paperella rosa salmone, che
// corre a sedersi in un vagone nuovo; sul telefono compare «e». Il treno riparte, corre lungo la banchina, sale, torna
// sul viadotto e sparisce nella montagna; esce
// di nuovo: questa volta la vasca si riempie di turchesi, blu e verdi. Ada pesca una turchese: «gioca».
// Ogni volta, in un angolo della vasca, galleggia una paperella scura, del colore della notte, e ogni volta scivola via
// con le altre. Al secondo giro Ada la vede, si sporge e la guarda andare via.
// Si apre su Ada alla bancarella, come finisce «domanda»; finisce sul treno che riparte, un vagone più lungo (dalla
// stazione lo riprende «quaderno», con Ada alla bancarella; il treno corre via lungo la banchina).
const GR_CAM = [
  { t: 0, cx: 760, cy: 780, z: 2.4 },
  { t: 1.6, cx: 740, cy: 846, z: 3.6 },
  { t: 10.99, cx: 740, cy: 846, z: 3.6 },
  // Il treno riparte: il luna park, la banchina, il viadotto, la montagna; e di nuovo l'uscita.
  { t: 11.0, cx: 640, cy: 560, z: 0.86 },
  { t: 15.4, cx: 640, cy: 560, z: 0.86 },
  { t: 17.0, cx: 740, cy: 846, z: 3.6 },
  { t: 19.6, cx: 740, cy: 846, z: 3.6 },
  // La paperella scura, in un angolo.
  { t: 20.8, cx: 826, cy: 872, z: 8.0 },
  { t: 22.4, cx: 826, cy: 872, z: 8.0 },
  { t: 23.4, cx: 720, cy: 848, z: 3.8 },
  { t: 31.79, cx: 720, cy: 848, z: 3.8 },
  // Il treno riparte, un vagone più lungo.
  { t: 31.8, cx: 470, cy: 800, z: 2.4 },
  { t: 34.2, cx: 420, cy: 760, z: 2.0 },
];
// I due giri: l'uscita, la pesca, la corsa della paperella, la partenza.
const GR_A = {
  esce: 0.4, vel: [[0.4, 240], [1.7, 240], [2.1, 80], [3.6, 80], [4.4, 200]],
  pesca: { giu: 5.4, su: 6.4, preso: 6.8 }, via: 7.4, salta: 7.4, vagone: 8.4, sale: 9.0,
  riparte: 11.0, velParte: [[11.0, 0], [11.8, 300], [12.8, 1100], [13.6, 1550]],
};
const GR_B = {
  esce: 15.4, vel: [[15.4, 260], [16.8, 260], [17.3, 70], [19.4, 70], [20.2, 200]],
  pesca: { giu: 23.8, su: 24.8, preso: 25.2 }, via: 25.8, salta: 26.0, vagone: 26.8, sale: 27.4,
  riparte: 31.8, velParte: [[31.8, 0], [32.8, 110], [34.2, 260]],
};
// Sul telefono, a ogni pesca, una parola in più (la risposta sta ancora arrivando: i tre puntini restano).
const GR_TEL = [{ da: 9.4, a: 11.0, prima: 'nuota', dopo: 'nuota e', quando: 9.9 }, { da: 30.2, a: 31.8, prima: 'nuota e', dopo: 'nuota e gioca', quando: 30.7 }];
// Ada vede la paperella scura e si sporge; poi la guarda andare via.
const GR_VEDE = 20.6, GR_SPORGE = [[21.0, 23.0], [26.2, 29.4]];
kit.scene('giri', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri;
    const base = [{ tipo: 'al', biglietto: A.Al.biglietto, uscita: A.Al.tratti[2] }, { tipo: 'mare', biglietto: A.mare.biglietto, uscita: A.mare.tratti[2] },
      { tipo: 'emma', biglietto: A.Emma.biglietto, uscita: A.Emma.tratti[2] }];
    const nuovo = w => ({ tipo: 'paperella', biglietto: P[w].biglietto, uscita: P[w].tratti[2] });
    this.giri = [
      G.giro7({ id: 'a', chi: base.concat([nuovo('nuota')]), vasca: F.giri[1].vasca, seme: 41, parola: F.giri[1].pescata, nuovo: P.e.biglietto, angolo: true, t: GR_A }),
      G.giro7({ id: 'b', chi: base.concat([nuovo('nuota'), nuovo('e')]), vasca: F.giri[2].vasca, seme: 43, parola: F.giri[2].pescata, nuovo: P.gioca.biglietto, angolo: true, ultimaFine: true, t: GR_B }),
    ];
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giri.map(g => g.treno).join('') + '<g class="gr-ada"></g>' + this.giri.map(g => g.mano).join('');
    const casa = '<g class="gr-casa" opacity="0"><g transform="translate(-517.0 -352.0) scale(1.55)">' + G.salotto('<g class="gr-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'giri', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Ogni volta la vasca si riempie, Ada pesca, e il treno riparte, un vagone più lungo.') +
        G.sottotitolo('NARRATORE', 'E ogni volta, in un angolo, c’è una paperella scura, del colore della notte.') +
        G.sottotitolo('ADA', 'Quella non la pesco mai.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.giri.forEach(g => g.monta(this.m));
    this.G = G;
    this.ada = this.m.q('.gr-ada'); this.casa = this.m.q('.gr-casa'); this.tel = this.m.q('.gr-tel');
    this.stato = ''; this.statoTel = '';
    this.sub = G.subs(kit, [[0.8, 8.4], [17.6, 24.2], [27.6, 30.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'giri', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GR_CAM, t));
    G.animaMondo(m, t + 940);
    const [a, b] = this.giri.map(g => g.render(t));
    // Ada: guarda, pesca a occhi chiusi, guarda di nuovo; al secondo giro vede la paperella scura e si sporge.
    const sx = t < 15 ? a : b, T = t < 15 ? GR_A : GR_B;
    const pesca = t >= T.pesca.giu - 0.9 && t < T.pesca.preso + 0.9;
    const posa = pesca ? 'pesca' : 'quaderno';
    let espr = 'felice';
    if (pesca) espr = t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa';
    else if (t >= GR_VEDE && t < GR_B.pesca.giu) espr = 'sorpresa';
    else if (t >= GR_B.pesca.preso && t < 30.4) espr = 'pensa';
    const sporge = Math.max(...GR_SPORGE.map(([p, q]) => eio(seg(t, p, p + 0.8)) * (1 - eio(seg(t, q - 0.6, q)))));
    const giu = pesca ? sx.giu : 0;
    const k = posa + espr + giu + sporge.toFixed(2);
    if (k !== this.stato) {
      this.ada.innerHTML = '<g transform="rotate(' + (10 * sporge).toFixed(2) + ' 672 896) translate(' + (3 * sporge).toFixed(2) + ' 0)"><g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { giu }) + '</g></g>';
      this.stato = k;
    }
    // Il telefono: una parola in più.
    const tel = GR_TEL.find(x => t >= x.da - 0.2 && t < x.a + 0.2);
    this.casa.setAttribute('opacity', tel ? (seg(t, tel.da - 0.15, tel.da) * (1 - seg(t, tel.a - 0.15, tel.a))).toFixed(3) : 0);
    if (tel) {
      const testo = t < tel.quando ? tel.prima : tel.dopo, kk = testo + (Math.round(t * 30) / 30).toFixed(3);
      if (kk !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', testo]], puntini: t }), 'grtel'); this.statoTel = kk; }
    }
    this.sub(t);
  },
});
