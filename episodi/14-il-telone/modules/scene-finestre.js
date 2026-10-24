const { seg, eo, eio, lerp } = kit;
// Dentro la montagna, nel buio. Il telone resta fuori, sulla banchina, piegato sul braccio del custode: dentro, i
// passeggeri sono tutti scoperti. Nell'ultimo vagone c'è la paperella arancio scura. Si accendono i fili: i suoi più forti
// tornano indietro lungo il treno, fino alla paperella grigia e a quella verde oliva, quelle che stavano sotto il telone
// (pesi dichiarati nel modellino). Clac, clac, clac. La finestra sull'acqua: prima paperelle di luce di tutti i colori,
// appena più grigie; poi le grigie sono il doppio delle altre; all'ultima, da vicino, quasi tutte grigie, il colore di Al.
// Si apre nel buio (il treno è appena entrato); finisce nella luce dell'uscita (la riprende «risposta»).
kit.scene('finestre', {
  init(kit) {
    const G = window.G, S2 = G.S2, g = G.MOD.seconda.telone.giusta.giri[4];
    const chi = S2.trenoDa(g.frase, g.tratti);
    this.dentro = S2.dentro(kit, { pre: 'finestre', chi, fili: j => g.fili[g.frase[j] + '·' + j] || 0, finestre: g.finestre, seme: 261,
      html: G.sottotitolo('NARRATORE', 'Dentro la montagna il telone non c’è: i fili arrivano anche ai passeggeri che il telefono non vede.') +
        G.sottotitolo('NARRATORE', 'E finestra dopo finestra, le paperelle di luce si fanno grigie, come Al.') });
    this.sub = G.subs(kit, [[1.6, 10.2], [27.4, 34.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('14', 'finestre', t);
    this.dentro.render(t);
    this.sub(t);
  },
});
