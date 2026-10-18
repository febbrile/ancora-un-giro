const { seg, eo, eio, lerp } = kit;
// I binari si aprono in un fascio: ogni vagone corre sul suo. Gli scambi scattano da soli e spostano ogni vagone di poco,
// ognuno per conto suo. Lo scambio di Emma si vede da vicino: nessuna leva tirata. Il vestito di Emma diventa azzurro polvere.
// Si apre come finisce «fili»; finisce sul treno intero, nel fascio (lo riprende «finestre»).
const SC_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 6.4, cx: 960, cy: 560, z: 1 },
  { t: 10.0, cx: 1080, cy: 700, z: 1.75 },
  { t: 20.4, cx: 1080, cy: 700, z: 1.75 },
  { t: 24.0, cx: 960, cy: 560, z: 1 },
];
const SC_VEL = 300;
// Chi, quando, da quale corsia a quale (indici di INTERNO.corsie).
const SC_SCAMBI = [{ i: 0, t: 3.6, da: 2, a: 3 }, { i: 1, t: 4.4, da: 2, a: 1 }, { i: 2, t: 13.0, da: 2, a: 1 }];
kit.scene('scambi', {
  init(kit) {
    const G = window.G, P = G.MOD.mare.passeggeri, C = G.C, I = G.INTERNO;
    this.chi = [['al', P.Al.biglietto, P.Al.tratti[0]], ['mare', P.mare.biglietto, P.mare.tratti[0]], ['emma', P.Emma.dopo_fili, P.Emma.tratti[0]]];
    const scambi = SC_SCAMBI.map((s, k) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="sc-scambio" data-k="' + k + '">' +
        '<path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g class="sc-leva" transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/>' +
        '<g class="sc-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('');
    const linee = '<g class="sc-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<g class="sc-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { corsie: I.corsie }) + '</g></svg>' +
      G.sottotitolo('NARRATORE', 'Poi arrivano gli scambi. Clac, clac, clac: ogni vagone si sposta di poco, ognuno sul suo binario.') +
      G.sottotitolo('NARRATORE', 'Nessuno tira le leve: gli scambi scattano da soli, a seconda di chi passa. Emma resta Emma, ma il suo vestito è più azzurro.') +
      '</div>', 'scambi')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.sc-cam');
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')].slice(0, I.corsie.length);
    this.scambi = [...kit.stage.querySelectorAll('.sc-scambio')];
    this.dischi = [...kit.stage.querySelectorAll('.sc-disco')];
    this.linee = q('.sc-linee');
    this.sub = G.subs(kit, [[0.6, 9.2], [10.8, 21.2]]);
  },
  render(t) {
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(SC_CAM, t));
    G.scorriInterno(kit, SC_VEL * t);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, 0.6 + Math.abs(k - 2) * 0.5, 2.4 + Math.abs(k - 2) * 0.5))).toFixed(3)));
    this.vag.forEach((v, i) => {
      const s = SC_SCAMBI.find(x => x.i === i);
      const p = eio(seg(t, s.t - 0.25, s.t + 0.3));
      const dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      // Il colore: cambia mentre il vagone passa sullo scambio.
      const c = Math.round(eio(seg(t, s.t, s.t + 1.6)) * 16) / 16;
      const pass = G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1], this.chi[i][2], c));
      // Emma, mentre lo scambio la sposta: va avanti, capelli e vestito restano indietro.
      if (i === 2) {
        const tir = Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9));
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(2, 'emma', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 70) + ' ' + hy + ')');
        this.linee.setAttribute('opacity', (0.7 * tir).toFixed(3));
      }
    });
    // Gli scambi arrivano da sinistra (il treno va verso sinistra) e la leva scatta da sola.
    this.scambi.forEach((g, k) => {
      const s = SC_SCAMBI[k], x = I.centri[s.i] - 80 - SC_VEL * (s.t - t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      this.dischi[k].setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    this.sub(t);
  },
});
