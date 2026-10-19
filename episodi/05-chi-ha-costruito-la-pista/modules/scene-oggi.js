const { seg, eo, ei, eio, lerp } = kit;
// Di nuovo oggi. Il trenino color crema esce dalla montagna: Emma è blu, e nella vasca cadono le paperelle di sempre. Ada
// pesca a occhi chiusi: blu, «nuota»; la paperella sale sul vagone nuovo. Sui binari non corre nessun brivido. Arriva
// un'altra striscia, di nuovo «Al mare Emma»: stesso giro, stessa vasca (le stesse paperelle, negli stessi posti),
// binari fermi. Ada si china sui binari lucidi e piegati in mille punti, poi guarda i treni grigi che dormono.
// Si apre dal telefono (come finisce «apre»); finisce su Ada e i treni grigi (lo riprende «fine»).
const OG_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 2.6, cx: 800, cy: 834, z: 3.4 },
  { t: 4.4, cx: 760, cy: 860, z: 4.2 },
  { t: 7.6, cx: 760, cy: 860, z: 4.2 },
  { t: 9.4, cx: 600, cy: 846, z: 3.6 },
  { t: 12.4, cx: 640, cy: 846, z: 3.6 },
  { t: 13.0, cx: 780, cy: 850, z: 3.6, da: 12.99 },
  { t: 16.6, cx: 720, cy: 850, z: 3.4 },
  { t: 18.8, cx: 650, cy: 842, z: 5.0 },
  { t: 20.4, cx: 650, cy: 842, z: 5.0 },
  { t: 22.0, cx: 240, cy: 790, z: 1.9 },
];
const OG_VEL = [[0, 100], [3.4, 55], [7.0, 55], [8.4, 130], [10.0, 130], [11.8, 0]];
// Il secondo giro, a montaggio: lo stesso giro, più svelto.
const OG_VEL2 = [[0, 190], [2.2, 140], [3.6, 220], [6.0, 0]];
const OG_ESCE = [0.6, 13.0];
const OG_ADA = [672, 896], OG_CHINA = [612, 896];
const OG_PESCA = { giu: 5.2, su: 6.8, preso: 7.3 };
const OG_SALTA = 9.0, OG_SALE = 11.0, OG_VAGONE = 10.2;
const OG_STRISCIA = [10.6, 12.2], OG_NERO = [12.6, 12.8, 13.0];
const OG_CAMMINA = [17.4, 18.4], OG_CHINO = [18.6, 19.2, 20.4, 21.2];
kit.scene('oggi', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri, C = G.C;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    this.lista = G.papereVasca(D.vasca);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'nuota' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="og-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="og-vera">' + G.paperella(this.lista[i].col) + '</g><g class="og-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const treno = this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] }));
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + C.luce + '"/>';
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    const sopra = '<path class="og-p-morto" d="' + M.morto + '" fill="none"/><path class="og-pieghe" ' + binario + '/>' +
      '<path class="og-luccica" d="' + M.arrivo + '" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8" filter="url(#g-glow)"/>' +
      '<g class="og-dormono" opacity=".9">' + G.treniCheDormono() + '</g>' +
      [0, 1].map(n => '<g class="og-treno" data-n="' + n + '">' + G.treno(n ? treno : treno.concat([{ tipo: 'paperella', col: D.nuovo.nuota }]), { sbarra: 1 }) + '</g>').join('') +
      '<g class="og-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="og-ada"></g>' +
      '<g class="og-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>' +
      '<ellipse class="og-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="og-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'oggi', morto: true, manopola: 0, banchina: true,
      davanti: '<rect class="og-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="1"/>',
      html: G.sottotitolo('NARRATORE', 'Oggi, mentre tu scrivi, la pista non si piega più. Puoi mandare la stessa frase mille volte: nessun brivido.') +
        G.sottotitolo('ADA', 'Nessuno l’ha costruita. L’hanno piegata i treni!'),
    });
    const m = this.m;
    m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    m.q('.og-pieghe').setAttribute('d', G.pieghePista(m).d(1, 2.2));
    G.dormono(m.q('.og-p-morto'), m.q('.og-dormono'), true);
    this.treni = [0, 1].map(n => m.qa('.og-treno[data-n="' + n + '"] .g-vag'));
    this.passNuovo = this.treni[0][3].querySelector('.g-pass');
    this.ada = m.q('.og-ada'); this.str = m.q('.og-striscia'); this.nero = m.q('.og-nero');
    this.mano = m.q('.og-mano'); this.luce = m.q('.og-luce'); this.scint = m.q('.og-scint');
    this.luccica = m.q('.og-luccica'); this.lArrivo = m.arrivo.getTotalLength();
    this.pap = m.qa('.og-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.og-vera'), luce: el.querySelector('.og-dilu') }));
    const path = m.arrivo, sF = this.lArrivo - (M.fermo - 40);
    this.sF = sF;
    // Quando cade ogni paperella (il secondo giro è identico al primo: stessa vasca, stessi posti).
    this.cade = [OG_VEL, OG_VEL2].map(vel => this.lista.map(p => {
      for (let t = 0; t < 12; t += 0.02) { const se = Math.min(sF, G.percorso(t, 0, vel)) - 2 * M.passoBanchina; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 6;
    }));
    this.sedile = [M.fermo + 3 * M.passoBanchina + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[1.6, 11.2], [21.2, 25.4]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = OG_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('05', 'oggi', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(OG_CAM, t));
    G.animaMondo(m, t + 1200);
    this.nero.setAttribute('opacity', Math.max(1 - seg(t, 0, 0.6), seg(t, OG_NERO[0], OG_NERO[1]) * (1 - seg(t, OG_NERO[1], OG_NERO[2]))).toFixed(3));
    // Il riflesso sui binari: fermi, lucidi. Nessun brivido.
    G.onda(this.luccica, this.lArrivo, (t / 5) % 1, 60);
    // Due giri uguali: il primo treno esce e si ferma; dopo lo stacco, il secondo fa lo stesso giro.
    const giro = t < OG_ESCE[1] ? 0 : 1, tg = t - OG_ESCE[giro];
    this.treni.forEach((v, n) => {
      if (n !== giro || tg < 0) { v.forEach(el => el.setAttribute('opacity', 0)); return; }
      const s = Math.min(this.sF, G.percorso(tg, 0, giro ? OG_VEL2 : OG_VEL));
      G.posaTreno(v, m.arrivo, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(v, m.arrivo, s, { inizio: true, passo: M.passoBanchina });
      const torna = Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
      v.slice(0, 3).forEach((el, i) => G.cambiaPasseggero(el, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, torna)));
      if (n === 0) v[3].setAttribute('opacity', eo(seg(t, OG_VAGONE, OG_VAGONE + 0.6)).toFixed(3));
    });
    this.passNuovo.setAttribute('opacity', seg(t, OG_SALE - 0.05, OG_SALE + 0.3).toFixed(3));
    // Le paperelle: cadono, poi (dopo la pesca) scivolano via; al secondo giro cadono uguali, negli stessi posti.
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[giro][i] + OG_ESCE[giro], p = this.lista[i], u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const via = giro ? 0 : eio(seg(t, 8.6 + (i % 7) * 0.12, 10.2 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
      const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : !giro && i === this.presa ? (t < OG_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada: pesca a occhi chiusi; riceve la striscia; guarda il secondo giro; si china sui binari; guarda i treni grigi.
    let giu = 0;
    if (t >= OG_PESCA.giu - 0.6) giu = eio(seg(t, OG_PESCA.giu - 0.6, OG_PESCA.giu + 0.4));
    if (t > OG_PESCA.giu + 0.4 && t < OG_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - OG_PESCA.giu) * 9);
    if (t >= OG_PESCA.su) giu = 1 - eio(seg(t, OG_PESCA.su, OG_PESCA.preso + 0.4));
    const giuQ = Math.round(giu * 40) / 40;
    let posa, espr;
    if (t < OG_PESCA.giu - 0.8) { posa = 'quaderno'; espr = 'felice'; }
    else if (t < OG_SALTA) { posa = 'pesca'; espr = t < OG_PESCA.preso ? 'chiusi' : 'sorpresa'; }
    else if (t < OG_STRISCIA[1]) { posa = 'quaderno'; espr = 'felice'; }
    else if (t < OG_NERO[1]) { posa = 'striscia'; espr = 'felice'; }
    else if (t < OG_CHINO[0]) { posa = 'quaderno'; espr = 'pensa'; }
    else if (t < OG_CHINO[3]) { posa = 'quaderno'; espr = 'base'; }
    else { posa = 'quaderno'; espr = 'felice'; }
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g class="og-ada-in">' + G.ada(posa, espr, { giu: giuQ, testo: 'Al mare Emma' }) + '</g>'; this.stato = k; }
    const cam = eio(seg(t, OG_CAMMINA[0], OG_CAMMINA[1]));
    const ax = lerp(OG_ADA[0], OG_CHINA[0], cam), ay = OG_ADA[1] - (cam > 0 && cam < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    const china = 13 * (eio(seg(t, OG_CHINO[0], OG_CHINO[1])) - eio(seg(t, OG_CHINO[2], OG_CHINO[3]))) - 3 * eio(seg(t, OG_CHINO[3], OG_CHINO[3] + 0.6));
    this.ada.firstChild.setAttribute('transform', 'rotate(' + china.toFixed(2) + ' ' + ax.toFixed(1) + ' ' + ay.toFixed(1) + ') ' + G.posaAda(ax, ay));
    // La paperella pescata: in mano ad Ada, poi salta sul vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= OG_PESCA.su + 0.2 ? 1 : 0;
    if (t >= OG_SALTA) {
      const a = eo(seg(t, OG_SALTA, OG_SALTA + 0.6)), corsa = eio(seg(t, OG_SALTA + 0.6, OG_SALE - 0.4)), salto = eio(seg(t, OG_SALE - 0.4, OG_SALE));
      if (t < OG_SALTA + 0.6) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < OG_SALE - 0.4) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < OG_SALE ? 1 : 1 - seg(t, OG_SALE, OG_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, OG_PESCA.su + 0.3, OG_PESCA.preso + 0.4) * (1 - seg(t, 8.6, 9.2));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    const sc = seg(t, OG_VAGONE, OG_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    // La striscia scende dal cielo nelle mani di Ada.
    const us = eio(seg(t, OG_STRISCIA[0], OG_STRISCIA[1]));
    const [qx, qy] = [OG_ADA[0], OG_ADA[1] - 26];
    this.str.setAttribute('transform', 'translate(' + lerp(820, qx, us).toFixed(1) + ' ' + (lerp(640, qy, us) - 40 * Math.sin(Math.PI * us)).toFixed(1) + ') rotate(' + ((1 - us) * -14).toFixed(1) + ') scale(' + lerp(0.3, 0.123, us).toFixed(3) + ')');
    this.str.setAttribute('opacity', t >= OG_STRISCIA[0] && t < OG_STRISCIA[1] ? 1 : 0);
    this.sub(t);
  },
});
