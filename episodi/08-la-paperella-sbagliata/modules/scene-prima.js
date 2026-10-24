const { seg, eo, ei, eio, lerp } = kit;
// Ada guarda i treni grigi sul binario morto. Torniamo indietro, come l'altra volta: Ada non c'era, lo vediamo solo noi.
// Sbiadito come una vecchia fotografia, prima che il parco aprisse: il parco è spento, i treni di prova girano di notte,
// uno dopo l'altro, con il fanale acceso; dal cielo scendono strisce scritte fitte, che non si leggono. Dentro i treni
// tanti cani: con Mare, con Parco. Ogni volta che un treno esce sopra la vasca dopo «si chiama», sopra l'acqua resta
// acceso un biglietto, ogni volta di un colore caldo diverso (caramello, miele, nocciola), e un brivido corre all'indietro
// nella montagna: la pista si piega di un capello. Nessun treno porta Emma. Di nuovo oggi: Ada guarda la vasca vuota.
// Si apre come finisce «frase»; finisce con uno stacco su quello che guarda Ada, la vasca vuota laggiù (la riprende
// «biglietti»).
const PR_ADA = [-1463, 835];
const PR_OGGI_CAM = [
  { t: 0, cx: -1478, cy: 795, z: 4.4 },
  { t: 3.4, cx: -1668, cy: 800, z: 5.2 },
  { t: 20.6, cx: -1668, cy: 800, z: 5.2 },
  { t: 20.61, cx: -1438, cy: 800, z: 3.4, da: 20.6 },
  { t: 23.6, cx: -1438, cy: 800, z: 3.4, da: 23.59 },
  { t: 23.61, cx: 800, cy: 846, z: 3.0, da: 23.6 },
  { t: 27.0, cx: 772, cy: 852, z: 3.4 },
];
const PR_IERI_CAM = [
  { t: 2.6, cx: 760, cy: 560, z: 1.12 },
  { t: 7.4, cx: 700, cy: 600, z: 1.2 },
  { t: 9.6, cx: 900, cy: 812, z: 2.6 },
  { t: 20.8, cx: 880, cy: 822, z: 2.8 },
];
const PR_IERI = [2.6, 3.8, 20.4, 21.6];
// I treni di prova: quando escono dalla montagna (sul percorso d'arrivo) e chi portano. Il biglietto acceso sopra la
// vasca è un nome da cane del modellino: caramello (Briciola), miele (Pallino), nocciola (Fido).
const PR_TRENI = [
  { esce: 6.8, chi: ['Il', 'cane', 'mare', 'si', 'chiama'], nome: 'Briciola' },
  { esce: 10.8, chi: ['Il', 'cane', 'parco', 'si', 'chiama'], nome: 'Pallino' },
  { esce: 14.8, chi: ['Il', 'cane', 'si', 'chiama'], nome: 'Fido' },
];
const PR_V = 118;
// Un treno di prova che corre sul viadotto verso la montagna, nella prima inquadratura (il viadotto parte da s 2448).
const PR_SALE = { s0: 3720, v: 70, chi: ['Il', 'cane', 'si', 'chiama'] };
const PR_STRISCE = 7;
const PR_LANTERNA = [772, 842];
kit.scene('prima', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, P = G.MOD.cane.passeggeri;
    // Chi siede nei treni di prova: col colore del biglietto (la pista è ancora quasi dritta).
    const forme = { Il: 0, si: 2 };
    const pass = w => w === 'mare' ? { tipo: 'mare', col: G.MOD.mare.passeggeri.mare.biglietto } :
      w === 'parco' ? { tipo: 'parco', col: G.MOD.parco.passeggeri.parco.biglietto } :
      w === 'cane' ? { tipo: 'cane', col: P.cane.biglietto, o: { coda: 10 } } :
      w === 'chiama' ? { tipo: 'chiama', col: P.chiama.biglietto } : { tipo: 'sasso', col: P[w].biglietto, o: { forma: forme[w] } };
    this.nomi = PR_TRENI.map(tr => G.MOD.cane.vasca.find(v => v[0] === tr.nome)[2]);
    // Oggi: il binario morto, Ada con la striscia; in stazione il trenino vuoto.
    const lunga = '<g class="pr-in-mano">' + G.striscia('Il cane di Emma si chiama', 380) + '</g>';
    const oggi = '<g class="pr-oggi"><g class="pr-cam-oggi">' + G.mondo({ morto: true, banchina: true, manopola: 0 }) +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<path class="pr-p-oggi" d="' + M.partenza + '" fill="none"/><g class="pr-vuoto">' + G.treno([{}, {}, {}, {}, {}, {}], { sbarra: 0 }) + '</g>' +
      G.treniDormono() + '<g class="pr-ada"></g>' + lunga + '</g></g>';
    // Ieri: il parco spento; i treni di prova; le strisce che scendono; le lanterne; il brivido.
    let strisce = '';
    const rr = G.rng(51);
    for (let k = 0; k < PR_STRISCE; k++) {
      let righe = '';
      for (let j = 0; j < 9; j++) righe += '<path d="M' + (16 + j * 30) + ' 16 L' + (36 + j * 30 + rr() * 6) + ' 16 M' + (12 + j * 30) + ' 28 L' + (30 + j * 30 + rr() * 8) + ' 28" stroke="#8C8478" stroke-width="3.4" stroke-linecap="round"/>';
      strisce += '<g class="pr-cade" opacity="0"><g transform="translate(-150 -22)"><path d="M0 4 L300 0 L290 22 L300 44 L0 40 L10 22 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/>' + righe + '</g></g>';
    }
    const treni = PR_TRENI.map((tr, n) => '<g class="pr-treno" data-n="' + n + '">' + G.treno(tr.chi.map(pass), { grigio: true, fanale: 1, sbarra: 1 }) + '</g>').join('');
    const sale = '<g class="pr-sale">' + G.treno(PR_SALE.chi.map(pass), { grigio: true, fanale: 1, sbarra: 1 }) + '</g>';
    const lanterne = PR_TRENI.map((tr, n) => '<g class="pr-lanterna" data-n="' + n + '" opacity="0"><g class="pr-lan-in"></g></g>').join('');
    const ieri = '<g class="pr-ieri" opacity="0"><g class="pr-cam-ieri">' + G.mondo({ morto: true, spento: 1, seme: 5 }) +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<path class="pr-p-arrivo" d="' + M.arrivo + '" fill="none"/><path class="pr-p-partenza" d="' + M.partenza + '" fill="none"/>' +
      sale + treni + strisce + '</g>' +
      // La vecchia fotografia: colori un po' spenti, un velo color seppia, gli angoli scuri, il bordo chiaro.
      // Le lanterne e il brivido restano accesi sopra il velo: sono la luce della storia.
      '<rect x="-200" y="-200" width="2320" height="1480" fill="#808080" opacity=".3" style="mix-blend-mode:saturation"/>' +
      '<g class="pr-cam-ieri2">' +
      '<path class="pr-brivido" d="' + M.arrivo + '" fill="none" stroke="#FFF1C9" stroke-width="7" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
      '<path class="pr-brivido2" d="' + M.arrivo + '" fill="none" stroke="#FFFBEF" stroke-width="2.6" stroke-linecap="round" opacity="0"/>' + lanterne + '</g>' +
      '<rect class="pr-seppia" x="-200" y="-200" width="2320" height="1480" fill="#E8C690" opacity=".16"/>' +
      '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#g-pr-vignetta)"/>' +
      '<path d="M-200 -200 H2120 V1280 H-200 Z M60 50 Q60 34 76 34 H1844 Q1860 34 1860 50 V1030 Q1860 1046 1844 1046 H76 Q60 1046 60 1030 Z" fill="#EDE3CF" fill-rule="evenodd"/>' +
      '<path d="M60 50 Q60 34 76 34 H1844 Q1860 34 1860 50 V1030 Q1860 1046 1844 1046 H76 Q60 1046 60 1030 Z" fill="none" stroke="#C9B994" stroke-width="3"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      '<defs><radialGradient id="g-pr-vignetta" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#1A1208" stop-opacity="0"/><stop offset="1" stop-color="#1A1208" stop-opacity=".6"/></radialGradient></defs>' +
      oggi + ieri + '</svg>' +
      G.sottotitolo('NARRATORE', 'Prima che il parco aprisse, i treni di prova hanno portato tantissime frasi sui cani. Dopo «si chiama», ogni volta un nome.') +
      G.sottotitolo('NARRATORE', 'Ma il cane di Emma, nessun treno l’ha mai portato.') +
      G.sottotitolo('ADA', 'Allora la vasca resterà vuota.') + '</div>', 'prima')));
    this.G = G;
    const q = s => kit.stage.querySelector(s), qa = s => [...kit.stage.querySelectorAll(s)];
    this.camOggi = q('.pr-cam-oggi'); this.camIeri = q('.pr-cam-ieri'); this.camIeri2 = q('.pr-cam-ieri2'); this.ieri = q('.pr-ieri'); this.oggi = q('.pr-oggi');
    G.posaTreno(qa('.pr-vuoto .g-vag'), q('.pr-p-oggi'), 490, M.scala, M.passoBanchina);
    this.ada = q('.pr-ada'); this.inMano = q('.pr-in-mano'); this.seppia = q('.pr-seppia');
    const [ax, ay] = PR_ADA, sc = 0.28;
    this.inMano.setAttribute('transform', 'translate(' + (ax - 100 * sc + 5 * sc).toFixed(2) + ' ' + (ay - 304 * sc + 228 * sc).toFixed(2) + ') scale(' + (0.5 * sc).toFixed(4) + ')');
    this.arrivo = q('.pr-p-arrivo'); this.partenza = q('.pr-p-partenza');
    this.treni = PR_TRENI.map((_, n) => qa('.pr-treno[data-n="' + n + '"] .g-vag'));
    this.sale = qa('.pr-sale .g-vag');
    this.cade = qa('.pr-cade');
    this.lanterne = qa('.pr-lanterna');
    this.lanterne.forEach((l, n) => {
      l.querySelector('.pr-lan-in').innerHTML = G.lanterna(PR_TRENI[n].nome, this.nomi[n], 1);
      l.setAttribute('transform', 'translate(' + PR_LANTERNA[0] + ' ' + PR_LANTERNA[1] + ') scale(.45) translate(-60 -30)');
    });
    this.brivido = [q('.pr-brivido'), q('.pr-brivido2')];
    // Quando l'ultimo vagone di ogni treno passa sopra il centro della vasca: lì si accende il biglietto.
    const path = this.arrivo, L = path.getTotalLength();
    this.L = L;
    this.sopra = PR_TRENI.map(tr => {
      const n = tr.chi.length - 1;
      for (let t = tr.esce; t < tr.esce + 20; t += 0.02) { const se = PR_V * (t - tr.esce) - n * M.passoBanchina; if (se > 0 && path.getPointAtLength(se).x <= PR_LANTERNA[0]) return t; }
      return tr.esce + 6;
    });
    // Dove finisce la vasca sul percorso: da lì il brivido corre all'indietro fino alla bocca della montagna.
    let sv = 0;
    for (let s = 0; s < L; s += 2) if (path.getPointAtLength(s).x <= PR_LANTERNA[0]) { sv = s; break; }
    this.sVasca = sv;
    let sw = L;
    for (let s = sv; s < L; s += 2) if (path.getPointAtLength(s).x <= 610) { sw = s; break; }
    this.sVia = sw;
    this.statoAda = '';
    this.sub = G.subs(kit, [[4.0, 15.0], [15.6, 20.2], [24.2, 27.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'prima', t);
    const G = this.G, M = G.MONDO;
    this.camOggi.setAttribute('transform', G.camChiavi(PR_OGGI_CAM, t));
    G.animaMondo({ ruota: this.camOggi.querySelector('.g-ruota') }, t + 960);
    // Ada: guarda i treni grigi; poi, di nuovo oggi, guarda la vasca vuota, laggiù, e ci pensa.
    const ang = t < 21 ? -8 : Math.round(lerp(-8, 9, eio(seg(t, 21.4, 22.6))) * 2) / 2;
    const espr = t < 22.8 ? 'base' : 'pensa';
    const k = espr + ang;
    if (k !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(PR_ADA[0], PR_ADA[1]) + '">' + G.adaSeduta('striscia', espr, { testa: ang }) + '</g>'; this.statoAda = k; }
    // Ieri, come una vecchia fotografia.
    const ieri = seg(t, PR_IERI[0], PR_IERI[1]) * (1 - seg(t, PR_IERI[2], PR_IERI[3]));
    this.ieri.setAttribute('opacity', eio(ieri).toFixed(3));
    this.ieri.setAttribute('display', ieri > 0 ? 'inline' : 'none');
    this.seppia.setAttribute('opacity', (0.16 + 0.025 * Math.sin(t * 23) * Math.sin(t * 7)).toFixed(3));
    if (ieri <= 0) { this.sub(t); return; }
    const ci = G.camChiavi(PR_IERI_CAM, t);
    this.camIeri.setAttribute('transform', ci); this.camIeri2.setAttribute('transform', ci);
    G.animaMondo({ ruota: this.camIeri.querySelector('.g-ruota') }, t + 300);
    // Il treno di prova che corre piano sul viadotto e sparisce nella montagna.
    const ss = PR_SALE.s0 + PR_SALE.v * Math.max(0, t - 2.6);
    G.posaTreno(this.sale, this.partenza, ss, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.sale, this.partenza, ss, { fine: true, passo: M.passoBanchina });
    // I treni di prova escono uno dopo l'altro sopra la vasca.
    this.treni.forEach((v, n) => {
      const s = PR_V * (t - PR_TRENI[n].esce);
      G.posaTreno(v, this.arrivo, s < 0 ? -600 : s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(v, this.arrivo, s < 0 ? -600 : s, { inizio: true, passo: M.passoBanchina });
      // Oltre la vasca il treno va verso la stazione e esce dall'inquadratura: lì sfuma (non si ferma a nessuno).
      v.forEach((el, i) => { const si = s - i * M.passoBanchina; if (si > this.sVia - 60) el.setAttribute('opacity', (+el.getAttribute('opacity') * (1 - seg(si, this.sVia - 60, this.sVia))).toFixed(3)); });
    });
    // Le lanterne: si accendono quando passa l'ultimo vagone, brillano, poi si spengono e lasciano il posto alla prossima.
    let briv = -1;
    this.lanterne.forEach((l, n) => {
      const a = this.sopra[n], on = eo(seg(t, a, a + 0.5)) * (1 - eio(seg(t, a + 2.6, a + 3.4)));
      l.setAttribute('opacity', on.toFixed(3));
      const sc = 0.45 * (0.8 + 0.2 * eo(seg(t, a, a + 0.5))) * (1 + 0.03 * Math.sin(t * 4 + n));
      l.setAttribute('transform', 'translate(' + PR_LANTERNA[0] + ' ' + (PR_LANTERNA[1] + 2 * Math.sin(t * 2 + n)).toFixed(1) + ') scale(' + sc.toFixed(3) + ') translate(-60 -30)');
      const b = seg(t, a + 0.8, a + 1.9);
      if (b > 0 && b < 1) briv = b;
    });
    // Il brivido: un'onda di luce che corre all'indietro lungo i binari, dalla vasca alla bocca della montagna.
    this.brivido.forEach(el => {
      if (briv < 0) { el.setAttribute('opacity', 0); return; }
      const pos = lerp(this.sVasca, -40, ei(briv));
      el.setAttribute('stroke-dasharray', '46 ' + (this.L + 100).toFixed(0));
      el.setAttribute('stroke-dashoffset', (-pos).toFixed(1));
      el.setAttribute('opacity', (Math.min(1, briv * 6, (1 - briv) * 4)).toFixed(3));
    });
    // Le strisce scritte fitte scendono dal cielo e infilano la fessura dello Spezzaparole.
    const [fx, fy] = [M.spezzaparole[0], M.spezzaparole[1] - 300 * 0.34 + 60 * 0.34];
    this.cade.forEach((el, k) => {
      const a = 2.8 + k * 0.85, u = seg(t, a, a + 3.2);
      if (u <= 0 || u >= 1) { el.setAttribute('opacity', 0); return; }
      const x0 = 200 + ((k * 337) % 900), x = lerp(x0, fx, eio(u)) + 30 * Math.sin(t * 2 + k) * (1 - u), y = lerp(-40, fy - 6, ei(u));
      const rot = lerp(-20 + (k % 3) * 18, 90, eio(seg(u, 0.7, 1))) + 10 * Math.sin(t * 3 + k) * (1 - u);
      el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + lerp(0.32, 0.14, u).toFixed(3) + ')');
      el.setAttribute('opacity', Math.min(1, u * 5, (1 - u) * 8).toFixed(3));
    });
    this.sub(t);
  },
});
