const { seg, eo, eio, lerp } = kit;
// La paperella rosa corre a sedersi in fondo al treno. Il custode guarda l'orologio: la lancetta è arrivata in cima. Tira la
// cordicella, e la campanella suona: drin. Il treno resta fermo in stazione, con la paperella rosa nell'ultimo vagone. I
// vestiti sono tornati del colore dei biglietti, e il fanale si abbassa (non si spegne: la stazione si spegne solo con la
// Fine). Sul telefono: «nuota e gioca e». I tre puntini spariscono.
// Si apre alla bancarella (come finisce «giri»); finisce sul custode con l'orologio (la riprende «continua»).
const CA_DOPO = 26; // il giro è quello dell'ultima pesca di «giri»: continua da lì
const CA_GIRO = { esce: 17.0 - CA_DOPO, vel: [[17.0, 700], [18.4, 700], [18.8, 90], [20.2, 90], [20.6, 400]].map(([a, v]) => [a - CA_DOPO, v]),
  pesca: { giu: 20.4 - CA_DOPO, su: 21.1 - CA_DOPO, preso: 21.4 - CA_DOPO }, via: 21.8 - CA_DOPO, salta: 0.4, vagone: 0.8, sale: 1.8 };
const CA_OROLOGIO = [3.0, 3.4, 9.4, 9.8], CA_TIRA = [5.6, 6.2], CA_DRIN = 6.2;
const CA_FANALE = [11.0, 12.4];
const CA_CASA = [13.2, 13.6, 18.4, 18.8], CA_PUNTINI = 15.6;
const CA_CU = [436, 836];
const CA_CAM = [
  { t: 0, cx: 640, cy: 830, z: 3.0 },
  { t: 2.4, cx: 560, cy: 800, z: 2.8 },
  { t: 9.8, cx: 120, cy: 790, z: 1.6 },
  { t: 10.6, cx: -340, cy: 800, z: 3.2 },
  { t: 13.0, cx: -340, cy: 800, z: 3.2 },
  { t: 18.8, cx: 440, cy: 790, z: 4.2 },
];
kit.scene('campanella', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, K = G.MOD.seconda.campanella, g = K.giri[3];
    const bigl = {};
    K.seguito[0].passeggeri.forEach(p => { bigl[p.parola] = p.biglietto; });
    this.chi = S2.trenoDa(g.frase, g.tratti);
    this.giro = G.giro7({ id: 'ca', chi: this.chi, vasca: g.vasca, seme: 225, parola: g.pescata, nuovo: bigl[g.pescata], fermo: G.fermoTreno(g.frase.length + 1), t: CA_GIRO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="ca-ada"></g><g class="ca-cu"></g>' + this.giro.mano;
    const fondo = '<rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/><circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>';
    const orologio = '<g class="ca-orologio" opacity="0">' + fondo + '<g transform="translate(960 640) scale(2.6)"><g class="ca-quadrante"></g></g></g>';
    const casa = '<g class="ca-casa" opacity="0"><g class="ca-casa-cam">' + G.salotto('<g class="ca-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'campanella', manopola: 0, banchina: true, morto: true, davanti: orologio + casa,
      html: G.sottotitolo('NARRATORE', 'All’ultimo giro il custode suona la campanella. E il treno si ferma, anche a metà frase.') +
        G.sottotitolo('CUSTODE', 'Il regolamento non legge le storie: conta i giri.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.ca-ada'); this.cu = q('.ca-cu'); this.orologio = q('.ca-orologio'); this.quadrante = q('.ca-quadrante');
    this.casa = q('.ca-casa'); this.casaCam = q('.ca-casa-cam'); this.tel = q('.ca-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[3.2, 10.6], [19.0, 23.2]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'campanella', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CA_CAM, t));
    G.animaMondo(m, t + 2070);
    const r = this.giro.render(t);
    // Il fanale del primo vagone si abbassa (non si spegne).
    const fan = Math.round((1 - 0.7 * eio(seg(t, CA_FANALE[0], CA_FANALE[1]))) * 10) / 10;
    if (String(fan) !== this.stati.fan) {
      const c = this.chi[0];
      this.giro.vag[0].querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: fan }, '<g class="g-pass">' + G.passeggero(c.tipo, c.biglietto, c.o) + '</g>');
      this.stati.fan = String(fan);
    }
    // L'orologio da vicino: la lancetta in cima; la cordicella tirata; drin.
    const [o0, o1, o2, o3] = CA_OROLOGIO;
    this.orologio.setAttribute('opacity', (seg(t, o0, o1) * (1 - seg(t, o2, o3))).toFixed(3));
    const tira = eio(seg(t, CA_TIRA[0], CA_TIRA[1])) * (1 - eio(seg(t, CA_DRIN + 0.4, CA_DRIN + 1.2)));
    const suona = Math.round(22 * Math.sin((t - CA_DRIN) * 20) * (t > CA_DRIN ? Math.exp(-(t - CA_DRIN) * 1.4) : 0));
    if (t > o0 && t < o3) this.cambia('q', tira.toFixed(2) + suona, this.quadrante, S2.orologio({ lancetta: 1, tira, suona }));
    // Il custode: guarda l'orologio, lo fa suonare; poi parla.
    const posa = t < 18.8 ? 'orologio' : 'base';
    this.cambia('cu', posa + suona, this.cu, '<g transform="' + G.posaCustode(CA_CU[0], CA_CU[1]) + '">' + G.unico(G.custode(posa, 'serio', { occhi: t < 18.8 ? 0 : 1, campanella: true, lancetta: 1, suona }), 'cacu') + '</g>');
    // Ada guarda la paperella che corre, poi il treno fermo.
    const espr = t < 2 ? 'felice' : t < 7 ? 'base' : 'sorpresa';
    this.cambia('ada', espr, this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>');
    // Il telefono: la storia a metà; i puntini spariscono.
    const [c0, c1, c2, c3] = CA_CASA;
    this.casa.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const puntini = t < CA_PUNTINI ? t : undefined;
      this.cambia('tel', puntini === undefined ? 'fermo' : (Math.round(t * 30) / 30).toFixed(3), this.tel, G.unico(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', 'nuota e gioca e']], puntini }), 'catel'));
      const z = lerp(1.1, 1.2, seg(t, c0, c3)), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
