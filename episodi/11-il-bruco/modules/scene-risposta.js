const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca: sotto la bandierina blu cadono tantissime paperelle blu, qualche turchese. Ada pesca una
// blu, e la paperella corre sul treno. Ma la risposta non vola subito al telefono: il custode prende i biglietti della
// risposta, «Al mare Emma nuota», e li porta al Bruco. Quattro biglietti verdi, un giro nella mela, paperelle quasi tutte
// verdi. La sbarra resta su, e la striscia vola via. Stacco: sul telefono, sotto «Al mare Emma», compare «nuota».
// Si apre nella luce dell'uscita (come finisce «finestre»); finisce nel salotto (la riprende «lupo», in una cameretta).
const RI_ESCE = { esce: 0.4, vel: [[0.4, 300], [1.8, 300], [2.3, 60], [4.2, 60], [4.8, 260]], pesca: { giu: 4.6, su: 5.4, preso: 5.8 }, via: 6.2, salta: 6.2, vagone: 6.8, sale: 7.4 };
const RI_VIA = [8.6, 10.6];
const RI_CU = [1120, 1032], RI_ADA = [1070, 1052];
const RI_BRUCO = { sale: 11.0, passo: 0.5, parte: 13.2, giro: 4.6, carta: 18.6 };
const RI_VOLA = [20.2, 22.2];
const RI_CASA = [22.2, 22.6], RI_RISPOSTA = 23.2;
const RI_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 8.39, cx: 700, cy: 846, z: 3.6 },
  { t: 8.4, cx: 760, cy: 860, z: 2.4 },
  { t: 10.79, cx: 900, cy: 860, z: 2.4 },
  { t: 10.8, cx: 1224, cy: 998, z: 3.0 },
  { t: 18.0, cx: 1224, cy: 998, z: 3.0 },
  { t: 19.0, cx: 1174, cy: 1026, z: 4.0 },
  { t: 20.4, cx: 1174, cy: 1026, z: 4.0 },
  { t: 22.6, cx: 954, cy: 906, z: 2.2 },
];
kit.scene('risposta', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, GIRO = G.MOD.seconda.bruco.giro, F = G.MOD.seconda.bruco.frasi.risposta;
    const nuota = G.MOD.finisce.passeggeri.nuota.biglietto;
    this.esce = G.giro7({ id: 'ri', chi: S2.treno(GIRO), vasca: GIRO.vasca, seme: 141, parola: 'nuota', nuovo: nuota, fermo: G.fermoTreno(10), t: RI_ESCE });
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.mano = G.puntoCustode(RI_CU[0], RI_CU[1], G.CUSTODE_MANI.porge);
    this.giro = S2.giroBruco({ id: 'rib', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 65, mano: this.mano, riporta: () => this.mano, t: RI_BRUCO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.esce.treno + gio.dietro + this.giro.bruco + gio.davanti + '<g class="ri-ada"></g><g class="ri-cu"></g><g class="ri-big"></g>' + this.esce.mano + this.giro.biglietti +
      '<g class="ri-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma nuota', 300) + '</g></g>';
    const casa = '<g class="ri-casa" opacity="0"><g class="ri-casa-cam">' + G.salotto('<g class="ri-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'risposta', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Anche la risposta, prima di arrivare al telefono, fa un giro sul Bruco.') +
        G.sottotitolo('ADA', 'Verde! Può andare.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.esce.papere);
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.esce.monta(this.m); this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.ri-ada'); this.cu = q('.ri-cu'); this.bigEl = q('.ri-big'); this.striscia = q('.ri-striscia');
    this.casa = q('.ri-casa'); this.casaCam = q('.ri-casa-cam'); this.tel = q('.ri-tel');
    this.bigHtml = F.frase.map((w, i) => '<g transform="translate(' + (i * 3) + ' ' + (-i * 2) + ') rotate(' + (-12 + 8 * i) + ') scale(.13) translate(-60 -30)">' + G.biglietto(w) + '</g>');
    this.stati = {};
    this.sub = G.subs(kit, [[9.0, 15.4], [19.4, 21.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'risposta', t);
    const G = this.G, m = this.m, T = RI_BRUCO;
    m.cam.setAttribute('transform', G.camChiavi(RI_CAM, t));
    G.animaMondo(m, t + 1580);
    const r = this.esce.render(t);
    this.giro.render(t);
    // Il custode: alla vasca grande raccoglie i biglietti della risposta e se ne va; al Bruco li fa salire, se li riprende,
    // e lascia volare la striscia.
    const alBruco = t >= 10.8;
    const va = eio(seg(t, RI_VIA[0], RI_VIA[1]));
    const cx = alBruco ? RI_CU[0] : lerp(760, 1000, va), cy = alBruco ? RI_CU[1] : 930;
    const cammina = !alBruco && va > 0 && va < 1, dond = Math.round(6 * Math.sin(t * 2));
    // Durante l'uscita il custode non c'è: arriva a prendere i biglietti della risposta.
    this.cambia('cu', t < 8.0 ? 'no' : 'porge' + dond, this.cu, t < 8.0 ? '<g></g>' : '<g class="ri-cu-in">' + G.unico(G.custode('porge', 'serio', { occhi: alBruco ? 1 : -1, dondolo: dond }), 'ricu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0)));
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    const rimasti = t < 8.0 ? [] : this.bigHtml.filter((h, i) => t < T.sale + i * T.passo);
    this.cambia('big', rimasti.length, this.bigEl, rimasti.join(''));
    this.bigEl.setAttribute('transform', 'translate(' + hx.toFixed(1) + ' ' + (hy - 3).toFixed(1) + ')');
    // La striscia della risposta vola via, verso la città.
    const v = eio(seg(t, RI_VOLA[0], RI_VOLA[1]));
    this.striscia.setAttribute('opacity', (seg(t, RI_VOLA[0] - 0.2, RI_VOLA[0]) * (1 - seg(v, 0.85, 1))).toFixed(3));
    this.striscia.setAttribute('transform', 'translate(' + lerp(this.mano[0], this.mano[0] - 420, v).toFixed(1) + ' ' + (lerp(this.mano[1], this.mano[1] - 360, v) - 40 * Math.sin(Math.PI * v)).toFixed(1) + ') rotate(' + (-12 * v).toFixed(1) + ') scale(' + lerp(0.14, 0.08, v).toFixed(3) + ')');
    // Ada: pesca alla vasca grande; poi, al Bruco, guarda le verdi.
    let ax = 672, ay = 896, posa = 'quaderno', espr = 'felice', giu = 0;
    const P = RI_ESCE.pesca;
    if (t >= P.giu - 0.9 && t < P.preso + 0.9) { posa = 'pesca'; espr = t < P.preso + 0.1 ? 'chiusi' : 'sorpresa'; giu = r.giu; }
    if (alBruco) { ax = RI_ADA[0]; ay = RI_ADA[1]; posa = 'base'; espr = t < 17 ? 'base' : 'felice'; }
    this.cambia('ada', posa + espr + giu + alBruco, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(posa, espr, { giu }) + '</g>');
    // La casa: la risposta arriva.
    this.casa.setAttribute('opacity', seg(t, RI_CASA[0], RI_CASA[1]).toFixed(3));
    if (t > RI_CASA[0]) {
      const arrivata = t >= RI_RISPOSTA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Al mare Emma']].concat(arrivata ? [['ai', 'nuota']] : []), puntini: arrivata ? undefined : t }), 'ritel'));
      const z = lerp(1.0, 1.08, seg(t, RI_CASA[0], 27)), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
