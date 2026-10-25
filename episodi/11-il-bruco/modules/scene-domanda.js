const { seg, eo, eio, lerp } = kit;
// Stacco su una cameretta di notte: sotto le coperte, le mani di un bambino scrivono sul telefono «Dimmi una parolaccia»
// e premono invio. Al luna park il custode prende la striscia, la fa tagliare allo Spezzaparole (zac, zac, zac) e si
// allontana dalla stazione con i biglietti in una mano e la lanterna nell'altra. Ada lo segue con lo sguardo. Nella
// cameretta, sul telefono, arriva una frase sola, sempre la stessa: «Di questo, qui, non si parla.». Il telefono si
// abbassa: il broncio. Il treno, alla stazione, non è nemmeno partito. Titolo: «Il Bruco».
// Si apre nella cameretta; finisce sulla stazione, col titolo (la riprende «bruco», con Ada che segue il custode).
const DM_FRASE = 'Dimmi una parolaccia';
const DM_SCRIVE = 1.0, DM_INVIO = 5.0, DM_CAMERA = [5.6, 6.0];
const DM_CU = [528, 836];
const DM_VOLO = [6.2, 8.0];
const DM_TAGLI = [8.8, 9.4, 10.0];
const DM_VIA = [11.0, 13.6];
const DM_RISPOSTA = [13.4, 13.8, 17.2, 17.6], DM_ARRIVA = 14.6, DM_BRONCIO = 15.8;
const DM_TITOLO = 21.6;
const DM_CAM = [
  { t: 6.0, cx: 470, cy: 760, z: 2.4 },
  { t: 8.0, cx: 520, cy: 780, z: 3.4 },
  { t: 10.6, cx: 520, cy: 780, z: 3.4 },
  { t: 13.4, cx: 640, cy: 780, z: 2.6 },
  { t: 17.6, cx: 400, cy: 790, z: 3.0 },
  { t: 20.4, cx: 400, cy: 790, z: 3.0 },
  { t: 22.0, cx: 330, cy: 720, z: 1.9 },
];
function dmBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('domanda', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO;
    this.parole = DM_FRASE.split(' ');
    const sopra = '<g class="dm-macchina"></g>' +
      '<g class="dm-treno">' + G.treno(Array.from({ length: 9 }, () => ({})), { sbarra: 0 }) + '</g>' +
      '<g class="dm-ada"></g><g class="dm-cu"></g><g class="dm-nastro"></g>' +
      this.parole.map(w => '<g class="dm-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(w) + '</g></g>').join('');
    // La cameretta: sotto le coperte, le mani piccole sul telefono acceso.
    const coperta = '<g transform="translate(0 110)"><path d="M-200 1080 L-200 820 Q300 760 760 790 Q980 800 1180 780 Q1560 760 2120 820 L2120 1080 Z" fill="#5C6FB8"/>' +
      '<path d="M-200 840 Q300 790 760 812 Q1000 822 1200 804 Q1560 786 2120 840" stroke="#4A5CA0" stroke-width="12" fill="none"/>' +
      [[200, 930], [520, 980], [1320, 940], [1640, 1000], [960, 1010]].map(([x, y]) => '<path d="M' + x + ' ' + (y - 14) + ' l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#FFE9A8" opacity=".55"/>').join('') + '</g>';
    const camera = '<g class="dm-camera"><g class="dm-cam-cam">' + G.salotto('<g class="dm-tel"></g>', { cameretta: true }) + coperta +
      '<circle cx="950" cy="520" r="300" fill="#BFD4FF" opacity=".16" filter="url(#g-velo)"/></g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 290)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, bruco: 'buio', davanti: camera + titolo,
      html: G.sottotitolo('NARRATORE', 'Un bambino chiede una cosa che non si dovrebbe chiedere. E sul telefono arriva una frase già pronta.') +
        G.sottotitolo('ADA', 'Il treno non è nemmeno partito. Perché?'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.dm-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 640 - G.fermoTreno(10), null, M.passoBanchina);
    this.mac = q('.dm-macchina'); this.ada = q('.dm-ada'); this.cu = q('.dm-cu'); this.nastroEl = q('.dm-nastro'); this.big = this.m.qa('.dm-big');
    this.camera = q('.dm-camera'); this.camCam = q('.dm-cam-cam'); this.tel = q('.dm-tel');
    this.titolo = q('.dm-titolo'); this.insegna = q('.dm-insegna');
    this.typ = kit.typist(DM_FRASE, DM_SCRIVE, 5.2, 31);
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.mano = G.puntoCustode(DM_CU[0], DM_CU[1], G.CUSTODE_MANI.porge);
    const [hx, hy] = this.mano, pts = [];
    for (let i = 0; i <= 100; i++) pts.push(dmBez([[-260, 320], [0, 320], [260, 560], [hx, hy]], i / 100));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 9.6], [17.6, 21.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'domanda', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 1400);
    // La cameretta: si scrive e si manda; poi arriva la frase già pronta, e il telefono si abbassa.
    const [r0, r1, r2, r3] = DM_RISPOSTA;
    const inCamera = t < DM_CAMERA[1] || (t >= r0 && t < r3);
    this.camera.setAttribute('opacity', (t < DM_CAMERA[1] ? 1 - seg(t, DM_CAMERA[0], DM_CAMERA[1]) : seg(t, r0, r1) * (1 - seg(t, r2, r3))).toFixed(3));
    if (inCamera) {
      const inviato = t >= DM_INVIO + 0.15, arrivata = t >= DM_ARRIVA;
      const chat = inviato ? [['io', DM_FRASE]].concat(arrivata ? [['ai', 'Di questo, qui, non si parla.']] : []) : [];
      const scritto = inviato ? '' : this.typ.at(t), cursore = !inviato && Math.floor(t / 0.53) % 2 === 0, premuto = t > DM_INVIO - 0.05 && t < DM_INVIO + 0.3;
      const puntini = inviato && !arrivata && t >= r0 ? t : undefined;
      this.cambia('tel', chat.length + scritto + cursore + premuto + (puntini !== undefined ? (Math.round(t * 30) / 30).toFixed(3) : ''), this.tel,
        G.unico(G.telefono({ chat, scritto, cursore, premuto, puntini }), 'dmtel'));
      const giu = 60 * eio(seg(t, DM_BRONCIO, DM_BRONCIO + 0.8)), z = t < 6 ? lerp(1, 1.08, seg(t, 0, 6)) : 1.08;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z).toFixed(1) + ' ' + (620 - 620 * z + giu).toFixed(1) + ') scale(' + z.toFixed(4) + ') rotate(' + (-4 * eio(seg(t, DM_BRONCIO, DM_BRONCIO + 0.8))).toFixed(2) + ' 950 600)');
    }
    // La striscia vola fino alla mano del custode.
    let nastro = '';
    if (t >= DM_VOLO[0] && t < DM_VOLO[1]) {
      const L = this.volo.lung, A = L * eo(seg(t, DM_VOLO[0], DM_VOLO[1]));
      nastro = G.nastro(this.volo, A - 150, A, this.parole.map((w, i) => [w, A - (2 - i + 0.5) * 50]), 14, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / 150 });
    } else if (t >= DM_VOLO[1] && t < DM_TAGLI[0] - 0.4) {
      // Il custode la porge alla fessura dello Spezzaparole, che se la tira dentro.
      const u = seg(t, DM_VOLO[1], DM_TAGLI[0] - 0.4), ln = G.linea([[this.mano[0], this.mano[1]], [560, 770], [581.6, 756]]);
      nastro = G.nastro(ln, ln.lung * u, ln.lung, [], 10, {});
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    // Lo Spezzaparole taglia: zac, zac, zac.
    let forbice = 0.6, bocca = 0;
    DM_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.18))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    this.cambia('mac', forbice.toFixed(2) + bocca.toFixed(2), this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca }) + '</g>');
    // Il custode: prende la striscia, raccoglie i biglietti, se ne va con la lanterna verso l'angolo buio.
    const via = eio(seg(t, DM_VIA[0], DM_VIA[1])), cx = lerp(DM_CU[0], 900, via), cammina = via > 0 && via < 1;
    const cy = lerp(DM_CU[1], 930, seg(cx, 600, 700)) - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0);
    const posa = t >= DM_VOLO[1] - 0.5 ? 'porge' : 'base', dond = Math.round(8 * Math.sin(t * 3));
    this.cambia('cu', posa + dond, this.cu, '<g class="dm-cu-in">' + G.unico(G.custode(posa, 'base', { occhi: t < DM_VIA[0] ? -1 : 1, dondolo: dond }), 'dmcu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy) + (cammina ? ' rotate(' + (2 * Math.sin(t * 6)).toFixed(2) + ' 120 410)' : ''));
    // I biglietti: escono dalla bocca e volano nella mano del custode; poi lui se li porta via.
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    this.big.forEach((b, i) => {
      const a = DM_TAGLI[2 - i] + 0.1, u = eio(seg(t, a, a + 0.6));
      const x = lerp(this.bocca[0], hx + 2 * i, u), y = lerp(this.bocca[1], hy - 4 - 2 * i, u) - 18 * Math.sin(Math.PI * u);
      b.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (-12 + 8 * i) + ') scale(' + lerp(0.2, 0.13, u).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : 1);
    });
    // Ada: guarda il custode, lo segue con lo sguardo; poi guarda il treno fermo.
    const espr = t < DM_TAGLI[0] ? 'base' : t < 17.6 ? 'sorpresa' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(462, M.ada[1]) + '">' + G.ada('base', espr) + '</g>');
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > DM_TITOLO - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Il Bruco', 760, 230, +turno));
    this.sub(t);
  },
});
