const { seg, eo, eio, lerp } = kit;
// Il treno esce sopra la vasca: passano gli otto vagoni, poi la bandierina, blu. Cadono le stesse paperelle di prima. Ada
// pesca una blu, e sul secondo telefono compare «nuota». Stacco nella casa: la persona scuote la testa (il telefono
// fa no) e scrive «Al parco». Invio. A montaggio:
// - alla stazione arriva una striscia più lunga, con tutta la chat; il custode attacca la frase del parco in testa e le
//   bandierine dove servono. Esce il treno: la bandierina è turchese; nella vasca tantissime turchesi, tante verdi, poche
//   blu. Ada pesca una turchese; sul telefono, «gioca»;
// - la persona scrive ancora «Al parco». Invio. Il treno è più lungo, con tre Parco che agitano i rametti. Esce la
//   bandierina, verde: nella vasca tantissime verdi, tante turchesi, quasi nessuna blu. Ada pesca una verde; sul
//   telefono, «corre». La persona sorride (il telefono fa un saltello).
// Si apre nella luce dell'uscita (come finisce «finestre»); finisce nella casa (la riprende «custode», alla stazione).
const IN_GIRI = [
  { esce: 0.4, vel: [[0.4, 300], [1.8, 300], [2.3, 60], [4.6, 60], [5.2, 260]], pesca: { giu: 5.4, su: 6.2, preso: 6.6 }, via: 7.0, salta: 7.0, vagone: 7.4, sale: 8.0 },
  { esce: 17.8, vel: [[17.8, 520], [20.0, 520], [20.6, 70], [23.0, 70], [23.6, 300]], pesca: { giu: 23.8, su: 24.5, preso: 24.9 }, via: 25.3, salta: 25.3, vagone: 25.7, sale: 26.2 },
  // L'ultima paperella resta nella mano di Ada: il modellino non dice che colore avrebbe sul treno.
  { esce: 31.4, vel: [[31.4, 640], [34.4, 640], [35.0, 80], [37.2, 80], [37.8, 300]], pesca: { giu: 37.6, su: 38.3, preso: 38.6 }, via: 39.0 },
];
// La casa: il telefono mostra la risposta; poi la persona scrive di nuovo «Al parco». Quando, e cosa.
const IN_CASA = [
  { da: 8.4, a: 14.0, risposta: 'nuota', no: [9.6, 10.8], scrive: 11.0, invio: 13.2 },
  { da: 26.4, a: 29.6, risposta: 'gioca', scrive: 27.2, invio: 29.0 },
  { da: 40.0, a: 43.0, risposta: 'corre', felice: 40.8 },
];
// La stazione, a montaggio: la striscia lunga e il custode che attacca (secondo messaggio); il treno con tre Parco (terzo).
const IN_STRISCIA = [14.0, 17.8], IN_ATTACCA = 15.6;
const IN_TRE = [29.6, 31.4];
const IN_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 8.3, cx: 700, cy: 846, z: 3.6 },
  { t: 14.0, cx: -440, cy: 770, z: 2.1 },
  { t: 15.8, cx: -440, cy: 770, z: 2.1 },
  { t: 17.79, cx: 60, cy: 770, z: 1.9 },
  { t: 17.8, cx: 740, cy: 846, z: 3.6 },
  { t: 26.3, cx: 700, cy: 846, z: 3.6 },
  { t: 29.6, cx: 40, cy: 780, z: 1.8 },
  { t: 31.39, cx: 60, cy: 780, z: 1.85 },
  { t: 31.4, cx: 740, cy: 846, z: 3.6 },
  { t: 39.9, cx: 700, cy: 846, z: 3.6 },
];
kit.scene('insiste', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, GIRI = G.MOD.seconda.parco.giri;
    // I tre giri: il treno, la vasca, la paperella pescata, e quella che sale nel vagone nuovo.
    this.giri = GIRI.map((g, k) => {
      const nuovo = k < 2 ? GIRI[k + 1].passeggeri.find(p => p.parola === g.pescata).biglietto : undefined;
      const n = g.frase.length;
      return G.giro7({ id: 'g' + k, chi: S2.treno(g), vasca: g.vasca, seme: 121 + 2 * k, parola: g.pescata, nuovo, fermo: G.fermoTreno(n + 1), t: IN_GIRI[k] });
    });
    // Il treno del terzo messaggio, fermo in stazione con i suoi tre Parco.
    this.tre = S2.treno(GIRI[2]);
    this.fermoTre = G.fermoTreno(this.tre.length + 1);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="in-cu"></g><g class="in-nastro"></g><g class="in-scint" opacity="0">' + [0, 1, 2, 3, 4, 5].map(() => '<circle r="2.2" fill="' + C.luce + '"/>').join('') + '</g>' +
      '<g class="in-tre" opacity="0">' + G.treno(this.tre.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>' +
      this.giri.map(g => g.treno).join('') + '<g class="in-ada"></g>' + this.giri.map(g => g.mano).join('');
    const casa = '<g class="in-casa" opacity="0"><g class="in-casa-cam">' + G.salotto('<g class="in-tel"></g>', { muro: ['#1E3A40', '#2E5A58', '#4A6E5C'] }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'insiste', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'La persona insiste: «Al parco». E a ogni messaggio risale tutta la chat.') +
        G.sottotitolo('NARRATORE', 'Sul treno i Parco sono sempre di più. Al terzo messaggio, la vasca torna verde.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.giri.forEach(g => g.monta(this.m));
    this.G = G;
    const q = this.m.q;
    this.ada = q('.in-ada'); this.cu = q('.in-cu'); this.nastroEl = q('.in-nastro'); this.scint = q('.in-scint');
    this.casa = q('.in-casa'); this.casaCam = q('.in-casa-cam'); this.tel = q('.in-tel');
    this.treEl = q('.in-tre'); this.treVag = this.m.qa('.in-tre .g-vag');
    G.posaTreno(this.treVag, this.m.partenza, 640 - this.fermoTre, null, M.passoBanchina);
    this.typ = IN_CASA.map((c, k) => c.scrive !== undefined ? kit.typist('Al parco', c.scrive, 4.2, 21 + k) : null);
    // La striscia lunga del secondo messaggio, stesa lungo la banchina sopra i sedili.
    this.parole = GIRI[1].frase.map(w => w === 'storie' ? 'Storie' : w);
    this.linea = G.linea([[-660, 744], [600, 744]]);
    this.stati = {};
    this.sub = G.subs(kit, [[11.2, 17.6], [33.0, 40.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('10', 'insiste', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(IN_CAM, t));
    G.animaMondo(m, t + 1200);
    // I tre giri: ognuno si vede solo nel suo tratto di montaggio.
    const quale = t < 14.0 ? 0 : t < 31.4 ? 1 : 2;
    const res = this.giri.map((g, k) => {
      const vivo = k === quale && !(k === 1 && t < IN_GIRI[1].esce) && !(k === 2 && t < IN_GIRI[2].esce);
      const r = g.render(vivo ? t : -100);
      g.vag.forEach(v => { if (!vivo) v.setAttribute('opacity', 0); });
      return r;
    });
    // Ada, alla bancarella: pesca a occhi chiusi, guarda la paperella che corre al treno.
    const T = IN_GIRI[quale], r = res[quale];
    const pesca = t >= T.pesca.giu - 0.9 && t < T.pesca.preso + 0.9;
    const espr = pesca ? (t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa') : quale === 2 ? 'felice' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // La stazione: la striscia lunga, col custode che attacca la frase del parco in testa.
    const inStriscia = t >= IN_STRISCIA[0] && t < IN_STRISCIA[1];
    let nastro = '';
    if (inStriscia) {
      const A = this.linea.lung * eo(seg(t, IN_STRISCIA[0], IN_STRISCIA[0] + 1.2)), passo = this.linea.lung / this.parole.length;
      nastro = G.nastro(this.linea, this.linea.lung - A, this.linea.lung, this.parole.map((w, i) => [w, (i + 0.5) * passo]), 20, { onda: s => 1.5 * Math.sin(s * 0.03 - t * 4) });
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    const sc = inStriscia ? seg(t, IN_ATTACCA, IN_ATTACCA + 0.9) : 0;
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    if (sc > 0 && sc < 1) [...this.scint.children].forEach((c, k) => { const an = k * Math.PI / 3, d = 6 + 20 * eo(sc); c.setAttribute('cx', (-660 + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (744 + d * Math.sin(an)).toFixed(2)); });
    const cuOn = inStriscia;
    const posaCu = inStriscia && t < IN_ATTACCA + 1.0 ? 'attacca' : 'base';
    this.cambia('cu', cuOn + posaCu, this.cu, cuOn ? '<g transform="' + G.posaCustode(-690, 836) + '">' + G.unico(G.custode(posaCu, 'serio', { occhi: 1 }), 'incu') + '</g>' : '');
    // Il treno del terzo messaggio, fermo lungo la banchina: tre Parco agitano i rametti.
    const treOn = t >= IN_TRE[0] && t < IN_TRE[1];
    this.treEl.setAttribute('opacity', treOn ? 1 : 0);
    if (treOn) {
      const ciao = Math.round(-22 + 18 * Math.sin((t - IN_TRE[0]) * 6));
      this.tre.forEach((c, i) => { if (c.tipo === 'parco') G.cambiaPasseggero(this.treVag[i], 'parco', c.biglietto, { ciao: i % 2 ? ciao : -44 - ciao }); });
    }
    // La casa.
    const casa = IN_CASA.find(c => t >= c.da - 0.2 && t < c.a + 0.2);
    this.casa.setAttribute('opacity', casa ? (seg(t, casa.da - 0.15, casa.da) * (1 - seg(t, casa.a - 0.15, casa.a))).toFixed(3) : 0);
    if (casa) {
      const k = IN_CASA.indexOf(casa), base = [['io', 'Al parco Emma'], ['ai', 'nuota'], ['io', 'Al parco'], ['ai', 'gioca'], ['io', 'Al parco'], ['ai', 'corre']];
      let chat = base.slice(0, 2 * k + 2), scritto = '', cursore = false, premuto = false;
      if (casa.scrive !== undefined) {
        const inviato = t >= casa.invio + 0.15;
        scritto = inviato ? '' : this.typ[k].at(t);
        cursore = !inviato && t > casa.scrive - 0.6 && Math.floor(t / 0.53) % 2 === 0;
        premuto = t > casa.invio - 0.05 && t < casa.invio + 0.3;
        if (inviato) chat = chat.concat([['io', 'Al parco']]);
      }
      this.cambia('tel', chat.length + scritto + cursore + premuto, this.tel, G.unico(G.telefono({ chat, scritto, cursore, premuto }), 'intel' + k));
      // Il telefono fa no (la persona scuote la testa), oppure un saltello (sorride).
      const no = casa.no ? 5 * Math.sin((t - casa.no[0]) * 16) * Math.sin(Math.PI * seg(t, casa.no[0], casa.no[1])) : 0;
      const su = casa.felice ? 18 * Math.abs(Math.sin((t - casa.felice) * 9)) * (1 - seg(t, casa.felice, casa.felice + 1.0)) * (t > casa.felice ? 1 : 0) : 0;
      const z = lerp(1.0, 1.08, seg(t, casa.da, casa.a)), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z - su).toFixed(2) + ') scale(' + z.toFixed(4) + ') rotate(' + no.toFixed(2) + ' 950 560)');
    }
    this.sub(t);
  },
});
