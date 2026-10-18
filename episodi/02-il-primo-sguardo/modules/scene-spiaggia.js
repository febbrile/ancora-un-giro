const { seg, eo, ei, eio, eob, lerp } = kit;
const SPI_WAVE = '<path d="M0 340 C90 310 180 330 214 392 C230 424 210 452 182 446 C160 440 160 414 180 414 C164 384 110 378 64 404 C40 418 18 436 0 446 Z"/><path d="M10 352 C90 326 170 344 204 396" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>';
function spiConchiglia(x, len, c1, c2) {
  return '<g class="spi-conch" data-x="' + x + '"><path d="M' + x + ' 0 L' + x + ' ' + len + '" stroke="#8B93B8" stroke-width="2"/><ellipse cx="' + x + '" cy="' + (len + 24) + '" rx="64" ry="50" fill="' + c1 + '" opacity=".45" filter="url(#pz-soft)"/>' +
    '<path d="M' + (x - 36) + ' ' + (len + 34) + ' Q' + x + ' ' + (len - 30) + ' ' + (x + 36) + ' ' + (len + 34) + ' Q' + x + ' ' + (len + 56) + ' ' + (x - 36) + ' ' + (len + 34) + ' Z" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="2"/></g>';
}
kit.scene('spiaggia', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="spi-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient><linearGradient id="spi-sab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0DDB0"/><stop offset="1" stop-color="#D2B47A"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#spi-muro)"/>' +
      '<ellipse cx="960" cy="34" rx="230" ry="54" fill="#070912"/><polygon points="790,40 1130,40 1300,770 640,770" fill="#FFF4E0" opacity=".05"/>' +
      '<g class="spi-onde"><g fill="#6E88FD" opacity=".6">' + SPI_WAVE + '</g><g transform="translate(0 170)" fill="#8787FE" opacity=".55">' + SPI_WAVE + '</g></g>' +
      '<g class="spi-onde2"><g transform="translate(1920 60) scale(-1 1)" fill="#8787FE" opacity=".55">' + SPI_WAVE + '</g><g transform="translate(1920 220) scale(-1 1)" fill="#6E88FD" opacity=".6">' + SPI_WAVE + '</g></g>' +
      '<text x="236" y="490" font-family="Fredoka, sans-serif" font-size="34" fill="#C9D4FF">onde</text>' +
      spiConchiglia(300, 150, '#F7C6D9', '#E79CB8') + spiConchiglia(980, 190, '#F2C7A0', '#D99A6C') + spiConchiglia(1330, 150, '#F7C6D9', '#E79CB8') +
      '<text x="1390" y="250" font-family="Fredoka, sans-serif" font-size="34" fill="#FFD3E2">conchiglie</text>' +
      '<path d="M0 760 C400 720 800 742 1100 730 C1450 718 1700 740 1920 760 L1920 1080 L0 1080 Z" fill="url(#spi-sab)"/>' +
      '<path d="M80 820 Q300 800 520 830 M600 860 Q900 838 1200 870 M1300 820 Q1600 800 1880 830" stroke="#C7A766" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>' +
      '<text x="1500" y="900" font-family="Fredoka, sans-serif" font-size="34" fill="#8E6B2E">sabbia</text>' +
      '<ellipse cx="620" cy="800" rx="110" ry="14" fill="#000000" opacity=".12"/>' +
      '<g class="spi-bov"><g transform="rotate(-8) scale(1.2)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
      '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<path d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/>' +
      '<text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text>' +
      '<path d="M-60 178 q-6 12 0 16 q6 -4 0 -16 Z M22 184 q-6 12 0 16 q6 -4 0 -16 Z" fill="#8FB6FF" opacity=".8"/></g></g>' +
      '<g class="spi-al"><g transform="translate(-75 -125) scale(.75)">' + P.al() + '</g></g>' +
      '<g class="spi-mare"><g transform="translate(-100 -184)">' + P.mare() + '</g></g>' +
      '<g class="spi-cade"><g transform="translate(-150 -240) scale(1.5)">' + P.emmaCade('#D586DD') + '</g></g>' +
      '<g class="spi-emma"><g transform="translate(-150 -402) scale(1.5)">' + P.emma('#D586DD', { dx: -3, dy: -3 }) + '</g></g>' +
      '<text class="spi-q" x="1230" y="352" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="80" fill="#FFD978">?</text></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      '<div class="monitor spi-mon" style="left:60px;top:40px;width:560px"><div class="mon-tit">PERISCOPIO · PIANO 1 · LOGIT LENS</div>' +
      '<div style="font-size:22px">x₁ = [0.65, 0.05, 0.60]</div><div style="font-size:20px;color:#E6FFF4">conchiglie 0.70 · onde 0.70 · sabbia 0.64</div><div style="font-size:20px;color:#FE9AA4">Bovary 0.54</div></div>' +
      P.sott('NARRATORE', 'La nuova stanza era una spiaggia. Ma era una spiaggia un po’ strana: c’era ancora un ritratto appeso, come se qualcuno avesse dimenticato di portarlo via.') +
      P.sott('ADA', 'Periscopio: conchiglie, onde, sabbia… e Bovary, ancora un po’. A metà strada le letture sono confuse: il pozzo non ha finito di calcolare.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.cade = q('.spi-cade'); this.emma = q('.spi-emma'); this.al = q('.spi-al'); this.mare = q('.spi-mare');
    this.qm = q('.spi-q'); this.bov = q('.spi-bov'); this.mon = q('.spi-mon').style;
    this.onde = q('.spi-onde'); this.onde2 = q('.spi-onde2');
    this.conch = [...kit.stage.querySelectorAll('.spi-conch')];
    this.sub = window.PZ.subs(kit, [[0.4, 6.3], [6.6, 12.7]]);
  },
  render(t) {
    const land = (t0) => { const p = seg(t, t0 - 0.9, t0); return lerp(-500, 0, ei(p)); };
    const sq = t0 => Math.sin(Math.PI * seg(t, t0, t0 + 0.35));
    const fallE = seg(t, 0, 1.0);
    this.cade.setAttribute('transform', 'translate(1230 ' + (lerp(-400, 700, ei(fallE))).toFixed(1) + ')');
    this.cade.setAttribute('opacity', fallE < 1 ? 1 : 0);
    const s1 = sq(1.0);
    this.emma.setAttribute('transform', 'translate(1230 732) scale(' + (1 + 0.1 * s1).toFixed(3) + ',' + (1 - 0.12 * s1 + 0.008 * Math.sin(t * 2)).toFixed(3) + ')');
    this.emma.setAttribute('opacity', fallE >= 1 ? 1 : 0);
    const sa = sq(1.6), sm = sq(1.9);
    this.al.setAttribute('transform', 'translate(920 ' + (767 + land(1.6)).toFixed(1) + ') scale(' + (1 + 0.1 * sa).toFixed(3) + ',' + (1 - 0.12 * sa).toFixed(3) + ')');
    this.mare.setAttribute('transform', 'translate(1560 ' + (735 + land(1.9)).toFixed(1) + ') scale(' + (0.9 + 0.09 * sm).toFixed(3) + ',' + (0.9 - 0.1 * sm).toFixed(3) + ')');
    const qs = seg(t, 2.2, 2.6);
    this.qm.setAttribute('transform', 'translate(1230 352) scale(' + (qs <= 0 ? 0 : eob(qs, 1.7)).toFixed(3) + ') translate(-1230 -352)');
    this.bov.setAttribute('transform', 'translate(620 ' + (420 + 8 * Math.sin(t * 1.3)).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 0.9)).toFixed(2) + ')');
    this.onde.setAttribute('transform', 'translate(' + (8 * Math.sin(t * 1.1)).toFixed(1) + ' 0)');
    this.onde2.setAttribute('transform', 'translate(' + (-8 * Math.sin(t * 1.1)).toFixed(1) + ' 0)');
    this.conch.forEach((c, i) => { const x = +c.getAttribute('data-x'); c.setAttribute('transform', 'rotate(' + (2.5 * Math.sin(t * 1.2 + i)).toFixed(2) + ' ' + x + ' 0)'); });
    this.mon.opacity = eo(seg(t, 6.6, 7.2));
    this.sub(t);
  },
});
