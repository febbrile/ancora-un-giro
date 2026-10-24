const { seg, eo, ei, eio, lerp } = kit;
// La camera si alza sul parco e il tempo corre all'indietro: Ada svanisce (non c'era), la luna attraversa il cielo al
// contrario una notte dopo l'altra, la ruota gira all'indietro, le luci si spengono una dopo l'altra, i binari si
// raddrizzano, i treni grigi lasciano il binario morto e il bancone sparisce. Il parco è buio e chiuso. Sulla pista, al
// posto del trenino color crema, ci sono i treni grigi, nuovi e lucidi, col fanale acceso.
// Si apre come finisce «domanda»; finisce sul parco buio con i treni grigi (lo riprende «prova»).
const IN_CAM = [
  { t: 0, cx: 420, cy: 640, z: 1.5 },
  { t: 0.6, cx: 420, cy: 640, z: 1.5 },
  { t: 3.4, cx: 900, cy: 480, z: 0.95 },
  { t: 11.0, cx: 900, cy: 480, z: 0.95 },
  { t: 14.0, cx: 760, cy: 560, z: 1.15 },
];
// Il riavvolgimento: quando comincia e quando finisce; quante notti torna indietro la luna.
const IN_INDIETRO = [3.2, 10.6], IN_NOTTI = 4;
const IN_ADA = [2.6, 4.4];
const IN_GRIGI = [10.2, 11.8];
// I treni grigi della notte di prova: uno sul viadotto, carico, vicino alla montagna, e uno vuoto in stazione.
const IN_TRENI = [3816, 490];
kit.scene('indietro', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.parco.passeggeri;
    const carico = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'parco', col: P.parco.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }];
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    // Un riflesso sui vagoni nuovi: sono lucidi.
    const lucido = '<path d="M30 72 L70 72 L52 126 L14 126 Z M84 72 L96 72 L78 126 L66 126 Z" fill="#FFFFFF" opacity=".22"/>';
    const sopra = '<path class="in-p-morto" d="' + M.morto + '" fill="none"/>' +
      '<path class="in-pieghe" ' + binario + '/>' +
      '<g class="in-dormono" opacity=".9">' + G.treniCheDormono() + '</g>' +
      IN_TRENI.map((s, n) => '<g class="in-grigio" data-n="' + n + '" opacity="0">' + G.treno(n ? [{}, {}, {}] : carico, { grigio: true, fanale: 1, sbarra: 1 }) + '</g>').join('') +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="in-ada"><g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('quaderno', 'pensa') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'indietro', morto: true, manopola: 0, banchina: true,
      davanti: '<rect class="in-velo" x="-200" y="-200" width="2320" height="1480" fill="#C9D4FF" opacity="0"/>',
      html: G.sottotitolo('NARRATORE', 'Ada non c’era. Noi, questa volta, torniamo indietro: a prima che il parco aprisse.'),
    });
    this.G = G;
    const m = this.m;
    this.ada = m.q('.in-ada'); this.luna = m.q('.g-luna'); this.bancone = m.q('.g-bancone'); this.velo = m.q('.in-velo');
    this.dormono = m.q('.in-dormono');
    G.dormono(m.q('.in-p-morto'), this.dormono, true);
    this.grigi = m.qa('.in-grigio');
    this.grigi.forEach((g, n) => {
      const v = [...g.querySelectorAll('.g-vag')];
      G.posaTreno(v, m.partenza, IN_TRENI[n], M.scala, M.passoBanchina);
      v.forEach(el => el.querySelector('.g-vag-in').insertAdjacentHTML('beforeend', lucido));
    });
    // Le luci del parco si spengono da destra a sinistra, una dopo l'altra.
    this.luci = m.qa('.g-luce-parco').map(el => ({ el, x: +(el.getAttribute('cx') || 0) + (el.closest('.g-ruota') ? M.ruota[0] : 0) }));
    const xs = this.luci.map(l => l.x), x0 = Math.min(...xs), x1 = Math.max(...xs);
    this.luci.forEach((l, k) => { l.quando = 1 - (l.x - x0) / (x1 - x0 || 1) + 0.05 * Math.sin(k * 7.3); });
    // Le pieghe: tornando indietro, la pista si raddrizza.
    this.pieghe = m.q('.in-pieghe'); this.pista = G.pieghePista(m);
    this.statoPiega = -1;
    this.sub = G.subs(kit, [[3.0, 10.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'indietro', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(IN_CAM, t));
    // Quanto è andato indietro il tempo (0..1), con le notti che corrono sempre più in fretta.
    const u = ei(seg(t, IN_INDIETRO[0], IN_INDIETRO[1])) * 0.7 + 0.3 * eio(seg(t, IN_INDIETRO[0], IN_INDIETRO[1]));
    // La ruota: girava avanti, rallenta, gira all'indietro sempre più forte, poi si ferma.
    const giro = (t + 925) * 4 - 900 * u;
    m.ruota.setAttribute('transform', 'rotate(' + giro.toFixed(2) + ')');
    // La luna torna indietro, da destra a sinistra, una notte dopo l'altra.
    const notti = u * IN_NOTTI, v = notti - Math.floor(notti);
    let lx = 0, ly = 0;
    if (u > 0 && u < 1) { const x = lerp(2200, -400, v), y = 520 - 420 * Math.sin(Math.PI * v); lx = x - 1530; ly = y - 150; }
    else if (u >= 1) { lx = -190; ly = 10; }
    this.luna.setAttribute('transform', 'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ')');
    // Un velo di luce chiara, leggero, mentre il tempo corre: il cielo lampeggia a ogni notte.
    this.velo.setAttribute('opacity', (u > 0 && u < 1 ? 0.05 + 0.05 * Math.sin(notti * Math.PI * 2) : 0).toFixed(3));
    // Ada non c'era: svanisce.
    const a = 1 - eio(seg(t, IN_ADA[0], IN_ADA[1]));
    this.ada.setAttribute('opacity', a.toFixed(3));
    this.ada.setAttribute('transform', 'translate(0 ' + (-10 * (1 - a)).toFixed(1) + ')');
    // Il bancone e i treni grigi del binario morto spariscono; le luci si spengono.
    this.bancone.setAttribute('opacity', (1 - seg(u, 0.25, 0.4)).toFixed(3));
    this.dormono.setAttribute('opacity', (0.9 * (1 - seg(u, 0.15, 0.35))).toFixed(3));
    this.luci.forEach(l => l.el.setAttribute('opacity', (1 - seg(u, 0.35 + 0.5 * l.quando, 0.4 + 0.5 * l.quando)).toFixed(3)));
    // I binari si raddrizzano.
    const pg = Math.round((1 - seg(u, 0.3, 0.95)) * 40) / 40;
    if (pg !== this.statoPiega) { this.pieghe.setAttribute('d', this.pista.d(pg, 2.2)); this.statoPiega = pg; }
    // I treni grigi compaiono sulla pista, nuovi.
    this.grigi.forEach((g, n) => g.setAttribute('opacity', eo(seg(t, IN_GRIGI[0] + 0.4 * n, IN_GRIGI[1] + 0.4 * n)).toFixed(3)));
    this.sub(t);
  },
});
