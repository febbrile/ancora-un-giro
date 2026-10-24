const { seg, eo, ei, eio, lerp } = kit;
// Un'altra notte, la stessa domanda. Stesso treno, stesso giro: le paperelle viola, la rosa, la viola scura (a montaggio,
// sull'acqua). La cabina parte, sparisce oltre le colline, e torna gocciolante di pioggia come l'altra volta. Ma questa
// volta, sulla striscia, c'è «sole». Lo Spezzaparole lo taglia: il biglietto «sole» è giallo oro, e sale in fondo al treno
// dietro la bandierina turchese. Ada guarda le gocce che colano dalla cabina, poi il biglietto. Il treno fa il suo giro,
// calmo come sempre, ed esce sopra la vasca: tantissime paperelle marroni. Ada pesca una marrone; sul telefono, «No». La
// persona rimette l'ombrello al suo posto.
// Si apre sull'acqua della vasca; finisce su Ada alla bancarella (la riprende «storia»).
const SO_LAPS = [0.2, 3.4, 6.6].map(a => ({
  esce: a - 1.0, vel: [[a - 1.0, 900], [a + 0.3, 900], [a + 0.5, 140], [a + 1.5, 140], [a + 1.8, 600]],
  pesca: { giu: a + 1.5, su: a + 2.0, preso: a + 2.2 }, via: a + 2.4, salta: a + 2.4, vagone: a + 2.7, sale: a + 3.0,
}));
const SO_CABINA = [10.0, 12.4, 12.6, 15.0];
const SO_GOCCE = [15.0, 18.6], SO_PRENDE = 16.4;
const SO_TAGLI = [19.6, 20.2];
const SO_ESCE = { esce: 23.4, vel: [[23.4, 520], [25.6, 520], [26.0, 70], [28.4, 70], [29.0, 280]], pesca: { giu: 28.8, su: 29.6, preso: 30.0 }, via: 30.4 };
const SO_CASA = [30.8, 31.2, 34.6, 35.0], SO_RISPOSTA = 31.6, SO_OMBRELLO = [32.4, 34.0];
const SO_CAM = [
  { t: 0, cx: 760, cy: 900, z: 6.0 },
  { t: 9.99, cx: 760, cy: 900, z: 6.0 },
  { t: 10.0, cx: 2380, cy: 470, z: 0.74 },
  { t: 11.4, cx: 3100, cy: 60, z: 0.8 },
  { t: 12.6, cx: 3100, cy: 60, z: 0.8 },
  { t: 14.4, cx: 2200, cy: 560, z: 0.9 },
  { t: 14.99, cx: 1900, cy: 760, z: 1.6 },
  { t: 15.0, cx: 1810, cy: 800, z: 5.6 },
  { t: 18.6, cx: 1810, cy: 800, z: 5.6 },
  { t: 18.8, cx: 480, cy: 800, z: 3.4 },
  { t: 22.4, cx: 480, cy: 800, z: 3.4 },
  { t: 22.6, cx: 740, cy: 846, z: 3.6 },
  { t: 30.6, cx: 700, cy: 846, z: 3.6 },
  { t: 35.0, cx: 712, cy: 860, z: 4.6 },
];
kit.scene('sole', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TE = G.MOD.seconda.teleferica, PA = TE.paperelle;
    const nuovi = ['teleferica', 'domani', 'teleferica·fine'];
    this.laps = TE.sole.slice(0, 3).map((g, k) => G.giro7({ id: 'l' + k, chi: S2.trenoDa(g.frase, g.tratti), vasca: g.vasca, seme: 191 + 2 * k, parola: g.pescata,
      nuovo: PA[nuovi[k]], fermo: G.fermoTreno(g.frase.length + 1), t: SO_LAPS[k] }));
    const g3 = TE.sole[3];
    this.chi = S2.trenoDa(g3.frase, g3.tratti);
    this.N = this.chi.length;
    this.fermo = G.fermoTreno(this.N + 2);
    this.sedili = this.chi.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    this.esce = G.giro7({ id: 'es', chi: this.chi, vasca: g3.vasca, seme: 197, parola: 'No', fermo: this.fermo, t: SO_ESCE });
    const sopra = '<g class="so-macchina"></g>' +
      '<g class="so-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      this.laps.map(g => g.treno).join('') + this.esce.treno + S2.teleferica({}) + '<g class="so-cabina"></g><g class="so-ada"></g><g class="so-cu"></g><g class="so-carta"></g>' +
      ['⚑turchese', 'sole'].map(w => '<g class="so-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(w) + '</g></g>').join('') +
      this.laps.map(g => g.mano).join('') + this.esce.mano;
    const attaccapanni = '<path d="M1830 300 L1830 900 M1790 900 L1870 900 M1800 320 L1860 320" stroke="' + C.legnoScuro + '" stroke-width="12" stroke-linecap="round"/><circle cx="1830" cy="296" r="12" fill="' + C.legno + '"/>';
    const ombrello = '<g class="so-ombrello"><path d="M0 -150 Q-70 -150 -80 -60 Q-60 -80 -40 -60 Q-20 -80 0 -60 Q20 -80 40 -60 Q60 -80 80 -60 Q70 -150 0 -150 Z" fill="#3E6FB8" stroke="#284C84" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M0 -150 L0 40 Q0 64 -22 60" stroke="#3A2A30" stroke-width="9" fill="none" stroke-linecap="round"/></g>';
    const casa = '<g class="so-casa" opacity="0"><g class="so-casa-cam">' + G.salotto('<g class="so-tel"></g>') + attaccapanni + ombrello + '</g></g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'sole', laggiu: 1, manopola: 0, banchina: true, morto: true, bruco: 'acceso', strisce: 0, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Una notte la cabina torna bagnata di pioggia. Ma sulla striscia c’è il sole.') +
        G.sottotitolo('NARRATORE', 'E il treno la porta con la calma di sempre.') +
        G.sottotitolo('ADA', 'Il treno non sa se è vera.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.laps.map(g => g.papere).join('') + this.esce.papere);
    this.laps.forEach(g => g.monta(this.m)); this.esce.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.so-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    G.posaTreno(this.vag, this.m.partenza, 640 - this.fermo, null, M.passoBanchina);
    this.trenoEl = q('.so-treno');
    this.mac = q('.so-macchina'); this.cabina = q('.so-cabina'); this.ada = q('.so-ada'); this.cu = q('.so-cu'); this.carta = q('.so-carta');
    this.big = this.m.qa('.so-big');
    this.casa = q('.so-casa'); this.casaCam = q('.so-casa-cam'); this.tel = q('.so-tel'); this.ombrello = q('.so-ombrello');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.stati = {};
    this.sub = G.subs(kit, [[15.2, 21.6], [22.6, 26.4], [35.4, 37.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'sole', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m, N = this.N;
    m.cam.setAttribute('transform', G.camChiavi(SO_CAM, t));
    G.animaPaesaggio(m, t + 610, { treni: true });
    // I tre giri a montaggio, sull'acqua; poi il giro di «sole».
    const quale = t < SO_LAPS[1].esce + 0.4 ? 0 : t < SO_LAPS[2].esce + 0.4 ? 1 : t < 10 ? 2 : -1;
    let r = { giu: 0 };
    this.laps.forEach((g, k) => { const rr = g.render(k === quale ? t : -100); if (k !== quale) g.vag.forEach(v => v.setAttribute('opacity', 0)); else r = rr; });
    const fuori = t >= SO_ESCE.esce - 0.1;
    const re = this.esce.render(fuori ? t : -100);
    if (!fuori) this.esce.vag.forEach(v => v.setAttribute('opacity', 0)); else r = re;
    // Il treno fermo, con «sole» che sale in fondo (solo alla stazione, tra la cabina e l'uscita).
    const fermo = t >= 18.8 && t < 22.6;
    this.trenoEl.setAttribute('opacity', fermo ? 1 : 0);
    // La cabina: va e torna; poi, al palo, gocciola.
    let u = 0;
    if (t >= SO_CABINA[0] && t < SO_CABINA[2]) u = eio(seg(t, SO_CABINA[0], SO_CABINA[1]));
    else if (t >= SO_CABINA[2]) u = 1 - eio(seg(t, SO_CABINA[2], SO_CABINA[3]));
    const [px, py] = S2.puntoCabina(0.015 + 0.985 * u), gocce = t >= SO_CABINA[2] ? 1 - seg(t, SO_GOCCE[1] - 0.6, SO_GOCCE[1]) : 0;
    const dentro = t >= SO_CABINA[2] && t < SO_PRENDE;
    this.cambia('cab', (gocce > 0 ? (Math.round(t * 20) / 20).toFixed(2) : '') + dentro, this.cabina, '<g>' + S2.cabina({ gocce, t, rotolo: dentro }) + '</g>');
    this.cabina.firstChild.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')');
    this.cabina.setAttribute('opacity', (1 - seg(u, 0.88, 0.97)).toFixed(3));
    // Il custode: al palo riprende la striscia; alla stazione la porta allo Spezzaparole.
    const alPalo = t >= 14.99 && t < 18.8, allaStazione = t >= 18.8 && t < 22.6;
    const cx = alPalo ? 1870 : 250, cy = alPalo ? 872 : 836;
    const posa = alPalo && t >= SO_PRENDE - 0.4 ? 'porge' : allaStazione && t < SO_TAGLI[0] ? 'porge' : 'base';
    this.cambia('cu', (alPalo || allaStazione) + posa, this.cu, alPalo || allaStazione ? '<g transform="' + G.posaCustode(cx, cy) + '">' + G.unico(G.custode(posa, 'serio', { occhi: 1 }), 'socu') + '</g>' : '');
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    let carta = '';
    if (alPalo && t >= SO_PRENDE) carta = '<g transform="translate(' + hx.toFixed(1) + ' ' + (hy - 2).toFixed(1) + ') scale(.1)">' + G.rotolo() + '</g>';
    else if (allaStazione && t < SO_TAGLI[0] - 0.3) { const v = eio(seg(t, 18.8, SO_TAGLI[0] - 0.3)); carta = '<g transform="translate(' + lerp(hx, 581, v).toFixed(1) + ' ' + lerp(hy - 2, 756, v).toFixed(1) + ') scale(.1)">' + G.rotolo() + '</g>'; }
    this.cambia('carta', carta, this.carta, carta);
    // Lo Spezzaparole: zac, zac; la bandierina turchese e «sole» volano in fondo al treno.
    let forbice = 0.6, bocca = 0;
    SO_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.16))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    this.cambia('mac', forbice.toFixed(2) + bocca.toFixed(2), this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca }) + '</g>');
    this.vag.forEach((v, i) => { if (i >= N - 2) v.setAttribute('opacity', eo(seg(t, SO_TAGLI[0] - 0.4 + (i - N + 2) * 0.3, SO_TAGLI[0] + 0.2 + (i - N + 2) * 0.3)).toFixed(3)); });
    this.big.forEach((b, j) => {
      const i = N - 2 + j, a = SO_TAGLI[j] + 0.1, u3 = eio(seg(t, a, a + 0.9)), [sx, sy] = this.sedili[i], vita = a + 1.1;
      const x = lerp(this.bocca[0], sx, u3), y = lerp(this.bocca[1], sy - 8, u3) - 36 * Math.sin(Math.PI * u3), nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a || !allaStazione ? 0 : (1 - nasce).toFixed(3));
      const p = this.pass[i], v = eo(seg(t, vita, vita + 0.6));
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
    });
    // Ada: pesca sull'acqua; guarda le gocce; guarda «sole»; pesca la marrone; dice che il treno non lo sa.
    let ax = 672, ay = 896, posaA = 'quaderno', espr = 'base', giu = 0;
    const T = quale >= 0 ? SO_LAPS[quale] : SO_ESCE;
    if ((quale >= 0 || fuori) && t >= T.pesca.giu - 0.6 && t < T.pesca.preso + 0.6) { posaA = 'pesca'; espr = t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa'; giu = r.giu; }
    if (alPalo) { ax = 1760; ay = 874; posaA = 'base'; espr = 'pensa'; }
    if (allaStazione) { ax = 648; ay = 836; posaA = 'base'; espr = t > 21 ? 'pensa' : 'sorpresa'; }
    if (t > 34.6) espr = 'pensa';
    this.cambia('ada', posaA + espr + giu + ax, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(posaA, espr, { giu }) + '</g>');
    // La casa: «No»; l'ombrello torna all'attaccapanni.
    const [c0, c1, c2, c3] = SO_CASA;
    this.casa.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= SO_RISPOSTA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Domani piove?']].concat(arrivata ? [['ai', 'No']] : []), puntini: arrivata ? undefined : t }), 'sotel'));
      const u2 = eio(seg(t, SO_OMBRELLO[0], SO_OMBRELLO[1]));
      this.ombrello.setAttribute('transform', 'translate(' + lerp(520, 1866, u2).toFixed(1) + ' ' + (lerp(800, 470, u2) - 120 * Math.sin(Math.PI * u2)).toFixed(1) + ') rotate(' + lerp(-14, 0, u2).toFixed(1) + ')');
    }
    this.sub(t);
  },
});
