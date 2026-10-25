const { seg, eo, eio, lerp } = kit;
// Ada corre al cancello del parco gemello. Il custode tondo apre il regolamento verde; Ada tira fuori dal quaderno il
// disegno del regolamento del suo custode. Sfogliano insieme, pagina accanto a pagina: la frase del parco (le onde del mare
// da una parte, un alberello dall'altra), il Bruco (con il lupo, laggiù, passa verde), la teleferica (laggiù la collina è
// vuota), il telone e la campanella (con altri disegni).
// Coordinate del parco gemello. Si apre sulla strada verso il cancello; finisce su Ada e il custode (la riprende «piove»).
const RE_CORRE = [0.2, 2.4], RE_APRE = 2.6;
const RE_LIBRI = [3.4, 3.9, 17.8, 18.2];
const RE_PAGINE = [['frase', 'fraseParco', 3.4], ['brucoRosso', 'brucoVerde', 13.0], ['teleferica', 'telefericaNo', 14.6], ['telone', 'teloneGemello', 16.0], ['campanella', 'campanellaGemella', 16.9]];
const RE_GIRA = 0.3;
const RE_CU = [2036, 868];
const RE_CAM = [{ t: 0, cx: 1860, cy: 820, z: 3.0 }, { t: 2.4, cx: 1990, cy: 820, z: 3.8 }, { t: 19.2, cx: 1990, cy: 820, z: 4.0 }];
kit.scene('regolamento', {
  init(kit) {
    const G = window.G, C = G.C, S2 = G.S2;
    // I due regolamenti da vicino: a sinistra il disegno di quello del custode di Ada, sul quaderno; a destra quello verde.
    const libri = '<g class="re-libri" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/>' +
      '<circle cx="960" cy="560" r="760" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>' +
      '<g class="re-sx"></g><g class="re-dx"></g></g>';
    this.m = G.costruisciMondo(kit, '<g class="re-cu"></g><g class="re-ada"></g>', {
      pre: 'regolamento', manopola: 0, banchina: true, morto: true, gemello: true, fiume: -S2.GEMELLO.dx, bruco: 'acceso', davanti: libri,
      html: G.sottotitolo('CUSTODE', 'Lo dice il regolamento. Il mio.') +
        G.sottotitolo('NARRATORE', 'Il custode di laggiù ha un altro regolamento: un’altra frase del parco, un altro Bruco, e nessuna teleferica.'),
    });
    this.G = G;
    const q = this.m.q;
    this.cu = q('.re-cu'); this.ada = q('.re-ada'); this.libri = q('.re-libri'); this.sx = q('.re-sx'); this.dx = q('.re-dx');
    this.verde = { libro: '#2F7A4A', scuro: '#1D5232' };
    this.stati = {};
    this.sub = G.subs(kit, [[3.6, 6.4], [6.8, 16.2]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'regolamento', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(RE_CAM, t));
    G.animaMondo(m, t + 2640);
    // Il custode tondo apre il regolamento.
    const posa = t >= RE_APRE ? 'legge' : 'base';
    this.cambia('cu', posa, this.cu, '<g transform="' + G.posaCustode(RE_CU[0], RE_CU[1], 0.26) + '">' + G.unico(G.custodeGemello(posa, 'sorriso', { occhi: -1 }), 'recu') + '</g>');
    // Ada arriva di corsa col quaderno.
    const u = eio(seg(t, RE_CORRE[0], RE_CORRE[1])), espr = t > 18 ? 'pensa' : 'base';
    this.cambia('ada', espr, this.ada, '<g class="re-ada-in">' + G.ada('quaderno', espr) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(lerp(1760, 1960, u), 872));
    // Le pagine, a coppie: si girano insieme (il libro si stringe e si riapre sulla pagina nuova).
    const [l0, l1, l2, l3] = RE_LIBRI;
    this.libri.setAttribute('opacity', (seg(t, l0, l1) * (1 - seg(t, l2, l3))).toFixed(3));
    let k = 0, gira = 1;
    RE_PAGINE.forEach((p, i) => { if (t >= p[2]) k = i; if (i > 0) gira = Math.min(gira, Math.abs(t - p[2]) / RE_GIRA); });
    const [a, b] = RE_PAGINE[k], sx = (0.25 + 0.75 * eio(Math.min(1, gira))).toFixed(3);
    this.cambia('sx', a, this.sx, '<g transform="translate(540 560) scale(5.6) translate(-120 -262)">' + G.libroAperto(120, 262, a) + '</g>');
    this.cambia('dx', b, this.dx, '<g transform="translate(1380 560) scale(5.6) translate(-120 -262)">' + G.libroAperto(120, 262, b, this.verde) + '</g>');
    this.sx.setAttribute('transform', 'translate(540 0) scale(' + sx + ' 1) translate(-540 0)');
    this.dx.setAttribute('transform', 'translate(1380 0) scale(' + sx + ' 1) translate(-1380 0)');
    this.sub(t);
  },
});
