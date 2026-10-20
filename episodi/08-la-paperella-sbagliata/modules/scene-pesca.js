const { seg, eo, ei, eio, lerp } = kit;
// Ada si alza, chiude gli occhi, infila la mano nella vasca e tira fuori una paperella color caramello. Apre gli occhi e
// la guarda da vicino: la gira, la tiene accanto al disegno della paperella blu del mare, sul quaderno. Sono fatte allo
// stesso modo: stesso becco, stessa luce, nessun segno. Le altre paperelle scivolano via dallo scarico e la vasca torna
// vuota. La paperella le salta di mano e corre a sedersi in un vagone nuovo, dietro Chiama.
// Si apre come finisce «vasca»; finisce sul treno con il vagone nuovo (lo riprende, dopo il salotto, «telefono»).
const PS_CAM = [
  { t: 0, cx: 560, cy: 832, z: 2.4 },
  { t: 1.6, cx: 704, cy: 856, z: 4.4 },
  { t: 5.0, cx: 704, cy: 856, z: 4.4 },
  { t: 6.4, cx: 694, cy: 852, z: 6.0 },
  { t: 16.0, cx: 694, cy: 852, z: 6.0, da: 15.9 },
  { t: 16.01, cx: 720, cy: 860, z: 4.2, da: 16.0 },
  { t: 18.4, cx: 720, cy: 860, z: 4.2 },
  { t: 20.0, cx: 620, cy: 830, z: 4.0 },
];
const PS_ADA = [672, 896];
const PS_ALZA = [0.6, 1.2];
const PS_PESCA = { giu: 2.4, su: 4.0, preso: 4.5 };
const PS_GIRA = [5.0, 6.4];
const PS_QUADERNO = [6.6, 7.2, 15.4, 16.0];
const PS_VIA = 16.2;
const PS_SALTA = 18.6, PS_SALE = 20.6, PS_VAGONE = 19.6;
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, D = G.MOD.cane, P = D.passeggeri;
    this.lista = G.papereVasca(D.vasca, 48);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === D.pesca && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="ps-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    const forme = { Il: 0, di: 1, si: 2 };
    const parole = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
    const treno = parole.map(w => ({ tipo: w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso', col: P[w].biglietto, o: w in forme ? { forma: forme[w] } : w === 'cane' ? { coda: 12 } : {} }))
      .concat([{ tipo: 'paperella', col: D.nuovo[D.pesca] }]);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + C.luce + '"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      G.treniDormono() + '<g class="ps-treno">' + G.treno(treno, { sbarra: 0 }) + '</g>' +
      '<g class="ps-scint" opacity="0">' + scintille + '</g><g class="ps-ada"></g>' +
      '<ellipse class="ps-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="ps-mano"><g class="ps-mano-gira"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g></g>';
    // Il quaderno da vicino: a sinistra il disegno della paperella blu del mare; la paperella pescata, in mano ad Ada,
    // le si avvicina. Stessa forma, stesso becco, nessun segno.
    const blu = G.MOD.mare.nuovo.nuota;
    const corpo = 'M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z';
    const disegno = '<g transform="translate(330 330) scale(4)">' + G.paperella(blu) +
      '<g fill="none" stroke="#3A3570" stroke-width="1.6" stroke-linejoin="round"><path d="' + corpo + '"/><circle cx="36" cy="34" r="17"/></g></g>';
    const mano = '<g class="ps-q-mano"><path d="M40 120 Q60 260 40 420 L180 420 Q170 260 130 110 Z" fill="' + G.C.crema + '" stroke="#2E2A26" stroke-width="5"/>' +
      '<ellipse cx="86" cy="96" rx="58" ry="44" fill="#C98B63"/><path d="M40 86 Q30 60 52 54 M70 72 Q64 44 86 42 M104 70 Q102 42 124 44" stroke="#C98B63" stroke-width="22" stroke-linecap="round" fill="none"/></g>';
    const vera = '<g class="ps-q-vera"><g class="ps-q-gira"><g transform="translate(-240 -330) scale(4)">' +
      '<ellipse cx="54" cy="56" rx="60" ry="46" fill="' + this.colPresa + '" opacity=".3" filter="url(#g-soft)"/>' + G.paperella(this.colPresa) + '</g></g>' +
      '<g transform="translate(-150 -36)">' + mano + '</g></g>';
    const quaderno = '<g class="ps-quad" opacity="0"><g class="ps-q-cam">' + G.quadernoAperto(disegno, '') + vera +
      '<g class="ps-q-luccica" opacity="0">' + [[-210, -230], [400, -230]].map(([x, y]) => '<g transform="translate(' + (x + 960) + ' ' + (y + 540) + ')"><path d="M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6 Z" fill="#FFF6DA"/></g>').join('') + '</g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', morto: true, banchina: true, manopola: 0, davanti: quaderno,
      html: G.sottotitolo('NARRATORE', 'Ada pesca come sempre, senza guardare.') +
        G.sottotitolo('NARRATORE', 'La paperella è fatta come tutte le altre. Nessuna paperella sa se è vera: nella vasca non c’è niente che lo dica.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.ps-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 490, M.scala, M.passoBanchina);
    this.vagNuovo = this.vag[6]; this.passNuovo = this.vagNuovo.querySelector('.g-pass');
    this.ada = this.m.q('.ps-ada'); this.mano = this.m.q('.ps-mano'); this.manoGira = this.m.q('.ps-mano-gira');
    this.luce = this.m.q('.ps-luce'); this.scint = this.m.q('.ps-scint');
    this.pap = this.m.qa('.ps-pap').map(el => ({ el, i: +el.dataset.i }));
    this.quad = this.m.q('.ps-quad'); this.qCam = this.m.q('.ps-q-cam'); this.qVera = this.m.q('.ps-q-vera'); this.qGira = this.m.q('.ps-q-gira');
    this.luccica = this.m.q('.ps-q-luccica');
    this.sedile = [M.fermo + 6 * M.passoBanchina + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[1.4, 5.0], [8.2, 18.4]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PS_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('08', 'pesca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PS_CAM, t));
    G.animaMondo(m, t + 1150);
    // Ada si alza dal gradino e pesca a occhi chiusi, come sempre.
    let giu = 0;
    if (t >= PS_PESCA.giu - 0.6) giu = eio(seg(t, PS_PESCA.giu - 0.6, PS_PESCA.giu + 0.4));
    if (t > PS_PESCA.giu + 0.4 && t < PS_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PS_PESCA.giu) * 9);
    if (t >= PS_PESCA.su) giu = 1 - eio(seg(t, PS_PESCA.su, PS_PESCA.preso + 0.4));
    const giuQ = Math.round(giu * 40) / 40;
    const seduta = t < PS_ALZA[0];
    const posa = seduta ? 'quaderno' : t < 1.6 ? 'base' : t < PS_SALTA + 0.4 ? 'pesca' : 'quaderno';
    const espr = seduta ? 'pensa' : t < 1.6 ? 'base' : t < PS_PESCA.preso ? 'chiusi' : t < PS_GIRA[0] ? 'sorpresa' : t < PS_SALTA ? 'pensa' : 'felice';
    const dy = seduta ? 0 : -3 * Math.sin(Math.PI * seg(t, PS_ALZA[0], PS_ALZA[1]));
    const k = posa + espr + giuQ + seduta + dy.toFixed(1);
    if (k !== this.stato) {
      this.ada.innerHTML = '<g transform="' + G.posaAda(PS_ADA[0], PS_ADA[1] + dy) + '">' + (seduta ? G.adaSeduta(posa, espr, {}) : G.ada(posa, espr, { giu: giuQ })) + '</g>';
      this.stato = k;
    }
    // La paperella pescata: in mano ad Ada, la gira per guardarla; poi salta giù e corre al vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= PS_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PS_SALTA) {
      const a = eo(seg(t, PS_SALTA, PS_SALTA + 0.6)), corsa = eio(seg(t, PS_SALTA + 0.6, PS_SALE - 0.4)), salto = eio(seg(t, PS_SALE - 0.4, PS_SALE));
      if (t < PS_SALTA + 0.6) { px = lerp(hx, 650, a); py = lerp(hy, 836, a) - 26 * Math.sin(Math.PI * a); }
      else if (t < PS_SALE - 0.4) { px = lerp(650, this.sedile[0] + 22, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 22, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 20 * Math.sin(Math.PI * salto); }
      pv = t < PS_SALE ? 1 : 1 - seg(t, PS_SALE, PS_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const gira = Math.cos(Math.PI * 2 * eio(seg(t, PS_GIRA[0], PS_GIRA[1])));
    this.manoGira.setAttribute('transform', 'scale(' + (Math.abs(gira) < 0.05 ? 0.05 * Math.sign(gira || 1) : gira).toFixed(3) + ' 1)');
    const luce = seg(t, PS_PESCA.su + 0.3, PS_PESCA.preso + 0.4) * (1 - seg(t, 5.6, 6.4));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Il quaderno da vicino: la paperella vera arriva accanto al disegno, si gira, si mette alla pari. Due luccichii.
    this.quad.setAttribute('opacity', (seg(t, PS_QUADERNO[0], PS_QUADERNO[1]) * (1 - seg(t, PS_QUADERNO[2], PS_QUADERNO[3]))).toFixed(3));
    const entra = eo(seg(t, 7.0, 8.4)), accosta = eio(seg(t, 10.8, 12.0));
    const vx = lerp(1700, lerp(1380, 1180, accosta), entra), vy = lerp(980, 540, entra) + 6 * Math.sin(t * 2.2) * (1 - accosta);
    this.qVera.setAttribute('transform', 'translate(' + vx.toFixed(1) + ' ' + vy.toFixed(1) + ') rotate(' + (lerp(-14, 0, entra) + 4 * Math.sin(t * 1.7) * (1 - accosta)).toFixed(2) + ')');
    const g2 = Math.cos(Math.PI * 2 * eio(seg(t, 8.8, 10.4)));
    this.qGira.setAttribute('transform', 'scale(' + (Math.abs(g2) < 0.05 ? 0.05 * Math.sign(g2 || 1) : g2).toFixed(3) + ' 1)');
    this.luccica.setAttribute('opacity', (Math.sin(Math.PI * seg(t, 12.4, 13.4))).toFixed(3));
    this.qCam.setAttribute('transform', G.cam(lerp(960, 900, eio(seg(t, PS_QUADERNO[0], PS_QUADERNO[3]))), 540, lerp(1.0, 1.06, eio(seg(t, PS_QUADERNO[0], PS_QUADERNO[3])))));
    // Le altre paperelle scivolano via dallo scarico; la vasca torna vuota.
    this.pap.forEach(({ el, i }) => {
      const p = this.lista[i];
      const via = eio(seg(t, PS_VIA + (i % 7) * 0.12, PS_VIA + 1.7 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), y = lerp(p.y, 884, via) + (1 - via) * 1.2 * Math.sin(t * 2.2 + i);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', i === this.presa ? (t < PS_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Il vagone nuovo compare dietro Chiama, con le scintille; la paperella ci sale.
    this.vagNuovo.setAttribute('opacity', eo(seg(t, PS_VAGONE, PS_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PS_SALE - 0.05, PS_SALE + 0.3).toFixed(3));
    const sc = seg(t, PS_VAGONE, PS_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    this.sub(t);
  },
});
