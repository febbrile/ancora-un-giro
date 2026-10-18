const { seg, eo, ei, eio, eob, lerp } = kit;
const PIA_V = [[0.05, 0.05, 0.80], [0.65, 0.05, 0.60], [1.45, 0.10, -0.20], [2.75, 0.30, -1.80]];
const PIA_C = ['#FE8787', '#D586DD', '#6E88FD', '#398BE9'];
function piaProj(v) { const a = 0.7, S = 110, c = Math.cos(a), s = Math.sin(a); return [1420 + S * (v[0] * c - v[1] * s), 560 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
kit.scene('piani', {
  init(kit) {
    const P = window.PZ;
    let fant = '';
    for (let k = 0; k < 10; k++) fant += '<rect x="60" y="' + (960 + k * 430) + '" width="920" height="360" rx="24" fill="#1B2244" stroke="#2A3466" stroke-width="4" opacity="' + (0.8 - k * 0.07).toFixed(2) + '"/>';
    const O = piaProj([0, 0, 0]);
    let ax = '';
    [[1.6, 0, 0, 'acqua'], [0, 1.6, 0, 'verde'], [0, 0, 1.6, 'nome']].forEach(a => { const e = piaProj(a); ax += '<line x1="' + O[0] + '" y1="' + O[1] + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="#2F6F73" stroke-width="3"/><text x="' + (e[0] + 8).toFixed(1) + '" y="' + (e[1] - 8).toFixed(1) + '" font-family="JetBrains Mono, monospace" font-size="18" fill="#5FB89A">' + a[3] + '</text>'; });
    let frecce = '';
    for (let i = 1; i < 4; i++) { const p0 = piaProj(PIA_V[i - 1]), p1 = piaProj(PIA_V[i]); frecce += '<line class="pia-fr" x1="' + p0[0].toFixed(1) + '" y1="' + p0[1].toFixed(1) + '" x2="' + p1[0].toFixed(1) + '" y2="' + p1[1].toFixed(1) + '" stroke="' + PIA_C[i] + '" stroke-width="6" stroke-linecap="round"/><circle class="pia-pt" cx="' + p1[0].toFixed(1) + '" cy="' + p1[1].toFixed(1) + '" r="11" fill="' + PIA_C[i] + '"/>'; }
    const p0 = piaProj(PIA_V[0]);
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect width="1920" height="1080" fill="#0B0E1C"/>' +
      '<g class="pia-pozzo" style="transform-origin:520px 100px">' + fant +
      '<rect x="60" y="100" width="920" height="360" rx="24" fill="#1E3C6E" stroke="#2A3466" stroke-width="4"/>' +
      '<rect x="60" y="370" width="920" height="90" fill="#3E6FD8" opacity=".55"/><rect x="420" y="340" width="500" height="30" fill="#8A5A3C"/><rect x="450" y="370" width="18" height="80" fill="#6E4A33"/><rect x="880" y="370" width="18" height="80" fill="#6E4A33"/>' +
      '<g transform="translate(200 260)"><circle r="52" fill="none" stroke="#FFFFFF" stroke-width="22"/><circle r="52" fill="none" stroke="#E5484D" stroke-width="22" stroke-dasharray="41 41"/>' +
      '<text y="98" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#FFD978">nuota</text></g>' +
      '<text x="120" y="160" font-family="Fredoka, sans-serif" font-size="30" fill="#C9D4FF">onde</text><text x="760" y="170" font-family="Fredoka, sans-serif" font-size="30" fill="#FFD3E2">conchiglie</text>' +
      '<text x="940" y="140" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 2</text>' +
      '<rect x="60" y="530" width="920" height="360" rx="24" fill="#123A7A" stroke="#2A3466" stroke-width="4"/>' +
      '<ellipse cx="520" cy="700" rx="380" ry="130" fill="#398BE9" opacity=".25" filter="url(#pz-soft)"/>' +
      '<text class="pia-nuota" x="280" y="660" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="78" fill="#8FC4FF">nuota</text>' +
      '<text class="pia-gioca" x="780" y="640" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="48" fill="#5FD0D0">gioca</text>' +
      '<text x="940" y="570" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 3 · fondo</text>' +
      '<g class="pia-trio"><g transform="translate(-230 -125) scale(.75)">' + P.al() + '</g><g transform="translate(-130 -150) scale(.8)">' + P.mare() + '</g>' +
      '<g transform="translate(-10 -201) scale(.75)">' + P.emma('#D586DD') + '</g></g>' +
      '<text class="pia-fant" x="520" y="1100" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="70" fill="#C8CEE8">nei modelli veri: decine di piani</text></g>' +
      '<rect x="1170" y="110" width="700" height="660" rx="20" fill="#0F2A2A" stroke="#C9973F" stroke-width="8"/>' +
      '<text x="1200" y="156" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · LE FRECCE</text>' +
      '<text class="pia-l2" x="1200" y="196" font-family="JetBrains Mono, monospace" font-size="19" fill="#E6FFF4">piano 2: nuota 1.27 · onde 1.09</text>' +
      '<text class="pia-l3" x="1200" y="228" font-family="JetBrains Mono, monospace" font-size="19" fill="#E6FFF4">piano 3: nuota 3.27 · gioca 2.45</text>' +
      ax + '<circle cx="' + p0[0].toFixed(1) + '" cy="' + p0[1].toFixed(1) + '" r="10" fill="#FE8787"/>' + frecce + '</svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('ADA', 'Piano due: compare «nuota». Piano tre: «nuota» in testa, «gioca» dietro. Guarda le frecce: si allungano a ogni piano.') +
      P.sott('NARRATORE', 'Il nostro pozzo ha tre piani. Quelli veri ne hanno decine. Ma i viaggiatori restano sempre tre: nessuno si perde per strada.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.trio = q('.pia-trio'); this.vest = this.trio.lastElementChild.firstElementChild;
    this.fr = all('.pia-fr'); this.pt = all('.pia-pt');
    this.l2 = q('.pia-l2'); this.l3 = q('.pia-l3'); this.nuota = q('.pia-nuota'); this.gioca = q('.pia-gioca');
    this.pozzo = q('.pia-pozzo').style; this.fant = q('.pia-fant');
    this.sub = window.PZ.subs(kit, [[0.4, 8.8], [9.2, 14.7]]);
  },
  render(t) {
    const P = window.PZ;
    const inA = seg(t, 0, 0.8), down = seg(t, 2.4, 3.4);
    const y = lerp(lerp(-200, 440, ei(inA)), 860, eio(down));
    this.trio.setAttribute('transform', 'translate(560 ' + y.toFixed(1) + ') scale(1,' + (1 - 0.08 * Math.sin(Math.PI * seg(t, 0.8, 1.1)) - 0.08 * Math.sin(Math.PI * seg(t, 3.4, 3.7))).toFixed(3) + ')');
    const c1 = eio(seg(t, 0.9, 1.8)), c2 = eio(seg(t, 2.8, 3.8));
    this.vest.style.color = c2 > 0 ? P.mix('#6E88FD', '#398BE9', c2) : P.mix('#D586DD', '#6E88FD', c1);
    const show = [seg(t, 0.2, 0.8), seg(t, 1.2, 1.8), seg(t, 3.0, 3.6)];
    this.fr.forEach((f, i) => { const p = eo(show[i]); f.setAttribute('opacity', p.toFixed(2)); f.setAttribute('stroke-width', (6 + i * 3).toFixed(0)); this.pt[i].setAttribute('r', (11 * eob(show[i], 1.7)).toFixed(2)); });
    this.l2.setAttribute('opacity', eo(seg(t, 1.2, 1.7)).toFixed(2));
    this.l3.setAttribute('opacity', eo(seg(t, 3.6, 4.1)).toFixed(2));
    const gl = 0.85 + 0.15 * Math.sin(t * 2.4);
    this.nuota.setAttribute('opacity', (gl * eo(seg(t, 3.2, 3.8))).toFixed(2)); this.gioca.setAttribute('opacity', (0.8 * eo(seg(t, 3.6, 4.2))).toFixed(2));
    const z = eio(seg(t, 9.6, 12.4));
    this.pozzo.transform = 'scale(' + lerp(1, 0.38, z).toFixed(3) + ')';
    this.fant.setAttribute('opacity', eo(seg(t, 11.6, 12.4)).toFixed(2));
    this.sub(t);
  },
});
