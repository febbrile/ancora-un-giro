const { seg, eo, eio, lerp } = kit;
// Ada lascia la bancarella, risale in cima alla collina e si siede nell'erba, col quaderno sulle ginocchia: da una parte
// il suo luna park, piccolo, con la ruota panoramica e il trenino in stazione; dall'altra il parco immenso. Poi la camera
// vola sul parco immenso, un'immagine per ogni nome da grandi (che stanno solo nei sottotitoli): lo Spezzaparole gigante
// e i biglietti che volano sui sedili (token); la montagna, con la sua pista che entra nella prima cima (modello); il
// lago con le paperelle di un treno appena uscito, tantissime di un colore e poche di tutti gli altri (probabilità);
// dietro la stazione, file e file di treni di prova grigi, addormentati (addestramento). Torniamo su Ada, che annuisce.
// Si apre come finisce «lago», su Ada che ride alla bancarella; finisce su Ada seduta in cima (la riprende «quaderno»).
const NM_P = window.G.PARCO;
const NM_CAM = [
  NM_P.chiave(0, 5420, 1035, 3.6),
  NM_P.chiave(1.7, 5400, 1035, 3.6),
  { t: 1.8, cx: 2590, cy: 545, z: 2.2, da: 1.79 },
  { t: 4.6, cx: 2570, cy: 560, z: 2.2 },
  { t: 7.6, cx: 2500, cy: 500, z: 0.4 },
  { t: 13.6, cx: 2520, cy: 500, z: 0.42 },
  { t: 15.4, cx: 2560, cy: 545, z: 2.3 },
  { t: 19.8, cx: 2560, cy: 545, z: 2.4 },
  NM_P.chiave(21.6, 160, 800, 1.35),
  NM_P.chiave(25.6, 260, 800, 1.35),
  NM_P.chiave(27.6, 2750, 720, 0.9),
  NM_P.chiave(31.8, 2850, 730, 0.95),
  NM_P.chiave(33.8, 6200, 1030, 1.2),
  NM_P.chiave(40.0, 6150, 1030, 1.25),
  NM_P.chiave(41.1, 2600, 700, 0.32),
  NM_P.chiave(42.6, -1150, 880, 1.6),
  NM_P.chiave(48.4, -1050, 880, 1.7),
  { t: 48.6, cx: 2560, cy: 548, z: 2.8, da: 48.59 },
  { t: 50, cx: 2560, cy: 548, z: 2.9 },
];
const NM_VIA = [0.6, 1.8];
const NM_SALE = [1.8, 3.8], NM_SIEDE = [3.8, 4.6];
const NM_CIMA = [2550, 558], NM_DA = [2720, 618];
// Il treno appena uscito sopra il lago: Al, Mare ed Emma, fermi oltre la riva (la testa).
const NM_TESTA = 5078;
kit.scene('nomi', {
  init(kit) {
    const G = window.G, D = G.MOD.grande, A = G.MOD.mare;
    // Il trenino di Ada, in stazione nel suo parco.
    const piccolo = [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }];
    const prato = '<path d="M2462 650 C2486 572 2520 560 2550 560 C2580 560 2614 572 2638 650 Z" fill="#1F2258"/>' +
      '<path d="M2478 600 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2 M2530 578 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2 M2590 590 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>';
    this.m = G.costruisciPaesaggio(kit, '<g class="nm-trenino">' + G.treno(piccolo, { sbarra: 0 }) + '</g>' +
      '<g transform="' + G.posa(G.MONDO.spezzaparole[0], G.MONDO.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="nm-ada"></g><g class="nm-prato" opacity="0">' + prato + '</g>', {
      pre: 'nomi', laggiu: 1, manopola: 0, banchina: true, morto: true, treni: true,
      html: G.sottotitolo('NARRATORE', 'Il parco di Ada è un parco giocattolo, fatto apposta per guardarci dentro. Le chat di tutti i giorni fanno il giro in parchi come quello laggiù.') +
        G.sottotitolo('NARRATORE', 'E fuori dal luna park, le sue cose hanno un nome da grandi.') +
        G.sottotitolo('NARRATORE', 'I biglietti si chiamano token.') +
        G.sottotitolo('NARRATORE', 'La montagna, con la sua pista, è il modello.') +
        G.sottotitolo('NARRATORE', 'Quante paperelle cadono di ogni colore: è la probabilità di ogni parola.') +
        G.sottotitolo('NARRATORE', 'E il tempo dei treni di prova, che hanno piegato la pista, si chiama addestramento.'),
    });
    this.G = G;
    const q = this.m.q;
    G.posaTreno(this.m.qa('.nm-trenino .g-vag'), this.m.arrivo, this.m.arrivo.getTotalLength() - (G.MONDO.fermo - 40));
    this.m.qa('.nm-trenino .g-lucina').forEach(l => l.setAttribute('opacity', 0.3));
    // Il lago: le paperelle di un treno appena uscito, e il treno, fermo oltre la riva.
    const lista = G.papereLago(D.lago, 43);
    q('.pi-papere').innerHTML = lista.map((p, i) => i).sort((a, b) => lista[a].y - lista[b].y)
      .map(i => '<use href="#nomi-g-pi-papv" fill="' + lista[i].col + '" transform="translate(' + lista[i].x.toFixed(1) + ' ' + lista[i].y.toFixed(1) + ') scale(.16) translate(-50 -84)"/>').join('');
    q('.pi-ritorno').insertAdjacentHTML('beforeend', '<g class="nm-treno">' + G.treno([{ tipo: 'al', col: D.uscita.Al }, { tipo: 'mare', col: D.uscita.mare }, { tipo: 'emma', col: D.uscita.Emma }], { sbarra: 1 }) + '</g>');
    this.m.qa('.nm-treno .g-vag').forEach((v, i) => v.setAttribute('transform', NM_P.posaVagone(NM_TESTA + i * NM_P.passo, NM_P.ritorno, -1)));
    q('.pi-davanti').insertAdjacentHTML('beforeend', '<g class="nm-ada-lago"></g>');
    this.adaLago = q('.nm-ada-lago');
    this.adaLago.innerHTML = '<g>' + G.ada('quaderno', 'felice') + '</g>';
    this.ada = q('.nm-ada'); this.prato = q('.nm-prato');
    this.stato = '';
    this.sub = G.subs(kit, [[1.0, 14.6], [15.2, 20.2], [21.8, 25.4], [27.6, 31.8], [33.6, 40.2], [41.4, 48.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'nomi', t);
    const G = this.G, m = this.m, [ax, ay] = NM_P.ada;
    m.cam.setAttribute('transform', G.camChiavi(NM_CAM, t));
    G.animaPaesaggio(m, t + 300, { treni: 'andata', biglietti: true });
    // Alla bancarella: Ada si gira e se ne va.
    const uv = seg(t, NM_VIA[0], NM_VIA[1]);
    this.adaLago.firstChild.setAttribute('transform', G.posaAda(lerp(ax, ax - 160, uv), ay - (uv > 0 && uv < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0)));
    this.adaLago.setAttribute('opacity', t < 1.79 ? 1 : 0);
    // In cima alla collina: arriva, si siede nell'erba, ascolta; alla fine annuisce.
    const us = seg(t, NM_SALE[0], NM_SALE[1]), si = eio(seg(t, NM_SIEDE[0], NM_SIEDE[1]));
    const x = lerp(NM_DA[0], NM_CIMA[0], us), y = lerp(NM_DA[1], NM_CIMA[1], us) - (us > 0 && us < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0) + 46 * si;
    const annuisce = t > 48.6 ? 4 * Math.max(0, Math.sin((t - 48.6) * 7)) : t > 15.4 && t < 20 ? 3 * Math.max(0, Math.sin((t - 15.4) * 5)) : 0;
    const espr = t < 4.6 ? 'base' : t < 15.2 ? 'pensa' : t < 48.6 ? 'felice' : 'felice';
    if (espr !== this.stato) { this.ada.innerHTML = '<g class="nm-ada-in">' + G.ada('quaderno', espr) + '</g>'; this.stato = espr; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y + annuisce));
    this.ada.setAttribute('opacity', t < 1.79 ? 0 : 1);
    this.prato.setAttribute('opacity', si.toFixed(3));
    this.sub(t);
  },
});
