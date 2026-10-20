const { seg, eo, ei, eio, lerp } = kit;
// In una delle tre case: sul telefono la storia di Emma è cresciuta, riga dopo riga (troppo piccola per leggerla). Le mani
// tengono il telefono; la persona legge, e scrive ancora. Invio: una striscia nuova vola fuori dalla finestra, sopra i
// tetti, verso il luna park. Ada la vede arrivare e la prende, poi guarda la montagna, pensierosa. Cartello: «Fine».
// Si apre come finisce «resta» (la manopola nel mezzo).
const AN_CASA = [0, 0.5, 11.2, 11.8];
const AN_SCRIVE = 3.8, AN_INVIO = 6.4;
const AN_VOLO = [6.8, 11.6];
const AN_ARRIVA = [11.6, 13.6];
const AN_CAM = [
  { t: 11.6, cx: 760, cy: 760, z: 2.4 },
  { t: 13.6, cx: 690, cy: 836, z: 4.4 },
  { t: 15.2, cx: 690, cy: 836, z: 4.4 },
  { t: 18.4, cx: 880, cy: 680, z: 1.7 },
];
const AN_FINE = 19.4;
function anBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('ancora', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C;
    const z = 1.0, [bx, by] = [960, 540];
    const casa = '<g class="an-casa"><g transform="translate(' + (bx - 947 * z) + ' ' + (by - 500 * z) + ') scale(' + z + ')">' +
      G.salotto('<g class="an-tel"></g>', { muro: ['#3E2E22', '#5E4632', '#7A5A3C'] }) + '</g>' +
      '<g class="an-volo" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('', 300) + '</g></g></g>';
    const fine = '<g class="an-fine" opacity="0"><g transform="translate(960 330)"><g class="an-insegna"></g></g></g>';
    const quaderno = '<g transform="translate(704 830)"><rect x="-13" y="-4" width="26" height="5" rx="1.5" fill="#2F6F73" stroke="#1E4A4D" stroke-width="1"/><rect x="-11" y="-5" width="22" height="2" fill="' + C.crema + '"/></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      quaderno + '<g class="an-ada"></g>' +
      '<g class="an-arriva" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('', 300) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'ancora', manopola: 0, davanti: casa + fine,
      html: G.sottotitolo('NARRATORE', 'In una delle tre case, qualcuno legge la storia di Emma, e scrive ancora.') +
        G.sottotitolo('ADA', 'E il treno si ricorderà di quello che ha scritto prima?') +
        G.sottotitolo('NARRATORE', 'Ma questa è un’altra storia.'),
    });
    this.G = G;
    this.casa = this.m.q('.an-casa'); this.tel = this.m.q('.an-tel'); this.volo = this.m.q('.an-volo');
    this.ada = this.m.q('.an-ada'); this.arriva = this.m.q('.an-arriva');
    this.fine = this.m.q('.an-fine'); this.insegna = this.m.q('.an-insegna');
    this.typ = kit.typist('E poi?', AN_SCRIVE, 3.2, 17);
    this.stato = ''; this.statoTel = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 7.4], [14.0, 18.8], [20.0, 22.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'ancora', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(AN_CAM, t));
    G.animaMondo(m, t + 1160);
    // La casa: la storia lunga sul telefono; si scrive ancora, invio.
    this.casa.setAttribute('opacity', (seg(t, AN_CASA[0], AN_CASA[1]) * (1 - seg(t, AN_CASA[2], AN_CASA[3]))).toFixed(3));
    const inviato = t >= AN_INVIO + 0.15;
    const scritto = inviato ? '' : this.typ.at(t);
    const cursore = !inviato && t > AN_SCRIVE - 0.8 && Math.floor(t / 0.53) % 2 === 0;
    const premuto = t > AN_INVIO - 0.05 && t < AN_INVIO + 0.3;
    const chat = [['io', 'Al mare Emma'], ['ai', 16]].concat(inviato ? [['io', 'E poi?']] : []);
    const kt = scritto + cursore + premuto + inviato;
    if (kt !== this.statoTel) { this.tel.innerHTML = G.telefono({ chat, scritto, cursore, premuto }); this.statoTel = kt; }
    // La striscia nuova vola fuori dalla finestra, sopra i tetti.
    const u = eio(seg(t, AN_VOLO[0], AN_VOLO[1]));
    const p = anBez([[960, 600], [1200, 420], [1500, 360], [2100, 200]], u);
    this.volo.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') rotate(' + (lerp(-10, 14, u) + 8 * Math.sin(t * 3)).toFixed(1) + ') skewX(' + (9 * Math.sin(t * 6)).toFixed(1) + ') scale(' + lerp(1.2, 0.45, u).toFixed(3) + ')');
    this.volo.setAttribute('opacity', (seg(t, AN_VOLO[0], AN_VOLO[0] + 0.3)).toFixed(3));
    // Al luna park: la striscia scende dal cielo e arriva in mano ad Ada, alla bancarella.
    const ua = eio(seg(t, AN_ARRIVA[0], AN_ARRIVA[1]));
    const pa = anBez([[1100, 560], [900, 600], [760, 760], [672, 820]], ua);
    this.arriva.setAttribute('transform', 'translate(' + pa[0].toFixed(1) + ' ' + pa[1].toFixed(1) + ') rotate(' + ((1 - ua) * -16 * Math.sin(t * 3)).toFixed(1) + ') scale(' + lerp(0.3, 0.123, ua).toFixed(3) + ')');
    const presa = t >= AN_ARRIVA[1];
    this.arriva.setAttribute('opacity', t >= AN_ARRIVA[0] && !presa ? 1 : 0);
    const espr = t < AN_ARRIVA[0] + 0.8 ? 'base' : t < AN_ARRIVA[1] + 0.6 ? 'sorpresa' : t < AN_FINE ? 'pensa' : 'felice';
    const k = presa + espr;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(presa ? 'striscia' : 'base', espr, {}) + '</g>'; this.stato = k; }
    // Il cartello: «Fine».
    const f = eo(seg(t, AN_FINE, AN_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
