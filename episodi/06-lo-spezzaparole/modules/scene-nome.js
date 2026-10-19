const { seg, eo, eio, lerp } = kit;
// Una cameretta di notte, con la lampada a forma di luna e, sul tavolo, il disegno a pastelli di una bestiolina gialla
// e pelosa. Due mani piccole tengono il telefono e scrivono, una lettera alla volta, «Al mare Zampirù». Invio: la
// striscia di carta esce dal telefono, vola verso la finestra e via, sopra i tetti; scende dal cielo del luna park e
// atterra in mano ad Ada, alla stazione, dove il trenino di cinque vagoni aspetta vuoto. Ada legge e aggrotta le
// sopracciglia. Si apre dal buio; finisce su Ada con la striscia in mano (la riprende «zac»).
const NM_FRASE = 'Al mare Zampirù';
const NM_BUIO = [0, 1.2];
const NM_SCRIVE = 3.0, NM_INVIO = 8.0;
const NM_ESCE = [8.4, 11.0];
const NM_STACCO = [10.8, 11.6];
const NM_CADE = [11.2, 15.4];
const NM_LEGGE = 16.8;
const NM_CASA_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 1.4, cx: 960, cy: 540, z: 1 },
  { t: 3.0, cx: 800, cy: 630, z: 1.3 },
  { t: 8.4, cx: 800, cy: 630, z: 1.3 },
  { t: 10.6, cx: 1440, cy: 390, z: 1.7 },
];
const NM_CAM = [
  { t: 11.0, cx: 980, cy: 470, z: 1.0 },
  { t: 12.2, cx: 980, cy: 470, z: 1.0 },
  { t: 14.0, cx: 640, cy: 720, z: 2.3 },
  { t: 15.8, cx: 534, cy: 790, z: 4.6 },
];
const NM_PASSO = 76, NM_TRENO = 490;
// Le sopracciglia aggrottate di Ada (sopra gli occhiali), nelle coordinate del suo disegno.
const NM_CIGLIA = '<path d="M77 68 Q87 64 96 71 M104 71 Q113 64 123 68" stroke="#3A2418" stroke-width="3.6" stroke-linecap="round" fill="none"/>';
function nmBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('nome', {
  init(kit) {
    const G = window.G, M = G.MONDO;
    const casa = '<g class="nm-casa"><g class="nm-casa-cam">' + G.salotto('<g class="nm-tel"></g>', { cameretta: true }) +
      '<g class="nm-volo" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(NM_FRASE, 300) + '</g></g></g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="nm-treno">' + G.treno([{}, {}, {}, {}, {}], { sbarra: 0 }) + '</g>' +
      '<g class="nm-ada"></g>' +
      '<g class="nm-cade" opacity="0"><g transform="translate(-150 -22)">' + G.striscia(NM_FRASE, 300) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'nome', manopola: 0, banchina: true, morto: true,
      davanti: casa + '<rect class="nm-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/>',
      html: G.sottotitolo('NARRATORE', 'Quella sera, da una cameretta, arriva una storia con un nome che nessuno ha mai sentito.') +
        G.sottotitolo('ADA', 'Al mare… Zampirù?'),
    });
    this.G = G;
    const q = this.m.q;
    this.casa = q('.nm-casa'); this.casaCam = q('.nm-casa-cam'); this.tel = q('.nm-tel'); this.volo = q('.nm-volo');
    this.nero = q('.nm-nero'); this.ada = q('.nm-ada'); this.cade = q('.nm-cade');
    G.posaTreno(this.m.qa('.nm-treno .g-vag'), this.m.partenza, NM_TRENO, null, NM_PASSO);
    this.typ = kit.typist(NM_FRASE, NM_SCRIVE, 3.6, 6);
    this.statoTel = ''; this.statoAda = '';
    this.sub = G.subs(kit, [[1.0, 8.8], [17.6, 20.4]]);
  },
  // Ada, con le sopracciglia aggrottate quando legge; la scritta sulla striscia, più piccola, ci sta tutta.
  adaSvg(pose, espr, aggrotta) {
    let s = this.G.ada(pose, espr, { testo: NM_FRASE });
    if (pose === 'striscia') s = s.replace('font-size="20"', 'font-size="15"');
    if (aggrotta) s = s.replace(/<\/g>$/, NM_CIGLIA + '</g>');
    return s;
  },
  render(t, kit) {
    t = window.G.tempo('06', 'nome', t);
    const G = this.G, M = G.MONDO, m = this.m;
    this.nero.setAttribute('opacity', (1 - eio(seg(t, NM_BUIO[0], NM_BUIO[1]))).toFixed(3));
    // La cameretta: le mani piccole scrivono, poi premono invio.
    this.casa.setAttribute('opacity', (1 - eio(seg(t, NM_STACCO[0], NM_STACCO[1]))).toFixed(3));
    this.casaCam.setAttribute('transform', G.camChiavi(NM_CASA_CAM, t));
    const inviato = t >= NM_INVIO + 0.15;
    const scritto = inviato ? '' : this.typ.at(t);
    const cursore = !inviato && t > NM_SCRIVE - 0.6 && Math.floor(t / 0.53) % 2 === 0;
    const premuto = t > NM_INVIO - 0.05 && t < NM_INVIO + 0.3;
    const kt = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
    if (kt !== this.statoTel) { this.tel.innerHTML = G.telefono({ scritto, cursore, premuto, messaggi: inviato ? [NM_FRASE] : [] }); this.statoTel = kt; }
    // La striscia esce dalla bolla, vola alla finestra e via, sopra i tetti.
    const uv = eio(seg(t, NM_ESCE[0], NM_ESCE[1]));
    const [bx, by] = G.SALOTTO.bolla;
    const pv = nmBez([[bx, by], [bx + 120, by - 260], [1420, 420], [1660, 210]], uv);
    const sv = lerp(1.15, 0.3, uv) * (1 + 0.15 * Math.sin(Math.PI * Math.min(1, uv * 3)));
    this.volo.setAttribute('transform', 'translate(' + pv[0].toFixed(1) + ' ' + (pv[1] + 10 * Math.sin(t * 3)).toFixed(1) + ') rotate(' + (lerp(0, -14, uv) + 7 * Math.sin(t * 4)).toFixed(2) + ') skewX(' + (8 * Math.sin(t * 6)).toFixed(2) + ') scale(' + sv.toFixed(3) + ')');
    this.volo.setAttribute('opacity', (t < NM_ESCE[0] ? 0 : 1 - seg(t, NM_ESCE[1] - 0.6, NM_ESCE[1])).toFixed(3));
    // Il luna park: la striscia scende dal cielo e atterra in mano ad Ada.
    m.cam.setAttribute('transform', G.camChiavi(NM_CAM, t));
    G.animaMondo(m, t + 600);
    const uc = eio(seg(t, NM_CADE[0], NM_CADE[1]));
    const pc = nmBez([[1600, 30], [1240, 160], [760, 520], [M.ada[0], 808]], uc);
    const sc = lerp(0.42, 0.123, uc), rc = (1 - uc) * (-18 + 12 * Math.sin(t * 3));
    this.cade.setAttribute('transform', 'translate(' + pc[0].toFixed(2) + ' ' + pc[1].toFixed(2) + ') rotate(' + rc.toFixed(2) + ') skewX(' + ((1 - uc) * 8 * Math.sin(t * 6)).toFixed(2) + ') scale(' + sc.toFixed(3) + ')');
    const presa = t >= NM_CADE[1];
    this.cade.setAttribute('opacity', t < NM_CADE[0] || presa ? 0 : 1);
    // Ada: guarda in su, la prende, la legge e aggrotta le sopracciglia.
    const espr = t < 14.0 ? 'base' : t < NM_CADE[1] ? 'sorpresa' : t < NM_LEGGE ? 'felice' : 'pensa';
    const ka = presa + espr;
    if (ka !== this.statoAda) {
      this.ada.innerHTML = '<g class="nm-ada-in"><g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + this.adaSvg(presa ? 'striscia' : 'base', espr, t >= NM_LEGGE) + '</g></g>';
      this.statoAda = ka;
    }
    // Quando legge piega un poco la testa.
    const piega = -5 * eio(seg(t, NM_LEGGE, NM_LEGGE + 0.6)) + (t > NM_LEGGE ? 1.2 * Math.sin((t - NM_LEGGE) * 2) : 0);
    this.ada.firstChild.setAttribute('transform', 'rotate(' + piega.toFixed(2) + ' ' + M.ada[0] + ' ' + M.ada[1] + ')');
    this.sub(t);
  },
});
