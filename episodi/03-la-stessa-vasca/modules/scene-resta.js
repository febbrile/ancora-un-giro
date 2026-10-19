const { seg, eo, ei, eio, lerp } = kit;
// La paperella verde chiaro salta di mano ad Ada e corre lungo la banchina, a sedersi in un vagone nuovo, dietro Emma.
// Ada fa un passo per riprenderla, ma la sbarra si è già abbassata: il treno riparte, un vagone più lungo, e sparisce
// nella montagna con la paperella dentro. Ada torna alla bancarella e riporta piano la freccia sulla tacca di mezzo.
// Si apre come finisce «larga» (Ada con la paperella in mano); finisce sulla manopola nel mezzo (la riprende «ancora»).
const RE_CAM = [
  { t: 0, cx: 676, cy: 840, z: 6.8 },
  { t: 0.8, cx: 676, cy: 840, z: 6.8 },
  { t: 2.8, cx: 560, cy: 822, z: 3.4 },
  { t: 4.6, cx: 560, cy: 822, z: 3.4 },
  { t: 7.6, cx: 640, cy: 640, z: 1.35 },
  { t: 10.2, cx: 760, cy: 600, z: 1.25 },
  { t: 12.0, cx: 706, cy: 846, z: 6.0 },
  { t: 16.2, cx: 706, cy: 846, z: 6.4 },
];
const RE_SALTA = 0.8, RE_VAGONE = 1.8, RE_SALE = 3.4;
const RE_PASSO = [2.6, 4.0], RE_TORNA = [9.4, 11.2];
const RE_SBARRA = [3.7, 4.3];
const RE_PARTE = [4.6, 10.6];
const RE_GIRA = [12.2, 14.2];
kit.scene('resta', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, P = G.MOD.mare.passeggeri, MN = G.MOD.manopola;
    this.col = MN.nuovo.altalena;
    // La paperella pescata ha il colore della sua parola nella vasca.
    this.colVasca = MN.vasche.larga.find(v => v[0] === 'altalena')[2];
    const chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto], ['paperella', this.col]];
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + C.luce + '"/>';
    const quaderno = '<g transform="translate(704 830)"><rect x="-13" y="-4" width="26" height="5" rx="1.5" fill="#2F6F73" stroke="#1E4A4D" stroke-width="1"/><rect x="-11" y="-5" width="22" height="2" fill="' + C.crema + '"/></g>';
    const sopra = '<g class="re-treno">' + G.treno(chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 1 }) + '</g>' +
      '<g class="re-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      quaderno + '<g class="re-ada"></g>' +
      '<g class="re-papera"><g transform="translate(-50 -84)">' + G.paperella(this.colVasca) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'resta', manopola: 1,
      html: G.sottotitolo('NARRATORE', 'Ma quello che è pescato resta pescato. Il treno riparte, e non torna indietro.'),
    });
    this.G = G;
    this.vag = this.m.qa('.re-treno .g-vag'); this.passNuovo = this.vag[3].querySelector('.g-pass');
    this.ada = this.m.q('.re-ada'); this.papera = this.m.q('.re-papera'); this.scint = this.m.q('.re-scint');
    this.manWorld = this.m.q('.g-manopola');
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = ''; this.statoMan = '';
    this.sub = G.subs(kit, [[6.4, 13.4]]);
  },
  manoAt(x, giu) {
    const s = 0.28, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [x - 100 * s + mx * s, 896 - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('03', 'resta', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(RE_CAM, t));
    G.animaMondo(m, t + 1140);
    // Il treno, fermo in stazione; la sbarra del vagone nuovo si abbassa e il treno riparte, un vagone più lungo.
    const s = lerp(640 - M.fermo, 2400, ei(seg(t, RE_PARTE[0], RE_PARTE[1])));
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    if (t < RE_PARTE[0]) this.vag[3].setAttribute('opacity', eo(seg(t, RE_VAGONE, RE_VAGONE + 0.6)).toFixed(3));
    G.sbarre([this.vag[3]], eio(seg(t, RE_SBARRA[0], RE_SBARRA[1])));
    this.passNuovo.setAttribute('opacity', seg(t, RE_SALE - 0.05, RE_SALE + 0.3).toFixed(3));
    const sc = seg(t, RE_VAGONE, RE_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    // Ada: fa un passo verso il treno, con la mano tesa; poi torna alla bancarella e riporta la freccia nel mezzo.
    const ax = lerp(lerp(672, 604, eio(seg(t, RE_PASSO[0], RE_PASSO[1]))), 672, eio(seg(t, RE_TORNA[0], RE_TORNA[1])));
    const salti = (t > RE_PASSO[0] && t < RE_PASSO[1]) || (t > RE_TORNA[0] && t < RE_TORNA[1]) ? 5 * Math.abs(Math.sin(t * 9)) : 0;
    const tende = t >= RE_PASSO[0] && t < RE_TORNA[0];
    const posa = t < RE_SALTA || tende || (t >= RE_GIRA[0] - 0.6 && t < RE_GIRA[1] + 0.4) ? 'pesca' : 'base';
    const giu = t < RE_SALTA ? 0 : tende ? 0.3 : 0.15;
    const espr = t < RE_SALTA + 0.4 ? 'sorpresa' : t < RE_PARTE[0] ? 'sorpresa' : t < RE_TORNA[0] ? 'base' : 'pensa';
    const k = posa + espr + giu + Math.round(ax) + Math.round(salti);
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(ax, 896 - salti) + '">' + G.ada(posa, espr, { giu }) + '</g>'; this.stato = k; }
    // La paperella pescata: salta giù dalla mano e corre al vagone nuovo.
    const [hx, hy] = this.manoAt(672, 0);
    let px = hx, py = hy, pr = 0;
    const a = eo(seg(t, RE_SALTA, RE_SALTA + 0.7)), corsa = eio(seg(t, RE_SALTA + 0.7, RE_SALE - 0.5)), salto = eio(seg(t, RE_SALE - 0.5, RE_SALE));
    if (t >= RE_SALTA && t < RE_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
    else if (t >= RE_SALTA + 0.7 && t < RE_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
    else if (t >= RE_SALE - 0.5) { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
    this.papera.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.papera.setAttribute('opacity', (t < RE_SALE ? 1 : 1 - seg(t, RE_SALE, RE_SALE + 0.3)).toFixed(3));
    // La manopola torna piano sulla tacca di mezzo; le lucine piccole si spengono.
    const pos = 1 - eio(seg(t, RE_GIRA[0], RE_GIRA[1]));
    const pq = Math.round(pos * 40) / 40;
    if (String(pq) !== this.statoMan) { this.manWorld.innerHTML = G.manopola(pq); this.statoMan = String(pq); }
    this.sub(t);
  },
});
