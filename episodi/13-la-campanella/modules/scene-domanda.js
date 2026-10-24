const { seg, eo, eio, lerp } = kit;
// Il salotto con la lampada calda. Sul telefono, sotto «Al mare Emma», la storia arrivata l'altra notte: «nuota e gioca e»,
// e poi niente. Niente puntini. La persona aspetta, scuote il telefono, sbuffa (il telefono si abbassa). Al luna park, Ada
// sfoglia il quaderno: ha disegnato le paperelle pescate quella notte, una dopo l'altra, una blu, una rosa, una turchese,
// un'altra rosa. Nessuna è scura. Titolo: «La campanella».
// Si apre nel salotto; finisce alla bancarella, col titolo (la riprende «guardiola»).
const DM_SALOTTO = [0, 7.0], DM_SCUOTE = [2.6, 3.8], DM_SBUFFA = [4.6, 5.6];
const DM_QUADERNO = [8.4, 8.9, 15.2, 15.7];
const DM_TITOLO = 18.8;
const DM_CAM = [
  { t: 7.0, cx: 712, cy: 860, z: 4.4 },
  { t: 18.2, cx: 712, cy: 860, z: 4.4 },
  { t: 19.6, cx: 740, cy: 790, z: 2.6 },
];
kit.scene('domanda', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella;
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-treno">' + G.treno(Array.from({ length: 10 }, () => ({})), { sbarra: 0 }) + '</g><g class="dm-ada"></g>';
    // Il quaderno: le paperelle pescate quella notte (dal modellino), e la vasca dell'ultimo giro. Nessuna è scura.
    const colori = K.giri.map(g => g.vasca.find(v => v[0] === g.pescata)[2]);
    const papere = colori.map((c, k) => '<g class="dm-pap" opacity="0" transform="translate(' + (300 + k * 150) + ' ' + (480 + (k % 2) * 30) + ') scale(1.2)">' + G.paperella(c) + '</g>').join('') +
      '<path d="M280 640 L900 640" stroke="#3A3570" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>';
    const quaderno = '<g class="dm-quad" opacity="0">' + G.quadernoAperto(papere, S2.vascaDisegnata(K.giri[3].vasca, 1350, 520, 1.1, 11, 18)) + '</g>';
    const salotto = '<g class="dm-salotto"><g class="dm-sal-cam">' + G.salotto(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', 'nuota e gioca e']] })) + '</g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 290)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: salotto + quaderno + titolo,
      html: G.sottotitolo('NARRATORE', 'La storia dell’altra notte si è fermata a metà frase. E Ada, quella notte, la paperella scura non l’ha pescata.') +
        G.sottotitolo('ADA', 'Allora chi l’ha fermata?'),
    });
    this.G = G;
    const q = this.m.q;
    G.posaTreno(this.m.qa('.dm-treno .g-vag'), this.m.partenza, 640 - G.fermoTreno(11), null, M.passoBanchina);
    this.ada = q('.dm-ada'); this.salotto = q('.dm-salotto'); this.salCam = q('.dm-sal-cam');
    this.quad = q('.dm-quad'); this.pap = this.m.qa('.dm-pap'); this.titolo = q('.dm-titolo'); this.insegna = q('.dm-insegna');
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 10.4], [15.8, 18.4]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 1900);
    // Il salotto: il telefono fermo; poi scosso; poi si abbassa (uno sbuffo).
    this.salotto.setAttribute('opacity', t < DM_SALOTTO[1] ? 1 : 0);
    if (t < DM_SALOTTO[1]) {
      const z = lerp(1.0, 1.12, eio(seg(t, 0, 7))), [bx, by] = G.SALOTTO.bolla;
      const no = 6 * Math.sin((t - DM_SCUOTE[0]) * 18) * Math.sin(Math.PI * seg(t, DM_SCUOTE[0], DM_SCUOTE[1]));
      const giu = 40 * Math.sin(Math.PI * seg(t, DM_SBUFFA[0], DM_SBUFFA[1]));
      this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z + giu).toFixed(2) + ') scale(' + z.toFixed(4) + ') rotate(' + no.toFixed(2) + ' 950 560)');
    }
    // Il quaderno: le paperelle compaiono una dopo l'altra, come Ada le ha disegnate.
    const [q0, q1, q2, q3] = DM_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    this.pap.forEach((p, k) => p.setAttribute('opacity', eo(seg(t, q1 + 0.4 + k * 0.9, q1 + 0.8 + k * 0.9)).toFixed(3)));
    const espr = t < 15.6 ? 'base' : 'pensa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>');
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > DM_TITOLO - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('La campanella', 1040, 230, +turno));
    this.sub(t);
  },
});
