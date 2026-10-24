const { seg, eo, eio, lerp } = kit;
// Una cameretta: le mani di una bambina scrivono sul telefono «Chi è il più basso tra Emma, Al e Mare?» e premono invio.
// Sul telefono pulsano i tre puntini. Al luna park il treno parte, fa il suo giro, torna, riparte. Ada guarda il treno,
// poi pensa alla bambina che aspetta. I puntini pulsano ancora. Titolo: «Il telone».
// Si apre nella cameretta; finisce alla bancarella col titolo (la riprende «telone»).
const DM_FRASE = 'Chi è il più basso tra Emma, Al e Mare?';
const DM_SCRIVE = 0.8, DM_INVIO = 7.6, DM_CAMERA = [[0, 8.4], [15.2, 19.0]];
const DM_TITOLO = 24.0;
const DM_CAM = [
  { t: 8.4, cx: 640, cy: 560, z: 0.92 },
  { t: 15.0, cx: 640, cy: 560, z: 0.92 },
  { t: 19.0, cx: 720, cy: 850, z: 3.4 },
  { t: 23.0, cx: 720, cy: 850, z: 3.4 },
  { t: 24.4, cx: 740, cy: 790, z: 2.6 },
];
kit.scene('domanda', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, D = G.MOD.seconda.telone.giusta.giri[0];
    const chi = S2.trenoDa(D.frase, D.tratti);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-treno">' + G.treno(chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posaCustode(930, 936) + '">' + G.unico(G.custode('base', 'base', { occhi: -1 }), 'dmcu') + '</g><g class="dm-ada"></g>';
    const camera = '<g class="dm-camera"><g class="dm-cam-cam">' + G.salotto('<g class="dm-tel"></g>', { cameretta: true }) + '</g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 290)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: camera + titolo,
      html: G.sottotitolo('NARRATORE', 'Arriva un indovinello. Il treno fa un giro, e un altro, e un altro ancora. Ma sul telefono non arriva niente.') +
        G.sottotitolo('ADA', 'Perché il telefono resta muto?'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.dm-treno .g-vag'); this.ada = q('.dm-ada');
    this.camera = q('.dm-camera'); this.camCam = q('.dm-cam-cam'); this.tel = q('.dm-tel');
    this.titolo = q('.dm-titolo'); this.insegna = q('.dm-insegna');
    this.typ = kit.typist(DM_FRASE, DM_SCRIVE, 6.0, 61);
    this.stati = {};
    this.sub = G.subs(kit, [[8.6, 18.0], [19.6, 22.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 2200);
    // La cameretta: si scrive, si manda; poi solo i puntini.
    const c = DM_CAMERA.find(([a, b]) => t >= a - 0.3 && t < b);
    this.camera.setAttribute('opacity', c ? (c[0] === 0 ? 1 - seg(t, c[1] - 0.3, c[1]) : seg(t, c[0] - 0.3, c[0]) * (1 - seg(t, c[1] - 0.3, c[1]))).toFixed(3) : 0);
    if (c) {
      const inviato = t >= DM_INVIO + 0.15;
      const chat = inviato ? [['io', DM_FRASE]] : [], scritto = inviato ? '' : this.typ.at(t);
      const cursore = !inviato && Math.floor(t / 0.53) % 2 === 0, premuto = t > DM_INVIO - 0.05 && t < DM_INVIO + 0.3, puntini = inviato ? t : undefined;
      // Il campo del telefono è stretto: si vede la fine di quello che si scrive.
      const vis = scritto.length > 16 ? '…' + scritto.slice(-15) : scritto;
      this.cambia('tel', vis + cursore + premuto + (puntini !== undefined ? (Math.round(t * 30) / 30).toFixed(3) : ''), this.tel, G.unico(G.telefono({ chat, scritto: vis, cursore, premuto, puntini }), 'dmtel'));
      const z = c[0] === 0 ? lerp(1, 1.06, seg(t, 0, 8)) : 1.1;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z).toFixed(1) + ' ' + (620 - 620 * z).toFixed(1) + ') scale(' + z.toFixed(4) + ')');
    }
    // Il treno: gira e gira.
    const s = 2300 + (((t - 8) * 900) % 2600 + 2600) % 2600;
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    const espr = t < 18.8 ? 'sorpresa' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>');
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > DM_TITOLO - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Il telone', 760, 230, +turno));
    this.sub(t);
  },
});
