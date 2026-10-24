const { seg, eo, eio, lerp } = kit;
// Arriva una striscia: «Al mare Emma». Il Bruco: verde. Alla stazione il custode ha attaccato la frase del parco, con la
// bandierina turchese, e le bandierine; il treno parte, e lui fa scattare l'orologio. Dentro la montagna, il giro di
// sempre: dalla bandierina d'ottone i fili più forti vanno ai due Mare, e la stoffa si fa azzurra; clac, clac, clac; la
// finestra sull'acqua, tre volte, e le paperelle di luce si fanno blu. Il treno esce sopra la vasca: tantissime blu. Ada
// pesca una blu, e la lancetta dell'orologio scatta di una tacca.
// Si apre sul Bruco; finisce sull'orologio, con la lancetta alla prima tacca (la riprende «giri»).
const PR_BRUCO = { sale: 0.3, passo: 0.25, parte: 1.0, giro: 2.4 };
const PR_STAZIONE = [3.8, 9.0], PR_SBARRE = [4.6, 5.2], PR_PARTE = 5.2, PR_SCATTA = 5.4;
const PR_VEL = [[PR_PARTE, 0], [6.2, 220], [7.6, 700]];
const PR_DENTRO = [9.0, 29.0];
const PR_ESCE = { esce: 29.2, vel: [[29.2, 360], [30.8, 360], [31.3, 60], [33.4, 60], [34.0, 260]], pesca: { giu: 33.8, su: 34.6, preso: 35.0 }, via: 35.4, salta: 35.4, vagone: 36.0, sale: 36.6 };
const PR_OROLOGIO = [37.2, 37.6], PR_TACCA = 39.0;
const PR_CU = [436, 836];
const PR_CAM = [
  { t: 0, cx: 1250, cy: 990, z: 3.0 },
  { t: 3.79, cx: 1250, cy: 990, z: 3.0 },
  { t: 3.8, cx: 300, cy: 790, z: 2.4 },
  { t: 5.4, cx: 300, cy: 790, z: 2.4 },
  { t: 9.0, cx: 200, cy: 600, z: 1.1 },
  { t: 29.0, cx: 740, cy: 846, z: 3.6 },
];
kit.scene('primo', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella, F = G.MOD.seconda.bruco.frasi.mare, g0 = K.giri[0];
    this.chi = S2.treno(g0);
    const U = this.chi.length - 1;
    // Dentro la montagna (si monta per primo: il mondo, coi sottotitoli, ci sta sopra).
    this.dentro = S2.dentro(kit, { pre: 'pr-dentro', chi: this.chi, dopoFili: g0.ottone.dopo_fili, fili: j => j === U ? 0.05 : g0.ottone.fili[j],
      finestre: g0.finestre, seme: 211, t0: PR_DENTRO[0], scala: (PR_DENTRO[1] - PR_DENTRO[0]) / 40, testa: true });
    this.dentro.div.style.opacity = 0;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.bruco = S2.giroBruco({ id: 'prb', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 73, mano: [1120, 960], t: PR_BRUCO });
    this.esce = G.giro7({ id: 'pr', chi: this.chi, vasca: g0.vasca, seme: 213, parola: 'nuota', nuovo: G.MOD.finisce.passeggeri.nuota.biglietto, fermo: G.fermoTreno(11), t: PR_ESCE });
    this.fermo = G.fermoTreno(11);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pr-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' + this.esce.treno +
      gio.dietro + this.bruco.bruco + gio.davanti + '<g class="pr-cu"></g><g class="pr-ada"></g>' + this.esce.mano;
    const fondo = '<rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/><circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>';
    const orologio = '<g class="pr-orologio" opacity="0">' + fondo + '<g transform="translate(960 600) scale(2.6)"><g class="pr-quadrante"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'primo', manopola: 0, banchina: true, morto: true, davanti: orologio,
      html: G.sottotitolo('NARRATORE', 'Il primo giro è quello di sempre: fili di luce, scambi, finestre.') +
        G.sottotitolo('NARRATORE', 'E a ogni giro, sull’orologio del custode, la lancetta scatta di una tacca.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.esce.papere);
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.bruco.papere);
    this.esce.monta(this.m); this.bruco.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.mondoDiv = this.m.cam.closest('.ground'); this.mondoDiv.style.background = 'transparent';
    this.mondoSvg = this.mondoDiv.querySelector('svg');
    this.vag = this.m.qa('.pr-treno .g-vag');
    this.cu = q('.pr-cu'); this.ada = q('.pr-ada'); this.orologio = q('.pr-orologio'); this.quadrante = q('.pr-quadrante');
    this.stati = {};
    this.sub = G.subs(kit, [[12.0, 19.6], [37.4, 43.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'primo', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m;
    // Dentro o fuori.
    const dentro = t >= PR_DENTRO[0] - 0.4 && t < PR_DENTRO[1];
    const nero = Math.max(seg(t, PR_DENTRO[0] - 0.8, PR_DENTRO[0] - 0.2), 0);
    this.dentro.div.style.opacity = dentro ? 1 : 0;
    this.mondoSvg.style.opacity = dentro ? 0 : (t < PR_DENTRO[0] ? 1 - nero : 1);
    if (dentro) this.dentro.render(t);
    m.cam.setAttribute('transform', G.camChiavi(PR_CAM, t));
    G.animaMondo(m, t + 1990);
    this.bruco.render(t);
    // Il treno fermo in stazione: le sbarre, la partenza.
    const staz = t >= PR_STAZIONE[0] && t < PR_STAZIONE[1];
    const sp = G.percorso(t, 640 - this.fermo, PR_VEL), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - this.fermo, 640 - this.fermo + 150));
    G.posaTreno(this.vag, m.partenza, sp, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true, passo });
    G.sbarre(this.vag, i => eio(seg(t, PR_SBARRE[0] + i * 0.04, PR_SBARRE[1] + i * 0.04)));
    this.vag.forEach(v => { if (!staz) v.setAttribute('opacity', 0); });
    const r = this.esce.render(t >= PR_ESCE.esce - 0.1 ? t : -100);
    if (t < PR_ESCE.esce - 0.1) this.esce.vag.forEach(v => v.setAttribute('opacity', 0));
    // Il custode, in stazione, fa scattare l'orologio; poi, alla vasca, guarda.
    const cuOn = staz || t >= PR_ESCE.esce;
    const posa = staz && t >= PR_SCATTA - 0.6 ? 'orologio' : 'base', cx = staz ? PR_CU[0] : 930, cy = staz ? PR_CU[1] : 936;
    this.cambia('cu', cuOn + posa, this.cu, cuOn ? '<g transform="' + G.posaCustode(cx, cy) + '">' + G.unico(G.custode(posa, 'serio', { occhi: -1, campanella: true }), 'prcu') + '</g>' : '');
    // Ada: al Bruco; in stazione; poi pesca.
    let ax = 1100, ay = 1040, posaA = 'base', espr = 'felice', giu = 0;
    if (t >= PR_STAZIONE[0]) { ax = 672; ay = 896; posaA = 'quaderno'; espr = 'base'; }
    const P = PR_ESCE.pesca;
    if (t >= P.giu - 0.8 && t < P.preso + 0.8) { posaA = 'pesca'; espr = t < P.preso + 0.1 ? 'chiusi' : 'sorpresa'; giu = r.giu; }
    this.cambia('ada', posaA + espr + giu + ax, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(posaA, espr, { giu }) + '</g>');
    // L'orologio, da vicino: la lancetta scatta di una tacca.
    this.orologio.setAttribute('opacity', seg(t, PR_OROLOGIO[0], PR_OROLOGIO[1]).toFixed(3));
    if (t > PR_OROLOGIO[0]) {
      const l = Math.round(0.25 * Math.min(1, eo(seg(t, PR_TACCA, PR_TACCA + 0.12)) + 0.15 * Math.sin(Math.PI * seg(t, PR_TACCA + 0.12, PR_TACCA + 0.3))) * 100) / 100;
      this.cambia('q', l, this.quadrante, S2.orologio({ lancetta: l }));
    }
    this.sub(t);
  },
});
