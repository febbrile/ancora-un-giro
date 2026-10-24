const { seg, eo, eio, lerp } = kit;
// Ada chiude gli occhi, infila la mano e pesca una paperella blu. La paperella le salta di mano e corre verso il treno,
// in un vagone nuovo in fondo; le altre scivolano via dallo scarico. Stacco su una casa: sul telefono, sotto «Al parco
// Emma», compare «nuota». La persona inclina la testa, perplessa (il telefono si inclina nelle sue mani).
// Si apre come finisce «domanda», sulla vasca piena; finisce nella casa (la riprende «pagina», alla stazione).
const PE_DOPO = 32; // la vasca e il treno sono quelli di «domanda»: il giro continua da dove era arrivato
const PE_GIRO = {
  esce: 15.6 - PE_DOPO, vel: [[15.6, 280], [18.0, 280], [18.5, 50], [22.4, 50], [23.2, 220]].map(([a, v]) => [a - PE_DOPO, v]),
  pesca: { giu: 1.4, su: 2.4, preso: 2.8 }, via: 3.6, salta: 3.4, vagone: 4.0, sale: 4.8,
};
const PE_CASA = [5.8, 6.2], PE_RISPOSTA = 7.4, PE_INCLINA = [9.4, 12.6];
const PE_CAM = [
  { t: 0, cx: 728, cy: 862, z: 4.4 },
  { t: 3.2, cx: 728, cy: 862, z: 4.4 },
  { t: 4.8, cx: 640, cy: 832, z: 4.0 },
];
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, S2 = G.S2, giro = G.MOD.seconda.parco.giri[0];
    const nuota = G.MOD.seconda.parco.giri[1].passeggeri.find(p => p.parola === 'nuota').biglietto;
    this.giro = G.giro7({ id: 'pe', chi: S2.treno(giro), vasca: giro.vasca, seme: 101, parola: 'nuota', nuovo: nuota, fermo: G.fermoTreno(10), t: PE_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g transform="' + G.posaCustode(436, 836) + '">' + G.unico(G.custode('base', 'base', {}), 'pecu') + '</g>' +
      this.giro.treno + '<g class="pe-ada"></g>' + this.giro.mano;
    const casa = '<g class="pe-casa" opacity="0"><g class="pe-casa-cam">' + G.salotto('<g class="pe-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Sul telefono arriva la risposta: Emma nuota. Al parco.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.pe-ada'); this.casa = q('.pe-casa'); this.casaCam = q('.pe-casa-cam'); this.tel = q('.pe-tel');
    this.stato = ''; this.statoTel = '';
    this.sub = G.subs(kit, [[6.6, 12.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('10', 'pesca', t);
    const G = this.G, m = this.m, T = PE_GIRO;
    m.cam.setAttribute('transform', G.camChiavi(PE_CAM, t));
    G.animaMondo(m, t + 1042);
    const g = this.giro.render(t);
    // Ada pesca a occhi chiusi, poi guarda la paperella che corre al treno.
    const pesca = t >= T.pesca.giu - 0.9 && t < T.pesca.preso + 0.9;
    const espr = pesca ? (t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa') : 'felice';
    const k = (pesca ? 'pesca' : 'quaderno') + espr + (pesca ? g.giu : 0);
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? g.giu : 0 }) + '</g>'; this.stato = k; }
    // La casa: la risposta arriva; il telefono si inclina, perplesso, e torna dritto.
    this.casa.setAttribute('opacity', seg(t, PE_CASA[0], PE_CASA[1]).toFixed(3));
    if (t > PE_CASA[0]) {
      const z = lerp(1.0, 1.12, eio(seg(t, PE_CASA[0], 14))), [bx, by] = G.SALOTTO.bolla;
      const inc = 7 * Math.sin(Math.PI * eio(seg(t, PE_INCLINA[0], PE_INCLINA[1])));
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ') rotate(' + inc.toFixed(2) + ' 950 560)');
      const arrivata = t >= PE_RISPOSTA, kk = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      if (kk !== this.statoTel) {
        this.tel.innerHTML = G.unico(G.telefono({ chat: [['io', 'Al parco Emma']].concat(arrivata ? [['ai', 'nuota']] : []), puntini: arrivata ? undefined : t }), 'petel');
        this.statoTel = kk;
      }
    }
    this.sub(t);
  },
});
