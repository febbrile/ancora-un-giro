const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.8 · Sempre più giù: la spiaggia strana, il molo con «nuota», l'acqua profonda, il pozzo fantasma.
const PI_V = [[0.55, 0.07, -0.58], [0.11, 0.50, -0.72], [-0.82, 1.11, -0.50], [-2.47, 2.19, 0.14]];
const PI_WAVE = '<path d="M0 340 C90 310 180 330 214 392 C230 424 210 452 182 446 C160 440 160 414 180 414 C164 384 110 378 64 404 C40 418 18 436 0 446 Z"/><path d="M10 352 C90 326 170 344 204 396" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>';
const PI_LETTURE = ['piano 1: conchiglie · onde · sabbia', 'piano 2: nuota · onde · conchiglie', 'piano 3: nuota · gioca · onde'];
function piProj(v) { const c = Math.cos(-0.5236), s = Math.sin(-0.5236), S = 230; return [1520 + S * (v[0] * c - v[1] * s), 600 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
function piConch(x, len, c1, c2) {
  return '<g class="pi-conch" data-x="' + x + '"><path d="M' + x + ' 0 L' + x + ' ' + len + '" stroke="#8B93B8" stroke-width="2"/><ellipse cx="' + x + '" cy="' + (len + 24) + '" rx="64" ry="50" fill="' + c1 + '" opacity=".45" filter="url(#pz-soft)"/>' +
    '<path d="M' + (x - 36) + ' ' + (len + 34) + ' Q' + x + ' ' + (len - 30) + ' ' + (x + 36) + ' ' + (len + 34) + ' Q' + x + ' ' + (len + 56) + ' ' + (x - 36) + ' ' + (len + 34) + ' Z" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="2"/></g>';
}
kit.scene('piani', {
  init(kit) {
    const P = window.PZ, V = P.VESTITO.mare;
    // A · la spiaggia strana (piano 1).
    let a = '<g class="pi-A"><defs><linearGradient id="pi-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient><linearGradient id="pi-sab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0DDB0"/><stop offset="1" stop-color="#D2B47A"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#pi-muro)"/>' +
      '<g class="pi-onde"><g fill="#6E88FD" opacity=".6">' + PI_WAVE + '</g><g transform="translate(0 170)" fill="#8787FE" opacity=".55">' + PI_WAVE + '</g></g>' +
      '<g class="pi-onde2"><g transform="translate(1920 60) scale(-1 1)" fill="#8787FE" opacity=".55">' + PI_WAVE + '</g><g transform="translate(1920 220) scale(-1 1)" fill="#6E88FD" opacity=".6">' + PI_WAVE + '</g></g>' +
      '<text x="236" y="490" font-family="Fredoka, sans-serif" font-size="34" fill="#C9D4FF">onde</text>' +
      piConch(300, 230, '#F7C6D9', '#E79CB8') + piConch(980, 250, '#F2C7A0', '#D99A6C') + piConch(1330, 230, '#F7C6D9', '#E79CB8') +
      '<text x="1390" y="330" font-family="Fredoka, sans-serif" font-size="34" fill="#FFD3E2">conchiglie</text>' +
      '<path d="M0 760 C400 720 800 742 1100 730 C1450 718 1700 740 1920 760 L1920 1080 L0 1080 Z" fill="url(#pi-sab)"/>' +
      '<text x="1500" y="900" font-family="Fredoka, sans-serif" font-size="34" fill="#8E6B2E">sabbia</text>' +
      '<g class="pi-bov"><g transform="rotate(-8) scale(1.2)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
      '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<path d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/>' +
      '<text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g></g>' +
      '<g class="pi-al"><g transform="translate(-75 -125) scale(.75)">' + P.al() + '</g></g>' +
      '<g class="pi-mare"><g transform="translate(-100 -184)">' + P.mare() + '</g></g>' +
      '<g class="pi-cade"><g transform="translate(-150 -240) scale(1.5)">' + P.emmaCade(V[1]) + '</g></g>' +
      '<g class="pi-emma"><g transform="translate(-150 -402) scale(1.5)">' + P.emma(V[1], { dx: -3, dy: -3 }) + '</g></g>' +
      '<g class="pi-ban"><rect x="360" y="40" width="1200" height="84" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="960" y="96" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Le stanze: cosa verrebbe dopo se il pozzo finisse qui</text></g></g>';
    // B · piani 2 e 3, la scia sul monitor, il pozzo fantasma.
    let fant = '';
    for (let k = 0; k < 10; k++) fant += '<rect x="60" y="' + (960 + k * 430) + '" width="920" height="360" rx="24" fill="#1B2244" stroke="#2A3466" stroke-width="4" opacity="' + (0.8 - k * 0.07).toFixed(2) + '"/>';
    const O = piProj([0, 0, 0]);
    let ax = '';
    [[1.2, 0, 0], [0, 1.2, 0], [0, 0, 1.2]].forEach((d, i) => { const e = piProj(d), e2 = piProj(d.map(x => x * 1.13)); ax += '<line x1="' + O[0].toFixed(1) + '" y1="' + O[1].toFixed(1) + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="#2F6F73" stroke-width="3"/><g transform="translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')"><circle r="17" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.65) + '</g>'; });
    let frecce = '';
    for (let i = 1; i < 4; i++) { const p0 = piProj(PI_V[i - 1]), p1 = piProj(PI_V[i]); frecce += '<line class="pi-fr" x1="' + p0[0].toFixed(1) + '" y1="' + p0[1].toFixed(1) + '" x2="' + p1[0].toFixed(1) + '" y2="' + p1[1].toFixed(1) + '" stroke="' + V[i] + '" stroke-width="6" stroke-linecap="round"/><circle class="pi-pt" cx="' + p1[0].toFixed(1) + '" cy="' + p1[1].toFixed(1) + '" r="11" fill="' + V[i] + '"/>'; }
    const p0 = piProj(PI_V[0]);
    let letture = '';
    PI_LETTURE.forEach((l, i) => { letture += '<text class="pi-l" x="1200" y="' + (196 + i * 32) + '" font-family="JetBrains Mono, monospace" font-size="20" fill="#E6FFF4">' + l + '</text>'; });
    const b = '<g class="pi-B"><rect width="1920" height="1080" fill="#0B0E1C"/>' +
      '<g class="pi-pozzo" style="transform-origin:520px 100px">' + fant +
      '<rect x="60" y="100" width="920" height="360" rx="24" fill="#1E3C6E" stroke="#2A3466" stroke-width="4"/>' +
      '<rect x="60" y="370" width="920" height="90" fill="#3E6FD8" opacity=".55"/><rect x="420" y="340" width="500" height="30" fill="#8A5A3C"/><rect x="450" y="370" width="18" height="80" fill="#6E4A33"/><rect x="880" y="370" width="18" height="80" fill="#6E4A33"/>' +
      '<g transform="translate(200 260)"><circle r="52" fill="none" stroke="#FFFFFF" stroke-width="22"/><circle r="52" fill="none" stroke="#E5484D" stroke-width="22" stroke-dasharray="41 41"/>' +
      '<text y="98" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#FFD978">nuota</text></g>' +
      '<text x="120" y="160" font-family="Fredoka, sans-serif" font-size="30" fill="#C9D4FF">onde</text><text x="760" y="170" font-family="Fredoka, sans-serif" font-size="30" fill="#FFD3E2">conchiglie</text>' +
      '<text x="940" y="140" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 2</text>' +
      '<rect x="60" y="530" width="920" height="360" rx="24" fill="#123A7A" stroke="#2A3466" stroke-width="4"/>' +
      '<ellipse cx="520" cy="700" rx="380" ry="130" fill="#398BE9" opacity=".25" filter="url(#pz-soft)"/>' +
      '<text class="pi-nuota" x="280" y="660" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="78" fill="#8FC4FF">nuota</text>' +
      '<text class="pi-gioca" x="780" y="640" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="48" fill="#5FD0D0">gioca</text>' +
      '<text x="940" y="570" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 3 · fondo</text>' +
      '<g class="pi-trio"><g transform="translate(-230 -125) scale(.75)">' + P.al() + '</g><g transform="translate(-130 -150) scale(.8)">' + P.mare() + '</g>' +
      '<g transform="translate(-10 -201) scale(.75)">' + P.emma(V[1]) + '</g></g>' +
      '<text class="pi-fant" x="520" y="1100" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="70" fill="#C8CEE8">nei modelli veri: decine di piani</text></g>' +
      '<rect x="1170" y="110" width="700" height="660" rx="20" fill="#0F2A2A" stroke="#C9973F" stroke-width="8"/>' +
      '<text x="1200" y="156" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · LA SCIA E IL PERISCOPIO</text>' + letture +
      ax + '<circle cx="' + p0[0].toFixed(1) + '" cy="' + p0[1].toFixed(1) + '" r="10" fill="' + V[0] + '"/>' + frecce + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + '</svg>' +
      P.sott('NARRATORE', 'Più scendeva, più il vestito di Emma diventava blu, come il mare. E al secondo piano comparve una parola nuova: non una cosa, ma un’azione.') +
      P.sott('ADA', 'Il mio pozzo ha tre piani. Quelli veri ne hanno decine.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.A = q('.pi-A'); this.B = q('.pi-B');
    this.cade = q('.pi-cade'); this.emma = q('.pi-emma'); this.al = q('.pi-al'); this.mare = q('.pi-mare');
    this.bov = q('.pi-bov'); this.onde = q('.pi-onde'); this.onde2 = q('.pi-onde2'); this.conch = all('.pi-conch'); this.ban = q('.pi-ban');
    this.trio = q('.pi-trio'); this.vest = this.trio.lastElementChild.firstElementChild;
    this.fr = all('.pi-fr'); this.pt = all('.pi-pt'); this.l = all('.pi-l');
    this.nuota = q('.pi-nuota'); this.gioca = q('.pi-gioca');
    this.pozzo = q('.pi-pozzo').style; this.fant = q('.pi-fant');
    this.sub = window.PZ.subs(kit, [[8.0, 20.0], [22.0, 27.0]]);
  },
  render(t) {
    const P = window.PZ, V = P.VESTITO.mare;
    const ab = eio(seg(t, 9.4, 10.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3));
    this.B.setAttribute('opacity', ab.toFixed(3));
    // A
    const land = t0 => lerp(-500, 0, ei(seg(t, t0 - 0.9, t0)));
    const sq = t0 => Math.sin(Math.PI * seg(t, t0, t0 + 0.35));
    const fallE = seg(t, 0, 1.0);
    this.cade.setAttribute('transform', 'translate(1230 ' + lerp(-400, 700, ei(fallE)).toFixed(1) + ')');
    this.cade.setAttribute('opacity', fallE < 1 ? 1 : 0);
    const s1 = sq(1.0);
    this.emma.setAttribute('transform', 'translate(1230 732) scale(' + (1 + 0.1 * s1).toFixed(3) + ',' + (1 - 0.12 * s1 + 0.008 * Math.sin(t * 2)).toFixed(3) + ')');
    this.emma.setAttribute('opacity', fallE >= 1 ? 1 : 0);
    const sa = sq(1.6), sm = sq(1.9);
    this.al.setAttribute('transform', 'translate(920 ' + (767 + land(1.6)).toFixed(1) + ') scale(' + (1 + 0.1 * sa).toFixed(3) + ',' + (1 - 0.12 * sa).toFixed(3) + ')');
    this.mare.setAttribute('transform', 'translate(1560 ' + (735 + land(1.9)).toFixed(1) + ') scale(' + (0.9 + 0.09 * sm).toFixed(3) + ',' + (0.9 - 0.1 * sm).toFixed(3) + ')');
    this.bov.setAttribute('transform', 'translate(620 ' + (440 + 8 * Math.sin(t * 1.3)).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 0.9)).toFixed(2) + ')');
    this.onde.setAttribute('transform', 'translate(' + (8 * Math.sin(t * 1.1)).toFixed(1) + ' 0)');
    this.onde2.setAttribute('transform', 'translate(' + (-8 * Math.sin(t * 1.1)).toFixed(1) + ' 0)');
    this.conch.forEach((c, i) => { const x = +c.getAttribute('data-x'); c.setAttribute('transform', 'rotate(' + (2.5 * Math.sin(t * 1.2 + i)).toFixed(2) + ' ' + x + ' 0)'); });
    this.ban.setAttribute('opacity', (eo(seg(t, 2.4, 3.0)) * (1 - seg(t, 8.6, 9.2))).toFixed(2));
    // B: si arriva al piano 2, poi giù al piano 3.
    const tb = t - 9.6;
    const inA = seg(tb, 0, 0.8), down = seg(tb, 8.0, 9.0);
    const y = lerp(lerp(-200, 440, ei(inA)), 860, eio(down));
    this.trio.setAttribute('transform', 'translate(560 ' + y.toFixed(1) + ') scale(1,' + (1 - 0.08 * Math.sin(Math.PI * seg(tb, 0.8, 1.1)) - 0.08 * Math.sin(Math.PI * seg(tb, 9.0, 9.3))).toFixed(3) + ')');
    const c1 = eio(seg(tb, 0.9, 2.2)), c2 = eio(seg(tb, 8.4, 9.6));
    this.vest.style.color = c2 > 0 ? P.mix(V[2], V[3], c2) : P.mix(V[1], V[2], c1);
    const show = [seg(tb, 0.2, 0.8), seg(tb, 1.2, 1.8), seg(tb, 8.6, 9.2)];
    this.fr.forEach((f, i) => { const p = eo(show[i]); f.setAttribute('opacity', p.toFixed(2)); f.setAttribute('stroke-width', (6 + i * 3).toFixed(0)); this.pt[i].setAttribute('r', (11 * eob(show[i], 1.7)).toFixed(2)); });
    [0.4, 1.6, 9.2].forEach((t0, i) => this.l[i].setAttribute('opacity', eo(seg(tb, t0, t0 + 0.5)).toFixed(2)));
    const gl = 0.85 + 0.15 * Math.sin(t * 2.4);
    this.nuota.setAttribute('opacity', (gl * eo(seg(tb, 8.8, 9.4))).toFixed(2)); this.gioca.setAttribute('opacity', (0.8 * eo(seg(tb, 9.2, 9.8))).toFixed(2));
    const z = eio(seg(t, 21.0, 24.4));
    this.pozzo.transform = 'scale(' + lerp(1, 0.38, z).toFixed(3) + ')';
    this.fant.setAttribute('opacity', eo(seg(t, 23.6, 24.4)).toFixed(2));
    this.sub(t);
  },
});
