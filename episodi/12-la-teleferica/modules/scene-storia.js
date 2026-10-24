const { seg, eo, eio, lerp } = kit;
// In un salotto, sul telefono, una storia cresce parola dopo parola sotto «Al mare Emma». Al luna park il treno gira,
// giro dopo giro. Poi, di colpo, la storia si ferma a metà frase: sul telefono resta mezza riga, e i tre puntini spariscono.
// Ada guarda la vasca, poi la pagina del quaderno: le paperelle che ha pescato quella notte. Cartello: «Fine».
// Si apre nel salotto; finisce sulla bancarella, col cartello.
const ST_PAROLE = [[1.0, 'nuota'], [2.6, 'nuota e'], [7.4, 'nuota e gioca'], [8.8, 'nuota e gioca e']];
const ST_FERMA = 10.0;
const ST_SALOTTO = [[0, 3.6], [6.6, 11.6]];
const ST_GIRA = [3.6, 6.6];
const ST_QUADERNO = [13.6, 14.1, 17.4, 17.9];
const ST_FINE = 18.2;
const ST_CAM = [
  { t: 3.6, cx: 300, cy: 560, z: 0.95 },
  { t: 6.6, cx: 640, cy: 470, z: 0.95 },
  { t: 11.6, cx: 712, cy: 860, z: 4.4 },
  { t: 13.4, cx: 712, cy: 860, z: 4.4 },
  { t: 18.0, cx: 712, cy: 860, z: 4.4 },
  { t: 19.2, cx: 740, cy: 790, z: 2.6 },
];
kit.scene('storia', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella;
    const g = K.giri[3];
    this.chi = S2.trenoDa(g.frase, g.tratti);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="st-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.uscita, o: c.o })), { sbarra: 1 }) + '</g><g class="st-ada"></g>';
    // Il quaderno di Ada: le paperelle pescate quella notte, una dopo l'altra (dal modellino). Nessuna è scura.
    const pescate = [K.giri[0].pescata, K.giri[1].pescata, K.giri[2].pescata, K.giri[3].pescata];
    const colori = pescate.map((w, k) => K.giri[k].vasca.find(v => v[0] === w)[2]);
    const papere = colori.map((c, k) => '<g transform="translate(' + (300 + k * 150) + ' ' + (480 + (k % 2) * 30) + ') scale(1.2)">' + G.paperella(c) + '</g>').join('') +
      '<path d="M280 640 L900 640" stroke="#3A3570" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>';
    const quaderno = '<g class="st-quad" opacity="0">' + G.quadernoAperto(papere, S2.vascaDisegnata(K.giri[3].vasca, 1350, 520, 1.1, 11, 18)) + '</g>';
    const salotto = '<g class="st-salotto"><g class="st-sal-cam">' + G.salotto('<g class="st-tel"></g>') + '</g></g>';
    const fine = '<g class="st-fine" opacity="0"><g transform="translate(960 300)"><g class="st-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'storia', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: salotto + quaderno + fine,
      html: G.sottotitolo('NARRATORE', 'Poi una notte una storia si ferma a metà frase.') +
        G.sottotitolo('ADA', 'Si è fermata… ma nessuno ha pescato la Fine!'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.st-treno .g-vag'); this.ada = q('.st-ada');
    this.salotto = q('.st-salotto'); this.salCam = q('.st-sal-cam'); this.tel = q('.st-tel');
    this.quad = q('.st-quad'); this.fine = q('.st-fine'); this.insegna = q('.st-insegna');
    this.stati = {};
    this.sub = G.subs(kit, [[6.8, 10.8], [13.8, 17.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'storia', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(ST_CAM, t));
    G.animaMondo(m, t + 1840);
    // Il treno gira sul viadotto e sparisce nella montagna, un giro dopo l'altro.
    const s = 2700 + ((t * 700) % 1900);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Il salotto: la storia cresce, poi si ferma a metà; i puntini spariscono.
    const inSal = ST_SALOTTO.some(([a, b]) => t >= a && t < b);
    this.salotto.setAttribute('opacity', inSal ? 1 : 0);
    if (inSal) {
      let testo = 'nuota';
      ST_PAROLE.forEach(([a, w]) => { if (t >= a) testo = w; });
      const puntini = t < ST_FERMA ? t : undefined, k = testo + (puntini !== undefined ? (Math.round(t * 30) / 30).toFixed(3) : '');
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Al mare Emma']].concat(t >= ST_PAROLE[0][0] ? [['ai', testo]] : []), puntini }), 'sttel'));
      const z = t < 6.6 ? lerp(1.0, 1.08, seg(t, 0, 3.6)) : lerp(1.1, 1.3, eio(seg(t, 6.6, 10.4))), [bx, by] = G.SALOTTO.bolla;
      this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    // Ada: guarda la vasca vuota, poi il quaderno.
    const [q0, q1, q2, q3] = ST_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    const espr = t < 13 ? 'pensa' : t < 17.6 ? 'sorpresa' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>');
    const f = eo(seg(t, ST_FINE, ST_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > ST_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
