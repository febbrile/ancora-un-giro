const { seg, eo, eio, lerp } = kit;
// Ada cammina fino al fiume, in fondo al parco, oltre il binario morto, col quaderno sotto il braccio. Sull'altra riva si
// accendono delle luci: una ruota panoramica, una stazione, e una montagna buia, identica alla sua. Ada si ferma sul ponte e
// guarda una montagna, poi l'altra. Cartello: «Fine».
// Si apre sul binario morto; finisce sul ponte, col cartello.
const FI_CAMMINA = [0, 5.4];
const FI_LUCI = [5.6, 9.0];
const FI_GUARDA = [13.6, 16.6];
const FI_FINE = 18.4;
const FI_PONTE = -3270;
const FI_CAM = [
  { t: 0, cx: -2500, cy: 800, z: 2.2 },
  { t: 5.4, cx: -3200, cy: 800, z: 2.4 },
  { t: 7.0, cx: -3200, cy: 800, z: 2.4 },
  { t: 10.4, cx: -3260, cy: 640, z: 0.62 },
  { t: 17.4, cx: -3260, cy: 640, z: 0.62 },
  { t: 19.4, cx: -3260, cy: 700, z: 0.8 },
];
kit.scene('fiume', {
  init(kit) {
    const G = window.G, S2 = G.S2;
    const fine = '<g class="fi-fine" opacity="0"><g transform="translate(960 300)"><g class="fi-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, '<g class="fi-ada"></g>', {
      pre: 'fiume', manopola: 0, banchina: true, morto: true, bruco: 'acceso', fiume: true, davanti: fine,
      prima: '<g class="fi-gemello"></g>',
      html: G.sottotitolo('NARRATORE', 'Dall’altra parte del fiume c’è un parco piccolo come quello di Ada.') +
        G.sottotitolo('ADA', 'Quella montagna è uguale alla nostra!'),
    });
    this.G = G;
    const q = this.m.q;
    this.gemello = q('.fi-gemello'); this.ada = q('.fi-ada'); this.fine = q('.fi-fine'); this.insegna = q('.fi-insegna');
    this.stati = {};
    this.sub = G.subs(kit, [[8.0, 13.6], [14.0, 17.4]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'fiume', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(FI_CAM, t));
    G.animaMondo(m, t + 2440);
    // Il parco gemello: le luci si accendono, una dopo l'altra.
    const luci = Math.round(eio(seg(t, FI_LUCI[0], FI_LUCI[1])) * 10) / 10;
    this.cambia('gem', luci, this.gemello, S2.parcoGemello({ luci }));
    // Ada cammina fino al ponte; si ferma in mezzo; guarda una montagna, poi l'altra.
    const u = eio(seg(t, FI_CAMMINA[0], FI_CAMMINA[1])), ax = lerp(-2700, FI_PONTE, u);
    const yPonte = S2.GEMELLO.ponte - 14 * Math.sin(Math.PI * Math.max(0, Math.min(1, (ax - S2.GEMELLO.fiume[0] + 60) / (S2.GEMELLO.fiume[1] - S2.GEMELLO.fiume[0] + 120))));
    const ay = Math.min(868, yPonte) - (u > 0 && u < 1 ? 4 * Math.abs(Math.sin(t * 8)) : 0);
    const gira = t >= FI_GUARDA[0] ? (t < (FI_GUARDA[0] + FI_GUARDA[1]) / 2 ? -18 : 18) : 0, espr = t < FI_LUCI[0] ? 'base' : 'sorpresa';
    this.cambia('ada', gira + espr, this.ada, '<g class="fi-ada-in">' + G.adaGira('quaderno', espr, {}, gira) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    const f = eo(seg(t, FI_FINE, FI_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > FI_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
