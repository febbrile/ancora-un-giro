const { seg, eo, ei, eio, eob, lerp } = kit;
// Sopra la vasca la lanterna blu brilla; nell'acqua le paperelle blu sono solo due. Dalla vasca parte un brivido di luce:
// un'onda sottile, blu, che sale sulla rotaia del ponte, corre all'indietro lungo i binari e sparisce nella bocca della
// montagna. Dentro, il brivido attraversa il fascio di binari e ogni scambio, uno dopo l'altro, in tutti i tratti, si
// sposta di un capello verso il blu: clic, clic, clic. Nessuna leva, nessuna mano. Fuori, i passeggeri si spengono come
// scintille, la lanterna si spegne e le paperelle scivolano via dallo scarico: il treno grigio resta in stazione, vuoto.
// Si apre come finisce «dritta»; finisce sul treno vuoto e sulla vasca vuota (lo riprende «notti»).
const BR_CAM = [
  { t: 0, cx: 520, cy: 820, z: 2.4 },
  { t: 0.8, cx: 520, cy: 820, z: 2.4 },
  { t: 3.0, cx: 780, cy: 858, z: 4.6 },
  { t: 5.6, cx: 780, cy: 858, z: 4.6 },
  { t: 8.4, cx: 900, cy: 822, z: 3.6 },
  { t: 21.6, cx: 560, cy: 820, z: 2.4, da: 21.59 },
  { t: 31.4, cx: 580, cy: 812, z: 2.3 },
];
const BR_POCHE = [1.4, 5.2];
// Il brivido fuori: l'acqua trema, l'onda sale sulla rotaia e corre fino alla bocca della montagna.
const BR_TREMA = [4.6, 6.2], BR_SALE = [5.2, 5.8], BR_CORRE = [5.8, 8.4];
const BR_ONDA = 'M 772 796 L 846 796 C 888 796 910 818 962 818 L 996 818';
// Dentro: quando si vede; dove corre l'onda e dove va la camera (in pixel lungo il fascio, all'indietro).
const BR_DENTRO = [8.4, 9.2, 21.0, 21.6];
const BR_ONDA_VEL = [[9.4, 800], [10.4, 420], [19.4, 420], [20.4, 700]];
const BR_CAM_VEL = [[10.4, 0], [11.4, 420], [19.4, 420], [20.0, 0]];
// Lungo il fascio, all'indietro: l'ultima finestra, gli scambi del terzo tratto, e così via fino al primo.
const BR_FINESTRE = [800, 2000, 3200];
const BR_SCAMBI = [[1300, 1420, 1540], [2500, 2620, 2740], [3700, 3820, 3940]];
// Fuori di nuovo: i passeggeri si spengono, la lanterna si spegne, le paperelle scivolano via.
const BR_SPENTI = [22.4, 23.0, 23.6], BR_LANTERNA = [24.6, 25.8], BR_VIA = 25.6;
const BR_LANT = [772, 834], BR_FERMO = 831;
kit.scene('brivido', {
  init(kit) {
    const G = window.G, M = G.MONDO, I = G.INTERNO, C = G.C, P = G.MOD.mare.passeggeri, D = G.MOD.addestramento.momenti[0];
    this.D = D; this.blu = G.MOD.mare.nuovo.nuota;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', D.tratti[2]]];
    this.lista = G.papereVasca(D.vasca, 41);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="br-pap" data-i="' + i + '">' + (this.lista[i].parola === 'nuota' ? '<ellipse class="br-alone" cx="0" cy="-8" rx="70" ry="52" fill="' + this.blu + '" opacity="0" filter="url(#g-soft)"/>' : '') +
      '<g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    let scintille = '';
    for (let i = 0; i < 3; i++) { scintille += '<g class="br-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const onda = '<path class="br-onda" d="' + BR_ONDA + '" stroke="' + this.blu + '" stroke-width="7" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>' +
      '<path class="br-onda" d="' + BR_ONDA + '" stroke="#E6F0FF" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0"/>' +
      '<path class="br-sale" d="M 772 870 L 772 798" stroke="' + this.blu + '" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>';
    const anelli = [0, 1, 2].map(k => '<ellipse class="br-anello" cx="772" cy="880" rx="10" ry="2" fill="none" stroke="' + this.blu + '" stroke-width="2" opacity="0"/>').join('');
    const sopra = '<g class="br-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { grigio: true, fanale: 1, sbarra: 1 }) + '</g>' + scintille +
      '<g class="br-lanterna" transform="translate(' + BR_LANT[0] + ' ' + BR_LANT[1] + ') scale(.4)"><g class="br-lant-in"></g></g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' + anelli + onda;
    // Dentro la montagna, senza treno: il fascio di binari, le finestre (l'acqua vuota), gli scambi dritti.
    const yc = I.corsie[2];
    let roba = BR_FINESTRE.map((x, k) => '<g transform="translate(' + (x - 180 * 1.6) + ' 36) scale(1.6)">' + G.finestra('br' + k) + '</g>').join('');
    BR_SCAMBI.forEach((tr, n) => tr.forEach((x, i) => { roba += '<g class="br-scambio" data-x="' + x + '" transform="translate(' + (x - 150) + ' 0)">' + G.scambio(yc, yc, 0) + '</g>'; }));
    const banda = '<g class="br-banda" opacity="0"><ellipse cx="0" cy="800" rx="70" ry="170" fill="' + this.blu + '" opacity=".75" filter="url(#g-velo)"/><ellipse cx="0" cy="800" rx="16" ry="120" fill="#BFD6FF" opacity=".45" filter="url(#g-soft)"/>' +
      I.corsie.map(y => '<path d="M-160 ' + y + ' L30 ' + y + '" stroke="' + this.blu + '" stroke-width="9" stroke-linecap="round" filter="url(#g-glow)"/><path d="M-70 ' + y + ' L30 ' + y + '" stroke="#E6F0FF" stroke-width="3" stroke-linecap="round"/>').join('') + '</g>';
    const dentro = '<g class="br-dentro" opacity="0">' + G.interniDefs + '<g transform="' + G.cam(900, 690, 1.5) + '">' + G.interno([], { corsie: I.corsie }) +
      '<g class="br-roba">' + roba + '</g>' + banda + '</g></g>' +
      '<rect class="br-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'brivido', morto: true, spento: 1, banchina: true, davanti: dentro,
      html: G.sottotitolo('NARRATORE', 'Le paperelle blu erano poche. E allora, dalla vasca, partiva un brivido.') +
        G.sottotitolo('NARRATORE', 'Correva all’indietro lungo i binari, dentro la montagna, e piegava la pista un pochino verso il blu.') +
        G.sottotitolo('NARRATORE', 'Nessuno toccava la pista. E della frase non restava niente: solo la pista, un pochino piegata.'),
    });
    const m = this.m;
    m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.treno = m.qa('.br-treno .g-vag'); this.pass = this.treno.map(v => v.querySelector('.g-pass'));
    G.posaTreno(this.treno, m.arrivo, BR_FERMO, M.scala, M.passoBanchina);
    const svg = m.cam.ownerSVGElement, base = m.cam.getCTM().inverse();
    this.sedili = this.treno.map(el => { const pt = svg.createSVGPoint(); pt.x = 138; pt.y = 20; const w = pt.matrixTransform(base.multiply(el.querySelector('.g-vag-in').getCTM())); return [w.x, w.y]; });
    this.scint = m.qa('.br-scint');
    this.lant = m.q('.br-lanterna'); this.lantIn = m.q('.br-lant-in'); this.statoLant = '';
    this.pap = m.qa('.br-pap').map(el => ({ el, i: +el.dataset.i, alone: el.querySelector('.br-alone') }));
    this.onde = m.qa('.br-onda'); this.lOnda = this.onde[0].getTotalLength();
    this.sale = m.q('.br-sale'); this.anelli = m.qa('.br-anello');
    this.dentro = m.q('.br-dentro'); this.nero = m.q('.br-nero'); this.roba = m.q('.br-roba'); this.banda = m.q('.br-banda');
    this.dentro.querySelector('.g-int-fanale').setAttribute('opacity', 0);
    this.scambi = [...this.dentro.querySelectorAll('.br-scambio')].map(g => ({ g, x: +g.dataset.x, ago: g.querySelector('.g-ago'), disco: g.querySelector('.g-disco') }));
    // Di quanto si sposta ogni scambio: un capello, quanto si piega la pista in una notte.
    this.capello = 140 * D.piega_notte;
    this.sub = G.subs(kit, [[0.6, 7.0], [10.0, 19.0], [22.6, 30.9]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'brivido', t);
    const G = this.G, I = G.INTERNO, m = this.m, D = this.D;
    m.cam.setAttribute('transform', G.camChiavi(BR_CAM, t));
    // La lanterna brilla, poi si spegne.
    const spegne = eio(seg(t, BR_LANTERNA[0], BR_LANTERNA[1]));
    const luce = Math.round((0.9 + 0.1 * Math.sin(t * 3) + 0.15 * Math.sin(Math.PI * seg(t, BR_POCHE[0], BR_POCHE[1]))) * (1 - spegne) * 30) / 30;
    if (String(luce) !== this.statoLant) { this.lantIn.innerHTML = '<g transform="translate(-60 -30)">' + G.lanternaAccesa('nuota', this.blu, Math.min(1, luce)) + '</g>'; this.statoLant = String(luce); }
    this.lant.setAttribute('opacity', (1 - seg(t, BR_LANTERNA[1] - 0.3, BR_LANTERNA[1] + 0.3)).toFixed(3));
    // Le paperelle: le due blu si accendono un poco; poi tutte scivolano via dallo scarico.
    const poche = Math.sin(Math.PI * seg(t, BR_POCHE[0], BR_POCHE[1]));
    this.pap.forEach(({ el, i, alone }) => {
      const p = this.lista[i], via = eio(seg(t, BR_VIA + (i % 7) * 0.12, BR_VIA + 1.6 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), salto = alone ? 3 * poche * Math.abs(Math.sin(t * 5)) : 0;
      const y = lerp(p.y + 1.2 * Math.sin(t * 2.2 + i) - salto, 884, via);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', (1 - seg(via, 0.85, 1)).toFixed(3));
      if (alone) alone.setAttribute('opacity', (0.8 * poche).toFixed(3));
    });
    // Il brivido fuori: l'acqua trema, l'onda sale sulla rotaia e corre all'indietro fino alla montagna.
    const forza = D.brivido;
    this.anelli.forEach((el, k) => {
      const u = seg(t, BR_TREMA[0] + k * 0.35, BR_TREMA[0] + k * 0.35 + 1.0);
      el.setAttribute('rx', (10 + 80 * eo(u)).toFixed(1)); el.setAttribute('ry', (2 + 10 * eo(u)).toFixed(1));
      el.setAttribute('opacity', (u > 0 && u < 1 ? forza * (1 - u) : 0).toFixed(3));
    });
    G.onda(this.sale, 72, eio(seg(t, BR_SALE[0], BR_SALE[1])), 40);
    this.sale.setAttribute('opacity', (t > BR_SALE[0] && t < BR_SALE[1] + 0.1 ? forza : 0).toFixed(3));
    this.onde.forEach(el => {
      G.onda(el, this.lOnda, ei(seg(t, BR_CORRE[0], BR_CORRE[1])) * 0.6 + 0.4 * seg(t, BR_CORRE[0], BR_CORRE[1]), 80);
      el.setAttribute('opacity', (t > BR_CORRE[0] && t < BR_CORRE[1] ? forza : 0).toFixed(3));
    });
    // I passeggeri si spengono come scintille: della frase non resta niente.
    this.pass.forEach((p, i) => {
      const a = BR_SPENTI[i], u = seg(t, a, a + 0.5);
      p.setAttribute('opacity', (1 - u).toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(1, 0.6, u).toFixed(3) + ') translate(-140 -40)');
      const sp = seg(t, a, a + 1.2), [qx, qy] = this.sedili[i];
      this.scint[i].setAttribute('opacity', (sp > 0 && sp < 1 ? 1 - sp : 0).toFixed(3));
      [...this.scint[i].children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 4 + 24 * eo(sp); c.setAttribute('cx', (qx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (qy - 8 * eo(sp) + d * Math.sin(an)).toFixed(2)); });
    });
    // Dentro la montagna.
    const [a0, a1, b0, b1] = BR_DENTRO;
    this.nero.setAttribute('opacity', Math.max(seg(t, a0, a1) * (1 - seg(t, a1, a1 + 0.6)), seg(t, b0, b1) * (1 - seg(t, b1, b1 + 0.5))).toFixed(3));
    this.dentro.setAttribute('opacity', t >= a1 && t < b1 ? 1 : 0);
    if (t >= a1 && t < b1) {
      const xo = G.percorso(t, -200, BR_ONDA_VEL), dd = G.percorso(t, 0, BR_CAM_VEL);
      G.scorriInterno(kit, -dd);
      this.roba.setAttribute('transform', 'translate(' + (-dd).toFixed(1) + ' 0)');
      this.banda.setAttribute('transform', 'translate(' + (xo - dd).toFixed(1) + ' 0)');
      this.banda.setAttribute('opacity', (D.brivido * (1 - seg(t, 20.4, 21.0))).toFixed(3));
      // Ogni scambio, quando passa l'onda: clic, si sposta di un capello verso il blu.
      this.scambi.forEach(s => {
        const ts = seg(xo, s.x - 150, s.x - 40), u = eob(ts, 1.7);
        const y = I.corsie[2] - this.capello * u;
        s.ago.setAttribute('d', 'M0 ' + y.toFixed(2) + ' C60 ' + y.toFixed(2) + ' 80 ' + I.corsie[2] + ' 160 ' + I.corsie[2]);
        s.ago.setAttribute('stroke', G.mix(G.C.acciaio, this.blu, 0.35 * ts + 0.5 * Math.sin(Math.PI * ts)));
        s.disco.setAttribute('transform', 'rotate(' + (14 * u).toFixed(2) + ' 0 -40)');
      });
    }
    this.sub(t);
  },
});
