const { seg, eo, eio, lerp } = kit;
// Arriva una striscia nuova, con un indovinello (non si legge). Il treno parte, fa il suo giro, torna, riparte: giro dopo
// giro. Ma sul telefono non compare niente, solo i tre puntini che pulsano, a lungo. Ada guarda il treno che gira, poi il
// telefono muto, poi il custode, che non si scompone. Cartello: «Fine».
// Si apre sul cielo, con la striscia in volo; finisce sulla stazione, col cartello.
const IN_VOLO = [0.2, 2.6];
const IN_CASA = [[6.8, 9.8], [13.4, 16.0]];
const IN_FINE = 17.4;
const IN_CAM = [
  { t: 0, cx: 300, cy: 600, z: 1.4 },
  { t: 2.6, cx: 460, cy: 760, z: 2.2 },
  { t: 4.0, cx: 640, cy: 560, z: 0.92 },
  { t: 13.2, cx: 640, cy: 560, z: 0.92 },
  { t: 16.2, cx: 560, cy: 800, z: 2.6 },
  { t: 18.4, cx: 640, cy: 720, z: 1.6 },
];
function inBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('indovinello', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella;
    const chi = S2.trenoDa(K.giri[0].frase.slice(0, 6).concat(['?', '?', '?', '⚑ottone']), ['#b2a17f']);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="in-treno">' + G.treno(chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>' +
      '<g class="in-ada"></g><g transform="' + G.posaCustode(436, 836) + '">' + G.unico(G.custode('base', 'base', { occhi: -1 }), 'incu') + '</g><g class="in-volo"></g>';
    const casa = '<g class="in-casa" opacity="0"><g class="in-casa-cam">' + G.salotto('<g class="in-tel"></g>', { cameretta: true }) + '</g></g>';
    const fine = '<g class="in-fine" opacity="0"><g transform="translate(960 300)"><g class="in-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'indovinello', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: casa + fine,
      html: G.sottotitolo('NARRATORE', 'Poi arriva un indovinello. Il treno gira e gira.') +
        G.sottotitolo('ADA', 'E il telefono non dice niente?'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.in-treno .g-vag'); this.ada = q('.in-ada'); this.volo = q('.in-volo');
    this.casa = q('.in-casa'); this.casaCam = q('.in-casa-cam'); this.tel = q('.in-tel'); this.fine = q('.in-fine'); this.insegna = q('.in-insegna');
    const pts = [];
    for (let i = 0; i <= 80; i++) pts.push(inBez([[-300, 320], [0, 320], [260, 560], [560, 760]], i / 80));
    this.linea = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[3.0, 7.0], [10.4, 13.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'indovinello', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(IN_CAM, t));
    G.animaMondo(m, t + 2140);
    // La striscia: un indovinello, che non si legge (i segni sono sbiaditi).
    let volo = '';
    if (t >= IN_VOLO[0] && t < IN_VOLO[1] + 0.3) {
      const A = this.linea.lung * eo(seg(t, IN_VOLO[0], IN_VOLO[1]));
      volo = G.nastro(this.linea, A - 180, A, [], 16, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / 180 }) + '<g opacity="' + (1 - seg(t, IN_VOLO[1], IN_VOLO[1] + 0.3)).toFixed(2) + '"></g>';
    }
    this.cambia('volo', volo, this.volo, volo);
    this.volo.setAttribute('opacity', (1 - seg(t, IN_VOLO[1], IN_VOLO[1] + 0.3)).toFixed(3));
    // Il treno: gira e gira, sul viadotto e nella montagna.
    const s = 2300 + ((t * 900) % 2600);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    this.vag.forEach(v => { if (t < 3.6) v.setAttribute('opacity', 0); });
    // La cameretta: solo i tre puntini.
    const c = IN_CASA.find(([a, b]) => t >= a - 0.2 && t < b + 0.2);
    this.casa.setAttribute('opacity', c ? (seg(t, c[0] - 0.15, c[0]) * (1 - seg(t, c[1] - 0.15, c[1]))).toFixed(3) : 0);
    if (c) {
      this.cambia('tel', (Math.round(t * 30) / 30).toFixed(3), this.tel, G.unico(G.telefono({ chat: [['io', 7]], puntini: t }), 'intel'));
      const z = 1.1, [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')');
    }
    // Ada guarda il treno, poi il custode.
    const espr = t < 13.6 ? 'sorpresa' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(560, 836) + '">' + (t > 16 ? G.adaGira('base', espr, {}, -14) : G.ada('base', espr)) + '</g>');
    const f = eo(seg(t, IN_FINE, IN_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > IN_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
