const { seg, eo, eio, lerp } = kit;
// Il treno parte da solo, senza nessuno alla guida, e lascia la stazione; stacco: in fondo alla banchina lunga sale piano
// la salita, in cima prende velocità, corre sul viadotto e sparisce nella bocca buia della montagna. Dal buio arrivano i clac. Ada scende alla bancarella della pesca (sul bancone la manopola, sulla tacca
// di mezzo), si siede accanto alla vasca vuota, apre il quaderno e aspetta, sicura, con la matita pronta.
// Si apre come finisce «biglietti»; finisce su Ada seduta accanto alla vasca (la riprende «finestre», dentro).
const PT_CAM = [
  { t: 0, cx: 410, cy: 794, z: 3.6 },
  { t: 1.0, cx: 410, cy: 794, z: 3.6 },
  { t: 2.4, cx: 340, cy: 780, z: 3.1, da: 2.39 },
  { t: 2.41, cx: -1090, cy: 720, z: 2.4, da: 2.4 },
  { t: 3.6, cx: -1128, cy: 700, z: 2.2 },
  { t: 7.0, cx: -1008, cy: 560, z: 1.6 },
  { t: 7.8, cx: -1008, cy: 560, z: 1.6 },
  { t: 10.6, cx: 820, cy: 560, z: 1.2 },
  { t: 12.6, cx: 820, cy: 560, z: 1.2 },
  { t: 15.0, cx: 724, cy: 856, z: 4.2 },
];
// Velocità [t, v]: fermo, poi piano su per la salita; in cima prende velocità e corre sul viadotto fino alla montagna.
// Allo stacco (PT_STACCO) il treno passa dalla stazione ai piedi della salita: salta i 1368 px di banchina lunga, fuori
// campo, così sale, entra in montagna e fa i clac agli stessi istanti di prima.
const PT_VEL = [[0, 0], [1.2, 0], [2.6, 70], [5.0, 70], [7.0, 120], [8.5, 750]];
const PT_STACCO = 2.4, PT_SALTO = 1368;
const PT_ADA = [650, 836], PT_SEDE = [672, 896];
const PT_SCENDE = [8.6, 10.0];
const PT_QUADERNO = 13.4;
kit.scene('partenza', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.cane.passeggeri;
    const forme = { Il: 0, di: 1, si: 2 };
    const chi = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'].map(w => ({ tipo: w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso', col: P[w].biglietto, o: w in forme ? { forma: forme[w] } : w === 'cane' ? { coda: 12 } : {} }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      G.treniDormono() + '<g class="pt-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' + '<g class="pt-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'partenza', morto: true, banchina: true, manopola: 0,
      html: G.sottotitolo('NARRATORE', 'Il treno parte da solo e sparisce nella montagna. Ada aspetta accanto alla vasca vuota.'),
    });
    this.G = G;
    this.vag = this.m.qa('.pt-treno .g-vag');
    this.ada = this.m.q('.pt-ada');
    this.stato = '';
    this.sub = G.subs(kit, [[5.4, 13.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'partenza', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PT_CAM, t));
    G.animaMondo(m, t + 1040);
    const s = 490 + G.percorso(t, 0, PT_VEL) + (t >= PT_STACCO ? PT_SALTO : 0);
    G.posaTreno(this.vag, m.partenza, s, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true, passo: M.passoBanchina });
    // Ada guarda il treno partire, poi scende alla bancarella con due saltelli e si siede accanto alla vasca.
    const u = eio(seg(t, PT_SCENDE[0], PT_SCENDE[1]));
    const seduta = t >= PT_SCENDE[1];
    const x = lerp(PT_ADA[0], PT_SEDE[0], u), y = lerp(PT_ADA[1], PT_SEDE[1], u) - (u > 0 && u < 1 ? 14 * Math.abs(Math.sin(Math.PI * 2 * u)) : 0);
    const posa = seduta ? (t < PT_QUADERNO ? 'quaderno' : 'disegna') : 'base';
    const espr = t < 2.0 ? 'base' : t < PT_SCENDE[0] ? 'felice' : t < PT_QUADERNO ? 'pensa' : 'felice';
    const ang = seduta ? Math.round(6 * eio(seg(t, 11.0, 12.0)) * 2) / 2 : 0;
    const k = posa + espr + ang + seduta;
    if (k !== this.stato) {
      this.ada.innerHTML = '<g class="pt-ada-in">' + (seduta ? G.adaSeduta(posa, espr, { testa: ang, matita: -20 }) : G.adaGira(posa, espr, {}, 0)) + '</g>';
      this.stato = k;
    }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y));
    this.sub(t);
  },
});
