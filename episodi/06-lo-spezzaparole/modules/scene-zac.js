const { seg, eo, ei, eio, lerp } = kit;
// Ada infila la striscia nello Spezzaparole. Zac: esce «Al». Zac: esce «mare». Poi, per una parola sola, la forbice
// scatta tre volte, e dalla bocca esce una striscetta tagliata in tre, «Zam», «pi», «rù», i bordi strappati che
// combaciano. I tre biglietti si staccano e volano sul trenino, che questa volta ha cinque vagoni. Al e Mare prendono
// vita come sempre; i tre biglietti, appena toccano i sedili, perdono le scritte e aprono gli occhi: restano biglietti,
// ognuno col vestito del suo colore. Si guardano, un po' stupiti. Le sbarre si abbassano, Ada conta i vagoni. Titolo.
// Si apre come finisce «nome»; finisce sul treno pronto in stazione (lo riprende «partenza»).
const ZC_CAM = [
  { t: 0, cx: 534, cy: 790, z: 4.6 },
  { t: 1.0, cx: 560, cy: 784, z: 4.2 },
  { t: 2.4, cx: 560, cy: 784, z: 4.2 },
  { t: 3.4, cx: 420, cy: 792, z: 2.8 },
  { t: 6.0, cx: 420, cy: 792, z: 2.8 },
  { t: 6.9, cx: 566, cy: 792, z: 4.4 },
  { t: 8.8, cx: 566, cy: 792, z: 4.4 },
  { t: 9.9, cx: 430, cy: 784, z: 3.0 },
  { t: 10.8, cx: 430, cy: 784, z: 3.0 },
  { t: 12.0, cx: 384, cy: 800, z: 5.0 },
  { t: 16.0, cx: 384, cy: 800, z: 5.0 },
  { t: 17.2, cx: 380, cy: 796, z: 3.0 },
  { t: 23.4, cx: 380, cy: 796, z: 3.0 },
  { t: 25.4, cx: 340, cy: 640, z: 1.9 },
];
const ZC_PASSO = 76, ZC_TRENO = 490;
const ZC_VIA = 1.0;
// I colpi di forbice e quando escono i biglietti: «Al», «mare», poi i tre pezzi insieme.
const ZC_TAGLI = [3.0, 4.2, 7.2, 7.55, 7.9];
const ZC_USCITE = [3.3, 4.5, 8.3];
const ZC_VOLO = 1.2, ZC_VITA = 0.25;
// I tre pezzi: escono attaccati, si staccano, volano ai sedili, aprono gli occhi.
const ZC_STACCA = [9.2, 9.6], ZC_PEZZI_VOLO = [9.8, 11.0], ZC_OCCHI = 0.25;
const ZC_SGUARDI = [12.2, 15.8];
const ZC_SBARRE = [16.8, 17.8];
const ZC_CONTA = [18.0, 18.5, 19.0, 19.5, 20.0];
const ZC_TITOLO = 24.0;
function zcBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
const zcBolla = (t, a, b) => Math.sin(Math.PI * seg(t, a, b));
kit.scene('zac', {
  init(kit) {
    const G = window.G, M = G.MONDO, Z = G.MOD.zampiru, P = Z.passeggeri, C = G.C;
    this.pezzi = Z.pezzi;
    this.strappi = ['', '', 'd', 'sd', 's'];
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['pezzo', P.Zam.biglietto], ['pezzo', P.pi.biglietto], ['pezzo', P['rù'].biglietto]];
    let scintille = '';
    for (let i = 0; i < 5; i++) { scintille += '<g class="zc-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const conta = this.chi.map((c, i) => '<ellipse class="zc-conta" cx="' + (150 + ZC_PASSO * i) + '" cy="826" rx="40" ry="26" fill="' + C.luce + '" opacity="0" filter="url(#g-soft)"/>').join('');
    // Ogni biglietto due volte: color crema, e tinto del suo vestito (quando arriva sul sedile).
    const big = this.pezzi.map((p, k) => '<g class="zc-big" opacity="0"><g transform="translate(-60 -30)"><g class="zc-crema">' + G.biglietto(p, { strappo: this.strappi[k] }) + '</g>' +
      '<g class="zc-tinto" opacity="0">' + G.biglietto(p, { strappo: this.strappi[k], fondo: G.mix(C.crema, this.chi[k][1], 0.7) }) + '</g></g></g>').join('');
    const sopra = '<g class="zc-macchina"></g>' + conta +
      '<g class="zc-treno">' + G.treno(this.chi.map((c, k) => ({ tipo: c[0], col: c[1], o: { strappo: this.strappi[k] } })), { sbarra: 0 }) + '</g>' +
      '<g class="zc-ada"></g>' +
      '<clipPath id="g-zc-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-zc-fessura)"><g class="zc-striscia"><g transform="translate(-150 -22)">' + G.striscia('Al mare Zampirù', 300) + '</g></g></g>' +
      big + scintille;
    const titolo = '<g class="zc-titolo" opacity="0"><g transform="translate(960 300)"><g class="zc-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'zac', manopola: 0, banchina: true, morto: true, davanti: titolo,
      html: G.sottotitolo('NARRATORE', 'Lo Spezzaparole strappa «Al», strappa «mare». Ma per Zampirù la forbice fa zac tre volte.') +
        G.sottotitolo('NARRATORE', 'Sul treno salgono tre biglietti, ognuno con il suo vestito.') +
        G.sottotitolo('ADA', 'Tre vagoni per una parola sola?'),
    });
    this.G = G;
    const m = this.m;
    this.vag = m.qa('.zc-treno .g-vag');
    G.posaTreno(this.vag, m.partenza, ZC_TRENO, null, ZC_PASSO);
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.ada = m.q('.zc-ada'); this.mac = m.q('.zc-macchina'); this.str = m.q('.zc-striscia');
    this.big = m.qa('.zc-big').map(el => ({ el, crema: el.querySelector('.zc-crema'), tinto: el.querySelector('.zc-tinto') }));
    this.scint = m.qa('.zc-scint'); this.conta = m.qa('.zc-conta');
    this.titolo = m.q('.zc-titolo'); this.insegna = m.q('.zc-insegna');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    // Il vagone i, fermo in stazione: il centro, il sedile (dove nasce il passeggero) e il corpo di un pezzo.
    this.xv = i => 150 + ZC_PASSO * i;
    this.sedile = i => [this.xv(i) + 6, 816];
    this.corpo = i => [this.xv(i) + 6.7, 809];
    this.statoAda = ''; this.statoMac = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[1.0, 9.6], [11.0, 16.4], [20.6, 23.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'zac', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(ZC_CAM, t));
    G.animaMondo(m, t + 640);
    // Ada: dà la striscia alla biglietteria, guarda, conta i vagoni, si stupisce.
    const tiene = t < ZC_VIA;
    const espr = tiene ? 'pensa' : t < 7.0 ? 'base' : t < 10.4 ? 'sorpresa' : t < 17.6 ? 'felice' : t < 20.4 ? 'pensa' : t < 23.6 ? 'sorpresa' : 'felice';
    const ka = tiene + espr;
    if (ka !== this.statoAda) {
      let s = G.ada(tiene ? 'striscia' : 'base', espr, { testo: 'Al mare Zampirù' }).replace('font-size="20"', 'font-size="15"');
      this.ada.innerHTML = '<g class="zc-ada-in"><g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + s + '</g></g>';
      this.statoAda = ka;
    }
    // Conta: a ogni vagone fa un cenno con la testa.
    const cenno = ZC_CONTA.reduce((a, c) => a + zcBolla(t, c - 0.05, c + 0.3), 0);
    this.ada.firstChild.setAttribute('transform', 'translate(0 ' + (1.6 * cenno).toFixed(2) + ')');
    this.conta.forEach((el, i) => el.setAttribute('opacity', (0.55 * zcBolla(t, ZC_CONTA[i] - 0.1, ZC_CONTA[i] + 0.6)).toFixed(3)));
    // La striscia sale alla fessura, si mette in piedi e sparisce dentro.
    const [fx, fy] = this.fessura;
    {
      let x = M.ada[0], y = 808, rot = 0, op = 0;
      if (t >= ZC_VIA) {
        const su = eio(seg(t, ZC_VIA, ZC_VIA + 1.0)), giu = eio(seg(t, ZC_VIA + 1.6, ZC_VIA + 2.4));
        x = lerp(M.ada[0], fx, su); y = lerp(808, fy - 22, su) + 26 * giu; rot = lerp(0, 90, eio(seg(t, ZC_VIA + 0.4, ZC_VIA + 0.9)));
        op = t > ZC_VIA + 2.6 ? 0 : 1;
      }
      this.str.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(0.123)');
      this.str.setAttribute('opacity', op);
    }
    // La biglietteria lavora: trema, gli aghi girano, la forbice scatta, la bocca si accende.
    const lavora = Math.max(seg(t, 2.2, 2.4) * (1 - seg(t, 5.0, 5.3)), seg(t, 6.6, 6.8) * (1 - seg(t, 8.8, 9.1)));
    let forbice = 0.6;
    ZC_TAGLI.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.14))); });
    const bocca = Math.max(0, ...ZC_USCITE.map(a => 1 - Math.abs(t - a) / 0.3));
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti.
    const [bx, by] = this.bocca;
    this.big.forEach((b, k) => {
      let x, y, sc, rot = 0, op, tinto = 0, nasce = 0;
      if (k < 2) {
        // «Al» e «mare»: escono, volano al sedile e il passeggero prende vita, come sempre.
        const a = ZC_USCITE[k], vita = a + ZC_VOLO + ZC_VITA;
        const u = eio(seg(t, a, a + ZC_VOLO));
        const [sx, sy] = this.sedile(k);
        x = lerp(bx, sx, u); y = lerp(by, sy - 8, u) - 70 * Math.sin(Math.PI * u);
        nasce = seg(t, vita - 0.15, vita + 0.25);
        sc = 0.26 * (1 - 0.5 * nasce); rot = -8 * u; op = t < a ? 0 : 1 - nasce;
        const v = eo(seg(t, vita, vita + 0.6));
        this.pass[k].setAttribute('opacity', v.toFixed(3));
        this.pass[k].setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
        this.scintilla(k, t, vita);
      } else {
        // I tre pezzi: escono attaccati (i bordi combaciano), si staccano, volano al loro sedile.
        const j = k - 3, a = ZC_USCITE[2];
        const esce = eo(seg(t, a, a + 0.7)), stacca = eio(seg(t, ZC_STACCA[0], ZC_STACCA[1]));
        const s0 = lerp(0.1, 0.3, esce);
        const hx = lerp(bx - 6, 488, esce) + j * (120 * s0 + 7 * stacca), hy = lerp(by, 752, esce) - 3 * stacca * Math.abs(j) + 2 * Math.sin(t * 3 + k);
        const t0 = ZC_PEZZI_VOLO[0] + 0.12 * (j + 1), t1 = ZC_PEZZI_VOLO[1] + 0.12 * (j + 1);
        const u = eio(seg(t, t0, t1));
        const [cx, cy] = this.corpo(k);
        const p = zcBez([[hx, hy], [hx - 10, hy - 40], [cx, cy - 60], [cx, cy]], u);
        x = p[0]; y = p[1]; sc = lerp(s0, 0.39, u); rot = 6 * j * stacca * (1 - u) - 10 * Math.sin(Math.PI * u);
        tinto = eio(seg(t, t1 - 0.5, t1 + 0.1));
        const occhi = t1 + ZC_OCCHI;
        nasce = eio(seg(t, occhi, occhi + 0.5));
        op = t < a ? 0 : 1 - nasce;
        this.pass[k].setAttribute('opacity', nasce.toFixed(3));
        this.scintilla(k, t, occhi);
        // Si guardano: «Zam» si piega verso «pi», «pi» guarda di qua e di là, «rù» si piega verso gli altri due.
        const g = ZC_SGUARDI[0];
        const pieghe = [9 * zcBolla(t, g, g + 1.6) + 4 * zcBolla(t, g + 2.4, g + 3.2),
          -8 * zcBolla(t, g + 0.5, g + 1.4) + 8 * zcBolla(t, g + 1.4, g + 2.3),
          -9 * zcBolla(t, g + 0.3, g + 1.9) - 4 * zcBolla(t, g + 2.4, g + 3.2)][j + 1];
        const salto = -7 * zcBolla(t, g + 2.4, g + 3.0) * (1 + 0.2 * j);
        this.pass[k].setAttribute('transform', 'translate(0 ' + salto.toFixed(2) + ') rotate(' + pieghe.toFixed(2) + ' 140 60)');
      }
      b.el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      b.el.setAttribute('opacity', op.toFixed(3));
      b.tinto.setAttribute('opacity', tinto.toFixed(3));
    });
    G.sbarre(this.vag, i => eio(seg(t, ZC_SBARRE[0] + i * 0.15, ZC_SBARRE[1] + i * 0.15)));
    // Il titolo.
    const tit = eo(seg(t, ZC_TITOLO, ZC_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Lo Spezzaparole', 1000, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
  // Le scintille intorno al sedile quando un passeggero prende vita.
  scintilla(k, t, vita) {
    const [sx, sy] = this.sedile(k), sc = seg(t, vita, vita + 1.1), el = this.scint[k];
    el.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...el.children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
  },
});
