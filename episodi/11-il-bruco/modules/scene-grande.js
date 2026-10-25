const { seg, eo, eio, lerp } = kit;
// Ada si gira verso la montagna grande, scura e silenziosa sopra la giostrina. Il trenino aspetta in stazione, con le
// sbarre alzate. Il custode chiude il regolamento. Ada chiede se allora decide il Bruco; il custode guarda il Bruco, poi
// indica la sbarra: il Bruco fa verde o rosso, la sbarra la abbassa lui.
// Si apre su Ada che guarda verso la stazione (come finisce «rosso»); finisce sul custode e la sbarra (la riprende «verde»).
const GR_CU = [1188, 1076], GR_ADA = [1070, 1052];
const GR_CHIUDE = 9.4, GR_INDICA = [11.4, 14.0], GR_SBARRA = [14.6, 17.6];
const GR_CAM = [
  { t: 0, cx: 1104, cy: 1026, z: 4.6 },
  { t: 1.2, cx: 1104, cy: 1026, z: 4.6 },
  { t: 4.2, cx: 1240, cy: 640, z: 0.76 },
  { t: 7.0, cx: 1240, cy: 640, z: 0.76 },
  { t: 8.2, cx: 1134, cy: 1026, z: 3.8 },
  { t: 17.6, cx: 1134, cy: 1026, z: 3.8 },
];
kit.scene('grande', {
  init(kit) {
    const G = window.G, M = G.MONDO, S2 = G.S2, F = G.MOD.seconda.bruco.frasi.parolaccia;
    const gio = S2.giostrina({ sbarra: 1, luci: 1 });
    this.giro = S2.giroBruco({ id: 'gr', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: 0, verdi: 0, mano: [0, 0], t: { sale: 999, passo: 1, parte: 999, giro: 10 } });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="gr-treno">' + G.treno(Array.from({ length: 9 }, () => ({})), { sbarra: 0 }) + '</g>' +
      gio.dietro + this.giro.bruco + gio.davanti + '<g class="gr-ada"></g><g class="gr-cu"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'grande', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'La montagna grande quella frase non l’ha mai vista. E non sa che c’era.') +
        G.sottotitolo('ADA', 'Allora decide il Bruco?') +
        G.sottotitolo('CUSTODE', 'Il Bruco fa verde o rosso. La sbarra la abbasso io: lo dice il regolamento.'),
    });
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    G.posaTreno(this.m.qa('.gr-treno .g-vag'), this.m.partenza, 640 - G.fermoTreno(10), null, M.passoBanchina);
    this.ada = q('.gr-ada'); this.cu = q('.gr-cu');
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 7.4], [8.4, 10.8], [11.2, 17.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'grande', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GR_CAM, t));
    G.animaMondo(m, t + 1490);
    this.giro.render(t);
    // Il custode: legge ancora; chiude il regolamento; guarda il Bruco, poi indica la sbarra.
    let posa = t < GR_CHIUDE ? 'legge' : 'base', occhi = t < GR_CHIUDE ? 0 : -1;
    if (t >= GR_INDICA[0] && t < GR_INDICA[1]) { posa = 'base'; occhi = 1; }
    else if (t >= GR_SBARRA[0] && t < GR_SBARRA[1]) { posa = 'porge'; occhi = -1; }
    const dond = Math.round(5 * Math.sin(t * 2));
    this.cambia('cu', posa + occhi + dond, this.cu, '<g transform="' + G.posaCustode(GR_CU[0], GR_CU[1]) + '">' + G.unico(G.custode(posa, 'serio', { occhi, dondolo: dond }), 'grcu') + '</g>');
    // Ada: guarda la montagna grande; poi il custode.
    const espr = t < 7 ? 'pensa' : t < 11 ? 'sorpresa' : 'base';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(GR_ADA[0], GR_ADA[1]) + '">' + (t < 7.6 ? G.adaGira('base', espr, {}, -24) : G.ada('base', espr)) + '</g>');
    this.sub(t);
  },
});
