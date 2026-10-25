const { seg, eo, eio, lerp } = kit;
// Il custode fa salire i tre biglietti sul Bruco, uno per segmento. Sul Bruco i passeggeri prendono vita, ma con i colori
// del Bruco: ognuno ha un vestito tra il verde e il rosso; il primo è di un verde spento, il secondo verde, il terzo rosso
// fuoco. Il Bruco entra nella mela, ne esce, e sotto l'ultimo segmento cadono le paperelle: quasi tutte rosse, una sola
// verde. Il custode le conta, sfiorandole con il dito. La sbarra si abbassa con un clonc. Il custode apre il regolamento,
// stacca un biglietto già scritto e lo lascia volare via, verso la città. I biglietti sul Bruco tornano di carta, e il
// vento se li porta via.
// Si apre sul Bruco, come finisce «bruco»; finisce su Ada che guarda verso la stazione (la riprende «grande»).
const RS_GIRO = { sale: 0.8, passo: 0.9, parte: 5.0, giro: 6.0, carta: 19.0 };
const RS_CU = [1120, 1032], RS_CONTA = [1188, 1076], RS_ADA = [1070, 1052];
const RS_VA = [11.0, 12.2], RS_DITO = [12.4, 14.6];
const RS_CLONC = 15.2;
const RS_LEGGE = [16.0, 19.4], RS_STACCA = 17.4, RS_VOLA = [17.8, 20.6];
const RS_CAM = [
  { t: 0, cx: 1244, cy: 992, z: 3.4 },
  { t: 4.6, cx: 1244, cy: 992, z: 3.4 },
  { t: 6.0, cx: 1290, cy: 976, z: 2.6 },
  { t: 10.8, cx: 1290, cy: 976, z: 2.6 },
  { t: 12.0, cx: 1250, cy: 1048, z: 6.4 },
  { t: 14.6, cx: 1250, cy: 1048, z: 6.4 },
  { t: 15.0, cx: 1114, cy: 1016, z: 3.4 },
  { t: 17.2, cx: 1144, cy: 1026, z: 4.2 },
  { t: 19.0, cx: 1144, cy: 1026, z: 4.2 },
  { t: 20.4, cx: 1204, cy: 996, z: 2.8 },
  { t: 21.0, cx: 1104, cy: 1026, z: 4.6 },
];
kit.scene('rosso', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, B = S2.BRUCO, F = G.MOD.seconda.bruco.frasi.parolaccia;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.mano = G.puntoCustode(RS_CU[0], RS_CU[1], G.CUSTODE_MANI.porge);
    this.giro = S2.giroBruco({ id: 'rs', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 61, mano: this.mano, t: RS_GIRO });
    const ombra = '<defs><radialGradient id="g-rs-buio"><stop offset="0" stop-color="#05070F" stop-opacity=".1"/><stop offset=".7" stop-color="#05070F" stop-opacity=".14"/><stop offset="1" stop-color="#05070F" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="' + (B.c[0] + 20) + '" cy="' + (B.c[1] - 10) + '" rx="440" ry="240" fill="url(#g-rs-buio)"/>';
    const sopra = gio.dietro + this.giro.bruco + gio.davanti + ombra + '<g class="rs-ada"></g><g class="rs-cu"></g><g class="rs-big"></g>' + this.giro.biglietti +
      '<g class="rs-pronto" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Di questo, qui, non si parla.', 300) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'rosso', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Il custode fa fare un giro alla frase sul Bruco, prima che sul treno grande.') +
        G.sottotitolo('NARRATORE', 'Le paperelle escono quasi tutte rosse. Il custode le conta, e la sbarra si abbassa.') +
        G.sottotitolo('ADA', 'E il treno grande?'),
    });
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.rs-ada'); this.cu = q('.rs-cu'); this.bigEl = q('.rs-big'); this.asta = q('.g-bruco-asta'); this.pronto = q('.rs-pronto');
    this.bigHtml = F.frase.map((w, i) => '<g transform="translate(' + (i * 3) + ' ' + (-i * 2) + ') rotate(' + (-12 + 8 * i) + ') scale(.13) translate(-60 -30)">' + G.biglietto(w) + '</g>');
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 7.4], [12.0, 19.0], [21.2, 23.4]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'rosso', t);
    const G = this.G, S2 = G.S2, m = this.m, T = RS_GIRO;
    m.cam.setAttribute('transform', G.camChiavi(RS_CAM, t));
    G.animaMondo(m, t + 1460);
    this.giro.render(t);
    // La sbarra: clonc, giù.
    this.asta.setAttribute('transform', S2.astaBruco(eio(seg(t, RS_CLONC - 0.35, RS_CLONC)) - 0.06 * Math.sin(Math.PI * seg(t, RS_CLONC, RS_CLONC + 0.3))));
    // Il custode: fa salire i biglietti; guarda il giro; va alla vasca e conta col dito; apre il regolamento e stacca il
    // biglietto già scritto; lo lascia volare.
    const va = eio(seg(t, RS_VA[0], RS_VA[1])), cammina = va > 0 && va < 1;
    const cx = lerp(RS_CU[0], RS_CONTA[0], va), cy = lerp(RS_CU[1], RS_CONTA[1], va) - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0);
    let posa = 'porge', espr = 'serio', occhi = 1;
    if (t >= RS_DITO[0] && t < RS_DITO[1]) { posa = 'porge'; occhi = 1; }
    else if (t >= RS_LEGGE[0] && t < RS_LEGGE[1]) { posa = 'legge'; occhi = 0; }
    else if (t >= RS_LEGGE[1]) { posa = 'base'; espr = 'base'; occhi = -1; }
    const dito = t > RS_DITO[0] && t < RS_DITO[1] ? Math.round(Math.abs(Math.sin((t - RS_DITO[0]) * 6)) * 4) / 4 : 0, dond = Math.round(6 * Math.sin(t * 2));
    this.cambia('cu', posa + espr + occhi + dond, this.cu, '<g class="rs-cu-in">' + G.unico(G.custode(posa, espr, { occhi, dondolo: dond }), 'rscu') + '</g>');
    // Mentre conta si china un poco verso la vasca, e la mano tesa scende e sale, una paperella dopo l'altra.
    const china = t > RS_DITO[0] - 0.3 && t < RS_DITO[1] + 0.3 ? 8 * eio(seg(t, RS_DITO[0] - 0.3, RS_DITO[0])) * (1 - eio(seg(t, RS_DITO[1], RS_DITO[1] + 0.3))) + 2 * dito : 0;
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy) + ' rotate(' + (-china + (cammina ? 2 * Math.sin(t * 6) : 0)).toFixed(2) + ' 120 410)');
    // I biglietti in mano, finché non volano sul Bruco.
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge), rimasti = this.bigHtml.filter((h, i) => t < T.sale + i * T.passo);
    this.cambia('big', rimasti.length + posa, this.bigEl, posa === 'porge' ? rimasti.join('') : '');
    this.bigEl.setAttribute('transform', 'translate(' + hx.toFixed(1) + ' ' + (hy - 3).toFixed(1) + ')');
    // Il biglietto già scritto: staccato dal regolamento, vola via verso la città.
    const v = eio(seg(t, RS_VOLA[0], RS_VOLA[1])), [lx, ly] = G.puntoCustode(cx, cy, [120, 262]);
    this.pronto.setAttribute('opacity', (seg(t, RS_STACCA, RS_STACCA + 0.3) * (1 - seg(v, 0.8, 1))).toFixed(3));
    this.pronto.setAttribute('transform', 'translate(' + lerp(lx, lx - 520, v).toFixed(1) + ' ' + (lerp(ly - 4, ly - 420, v) - 30 * Math.sin(Math.PI * v)).toFixed(1) + ') rotate(' + (-14 * v + 6 * Math.sin(t * 6) * v).toFixed(1) + ') scale(' + lerp(0.15, 0.08, v).toFixed(3) + ')');
    // Ada: guarda il giro; poi le paperelle rosse; poi si gira verso la stazione.
    const espr2 = t < T.parte ? 'felice' : t < 11 ? 'sorpresa' : t < 20.6 ? 'base' : 'pensa';
    this.cambia('ada', espr2, this.ada, '<g transform="' + G.posaAda(RS_ADA[0], RS_ADA[1]) + '">' + (t > 20.6 ? G.adaGira('base', espr2, {}, -24) : G.ada('base', espr2)) + '</g>');
    this.sub(t);
  },
});
