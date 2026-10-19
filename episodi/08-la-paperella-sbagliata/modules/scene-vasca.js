const { seg, eo, ei, eio, lerp } = kit;
// Fuori, alla bancarella. Ada, seduta accanto alla vasca, fissa la bocca della montagna con la matita pronta. Il treno
// esce proprio sopra la vasca: passano i primi cinque vagoni, e non succede niente. Passa l'ultimo: Chiama è color
// caramello. Sotto di lei cadono le paperelle, di luce come nella finestra, e toccano l'acqua vere: caramello, miele,
// nocciola, sei colori vicini, nessuno più numeroso. Ada lascia cadere la matita. Il treno scivola in stazione e si
// ferma lungo la banchina: i vestiti tornano piano del colore dei biglietti.
// Si apre dalla luce dell'uscita; finisce sulla stazione e la vasca piena (la riprende «pesca»).
const VS_CAM = [
  { t: 0, cx: 810, cy: 846, z: 3.0 },
  { t: 2.6, cx: 810, cy: 846, z: 3.0 },
  { t: 5.2, cx: 772, cy: 862, z: 4.2 },
  { t: 9.6, cx: 772, cy: 862, z: 4.2 },
  { t: 10.6, cx: 716, cy: 866, z: 5.2 },
  { t: 13.2, cx: 716, cy: 866, z: 5.2 },
  { t: 15.4, cx: 560, cy: 832, z: 2.4 },
];
const VS_ESCE = 1.0;
const VS_VEL = [[VS_ESCE, 120], [4.0, 90], [6.0, 50], [9.0, 50], [10.5, 90], [13.1, 0]];
const VS_ADA = [672, 896];
const VS_MATITA = 9.8;
kit.scene('vasca', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.cane, P = D.passeggeri;
    const forme = { Il: 0, di: 1, si: 2 };
    this.parole = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
    this.tipi = this.parole.map(w => w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso');
    this.opz = this.parole.map(w => w in forme ? { forma: forme[w] } : {});
    this.P = P;
    this.lista = G.papereVasca(D.vasca, 48);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="vs-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="vs-vera">' + G.paperella(this.lista[i].col) + '</g><g class="vs-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const treno = this.parole.map((w, i) => ({ tipo: this.tipi[i], col: P[w].tratti[2], o: this.opz[i] }));
    const matita = '<g class="vs-matita" opacity="0"><rect x="-3" y="-17" width="6" height="34" rx="2" fill="' + G.C.oro + '"/><path d="M-3 17 L0 23 L3 17 Z" fill="#3A2418"/><rect x="-3" y="-19" width="6" height="5" rx="2" fill="#E58FA0"/></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      G.treniDormono() + '<g class="vs-treno">' + G.treno(treno, { sbarra: 1 }) + '</g><g class="vs-ada"></g>' + matita;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vasca', morto: true, banchina: true, manopola: 0,
      davanti: '<defs><radialGradient id="g-vs-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="vs-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-vs-luce)"/>',
      html: G.sottotitolo('ADA', 'Si è riempita lo stesso!') +
        G.sottotitolo('NARRATORE', 'La vasca si riempie sempre. Non resta vuota nemmeno questa volta.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.vs-treno .g-vag'); this.ada = this.m.q('.vs-ada'); this.uscita = this.m.q('.vs-uscita'); this.matita = this.m.q('.vs-matita');
    this.pap = this.m.qa('.vs-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.vs-vera'), luce: el.querySelector('.vs-dilu') }));
    // Il treno si ferma con il primo vagone a MONDO.fermo, i vagoni attaccati lungo la banchina.
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, VS_VEL));
    this.sAt = sAt;
    // Ogni paperella cade quando l'ultimo vagone, Chiama, le passa sopra.
    this.cade = this.lista.map(p => {
      for (let t = VS_ESCE; t < 20; t += 0.02) { const se = sAt(t) - 5 * M.passoBanchina; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 9;
    });
    this.stato = this.vag.map(() => ''); this.statoAda = '';
    this.sub = G.subs(kit, [[10.4, 13.0], [14.0, 19.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'vasca', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VS_CAM, t));
    G.animaMondo(m, t + 1120);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    // Il treno esce dalla montagna, passa sopra la vasca, scivola in stazione e si ferma.
    const s = t < VS_ESCE ? -600 : this.sAt(t);
    G.posaTreno(this.vag, m.arrivo, s, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.vag, m.arrivo, s, { inizio: true, passo: M.passoBanchina });
    const torna = Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
    this.vag.forEach((v, i) => {
      const w = this.parole[i], o = Object.assign({}, this.opz[i]);
      if (i === 1) o.coda = Math.round((8 + 12 * Math.sin(t * 6)) / 4) * 4;
      G.cambiaPasseggero(v, this.tipi[i], G.mix(this.P[w].tratti[2], this.P[w].biglietto, torna), o);
    });
    // Le paperelle cadono dove passa l'ultimo vagone: di luce, e vere quando toccano l'acqua.
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const y = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    // Ada, seduta: guarda la bocca della montagna, sicura, con la matita pronta; poi la vasca si riempie e la matita cade.
    const posa = t < VS_MATITA ? 'disegna' : 'quaderno';
    const espr = t < 7.0 ? 'felice' : t < 10.2 ? 'sorpresa' : t < 13.4 ? 'sorpresa' : 'pensa';
    const ang = Math.round((t < 6.4 ? 7 : lerp(7, -4, eio(seg(t, 6.4, 7.2)))) * 2) / 2;
    const ka = posa + espr + ang;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(VS_ADA[0], VS_ADA[1]) + '">' + G.adaSeduta(posa, espr, { testa: ang, matita: -20 }) + '</g>'; this.statoAda = ka; }
    // La matita cade dalla mano, rimbalza e resta per terra.
    const c = seg(t, VS_MATITA, VS_MATITA + 0.6), r = seg(t, VS_MATITA + 0.6, VS_MATITA + 0.9);
    const mx = lerp(679, 690, c) + 4 * r, my = lerp(877, 906, ei(c)) - 5 * Math.sin(Math.PI * r);
    this.matita.setAttribute('opacity', t < VS_MATITA ? 0 : 1);
    this.matita.setAttribute('transform', 'translate(' + mx.toFixed(2) + ' ' + my.toFixed(2) + ') rotate(' + (10 + 250 * c + 20 * r).toFixed(1) + ') scale(.28)');
    // Fermo in stazione, le sbarre dei vagoni si alzano.
    G.sbarre(this.vag, i => 1 - eio(seg(t, 13.6 + i * 0.1, 14.4 + i * 0.1)));
    this.sub(t);
  },
});
