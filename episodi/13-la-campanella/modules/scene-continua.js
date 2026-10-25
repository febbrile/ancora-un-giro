const { seg, eo, eio, lerp } = kit;
// Nel salotto la persona sorride, scrive «continua» e preme invio. Alla stazione arriva una striscia lunga: tutta la chat,
// la frase del parco, le bandierine, «Al mare Emma», «nuota e gioca e», e in fondo «continua». Il custode rimette
// l'orologio a zero. Lo Spezzaparole taglia, e risalgono tutti, dal principio: diciassette vagoni, e nell'ultimo la
// bandierina d'ottone. A montaggio: la vasca blu, Ada pesca una blu; poi tante grigie, Ada pesca il punto; poi la vasca
// scura, Ada pesca la Fine, e il fanale si spegne. Sul telefono: «nuota e gioca e nuota.».
// Si apre nel salotto; finisce sul telefono (la riprende «indovinello»).
const CO_SCRIVE = 1.0, CO_INVIO = 3.8, CO_SALOTTO = [0, 4.8];
const CO_STRISCIA = [5.0, 7.4], CO_ZERO = [7.0, 8.2], CO_SALE = [8.4, 10.6];
const CO_A = [12.6, 19.2, 25.8];
const CO_LAPS = CO_A.map((a, k) => ({
  esce: a, vel: [[a, 800], [a + 1.4, 800], [a + 1.8, 90], [a + 3.2, 90], [a + 3.6, 400]],
  pesca: { giu: a + 3.4, su: a + 4.1, preso: a + 4.4 }, via: a + 4.8,
  salta: k < 2 ? a + 4.8 : undefined, vagone: k < 2 ? a + 5.2 : undefined, sale: k < 2 ? a + 5.7 : undefined,
}));
const CO_FANALE = [31.0, 32.0];
const CO_FINE = [32.6, 33.0];
const CO_CAM = [
  { t: 4.8, cx: -300, cy: 740, z: 0.95 },
  { t: 10.6, cx: -300, cy: 740, z: 0.95 },
  { t: 12.4, cx: 740, cy: 846, z: 3.6 },
  { t: 30.6, cx: 740, cy: 846, z: 3.6 },
  { t: 31.2, cx: 200, cy: 800, z: 1.4 },
];
kit.scene('continua', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella, SE = K.seguito;
    const bigl = {};
    SE[0].passeggeri.forEach(p => { bigl[p.parola] = p.biglietto; });
    this.chi0 = S2.treno(SE[0]);
    const chi1 = this.chi0.concat([S2.chi({ parola: 'nuota', biglietto: bigl.nuota, tratti: SE[1].tratti })]);
    const punto = S2.trenoDa(SE[2].frase, SE[2].tratti).at(-1);
    const chi2 = chi1.slice(0, -1).concat([S2.chi({ parola: 'nuota', biglietto: bigl.nuota, tratti: [bigl.nuota] }), punto]);
    const chis = [this.chi0, chi1, chi2];
    const nuovi = [bigl.nuota, punto.biglietto];
    this.laps = SE.map((g, k) => G.giro7({ id: 'l' + k, chi: chis[k], vasca: g.vasca, seme: 231 + 2 * k, parola: g.pescata, nuovo: nuovi[k], fermo: G.fermoTreno(g.frase.length + 1), t: CO_LAPS[k] }));
    this.fermo = G.fermoTreno(18);
    this.sedili = this.chi0.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < this.chi0.length; i++) { scintille += '<g class="co-scint" opacity="0">'; for (let k = 0; k < 6; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="co-macchina"></g>' +
      '<g class="co-treno">' + G.treno(this.chi0.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      this.laps.map(g => g.treno).join('') + '<g class="co-nastro"></g>' + scintille + '<g class="co-ada"></g><g class="co-cu"></g>' + this.laps.map(g => g.mano).join('');
    const casa = '<g class="co-casa"><g class="co-casa-cam">' + G.salotto('<g class="co-tel"></g>') + '</g></g>';
    const fondo = '<rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/><circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>';
    const orologio = '<g class="co-orologio" opacity="0"><circle cx="1720" cy="250" r="190" fill="#141026" opacity=".7" filter="url(#g-soft)"/><g transform="translate(1720 270) scale(.95)"><g class="co-quadrante"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'continua', manopola: 0, banchina: true, morto: true, davanti: orologio + casa,
      html: G.sottotitolo('ADA', 'Risalgono tutti!') +
        G.sottotitolo('NARRATORE', 'Chi scrive chiede di continuare. E la chat intera risale sul treno, come sempre.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.laps.map(g => g.papere).join(''));
    this.laps.forEach(g => g.monta(this.m));
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.co-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass')); this.trenoEl = q('.co-treno');
    G.posaTreno(this.vag, this.m.partenza, 640 - this.fermo, null, M.passoBanchina);
    this.mac = q('.co-macchina'); this.nastroEl = q('.co-nastro'); this.scint = this.m.qa('.co-scint'); this.ada = q('.co-ada'); this.cu = q('.co-cu');
    this.casa = q('.co-casa'); this.casaCam = q('.co-casa-cam'); this.tel = q('.co-tel');
    this.orologio = q('.co-orologio'); this.quadrante = q('.co-quadrante');
    this.typ = kit.typist('continua', CO_SCRIVE, 4.2, 51);
    this.parole = SE[0].frase.map(w => w === 'storie' ? 'Storie' : w);
    this.linea = G.linea([[this.fermo - 30, 744], [600, 744]]);
    this.stati = {};
    this.sub = G.subs(kit, [[9.0, 11.4], [25.8, 32.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'continua', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CO_CAM, t));
    G.animaMondo(m, t + 2100);
    // Il salotto: si scrive «continua»; alla fine, la storia completa.
    const inSal = t < CO_SALOTTO[1] || t >= CO_FINE[0];
    this.casa.setAttribute('opacity', (t < CO_SALOTTO[1] ? 1 - seg(t, CO_SALOTTO[1] - 0.3, CO_SALOTTO[1]) : seg(t, CO_FINE[0], CO_FINE[1])).toFixed(3));
    if (inSal) {
      let chat, scritto = '', cursore = false, premuto = false;
      if (t < CO_SALOTTO[1]) {
        const inviato = t >= CO_INVIO + 0.15;
        chat = [['io', 'Al mare Emma'], ['ai', 'nuota e gioca e']].concat(inviato ? [['io', 'continua']] : []);
        scritto = inviato ? '' : this.typ.at(t); cursore = !inviato && Math.floor(t / 0.53) % 2 === 0; premuto = t > CO_INVIO - 0.05 && t < CO_INVIO + 0.3;
      } else chat = [['io', 'Al mare Emma'], ['ai', 'nuota e gioca e'], ['io', 'continua'], ['ai', 'nuota.']];
      this.cambia('tel', chat.length + scritto + cursore + premuto, this.tel, G.unico(G.telefono({ chat, scritto, cursore, premuto }), 'cotel'));
      const z = 1.08, [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')');
    }
    // La stazione: la striscia lunga si stende sopra i sedili; il custode rimette l'orologio a zero; risalgono tutti.
    const staz = t >= CO_SALOTTO[1] && t < CO_A[0];
    this.trenoEl.setAttribute('opacity', staz ? 1 : 0);
    let nastro = '';
    if (staz && t < CO_SALE[1]) {
      const A = this.linea.lung * eo(seg(t, CO_STRISCIA[0], CO_STRISCIA[1])), passo = this.linea.lung / this.parole.length;
      const via = seg(t, CO_SALE[0], CO_SALE[1]), b = this.linea.lung * (1 - via);
      nastro = G.nastro(this.linea, this.linea.lung - A, b, this.parole.map((w, i) => [w, (i + 0.5) * passo]), 15, { onda: s => 1.5 * Math.sin(s * 0.03 - t * 4) });
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    const lav = staz && t >= CO_SALE[0] && t < CO_SALE[1] ? 1 : 0, forbice = lav ? Math.round((0.6 - 0.6 * Math.pow(Math.abs(Math.sin(t * 9)), 4)) * 10) / 10 : 0.6;
    this.cambia('mac', forbice + '' + lav, this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca: lav * 0.8 }) + '</g>');
    const N = this.chi0.length;
    this.pass.forEach((p, i) => {
      const a = CO_SALE[0] + (N - 1 - i) * (CO_SALE[1] - CO_SALE[0]) / N, v = eo(seg(t, a, a + 0.4));
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, a, a + 0.9), sci = this.scint[i], [sx, sy] = this.sedili[i];
      sci.setAttribute('opacity', (staz && sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      if (sc > 0 && sc < 1) [...sci.children].forEach((c, n) => { const an = n * Math.PI / 3, d = 4 + 18 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(1)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(1)); });
    });
    // Il custode rimette l'orologio a zero (l'orologio, nell'angolo).
    const lz = 1 - eio(seg(t, CO_ZERO[0], CO_ZERO[1]));
    this.orologio.setAttribute('opacity', (staz ? seg(t, CO_ZERO[0] - 0.6, CO_ZERO[0] - 0.2) * (1 - seg(t, CO_ZERO[1] + 1.4, CO_ZERO[1] + 1.8)) : 0).toFixed(3));
    if (staz) this.cambia('q', lz.toFixed(2), this.quadrante, S2.orologio({ lancetta: lz }));
    this.cambia('cu', staz + '', this.cu, staz ? '<g transform="' + G.posaCustode(-40, 836) + '">' + G.unico(G.custode('orologio', 'serio', { occhi: 1, campanella: true }), 'cocu') + '</g>' : '<g transform="' + G.posaCustode(930, 936) + '">' + G.unico(G.custode('base', 'base', { occhi: -1 }), 'cocu2') + '</g>');
    // I tre giri, a montaggio.
    const quale = t < CO_A[1] - 0.2 ? 0 : t < CO_A[2] - 0.2 ? 1 : 2;
    let r = { giu: 0 };
    this.laps.forEach((g, k) => { const vivo = k === quale && t >= CO_A[0] - 0.1; const rr = g.render(vivo ? t : -100); if (!vivo) g.vag.forEach(v => v.setAttribute('opacity', 0)); else r = rr; });
    // Con la Fine il fanale si spegne.
    const fan = Math.round((1 - eio(seg(t, CO_FANALE[0], CO_FANALE[1]))) * 10) / 10;
    if (quale === 2 && String(fan) !== this.stati.fan) {
      const c = this.laps[2].vag[0], ch = this.chi0[0];
      c.querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: fan }, '<g class="g-pass">' + G.passeggero(ch.tipo, ch.biglietto, ch.o) + '</g>');
      this.stati.fan = String(fan);
    }
    // Ada.
    const T = CO_LAPS[quale], P = T.pesca;
    const pesca = t >= CO_A[0] && t >= P.giu - 0.7 && (t < P.preso + 0.7 || quale === 2);
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : staz ? 'felice' : 'base';
    const [ax, ay] = staz ? [600, 836] : [672, 896];
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0) + staz, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    this.sub(t);
  },
});
