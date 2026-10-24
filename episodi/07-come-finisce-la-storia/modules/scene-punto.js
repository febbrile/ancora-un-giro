const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca: nell'ultimo vagone la paperella turchese è diventata grigia. Cadono tantissime
// paperelle grigio chiaro, e adesso le paperelle scure sono più di una: sono tante. Ada le indica col dito, una per una,
// sorpresa. Poi chiude gli occhi e pesca una grigio chiaro: sul telefono, dopo «gioca», compare un punto. La paperella
// grigia corre a sedersi in fondo al treno, e il treno riparte, lungo sette vagoni.
// Si apre su Ada e la vasca vuota, come finisce «quaderno»; finisce sul treno che riparte con sette vagoni (dentro la
// montagna lo riprende «finestre»).
const PT_CAM = [
  { t: 0, cx: 712, cy: 850, z: 4.0 },
  { t: 1.2, cx: 760, cy: 846, z: 3.4 },
  { t: 4.6, cx: 760, cy: 846, z: 3.4 },
  { t: 5.6, cx: 742, cy: 858, z: 4.6 },
  { t: 10.4, cx: 742, cy: 858, z: 4.6 },
  { t: 11.4, cx: 664, cy: 846, z: 3.6 },
  { t: 13.59, cx: 664, cy: 846, z: 3.6 },
  { t: 15.0, cx: 560, cy: 820, z: 2.6 },
  { t: 17.4, cx: 520, cy: 780, z: 2.2 },
];
const PT_GIRO = {
  esce: 0.6, vel: [[0.6, 260], [2.4, 260], [2.9, 70], [5.0, 70], [5.6, 140]],
  pesca: { giu: 8.6, su: 9.8, preso: 10.2 }, via: 10.8, salta: 10.8, vagone: 11.4, sale: 11.9,
  riparte: 15.0, velParte: [[15.0, 0], [15.8, 120], [17.0, 260]],
};
// Ada indica le paperelle scure, una per una: l'angolo del braccio teso (gradi sotto l'orizzonte), a ogni dito puntato.
const PT_INDICA = [5.0, 8.0], PT_DITO = [34, 22, 30, 18, 26];
const PT_TEL = { da: 13.6, a: 15.0, quando: 14.0 };
// I colori di Ada (gli stessi di shared.js): il bordo, il camice, la pelle.
const PT_INCH = '#2E2A26', PT_CAMICE = '#FBFAF6', PT_PELLE = '#C98B63';
kit.scene('punto', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri;
    const chi = [{ tipo: 'al', biglietto: A.Al.biglietto, uscita: A.Al.tratti[2] }, { tipo: 'mare', biglietto: A.mare.biglietto, uscita: A.mare.tratti[2] },
      { tipo: 'emma', biglietto: A.Emma.biglietto, uscita: A.Emma.tratti[2] }]
      .concat(['nuota', 'e', 'gioca'].map(w => ({ tipo: 'paperella', biglietto: P[w].biglietto, uscita: P[w].tratti[2] })));
    this.giro = G.giro7({ id: 'p', chi, vasca: F.giri[3].vasca, seme: 47, parola: F.giri[3].pescata, nuovo: P['.'].biglietto, t: PT_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="pt-ada"></g>' + this.giro.mano;
    const casa = '<g class="pt-casa" opacity="0"><g transform="translate(-517.0 -352.0) scale(1.55)">' + G.salotto('<g class="pt-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'punto', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Adesso le paperelle scure sono tante. Ma Ada pesca una paperella grigia.') +
        G.sottotitolo('ADA', 'Un punto!'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    this.ada = this.m.q('.pt-ada'); this.casa = this.m.q('.pt-casa'); this.tel = this.m.q('.pt-tel');
    this.stato = ''; this.statoTel = '';
    this.sub = G.subs(kit, [[4.6, 10.8], [11.0, 13.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'punto', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PT_CAM, t));
    G.animaMondo(m, t + 1010);
    const r = this.giro.render(t), Pp = PT_GIRO.pesca;
    // Ada: guarda il treno; indica le paperelle scure, una per una; pesca a occhi chiusi; «Un punto!».
    let posa = 'quaderno', espr = 'base', giu = 0, dito = null;
    if (t >= PT_INDICA[0] - 0.3 && t < PT_INDICA[1] + 0.3) {
      posa = 'pesca'; espr = 'sorpresa';
      const u = seg(t, PT_INDICA[0], PT_INDICA[1]) * (PT_DITO.length - 1), i = Math.min(PT_DITO.length - 2, Math.floor(u));
      const alza = eio(seg(t, PT_INDICA[0] - 0.3, PT_INDICA[0] + 0.1)) * (1 - eio(seg(t, PT_INDICA[1], PT_INDICA[1] + 0.3)));
      dito = Math.round(lerp(80, lerp(PT_DITO[i], PT_DITO[i + 1], eio(Math.min(1, (u - i) * 2.5))), alza));
    } else if (t >= Pp.giu - 0.9 && t < Pp.preso + 0.9) {
      posa = 'pesca'; espr = t < Pp.preso + 0.1 ? 'chiusi' : 'felice'; giu = r.giu;
    } else if (t >= Pp.preso + 0.9) espr = 'felice';
    else if (t >= 3.0) espr = 'sorpresa';
    const k = posa + espr + giu + dito;
    if (k !== this.stato) {
      let html = G.ada(posa, espr, { giu });
      if (dito !== null) {
        // Il braccio teso, con il dito puntato verso la vasca, al posto del braccio che pesca.
        const a = dito * Math.PI / 180, ex = 120 + 62 * Math.cos(a), ey = 156 + 62 * Math.sin(a);
        const fx = ex + 16 * Math.cos(a), fy = ey + 16 * Math.sin(a);
        const braccio = '<path d="M120 156 L' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" stroke="' + PT_INCH + '" stroke-width="21" stroke-linecap="round"/>' +
          '<path d="M120 156 L' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" stroke="' + PT_CAMICE + '" stroke-width="16" stroke-linecap="round"/>' +
          '<path d="M' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' L' + fx.toFixed(1) + ' ' + fy.toFixed(1) + '" stroke="' + PT_PELLE + '" stroke-width="5" stroke-linecap="round"/>' +
          '<circle cx="' + (ex + 4 * Math.cos(a)).toFixed(1) + '" cy="' + (ey + 4 * Math.sin(a)).toFixed(1) + '" r="7" fill="' + PT_PELLE + '"/>';
        html = html.replace(/<path d="M128 152 Q[^"]*"[^>]*\/><circle [^>]*r="7"[^>]*\/>/, braccio);
      }
      this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + html + '</g>';
      this.stato = k;
    }
    // Il telefono: dopo «gioca», un punto.
    const x = PT_TEL;
    this.casa.setAttribute('opacity', (seg(t, x.da - 0.15, x.da) * (1 - seg(t, x.a - 0.15, x.a))).toFixed(3));
    if (t >= x.da - 0.2 && t < x.a + 0.2) {
      const testo = t < x.quando ? 'nuota e gioca' : 'nuota e gioca.', kk = testo + (Math.round(t * 30) / 30).toFixed(3);
      if (kk !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', testo]], puntini: t }), 'pttel'); this.statoTel = kk; }
    }
    this.sub(t);
  },
});
