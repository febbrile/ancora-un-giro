const { seg, eo, eio, lerp } = kit;
// Il salotto, il telefono, la frase scritta e inviata. La camera finisce stretta sul messaggio (la riprende «volo»).
const INVIO_FRASE = 'Al mare Emma';
const INVIO_PREMI = 16.0;

kit.scene('invio', {
  init(kit) {
    const G = window.G, C = G.C;
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs +
      '<g class="invio-cam">' + G.salotto(
        '<g class="invio-a"></g>' +
        '<rect class="invio-luce" x="66" y="458" width="270" height="84" rx="36" fill="' + C.luce + '" opacity="0" filter="url(#g-glow)"/>' +
        '<g class="invio-b" opacity="0">' + G.bolle([INVIO_FRASE]) + '</g>') +
      '<g class="invio-pollice"><path d="M0 0 L150 190" stroke="' + C.pelle + '" stroke-width="58" stroke-linecap="round"/><path d="M0 0 L150 190" stroke="' + C.pelleScura + '" stroke-width="58" stroke-linecap="round" opacity=".18" transform="translate(4 4)"/><ellipse cx="2" cy="4" rx="16" ry="12" fill="#F6CDB6" transform="rotate(38 2 4)"/></g>' +
      '</g></svg>' +
      G.sottotitolo('NARRATORE', 'Lo fai anche tu: scrivi a una chat, premi invio, e la risposta arriva una parola dopo l’altra. Chi la scrive?') +
      G.sottotitolo('NARRATORE', 'Stasera qualcuno comincia una storia, e chiede alla chat di continuarla.') + '</div>', 'invio')));
    const q = s => kit.stage.querySelector(s);
    this.G = G;
    this.cam = q('.invio-cam'); this.a = q('.invio-a'); this.b = q('.invio-b'); this.luce = q('.invio-luce'); this.pollice = q('.invio-pollice');
    this.typ = kit.typist(INVIO_FRASE, 10.6, 2.6, 5);
    this.stato = '';
    this.sub = G.subs(kit, [[0.8, 10.0], [10.4, 16.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('00', 'invio', t);
    const G = this.G;
    // Camera: si avvicina piano al messaggio.
    const z = lerp(1, 1.16, eio(seg(t, 16.5, 21)));
    const [bx, by] = G.SALOTTO.bolla;
    this.cam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    // Il telefono mentre si scrive (si ridisegna solo quando cambia).
    const scritto = t < INVIO_PREMI + 0.15 ? this.typ.at(t) : '';
    const cursore = t > 1.2 && t < INVIO_PREMI && Math.floor(t / 0.53) % 2 === 0;
    const premuto = t > INVIO_PREMI - 0.05 && t < INVIO_PREMI + 0.3;
    const chiave = scritto + '|' + cursore + '|' + premuto;
    if (chiave !== this.stato) { this.a.innerHTML = G.telefono({ scritto, cursore, premuto }); this.stato = chiave; }
    const inviato = eo(seg(t, INVIO_PREMI + 0.15, INVIO_PREMI + 0.5));
    this.b.setAttribute('opacity', inviato.toFixed(3));
    // La bolla appena inviata brilla, sempre di più.
    this.luce.setAttribute('opacity', ((0.15 + 0.55 * eio(seg(t, 17.5, 21)) + 0.1 * Math.sin(t * 3)) * inviato).toFixed(3));
    // Il pollice: a riposo in basso a destra, scende sul tasto di invio e torna indietro.
    const giu = eio(seg(t, INVIO_PREMI - 0.8, INVIO_PREMI)) * (1 - eio(seg(t, INVIO_PREMI + 0.3, INVIO_PREMI + 1.1)));
    const px = lerp(1200, G.SALOTTO.tel[0] + 300 * G.SALOTTO.s, giu), py = lerp(960, G.SALOTTO.tel[1] + 626 * G.SALOTTO.s, giu) + 320 * eio(seg(t, 17.2, 19));
    this.pollice.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')');
    this.sub(t);
  },
});
