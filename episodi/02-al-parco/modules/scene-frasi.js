const { seg, eo, ei, eio, lerp } = kit;
// Quella sera, da due case diverse: la città dall'alto con due finestre accese; dietro la prima si scrive «Al mare Emma»,
// dietro la seconda «Al parco Emma». Invio, invio: due strisce volano sopra i tetti fino al luna park e atterrano,
// una dopo l'altra, in mano ad Ada. Finisce su Ada con le due strisce (la riprende «parco»).
const FR_FRASI = ['Al mare Emma', 'Al parco Emma'];
const FR_CASE = [[420, 772], [1250, 806]];
const FR_TEL = [4.0, 4.6, 10.4, 11.0];
const FR_SCRIVE = [4.9, 5.5], FR_INVIO = [8.2, 9.0];
const FR_VOLO = [11.0, 16.4];
const FR_STAZ = [16.2, 17.0];
const FR_ATTERRA = [18.4, 20.0];
const FR_CAM = [
  { t: FR_STAZ[0], cx: 560, cy: 720, z: 2.2 },
  { t: 18.0, cx: 560, cy: 720, z: 2.2 },
  { t: 21.0, cx: 534, cy: 790, z: 4.6 },
];
function frBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('frasi', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, r = G.rng(14);
    // La città dall'alto: stelle, il luna park lontano, due file di tetti, le finestre accese.
    let stelle = '';
    for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
    let raggi = '', bulbi = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; raggi += '<line x1="0" y1="0" x2="' + (80 * Math.cos(a)).toFixed(1) + '" y2="' + (80 * Math.sin(a)).toFixed(1) + '"/>'; bulbi += '<circle cx="' + (80 * Math.cos(a)).toFixed(1) + '" cy="' + (80 * Math.sin(a)).toFixed(1) + '" r="4.5" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>'; }
    const lunapark = '<circle cx="1700" cy="640" r="300" fill="#FF9E5E" opacity=".28" filter="url(#g-velo)"/>' +
      '<g transform="translate(1720 560)"><g class="fr-ruota"><g stroke="#4A4A86" stroke-width="3">' + raggi + '</g><circle r="80" fill="none" stroke="#5A5AA0" stroke-width="4"/>' + bulbi + '</g></g>' +
      '<path d="M1700 640 L1680 700 M1740 640 L1760 700" stroke="#3B3A6E" stroke-width="5"/>' +
      '<path d="M1560 700 L1600 640 L1640 700 Z" fill="' + C.rossoScuro + '"/><path d="M1790 700 L1830 650 L1870 700 Z" fill="' + C.rossoScuro + '"/>';
    let finestre = '';
    for (let i = 0; i < 40; i++) { const x = 40 + r() * 1840, y = 790 + r() * 240; if (r() < 0.45) finestre += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.35 + r() * 0.3).toFixed(2) + '"/>'; }
    const tettiDietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L2100 700 L2100 1080 Z" fill="#171A44"/>';
    const tettiDavanti = '<path d="M-100 1080 L-100 800 L60 800 L160 730 L260 800 L360 800 L360 740 L480 740 L480 820 L700 820 L790 760 L880 820 L1080 820 L1080 790 L1180 790 L1180 770 L1320 770 L1320 830 L1450 770 L1540 830 L1700 830 L1700 800 L2100 800 L2100 1080 Z" fill="#0F1233"/>';
    const accese = FR_CASE.map(([x, y], k) => '<g class="fr-casa" data-k="' + k + '"><circle cx="' + x + '" cy="' + y + '" r="70" fill="' + C.luce + '" opacity=".25" filter="url(#g-velo)"/>' +
      '<rect x="' + (x - 20) + '" y="' + (y - 24) + '" width="40" height="48" rx="4" fill="' + C.luce + '"/><path d="M' + x + ' ' + (y - 24) + ' L' + x + ' ' + (y + 24) + ' M' + (x - 20) + ' ' + y + ' L' + (x + 20) + ' ' + y + '" stroke="#0F1233" stroke-width="4"/></g>').join('');
    const citta = '<g class="fr-citta"><rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
      '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
      lunapark + tettiDietro + finestre + tettiDavanti + accese + '</g>';
    // Le due case, affiancate: ognuna col suo salotto e il suo telefono.
    const pannello = (k) => {
      const z = 0.95, tx = 480 - 947 * z, ty = 540 - 522 * z;
      const o = k ? { muro: ['#203A3F', '#35585A', '#3D5E6E'] } : {};
      return '<g transform="translate(' + (k * 960) + ' 0)"><clipPath id="g-fr-pan' + k + '"><rect width="960" height="1080"/></clipPath><g clip-path="url(#g-fr-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto('<g class="fr-tel-in" data-k="' + k + '"></g>', o) + '</g></g></g>';
    };
    const case2 = '<g class="fr-case" opacity="0">' + pannello(0) + pannello(1) + '<path d="M960 -10 L960 1090" stroke="#05070F" stroke-width="12"/></g>';
    const volo = FR_FRASI.map((f, k) => '<g class="fr-volo" data-k="' + k + '" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(f, 300) + '</g></g>').join('');
    // La stazione: Ada riceve le strisce.
    const stazione = '<g class="fr-staz" opacity="0">' + '<g class="fr-mondo"></g></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      citta + volo + stazione + case2 + '</svg>' +
      G.sottotitolo('NARRATORE', 'Quella sera, da due case diverse, arrivano due frasi quasi uguali.') +
      G.sottotitolo('ADA', 'Al mare Emma… e al parco Emma!') + '</div>', 'frasi')));
    this.G = G;
    const q = s => kit.stage.querySelector(s), qa = s => [...kit.stage.querySelectorAll(s)];
    // Il mondo del luna park, dentro il gruppo della stazione.
    q('.fr-mondo').innerHTML = '<g class="fr-cam">' + G.mondo({}) +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="fr-ada"></g>' + FR_FRASI.map((f, k) => '<g class="fr-cade" data-k="' + k + '" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(f, 300) + '</g></g>').join('') + '</g>';
    this.citta = q('.fr-citta'); this.ruota = q('.fr-ruota'); this.casa = qa('.fr-casa');
    this.case = q('.fr-case'); this.telIn = qa('.fr-tel-in'); this.volo = qa('.fr-volo');
    this.staz = q('.fr-staz'); this.cam = q('.fr-cam'); this.ada = q('.fr-ada'); this.cade = qa('.fr-cade');
    this.typ = FR_FRASI.map((f, k) => kit.typist(f, FR_SCRIVE[k], 4.2, 5 + k));
    this.statoTel = ['', '']; this.statoAda = '';
    this.sub = G.subs(kit, [[0.6, 7.2], [21.0, 24.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'frasi', t);
    const G = this.G, M = G.MONDO;
    // La città: le due finestre accese respirano.
    this.casa.forEach((c, k) => c.setAttribute('opacity', (0.75 + 0.25 * Math.sin(t * 2.4 + k * 1.7)).toFixed(3)));
    this.citta.setAttribute('transform', 'translate(' + (-60 * eio(seg(t, 0, FR_VOLO[1]))).toFixed(1) + ' 0)');
    this.ruota.setAttribute('transform', 'rotate(' + (t * 6).toFixed(1) + ')');
    // Le due case: si scrive, si preme invio (ogni telefono si ridisegna solo quando cambia).
    this.case.setAttribute('opacity', (seg(t, FR_TEL[0], FR_TEL[1]) * (1 - seg(t, FR_TEL[2], FR_TEL[3]))).toFixed(3));
    this.telIn.forEach((el, k) => {
      const inviato = t >= FR_INVIO[k] + 0.15;
      const scritto = inviato ? '' : this.typ[k].at(t);
      const cursore = !inviato && t > FR_SCRIVE[k] - 0.6 && Math.floor(t / 0.53) % 2 === 0;
      const premuto = t > FR_INVIO[k] - 0.05 && t < FR_INVIO[k] + 0.3;
      const chiave = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
      if (chiave !== this.statoTel[k]) {
        el.innerHTML = G.telefono({ scritto, cursore, premuto, messaggi: inviato ? [FR_FRASI[k]] : [] });
        this.statoTel[k] = chiave;
      }
    });
    // Le strisce volano dalle due finestre al luna park, una dopo l'altra.
    this.volo.forEach((el, k) => {
      const a = FR_VOLO[0] + k * 0.9, u = seg(t, a, FR_VOLO[1] - 0.9 + k * 0.9);
      const [x0, y0] = FR_CASE[k];
      const p = frBez([[x0 - 60 * eio(seg(t, 0, FR_VOLO[1])), y0], [x0 + 200, y0 - 420], [1400, 300 + 60 * k], [1720, 600]], eio(u));
      const s = lerp(0.8, 0.16, eio(u)), rot = lerp(-18, 16, u) + 8 * Math.sin(t * 3 + k);
      el.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + (p[1] + 18 * Math.sin(t * 2.4 + k)).toFixed(1) + ') rotate(' + rot.toFixed(2) + ') skewX(' + (9 * Math.sin(t * 6 + k)).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
      el.setAttribute('opacity', Math.min(seg(t, a - 0.2, a + 0.3), 1 - seg(t, FR_VOLO[1] - 1.2 + k * 0.6, FR_VOLO[1] - 0.6 + k * 0.6)).toFixed(3));
    });
    // La stazione: le strisce scendono dal cielo e atterrano in mano ad Ada.
    this.staz.setAttribute('opacity', eio(seg(t, FR_STAZ[0], FR_STAZ[1])).toFixed(3));
    this.cam.setAttribute('transform', G.camChiavi(FR_CAM, t));
    const presa = t >= FR_ATTERRA[0];
    const espr = t < FR_ATTERRA[0] ? 'base' : t < 20.6 ? 'felice' : 'sorpresa';
    const k = presa + espr;
    if (k !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(presa ? 'striscia' : 'base', espr, { testo: FR_FRASI[0] }) + '</g>'; this.statoAda = k; }
    this.cade.forEach((el, k) => {
      const u = eio(seg(t, FR_ATTERRA[k] - 2.2, FR_ATTERRA[k]));
      const fine = k === 0 ? [M.ada[0], 808] : [M.ada[0] + 4, 824];
      const p = frBez([[900 - 120 * k, 520], [760, 580], [640, 700], fine], u);
      const s = lerp(0.3, 0.123, u), rot = k === 0 ? (1 - u) * -14 * Math.sin(t * 3) : lerp(-20, 5, u) + (1 - u) * 10 * Math.sin(t * 3);
      el.setAttribute('transform', 'translate(' + p[0].toFixed(2) + ' ' + p[1].toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + s.toFixed(3) + ')');
      // La prima, quando arriva, la tiene Ada (è disegnata nella sua posa); la seconda resta sopra la prima.
      el.setAttribute('opacity', k === 0 ? (t < FR_ATTERRA[0] - 2.2 || presa ? 0 : 1) : (t < FR_ATTERRA[1] - 2.2 ? 0 : 1));
    });
    this.sub(t);
  },
});
