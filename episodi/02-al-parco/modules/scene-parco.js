const { seg, eo, ei, eio, lerp } = kit;
// Ada infila le due strisce nello Spezzaparole, una dopo l'altra. Sulla pista aspettano due trenini uguali, uno dietro
// l'altro: i primi tre biglietti salgono sul primo (Al, Mare, Emma), gli altri tre sul secondo (Al, Parco, Emma).
// Parco si presenta da vicino; Emma è rosa antico in tutti e due. Le sbarre si abbassano.
// Si apre come finisce «frasi»; finisce sui due treni fermi (li riprende «partenza»).
// Dove stanno i due treni sul percorso di partenza, tutti e due sulla banchina lunga: il primo più avanti, il secondo
// davanti allo Spezzaparole.
const PA_TRENI = [920, 490];
const PA_CAM = [
  { t: 0, cx: 534, cy: 790, z: 4.6 },
  { t: 1.6, cx: 556, cy: 784, z: 4.2 },
  { t: 4.4, cx: 556, cy: 784, z: 4.2 },
  { t: 7.0, cx: -150, cy: 780, z: 2.8 },
  { t: 8.6, cx: -150, cy: 780, z: 2.8 },
  { t: 10.2, cx: 556, cy: 784, z: 4.2 },
  { t: 12.2, cx: 556, cy: 784, z: 4.2 },
  { t: 14.4, cx: 300, cy: 800, z: 3.6 },
  { t: 15.2, cx: 300, cy: 800, z: 3.6 },
  { t: 17.0, cx: 238, cy: 790, z: 7.6 },
  { t: 22.4, cx: 238, cy: 790, z: 7.6 },
  { t: 25.0, cx: 190, cy: 720, z: 1.8 },
];
// Le due strisce: quando lasciano le mani di Ada, i colpi di forbice, quando escono i biglietti.
const PA_STRISCE = [
  { via: 1.0, tagli: [4.0, 4.6], uscite: [5.2, 5.6, 6.0] },
  { via: 8.6, tagli: [11.6, 12.2], uscite: [12.8, 13.2, 13.6] },
];
const PA_VOLO = 1.2, PA_VITA = 0.25;
const PA_SBARRE = [26.4, 27.4];
function paBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('parco', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, B = G.MOD.parco.passeggeri;
    this.chi = [
      [['al', A.Al.biglietto], ['mare', A.mare.biglietto], ['emma', A.Emma.biglietto]],
      [['al', B.Al.biglietto], ['parco', B.parco.biglietto], ['emma', B.Emma.biglietto]],
    ];
    this.parole = [['Al', 'mare', 'Emma'], ['Al', 'parco', 'Emma']];
    this.frasi = ['Al mare Emma', 'Al parco Emma'];
    let scintille = '';
    for (let i = 0; i < 6; i++) { scintille += '<g class="pa-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + G.C.luce + '"/>'; scintille += '</g>'; }
    const treni = this.chi.map((c, n) => '<g class="pa-treno" data-n="' + n + '">' + G.treno(c.map(x => ({ tipo: x[0], col: x[1] })), { sbarra: 0 }) + '</g>').join('');
    const sopra = treni + '<g class="pa-macchina"></g><g class="pa-ada"></g>' +
      '<g class="pa-seconda"><g transform="translate(-150 -22)">' + G.striscia(this.frasi[1], 300) + '</g></g>' +
      '<clipPath id="g-pa-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-pa-fessura)">' + this.frasi.map((f, n) => '<g class="pa-striscia" data-n="' + n + '"><g transform="translate(-150 -22)">' + G.striscia(f, 300) + '</g></g>').join('') + '</g>' +
      this.parole.flat().map(p => '<g class="pa-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'parco',
      html: G.sottotitolo('NARRATORE', 'Lo Spezzaparole strappa le due frasi, e i biglietti salgono su due treni uguali.') +
        G.sottotitolo('NARRATORE', 'Nel secondo treno, al posto di Mare, c’è Parco: un alberello con due occhi curiosi.') +
        G.sottotitolo('NARRATORE', 'Ed Emma, in tutti e due, ha il suo vestito rosa antico.'),
    });
    this.G = G;
    this.treni = [0, 1].map(n => this.m.qa('.pa-treno[data-n="' + n + '"] .g-vag'));
    this.pass = this.treni.map(v => v.map(x => x.querySelector('.g-pass')));
    this.ada = this.m.q('.pa-ada'); this.mac = this.m.q('.pa-macchina');
    this.str = this.m.qa('.pa-striscia'); this.big = this.m.qa('.pa-big'); this.scint = this.m.qa('.pa-scint');
    // I treni fermi sulla banchina, uno dietro l'altro.
    const path = this.m.partenza;
    this.treni.forEach((v, n) => G.posaTreno(v, path, PA_TRENI[n]));
    // I sedili, nel mondo: il punto del vagone dove siede il passeggero.
    const svg = this.m.cam.ownerSVGElement, base = this.m.cam.getCTM().inverse();
    this.sedili = this.treni.map(v => v.map(el => { const pt = svg.createSVGPoint(); pt.x = 138; pt.y = 42; const w = pt.matrixTransform(base.multiply(el.querySelector('.g-vag-in').getCTM())); return [w.x, w.y]; }));
    this.seconda = this.m.q('.pa-seconda');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.statoAda = ''; this.statoMac = ''; this.statoParco = '';
    this.sub = G.subs(kit, [[1.0, 8.4], [15.6, 23.0], [23.4, 28.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'parco', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PA_CAM, t));
    G.animaMondo(m, t + 660);
    // Ada: tiene le strisce; le dà alla biglietteria una alla volta, poi guarda i passeggeri.
    const tiene = t < PA_STRISCE[0].via ? 0 : t < PA_STRISCE[1].via ? 1 : -1;
    const espr = t < 14.2 ? 'felice' : t < 22 ? 'sorpresa' : 'felice';
    const ka = tiene + espr;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(tiene >= 0 ? 'striscia' : 'base', espr, { testo: this.frasi[Math.max(0, tiene)] }) + '</g>'; this.statoAda = ka; }
    // La seconda striscia, finché Ada ha in mano la prima, sta sopra di lei.
    this.seconda.setAttribute('transform', 'translate(' + (M.ada[0] + 4) + ' 824) rotate(5) scale(0.123)');
    this.seconda.setAttribute('opacity', t < PA_STRISCE[0].via ? 1 : 0);
    const [fx, fy] = this.fessura;
    this.str.forEach((el, n) => {
      const a = PA_STRISCE[n].via;
      let x, y, rot = 0, op = 1;
      if (t < a) {
        x = M.ada[0]; y = 808; op = 0;
      } else {
        const su = eio(seg(t, a, a + 1.0)), giu = eio(seg(t, a + 1.6, a + 2.4));
        x = lerp(M.ada[0], fx, su); y = lerp(808, fy - 22, su) + 26 * giu; rot = lerp(0, 90, eio(seg(t, a + 0.4, a + 0.9)));
        op = t > a + 2.6 ? 0 : 1;
      }
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(0.123)');
      el.setAttribute('opacity', op);
    });
    // La biglietteria lavora due volte: trema, gli aghi girano, la forbice scatta, la bocca si accende.
    let lavora = 0, forbice = 0.6, bocca = 0;
    PA_STRISCE.forEach(s => {
      lavora = Math.max(lavora, seg(t, s.tagli[0] - 0.8, s.tagli[0] - 0.6) * (1 - seg(t, s.uscite[2] + 0.6, s.uscite[2] + 0.9)));
      s.tagli.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.18))); });
      bocca = Math.max(bocca, ...s.uscite.map(a => 1 - Math.abs(t - a) / 0.3));
    });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti escono dalla bocca e volano sui sedili del loro treno; poi i passeggeri prendono vita.
    this.big.forEach((b, k) => {
      const n = Math.floor(k / 3), i = k % 3, a = PA_STRISCE[n].uscite[i], vita = a + PA_VOLO + PA_VITA;
      const u = eio(seg(t, a, a + PA_VOLO));
      const [bx, by] = this.bocca, [sx, sy] = this.sedili[n][i];
      const x = lerp(bx, sx, u), y = lerp(by, sy - 8, u) - (n === 0 ? 90 : 60) * Math.sin(Math.PI * u);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-8 * u).toFixed(1) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6));
      const p = this.pass[n][i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1);
      this.scint[k].setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...this.scint[k].children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Parco, appena nato, si guarda intorno e saluta con un rametto.
    const ciao = Math.round((-22 + 18 * Math.sin((t - 17) * 5)) * seg(t, 17.2, 17.8) * (1 - seg(t, 21.4, 22)));
    if (String(ciao) !== this.statoParco) { G.cambiaPasseggero(this.treni[1][1], 'parco', this.chi[1][1][1], { ciao }); this.statoParco = String(ciao); }
    G.sbarre(this.treni[0].concat(this.treni[1]), i => eio(seg(t, PA_SBARRE[0] + i * 0.15, PA_SBARRE[1] + i * 0.15)));
    this.sub(t);
  },
});
