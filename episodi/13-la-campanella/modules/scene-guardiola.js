const { seg, eo, eio, lerp } = kit;
// Ada segue il custode nel suo giro. Lui esce dalla guardiola di legno, col tetto a righe e la finestra accesa: dentro si
// intravedono gli scaffali, il mazzo di chiavi appeso al chiodo, una teiera, il regolamento aperto su un leggio. Il custode
// accende i lampioni del viale uno dopo l'altro, controlla il lucchetto del cancello, saluta con la testa la ruota
// panoramica. Poi tira fuori l'orologio da tasca, lo carica con tre giri di rotella e lo guarda. Ada lo segue a due passi.
// Si apre sulla guardiola; finisce sul custode con l'orologio (la riprende «orologio», in stazione).
const GU_PORTA = [0.4, 1.2];
// La strada del custode: dalla porta, giù per il viale (un lampione dopo l'altro), su fino al cancello.
const GU_TAPPE = [[1900, 872], [1836, 906], [1762, 962], [1672, 998], [1582, 1008], [1700, 990], [1950, 874]];
const GU_ARRIVI = [0, 3.6, 5.6, 7.6, 9.6, 12.0, 14.4];
const GU_PARTENZE = [1.4, 4.6, 6.6, 8.6, 10.6, 12.2];
const GU_LUCE = [4.0, 6.0, 8.0, 10.0];
const GU_LUCCHETTO = [14.8, 16.4], GU_SALUTA = [16.8, 18.6], GU_OROLOGIO = [19.0, 24.0], GU_CARICA = [19.6, 21.6];
const GU_CAM = [
  { t: 0, cx: 1886, cy: 836, z: 4.8 },
  { t: 2.0, cx: 1886, cy: 836, z: 4.8 },
  { t: 3.4, cx: 1760, cy: 900, z: 2.6 },
  { t: 10.8, cx: 1660, cy: 930, z: 2.6 },
  { t: 14.4, cx: 1940, cy: 846, z: 3.8 },
  { t: 16.4, cx: 1940, cy: 846, z: 3.8 },
  { t: 17.2, cx: 1820, cy: 700, z: 1.4 },
  { t: 18.6, cx: 1820, cy: 700, z: 1.4 },
  { t: 19.4, cx: 1950, cy: 836, z: 4.4 },
  { t: 24.0, cx: 1950, cy: 836, z: 4.4 },
  { t: 25.0, cx: 1930, cy: 850, z: 3.4 },
];
// Dove sta chi cammina lungo le tappe al tempo t (rit: quanto è in ritardo, per Ada).
function guDove(t, rit) {
  t -= rit || 0;
  for (let k = 1; k < GU_TAPPE.length; k++) {
    if (t < GU_PARTENZE[k - 1]) return { p: GU_TAPPE[k - 1], cammina: false };
    if (t < GU_ARRIVI[k]) { const u = eio(seg(t, GU_PARTENZE[k - 1], GU_ARRIVI[k])); return { p: [lerp(GU_TAPPE[k - 1][0], GU_TAPPE[k][0], u), lerp(GU_TAPPE[k - 1][1], GU_TAPPE[k][1], u)], cammina: true }; }
  }
  return { p: GU_TAPPE.at(-1), cammina: false };
}
kit.scene('guardiola', {
  init(kit) {
    const G = window.G, C = G.C, S2 = G.S2;
    const sopra = S2.teleferica({}) + S2.VIALE.map((p, k) => '<g class="gu-lamp" transform="translate(' + p[0] + ' ' + p[1] + ')"></g>').join('') +
      '<g transform="translate(1972 836)">' + S2.lucchetto() + '</g><g class="gu-ada"></g><g class="gu-cu"></g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'guardiola', laggiu: 1, manopola: 0, banchina: true, morto: true, bruco: 'acceso', strisce: 0,
      html: G.sottotitolo('NARRATORE', 'Ogni sera il custode fa lo stesso giro: accende i lampioni, controlla il cancello, carica l’orologio.') +
        G.sottotitolo('ADA', 'Perché sempre così?') +
        G.sottotitolo('CUSTODE', 'Lo dice il regolamento.'),
    });
    this.G = G;
    const q = this.m.q;
    G.anteCancello(this.m, 0);
    this.guardiola = q('.pi-guardiola-in'); this.lamp = this.m.qa('.gu-lamp'); this.ada = q('.gu-ada'); this.cu = q('.gu-cu');
    this.stati = {};
    this.sub = G.subs(kit, [[3.4, 12.0], [24.4, 26.8], [27.2, 29.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'guardiola', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GU_CAM, t));
    G.animaPaesaggio(m, t + 640, { treni: true });
    // La guardiola: la porta si apre, dentro si intravede la sua stanza.
    const porta = eio(seg(t, GU_PORTA[0], GU_PORTA[1])).toFixed(2);
    this.cambia('gu', porta, this.guardiola, G.unico(G.guardiola({ porta: +porta, dentro: true }), 'guardiola'));
    // I lampioni si accendono, uno dopo l'altro.
    this.lamp.forEach((el, k) => { const a = Math.round(eo(seg(t, GU_LUCE[k], GU_LUCE[k] + 0.6)) * 10) / 10; this.cambia('l' + k, a, el, S2.lampione(a)); });
    // Il custode: cammina; alza la lanterna a ogni lampione; tocca il lucchetto; saluta la ruota; carica l'orologio.
    const d = guDove(t);
    let posa = 'base', occhi = -1, espr = 'base', china = 0;
    if (GU_LUCE.some(a => t >= a - 0.4 && t < a + 0.4)) { posa = 'alza'; occhi = -1; }
    else if (t >= GU_LUCCHETTO[0] && t < GU_LUCCHETTO[1]) { posa = 'attacca'; occhi = 1; espr = 'serio'; }
    else if (t >= GU_SALUTA[0] && t < GU_SALUTA[1]) { china = 6 * Math.sin(Math.PI * seg(t, GU_SALUTA[0] + 0.3, GU_SALUTA[0] + 1.3)); occhi = -1; }
    else if (t >= GU_OROLOGIO[0] && t < GU_OROLOGIO[1]) { posa = 'orologio'; occhi = 0; espr = 'serio'; }
    const suona = t >= GU_CARICA[0] && t < GU_CARICA[1] ? Math.round(10 * Math.sin((t - GU_CARICA[0]) * 3 * Math.PI)) : 0;
    const dond = Math.round(6 * Math.sin(t * 2.4));
    this.cambia('cu', posa + occhi + espr + suona + dond, this.cu, '<g class="gu-cu-in">' + G.unico(G.custode(posa, espr, { occhi, dondolo: dond, campanella: true, suona }), 'gucu') + '</g>');
    // Esce dalla porta: prima non c'è.
    this.cu.setAttribute('opacity', eo(seg(t, 0.9, 1.4)).toFixed(3));
    this.cu.firstChild.setAttribute('transform', G.posaCustode(d.p[0], d.p[1] - (d.cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0)) + ' rotate(' + (-china + (d.cammina ? 2 * Math.sin(t * 6) : 0)).toFixed(2) + ' 120 410)');
    // Ada lo segue a due passi, col quaderno.
    const a = guDove(t, 0.9), ax = a.p[0] + 36, ay = a.p[1] + 6 - (a.cammina ? 4 * Math.abs(Math.sin(t * 8)) : 0);
    const espA = t < 24.2 ? 'base' : t < 27 ? 'sorpresa' : 'pensa';
    this.cambia('ada', espA, this.ada, '<g class="gu-ada-in">' + G.ada('quaderno', espA) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
