const { seg, eo, ei, eio, lerp } = kit;
// Ada pesca a occhi chiusi: una paperella verde. «Corre!». Le altre scivolano via; la paperella corre al secondo treno e
// sale su un vagone nuovo, dietro Emma. Stacco sulle due case: «Al mare Emma nuota», «Al parco Emma corre».
// Si apre come finisce «verde»; finisce sui due treni, uno in cima alla salita e uno in stazione (li riprende «ancora»).
const PS_CAM = [
  { t: 0, cx: 600, cy: 830, z: 3.2 },
  { t: 1.8, cx: 728, cy: 846, z: 4.2 },
  { t: 9.0, cx: 728, cy: 846, z: 4.2 },
  { t: 11.6, cx: 470, cy: 806, z: 3.0 },
  { t: 14.4, cx: 470, cy: 806, z: 3.0 },
  { t: 25.6, cx: 340, cy: 600, z: 1.9, da: 25.0 },
];
const PS_ADA = [672, 896];
const PS_PESCA = { giu: 2.4, su: 4.2, preso: 4.7 };
const PS_SALTA = 9.4, PS_SALE = 12.8, PS_VAGONE = 12.0;
const PS_CASE = [14.2, 14.8, 25.2, 26.0];
const PS_RISPOSTE = [16.0, 17.4];
const PS_CIMA = 1080;
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare, D = G.MOD.parco, P = D.passeggeri;
    this.lista = G.papereVasca(D.vasca);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'corre' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="ps-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    const treni = [
      [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }],
      [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'parco', col: P.parco.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.corre }],
    ];
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = treni.map((c, n) => '<g class="ps-treno" data-n="' + n + '">' + G.treno(c, { sbarra: 1 }) + '</g>').join('') +
      '<g class="ps-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="ps-ada"></g>' +
      '<ellipse class="ps-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="ps-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    // Le due case, affiancate: la storia è cresciuta di una parola in tutte e due.
    const frasi = ['Al mare Emma', 'Al parco Emma'], risposte = ['nuota', 'corre'];
    const pannello = k => {
      const z = 0.95, tx = 480 - 947 * z, ty = 540 - 522 * z;
      const o = k ? { muro: ['#203A3F', '#35585A', '#3D5E6E'] } : {};
      return '<g transform="translate(' + (k * 960) + ' 0)"><clipPath id="g-ps-pan' + k + '"><rect width="960" height="1080"/></clipPath><g clip-path="url(#g-ps-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto('<g>' + G.telefono({ messaggi: [frasi[k]] }) + '</g><g class="ps-risposta" opacity="0">' + G.telefono({ messaggi: [frasi[k]], rispostaTesto: risposte[k] }) + '</g>', o) + '</g></g></g>';
    };
    const case2 = '<g class="ps-case" opacity="0">' + pannello(0) + pannello(1) + '<path d="M960 -10 L960 1090" stroke="#05070F" stroke-width="12"/></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', davanti: case2,
      html: G.sottotitolo('ADA', 'Corre!') + G.sottotitolo('NARRATORE', 'Al mare Emma nuota. Al parco Emma corre.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.treni = [0, 1].map(n => this.m.qa('.ps-treno[data-n="' + n + '"] .g-vag'));
    G.posaTreno(this.treni[0], this.m.partenza, PS_CIMA);
    G.posaTreno(this.treni[1], this.m.arrivo, this.m.arrivo.getTotalLength() - (M.fermo - 40));
    this.vagNuovo = this.treni[1][3]; this.passNuovo = this.vagNuovo.querySelector('.g-pass');
    this.ada = this.m.q('.ps-ada'); this.mano = this.m.q('.ps-mano'); this.luce = this.m.q('.ps-luce'); this.scint = this.m.q('.ps-scint');
    this.pap = this.m.qa('.ps-pap').map(el => ({ el, i: +el.dataset.i }));
    this.case = this.m.q('.ps-case'); this.risposte = this.m.qa('.ps-risposta');
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[5.2, 7.6], [16.6, 21.4]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PS_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PS_CAM, t));
    G.animaMondo(m, t + 830);
    let giu = 0;
    if (t >= PS_PESCA.giu - 0.6) giu = eio(seg(t, PS_PESCA.giu - 0.6, PS_PESCA.giu + 0.4));
    if (t > PS_PESCA.giu + 0.4 && t < PS_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PS_PESCA.giu) * 9);
    if (t >= PS_PESCA.su) giu = 1 - eio(seg(t, PS_PESCA.su, PS_PESCA.preso + 0.4));
    const posa = t < 1.4 ? 'quaderno' : 'pesca';
    const espr = t < 1.4 ? 'felice' : t < PS_PESCA.preso ? 'chiusi' : t < 9 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(PS_ADA[0], PS_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= PS_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PS_SALTA) {
      const a = eo(seg(t, PS_SALTA, PS_SALTA + 0.7)), corsa = eio(seg(t, PS_SALTA + 0.7, PS_SALE - 0.5)), salto = eio(seg(t, PS_SALE - 0.5, PS_SALE));
      if (t < PS_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < PS_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < PS_SALE ? 1 : 1 - seg(t, PS_SALE, PS_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, PS_PESCA.su + 0.3, PS_PESCA.preso + 0.4) * (1 - seg(t, 8.6, 9.4));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Le altre paperelle scivolano via dallo scarico.
    this.pap.forEach(({ el, i }) => {
      const p = this.lista[i];
      const via = eio(seg(t, 7.2 + (i % 7) * 0.12, 8.9 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), y = lerp(p.y, 884, via) + (1 - via) * 1.2 * Math.sin(t * 2.2 + i);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', i === this.presa ? (t < PS_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    this.vagNuovo.setAttribute('opacity', eo(seg(t, PS_VAGONE, PS_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PS_SALE - 0.05, PS_SALE + 0.3).toFixed(3));
    const sc = seg(t, PS_VAGONE, PS_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    // Le due case: sotto le due frasi compare la parola nuova.
    this.case.setAttribute('opacity', (seg(t, PS_CASE[0], PS_CASE[1]) * (1 - seg(t, PS_CASE[2], PS_CASE[3]))).toFixed(3));
    this.risposte.forEach((r, k) => r.setAttribute('opacity', eo(seg(t, PS_RISPOSTE[k], PS_RISPOSTE[k] + 0.4)).toFixed(3)));
    this.sub(t);
  },
});
