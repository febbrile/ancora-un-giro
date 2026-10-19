const { seg, eo, ei, eio, lerp } = kit;
// Nel salotto si scrive «Al parco» e si preme invio: il messaggio sale nella chat, sotto quelli di prima. Fuori, dalla
// finestra parte la striscia di carta, ma è lunga: si srotola nel cielo come la coda di un aquilone, sopra i tetti.
// Alla stazione la striscia scende sulla banchina, Ada la prende al volo e la striscia si stende lungo i sedili vuoti.
// Ada la segue camminando e legge: «Al mare Emma nuota Al parco». C'è tutta la chat.
// Si apre nel salotto; finisce sulla striscia stesa sopra il treno vuoto, con Ada vicino allo Spezzaparole
// (la riprende «banchina»).
const ST_SCRIVE = 0.9, ST_INVIO = 3.5;
const ST_SALOTTO = [5.0, 5.6];
const ST_CIELO = [5.6, 11.6], ST_STAZ = [11.4, 12.0];
// La striscia alla stazione: scende dal cielo e si stende sopra i sedili (la testa arriva in fondo a ST_STESA).
const ST_SCENDE = [11.8, 14.8];
const ST_PRESA = 14.3;
const ST_CAMMINA = [15.2, 19.6], ST_ADA = [124, 512];
const ST_CAM = [
  { t: 11.4, cx: 300, cy: 760, z: 2.5 },
  { t: 14.0, cx: 280, cy: 780, z: 2.8 },
  { t: 15.2, cx: 280, cy: 780, z: 2.8 },
  { t: 19.6, cx: 430, cy: 780, z: 2.8 },
  { t: 22.0, cx: 400, cy: 780, z: 2.55 },
];
const ST_PAROLE = ['Al', 'mare', 'Emma', 'nuota', 'Al', 'parco'];
// Il passo della striscia: una parola ogni vagone della banchina.
const ST_PASSO = 76, ST_ALTO = 18;
function stBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('striscia', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, H = G.MOD.chat, r = G.rng(31);
    // La città dall'alto, di notte: la finestra accesa da cui parte la striscia, i tetti, il luna park lontano.
    let stelle = '';
    for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
    let raggi = '', bulbi = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; raggi += '<line x1="0" y1="0" x2="' + (80 * Math.cos(a)).toFixed(1) + '" y2="' + (80 * Math.sin(a)).toFixed(1) + '"/>'; bulbi += '<circle cx="' + (80 * Math.cos(a)).toFixed(1) + '" cy="' + (80 * Math.sin(a)).toFixed(1) + '" r="4.5" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>'; }
    const lunapark = '<circle cx="1700" cy="640" r="300" fill="#FF9E5E" opacity=".28" filter="url(#g-velo)"/>' +
      '<g transform="translate(1720 560)"><g class="st-ruota"><g stroke="#4A4A86" stroke-width="3">' + raggi + '</g><circle r="80" fill="none" stroke="#5A5AA0" stroke-width="4"/>' + bulbi + '</g></g>' +
      '<path d="M1700 640 L1680 700 M1740 640 L1760 700" stroke="#3B3A6E" stroke-width="5"/>' +
      '<path d="M1560 700 L1600 640 L1640 700 Z" fill="' + C.rossoScuro + '"/><path d="M1790 700 L1830 650 L1870 700 Z" fill="' + C.rossoScuro + '"/>';
    let finestre = '';
    for (let i = 0; i < 40; i++) { const x = 40 + r() * 1840, y = 790 + r() * 240; if (r() < 0.45) finestre += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.35 + r() * 0.3).toFixed(2) + '"/>'; }
    const tettiDietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L2100 700 L2100 1080 Z" fill="#171A44"/>';
    const tettiDavanti = '<path d="M-100 1080 L-100 800 L60 800 L160 730 L260 800 L360 800 L360 740 L480 740 L480 820 L700 820 L790 760 L880 820 L1080 820 L1080 790 L1180 790 L1180 770 L1320 770 L1320 830 L1450 770 L1540 830 L1700 830 L1700 800 L2100 800 L2100 1080 Z" fill="#0F1233"/>';
    const casa = '<circle cx="300" cy="772" r="80" fill="' + C.luce + '" opacity=".28" filter="url(#g-velo)"/><rect x="278" y="746" width="44" height="52" rx="4" fill="' + C.luce + '"/><path d="M300 746 L300 798 M278 772 L322 772" stroke="#0F1233" stroke-width="4"/>';
    const citta = '<g class="st-citta" opacity="0"><g class="st-pan"><rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
      '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
      lunapark + tettiDietro + finestre + tettiDavanti + casa + '</g><g class="st-volo"></g></g>';
    const salotto = '<g class="st-salotto"><g class="st-sal-cam">' + G.salotto('<g class="st-tel"></g><g class="st-luce" opacity="0"><rect x="22" y="350" width="316" height="228" rx="30" fill="' + C.luce + '" opacity=".35" filter="url(#g-glow)"/></g>') + '</g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="st-treno">' + G.treno([{}, {}, {}, {}], { sbarra: 0 }) + '</g>' +
      '<g class="st-ada"></g><g class="st-nastro"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'striscia', manopola: 0, banchina: true, davanti: citta + salotto,
      html: G.sottotitolo('NARRATORE', 'Questa volta scrive solo due parole: «Al parco». Ma alla stazione arriva una striscia lunghissima.') +
        G.sottotitolo('ADA', 'Al mare Emma… nuota… Al parco! C’è tutto!') +
        G.sottotitolo('NARRATORE', 'Sulla striscia c’è tutta la chat: quello che ha scritto, e anche la risposta.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.st-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 640 - M.fermo, null, M.passoBanchina);
    this.ada = q('.st-ada'); this.nastroEl = q('.st-nastro');
    this.citta = q('.st-citta'); this.pan = q('.st-pan'); this.volo = q('.st-volo'); this.ruota = q('.st-ruota');
    this.salotto = q('.st-salotto'); this.salCam = q('.st-sal-cam'); this.tel = q('.st-tel'); this.luce = q('.st-luce');
    this.typ = kit.typist('Al parco', ST_SCRIVE, 4.2, 9);
    // Il volo nel cielo: la strada della testa della striscia, dalla finestra verso il luna park.
    const pts = [];
    for (let i = 0; i <= 200; i++) pts.push(stBez([[300, 770], [420, 160], [1250, 120], [1800, 560]], i / 200));
    this.cielo = G.linea(pts);
    // Alla stazione: scende dal cielo, a sinistra, e si stende sopra i sedili fin quasi allo Spezzaparole.
    this.binario = G.linea([[-420, 330], [-260, 470], [-110, 620], [10, 708], [70, 736], [110, 740], [568, 740]]);
    this.stazioni = H.messaggi[1].striscia;
    this.statoTel = ''; this.statoAda = '';
    this.sub = G.subs(kit, [[0.6, 9.8], [15.0, 19.8], [20.2, 26.9]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'striscia', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(ST_CAM, t));
    G.animaMondo(m, t + 940);
    // Il salotto: si scrive, si preme invio, il messaggio sale nella chat; poi tutta la chat si illumina.
    const inviato = t >= ST_INVIO + 0.15;
    const chat = [['io', 'Al mare Emma'], ['ai', 'nuota']].concat(inviato ? [['io', 'Al parco']] : []);
    const scritto = inviato ? '' : this.typ.at(t);
    const cursore = !inviato && t > ST_SCRIVE - 0.6 && Math.floor(t / 0.53) % 2 === 0;
    const premuto = t > ST_INVIO - 0.05 && t < ST_INVIO + 0.3;
    const k = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
    if (k !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat, scritto, cursore, premuto }), 'st-tel'); this.statoTel = k; }
    this.luce.setAttribute('opacity', (eio(seg(t, 4.0, 4.8)) * (0.8 + 0.2 * Math.sin(t * 5))).toFixed(3));
    this.salotto.setAttribute('opacity', (1 - seg(t, ST_SALOTTO[0], ST_SALOTTO[1])).toFixed(3));
    const z = lerp(1, 1.1, eio(seg(t, 0, ST_SALOTTO[1]))), [bx, by] = G.SALOTTO.bolla;
    this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    // Il cielo: la striscia esce dalla finestra e si srotola, lunga, come la coda di un aquilone.
    this.citta.setAttribute('opacity', (seg(t, ST_SALOTTO[0], ST_SALOTTO[1]) * (1 - seg(t, ST_STAZ[0], ST_STAZ[1]))).toFixed(3));
    this.pan.setAttribute('transform', 'translate(' + (-50 * eio(seg(t, ST_CIELO[0], ST_CIELO[1]))).toFixed(1) + ' 0)');
    this.ruota.setAttribute('transform', 'rotate(' + (t * 6).toFixed(1) + ')');
    if (t > ST_CIELO[0] - 0.2 && t < ST_STAZ[1]) {
      const u = seg(t, ST_CIELO[0], ST_CIELO[1]), sc = lerp(1.25, 0.42, eio(u));
      const A = this.cielo.lung * (0.02 + 0.98 * eio(u)), passo = 150 * sc, len = 6 * passo;
      const a = Math.max(0, A - len);
      const par = ST_PAROLE.map((w, i) => [w, A - (5 - i + 0.5) * passo]);
      this.volo.innerHTML = '<g transform="translate(' + (-50 * eio(u)).toFixed(1) + ' 0)">' + G.nastro(this.cielo, a, A, par, 34 * sc, {
        onda: s => (A - s) / len * 56 * sc * Math.sin((A - s) * 0.014 / sc - t * 5.5),
      }) + '</g>';
    } else if (this.volo.innerHTML) this.volo.innerHTML = '';
    // Alla stazione: la striscia scende e si stende; Ada la prende al volo, poi la segue e legge.
    const fine = this.binario.lung, A = lerp(0, fine, eo(seg(t, ST_SCENDE[0], ST_SCENDE[1]))), len = 6 * ST_PASSO;
    const ca = eio(seg(t, ST_CAMMINA[0], ST_CAMMINA[1]));
    const ax = lerp(ST_ADA[0], ST_ADA[1], ca);
    const par = ST_PAROLE.map((w, i) => [w, A - (5 - i + 0.5) * ST_PASSO]);
    const vento = 1 - eio(seg(t, ST_SCENDE[1] - 0.6, ST_SCENDE[1] + 1.2));
    this.nastroEl.innerHTML = t < ST_SCENDE[0] ? '' : G.nastro(this.binario, A - len, A, par, ST_ALTO, {
      onda: s => (vento * 10 + 1.2) * Math.sin((A - s) * 0.03 - t * 4),
      // Le parole brillano quando Ada ci passa sotto, leggendo.
      luce: i => t < ST_CAMMINA[0] ? 0 : Math.max(0, 1 - Math.abs(ax + 14 - (110 + (i + 0.5) * ST_PASSO)) / 34) * (1 - seg(t, ST_CAMMINA[1] + 0.4, ST_CAMMINA[1] + 1.4)),
    });
    // Ada: aspetta la striscia, salta e la prende al volo; poi cammina sotto la striscia e legge.
    const salto = Math.sin(Math.PI * seg(t, ST_PRESA - 0.35, ST_PRESA + 0.35));
    const ay = M.ada[1] - 22 * salto - (ca > 0 && ca < 1 ? 4 * Math.abs(Math.sin(t * 7)) : 0);
    const alza = t > ST_PRESA - 0.6 && t < ST_PRESA + 0.8;
    const espr = t < ST_SCENDE[0] + 1 ? 'base' : t < ST_CAMMINA[0] ? 'sorpresa' : t < 21 ? 'felice' : 'base';
    const ka = alza + espr;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="st-ada-in">' + (alza ? G.adaSaluta(espr, -10) : G.ada('base', espr)) + '</g>'; this.statoAda = ka; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
