const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca della bancarella gemella: tante blu, quasi altrettante turchesi, qualche verde. Ada apre il
// quaderno sul disegno della sua vasca, quasi tutta blu. Il custode tondo le fa cenno di pescare. Ada pesca una turchese.
// Stacco su un'altra casa: sotto «Al mare Emma», compare «gioca».
// Si apre nella luce dell'uscita (come finisce «finestre»); finisce su Ada che pensa (la riprende «regolamento»).
const VA_GIRO = { esce: 0.4, vel: [[0.4, 600], [1.8, 600], [2.2, 80], [9.0, 80], [9.6, 360]], pesca: { giu: 10.6, su: 11.3, preso: 11.6 }, via: 12.0 };
const VA_QUADERNO = [4.6, 5.1, 8.4, 8.9];
const VA_CENNO = [9.0, 10.2];
const VA_CASA = [13.0, 13.4, 21.6, 22.0], VA_ARRIVA = 14.0;
const VA_CU = [930, 936];
const VA_CAM = [{ t: 0, cx: 740, cy: 846, z: 3.6 }, { t: 22.0, cx: 760, cy: 850, z: 3.6 }, { t: 30, cx: 720, cy: 860, z: 3.9 }];
kit.scene('vasca', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, L = G.MOD.seconda.gemello.laggiu, nostra = G.MOD.seconda.bruco.giro.vasca;
    this.giro = G.giro7({ id: 'va', chi: S2.treno(L), vasca: L.vasca, seme: 303, parola: G.MOD.seconda.gemello.pescata_laggiu, fermo: G.fermoTreno(10), t: VA_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="va-cu"></g><g class="va-ada"></g>' + this.giro.mano;
    // Il quaderno: la vasca del parco di Ada, quasi tutta blu; accanto, Ada disegna questa (dal modellino).
    const quaderno = '<g class="va-quad" opacity="0">' + G.quadernoAperto(S2.vascaDisegnata(nostra, 568, 540, 1.6, 37, 18), S2.vascaDisegnata(L.vasca, 1352, 540, 1.6, 39, 18)) + '</g>';
    const casa = '<g class="va-casa" opacity="0"><g class="va-casa-cam">' + G.salotto('<g class="va-tel"></g>', { muro: ['#3A2E1E', '#5A4630', '#6E5C3E'] }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vasca', manopola: 0, banchina: true, morto: true, gemello: true, fiume: -S2.GEMELLO.dx, bruco: 'acceso', davanti: quaderno + casa,
      html: G.sottotitolo('NARRATORE', 'Nel parco di Ada, Al mare Emma nuota. Qui, Al mare Emma gioca.') +
        G.sottotitolo('ADA', 'Stessa montagna, e un’altra risposta. Perché?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.cu = q('.va-cu'); this.ada = q('.va-ada'); this.quad = q('.va-quad'); this.casa = q('.va-casa'); this.casaCam = q('.va-casa-cam'); this.tel = q('.va-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[14.4, 20.8], [23.0, 27.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'vasca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VA_CAM, t));
    G.animaMondo(m, t + 2600);
    const r = this.giro.render(t);
    const [q0, q1, q2, q3] = VA_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    // Il custode tondo: fa cenno di pescare.
    const posa = t >= VA_CENNO[0] && t < VA_CENNO[1] ? 'cenno' : 'base';
    this.cambia('cu', posa, this.cu, '<g transform="' + G.posaCustode(VA_CU[0], VA_CU[1], 0.26) + '">' + G.unico(G.custodeGemello(posa, 'sorriso', { occhi: -1 }), 'vacu') + '</g>');
    // Ada: guarda la vasca col quaderno; pesca; poi pensa.
    const P = VA_GIRO.pesca, pesca = t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 22 ? 'pensa' : t > 3 ? 'sorpresa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // La casa: sotto «Al mare Emma», «gioca».
    const [c0, c1, c2, c3] = VA_CASA;
    this.casa.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= VA_ARRIVA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Al mare Emma']].concat(arrivata ? [['ai', 'gioca']] : []), puntini: arrivata ? undefined : t }), 'vatel'));
      const z = lerp(1.04, 1.1, seg(t, c0, c3)), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
