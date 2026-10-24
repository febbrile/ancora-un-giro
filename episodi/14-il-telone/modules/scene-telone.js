const { seg, eo, eio, lerp } = kit;
// Da un'altra casa arriva lo stesso indovinello, e questa volta Ada guarda dall'inizio, alla bancarella. Il treno della
// domanda esce sopra la vasca: sotto la bandierina d'ottone cadono tantissime paperelle arancio, e poche delle altre (qualche
// grigio pietra, qualche acquamarina, qualche rosa antico). Ada pesca un'arancio. La paperella corre a sedersi in fondo al
// treno, e il custode srotola un grande telone color arancio, cucito a toppe, e lo tiene pronto sopra i vagoni che verranno
// dopo di lei.
// Si apre in un'altra casa; finisce sul custode col telone pronto (la riprende «sotto»).
const TE_CASA = [0, 3.0];
const TE_GIRO = { esce: 3.2, vel: [[3.2, 700], [4.8, 700], [5.2, 80], [7.6, 80], [8.2, 360]], pesca: { giu: 8.2, su: 9.0, preso: 9.4 }, via: 9.8, salta: 9.8, vagone: 10.2, sale: 10.8 };
const TE_PRENDE = [13.0, 14.0], TE_SROTOLA = [15.4, 17.6];
const TE_CU = [520, 836];
const TE_CAM = [
  { t: 3.0, cx: 740, cy: 846, z: 3.6 },
  { t: 9.6, cx: 700, cy: 846, z: 3.6 },
  { t: 11.4, cx: 560, cy: 810, z: 3.4 },
  { t: 14.4, cx: 560, cy: 810, z: 3.4 },
  { t: 16.0, cx: 600, cy: 800, z: 4.2 },
];
kit.scene('telone', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TL = G.MOD.seconda.telone, g = TL.giusta.giri[0];
    this.chi = S2.trenoDa(g.frase, g.tratti);
    this.fermo = G.fermoTreno(g.frase.length + 1);
    this.giro = G.giro7({ id: 'te', chi: this.chi, vasca: g.vasca, seme: 241, parola: 'telone', nuovo: TL.paperelle.telone, fermo: this.fermo, t: TE_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="te-telone"></g><g class="te-cu"></g><g class="te-ada"></g>' + this.giro.mano;
    const casa = '<g class="te-casa"><g class="te-casa-cam">' + G.salotto(G.telefono({ chat: [['io', 'Chi è il più basso tra Emma, Al e Mare?']], puntini: 0.3 }), { muro: ['#1E3A40', '#2E5A58', '#4A6E5C'] }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'telone', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Questa volta Ada ha pescato una paperella arancio.') +
        G.sottotitolo('NARRATORE', 'E il custode ha steso un telone sopra i vagoni che salgono dopo di lei.') +
        G.sottotitolo('CUSTODE', 'Lo dice il regolamento: quello che sta sotto il telone, il telefono non lo vede.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.telone = q('.te-telone'); this.cu = q('.te-cu'); this.ada = q('.te-ada'); this.casa = q('.te-casa'); this.casaCam = q('.te-casa-cam');
    this.stati = {};
    this.sub = G.subs(kit, [[10.4, 15.0], [15.4, 21.6], [22.0, 29.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'telone', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m, T = TE_GIRO;
    m.cam.setAttribute('transform', G.camChiavi(TE_CAM, t));
    G.animaMondo(m, t + 2230);
    this.casa.setAttribute('opacity', (1 - seg(t, TE_CASA[1] - 0.3, TE_CASA[1])).toFixed(3));
    const z = lerp(1.04, 1.1, seg(t, 0, 3)), [bx, by] = G.SALOTTO.bolla;
    this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    const r = this.giro.render(t);
    // Il telone: piegato sul braccio del custode; poi srotolato, pronto, dopo la paperella arancio (in fondo al treno).
    const n = this.chi.length, x0 = this.fermo + (n + 1) * M.passoBanchina - 40, sr = eio(seg(t, TE_SROTOLA[0], TE_SROTOLA[1]));
    const [hx, hy] = G.puntoCustode(TE_CU[0], TE_CU[1], G.CUSTODE_MANI.porge);
    const tel = t < TE_PRENDE[0] ? '' : t < TE_SROTOLA[0] ? S2.telonePiegato(hx + 6, hy + 2, 0.9) : S2.telone(x0 - 6, x0 + 70, { srotola: 0.1 + 0.3 * sr });
    this.cambia('tel', tel, this.telone, tel);
    // Il custode arriva in fondo al treno col telone; lo srotola.
    const arriva = eio(seg(t, TE_PRENDE[0] - 1.2, TE_PRENDE[1])), posa = t >= TE_PRENDE[0] && t < TE_SROTOLA[1] ? 'porge' : t >= TE_SROTOLA[1] ? 'attacca' : 'base';
    this.cambia('cu', posa, this.cu, '<g class="te-cu-in">' + G.unico(G.custode(posa, 'serio', { occhi: 1 }), 'tecu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(lerp(380, TE_CU[0], arriva), TE_CU[1]));
    // Ada pesca a occhi chiusi; poi guarda il telone.
    const P = T.pesca, pesca = t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 15 ? 'sorpresa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    this.sub(t);
  },
});
