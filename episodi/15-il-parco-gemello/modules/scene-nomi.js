const { seg, eo, eio, lerp } = kit;
// Ada si siede in mezzo al ponte, con un parco da una parte e uno dall'altra, e il quaderno sulle ginocchia. Le due
// montagne, identiche, si guardano da una riva all'altra. Poi un confronto alla volta: le due frasi del parco, in testa
// ai due treni; i due Bruchi; la cabina sulla collina di Ada e la collina vuota di laggiù; il telone, piegato sul braccio
// del custode; i due custodi, ognuno col suo regolamento. Torniamo su Ada, che annuisce. Nessun nome vero: stanno nella coda.
// Coordinate del parco di Ada (il parco gemello è spostato di G.S2.GEMELLO.dx). Si apre sul ponte; finisce su Ada.
const NO_ADA = [-3270, 852];
const NO_FRASI = [10.0, 10.4, 15.6, 16.0];
const NO_CAM = [
  { t: 0, cx: -3900, cy: 560, z: 0.7 },
  { t: 7.6, cx: -3700, cy: 600, z: 0.76 },
  { t: 9.6, cx: -3200, cy: 780, z: 2.4 },
  // I due Bruchi.
  { t: 15.99, cx: -3200, cy: 780, z: 2.4 }, { t: 16.0, cx: 1270, cy: 990, z: 3.0 },
  { t: 17.69, cx: 1270, cy: 990, z: 3.0 }, { t: 17.7, cx: -4430, cy: 990, z: 3.0 },
  // La collina di Ada, con la cabina; la collina di laggiù, vuota.
  { t: 19.39, cx: -4430, cy: 990, z: 3.0 }, { t: 19.4, cx: 2300, cy: 560, z: 1.0 },
  { t: 21.09, cx: 2300, cy: 560, z: 1.0 }, { t: 21.1, cx: -4000, cy: 600, z: 1.1 },
  // Il telone, sul braccio del custode.
  { t: 23.19, cx: -4000, cy: 600, z: 1.1 }, { t: 23.2, cx: 500, cy: 800, z: 3.8 },
  // I due custodi, col loro regolamento.
  { t: 28.19, cx: 500, cy: 800, z: 3.8 }, { t: 28.2, cx: 480, cy: 790, z: 4.4 },
  { t: 30.99, cx: 480, cy: 790, z: 4.4 }, { t: 31.0, cx: 480 - 5700, cy: 800, z: 4.4 },
  { t: 33.79, cx: 480 - 5700, cy: 800, z: 4.4 }, { t: 33.8, cx: -3200, cy: 790, z: 3.4 },
  { t: 36.6, cx: -3220, cy: 800, z: 3.8 },
];
const NO_ANNUISCE = [[9.6, 10.0], [15.6, 16.0], [33.8, 34.6]];
kit.scene('nomi', {
  init(kit) {
    const G = window.G, C = G.C, S2 = G.S2, dx = S2.GEMELLO.dx;
    // Le due frasi del parco, in testa ai due treni: sopra quella di Ada, sotto quella di laggiù.
    const testa = (chi, y) => chi.slice(0, 4).map((c, i) => '<g transform="translate(' + (420 + i * 290) + ' ' + y + ') scale(1.15)">' +
      G.vagone({ primo: i === 0, sbarra: 1 }, '<g>' + G.passeggero(c.tipo, c.biglietto, c.o) + '</g>') + '</g>').join('');
    const frasi = '<g class="no-frasi" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/>' +
      '<circle cx="960" cy="540" r="760" fill="' + C.luce + '" opacity=".1" filter="url(#g-velo)"/>' +
      testa(S2.treno(G.MOD.seconda.parco.giri[0]), 200) + testa(S2.treno(G.MOD.seconda.gemello.laggiu), 640) + '</g>';
    // La teleferica di Ada, con la cabina a metà salita.
    const [px, py] = S2.puntoCabina(0.3);
    const tel = S2.teleferica({}) + '<g transform="translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')">' + S2.cabina({}) + '</g>';
    // I custodi: quello di Ada col telone piegato sul braccio, poi col regolamento; quello di laggiù col suo.
    const [hx, hy] = G.puntoCustode(470, 836, G.CUSTODE_MANI.porge);
    const sopra = tel + '<g class="no-cu"></g><g class="no-cu-telone">' + S2.telonePiegato(hx + 6, hy + 2, 0.9) + '</g>' +
      '<g transform="' + G.posaCustode(470 + dx, 836, 0.26) + '">' + G.unico(G.custodeGemello('legge', 'sorriso', { occhi: 1 }), 'nocg') + '</g><g class="no-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'nomi', manopola: 0, banchina: true, morto: true, bruco: 'acceso', fiume: true, davanti: frasi,
      prima: S2.parcoGemello({ bruco: 'acceso' }),
      html: G.sottotitolo('NARRATORE', 'Dentro, le due montagne sono la stessa: stessa pista, stesso giro, curva per curva.') +
        G.sottotitolo('NARRATORE', 'Fuori no: in testa al treno sale un’altra frase del parco.') +
        G.sottotitolo('NARRATORE', 'Un altro Bruco guarda le strisce, e laggiù non c’è nessuna teleferica.') +
        G.sottotitolo('NARRATORE', 'Il telone si stende quando lo dice il regolamento.') +
        G.sottotitolo('NARRATORE', 'Due custodi, due regolamenti: è il parco intorno che cambia.'),
    });
    this.G = G;
    const q = this.m.q;
    this.cu = q('.no-cu'); this.telone = q('.no-cu-telone'); this.ada = q('.no-ada'); this.frasi = q('.no-frasi');
    this.stati = {};
    this.sub = G.subs(kit, [[2.0, 9.2], [10.4, 15.6], [16.2, 22.8], [23.4, 27.8], [28.4, 33.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'nomi', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(NO_CAM, t));
    G.animaMondo(m, t + 2720);
    const [f0, f1, f2, f3] = NO_FRASI;
    this.frasi.setAttribute('opacity', (seg(t, f0, f1) * (1 - seg(t, f2, f3))).toFixed(3));
    // Il custode di Ada: col telone sul braccio; poi col regolamento aperto.
    const legge = t >= 28.2;
    this.cambia('cu', legge, this.cu, '<g transform="' + G.posaCustode(470, 836) + '">' + G.unico(G.custode(legge ? 'legge' : 'porge', 'base', { occhi: legge ? 0 : -1, pagina: 'frase' }), 'nocu') + '</g>');
    this.telone.setAttribute('opacity', legge ? 0 : 1);
    // Ada, seduta in mezzo al ponte col quaderno: annuisce.
    let ann = 0;
    NO_ANNUISCE.forEach(([a, b]) => { ann += Math.sin(Math.PI * 2 * seg(t, a, b)) * (t > a && t < b ? 1 : 0); });
    const ang = Math.round(8 * ann), espr = t > 33.8 ? 'felice' : 'base';
    this.cambia('ada', espr + ang, this.ada, '<g transform="' + G.posaAda(NO_ADA[0], NO_ADA[1]) + '">' + G.adaSeduta('quaderno', espr, { testa: ang }) + '</g>');
    this.sub(t);
  },
});
