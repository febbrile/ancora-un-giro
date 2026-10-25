const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca: tantissime grigie. Ada pesca una grigia; al giro dopo, la Fine, e il fanale si spegne.
// Stacco nella cameretta: sul telefono compare «Al». La bambina batte le mani (il telefono saltella). Ada guarda il telone
// piegato sul braccio del custode.
// Si apre nella luce dell'uscita (come finisce «finestre»); finisce sul custode col telone (la riprende «sbagliata»).
const RI_A = { esce: 0.4, vel: [[0.4, 760], [1.8, 760], [2.2, 90], [3.6, 90], [4.0, 400]], pesca: { giu: 3.8, su: 4.5, preso: 4.8 }, via: 5.2, salta: 5.2, vagone: 5.6, sale: 6.1 };
const RI_B = { esce: 9.6, vel: [[9.6, 760], [11.0, 760], [11.4, 90], [12.8, 90], [13.2, 400]], pesca: { giu: 13.0, su: 13.7, preso: 14.0 }, via: 14.4 };
const RI_FANALE = [17.8, 18.8];
const RI_CASA = [19.4, 19.8, 24.4, 24.8], RI_ARRIVA = 20.4, RI_MANI = 21.2;
const RI_CU = [930, 936];
const RI_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 18.2, cx: 700, cy: 846, z: 3.6 },
  { t: 24.8, cx: 800, cy: 870, z: 4.0 },
];
kit.scene('risposta', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TL = G.MOD.seconda.telone, GI = TL.giusta.giri;
    this.chiB = S2.trenoDa(GI[5].frase, GI[5].tratti);
    this.a = G.giro7({ id: 'a', chi: S2.trenoDa(GI[4].frase, GI[4].tratti), vasca: GI[4].vasca, seme: 263, parola: 'Al', nuovo: TL.paperelle.Al, fermo: G.fermoTreno(24), t: RI_A });
    this.b = G.giro7({ id: 'b', chi: this.chiB, vasca: GI[5].vasca, seme: 265, parola: 'Fine', fermo: G.fermoTreno(25), t: RI_B });
    const [hx, hy] = G.puntoCustode(RI_CU[0], RI_CU[1], G.CUSTODE_MANI.porge);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.a.treno + this.b.treno + '<g class="ri-ada"></g><g transform="' + G.posaCustode(RI_CU[0], RI_CU[1]) + '">' + G.unico(G.custode('porge', 'base', { occhi: -1 }), 'ricu') + '</g>' +
      S2.telonePiegato(hx + 6, hy + 2, 0.9) + this.a.mano + this.b.mano;
    const camera = '<g class="ri-camera" opacity="0"><g class="ri-cam-cam">' + G.salotto('<g class="ri-tel"></g>', { cameretta: true }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'risposta', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: camera,
      html: G.sottotitolo('NARRATORE', 'Sul telefono arriva la risposta: Al. Ed è giusta.') +
        G.sottotitolo('ADA', 'Sotto il telone non c’è niente di nuovo. Ci sono altri giri.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.a.papere + this.b.papere);
    this.a.monta(this.m); this.b.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.ri-ada'); this.camera = q('.ri-camera'); this.camCam = q('.ri-cam-cam'); this.tel = q('.ri-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[20.0, 24.4], [25.2, 30.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'risposta', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(RI_CAM, t));
    G.animaMondo(m, t + 2300);
    const primo = t < RI_B.esce - 0.1;
    const ra = this.a.render(primo ? t : -100), rb = this.b.render(primo ? -100 : t);
    if (!primo) this.a.vag.forEach(v => v.setAttribute('opacity', 0)); else this.b.vag.forEach(v => v.setAttribute('opacity', 0));
    const fan = Math.round((1 - eio(seg(t, RI_FANALE[0], RI_FANALE[1]))) * 10) / 10;
    if (!primo && String(fan) !== this.stati.fan) {
      const c = this.chiB[0];
      this.b.vag[0].querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: fan }, '<g class="g-pass">' + G.passeggero(c.tipo, c.biglietto, c.o) + '</g>');
      this.stati.fan = String(fan);
    }
    const T = primo ? RI_A : RI_B, r = primo ? ra : rb, P = T.pesca;
    const pesca = t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 24.8 ? 'pensa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // La cameretta: «Al»; la bambina batte le mani.
    const [c0, c1, c2, c3] = RI_CASA;
    this.camera.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= RI_ARRIVA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Chi è il più basso tra Emma, Al e Mare?']].concat(arrivata ? [['ai', 'Al']] : []), puntini: arrivata ? undefined : t }), 'ritel'));
      const su = t > RI_MANI ? 16 * Math.abs(Math.sin((t - RI_MANI) * 10)) * (1 - seg(t, RI_MANI, RI_MANI + 1.6)) : 0, z = 1.1;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z) + ' ' + (620 - 620 * z - su).toFixed(1) + ') scale(' + z + ')');
    }
    this.sub(t);
  },
});
