const { seg, eo, eio, lerp } = kit;
// Un'altra notte, lo stesso indovinello. Stesso treno, stesso giro: la vasca arancio, il telone. Ma sotto il telone, dalla
// vasca quasi alla pari, Ada pesca un'acquamarina. Poi la verde oliva, poi l'arancio scura. Il treno esce: tantissime
// acquamarina. Ada pesca, e sul telefono compare «Mare», tranquillo come l'altra volta. Ada guarda la sua pagina, dove Al è
// un sassolino piccolo piccolo e Mare un'onda alta. Il custode non si scompone.
// Si apre sulla vasca arancio; finisce sul quaderno (la riprende «campanella»).
const SB_A = [-3.0, 3.6, 10.8, 18.0, 25.2];
const SB_LAPS = SB_A.map((a, k) => ({ esce: a, vel: [[a, 900], [a + 1.4, 900], [a + 1.8, 90], [a + 3.2, 90], [a + 3.6, 400]],
  pesca: { giu: a + 3.4, su: a + 4.1, preso: a + 4.4 }, via: a + 4.8, salta: k < 4 ? a + 4.8 : undefined, vagone: k < 4 ? a + 5.2 : undefined, sale: k < 4 ? a + 5.7 : undefined }));
const SB_CASA = [33.0, 33.4, 36.4, 36.8], SB_ARRIVA = 33.8;
const SB_QUADERNO = [37.0, 37.5, 42.6, 43.0];
const SB_CAM = [{ t: 0, cx: 740, cy: 846, z: 3.6 }, { t: 37.0, cx: 760, cy: 860, z: 3.0 }];
kit.scene('sbagliata', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TL = G.MOD.seconda.telone, GI = TL.sbagliata.giri;
    const nuovi = [TL.paperelle.telone, TL.paperelle.mare, TL.paperelle.piccolo, TL.paperelle['telone·fine'], undefined];
    this.laps = [0, 1, 2, 3, 4].map(k => G.giro7({ id: 'l' + k, chi: S2.trenoDa(GI[k].frase, GI[k].tratti), vasca: GI[k].vasca, seme: 271 + 2 * k, parola: GI[k].pescata,
      nuovo: nuovi[k], fermo: G.fermoTreno(GI[k].frase.length + 1), t: SB_LAPS[k] }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.laps.map(g => g.treno).join('') + '<g class="sb-ada"></g><g class="sb-cu"></g>' + this.laps.map(g => g.mano).join('');
    const camera = '<g class="sb-camera" opacity="0"><g class="sb-cam-cam">' + G.salotto('<g class="sb-tel"></g>', { cameretta: true }) + '</g></g>';
    // La pagina di Ada: Al, un sassolino piccolo piccolo; Mare, un'onda alta; Emma, una bambina (a matita, coi loro colori).
    const P = G.MOD.mare.passeggeri;
    const pagina = '<g transform="translate(420 760) scale(.9)">' + G.al(P.Al.biglietto) + '</g>' +
      '<g transform="translate(650 300) scale(2.6)">' + G.mare(P.mare.biglietto) + '</g>' + G.schizzoEmma(1350, 780, P.Emma.biglietto, 2.6) +
      '<path d="M300 900 L1640 900" stroke="#3A3570" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>';
    const quaderno = '<g class="sb-quad" opacity="0">' + G.quadernoAperto(pagina, '') + '</g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'sbagliata', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: camera + quaderno,
      html: G.sottotitolo('NARRATORE', 'Sotto il telone nessuno controlla. La risposta segue la paperella sbagliata, con la stessa sicurezza.') +
        G.sottotitolo('ADA', 'Ma Mare non è il più basso!'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.laps.map(g => g.papere).join(''));
    this.laps.forEach(g => g.monta(this.m));
    this.G = G;
    const q = this.m.q;
    this.ada = q('.sb-ada'); this.cu = q('.sb-cu'); this.camera = q('.sb-camera'); this.camCam = q('.sb-cam-cam'); this.tel = q('.sb-tel'); this.quad = q('.sb-quad');
    this.cu.innerHTML = '<g transform="' + G.posaCustode(930, 936) + '">' + G.unico(G.custode('porge', 'base', { occhi: -1 }), 'sbcu') + '</g>' +
      S2.telonePiegato(...G.puntoCustode(930, 936, G.CUSTODE_MANI.porge).map((v, i) => v + [6, 2][i]), 0.9);
    this.stati = {};
    this.sub = G.subs(kit, [[11.2, 19.8], [39.6, 42.4]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'sbagliata', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(SB_CAM, t));
    G.animaMondo(m, t + 2340);
    let quale = 0;
    SB_A.forEach((a, k) => { if (t >= a - 0.1) quale = k; });
    let r = { giu: 0 };
    this.laps.forEach((g, k) => { const vivo = k === quale; const rr = g.render(vivo ? t : -100); if (!vivo) g.vag.forEach(v => v.setAttribute('opacity', 0)); else r = rr; });
    const T = SB_LAPS[quale], P = T.pesca, pesca = t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 37 ? 'accigliata' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + (pesca ? G.ada('pesca', espr, { giu: r.giu }) : G.adaGira('quaderno', espr, {}, 0)) + '</g>');
    const [c0, c1, c2, c3] = SB_CASA;
    this.camera.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= SB_ARRIVA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Chi è il più basso tra Emma, Al e Mare?']].concat(arrivata ? [['ai', 'Mare']] : []), puntini: arrivata ? undefined : t }), 'sbtel'));
      const z = 1.1;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z) + ' ' + (620 - 620 * z) + ') scale(' + z + ')');
    }
    const [q0, q1, q2, q3] = SB_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    this.sub(t);
  },
});
