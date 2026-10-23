const { seg, eo, eio, lerp } = kit;
// Ada arriva di corsa al cancello del suo luna park, chiuso. Dalla guardiola accanto esce il custode, con la lanterna,
// le chiavi alla cintura e il regolamento sotto il braccio: alza la lanterna su di lei, apre il cancello, guarda
// l'orologio. «Fra poco si chiude.» «Perché?» «Lo dice il regolamento.» Ada passa, lui richiude il cancello alle sue
// spalle; Ada riapre il quaderno su una pagina bianca e sorride. Cartello: «Fine».
// Si apre come finisce «quaderno», con Ada che scende di corsa il sentiero; è l'ultima scena della stagione e presenta
// il custode per la seconda.
const CA_CAM = [
  { t: 0, cx: 2120, cy: 770, z: 2.2 },
  { t: 2.6, cx: 2000, cy: 810, z: 3.2 },
  { t: 5.0, cx: 2000, cy: 815, z: 3.6 },
  { t: 18.4, cx: 1985, cy: 815, z: 3.6 },
  { t: 21.6, cx: 1905, cy: 780, z: 2.8 },
];
const CA_CORSA = [0, 2.6], CA_STRADA = [[2100, 770], [2190, 824], [2060, 854]];
const CA_PORTA = [1.0, 1.6], CA_ESCE = [1.6, 3.6], CA_DOVE = [[1908, 870], [1962, 870]];
const CA_ALZA = [3.8, 6.2], CA_APRE = [6.4, 7.6], CA_OROLOGIO = [11.6, 14.6];
const CA_SPOSTA = [17.8, 18.6], CA_PASSA = [18.6, 20.2], CA_DENTRO = [[2060, 854], [1990, 870], [1862, 872]];
const CA_CHIUDE = [19.4, 20.4];
const CA_FINE = 20.8;
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
    const G = window.G;
    const fine = '<g class="ca-fine" opacity="0"><g transform="translate(960 300)"><g class="ca-insegna"></g></g></g>';
    this.m = G.costruisciPaesaggio(kit, '<g class="ca-custode"></g><g class="ca-ada"></g>', {
      pre: 'cancello', laggiu: 1, manopola: 0, banchina: true, morto: true, treni: true, davanti: fine,
      html: G.sottotitolo('NARRATORE', 'Al cancello c’è il custode, con la lanterna e le chiavi. C’è sempre stato, ma Ada non l’aveva mai guardato.') +
        G.sottotitolo('CUSTODE', 'Bentornata. Fra poco si chiude.') +
        G.sottotitolo('ADA', 'Perché?') +
        G.sottotitolo('CUSTODE', 'Lo dice il regolamento.'),
    });
    this.G = G;
    this.guardiola = this.m.q('.pi-guardiola-in');
    this.custode = this.m.q('.ca-custode'); this.ada = this.m.q('.ca-ada');
    this.fine = this.m.q('.ca-fine'); this.insegna = this.m.q('.ca-insegna');
    this.statoGu = ''; this.statoCu = ''; this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[2.2, 11.2], [11.5, 14.4], [14.8, 16.0], [16.4, 18.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'cancello', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CA_CAM, t));
    G.animaPaesaggio(m, t + 450, { treni: true, biglietti: true });
    // La guardiola: la porta si apre quando esce il custode.
    const porta = eio(seg(t, CA_PORTA[0], CA_PORTA[1])).toFixed(2);
    if (porta !== this.statoGu) { this.guardiola.innerHTML = G.unico(G.guardiola({ porta: +porta }), 'cancello'); this.statoGu = porta; }
    // Il cancello: chiuso, il custode lo apre per Ada e lo richiude alle sue spalle.
    G.anteCancello(m, eio(seg(t, CA_APRE[0], CA_APRE[1])) * (1 - eio(seg(t, CA_CHIUDE[0], CA_CHIUDE[1]))));
    // Il custode: esce dalla guardiola, va al cancello, alza la lanterna, guarda l'orologio, si fa da parte.
    const ue = seg(t, CA_ESCE[0], CA_ESCE[1]), us = eio(seg(t, CA_SPOSTA[0], CA_SPOSTA[1]));
    const cx = lerp(CA_DOVE[0][0], CA_DOVE[1][0], eio(ue)) - 28 * us, cammina = (ue > 0 && ue < 1) || (us > 0 && us < 1);
    const posaCu = t >= CA_ALZA[0] && t < CA_ALZA[1] ? 'alza' : t >= CA_OROLOGIO[0] && t < CA_OROLOGIO[1] ? 'orologio' : 'base';
    const esprCu = t < 5.4 ? 'base' : t < 11.4 ? 'sorriso' : t < 14.6 ? 'serio' : t < 16.4 ? 'base' : t < 17.6 ? 'chiusi' : 'sorriso';
    const occhi = t < 18.6 ? 1 : t < 20.4 ? -1 : 0;
    const dond = (cammina ? 9 : 3) * Math.sin(t * (cammina ? 6 : 2.2));
    const kc = posaCu + esprCu + occhi + dond.toFixed(0);
    if (kc !== this.statoCu) { this.custode.innerHTML = '<g class="ca-cu-in">' + G.unico(G.custode(posaCu, esprCu, { occhi, dondolo: +dond.toFixed(0) }), 'cancello') + '</g>'; this.statoCu = kc; }
    const passo = cammina ? 3 * Math.abs(Math.sin(t * 7)) : 0;
    this.custode.firstChild.setAttribute('transform', G.posa(cx, 870 - passo, 0.28, 240, 410) + ' rotate(' + (cammina ? 2 * Math.sin(t * 3.5) : 0).toFixed(2) + ' 120 410)');
    this.custode.setAttribute('opacity', eo(seg(t, CA_ESCE[0], CA_ESCE[0] + 0.3)).toFixed(3));
    // Ada: scende di corsa, si ferma davanti al cancello chiuso, passa e riapre il quaderno su una pagina bianca.
    const uc = seg(t, CA_CORSA[0], CA_CORSA[1]), up = seg(t, CA_PASSA[0], CA_PASSA[1]);
    let [x, y] = up > 0 ? caLungo(CA_DENTRO, eio(up) * 0.4 + up * 0.6) : caLungo(CA_STRADA, uc * 0.8 + eo(uc) * 0.2);
    const muove = (uc > 0 && uc < 1) || (up > 0 && up < 1);
    y -= muove ? 5 * Math.abs(Math.sin(t * (uc < 1 ? 11 : 8))) : 0;
    const fiato = t > CA_CORSA[1] && t < CA_CORSA[1] + 1.6 ? Math.abs(Math.sin((t - CA_CORSA[1]) * 7)) * 3 : 0;
    const posaAda = t >= CA_PASSA[1] ? 'quaderno' : 'base';
    const esprAda = t < 2.2 ? 'felice' : t < 7.6 ? 'sorpresa' : t < 14.8 ? 'base' : t < 18.6 ? 'pensa' : 'felice';
    const ka = posaAda + esprAda;
    if (ka !== this.statoAda) {
      this.ada.innerHTML = '<g class="ca-ada-in">' + G.ada(posaAda, esprAda) + (posaAda === 'base' ?
        '<g transform="rotate(-10 140 196)"><rect x="124" y="168" width="34" height="50" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2.5"/><rect x="154" y="172" width="4" height="42" fill="' + G.C.crema + '"/></g>' : '') + '</g>';
      this.statoAda = ka;
    }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y - fiato) + ' rotate(' + (muove ? 4 * Math.sin(t * 5.5) : 0).toFixed(2) + ' 100 300)');
    // Il cartello: «Fine».
    const f = eo(seg(t, CA_FINE, CA_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
