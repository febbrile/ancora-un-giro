const { seg, eo, ei, eio, lerp } = kit;
// Quella sera, da tre case diverse: la città dall'alto con tre finestre accese, lontane tra loro. Dietro ognuna due mani
// scrivono «Al mare Emma». Invio, invio, invio: tre strisce volano sopra i tetti fino al luna park e atterrano, una dopo
// l'altra, in mano ad Ada, che le mette in fila: sono uguali.
// Si apre dopo il titolo, in città; finisce su Ada con le tre strisce (la riprende «treni»).
const CA_FRASE = 'Al mare Emma';
const CA_CASE = [[300, 790], [930, 826], [1500, 800]];
const CA_TEL = [3.8, 4.4, 10.2, 10.8];
const CA_SCRIVE = [4.6, 5.0, 5.4], CA_INVIO = [8.0, 8.5, 9.0];
const CA_VOLO = [10.6, 15.8];
const CA_STAZ = [15.4, 16.2];
const CA_ATTERRA = [17.4, 18.2, 19.0];
const CA_FILA = [19.4, 20.4];
const CA_CAM = [
  { t: CA_STAZ[0], cx: 560, cy: 720, z: 2.2 },
  { t: 17.0, cx: 560, cy: 720, z: 2.2 },
  { t: 19.4, cx: 534, cy: 800, z: 4.6 },
  { t: 21.6, cx: 522, cy: 806, z: 6.6 },
];
function caBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('case', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, r = G.rng(31);
    // La città dall'alto: stelle, il luna park lontano, due file di tetti, tre finestre accese lontane tra loro.
    let stelle = '';
    for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
    let raggi = '', bulbi = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; raggi += '<line x1="0" y1="0" x2="' + (80 * Math.cos(a)).toFixed(1) + '" y2="' + (80 * Math.sin(a)).toFixed(1) + '"/>'; bulbi += '<circle cx="' + (80 * Math.cos(a)).toFixed(1) + '" cy="' + (80 * Math.sin(a)).toFixed(1) + '" r="4.5" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>'; }
    const lunapark = '<circle cx="1700" cy="600" r="300" fill="#FF9E5E" opacity=".28" filter="url(#g-velo)"/>' +
      '<g transform="translate(1720 520)"><g class="ca-ruota"><g stroke="#4A4A86" stroke-width="3">' + raggi + '</g><circle r="80" fill="none" stroke="#5A5AA0" stroke-width="4"/>' + bulbi + '</g></g>' +
      '<path d="M1700 600 L1680 660 M1740 600 L1760 660" stroke="#3B3A6E" stroke-width="5"/>' +
      '<path d="M1560 660 L1600 600 L1640 660 Z" fill="' + C.rossoScuro + '"/><path d="M1790 660 L1830 610 L1870 660 Z" fill="' + C.rossoScuro + '"/>';
    let finestre = '';
    for (let i = 0; i < 40; i++) { const x = 40 + r() * 1840, y = 790 + r() * 240; if (r() < 0.45) finestre += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.25 + r() * 0.25).toFixed(2) + '"/>'; }
    const tettiDietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L2100 700 L2100 1080 Z" fill="#171A44"/>';
    const tettiDavanti = '<path d="M-100 1080 L-100 820 L60 820 L160 740 L260 820 L360 820 L360 760 L480 760 L480 840 L700 840 L790 780 L880 840 L1080 840 L1080 810 L1180 810 L1180 770 L1320 770 L1320 840 L1450 780 L1540 840 L1700 840 L1700 820 L2100 820 L2100 1080 Z" fill="#0F1233"/>';
    const accese = CA_CASE.map(([x, y], k) => '<g class="ca-casa" data-k="' + k + '"><circle cx="' + x + '" cy="' + y + '" r="70" fill="' + C.luce + '" opacity=".25" filter="url(#g-velo)"/>' +
      '<rect x="' + (x - 20) + '" y="' + (y - 24) + '" width="40" height="48" rx="4" fill="' + C.luce + '"/><path d="M' + x + ' ' + (y - 24) + ' L' + x + ' ' + (y + 24) + ' M' + (x - 20) + ' ' + y + ' L' + (x + 20) + ' ' + y + '" stroke="#0F1233" stroke-width="4"/></g>').join('');
    const citta = '<g class="ca-citta"><rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
      '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
      lunapark + tettiDietro + finestre + tettiDavanti + accese + '</g>';
    // Le tre case, affiancate: ognuna col suo salotto e il suo telefono.
    const MURI = [{}, { muro: ['#203A3F', '#35585A', '#3D5E6E'] }, { muro: ['#3E2E22', '#5E4632', '#7A5A3C'] }];
    const pannello = k => {
      const z = 0.74, tx = 320 - 947 * z, ty = 560 - 522 * z;
      return '<g transform="translate(' + (k * 640) + ' 0)"><clipPath id="g-ca-pan' + k + '"><rect width="640" height="1080"/></clipPath><g clip-path="url(#g-ca-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto('<g class="ca-tel-in" data-k="' + k + '"></g>', MURI[k]) + '</g></g></g>';
    };
    const case3 = '<g class="ca-case" opacity="0">' + pannello(0) + pannello(1) + pannello(2) +
      '<path d="M640 -10 L640 1090 M1280 -10 L1280 1090" stroke="#05070F" stroke-width="12"/></g>';
    const volo = CA_CASE.map((_, k) => '<g class="ca-volo" data-k="' + k + '" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(CA_FRASE, 300) + '</g></g>').join('');
    const stazione = '<g class="ca-staz" opacity="0"><g class="ca-mondo"></g></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      citta + volo + stazione + case3 + '</svg>' +
      G.sottotitolo('NARRATORE', 'Quella sera, da tre case diverse, arriva tre volte la stessa frase.') +
      G.sottotitolo('ADA', 'Al mare Emma… tre volte!') + '</div>', 'case')));
    this.G = G;
    const q = s => kit.stage.querySelector(s), qa = s => [...kit.stage.querySelectorAll(s)];
    q('.ca-mondo').innerHTML = '<g class="ca-cam">' + G.mondo({ manopola: 0 }) +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="ca-ada"></g>' + CA_CASE.map((_, k) => '<g class="ca-cade" data-k="' + k + '" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(CA_FRASE, 300) + '</g></g>').join('') + '</g>';
    this.citta = q('.ca-citta'); this.ruota = q('.ca-ruota'); this.casa = qa('.ca-casa');
    this.case = q('.ca-case'); this.telIn = qa('.ca-tel-in'); this.volo = qa('.ca-volo');
    this.staz = q('.ca-staz'); this.cam = q('.ca-cam'); this.ada = q('.ca-ada'); this.cade = qa('.ca-cade');
    this.typ = CA_SCRIVE.map((a, k) => kit.typist(CA_FRASE, a, 4.0, 9 + k));
    this.statoTel = ['', '', '']; this.statoAda = '';
    this.sub = G.subs(kit, [[0.6, 7.2], [19.8, 22.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'case', t);
    const G = this.G, M = G.MONDO;
    // La città: le tre finestre accese respirano.
    this.casa.forEach((c, k) => c.setAttribute('opacity', (0.75 + 0.25 * Math.sin(t * 2.4 + k * 1.7)).toFixed(3)));
    this.citta.setAttribute('transform', 'translate(' + (-50 * eio(seg(t, 0, CA_VOLO[1]))).toFixed(1) + ' 0)');
    this.ruota.setAttribute('transform', 'rotate(' + (t * 6).toFixed(1) + ')');
    // Le tre case: si scrive la stessa frase, si preme invio (ogni telefono si ridisegna solo quando cambia).
    this.case.setAttribute('opacity', (seg(t, CA_TEL[0], CA_TEL[1]) * (1 - seg(t, CA_TEL[2], CA_TEL[3]))).toFixed(3));
    this.telIn.forEach((el, k) => {
      const inviato = t >= CA_INVIO[k] + 0.15;
      const scritto = inviato ? '' : this.typ[k].at(t);
      const cursore = !inviato && t > CA_SCRIVE[k] - 0.6 && Math.floor(t / 0.53 + k * 0.3) % 2 === 0;
      const premuto = t > CA_INVIO[k] - 0.05 && t < CA_INVIO[k] + 0.3;
      const chiave = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
      if (chiave !== this.statoTel[k]) {
        el.innerHTML = G.telefono({ scritto, cursore, premuto, messaggi: inviato ? [CA_FRASE] : [] });
        this.statoTel[k] = chiave;
      }
    });
    // Le strisce volano dalle tre finestre al luna park, una dopo l'altra.
    this.volo.forEach((el, k) => {
      const a = CA_VOLO[0] + k * 0.7, u = seg(t, a, CA_VOLO[1] - 1.4 + k * 0.7);
      const [x0, y0] = CA_CASE[k];
      const p = caBez([[x0 - 50 * eio(seg(t, 0, CA_VOLO[1])), y0], [x0 + 160, y0 - 420], [1400, 280 + 50 * k], [1720, 560]], eio(u));
      const s = lerp(0.8, 0.16, eio(u)), rot = lerp(-18, 16, u) + 8 * Math.sin(t * 3 + k);
      el.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + (p[1] + 18 * Math.sin(t * 2.4 + k)).toFixed(1) + ') rotate(' + rot.toFixed(2) + ') skewX(' + (9 * Math.sin(t * 6 + k)).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
      el.setAttribute('opacity', Math.min(seg(t, a - 0.2, a + 0.3), 1 - seg(t, CA_VOLO[1] - 1.8 + k * 0.6, CA_VOLO[1] - 1.2 + k * 0.6)).toFixed(3));
    });
    // La stazione: le strisce scendono dal cielo e atterrano in mano ad Ada; poi lei le mette in fila.
    this.staz.setAttribute('opacity', eio(seg(t, CA_STAZ[0], CA_STAZ[1])).toFixed(3));
    this.cam.setAttribute('transform', G.camChiavi(CA_CAM, t));
    // Quando le mette in fila, Ada non ne tiene più una sola: le tre strisce sono disegnate uguali, davanti a lei.
    const presa = t >= CA_ATTERRA[0] && t < CA_FILA[0];
    const espr = t < CA_ATTERRA[0] ? 'base' : t < CA_FILA[0] ? 'felice' : 'sorpresa';
    const ka = presa + espr;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(presa ? 'striscia' : 'base', espr, { testo: CA_FRASE }) + '</g>'; this.statoAda = ka; }
    const fila = eio(seg(t, CA_FILA[0], CA_FILA[1]));
    this.cade.forEach((el, k) => {
      const u = eio(seg(t, CA_ATTERRA[k] - 2.0, CA_ATTERRA[k]));
      // Prima si posano una sull'altra; poi Ada le mette in fila, una sotto l'altra.
      const sopra = [M.ada[0] + 3 * k, 808 + 5 * k], inFila = [M.ada[0], 799 + 15 * k];
      const fine = [lerp(sopra[0], inFila[0], fila), lerp(sopra[1], inFila[1], fila)];
      const p = caBez([[900 - 110 * k, 500], [760, 580], [640, 700], fine], u);
      const s = lerp(0.3, 0.123, u) * (1 + 0.3 * fila), rot = (1 - u) * (-14 + 8 * k) * Math.sin(t * 3) + (1 - fila) * (k ? 4 * k : 0);
      el.setAttribute('transform', 'translate(' + p[0].toFixed(2) + ' ' + p[1].toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + s.toFixed(3) + ')');
      // La prima, quando arriva, la tiene Ada (è disegnata nella sua posa).
      el.setAttribute('opacity', k === 0 ? (t < CA_ATTERRA[0] - 2.0 || presa ? 0 : 1) : (t < CA_ATTERRA[k] - 2.0 ? 0 : 1));
      if (k === 0 && t >= CA_ATTERRA[0] && t < CA_FILA[0]) el.setAttribute('opacity', 0);
    });
    this.sub(t);
  },
});
