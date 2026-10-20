const { seg, eo, ei, eio, lerp } = kit;
// Quella sera dalla città vola una striscia nuova e atterra in mano ad Ada, sulla banchina. Ada la legge (la striscia è
// girata verso di lei: noi non leggiamo niente), aggrotta la fronte e guarda lo Spezzaparole. Cartello: «Fine».
// Si apre come finisce «oggi» (Ada e i treni grigi).
const FI_CAM = [
  { t: 0, cx: 220, cy: 770, z: 1.6 },
  { t: 1.0, cx: 240, cy: 790, z: 1.9 },
  { t: 3.0, cx: 620, cy: 640, z: 1.7 },
  { t: 4.4, cx: 600, cy: 700, z: 1.9 },
  { t: 6.0, cx: 530, cy: 800, z: 4.2 },
  { t: 8.4, cx: 530, cy: 800, z: 4.2 },
  { t: 9.8, cx: 552, cy: 790, z: 3.8 },
  { t: 14.4, cx: 552, cy: 790, z: 3.8 },
  { t: 16.4, cx: 640, cy: 640, z: 1.45 },
];
const FI_TORNA = [0.6, 2.0];
const FI_VOLO = [2.0, 5.0];
const FI_LEGGE = 5.4, FI_FRONTE = 7.0, FI_GUARDA = [8.6, 9.4];
const FI_FINE = 15.0;
kit.scene('fine', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, D = G.MOD.mare, P = D.passeggeri;
    // La striscia nuova: da qui si vede solo il retro, senza scritte.
    const retro = '<g transform="translate(-150 -22)"><path d="M0 4 L300 0 L290 22 L300 44 L0 40 L10 22 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/></g>';
    const treno = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }];
    const sopra = '<path class="fi-p-morto" d="' + M.morto + '" fill="none"/>' +
      '<g class="fi-dormono" opacity=".9">' + G.treniCheDormono() + '</g>' +
      '<g class="fi-treno">' + G.treno(treno, { sbarra: 1 }) + '</g>' +
      '<g class="fi-macchina"></g><g class="fi-ada"></g>' +
      '<g class="fi-striscia" opacity="0">' + retro + '</g>';
    const fine = '<g class="fi-fine" opacity="0"><g transform="translate(960 250)"><g class="fi-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'fine', morto: true, manopola: 0, banchina: true, davanti: fine,
      html: G.sottotitolo('NARRATORE', 'Quella sera arriva una frase con una parola che nessun treno di prova ha mai portato.') +
        G.sottotitolo('ADA', 'Una parola mai vista… E lo Spezzaparole come la taglia?') +
        G.sottotitolo('NARRATORE', 'Ma questa è un’altra storia.'),
    });
    const m = this.m;
    this.G = G;
    G.dormono(m.q('.fi-p-morto'), m.q('.fi-dormono'), true);
    G.posaTreno(m.qa('.fi-treno .g-vag'), m.arrivo, m.arrivo.getTotalLength() - (M.fermo - 40), M.scala, M.passoBanchina);
    // Le paperelle rimaste dall'ultimo giro scivolano via dallo scarico.
    this.lista = G.papereVasca(D.vasca);
    m.q('.g-vasca').insertAdjacentHTML('beforeend', this.lista.map(p => '<g class="fi-pap"><g transform="translate(-50 -84)">' + G.paperella(p.col) + '</g></g>').join(''));
    this.pap = m.qa('.fi-pap');
    this.ada = m.q('.fi-ada'); this.mac = m.q('.fi-macchina'); this.str = m.q('.fi-striscia');
    this.fine = m.q('.fi-fine'); this.insegna = m.q('.fi-insegna');
    this.stato = ''; this.statoMac = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[1.0, 8.4], [9.6, 14.4], [15.6, 18.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'fine', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(FI_CAM, t));
    G.animaMondo(m, t + 1230);
    this.pap.forEach((el, i) => {
      const p = this.lista[i], via = eio(seg(t, 0.6 + (i % 7) * 0.12, 2.2 + (i % 7) * 0.12)), a = via * 2.4 + i;
      el.setAttribute('transform', 'translate(' + lerp(p.x, 772 + 8 * Math.cos(a), via).toFixed(2) + ' ' + lerp(p.y + 1.2 * Math.sin(t * 2.2 + i), 884, via).toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada torna sulla banchina, al suo posto, saltellando.
    const u = eio(seg(t, FI_TORNA[0], FI_TORNA[1]));
    const ax = lerp(612, M.ada[0], u), ay = lerp(896, M.ada[1], u) - (u > 0 && u < 1 ? 14 * Math.sin(Math.PI * u) + 4 * Math.abs(Math.sin(t * 9)) : 0);
    const presa = t >= FI_VOLO[1];
    const espr = t < FI_VOLO[0] ? 'felice' : !presa ? 'sorpresa' : t < FI_LEGGE ? 'felice' : t < 14.6 ? 'pensa' : 'base';
    const fronte = presa && t >= FI_FRONTE;
    const k = presa + espr + fronte;
    if (k !== this.stato) {
      // Aggrotta la fronte: due sopracciglia storte sopra gli occhiali.
      const ciglia = fronte ? '<path d="M74 66 L96 72 M104 72 L126 66" stroke="#3A2418" stroke-width="4" stroke-linecap="round"/>' : '';
      this.ada.innerHTML = '<g class="fi-ada-in">' + G.ada(presa ? 'striscia' : 'quaderno', espr) + ciglia + '</g>';
      this.stato = k;
    }
    // Quando guarda lo Spezzaparole si gira un poco verso di lui.
    const gira = 6 * eio(seg(t, FI_GUARDA[0], FI_GUARDA[1]));
    this.ada.firstChild.setAttribute('transform', 'rotate(' + gira.toFixed(2) + ' ' + ax.toFixed(1) + ' ' + ay.toFixed(1) + ') ' + G.posaAda(ax, ay));
    // La striscia nuova vola dalla città, oltre la ruota, fino alle mani di Ada.
    const v = eio(seg(t, FI_VOLO[0], FI_VOLO[1]));
    const sx = lerp(1150, M.ada[0], v), sy = lerp(330, 808, v) - 120 * Math.sin(Math.PI * v);
    this.str.setAttribute('transform', 'translate(' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ') rotate(' + ((1 - v) * 20 * Math.sin(t * 3)).toFixed(1) + ') scale(' + lerp(0.45, 0.123, v).toFixed(3) + ')');
    this.str.setAttribute('opacity', t >= FI_VOLO[0] && !presa ? 1 : 0);
    // Lo Spezzaparole, guardato, fa ballare un poco gli aghi.
    const aghi = Math.round(30 * Math.sin(t * 3) * seg(t, FI_GUARDA[1], FI_GUARDA[1] + 0.5) * (1 - seg(t, 13.6, 14.2)));
    if (String(aghi) !== this.statoMac) { this.mac.innerHTML = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ aghi }) + '</g>'; this.statoMac = String(aghi); }
    // Il cartello: «Fine».
    const f = eo(seg(t, FI_FINE, FI_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
