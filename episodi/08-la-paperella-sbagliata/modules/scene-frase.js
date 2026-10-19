const { seg, eo, ei, eio, lerp } = kit;
// Poco prima, la città dall'alto: una finestra accesa, il salotto del prologo con la lampada calda. Due mani scrivono
// «Il cane di Emma si chiama» e premono invio; la striscia vola sopra i tetti fino al luna park. Di nuovo dietro la
// stazione: è la striscia che Ada tiene in mano. Ada la srotola, la legge e aggrotta la fronte; sfoglia il quaderno
// all'indietro (le storie delle altre sere, Emma al parco, verde, Emma al mare, blu): di cani, nemmeno l'ombra.
// Si apre con uno stacco sulla città; finisce su Ada seduta sul binario morto, con la striscia (la riprende «prima»).
const FR_FRASE = 'Il cane di Emma si chiama';
const FR_CASA = [1180, 790];
const FR_CITTA_CAM = [{ t: 0, cx: 960, cy: 600, z: 1 }, { t: 3.6, cx: 1140, cy: 760, z: 1.9 }];
const FR_SALOTTO = [3.3, 3.9, 10.6, 11.2];
const FR_SCRIVE = 4.4, FR_INVIO = 9.2;
const FR_VOLO = [11.0, 14.6];
const FR_ADA = [-95, 835];
const FR_STAZ = [14.4, 15.2];
const FR_SROTOLA = [15.6, 17.0];
const FR_LEGGE = 17.6, FR_ACCIGLIA = 19.0;
const FR_QUADERNO = [19.8, 20.3, 24.9, 25.4];
// Le pagine del quaderno, sfogliate all'indietro: quando gira ogni foglio.
const FR_FOGLI = [21.4, 22.9];
const FR_NO = [27.0, 28.6];
const FR_CAM = [
  { t: FR_STAZ[0], cx: -110, cy: 790, z: 3.6 },
  { t: 15.4, cx: -110, cy: 790, z: 3.6 },
  { t: FR_LEGGE, cx: -95, cy: 812, z: 8.5 },
  { t: 19.4, cx: -95, cy: 812, z: 8.5 },
  { t: 21.0, cx: -100, cy: 790, z: 5.0 },
  { t: 26.0, cx: -100, cy: 790, z: 5.0 },
  { t: 29.6, cx: -110, cy: 795, z: 4.4 },
];
function frBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('frase', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, r = G.rng(18);
    // La città dall'alto: stelle, il luna park lontano, i tetti, una sola finestra accesa.
    let stelle = '';
    for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
    let raggi = '', bulbi = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; raggi += '<line x1="0" y1="0" x2="' + (80 * Math.cos(a)).toFixed(1) + '" y2="' + (80 * Math.sin(a)).toFixed(1) + '"/>'; bulbi += '<circle cx="' + (80 * Math.cos(a)).toFixed(1) + '" cy="' + (80 * Math.sin(a)).toFixed(1) + '" r="4.5" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>'; }
    const lunapark = '<circle cx="1700" cy="640" r="300" fill="#FF9E5E" opacity=".28" filter="url(#g-velo)"/>' +
      '<g transform="translate(1720 560)"><g class="fr-ruota"><g stroke="#4A4A86" stroke-width="3">' + raggi + '</g><circle r="80" fill="none" stroke="#5A5AA0" stroke-width="4"/>' + bulbi + '</g></g>' +
      '<path d="M1700 640 L1680 700 M1740 640 L1760 700" stroke="#3B3A6E" stroke-width="5"/>' +
      '<path d="M1560 700 L1600 640 L1640 700 Z" fill="' + C.rossoScuro + '"/><path d="M1790 700 L1830 650 L1870 700 Z" fill="' + C.rossoScuro + '"/>';
    let spente = '';
    for (let i = 0; i < 40; i++) { const x = 40 + r() * 1840, y = 800 + r() * 230; if (r() < 0.35) spente += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.12 + r() * 0.18).toFixed(2) + '"/>'; }
    const tettiDietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L2100 700 L2100 1080 Z" fill="#171A44"/>';
    const tettiDavanti = '<path d="M-100 1080 L-100 800 L60 800 L160 730 L260 800 L360 800 L360 740 L480 740 L480 820 L700 820 L790 760 L880 820 L1080 820 L1080 760 L1180 700 L1280 760 L1280 830 L1450 770 L1540 830 L1700 830 L1700 800 L2100 800 L2100 1080 Z" fill="#0F1233"/>';
    const [cx0, cy0] = FR_CASA;
    const accesa = '<g class="fr-casa"><circle cx="' + cx0 + '" cy="' + cy0 + '" r="80" fill="#FFC56B" opacity=".3" filter="url(#g-velo)"/>' +
      '<rect x="' + (cx0 - 20) + '" y="' + (cy0 - 24) + '" width="40" height="48" rx="4" fill="#FFC56B"/><path d="M' + cx0 + ' ' + (cy0 - 24) + ' L' + cx0 + ' ' + (cy0 + 24) + ' M' + (cx0 - 20) + ' ' + cy0 + ' L' + (cx0 + 20) + ' ' + cy0 + '" stroke="#0F1233" stroke-width="4"/></g>';
    const citta = '<g class="fr-citta"><g class="fr-citta-cam"><rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
      '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
      lunapark + tettiDietro + spente + tettiDavanti + accesa + '</g></g>';
    // Il salotto del prologo: la lampada calda, il telefono in mano.
    const salotto = '<g class="fr-salotto" opacity="0"><g class="fr-sal-cam">' + G.salotto('<g class="fr-tel"></g>') + '</g></g>';
    const volo = '<g class="fr-volo" opacity="0"><g transform="translate(-190 -22)">' + G.striscia(FR_FRASE, 380) + '</g></g>';
    // Il quaderno di Ada, sfogliato all'indietro: le altre sere, il parco, il mare. Emma ha il colore con cui è uscita.
    const blu = G.MOD.mare.passeggeri.Emma.tratti[2], verde = G.MOD.parco.passeggeri.Emma.tratti[2], rosa = G.MOD.cane.passeggeri.Emma.biglietto;
    const linee = '<g stroke="#3A3570" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">';
    const papere = (col, x, y) => [0, 1, 2, 3].map(i => '<g transform="translate(' + (x + i * 92) + ' ' + (y + (i % 2) * 22) + ') scale(.62)">' + G.paperella(col) + '</g>').join('');
    const pagine = [
      // Le storie delle altre sere: Emma col suo vestito rosa, il trenino, la ruota, i biglietti.
      [G.schizzoEmma(430, 760, rosa, 2.2) + linee + '<path d="M600 760 L860 760 M620 720 L700 720 L700 760 M720 720 L800 720 L800 760"/><circle cx="640" cy="772" r="12"/><circle cx="760" cy="772" r="12"/></g>',
        linee + '<circle cx="1350" cy="420" r="200"/><path d="M1350 220 L1350 620 M1150 420 L1550 420 M1210 280 L1490 560 M1490 280 L1210 560 M1290 620 L1250 800 M1410 620 L1450 800"/></g>'],
      // Emma al parco, verde: l'alberello e le paperelle verdi.
      [G.schizzoEmma(440, 760, verde, 2.2) + linee + '<path d="M700 800 L700 640"/><circle cx="660" cy="580" r="60"/><circle cx="740" cy="580" r="60"/><circle cx="700" cy="520" r="60"/></g>',
        papere(verde, 1100, 360) + papere(verde, 1150, 560)],
      // Emma al mare, blu: le onde e le paperelle blu.
      [G.schizzoEmma(440, 760, blu, 2.2) + linee + '<path d="M600 840 q40 -30 80 0 t80 0 t80 0 M600 880 q40 -30 80 0 t80 0 t80 0"/></g>',
        papere(blu, 1100, 360) + papere(blu, 1150, 560)],
    ];
    const quaderno = '<g class="fr-quad" opacity="0"><g class="fr-pagine">' +
      pagine.map((p, k) => '<g class="fr-pagina" data-k="' + k + '" opacity="0">' + G.quadernoAperto(p[0], p[1]) + '</g>').join('') +
      '<g class="fr-foglio" opacity="0"><defs><linearGradient id="g-fr-foglio" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D9C9AC"/><stop offset=".3" stop-color="' + C.crema + '"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs>' +
      '<rect x="960" y="86" width="784" height="828" rx="12" fill="url(#g-fr-foglio)" stroke="' + C.cremaScura + '" stroke-width="3"/></g></g></g>';
    // La striscia in mano ad Ada: si srotola dal centro verso i due capi.
    const lunga = '<g class="fr-lunga"><clipPath id="g-fr-srotola"><rect class="fr-clip" x="190" y="-10" width="0" height="64"/></clipPath>' +
      '<g clip-path="url(#g-fr-srotola)">' + G.striscia(FR_FRASE, 380) + '</g>' +
      [0, 1].map(k => '<g class="fr-capo" data-k="' + k + '"><rect x="-8" y="-6" width="16" height="56" rx="8" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="3"/></g>').join('') + '</g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      '<g class="fr-staz" opacity="0"><g class="fr-cam">' + G.mondo({ morto: true, banchina: true, manopola: 0 }) +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<path class="fr-partenza" d="' + M.partenza + '" fill="none"/><g class="fr-vuoto">' + G.treno([{}, {}, {}, {}, {}, {}], { sbarra: 0 }) + '</g>' +
      G.treniDormono() + '<g class="fr-ada"></g><g class="fr-in-mano">' + lunga + '</g></g></g>' +
      citta + volo + salotto + quaderno + '</svg>' +
      G.sottotitolo('NARRATORE', 'Quella sera, chi scrive le storie di Emma vuole sapere una cosa nuova: come si chiama il suo cane.') +
      G.sottotitolo('ADA', 'Il cane di Emma? Ma Emma un cane non ce l’ha!') + '</div>', 'frase')));
    this.G = G;
    const q = s => kit.stage.querySelector(s), qa = s => [...kit.stage.querySelectorAll(s)];
    G.posaTreno(qa('.fr-vuoto .g-vag'), q('.fr-partenza'), 490, M.scala, M.passoBanchina);
    this.citta = q('.fr-citta'); this.cittaCam = q('.fr-citta-cam'); this.ruota = q('.fr-ruota'); this.casa = q('.fr-casa');
    this.salotto = q('.fr-salotto'); this.salCam = q('.fr-sal-cam'); this.tel = q('.fr-tel'); this.volo = q('.fr-volo');
    this.staz = q('.fr-staz'); this.cam = q('.fr-cam'); this.ada = q('.fr-ada'); this.inMano = q('.fr-in-mano');
    this.clip = q('.fr-clip'); this.capi = qa('.fr-capo');
    this.quad = q('.fr-quad'); this.pagine = qa('.fr-pagina'); this.foglio = q('.fr-foglio'); this.pagCam = q('.fr-pagine');
    this.typ = kit.typist(FR_FRASE, FR_SCRIVE, 6, 8);
    this.statoTel = ''; this.statoAda = '';
    this.sub = G.subs(kit, [[0.6, 9.4], [25.6, 29.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'frase', t);
    const G = this.G;
    // La città: la camera scende verso la finestra accesa, che respira.
    this.casa.setAttribute('opacity', (0.8 + 0.2 * Math.sin(t * 2.4)).toFixed(3));
    this.cittaCam.setAttribute('transform', t < FR_VOLO[0] - 0.5 ? G.camChiavi(FR_CITTA_CAM, t) : G.cam(lerp(1140, 960, eio(seg(t, FR_VOLO[0] - 0.5, FR_VOLO[0] + 1.4))), lerp(760, 600, eio(seg(t, FR_VOLO[0] - 0.5, FR_VOLO[0] + 1.4))), lerp(1.9, 1, eio(seg(t, FR_VOLO[0] - 0.5, FR_VOLO[0] + 1.4)))));
    this.ruota.setAttribute('transform', 'rotate(' + (t * 6).toFixed(1) + ')');
    this.citta.setAttribute('opacity', t < FR_STAZ[1] ? 1 : 0);
    // Il salotto: si scrive (il campo mostra le ultime lettere, come un telefono vero), si preme invio.
    this.salotto.setAttribute('opacity', (seg(t, FR_SALOTTO[0], FR_SALOTTO[1]) * (1 - seg(t, FR_SALOTTO[2], FR_SALOTTO[3]))).toFixed(3));
    const z = lerp(1.0, 1.1, eio(seg(t, FR_SALOTTO[0], FR_SALOTTO[3])));
    this.salCam.setAttribute('transform', 'translate(' + (972 - 972 * z).toFixed(1) + ' ' + (700 - 700 * z).toFixed(1) + ') scale(' + z.toFixed(4) + ')');
    const inviato = t >= FR_INVIO + 0.15;
    const scritto = inviato ? '' : this.typ.at(t).slice(-13);
    const cursore = !inviato && t > FR_SCRIVE - 0.6 && Math.floor(t / 0.53) % 2 === 0;
    const premuto = t > FR_INVIO - 0.05 && t < FR_INVIO + 0.3;
    const kt = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
    if (kt !== this.statoTel) { this.tel.innerHTML = G.telefono({ scritto, cursore, premuto, chat: inviato ? [['io', FR_FRASE]] : [] }); this.statoTel = kt; }
    // La striscia vola dalla finestra al luna park.
    const u = seg(t, FR_VOLO[0], FR_VOLO[1]);
    const p = frBez([[FR_CASA[0], FR_CASA[1]], [FR_CASA[0] + 120, 360], [1500, 300], [1720, 600]], eio(u));
    const s = lerp(0.9, 0.16, eio(u)), rot = lerp(-16, 14, u) + 8 * Math.sin(t * 3);
    this.volo.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + (p[1] + 18 * Math.sin(t * 2.4)).toFixed(1) + ') rotate(' + rot.toFixed(2) + ') skewX(' + (9 * Math.sin(t * 6)).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
    this.volo.setAttribute('opacity', Math.min(seg(t, FR_VOLO[0] - 0.1, FR_VOLO[0] + 0.3), 1 - seg(t, FR_VOLO[1] - 0.6, FR_VOLO[1])).toFixed(3));
    // Di nuovo dietro la stazione.
    this.staz.setAttribute('opacity', eio(seg(t, FR_STAZ[0], FR_STAZ[1])).toFixed(3));
    this.cam.setAttribute('transform', G.camChiavi(FR_CAM, t));
    // Ada: la striscia arrotolata, poi srotolata; la legge, aggrotta la fronte; alla fine fa di no con la testa.
    const aperta = t >= FR_SROTOLA[0];
    const espr = t < FR_ACCIGLIA ? 'base' : t < FR_QUADERNO[3] ? 'accigliata' : t < 26.6 ? 'sorpresa' : 'accigliata';
    const no = t > FR_NO[0] && t < FR_NO[1] ? 9 * Math.sin((t - FR_NO[0]) * 11) * Math.sin(Math.PI * seg(t, FR_NO[0], FR_NO[1])) : 0;
    const ang = Math.round(no * 2) / 2;
    const ka = aperta + espr + ang;
    if (ka !== this.statoAda) {
      const rotolo = aperta ? '' : '<g transform="translate(100 236) rotate(-8) scale(.5)">' + G.rotolo() + '</g>';
      this.ada.innerHTML = '<g transform="' + G.posaAda(FR_ADA[0], FR_ADA[1]) + '">' + G.adaSeduta(aperta ? 'striscia' : 'quaderno', espr, { testa: ang }) + rotolo + '</g>';
      this.statoAda = ka;
    }
    // La striscia lunga, nelle mani di Ada (nel suo disegno: centro in (100, 239), larga 190).
    const sr = eio(seg(t, FR_SROTOLA[0], FR_SROTOLA[1]));
    const [ax, ay] = FR_ADA, sc = 0.28;
    this.inMano.setAttribute('transform', 'translate(' + (ax - 100 * sc + 5 * sc).toFixed(2) + ' ' + (ay - 304 * sc + 228 * sc).toFixed(2) + ') scale(' + (0.5 * sc).toFixed(4) + ')');
    this.inMano.setAttribute('opacity', aperta ? 1 : 0);
    this.clip.setAttribute('x', (190 - 196 * sr).toFixed(1)); this.clip.setAttribute('width', (392 * sr).toFixed(1));
    this.capi.forEach((c, k) => { c.setAttribute('transform', 'translate(' + (190 + (k ? 1 : -1) * 192 * sr).toFixed(1) + ' 0)'); c.setAttribute('opacity', (1 - seg(sr, 0.85, 1)).toFixed(3)); });
    // Il quaderno, sfogliato all'indietro: a ogni foglio che gira, le pagine di una sera prima.
    this.quad.setAttribute('opacity', (seg(t, FR_QUADERNO[0], FR_QUADERNO[1]) * (1 - seg(t, FR_QUADERNO[2], FR_QUADERNO[3]))).toFixed(3));
    const giro = FR_FOGLI.map(f => seg(t, f - 0.25, f + 0.25)).find(x => x > 0 && x < 1);
    const pagina = t < FR_FOGLI[0] ? 0 : t < FR_FOGLI[1] ? 1 : 2;
    this.pagine.forEach((el, i) => el.setAttribute('opacity', i === pagina ? 1 : 0));
    if (giro !== undefined) {
      this.foglio.setAttribute('opacity', 1);
      const sx = -Math.cos(Math.PI * giro);
      this.foglio.setAttribute('transform', 'translate(960 0) scale(' + (Math.abs(sx) < 0.02 ? 0.02 : sx).toFixed(3) + ' 1) translate(-960 0)');
    } else this.foglio.setAttribute('opacity', 0);
    this.pagCam.setAttribute('transform', G.cam(lerp(950, 970, seg(t, FR_QUADERNO[0], FR_QUADERNO[3])), 510, 1.04));
    this.sub(t);
  },
});
