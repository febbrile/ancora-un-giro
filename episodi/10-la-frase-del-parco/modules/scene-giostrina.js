const { seg, eo, eio, lerp } = kit;
// Arriva un'altra striscia. Il custode la prende, ma questa volta non la porta allo Spezzaparole: si gira e se ne va con
// la lanterna, lontano dalla stazione, verso un angolo buio del parco. Laggiù, oltre la montagna grande, si intravede una
// giostrina che Ada non aveva mai notato (il Bruco: lo si presenta nell'episodio dopo). Ada si alza in punta di piedi.
// Cartello: «Fine».
// Si apre alla stazione; finisce sul parco intero, con la giostrina laggiù nel buio.
const GS_CU = [436, 836];
const GS_VOLO = [0.4, 2.6];
const GS_GIRA = 3.0, GS_CAMMINA = [3.4, 10.6];
const GS_PUNTA = 11.6;
const GS_FINE = 16.4;
const GS_CAM = [
  { t: 0, cx: 420, cy: 760, z: 2.6 },
  { t: 2.8, cx: 440, cy: 790, z: 3.0 },
  { t: 4.2, cx: 760, cy: 780, z: 1.7 },
  { t: 9.6, cx: 1840, cy: 780, z: 1.7 },
  { t: 10.8, cx: 2150, cy: 820, z: 2.0 },
  { t: 11.4, cx: 520, cy: 790, z: 3.6 },
  { t: 13.0, cx: 520, cy: 790, z: 3.6 },
  { t: 15.4, cx: 1450, cy: 700, z: 0.88 },
];
// La strada del custode: giù dalla banchina, davanti alla vasca, ai piedi della montagna, fino alla giostrina.
const GS_STRADA = [[436, 836], [600, 836], [660, 900], [900, 932], [1500, 924], [1800, 900], [2010, 884]];
function gsBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('giostrina', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, B = S2.BRUCO;
    const gio = S2.giostrina({ sbarra: 0, luci: 0.25 });
    let segmenti = '';
    for (let i = 0; i <= B.segmenti; i++) {
      const a = Math.PI * 0.62 - i * 0.16;
      segmenti += '<g transform="translate(' + (B.c[0] + B.rx * Math.cos(a)).toFixed(1) + ' ' + (B.c[1] + B.ry * Math.sin(a)).toFixed(1) + ')">' + S2.segmento(i === 0) + '</g>';
    }
    // L'angolo buio: la giostrina si intravede appena, finché non arriva la lanterna.
    const buio = '<defs><radialGradient id="g-gs-buio"><stop offset="0" stop-color="#05070F" stop-opacity=".45"/><stop offset=".7" stop-color="#05070F" stop-opacity=".62"/><stop offset="1" stop-color="#05070F" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="' + (B.c[0] + 20) + '" cy="' + (B.c[1] - 10) + '" rx="420" ry="230" fill="url(#g-gs-buio)"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="gs-treno">' + G.treno(Array.from({ length: 19 }, () => ({})), { sbarra: 0 }) + '</g>' +
      gio.dietro + segmenti + gio.davanti + buio + '<g class="gs-ada"></g><g class="gs-cu"></g><g class="gs-nastro"></g>';
    const fine = '<g class="gs-fine" opacity="0"><g transform="translate(960 300)"><g class="gs-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'giostrina', manopola: 0, banchina: true, morto: true, davanti: fine,
      html: G.sottotitolo('NARRATORE', 'Poi il custode prende una striscia, e invece di portarla al treno, la porta lontano.') +
        G.sottotitolo('ADA', 'E quella, dove va?'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.gs-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 640 - G.fermoTreno(20), null, M.passoBanchina);
    this.ada = q('.gs-ada'); this.cu = q('.gs-cu'); this.nastroEl = q('.gs-nastro');
    this.fine = q('.gs-fine'); this.insegna = q('.gs-insegna');
    this.strada = G.linea(GS_STRADA);
    const [hx, hy] = G.puntoCustode(GS_CU[0], GS_CU[1], G.CUSTODE_MANI.porge), pts = [];
    for (let i = 0; i <= 100; i++) pts.push(gsBez([[-300, 320], [-60, 320], [200, 560], [hx, hy]], i / 100));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[3.4, 10.4], [12.6, 15.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('10', 'giostrina', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GS_CAM, t));
    G.animaMondo(m, t + 1300);
    // Il custode: prende la striscia; si gira e se ne va verso l'angolo buio, con la lanterna e la striscia in mano.
    const u = eio(seg(t, GS_CAMMINA[0], GS_CAMMINA[1])), [cx, cy] = this.strada.at(u * this.strada.lung);
    const cammina = u > 0 && u < 1, passo = cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0;
    const posa = t >= GS_VOLO[1] - 0.5 ? 'porge' : 'base', occhi = t < GS_VOLO[1] ? -1 : t < GS_GIRA ? 1 : -1;
    const dond = Math.round(8 * Math.sin(t * 3));
    this.cambia('cu', posa + occhi + dond, this.cu, '<g class="gs-cu-in">' + G.unico(G.custode(posa, 'base', { occhi, dondolo: dond }), 'gscu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy - passo) + (cammina ? ' rotate(' + (2 * Math.sin(t * 6)).toFixed(2) + ' 120 410)' : ''));
    // La striscia: vola fino alla mano del custode, poi resta lì, arrotolata nel pugno, mentre lui cammina.
    const [hx, hy] = G.puntoCustode(cx, cy - passo, G.CUSTODE_MANI.porge);
    let nastro = '';
    if (t >= GS_VOLO[0] && t < GS_VOLO[1]) {
      const L = this.volo.lung, A = L * eo(seg(t, GS_VOLO[0], GS_VOLO[1]));
      nastro = G.nastro(this.volo, A - 140, A, [], 14, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / 140 });
    } else if (t >= GS_VOLO[1]) nastro = '<g transform="translate(' + hx.toFixed(1) + ' ' + (hy + 2).toFixed(1) + ') scale(.12)">' + G.rotolo() + '</g>';
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    // Ada: guarda il custode andare via; si alza in punta di piedi.
    const punta = eio(seg(t, GS_PUNTA, GS_PUNTA + 0.5)) * (1 - eio(seg(t, GS_FINE - 0.4, GS_FINE + 0.4)));
    const espr = t < GS_GIRA ? 'base' : t < GS_PUNTA ? 'sorpresa' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g class="gs-ada-in">' + G.ada('base', espr) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(520, M.ada[1] - 5 * punta));
    // Il cartello.
    const f = eo(seg(t, GS_FINE, GS_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > GS_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
