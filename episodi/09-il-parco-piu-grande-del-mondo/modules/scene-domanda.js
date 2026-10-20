const { seg, eo, eio, lerp } = kit;
// Notte al luna park di Ada. Ada è sulla banchina, col quaderno chiuso sotto il braccio; il trenino aspetta in stazione,
// con le sbarre alzate e le lucine basse. Oltre la ruota panoramica, dietro le colline, c'è il chiarore delle luci viste
// l'altra volta. Sopra il parco passano strisce di carta: una scende alla stazione, nello Spezzaparole, ma quasi tutte
// proseguono alte, oltre le colline, verso quel chiarore. Ada le segue con lo sguardo, in punta di piedi. Titolo.
// Si apre come finisce l'episodio 8, sul parco con le luci laggiù; finisce sul parco intero (lo riprende «collina»).
const DM_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 2.0, cx: 960, cy: 540, z: 1 },
  { t: 6.4, cx: 1080, cy: 600, z: 1.3 },
  { t: 10.4, cx: 1080, cy: 600, z: 1.3 },
  { t: 12.0, cx: 900, cy: 660, z: 1.55 },
  { t: 14.8, cx: 900, cy: 660, z: 1.55 },
  { t: 16.6, cx: 960, cy: 540, z: 1 },
];
// La striscia che scende nello Spezzaparole di Ada: quando parte, quando entra nella fessura.
const DM_GIU = [2.2, 6.8];
const DM_PUNTA = [6.0, 11.4];
const DM_TITOLO = 16.4;
function dmBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare;
    // Il trenino di Ada, fermo in stazione: Al, Mare, Emma e la paperella dell'ultimo giro.
    const chi = [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }];
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s];
    const sopra = '<g class="dm-treno">' + G.treno(chi, { sbarra: 0 }) + '</g>' +
      '<g class="dm-spezza"></g>' +
      '<clipPath id="g-dm-fessura"><rect x="-2000" y="-2000" width="5000" height="' + (2000 + this.fessura[1]) + '"/></clipPath>' +
      '<g clip-path="url(#g-dm-fessura)"><g class="dm-giu" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('', 300) + '</g></g></g>' +
      '<g class="dm-ada"></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 250)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'domanda', laggiu: 1, manopola: 0, banchina: true, morto: true, davanti: titolo,
      html: G.sottotitolo('NARRATORE', 'L’ultima volta, oltre le colline, Ada ha visto le luci di un altro parco. E quasi tutte le frasi volano là.') +
        G.sottotitolo('ADA', 'Che cosa c’è laggiù?'),
    });
    this.G = G;
    const vag = this.m.qa('.dm-treno .g-vag');
    G.posaTreno(vag, this.m.arrivo, this.m.arrivo.getTotalLength() - (M.fermo - 40));
    this.m.qa('.dm-treno .g-lucina').forEach(l => l.setAttribute('opacity', 0.3));
    this.ada = this.m.q('.dm-ada'); this.spezza = this.m.q('.dm-spezza'); this.giu = this.m.q('.dm-giu');
    this.titolo = this.m.q('.dm-titolo'); this.insegna = this.m.q('.dm-insegna');
    this.statoAda = ''; this.statoSp = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 10.2], [12.0, 14.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'domanda', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaPaesaggio(m, t + 40, { treni: false });
    // La striscia che scende: dal cielo alla fessura dello Spezzaparole di Ada.
    const u = eio(seg(t, DM_GIU[0], DM_GIU[1]));
    const [fx, fy] = this.fessura;
    const p = dmBez([[-180, 330], [220, 240], [fx - 30, fy - 300], [fx, fy + 18]], u);
    const rot = lerp(-12, 90, eio(seg(t, DM_GIU[1] - 1.2, DM_GIU[1] - 0.4))) + (1 - u) * 8 * Math.sin(t * 3);
    this.giu.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(.123)');
    this.giu.setAttribute('opacity', t > DM_GIU[0] && t < DM_GIU[1] + 0.2 ? 1 : 0);
    // Lo Spezzaparole di Ada la riceve: trema un poco, gli aghi girano.
    const lav = seg(t, DM_GIU[1] - 0.1, DM_GIU[1]) * (1 - seg(t, DM_GIU[1] + 0.9, DM_GIU[1] + 1.2));
    const aghi = Math.round(lav * 60 * Math.sin(t * 6) / 10) * 10, bocca = lav > 0 ? 0.5 : 0;
    const ks = aghi + '|' + bocca;
    const tr = 'translate(' + (lav * 1.2 * Math.sin(t * 40)).toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (ks !== this.statoSp) { this.spezza.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ aghi, bocca }) + '</g>'; this.statoSp = ks; }
    else this.spezza.firstChild.setAttribute('transform', tr);
    // Ada segue le strisce con lo sguardo, in punta di piedi; poi si chiede che cosa c'è laggiù.
    const espr = t < 3.6 ? 'base' : t < 10.6 ? 'sorpresa' : t < 15.6 ? 'pensa' : 'felice';
    if (espr !== this.statoAda) {
      this.ada.innerHTML = '<g class="dm-ada-in">' + G.ada('base', espr) +
        '<g transform="rotate(-10 140 196)"><rect x="124" y="168" width="34" height="50" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2.5"/><rect x="154" y="172" width="4" height="42" fill="' + G.C.crema + '"/></g></g>';
      this.statoAda = espr;
    }
    const punta = Math.sin(Math.PI * seg(t, DM_PUNTA[0], DM_PUNTA[1])) > 0 ? 5 * Math.abs(Math.sin((t - DM_PUNTA[0]) * 2.4)) * Math.min(1, (t - DM_PUNTA[0]) / 0.5, (DM_PUNTA[1] - t) / 0.5) : 0;
    this.ada.firstChild.setAttribute('transform', G.posaAda(M.ada[0], M.ada[1] - Math.max(0, punta)));
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Il parco più grande del mondo', 1500, 190, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
