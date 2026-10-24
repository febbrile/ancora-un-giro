const { seg, eo, eio, lerp } = kit;
// Ada torna di corsa alla stazione. Da un'altra casa arriva la stessa frase, «Al parco Emma», e di nuovo la prende il
// custode. Questa volta Ada guarda bene. Il custode apre il regolamento su una pagina nuova (una bandierina d'oro, una
// striscia con le onde: nessuna scritta), tira fuori dal taschino una striscia già scritta, «Storie di mare», con davanti
// una bandierina d'oro, e la attacca in testa alla striscia. Davanti ad «Al parco Emma» mette una bandierina d'argento;
// in fondo, una d'ottone. Poi alza gli occhi sopra gli occhiali a mezzaluna.
// Si apre sulla bancarella, con Ada che corre via; finisce sul custode con la striscia intera (la riprende «salgono»).
const PG_CU = [436, 836];
const PG_CORRE = [0.4, 2.2];
const PG_VOLO = [2.6, 5.0];
const PG_APRE = [6.0, 6.6], PG_LIBRO = [6.8, 7.3, 10.2, 10.7], PG_CHIUDE = 10.8;
const PG_TASCHINO = [11.0, 12.6];
const PG_ATTACCA = 12.8;
// Quando si attaccano i pezzi: la frase del parco in testa, la bandierina d'argento, quella d'ottone.
const PG_PEZZI = [13.4, 14.8, 16.0];
const PG_ALZA = 17.0;
const PG_CAM = [
  { t: 0, cx: 640, cy: 830, z: 3.0 },
  { t: 2.4, cx: 470, cy: 790, z: 3.0 },
  { t: 2.6, cx: 380, cy: 720, z: 2.2 },
  { t: 5.2, cx: 452, cy: 790, z: 4.0 },
  { t: 6.4, cx: 440, cy: 790, z: 6.0 },
  { t: 12.6, cx: 440, cy: 792, z: 6.0 },
  { t: 13.4, cx: 442, cy: 790, z: 7.2 },
  { t: 16.8, cx: 442, cy: 790, z: 7.2 },
  { t: 18.6, cx: 452, cy: 782, z: 5.0 },
  { t: 27.2, cx: 452, cy: 782, z: 5.0 },
  { t: 29.0, cx: 446, cy: 792, z: 6.6 },
];
// La striscia intera: la frase del parco con la sua bandierina d'oro, la bandierina d'argento, il messaggio, quella d'ottone.
const PG_STRISCIA = ['⚑oro', 'Storie', 'di', 'mare', '⚑argento', 'Al', 'parco', 'Emma', '⚑ottone'];
function pgBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('pagina', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO;
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pg-treno">' + G.treno([{}, {}, {}, {}, {}, {}, {}, {}, {}], { sbarra: 0 }) + '</g>' +
      '<g class="pg-cu"></g><g class="pg-ada"></g><g class="pg-nastro"></g><g class="pg-scint" opacity="0">' + [0, 1, 2, 3, 4, 5, 6, 7].map(() => '<circle r="1.1" fill="' + C.luce + '"/>').join('') + '</g>';
    // Il regolamento da vicino: la pagina nuova.
    const libro = '<g class="pg-libro" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/>' +
      '<circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>' +
      '<g class="pg-libro-cam"><g transform="translate(960 560) scale(7.4) translate(-120 -262)">' + G.libroAperto(120, 262, 'frase') + '</g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pagina', manopola: 0, banchina: true, morto: true, bruco: 'buio', davanti: libro,
      html: G.sottotitolo('CUSTODE', 'Da stasera, in questo parco, si raccontano storie di mare.') +
        G.sottotitolo('ADA', 'Perché?') +
        G.sottotitolo('CUSTODE', 'Lo dice il regolamento.') +
        G.sottotitolo('NARRATORE', 'È la frase del parco. Il custode la attacca in testa a ogni striscia.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.pg-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 640 - G.fermoTreno(10), null, M.passoBanchina);
    this.cu = q('.pg-cu'); this.ada = q('.pg-ada'); this.nastroEl = q('.pg-nastro'); this.scint = q('.pg-scint');
    this.libro = q('.pg-libro'); this.libroCam = q('.pg-libro-cam');
    this.mano = G.puntoCustode(PG_CU[0], PG_CU[1], G.CUSTODE_MANI.porge);
    const [hx, hy] = this.mano, pts = [];
    for (let i = 0; i <= 120; i++) pts.push(pgBez([[-300, 300], [-40, 300], [200, 560], [hx, hy]], i / 120));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[17.4, 22.6], [23.0, 24.6], [25.0, 27.4], [27.8, 33.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('10', 'pagina', t);
    const G = this.G, M = G.MONDO, m = this.m, C = G.C;
    m.cam.setAttribute('transform', G.camChiavi(PG_CAM, t));
    G.animaMondo(m, t + 1060);
    // Il regolamento, da vicino.
    const [l0, l1, l2, l3] = PG_LIBRO;
    this.libro.setAttribute('opacity', (seg(t, l0, l1) * (1 - seg(t, l2, l3))).toFixed(3));
    const zl = lerp(1, 1.05, seg(t, l0, l3));
    this.libroCam.setAttribute('transform', 'translate(' + (960 - 960 * zl).toFixed(1) + ' ' + (560 - 560 * zl).toFixed(1) + ') scale(' + zl.toFixed(4) + ')');
    // La striscia: vola fino alla mano del custode; poi la striscia già scritta, dal taschino; poi tutta, tra le mani.
    const alto = 14, passo = 46;
    let nastro = '', sc = -1, scx = 0, scy = 0;
    if (t >= PG_VOLO[0] && t < PG_VOLO[1]) {
      const L = this.volo.lung, A = L * eo(seg(t, PG_VOLO[0], PG_VOLO[1]));
      nastro = G.nastro(this.volo, A - 3 * passo, A, ['Al', 'parco', 'Emma'].map((w, i) => [w, A - (2 - i + 0.5) * passo]), alto, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / (3 * passo) });
    } else if (t >= PG_VOLO[1] && t < PG_APRE[0]) {
      const [hx, hy] = this.mano, ln = G.linea([[hx, hy], [hx - 30, hy + 26], [hx - 110, hy + 40]]);
      nastro = G.nastro(ln, 0, 3 * passo, ['Al', 'parco', 'Emma'].map((w, i) => [w, (i + 0.5) * passo]), alto, { onda: s => 4 * Math.sin(s * 0.06 - t * 5) * s / 140 });
    } else if (t >= PG_TASCHINO[0] && t < PG_ATTACCA) {
      // La striscia già scritta, tirata fuori dal taschino: la tiene sollevata, ferma.
      const [hx, hy] = this.mano, u = eo(seg(t, PG_TASCHINO[0], PG_TASCHINO[0] + 0.6)), ln = G.linea([[hx - 2, hy - 2], [hx + 60, hy - 4]]);
      nastro = G.nastro(ln, 0, 60 * u, PG_STRISCIA.slice(0, 4).map((w, i) => [w, 7 + i * 15]), 9, {});
    } else if (t >= PG_ATTACCA) {
      // Tra le due mani: il messaggio; poi, uno dopo l'altro, i pezzi che il custode attacca.
      const a = G.puntoCustode(PG_CU[0], PG_CU[1], G.CUSTODE_MANI.attacca[0]), b = G.puntoCustode(PG_CU[0], PG_CU[1], G.CUSTODE_MANI.attacca[1]);
      const cy = (a[1] + b[1]) / 2 + 1, X = i => 352 + 16 * i;
      const testa = eo(seg(t, PG_PEZZI[0] - 0.25, PG_PEZZI[0] + 0.25)), arg = eo(seg(t, PG_PEZZI[1] - 0.25, PG_PEZZI[1] + 0.25)), ott = eo(seg(t, PG_PEZZI[2] - 0.25, PG_PEZZI[2] + 0.25));
      const sx = lerp(X(5) - 9, X(0) - 9, testa) - (1 - arg) * 0, dx = lerp(X(7) + 9, X(8) + 9, ott);
      const parole = [];
      PG_STRISCIA.forEach((w, i) => {
        if (i < 4 && testa < 0.6) return;
        if (i === 4 && arg < 0.6) return;
        if (i === 8 && ott < 0.6) return;
        parole.push([w, X(i) - sx]);
      });
      const ln = G.linea([[sx, cy], [dx, cy]]);
      nastro = G.nastro(ln, 0, ln.lung, parole, 9, {});
      // La scintilla dove si attacca il pezzo.
      PG_PEZZI.forEach((p, k) => { const u = seg(t, p, p + 0.8); if (u > 0 && u < 1) { sc = u; scx = [X(3) + 8.5, X(4), X(8)][k]; scy = cy; } });
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    this.scint.setAttribute('opacity', (sc > 0 ? 1 - sc : 0).toFixed(3));
    if (sc > 0) [...this.scint.children].forEach((c, k) => { const an = k * Math.PI / 4, d = 2 + 7 * eo(sc); c.setAttribute('cx', (scx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (scy + d * Math.sin(an)).toFixed(2)); });
    // Il custode: prende la striscia; apre il regolamento; tira fuori dal taschino la striscia già scritta; attacca i pezzi;
    // alza gli occhi sopra gli occhiali e parla.
    let posa = 'base', espr = 'base', occhi = 0;
    if (t >= PG_VOLO[1] - 0.6 && t < PG_APRE[0]) { posa = 'porge'; occhi = -1; }
    else if (t >= PG_APRE[0] && t < PG_CHIUDE) { posa = 'legge'; espr = 'serio'; }
    else if (t >= PG_TASCHINO[0] && t < PG_ATTACCA) { posa = 'porge'; espr = 'serio'; }
    else if (t >= PG_ATTACCA) { posa = 'attacca'; espr = t < PG_ALZA ? 'serio' : 'base'; occhi = t < PG_ALZA ? 0 : 1; }
    const dond = Math.round(5 * Math.sin(t * 1.5));
    this.cambia('cu', posa + espr + occhi + dond, this.cu, '<g transform="' + G.posaCustode(PG_CU[0], PG_CU[1]) + '">' + G.unico(G.custode(posa, espr, { occhi, dondolo: dond, pagina: 'frase' }), 'pgcu') + '</g>');
    // Ada: corre dalla bancarella alla stazione, guarda bene, chiede perché.
    const corre = eio(seg(t, PG_CORRE[0], PG_CORRE[1]));
    const ax = lerp(672, 504, corre), ay = lerp(896, 836, corre) - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    const esprA = t < PG_VOLO[1] ? 'base' : t < 22.8 ? (t < PG_ATTACCA ? 'sorpresa' : 'base') : t < 25 ? 'sorpresa' : 'pensa';
    this.cambia('ada', esprA, this.ada, '<g class="pg-ada-in">' + G.ada('base', esprA) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
