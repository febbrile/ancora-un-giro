const { seg, eo, eio, lerp } = kit;
// A montaggio. Esce il treno: sotto l'arancio, l'ultimo vagone, cadono grigie, rosa antico e acquamarina, quasi alla pari.
// Ada pesca una grigia, e la paperella corre in fondo al treno: il custode le stende sopra il telone. Al giro dopo la vasca
// è piena di paperelle verde oliva: Ada ne pesca una, e anche lei va sotto il telone. Poi la vasca si riempie di arancio
// scuro: Ada ne pesca una, e il custode arrotola il telone fino a lei. Il telefono è sempre muto. Ada solleva un lembo del
// telone e sbircia: una paperella grigia e una verde oliva, sedute, con gli occhi accesi.
// Si apre sulla vasca; finisce sul lembo sollevato (la riprende «finestre», dentro la montagna).
const SO_A = [0.4, 10.2, 20.0];
const SO_LAPS = SO_A.map(a => ({ esce: a, vel: [[a, 760], [a + 1.4, 760], [a + 1.8, 90], [a + 3.2, 90], [a + 3.6, 400]],
  pesca: { giu: a + 3.4, su: a + 4.1, preso: a + 4.4 }, via: a + 4.8, salta: a + 4.8, vagone: a + 5.2, sale: a + 5.7 }));
// Quando il custode stende il telone: dopo che la paperella è salita (la pesca può slittare: si legge al momento).
const SO_STENDE = k => [SO_LAPS[k].sale + 0.3, SO_LAPS[k].sale + 1.5];
const SO_TEL = [28.6, 30.6];
const SO_LEMBO = [33.0, 34.4];
const SO_CAM = [
  // Ogni giro: sulla vasca; poi, quando la paperella è salita, in stazione col telone. (Con i treni lunghi la pesca
  // slitta fino a quando sono cadute tutte le paperelle: i tempi qui tengono conto dello slittamento.)
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 7.99, cx: 700, cy: 846, z: 3.6 },
  { t: 8.0, cx: 560, cy: 810, z: 3.4 },
  { t: 10.19, cx: 560, cy: 810, z: 3.4 },
  { t: 10.2, cx: 740, cy: 846, z: 3.6 },
  { t: 18.09, cx: 700, cy: 846, z: 3.6 },
  { t: 18.1, cx: 560, cy: 810, z: 3.4 },
  { t: 19.99, cx: 560, cy: 810, z: 3.4 },
  { t: 20.0, cx: 740, cy: 846, z: 3.6 },
  { t: 28.19, cx: 700, cy: 846, z: 3.6 },
  { t: 28.2, cx: 560, cy: 810, z: 3.4 },
  { t: 30.6, cx: 520, cy: 810, z: 3.6 },
  { t: 32.6, cx: 520, cy: 800, z: 6.0 },
];
kit.scene('sotto', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TL = G.MOD.seconda.telone, GI = TL.giusta.giri;
    this.chis = [1, 2, 3].map(k => S2.trenoDa(GI[k].frase, GI[k].tratti));
    this.fermi = [1, 2, 3].map(k => G.fermoTreno(GI[k].frase.length + 1));
    const nuovi = [TL.paperelle.Al, TL.paperelle.piccolo, TL.paperelle['telone·fine']];
    this.laps = [1, 2, 3].map((k, j) => G.giro7({ id: 'l' + j, chi: this.chis[j], vasca: GI[k].vasca, seme: 251 + 2 * j, parola: GI[k].pescata, nuovo: nuovi[j], fermo: this.fermi[j], t: SO_LAPS[j] }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.laps.map(g => g.treno).join('') + '<g class="so-telone"></g><g class="so-cu"></g><g class="so-ada"></g>' + this.laps.map(g => g.mano).join('');
    const camera = '<g class="so-camera" opacity="0"><g class="so-cam-cam">' + G.salotto('<g class="so-tel"></g>', { cameretta: true }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'sotto', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: camera,
      html: G.sottotitolo('NARRATORE', 'Sotto il telone i giri sono giri come gli altri. Ada pesca, le paperelle salgono, ma il telefono non le vede.') +
        G.sottotitolo('ADA', 'Una grigia e una verde. Che ci fanno lì?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.laps.map(g => g.papere).join(''));
    this.laps.forEach(g => g.monta(this.m));
    this.G = G;
    const q = this.m.q;
    this.telone = q('.so-telone'); this.cu = q('.so-cu'); this.ada = q('.so-ada');
    this.camera = q('.so-camera'); this.camCam = q('.so-cam-cam'); this.tel = q('.so-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[10.9, 20.0], [34.6, 38.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'sotto', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(SO_CAM, t));
    G.animaMondo(m, t + 2260);
    const quale = t < SO_A[1] - 0.1 ? 0 : t < SO_A[2] - 0.1 ? 1 : 2;
    let r = { giu: 0 };
    this.laps.forEach((g, k) => { const vivo = k === quale; const rr = g.render(vivo ? t : -100); if (!vivo) g.vag.forEach(v => v.setAttribute('opacity', 0)); else r = rr; });
    // Il telone: dopo ogni pesca, in stazione, copre i vagoni saliti dopo la paperella arancio (dal ventesimo); l'ultima,
    // l'arancio scura, resta fuori. Durante il giro è piegato sul braccio del custode.
    const T = SO_LAPS[quale], st = SO_STENDE(quale), F = this.fermi[quale], ultimo = quale < 2 ? 20 + quale : 21;
    const a = F + 20 * M.passoBanchina - 40, b = F + ultimo * M.passoBanchina + 40;
    let tel = '';
    const lembo = eio(seg(t, SO_LEMBO[0], SO_LEMBO[1]));
    if (t >= st[0] && (t < SO_A[quale + 1] - 0.1 || quale === 2)) {
      // All'ultimo giro (l'arancio scura) il telone si arrotola fino a lei: prima copre tutto, poi si ritira.
      const sr = quale < 2 ? eio(seg(t, st[0], st[1])) : 1;
      tel = S2.telone(a, b, { srotola: sr, lembo });
    }
    this.cambia('tel', tel, this.telone, tel);
    const [cx, cy] = [380, 836], piegato = !tel;
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    this.cambia('cu', piegato + '', this.cu, '<g transform="' + G.posaCustode(cx, cy) + '">' + G.unico(G.custode(piegato ? 'porge' : 'base', 'serio', { occhi: 1 }), 'socu') + '</g>' + (piegato ? S2.telonePiegato(hx + 6, hy + 2, 0.9) : ''));
    // Ada: pesca; poi va in fondo al treno e solleva il lembo del telone.
    const P = T.pesca, pesca = t >= P.giu - 0.8 && t < P.preso + 0.8 && t < 28;
    const va = eio(seg(t, 30.8, 32.6)), sbircia = t >= SO_LEMBO[0] - 0.4;
    const ax = lerp(672, b + 22, va), ay = lerp(896, 836, va);
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : sbircia ? 'sorpresa' : 'base';
    this.cambia('ada', (pesca ? 'p' : sbircia ? 's' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g class="so-ada-in">' + (sbircia ? G.adaSaluta(espr, -40) : G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 })) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // Il telefono: muto.
    this.camera.setAttribute('opacity', (seg(t, SO_TEL[0] - 0.2, SO_TEL[0]) * (1 - seg(t, SO_TEL[1] - 0.2, SO_TEL[1]))).toFixed(3));
    if (t > SO_TEL[0] - 0.2 && t < SO_TEL[1]) {
      this.cambia('t', (Math.round(t * 30) / 30).toFixed(3), this.tel, G.unico(G.telefono({ chat: [['io', 'Chi è il più basso tra Emma, Al e Mare?']], puntini: t }), 'sotel'));
      const z = 1.1;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z) + ' ' + (620 - 620 * z) + ') scale(' + z + ')');
    }
    this.sub(t);
  },
});
