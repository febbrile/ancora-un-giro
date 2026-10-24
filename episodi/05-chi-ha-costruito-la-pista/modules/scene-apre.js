const { seg, eo, ei, eio, lerp } = kit;
// Le ultime notti: i brividi corrono ancora, ma i binari si piegano sempre meno, finché restano fermi e lucidi. Uno dopo
// l'altro, i treni grigi vanno sul binario morto dietro la stazione e spengono il fanale. Sulla pista arriva il trenino
// color crema. Le luci del parco si accendono per la prima volta, tutte insieme: la ruota, i tendoni, le lucine. In città
// si accendono le prime finestre, e in una casa qualcuno prende in mano il telefono: lo schermo si accende.
// Si apre sulla vasca e sul ponte (come finisce «finestre»); finisce sul telefono acceso (lo riprende «oggi»).
const AP_CAM = [
  { t: 0, cx: 860, cy: 820, z: 3.4 },
  // Stacco sul binario morto, in fondo alla banchina lunga; poi stacco sul parco intero.
  { t: 6.4, cx: 860, cy: 820, z: 3.4 },
  { t: 6.41, cx: -1620, cy: 740, z: 1.35 },
  { t: 12.8, cx: -1470, cy: 740, z: 1.35 },
  { t: 12.81, cx: 880, cy: 560, z: 1.0 },
  { t: 17.4, cx: 900, cy: 540, z: 1.03 },
];
// Gli ultimi brividi: quando partono, di che colore (le lanterne di prima), e di quanto tremano ancora i binari.
const AP_BRIVIDI = [0.4, 1.7, 3.0, 4.3];
// I treni grigi vanno a dormire: quando parte ognuno (il primo va più lontano), e da dove lungo il binario morto
// (sulla banchina, appena fuori dall'inquadratura).
const AP_DORMIRE = [6.6, 8.0, 9.4], AP_CORSA = 2.6, AP_DA = 1448;
const AP_CREMA = [11.6, 14.0], AP_ACCENDE = 14.2;
const AP_CITTA = [17.2, 17.8, 19.6, 20.0], AP_TELEFONO = 20.4;
const AP_ONDA = 'M 772 796 L 846 796 C 888 796 910 818 962 818 L 996 818';
kit.scene('apre', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.addestramento.momenti, N = G.MOD.parco.nuovo, C = G.C;
    const blu = G.MOD.mare.nuovo.nuota;
    this.colori = [blu, N.gioca, N.corre, blu];
    // Quanto si piega ancora la pista in una notte, rispetto alla notte 80: sempre meno, poi niente.
    const p0 = A[1].piega_notte;
    this.trema = [A[1].piega_notte / p0, A[2].piega_notte / p0, 0.5 * (A[2].piega_notte + A[3].piega_notte) / p0, A[3].piega_notte / p0];
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    const onde = AP_BRIVIDI.map(() => '<path class="ap-onda" d="' + AP_ONDA + '" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>').join('');
    const crema = [{ tipo: '' }, { tipo: '' }, { tipo: '' }];
    const sopra = '<path class="ap-p-morto" d="' + M.morto + '" fill="none"/>' +
      '<path class="ap-pieghe" ' + binario + '/>' +
      '<path class="ap-luccica" d="' + M.arrivo + '" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0" filter="url(#g-glow)"/>' + onde +
      '<g class="ap-dormono">' + G.treniCheDormono(1) + '</g>' +
      '<g class="ap-crema" opacity="0">' + G.treno(crema, { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>';
    // La città e una casa: le finestre si accendono; il telefono, preso in mano, si accende.
    const tel = '<g class="ap-tel">' + G.telefono({ cursore: true }) + '</g><rect class="ap-spento" x="16" y="16" width="328" height="668" rx="36" fill="#0B0D18"/>';
    const davanti = '<rect class="ap-lampo" x="-200" y="-200" width="2320" height="1480" fill="#FFF4DA" opacity="0"/>' +
      '<g class="ap-citta" opacity="0">' + G.cittaDiNotte(23) + '</g>' +
      '<g class="ap-casa" opacity="0">' + G.salotto(tel, { muro: ['#2E2440', '#4A3858', '#5C4A70'] }) + '</g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'apre', morto: true, spento: 1, banchina: true, manopola: 0, davanti,
      html: G.sottotitolo('NARRATORE', 'Notte dopo notte, la pista si piegava sempre meno. Poi i treni di prova andarono a dormire, e il parco si accese.') +
        G.sottotitolo('NARRATORE', 'Da quella sera, la pista non si è più piegata.'),
    });
    const m = this.m;
    this.G = G;
    // Le paperelle dell'ultimo treno di prova scivolano via dallo scarico.
    this.lista = G.papereVasca(G.MOD.mare.vasca);
    m.q('.g-vasca').insertAdjacentHTML('beforeend', this.lista.map((p, i) => '<g class="ap-pap"><g transform="translate(-50 -84)">' + G.paperella(p.col) + '</g></g>').join(''));
    this.pap = m.qa('.ap-pap');
    this.pieghe = m.q('.ap-pieghe'); this.pista = G.pieghePista(m); this.statoPiega = '';
    this.luccica = m.q('.ap-luccica'); this.lArrivo = m.arrivo.getTotalLength();
    this.onde = m.qa('.ap-onda'); this.lOnda = this.onde[0].getTotalLength();
    this.onde.forEach((el, k) => el.setAttribute('stroke', this.colori[k]));
    this.morto = m.q('.ap-p-morto');
    this.dormono = m.qa('.ap-dormono .g-dorme').map(g => [...g.querySelectorAll('.g-vag')]);
    this.crema = m.qa('.ap-crema .g-vag'); this.cremaG = m.q('.ap-crema');
    this.luci = m.qa('.g-luce-parco'); this.lucine = m.qa('.ap-crema .g-lucina');
    this.bancone = m.q('.g-bancone'); this.lampo = m.q('.ap-lampo');
    this.citta = m.q('.ap-citta'); this.casa = m.q('.ap-casa'); this.spento = m.q('.ap-spento');
    this.finestrelle = m.qa('.ap-citta .g-finestrella');
    const r = G.rng(9);
    this.finestrelle.forEach(f => { f.dataset.quando = (r() * 1.6).toFixed(2); f.dataset.acc = r() < 0.35 ? 1 : 0; });
    this.fanale = [];
    this.sub = G.subs(kit, [[0.8, 10.6], [14.8, 19.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'apre', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(AP_CAM, t));
    // La ruota gira solo da quando il parco si accende.
    const parte = Math.max(0, t - AP_ACCENDE);
    m.ruota.setAttribute('transform', 'rotate(' + (2 * parte * parte / (1 + parte)).toFixed(2) + ')');
    this.pap.forEach((el, i) => {
      const p = this.lista[i], via = eio(seg(t, 0.4 + (i % 7) * 0.12, 2.0 + (i % 7) * 0.12)), a = via * 2.4 + i;
      el.setAttribute('transform', 'translate(' + lerp(p.x, 772 + 8 * Math.cos(a), via).toFixed(2) + ' ' + lerp(p.y + 1.2 * Math.sin(t * 2.2 + i), 884, via).toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Gli ultimi brividi: corrono ancora verso la montagna, ma i binari tremano sempre meno, poi stanno fermi.
    let trema = 0;
    this.onde.forEach((el, k) => {
      const a = AP_BRIVIDI[k], u = seg(t, a, a + 1.4);
      G.onda(el, this.lOnda, u, 50);
      el.setAttribute('opacity', (u > 0 && u < 1 ? 0.6 : 0).toFixed(3));
      trema += this.trema[k] * Math.sin(Math.PI * seg(t, a + 0.3, a + 1.5));
    });
    const pg = Math.round((1 + 0.5 * trema * Math.sin(t * 22)) * 50) / 50;
    if (String(pg) !== this.statoPiega) { this.pieghe.setAttribute('d', this.pista.d(pg, 2.2)); this.statoPiega = String(pg); }
    // Fermi e lucidi: un riflesso corre sul ponte.
    const ul = seg(t, 5.0, 7.0);
    G.onda(this.luccica, this.lArrivo, ul, 60);
    this.luccica.setAttribute('opacity', (ul > 0 && ul < 1 ? 0.8 : 0).toFixed(3));
    // I treni grigi vanno sul binario morto, uno dopo l'altro, e spengono il fanale.
    this.dormono.forEach((v, k) => {
      const j = 2 - k, a = AP_DORMIRE[j], u = eio(seg(t, a, a + AP_CORSA));
      G.posaTreno(v, this.morto, lerp(AP_DA, G.DORMONO[k], u), M.scala, M.passoBanchina);
      v.forEach(el => el.setAttribute('opacity', (t < a ? 0 : seg(t, a, a + 0.4)).toFixed(3)));
      const f = Math.round((1 - seg(t, a + AP_CORSA + 0.2, a + AP_CORSA + 0.8)) * 10) / 10;
      if (this.fanale[k] !== f) {
        const el = v[0].querySelector('.g-vag-in'), pass = el.querySelector('.g-pass');
        el.innerHTML = G.vagone({ primo: true, sbarra: 1, grigio: true, fanale: f }, pass.outerHTML);
        this.fanale[k] = f;
      }
    });
    // Il trenino color crema arriva in stazione; poi il parco si accende, tutto insieme.
    const sc = lerp(300, this.lArrivo - (M.fermo - 40), eio(seg(t, AP_CREMA[0], AP_CREMA[1])));
    G.posaTreno(this.crema, m.arrivo, sc, M.scala, M.passoBanchina);
    this.cremaG.setAttribute('opacity', seg(t, AP_CREMA[0], AP_CREMA[0] + 0.5).toFixed(3));
    const luce = seg(t, AP_ACCENDE, AP_ACCENDE + 0.25);
    this.luci.forEach(el => el.setAttribute('opacity', luce.toFixed(3)));
    this.lucine.forEach(el => el.style.opacity = luce);
    this.bancone.setAttribute('opacity', luce.toFixed(3));
    this.lampo.setAttribute('opacity', (0.22 * Math.max(0, 1 - Math.abs(t - AP_ACCENDE - 0.15) / 0.35)).toFixed(3));
    // La città: le prime finestre si accendono. Poi una casa, e il telefono.
    const [c0, c1, c2, c3] = AP_CITTA;
    this.citta.setAttribute('opacity', (seg(t, c0, c1) * (t < c3 ? 1 : 0)).toFixed(3));
    this.finestrelle.forEach(f => f.style.opacity = +f.dataset.acc ? seg(t, c1 + +f.dataset.quando, c1 + +f.dataset.quando + 0.15) : 0);
    this.casa.setAttribute('opacity', seg(t, c2, c3).toFixed(3));
    this.spento.setAttribute('opacity', (1 - eo(seg(t, AP_TELEFONO, AP_TELEFONO + 0.5))).toFixed(3));
    this.sub(t);
  },
});
