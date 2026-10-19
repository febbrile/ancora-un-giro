const { seg, eo, ei, eio, lerp } = kit;
// Ada corre dal binario morto alla stazione e infila la striscia nello Spezzaparole: zac, zac, zac, zac, zac, zac.
// Sei biglietti, uno per parola, volano sui sedili del trenino e prendono vita, uno dietro l'altro: il sassolino «Il»,
// Cane (un cucciolo di luce color nocciola, senza collare, che scodinzola), il sassolino «di», Emma col suo vestito
// rosa antico, il sassolino «si» e, nell'ultimo vagone, Chiama, la campanella del trenino, azzurro pervinca.
// Ada guarda Cane, poi Emma, e scuote la testa. Le sbarre si abbassano.
// Si apre come finisce «prima» (sulla vasca vuota); finisce sul treno pronto (lo riprende «partenza»).
const BG_CAM = [
  { t: 0, cx: 772, cy: 852, z: 3.4 },
  { t: 0.6, cx: 772, cy: 852, z: 3.4 },
  { t: 3.2, cx: 420, cy: 792, z: 3.0 },
  { t: 12.6, cx: 400, cy: 792, z: 3.0 },
  { t: 14.4, cx: 232, cy: 806, z: 7.0 },
  { t: 18.6, cx: 232, cy: 806, z: 7.0 },
  { t: 20.4, cx: 520, cy: 806, z: 7.0 },
  { t: 24.4, cx: 520, cy: 806, z: 7.0 },
  { t: 26.0, cx: 410, cy: 794, z: 3.6 },
];
const BG_ADA = [650, 836];
const BG_CORSA = [0.4, 3.2];
const BG_VIA = 4.0;
// Sei colpi di forbice; ogni biglietto esce dalla bocca poco dopo il suo colpo.
const BG_TAGLI = [6.6, 7.1, 7.6, 8.1, 8.6, 9.1];
const BG_VOLO = 1.2, BG_VITA = 0.25;
const BG_CANE = [14.6, 18.6], BG_SUONA = [20.6, 22.4];
const BG_GUARDA = [25.6, 26.4], BG_NO = [26.6, 27.8];
const BG_SBARRE = [27.0, 28.0];
const BG_PAROLE = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
kit.scene('biglietti', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, P = G.MOD.cane.passeggeri;
    const forme = { Il: 0, di: 1, si: 2 };
    this.chi = BG_PAROLE.map(w => ({ tipo: w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso', col: P[w].biglietto, o: w in forme ? { forma: forme[w] } : {} }));
    let scintille = '';
    for (let i = 0; i < 6; i++) { scintille += '<g class="bg-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const lunga = '<g class="bg-lunga"><g class="bg-lunga-in">' + G.striscia('Il cane di Emma si chiama', 380) + '</g></g>';
    const sopra = '<g class="bg-macchina"></g>' + G.treniDormono() +
      '<g class="bg-treno">' + G.treno(this.chi, { sbarra: 0 }) + '</g>' +
      '<g class="bg-ada"></g>' + '<clipPath id="g-bg-fessura"><rect x="-2000" y="-1000" width="4000" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-bg-fessura)">' + lunga + '</g>' +
      BG_PAROLE.map(p => '<g class="bg-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'biglietti', morto: true, banchina: true, manopola: 0,
      html: G.sottotitolo('NARRATORE', 'Lo Spezzaparole strappa la frase in sei biglietti, e i biglietti salgono sul treno.') +
        G.sottotitolo('NARRATORE', 'Davanti a Emma siede Cane: un cucciolo qualunque, senza collare e senza nome. In fondo, nell’ultimo vagone, c’è Chiama, una campanella.'),
    });
    this.G = G;
    this.vag = this.m.qa('.bg-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 490, M.scala, M.passoBanchina);
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.ada = this.m.q('.bg-ada'); this.mac = this.m.q('.bg-macchina'); this.lunga = this.m.q('.bg-lunga'); this.lungaIn = this.m.q('.bg-lunga-in');
    this.big = this.m.qa('.bg-big'); this.scint = this.m.qa('.bg-scint');
    // I sedili, nel mondo: il punto del vagone dove siede il passeggero.
    const svg = this.m.cam.ownerSVGElement, base = this.m.cam.getCTM().inverse();
    this.sedili = this.vag.map(el => { const pt = svg.createSVGPoint(); pt.x = 138; pt.y = 42; const w = pt.matrixTransform(base.multiply(el.querySelector('.g-vag-in').getCTM())); return [w.x, w.y]; });
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.statoAda = ''; this.statoMac = ''; this.statoCane = ''; this.statoChiama = '';
    this.sub = G.subs(kit, [[4.2, 11.6], [13.8, 25.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'biglietti', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(BG_CAM, t));
    G.animaMondo(m, t + 1000);
    // Ada corre dal binario morto alla stazione, con la striscia in mano; poi la dà allo Spezzaparole.
    const u = eio(seg(t, BG_CORSA[0], BG_CORSA[1]));
    const corre = u > 0 && u < 1;
    const ax = lerp(-95, BG_ADA[0], u), ay = (ax < 40 ? 860 : 836) - (corre ? 6 * Math.abs(Math.sin(t * 10)) : 0);
    const tiene = t < BG_VIA;
    const guarda = eio(seg(t, BG_GUARDA[0], BG_GUARDA[0] + 0.4)) * (1 - eio(seg(t, BG_GUARDA[1], BG_GUARDA[1] + 0.4)));
    const no = t > BG_NO[0] && t < BG_NO[1] ? 10 * Math.sin((t - BG_NO[0]) * 12) * Math.sin(Math.PI * seg(t, BG_NO[0], BG_NO[1])) : 0;
    const ang = Math.round((-10 * guarda - 5 * seg(t, BG_GUARDA[1], BG_GUARDA[1] + 0.4) * (1 - seg(t, BG_NO[1], BG_NO[1] + 0.4)) + no) * 2) / 2;
    const espr = t < BG_TAGLI[0] ? (corre ? 'felice' : 'base') : t < 13 ? 'felice' : t < BG_GUARDA[0] ? 'base' : t < BG_NO[0] ? 'pensa' : 'accigliata';
    const ka = (tiene ? 's' : 'b') + espr + ang;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="bg-ada-in">' + G.adaGira(tiene ? 'striscia' : 'base', espr, {}, ang) + '</g>'; this.statoAda = ka; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // La striscia: nelle mani di Ada (centro in (100, 208) nel suo disegno), poi vola nella fessura e scivola dentro.
    const sc = 0.28, [fx, fy] = this.fessura;
    const hx = ax - 100 * sc + 100 * sc, hy = ay - 304 * sc + 208 * sc;
    const su = eio(seg(t, BG_VIA, BG_VIA + 1.0)), giu = eio(seg(t, BG_VIA + 1.6, BG_VIA + 2.4));
    const x = lerp(hx, fx, su), y = lerp(hy, fy - 22, su) + 34 * giu, rot = lerp(0, 90, eio(seg(t, BG_VIA + 0.4, BG_VIA + 0.9)));
    this.lunga.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + (0.5 * sc).toFixed(4) + ')');
    this.lungaIn.setAttribute('transform', 'translate(-190 -22)');
    this.lunga.setAttribute('opacity', t > BG_VIA + 2.6 ? 0 : 1);
    // Lo Spezzaparole lavora: trema, gli aghi girano, la forbice scatta sei volte, la bocca si accende.
    const lavora = seg(t, BG_TAGLI[0] - 0.8, BG_TAGLI[0] - 0.6) * (1 - seg(t, BG_TAGLI[5] + 0.9, BG_TAGLI[5] + 1.2));
    let forbice = 0.6, bocca = 0;
    BG_TAGLI.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.16))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.3) / 0.3); });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti escono dalla bocca e volano sui sedili; poi i passeggeri prendono vita, uno dietro l'altro.
    this.big.forEach((b, i) => {
      const a = BG_TAGLI[i] + 0.3, vita = a + BG_VOLO + BG_VITA;
      const v = eio(seg(t, a, a + BG_VOLO));
      const [bx, by] = this.bocca, [sx, sy] = this.sedili[i];
      const x = lerp(bx, sx, v), y = lerp(by, sy - 8, v) - (50 + 8 * (5 - i)) * Math.sin(Math.PI * v);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-8 * v).toFixed(1) + ') scale(' + (0.24 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const w = eo(seg(t, vita, vita + 0.6));
      this.pass[i].setAttribute('opacity', w.toFixed(3));
      this.pass[i].setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, w).toFixed(3) + ') translate(-140 -40)');
      const s = seg(t, vita, vita + 1.1);
      this.scint[i].setAttribute('opacity', (s > 0 && s < 1 ? 1 - s : 0).toFixed(3));
      [...this.scint[i].children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 6 + 22 * eo(s); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Cane scodinzola sempre un poco, e di più quando la camera lo guarda; Chiama suona quando arriva il suo turno.
    const forte = seg(t, BG_CANE[0], BG_CANE[0] + 0.4) * (1 - seg(t, BG_CANE[1] - 0.4, BG_CANE[1]));
    const coda = Math.round((10 + (8 + 16 * forte) * Math.sin(t * (6 + 6 * forte))) / 2) * 2;
    if (String(coda) !== this.statoCane) { G.cambiaPasseggero(this.vag[1], 'cane', this.chi[1].col, { coda }); this.statoCane = String(coda); }
    const suona = Math.round(16 * Math.sin((t - BG_SUONA[0]) * 9) * Math.sin(Math.PI * seg(t, BG_SUONA[0], BG_SUONA[1])));
    if (String(suona) !== this.statoChiama) { G.cambiaPasseggero(this.vag[5], 'chiama', this.chi[5].col, { suona }); this.statoChiama = String(suona); }
    G.sbarre(this.vag, i => eio(seg(t, BG_SBARRE[0] + i * 0.12, BG_SBARRE[1] + i * 0.12)));
    this.sub(t);
  },
});
