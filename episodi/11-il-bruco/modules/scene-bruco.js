const { seg, eo, eio, lerp } = kit;
// Ada segue il custode nell'angolo buio del parco, oltre la montagna grande. Il custode alza la lanterna e la giostrina
// si accende: è tutta per bambini piccoli. Un bruco verde con la faccia dipinta, le antenne a pallina e un sorriso largo,
// fatto di segmenti tondi, uno dietro l'altro, come vagoni. La pista fa un giro corto e passa dentro una piccola montagna a
// forma di mela. All'uscita c'è una vasca piccola, col suo cartello: una paperella verde e una rossa. Davanti al Bruco,
// una sbarra a righe bianche e rosse.
// Si apre alla stazione, come finisce «domanda»; finisce sulla sbarra, con Ada (la riprende «rosso»).
const BR_CAMMINA = [0.4, 5.4];
const BR_ALZA = [6.0, 8.0], BR_LUCI = [6.4, 7.6];
const BR_CAM = [
  { t: 0, cx: 760, cy: 800, z: 2.2 },
  { t: 5.0, cx: 1000, cy: 930, z: 2.4 },
  { t: 6.2, cx: 1234, cy: 966, z: 2.3 },
  { t: 8.4, cx: 1234, cy: 966, z: 2.3 },
  { t: 9.6, cx: 1232, cy: 972, z: 6.6 },
  { t: 11.2, cx: 1232, cy: 972, z: 6.6 },
  { t: 12.4, cx: 1424, cy: 954, z: 3.6 },
  { t: 14.6, cx: 1424, cy: 954, z: 3.6 },
  { t: 15.8, cx: 1298, cy: 1042, z: 6.2 },
  { t: 23.6, cx: 1298, cy: 1042, z: 6.2 },
  { t: 25.0, cx: 1084, cy: 998, z: 3.8 },
];
const BR_CU = [1120, 1032], BR_ADA = [1028, 1032];
kit.scene('bruco', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, B = S2.BRUCO, F = G.MOD.seconda.bruco.frasi.parolaccia;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.giro = S2.giroBruco({ id: 'br', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: 0, verdi: 0, mano: [0, 0], t: { sale: 999, passo: 1, parte: 999, giro: 10 } });
    const buio = '<defs><radialGradient id="g-br-buio"><stop offset="0" stop-color="#05070F" stop-opacity=".6"/><stop offset=".7" stop-color="#05070F" stop-opacity=".75"/><stop offset="1" stop-color="#05070F" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse class="br-buio" cx="' + (B.c[0] + 20) + '" cy="' + (B.c[1] - 10) + '" rx="440" ry="240" fill="url(#g-br-buio)"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      gio.dietro + this.giro.bruco + gio.davanti + this.giro.biglietti + buio + '<g class="br-ada"></g><g class="br-cu"></g><g class="br-big"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'bruco', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Accanto alla montagna grande c’è una giostrina: il Bruco. È una giostra uguale, solo piccola.') +
        G.sottotitolo('NARRATORE', 'E nella sua vasca cadono paperelle di due colori soli: verdi e rosse.'),
    });
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.br-ada'); this.cu = q('.br-cu'); this.buio = q('.br-buio'); this.bigEl = q('.br-big');
    this.bigHtml = F.frase.map((w, i) => '<g transform="translate(' + (i * 3) + ' ' + (-i * 2) + ') rotate(' + (-12 + 8 * i) + ') scale(.13) translate(-60 -30)">' + G.biglietto(w) + '</g>').join('');
    this.stati = {};
    this.sub = G.subs(kit, [[6.2, 14.0], [17.4, 23.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'bruco', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(BR_CAM, t));
    G.animaMondo(m, t + 1430);
    this.giro.render(t);
    this.buio.setAttribute('opacity', (1 - 0.82 * eio(seg(t, BR_LUCI[0], BR_LUCI[1]))).toFixed(3));
    // Il custode cammina davanti, con la lanterna e i biglietti; arrivato, alza la lanterna e accende la giostrina.
    const u = eio(seg(t, BR_CAMMINA[0], BR_CAMMINA[1])), cammina = u > 0 && u < 1;
    const cx = lerp(760, BR_CU[0], u), cy = lerp(930, BR_CU[1], u) - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0);
    const alza = t >= BR_ALZA[0] && t < BR_ALZA[1], dond = Math.round(8 * Math.sin(t * 3));
    const posa = alza ? 'alza' : 'porge';
    this.cambia('cu', posa + dond, this.cu, '<g class="br-cu-in">' + G.unico(G.custode(posa, 'base', { occhi: 1, dondolo: dond }), 'brcu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy) + (cammina ? ' rotate(' + (2 * Math.sin(t * 6)).toFixed(2) + ' 120 410)' : ''));
    // I biglietti nella mano del custode (mentre alza la lanterna, li tiene sotto il braccio: non si vedono).
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    this.cambia('big', alza ? '' : 'm', this.bigEl, alza ? '' : this.bigHtml);
    this.bigEl.setAttribute('transform', 'translate(' + hx.toFixed(1) + ' ' + (hy - 3).toFixed(1) + ')');
    // Ada lo segue, a due passi; poi guarda la giostrina, a bocca aperta.
    const ua = eio(seg(t, BR_CAMMINA[0] + 0.5, BR_CAMMINA[1] + 0.6)), ax = lerp(680, BR_ADA[0], ua), ay = lerp(930, BR_ADA[1], ua) - (ua > 0 && ua < 1 ? 4 * Math.abs(Math.sin(t * 8)) : 0);
    const espr = t < BR_LUCI[0] ? 'base' : t < 16 ? 'sorpresa' : 'felice';
    this.cambia('ada', espr, this.ada, '<g class="br-ada-in">' + G.ada('base', espr) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
