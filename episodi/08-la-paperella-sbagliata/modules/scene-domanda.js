const { seg, eo, eio, lerp } = kit;
// Notte al luna park. Il trenino color crema aspetta vuoto in stazione; dietro la stazione, sul binario morto, dormono i
// treni di prova: grigi, senza vernice e senza lucine, col fanale spento. Accanto all'ultimo, seduta su una pila di
// traversine, c'è Ada, col quaderno sulle ginocchia e in mano la striscia arrivata l'altra volta, ancora arrotolata.
// Guarda i treni grigi, poi la montagna accesa. Titolo: «La paperella sbagliata».
// Si apre sul parco intero e corre lungo la banchina fino al binario morto; quando Ada si gira, uno stacco su quello che
// guarda: la montagna accesa, dove arriva il titolo.
const DM_CAM = [
  { t: 0, cx: 760, cy: 560, z: 1.05 },
  { t: 1.2, cx: 760, cy: 560, z: 1.05 },
  { t: 7.4, cx: -1698, cy: 770, z: 2.1 },
  { t: 10.4, cx: -1518, cy: 780, z: 3.4 },
  { t: 13.6, cx: -1518, cy: 780, z: 3.4, da: 13.59 },
  { t: 13.61, cx: 700, cy: 600, z: 1.25, da: 13.6 },
  { t: 17.4, cx: 520, cy: 620, z: 1.1 },
];
// Ada, seduta sulle traversine accanto all'ultimo vagone grigio.
const DM_ADA = [-1463, 835];
const DM_GIRA = 11.0;
const DM_TITOLO = 17.6;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO;
    // Il trenino color crema, vuoto, in stazione: sei vagoni attaccati, come serviranno stasera.
    const vuoto = G.treno([{}, {}, {}, {}, {}, {}], { sbarra: 0 });
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 300)"><g class="dm-insegna"></g></g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-vuoto">' + vuoto + '</g>' + G.treniDormono() + '<g class="dm-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', morto: true, banchina: true, manopola: 0, davanti: titolo,
      html: G.sottotitolo('NARRATORE', 'Dietro la stazione dormono i treni di prova. Sono loro che, tanto tempo fa, hanno piegato la pista.') +
        G.sottotitolo('ADA', 'E se nessun treno di prova ha mai portato la risposta?'),
    });
    this.G = G;
    G.posaTreno(this.m.qa('.dm-vuoto .g-vag'), this.m.partenza, 490, M.scala, M.passoBanchina);
    this.ada = this.m.q('.dm-ada');
    this.titolo = this.m.q('.dm-titolo'); this.insegna = this.m.q('.dm-insegna');
    this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 9.8], [12.4, 17.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 900);
    // Ada guarda i treni grigi (la testa piegata verso di loro), poi si gira verso la montagna accesa e pensa.
    const gira = eio(seg(t, DM_GIRA, DM_GIRA + 1.2));
    const ang = Math.round((lerp(-9, 8, gira) + 1.5 * Math.sin(t * 1.3)) * 2) / 2;
    const espr = t < DM_GIRA + 0.6 ? 'base' : 'pensa';
    const k = espr + ang;
    if (k !== this.statoAda) {
      const rotolo = '<g transform="translate(100 236) rotate(-8) scale(.5)">' + G.rotolo() + '</g>';
      this.ada.innerHTML = '<g transform="' + G.posaAda(DM_ADA[0], DM_ADA[1]) + '">' + G.adaSeduta('quaderno', espr, { testa: ang }) + rotolo + '</g>';
      this.statoAda = k;
    }
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('La paperella sbagliata', 1300, 220, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
