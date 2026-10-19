const { seg, eo, ei, eio, lerp } = kit;
// Notte al luna park. Il trenino della prima frase, Al, Mare, Emma e la paperella blu pescata l'altra volta, scivola
// lungo la banchina e si ferma. Stacco nel salotto: sul telefono, sotto «Al mare Emma», c'è la risposta, «nuota».
// Di nuovo in stazione: le sbarre dei vagoni si alzano, i passeggeri tornano biglietti di carta e un soffio di vento
// se li porta via sopra le giostre. Il treno resta vuoto; Ada cammina lungo i sedili vuoti, col quaderno stretto al
// petto, e si chiede come fa il treno a sapere di cosa si parlava. Titolo: «Il treno che ricorda».
// Si apre sulla notte del luna park; finisce sul treno vuoto, col titolo (la riprende «striscia», nel salotto).
const VU_CAM = [
  { t: 0, cx: 640, cy: 660, z: 1.6 },
  { t: 0.6, cx: 640, cy: 660, z: 1.6 },
  { t: 4.2, cx: 360, cy: 790, z: 2.7 },
  { t: 11.4, cx: 360, cy: 790, z: 2.7 },
  { t: 13.8, cx: 540, cy: 680, z: 1.9 },
  { t: 14.8, cx: 540, cy: 680, z: 1.9 },
  { t: 17.2, cx: 300, cy: 790, z: 2.9 },
  { t: 20.8, cx: 300, cy: 790, z: 2.9 },
  { t: 24.4, cx: 360, cy: 760, z: 2.3 },
];
// Il treno scivola lungo la banchina (distanza sul percorso di partenza: il primo vagone si ferma ai piedi della salita).
const VU_ARRIVA = [0, 4.0], VU_DA = 290, VU_FERMO = 490;
const VU_SALOTTO = [4.2, 4.6, 8.8, 9.2];
const VU_SBARRE = [9.4, 10.2];
// Quando ogni passeggero torna biglietto, e quando il vento lo porta via.
const VU_CARTA = 10.2, VU_VENTO = 11.4;
const VU_CAMMINA = [14.8, 18.6], VU_ADA = [520, 200];
const VU_TITOLO = 21.6;
function vuBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('vuoto', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat;
    const parole = ['Al', 'mare', 'Emma', 'nuota'];
    this.chi = [['al', H.messaggi[0].biglietti[0]], ['mare', H.messaggi[0].biglietti[1]], ['emma', H.messaggi[0].biglietti[2]], ['paperella', G.MOD.mare.nuovo.nuota]];
    this.sedili = this.chi.map((c, i) => [M.fermo + i * M.passoBanchina + 6, 816]);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="vu-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 1 }) + '</g>' +
      parole.map(p => '<g class="vu-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') +
      '<g class="vu-ada"></g>';
    const salotto = '<g class="vu-salotto" opacity="0"><g class="vu-sal-cam">' + G.salotto('<g class="vu-tel">' + G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', 'nuota']] }) + '</g>' +
      '<rect class="vu-luce" x="22" y="502" width="144" height="76" rx="34" fill="' + G.C.luce + '" opacity="0" filter="url(#g-glow)"/>') + '</g></g>';
    const titolo = '<g class="vu-titolo" opacity="0"><g transform="translate(960 250)"><g class="vu-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vuoto', manopola: 0, banchina: true, davanti: salotto + titolo,
      html: G.sottotitolo('NARRATORE', 'Al mare Emma nuota: la risposta è arrivata. I passeggeri scendono, e il treno resta vuoto.') +
        G.sottotitolo('ADA', 'Il treno è vuoto… Come fa a sapere di cosa parlavamo prima?'),
    });
    this.G = G;
    this.vag = this.m.qa('.vu-treno .g-vag');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.big = this.m.qa('.vu-big');
    this.ada = this.m.q('.vu-ada');
    this.salotto = this.m.q('.vu-salotto'); this.salCam = this.m.q('.vu-sal-cam'); this.luceTel = this.m.q('.vu-luce');
    this.titolo = this.m.q('.vu-titolo'); this.insegna = this.m.q('.vu-insegna');
    // Il bagliore della bolla «nuota» va messo sopra il telefono (è nel gruppo del telefono, nelle sue coordinate).
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[5.0, 13.4], [15.4, 20.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'vuoto', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VU_CAM, t));
    G.animaMondo(m, t + 900);
    // Il treno arriva piano e si ferma lungo la banchina.
    const s = lerp(VU_DA, VU_FERMO, eo(seg(t, VU_ARRIVA[0], VU_ARRIVA[1])));
    G.posaTreno(this.vag, m.partenza, s, null, M.passoBanchina);
    G.sbarre(this.vag, i => 1 - eio(seg(t, VU_SBARRE[0] + i * 0.15, VU_SBARRE[1] + i * 0.15)));
    // I passeggeri si fanno di carta: il passeggero sfuma, al suo posto c'è il suo biglietto; poi il vento lo porta via.
    this.pass.forEach((p, i) => {
      const c = seg(t, VU_CARTA + i * 0.3, VU_CARTA + i * 0.3 + 0.6);
      p.setAttribute('opacity', (1 - c).toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(1, 0.6, c).toFixed(3) + ') translate(-140 -40)');
      const [sx, sy] = this.sedili[i];
      const w0 = VU_VENTO + i * 0.35, u = seg(t, w0, w0 + 3.4), e = eio(u);
      const [x, y] = vuBez([[sx, sy - 6], [sx + 40, sy - 160], [sx + 420, sy - 300], [sx + 980 - i * 40, 250 + i * 40]], e);
      const fl = Math.sin(t * 7 + i * 1.7) * (0.3 + u);
      const rot = c < 1 ? 0 : 26 * fl + 300 * e * (i % 2 ? 1 : -1);
      const sc = lerp(0.28, 0.36, eo(seg(t, w0, w0 + 1))) * lerp(1, 0.55, e);
      this.big[i].setAttribute('transform', 'translate(' + (x + 6 * fl).toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + (sc * (0.6 + 0.4 * c)).toFixed(3) + ' ' + (sc * (0.6 + 0.4 * c) * (0.75 + 0.25 * Math.cos(t * 9 + i))).toFixed(3) + ')');
      this.big[i].setAttribute('opacity', (c * (1 - seg(u, 0.75, 1))).toFixed(3));
    });
    // Ada: guarda il treno che arriva; si stupisce quando i biglietti volano via; poi cammina lungo i sedili vuoti.
    const cu = eio(seg(t, VU_CAMMINA[0], VU_CAMMINA[1]));
    const ax = lerp(VU_ADA[0], VU_ADA[1], cu), ay = M.ada[1] - (cu > 0 && cu < 1 ? 4 * Math.abs(Math.sin(t * 7)) : 0);
    const posa = t < VU_CAMMINA[0] - 0.4 ? 'base' : 'quaderno';
    const espr = t < 4.4 ? 'felice' : t < VU_CARTA ? 'base' : t < VU_CAMMINA[0] ? 'sorpresa' : t < 21 ? 'pensa' : 'base';
    if (posa + espr !== this.stato) { this.ada.innerHTML = '<g class="vu-ada-in">' + G.ada(posa, espr) + '</g>'; this.stato = posa + espr; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // Il salotto: la risposta è arrivata.
    this.salotto.setAttribute('opacity', (seg(t, VU_SALOTTO[0], VU_SALOTTO[1]) * (1 - seg(t, VU_SALOTTO[2], VU_SALOTTO[3]))).toFixed(3));
    const z = lerp(1, 1.12, eio(seg(t, VU_SALOTTO[0], VU_SALOTTO[3]))), [bx, by] = G.SALOTTO.bolla;
    this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    this.luceTel.setAttribute('opacity', ((0.25 + 0.15 * Math.sin(t * 3)) * seg(t, 5.0, 6.0)).toFixed(3));
    // Il titolo.
    const tit = eo(seg(t, VU_TITOLO, VU_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Il treno che ricorda', 1180, 210, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
