const { seg, eo, eio, lerp } = kit;
// A montaggio, sempre più veloce. Esce la paperella blu, nell'ultimo vagone: sotto di lei cadono tante rosa salmone. Ada ne
// pesca una. Tic. Esce la rosa: tante turchesi, parecchie verdi. Ada pesca una turchese. Tic. Esce la turchese: tante
// rosa, quasi altrettante grigie, e qualche scura. Ada pesca una rosa. Tic. Sul telefono la storia cresce: «nuota e»,
// «nuota e gioca», «nuota e gioca e». L'orologio sta in un angolo, e la lancetta scatta di una tacca a ogni pesca.
// Si apre sull'orologio (come finisce «primo»); finisce sulla paperella rosa in mano ad Ada (la riprende «campanella»).
const GI_A = [1.0, 9.4, 17.0];
const GI_LAPS = GI_A.map((a, k) => ({
  esce: a, vel: [[a, 700], [a + 1.4, 700], [a + 1.8, 90], [a + 3.2, 90], [a + 3.6, 400]],
  pesca: { giu: a + 3.4, su: a + 4.1, preso: a + 4.4 }, via: a + 4.8,
  salta: k < 2 ? a + 4.8 : undefined, vagone: k < 2 ? a + 5.2 : undefined, sale: k < 2 ? a + 5.7 : undefined,
}));
const GI_TIC = GI_LAPS.map(T => T.pesca.preso + 0.5);
const GI_TEL = GI_LAPS.map(T => [T.pesca.preso + 1.4, T.pesca.preso + 2.8]);
const GI_PAROLE = ['nuota e', 'nuota e gioca', 'nuota e gioca e'];
const GI_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
];
kit.scene('giri', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella;
    // Il colore del biglietto di ogni parola pescata: dal treno di «continua», dove salgono tutte.
    const bigl = {};
    K.seguito[0].passeggeri.forEach(p => { bigl[p.parola] = p.biglietto; });
    const nuovi = [bigl[K.giri[1].pescata], bigl[K.giri[2].pescata]];
    this.giri = [1, 2, 3].map((k, j) => G.giro7({ id: 'g' + j, chi: S2.trenoDa(K.giri[k].frase, K.giri[k].tratti), vasca: K.giri[k].vasca, seme: 221 + 2 * j,
      parola: K.giri[k].pescata, nuovo: j < 2 ? nuovi[j] : undefined, fermo: G.fermoTreno(K.giri[k].frase.length + 1), t: GI_LAPS[j] }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giri.map(g => g.treno).join('') + '<g class="gi-ada"></g><g transform="' + G.posaCustode(930, 936) + '">' + G.unico(G.custode('orologio', 'serio', { occhi: -1, campanella: true }), 'gicu') + '</g>' +
      this.giri.map(g => g.mano).join('');
    const orologio = '<g class="gi-orologio"><circle cx="1720" cy="250" r="190" fill="#141026" opacity=".7" filter="url(#g-soft)"/><g transform="translate(1720 270) scale(.95)"><g class="gi-quadrante"></g></g></g>';
    const casa = '<g class="gi-casa" opacity="0"><g class="gi-casa-cam">' + G.salotto('<g class="gi-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'giri', manopola: 0, banchina: true, morto: true, davanti: casa + orologio,
      html: G.sottotitolo('NARRATORE', 'Ada pesca, il treno riparte, e la storia sul telefono si allunga.') +
        G.sottotitolo('ADA', 'Una rosa! La storia va avanti.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.giri.forEach(g => g.monta(this.m));
    this.G = G;
    const q = this.m.q;
    this.ada = q('.gi-ada'); this.quadrante = q('.gi-quadrante'); this.orologio = q('.gi-orologio');
    this.casa = q('.gi-casa'); this.casaCam = q('.gi-casa-cam'); this.tel = q('.gi-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[1.2, 8.6], [22.0, 25.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'giri', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GI_CAM, t));
    G.animaMondo(m, t + 2040);
    const quale = t < GI_A[1] - 0.2 ? 0 : t < GI_A[2] - 0.2 ? 1 : 2;
    let r = { giu: 0 };
    this.giri.forEach((g, k) => { const rr = g.render(k === quale ? t : -100); if (k !== quale) g.vag.forEach(v => v.setAttribute('opacity', 0)); else r = rr; });
    const T = GI_LAPS[quale], P = T.pesca;
    const pesca = t >= P.giu - 0.7 && (t < P.preso + 0.7 || quale === 2);
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'felice') : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // L'orologio, nell'angolo: tic, una tacca a ogni pesca (la prima l'ha già fatta il primo giro).
    let l = 0.25;
    GI_TIC.forEach(a => { l += 0.25 * eo(seg(t, a, a + 0.12)); });
    l = Math.round(l * 100) / 100;
    this.cambia('q', l, this.quadrante, S2.orologio({ lancetta: l }));
    // Il telefono: una parola in più dopo ogni pesca.
    const k = GI_TEL.findIndex(([a, b]) => t >= a - 0.2 && t < b + 0.2), c = GI_TEL[k];
    this.casa.setAttribute('opacity', c ? (seg(t, c[0] - 0.15, c[0]) * (1 - seg(t, c[1] - 0.15, c[1]))).toFixed(3) : 0);
    this.orologio.setAttribute('opacity', c ? (1 - seg(t, c[0] - 0.15, c[0]) * (1 - seg(t, c[1] - 0.15, c[1]))).toFixed(3) : 1);
    if (c) {
      const testo = t < c[0] + 0.5 ? (k ? GI_PAROLE[k - 1] : 'nuota') : GI_PAROLE[k];
      this.cambia('tel', testo + (Math.round(t * 30) / 30).toFixed(3), this.tel, G.unico(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', testo]], puntini: t }), 'gitel'));
      const z = 1.12, [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')');
    }
    this.sub(t);
  },
});
