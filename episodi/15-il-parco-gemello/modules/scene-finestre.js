const { seg, eo, eio, lerp } = kit;
// Dentro la montagna del parco gemello: è la stessa montagna, nel buio. Il treno è più lungo davanti (la bandierina d'oro,
// Storie, Di, Parco), ma Al, Mare ed Emma hanno i vestiti di sempre. Si accendono i fili della bandierina d'ottone: arrivano
// anche a Parco, che porta il verde. Clac, clac, clac. Le finestre sull'acqua: le paperelle di luce, all'ultima, sono quasi
// metà rosa e metà verdi.
// Si apre nel buio (il treno è appena entrato); finisce nella luce dell'uscita (la riprende «vasca»).
kit.scene('finestre', {
  init(kit) {
    const G = window.G, S2 = G.S2, L = G.MOD.seconda.gemello.laggiu;
    this.dentro = S2.dentro(kit, { pre: 'finestre', chi: S2.treno(L), dopoFili: L.ottone.dopo_fili, fili: j => L.ottone.fili[j], finestre: L.finestre, seme: 301, testa: true,
      html: G.sottotitolo('NARRATORE', 'Dentro, la pista è la stessa, e il treno fa lo stesso giro.') +
        G.sottotitolo('NARRATORE', 'Ma davanti alla bandierina, qui, siede Parco. E i suoi fili portano anche il verde.') });
    this.sub = G.subs(kit, [[1.6, 7.6], [26.8, 34.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('15', 'finestre', t);
    this.dentro.render(t);
    this.sub(t);
  },
});
