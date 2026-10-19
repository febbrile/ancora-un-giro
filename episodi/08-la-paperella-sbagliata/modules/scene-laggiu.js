const { seg, eo, eio, lerp } = kit;
// Le sbarre si abbassano e il treno riparte, un vagone più lungo, con Briciola in fondo. Ada chiude il quaderno e alza gli
// occhi, oltre la ruota panoramica. Lontano, dietro le colline buie, si accendono le luci di un altro parco, molto più
// grande: montagne dietro montagne, lucine a perdita d'occhio. Ada si alza in punta di piedi. Cartello: «Fine».
// Si apre come finisce «telefono» (la stazione, il treno pronto).
const LG_CAM = [
  { t: 0, cx: 760, cy: 700, z: 1.5 },
  { t: 1.6, cx: 470, cy: 800, z: 3.2 },
  { t: 4.6, cx: 520, cy: 790, z: 3.2 },
  { t: 6.4, cx: 700, cy: 830, z: 4.6 },
  { t: 7.6, cx: 700, cy: 830, z: 4.6 },
  // Quello che vede Ada: la ruota panoramica e, dietro le colline, le luci dell'altro parco.
  { t: 10.4, cx: 1840, cy: 640, z: 1.3 },
  { t: 12.0, cx: 1860, cy: 650, z: 1.34, da: 11.99 },
  { t: 12.01, cx: 690, cy: 836, z: 4.0, da: 12.0 },
  { t: 15.0, cx: 690, cy: 836, z: 4.0 },
  { t: 17.0, cx: 1300, cy: 640, z: 1.0 },
];
const LG_SBARRE = [0.8, 1.8];
const LG_VEL = [[0, 0], [2.2, 0], [3.6, 70], [6.0, 70], [8.0, 120], [9.5, 300]];
const LG_ADA = [672, 896];
const LG_CHIUDE = 5.2, LG_SU = 6.2;
const LG_LAGGIU = [8.2, 11.6];
const LG_PUNTE = [12.5, 13.1];
const LG_FINE = 15.8;
kit.scene('laggiu', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.cane, P = D.passeggeri;
    const forme = { Il: 0, di: 1, si: 2 };
    const parole = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
    const treno = parole.map(w => ({ tipo: w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso', col: P[w].biglietto, o: w in forme ? { forma: forme[w] } : w === 'cane' ? { coda: 12 } : {} }))
      .concat([{ tipo: 'paperella', col: D.nuovo[D.pesca] }]);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      G.treniDormono() + '<g class="lg-treno">' + G.treno(treno, { sbarra: 0 }) + '</g><g class="lg-ada"></g>';
    const fine = '<g class="lg-fine" opacity="0"><g transform="translate(960 300)"><g class="lg-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'laggiu', morto: true, banchina: true, manopola: 0, laggiu: 1, davanti: fine,
      html: G.sottotitolo('ADA', 'Che cosa c’è laggiù?') + G.sottotitolo('NARRATORE', 'Ma questa è un’altra storia.'),
    });
    this.G = G;
    this.vag = this.m.qa('.lg-treno .g-vag');
    this.laggiu = this.m.q('.g-laggiu');
    this.ada = this.m.q('.lg-ada'); this.fine = this.m.q('.lg-fine'); this.insegna = this.m.q('.lg-insegna');
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[12.8, 15.2], [16.4, 19.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'laggiu', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(LG_CAM, t));
    G.animaMondo(m, t + 1210);
    // Le sbarre si abbassano; il treno riparte, un vagone più lungo, e sparisce nella montagna.
    G.sbarre(this.vag, i => eio(seg(t, LG_SBARRE[0] + i * 0.12, LG_SBARRE[1] + i * 0.12)));
    const s = 490 + G.percorso(t, 0, LG_VEL);
    G.posaTreno(this.vag, m.partenza, s, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true, passo: M.passoBanchina });
    // Le luci dell'altro parco, dietro le colline, si accendono piano.
    const l = eio(seg(t, LG_LAGGIU[0], LG_LAGGIU[1]));
    this.laggiu.setAttribute('opacity', (l * (0.92 + 0.08 * Math.sin(t * 3))).toFixed(3));
    // Ada saluta il treno, chiude il quaderno, alza gli occhi; poi si alza in punta di piedi.
    const chiuso = t >= LG_CHIUDE;
    const espr = t < LG_CHIUDE ? 'felice' : t < LG_SU ? 'base' : t < LG_LAGGIU[0] + 1.6 ? 'pensa' : t < LG_FINE ? 'sorpresa' : 'pensa';
    const ang = Math.round(lerp(0, 8, eio(seg(t, LG_SU, LG_SU + 0.8))) * 2) / 2;
    const k = chiuso + espr + ang;
    if (k !== this.stato) {
      let disegno = G.adaGira('quaderno', espr, {}, ang);
      if (chiuso) disegno = disegno.replace('<rect x="69" y="194" width="62" height="46" rx="2" fill="' + G.C.crema + '"/>', '');
      this.ada.innerHTML = '<g class="lg-ada-in">' + disegno + '</g>';
      this.stato = k;
    }
    const punte = eio(seg(t, LG_PUNTE[0], LG_PUNTE[1]));
    this.ada.firstChild.setAttribute('transform', G.posaAda(LG_ADA[0], LG_ADA[1] - 3.5 * punte + 0.6 * punte * Math.sin(t * 5)));
    // Il cartello: «Fine».
    const f = eo(seg(t, LG_FINE, LG_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
