const { seg, eo, ei, eio, eob, lerp } = kit;
const FI_SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[116,114]];
const FI_COL = ['#2B2350','#2B2350','#2B2350','#3379E5','#2B2350','#2B2350','#F5C84C','#2B2350','#2B2350','#2B2350','#3379E5','#2B2350','#2B2350','#2B2350','#8A90A8','#2B2350','#2B2350','#2B2350'];
kit.scene('fine', {
  init(kit) {
    const P = window.PZ;
    let palle = ''; FI_SLOT.forEach((s, i) => { palle += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="8" fill="' + FI_COL[i] + '"/>' + (FI_COL[i] === '#2B2350' ? '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="2.5" fill="#FFFFFF"/>' : ''); });
    kit.stage.append(kit.h('<div class="ground" style="background:#F3EADB">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="0" width="760" height="1080" fill="#0B0E1C"/><rect x="200" y="0" width="30" height="1080" fill="#3E4A66"/><rect x="530" y="0" width="30" height="1080" fill="#3E4A66"/>' +
      '<ellipse class="fi-luce" cx="380" cy="900" rx="220" ry="160" fill="#398BE9" opacity=".6" filter="url(#pz-soft)"/><ellipse class="fi-luce" cx="380" cy="520" rx="130" ry="40" fill="#D586DD" opacity=".3" filter="url(#pz-soft)"/>' +
      '<rect class="fi-buio" x="0" y="0" width="760" height="1080" fill="#05060D" opacity="0"/>' +
      '<rect x="760" y="760" width="1160" height="320" fill="#C9A27A"/>' +
      '<g class="fi-oro"><circle cx="1660" cy="230" r="92" fill="#FBF6EC" stroke="#2E2A26" stroke-width="6"/><path d="M1660 150 L1660 162 M1660 298 L1660 310 M1580 230 L1592 230 M1728 230 L1740 230" stroke="#2E2A26" stroke-width="5" stroke-linecap="round"/>' +
      '<path class="fi-lanc" d="M1660 230 L1660 170" stroke="#2E2A26" stroke-width="6" stroke-linecap="round"/><circle cx="1660" cy="230" r="8" fill="#E8743B"/><path d="M1660 322 L1660 380" stroke="#8C8F99" stroke-width="3"/>' +
      '<g transform="translate(1660 400)"><circle cx="-12" cy="0" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="12" cy="0" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><path class="fi-l1" d="M-6 10 L34 70" stroke="#8C8F99" stroke-width="7" stroke-linecap="round"/><path class="fi-l2" d="M6 10 L-34 70" stroke="#8C8F99" stroke-width="7" stroke-linecap="round"/></g></g>' +
      '<g class="fi-nastro"><rect x="0" y="-30" width="640" height="60" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="24" y="12" font-family="JetBrains Mono, monospace" font-size="30" fill="#5C5348">Al parco Emma corre verso l’alta</text></g>' +
      '<g class="fi-pezzo"><rect x="0" y="-30" width="190" height="60" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="16" y="12" font-family="JetBrains Mono, monospace" font-size="30" fill="#5C5348">lena.</text></g>' +
      '<text class="fi-cart" x="1440" y="640" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#A8481E">è stata la forbice, non il pozzo</text>' +
      '<g class="fi-ada"><g transform="translate(1000 270) scale(1.5)">' + P.ada('mani', 'felice') + '</g></g>' +
      '<rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
      '<g transform="translate(800 456) scale(1.4)"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' + palle + '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".2" stroke="#7C9CC9" stroke-width="3"/></g>' +
      '<g class="fi-palla"><circle r="24" fill="#2B2350" stroke="#4A4378" stroke-width="3"/><circle r="6" fill="#FFFFFF"/><text x="0" y="-38" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">Fine</text></g>' +
      '<path d="M760 0 L760 1080" stroke="#E8743B" stroke-width="4" stroke-dasharray="18 12"/></svg>' +
      P.sott('NARRATORE', 'Finché nel secchio sale una pallina speciale: Fine. Non è un ordine: è una pallina come le altre, che il pozzo ha imparato a mettere nel secchio quando una frase è finita.') +
      P.sott('ADA', 'E se una frase si interrompe a metà? È la mia forbice: il limite di parole. Il pozzo non c’entra.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.palla = q('.fi-palla'); this.luce = all('.fi-luce'); this.buio = q('.fi-buio'); this.lanc = q('.fi-lanc');
    this.l1 = q('.fi-l1'); this.l2 = q('.fi-l2'); this.nastro = q('.fi-nastro'); this.pezzo = q('.fi-pezzo'); this.cart = q('.fi-cart'); this.ada = q('.fi-ada');
    this.sub = window.PZ.subs(kit, [[0.4, 6.8], [7.1, 11.7]]);
  },
  render(t) {
    const p = seg(t, 1.6, 2.4);
    this.palla.setAttribute('transform', 'translate(' + lerp(970, 1070, eo(p)).toFixed(1) + ' ' + (lerp(600, 380, eo(p)) - 60 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6) * (1 - seg(t, 6.6, 7.0))).toFixed(3) + ')');
    const off = eio(seg(t, 4.4, 5.4));
    this.luce.forEach(l => l.setAttribute('opacity', ((1 - off) * 0.6).toFixed(2)));
    this.buio.setAttribute('opacity', (0.6 * off).toFixed(2));
    this.ada.setAttribute('transform', 'translate(0 ' + (6 * Math.sin(Math.PI * seg(t, 3.4, 3.8)) + 6 * Math.sin(Math.PI * seg(t, 3.8, 4.2))).toFixed(1) + ')');
    this.ada.setAttribute('opacity', (1 - 0.8 * eio(seg(t, 6.8, 7.3))).toFixed(2));
    this.lanc.setAttribute('transform', 'rotate(' + (t * 30).toFixed(1) + ' 1660 230)');
    const nx = lerp(1920, 1000, eio(seg(t, 7.2, 8.6)));
    const cut = seg(t, 8.8, 9.1), snip = Math.sin(Math.PI * cut);
    this.l1.setAttribute('transform', 'rotate(' + (-16 * snip).toFixed(2) + ' 0 10)'); this.l2.setAttribute('transform', 'rotate(' + (16 * snip).toFixed(2) + ' 0 10)');
    this.nastro.setAttribute('transform', 'translate(' + nx.toFixed(1) + ' 500)');
    const fall = ei(seg(t, 9.1, 10.0));
    this.pezzo.setAttribute('transform', 'translate(' + (nx + 650).toFixed(1) + ' ' + (500 + 400 * fall).toFixed(1) + ') rotate(' + (30 * fall).toFixed(1) + ')');
    this.pezzo.setAttribute('opacity', (seg(t, 7.2, 7.4) * (1 - seg(t, 9.8, 10.1))).toFixed(2));
    this.cart.setAttribute('opacity', eo(seg(t, 9.6, 10.1)).toFixed(2));
    this.sub(t);
  },
});
