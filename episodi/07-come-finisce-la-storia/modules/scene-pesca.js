const { seg, eo, eio, lerp } = kit;
// Ada chiude gli occhi, infila la mano nella vasca e tira fuori una paperella scura. Apre gli occhi e la guarda: la
// paperella non salta e non corre lungo la banchina, resta seduta nella sua mano. Le altre scivolano via dallo scarico.
// Nessun vagone nuovo: il treno è fermo in stazione, ogni vestito del colore del suo biglietto. Poi il fanale del primo
// vagone si spegne, e una dopo l'altra le lampadine della stazione (con le lucine dei vagoni sotto di loro). Intorno, il
// resto del luna park resta acceso. Stacco sul salotto: sul telefono, sotto «Al mare Emma», «nuota e gioca.», e i tre
// puntini spariscono. Una mano tira la catenella e la lampada si spegne.
// Si apre su Ada e la vasca scura, come finisce «vasca»; finisce nel salotto al buio (dopo, «fine» torna da Ada).
const PE_CAM = [
  { t: 0, cx: 712, cy: 850, z: 4.2 },
  { t: 1.4, cx: 696, cy: 856, z: 4.8 },
  { t: 3.8, cx: 696, cy: 856, z: 4.8 },
  // La paperella scura nella mano di Ada.
  { t: 4.8, cx: 690, cy: 862, z: 6.4 },
  { t: 7.6, cx: 700, cy: 862, z: 6.0 },
  // Nessun vagone nuovo: lungo il treno fermo, fino al primo vagone.
  { t: 8.8, cx: 600, cy: 830, z: 3.6 },
  { t: 10.8, cx: 196, cy: 818, z: 4.2 },
  { t: 12.4, cx: 196, cy: 818, z: 4.2 },
  // La stazione si spegne, una lampadina dopo l'altra; poi si vede che il resto del luna park resta acceso.
  { t: 13.2, cx: 360, cy: 740, z: 2.1 },
  { t: 15.4, cx: 380, cy: 740, z: 2.0 },
  { t: 17.0, cx: 900, cy: 600, z: 1.15 },
];
const PE_GIRO = { esce: -20, vel: [[-20, 300]], pesca: { giu: 1.8, su: 3.2, preso: 3.6 }, via: 5.4, tiene: 4.6 };
const PE_MANO = [4.6, 5.3];
const PE_FANALE = [11.0, 12.2];
const PE_STAZIONE = [13.0, 16.0];
// Il salotto: i puntini spariscono, la camera si allontana, la mano tira la catenella, la lampada si spegne.
const PE_CASA = 17.2, PE_PUNTINI = [18.2, 18.6], PE_INDIETRO = [18.8, 20.2], PE_MANO_LAMPADA = [19.6, 20.4, 21.2, 22.0], PE_SPENTA = [20.8, 21.2];
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri, C = G.C;
    this.chi = [{ tipo: 'al', biglietto: A.Al.biglietto, uscita: A.Al.tratti[2] }, { tipo: 'mare', biglietto: A.mare.biglietto, uscita: A.mare.tratti[2] },
      { tipo: 'emma', biglietto: A.Emma.biglietto, uscita: A.Emma.tratti[2] }]
      .concat(['nuota', 'e', 'gioca', '.'].map(w => ({ tipo: 'paperella', biglietto: P[w].biglietto, uscita: P[w].tratti[2] })));
    this.giro = G.giro7({ id: 'e', chi: this.chi, vasca: F.giri[4].vasca, seme: 53, parola: F.giri[4].pescata, t: PE_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="pe-ada"></g>' + this.giro.mano;
    // Il salotto: la stanza, poi il buio quando la lampada si spegne, poi (sopra) il telefono acceso e le dita.
    const SA = G.SALOTTO;
    const dita = [520, 590, 660].map(y => '<rect x="704" y="' + y + '" width="58" height="54" rx="27" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="2"/>').join('');
    const catenella = '<path class="pe-cat" d="M300 330 L300 404" stroke="#C9B48A" stroke-width="3" stroke-dasharray="4 3"/><circle class="pe-perla" cx="300" cy="410" r="8" fill="#D9C08A" stroke="#8C7A52" stroke-width="2"/>';
    const casa = '<g class="pe-casa" opacity="0"><g class="pe-casa-cam">' + G.salotto('') + catenella +
      '<rect class="pe-buio" x="-200" y="-200" width="2320" height="1480" fill="#05071A" opacity="0"/>' +
      '<path class="pe-paralume" d="M170 330 L330 330 L295 200 L205 200 Z" fill="#7C6C58" opacity="0"/>' +
      '<g transform="translate(' + SA.tel[0] + ' ' + SA.tel[1] + ') scale(' + SA.s + ')"><g class="pe-tel"></g></g>' + dita +
      '<g class="pe-braccio" opacity="0"><path d="M0 0 L-260 640" stroke="' + C.pelle + '" stroke-width="54" stroke-linecap="round"/><ellipse cx="0" cy="-4" rx="20" ry="16" fill="#F6CDB6"/></g>' +
      '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Ada pesca una paperella scura. Questa volta nessuno sale sul treno.') +
        G.sottotitolo('NARRATORE', 'Il fanale si spegne, la stazione si spegne, e sul telefono la storia è finita.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    this.ada = this.m.q('.pe-ada');
    this.lampadine = this.m.qa('.g-lampadina').map(el => ({ el, x: +el.getAttribute('cx') }));
    this.casa = this.m.q('.pe-casa'); this.casaCam = this.m.q('.pe-casa-cam'); this.tel = this.m.q('.pe-tel');
    this.buio = this.m.q('.pe-buio'); this.paralume = this.m.q('.pe-paralume'); this.braccio = this.m.q('.pe-braccio');
    this.cat = this.m.q('.pe-cat'); this.perla = this.m.q('.pe-perla');
    this.stato = ''; this.statoTel = ''; this.statoFanale = '';
    this.sub = G.subs(kit, [[4.6, 10.4], [11.4, 21.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'pesca', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PE_CAM, t));
    G.animaMondo(m, t + 1110);
    const r = this.giro.render(t), Pp = PE_GIRO.pesca;
    // Ada: pesca a occhi chiusi; poi tiene la paperella scura davanti a sé e la guarda.
    const pesca = t >= Pp.giu - 0.8 && t < PE_MANO[0];
    const posa = t < Pp.giu - 0.8 ? 'quaderno' : pesca ? 'pesca' : 'base';
    const espr = t < Pp.giu - 0.8 ? 'pensa' : t < Pp.preso + 0.3 ? 'chiusi' : t < 8.0 ? 'sorpresa' : 'pensa';
    const k = posa + espr + r.giu;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { giu: r.giu }) + '</g>'; this.stato = k; }
    if (t >= PE_MANO[0]) {
      // La paperella resta seduta nella sua mano, davanti al camice: non salta, non corre.
      const [hx, hy] = this.giro.manoAt(0), u = eio(seg(t, PE_MANO[0], PE_MANO[1]));
      const x = lerp(hx, 672, u), y = lerp(hy, 884, u) - 1.2 * Math.abs(Math.sin(t * 2.2)) * u;
      this.giro.manoEl.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + lerp(0.16, 0.18, u).toFixed(3) + ')');
      this.giro.manoEl.setAttribute('opacity', 1);
    }
    // Il fanale del primo vagone si spegne.
    const fan = Math.round((1 - eio(seg(t, PE_FANALE[0], PE_FANALE[1]))) * 12) / 12;
    if (String(fan) !== this.statoFanale) {
      const v = this.giro.vag[0], c = this.chi[0];
      v.querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: fan }, '<g class="g-pass">' + G.passeggero(c.tipo, c.biglietto) + '</g>');
      this.statoFanale = String(fan);
    }
    // Una dopo l'altra, dal primo vagone in fondo, le lampadine della stazione e le lucine dei vagoni sotto di loro.
    // Le lampadine della banchina lunga, oltre il primo vagone, si spengono con le prime (sono fuori campo).
    const spenta = x => (x = Math.max(x, 50), eio(seg(t, PE_STAZIONE[0] + (x - 50) / 560 * (PE_STAZIONE[1] - PE_STAZIONE[0]), PE_STAZIONE[0] + (x - 50) / 560 * (PE_STAZIONE[1] - PE_STAZIONE[0]) + 0.35)));
    this.lampadine.forEach(({ el, x }) => el.setAttribute('opacity', (1 - 0.85 * spenta(x)).toFixed(3)));
    this.giro.vag.forEach((v, i) => { const o = (1 - 0.88 * spenta(M.fermo + i * M.passoBanchina)).toFixed(3); v.querySelectorAll('.g-lucina').forEach(el => el.setAttribute('opacity', o)); });
    // Il salotto.
    this.casa.setAttribute('opacity', seg(t, PE_CASA - 0.15, PE_CASA).toFixed(3));
    if (t >= PE_CASA - 0.2) {
      const z = lerp(1.55, 1.0, eio(seg(t, PE_INDIETRO[0], PE_INDIETRO[1]))), [bx, by] = [940, 640];
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
      const via = seg(t, PE_PUNTINI[0], PE_PUNTINI[1]), kk = via >= 1 ? 'fine' : (Math.round(t * 30) / 30).toFixed(3);
      if (kk !== this.statoTel) {
        let tel = G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', 'nuota e gioca.']], puntini: via >= 1 ? undefined : t });
        // I tre puntini svaniscono.
        if (via > 0 && via < 1) tel = tel.replace(/(<circle cx="(?:58|84|110)"[^>]*opacity=")([\d.]+)"/g, (s, a, o) => a + (o * (1 - via)).toFixed(2) + '"').replace(/(<rect x="30" y="\d+" width="110" height="56" rx="26" fill="#E4E7F1")/, '$1 opacity="' + (1 - via).toFixed(2) + '"');
        this.tel.innerHTML = G.unico(tel, 'petel'); this.statoTel = kk;
      }
      // La mano tira la catenella; la lampada si spegne.
      const [a0, a1, a2, a3] = PE_MANO_LAMPADA;
      const arriva = eio(seg(t, a0, a1)) * (1 - eio(seg(t, a2, a3))), tira = Math.sin(Math.PI * seg(t, a1, a2)) * 22;
      this.braccio.setAttribute('opacity', arriva > 0 ? 1 : 0);
      this.braccio.setAttribute('transform', 'translate(' + lerp(40, 300, arriva).toFixed(1) + ' ' + (lerp(1260, 414, arriva) + tira).toFixed(1) + ')');
      this.perla.setAttribute('cy', (410 + tira).toFixed(1));
      this.cat.setAttribute('d', 'M300 330 L300 ' + (404 + tira).toFixed(1));
      const off = eio(seg(t, PE_SPENTA[0], PE_SPENTA[1]));
      this.buio.setAttribute('opacity', (0.55 * off).toFixed(3));
      this.paralume.setAttribute('opacity', off.toFixed(3));
    }
    this.sub(t);
  },
});
