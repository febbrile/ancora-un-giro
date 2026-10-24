const { seg, eo, eio, lerp } = kit;
// Ada corre fino al cancello del suo luna park. Il suo custode, alto e magro, alza la lanterna e la guarda sopra gli
// occhiali a mezzaluna; poi apre il cancello. Ada passa, si gira e gli sorride. Cartello: «Fine».
// Si apre sul sentiero, con Ada che arriva di corsa; finisce col cartello. È l'ultima scena dell'episodio.
const CA_CAM = [
  { t: 0, cx: 2120, cy: 770, z: 2.2 },
  { t: 2.6, cx: 2000, cy: 810, z: 3.2 },
  { t: 4.6, cx: 2000, cy: 815, z: 3.6 },
  { t: 10.0, cx: 1985, cy: 815, z: 3.6 },
  { t: 12.4, cx: 1905, cy: 780, z: 2.8 },
];
const CA_CORSA = [0, 2.6], CA_STRADA = [[2100, 770], [2190, 824], [2060, 854]];
const CA_CU = [1962, 870];
const CA_ALZA = [2.6, 5.0], CA_APRE = [5.2, 6.4], CA_SPOSTA = [8.6, 9.2];
const CA_PASSA = [9.2, 10.8], CA_DENTRO = [[2060, 854], [1990, 870], [1880, 872]], CA_GIRA = 11.0;
const CA_FINE = 11.6;
function caLungo(pt, u) {
  const L = [0];
  for (let i = 1; i < pt.length; i++) L.push(L[i - 1] + Math.hypot(pt[i][0] - pt[i - 1][0], pt[i][1] - pt[i - 1][1]));
  const d = Math.max(0, Math.min(1, u)) * L[L.length - 1];
  let i = 1;
  while (i < pt.length - 1 && L[i] < d) i++;
  const a = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
  return [lerp(pt[i - 1][0], pt[i][0], a), lerp(pt[i - 1][1], pt[i][1], a)];
}
kit.scene('cancello', {
  init(kit) {
    const G = window.G, S2 = G.S2;
    const fine = '<g class="ca-fine" opacity="0"><g transform="translate(960 300)"><g class="ca-insegna"></g></g></g>';
    const sopra = S2.teleferica({}) + S2.VIALE.map(p => '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + S2.lampione(1) + '</g>').join('') +
      '<g class="ca-custode"></g><g class="ca-ada"></g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'cancello', laggiu: 1, manopola: 0, banchina: true, morto: true, bruco: 'acceso', strisce: 0, treni: true, davanti: fine,
      html: G.sottotitolo('CUSTODE', 'Bentornata.') + G.sottotitolo('ADA', 'Lo so: lo dice il regolamento.'),
    });
    this.G = G;
    const q = this.m.q;
    q('.pi-guardiola-in').innerHTML = G.unico(G.guardiola({ porta: 0 }), 'cancello');
    this.custode = q('.ca-custode'); this.ada = q('.ca-ada'); this.fine = q('.ca-fine'); this.insegna = q('.ca-insegna');
    this.stati = {};
    this.sub = G.subs(kit, [[3.2, 4.8], [6.4, 9.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'cancello', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CA_CAM, t));
    G.animaPaesaggio(m, t + 2780, { treni: true });
    G.anteCancello(m, eio(seg(t, CA_APRE[0], CA_APRE[1])));
    // Il custode: alza la lanterna e la guarda sopra gli occhiali; apre; si fa da parte.
    const us = eio(seg(t, CA_SPOSTA[0], CA_SPOSTA[1])), posa = t >= CA_ALZA[0] && t < CA_ALZA[1] ? 'alza' : 'base';
    const espr = t < CA_ALZA[0] + 1.2 ? 'base' : 'sorriso', occhi = t < CA_PASSA[0] ? 1 : -1, dond = Math.round(3 * Math.sin(t * 2.2));
    this.cambia('cu', posa + espr + occhi + dond, this.custode, '<g class="ca-cu-in">' + G.unico(G.custode(posa, espr, { occhi, dondolo: dond }), 'cacu') + '</g>');
    this.custode.firstChild.setAttribute('transform', G.posa(CA_CU[0] - 28 * us, 870, 0.28, 240, 410));
    // Ada: arriva di corsa, aspetta, passa; poi si gira e sorride.
    const uc = seg(t, CA_CORSA[0], CA_CORSA[1]), up = seg(t, CA_PASSA[0], CA_PASSA[1]);
    let [x, y] = up > 0 ? caLungo(CA_DENTRO, eio(up) * 0.4 + up * 0.6) : caLungo(CA_STRADA, uc * 0.8 + eo(uc) * 0.2);
    const muove = (uc > 0 && uc < 1) || (up > 0 && up < 1);
    y -= muove ? 5 * Math.abs(Math.sin(t * (uc < 1 ? 11 : 8))) : 0;
    const gira = t >= CA_GIRA, esprA = t < 3 ? 'felice' : t < 6.4 ? 'sorpresa' : 'felice';
    this.cambia('ada', esprA + gira, this.ada, '<g class="ca-ada-in">' + (gira ? G.adaGira('quaderno', esprA, {}, 0) : G.ada('quaderno', esprA)) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y) + (gira ? '' : ' rotate(' + (muove ? 4 * Math.sin(t * 5.5) : 0).toFixed(2) + ' 100 300)'));
    // Il cartello: «Fine».
    const f = eo(seg(t, CA_FINE, CA_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > CA_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
