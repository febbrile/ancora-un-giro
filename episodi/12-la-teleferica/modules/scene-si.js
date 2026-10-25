const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca: sotto «pioggia» cadono tantissime paperelle bianche, poche marroni, qualcuna d'altri
// colori. Ada pesca una bianca, e la paperella corre sul treno. Al giro dopo la vasca è piena di paperelle scure: Ada pesca
// la Fine, e il fanale si spegne. Stacco: sul telefono, sotto «Domani piove?», compare «Sì». La persona prende l'ombrello
// dall'attaccapanni e lo appoggia vicino al divano.
// Si apre nella luce dell'uscita (come finisce «finestre»); finisce su Ada alla bancarella (la riprende «sole»).
// Il treno è lungo: l'ultimo vagone arriva sopra la vasca solo dopo un bel pezzo.
const SI_A = { esce: 0.4, vel: [[0.4, 520], [2.6, 520], [3.0, 70], [5.6, 70], [6.2, 280]], pesca: { giu: 6.6, su: 7.4, preso: 7.8 }, via: 8.2, salta: 8.2, vagone: 8.8, sale: 9.4 };
const SI_B = { esce: 10.4, vel: [[10.4, 560], [12.6, 560], [13.0, 70], [15.4, 70], [16.0, 300]], pesca: { giu: 16.0, su: 16.8, preso: 17.2 }, via: 17.8 };
const SI_FANALE = [17.8, 18.8];
const SI_CASA = [19.4, 19.8, 26.0, 26.4], SI_RISPOSTA = 20.2, SI_OMBRELLO = [22.6, 24.2];
const SI_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 10.2, cx: 700, cy: 846, z: 3.6 },
  { t: 16.8, cx: 700, cy: 846, z: 3.6 },
  { t: 18.2, cx: 420, cy: 800, z: 2.2 },
  { t: 26.4, cx: 700, cy: 860, z: 4.4 },
];
kit.scene('si', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TE = G.MOD.seconda.teleferica, PA = TE.paperelle;
    const g3 = TE.pioggia[3], g4 = TE.pioggia[4];
    this.chiB = S2.trenoDa(g4.frase, g4.tratti);
    this.a = G.giro7({ id: 'a', chi: S2.trenoDa(g3.frase, g3.tratti), vasca: g3.vasca, seme: 181, parola: 'Sì', nuovo: PA['Sì'], fermo: G.fermoTreno(17), t: SI_A });
    this.b = G.giro7({ id: 'b', chi: this.chiB, vasca: g4.vasca, seme: 183, parola: 'Fine', fermo: G.fermoTreno(17), t: SI_B });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.a.treno + this.b.treno + '<g class="si-ada"></g>' + this.a.mano + this.b.mano;
    // La casa, con l'attaccapanni e l'ombrello.
    const attaccapanni = '<path d="M1830 300 L1830 900 M1790 900 L1870 900 M1800 320 L1860 320" stroke="' + C.legnoScuro + '" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="1830" cy="296" r="12" fill="' + C.legno + '"/>';
    const ombrello = '<g class="si-ombrello"><path d="M0 -150 Q-70 -150 -80 -60 Q-60 -80 -40 -60 Q-20 -80 0 -60 Q20 -80 40 -60 Q60 -80 80 -60 Q70 -150 0 -150 Z" fill="#3E6FB8" stroke="#284C84" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M0 -150 L0 40 Q0 64 -22 60" stroke="#3A2A30" stroke-width="9" fill="none" stroke-linecap="round"/></g>';
    const casa = '<g class="si-casa" opacity="0"><g class="si-casa-cam">' + G.salotto('<g class="si-tel"></g>') + attaccapanni + ombrello + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'si', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Sul telefono arriva la risposta. E questa volta viene da oltre le colline.') +
        G.sottotitolo('ADA', 'La pioggia l’ha presa la teleferica!'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.a.papere + this.b.papere);
    this.a.monta(this.m); this.b.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.si-ada'); this.casa = q('.si-casa'); this.casaCam = q('.si-casa-cam'); this.tel = q('.si-tel'); this.ombrello = q('.si-ombrello');
    this.lampadine = this.m.qa('.g-lampadina').map(el => ({ el, x: +el.getAttribute('cx') }));
    this.stati = {};
    this.sub = G.subs(kit, [[19.8, 26.0], [26.6, 29.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'si', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(SI_CAM, t));
    G.animaMondo(m, t + 1800);
    const primo = t < SI_B.esce - 0.1;
    const ra = this.a.render(primo ? t : -100), rb = this.b.render(primo ? -100 : t);
    if (!primo) this.a.vag.forEach(v => v.setAttribute('opacity', 0)); else this.b.vag.forEach(v => v.setAttribute('opacity', 0));
    // Il fanale del primo vagone si spegne, quando Ada pesca la Fine.
    const fan = Math.round((1 - eio(seg(t, SI_FANALE[0], SI_FANALE[1]))) * 10) / 10;
    if (!primo && String(fan) !== this.stati.fan) {
      const c = this.chiB[0];
      this.b.vag[0].querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: fan }, '<g class="g-pass">' + G.passeggero(c.tipo, c.biglietto, c.o) + '</g>');
      this.stati.fan = String(fan);
    }
    // Ada: pesca la bianca, poi la Fine (che le resta in mano).
    const T = primo ? SI_A : SI_B, r = primo ? ra : rb;
    const pesca = t >= T.pesca.giu - 0.8 && t < T.pesca.preso + 0.8;
    const espr = pesca ? (t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 26.2 ? 'felice' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // La casa: la risposta; l'ombrello passa dall'attaccapanni al divano.
    const [c0, c1, c2, c3] = SI_CASA;
    this.casa.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= SI_RISPOSTA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Domani piove?']].concat(arrivata ? [['ai', 'Sì']] : []), puntini: arrivata ? undefined : t }), 'sitel'));
      const u = eio(seg(t, SI_OMBRELLO[0], SI_OMBRELLO[1]));
      this.ombrello.setAttribute('transform', 'translate(' + lerp(1866, 520, u).toFixed(1) + ' ' + (lerp(470, 800, u) - 120 * Math.sin(Math.PI * u)).toFixed(1) + ') rotate(' + lerp(0, -14, u).toFixed(1) + ')');
      const z = lerp(1.0, 1.04, seg(t, c0, c3));
      this.casaCam.setAttribute('transform', 'translate(' + (960 - 960 * z).toFixed(2) + ' ' + (540 - 540 * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
