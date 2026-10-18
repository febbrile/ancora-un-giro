const { seg, eo, ei, eio, eob, lerp } = kit;
// 4.2 · Tre semi, tre direzioni: ogni seme è una freccia; la carta di Emma dice di quanto andare in ognuna.
const DI_O = [760, 600], DI_S = 330;
const DI_DIR = [[1, 0], [0.55, -0.38], [0, -1]];
const DI_V = [0.55, 0.07, -0.58];
function diPt(a) { return [DI_O[0] + DI_S * (a[0] * DI_DIR[0][0] + a[1] * DI_DIR[1][0] + a[2] * DI_DIR[2][0]), DI_O[1] + DI_S * (a[0] * DI_DIR[0][1] + a[1] * DI_DIR[1][1] + a[2] * DI_DIR[2][1])]; }
kit.scene('direzioni', {
  init(kit) {
    const P = window.PZ;
    let frecce = '';
    DI_DIR.forEach((d, i) => {
      const e = [DI_O[0] + DI_S * 1.15 * d[0], DI_O[1] + DI_S * 1.15 * d[1]];
      frecce += '<g class="di-fr"><path d="M' + DI_O[0] + ' ' + DI_O[1] + ' L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '" stroke="#2E2A26" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="10" fill="#2E2A26"/>' + P.seme(i, (e[0] + 34 * d[0] + (i === 2 ? 30 : 10)).toFixed(1), (e[1] + 30 * d[1] - (i === 0 ? 20 : 0)).toFixed(1), 1.1) + '</g>';
    });
    // Il cammino: un tratto per seme, con il suo numero.
    const a = [0, 0, 0], tappe = [];
    let cammino = '';
    DI_V.forEach((v, i) => {
      const p0 = diPt(a); a[i] = v; const p1 = diPt(a);
      tappe.push([p0, p1]);
      cammino += '<path class="di-tr" d="M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + '" stroke="' + ['#2E2A26', '#C2453F', '#C2453F'][i] + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 10"/>' +
        '<text class="di-nu" x="' + ((p0[0] + p1[0]) / 2 + [-30, 18, 24][i]).toFixed(1) + '" y="' + ((p0[1] + p1[1]) / 2 + [44, -26, 10][i]).toFixed(1) + '" font-family="JetBrains Mono, monospace" font-weight="600" font-size="30" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + P.fmt(v) + '</text>';
    });
    this.tappe = tappe;
    const E = diPt(DI_V);
    kit.stage.append(kit.h('<div class="ground" style="background:#8A5A3C"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="240" y="80" width="1440" height="860" rx="14" fill="#E2D6BF"/><rect x="250" y="70" width="1420" height="860" rx="10" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' +
      frecce + cammino +
      '<g class="di-stella"><circle r="30" fill="#BC937F" opacity=".35" filter="url(#pz-soft)"/><polygon points="0,-24 6,-8 23,-7 9,4 14,21 0,11 -14,21 -9,4 -23,-7 -6,-8" fill="#E0475B" stroke="#FFFFFF" stroke-width="2"/>' +
      '<text x="30" y="8" font-family="Fredoka, sans-serif" font-weight="600" font-size="36" fill="#B5715C">Emma</text></g>' +
      '<g class="di-matita"><path d="M0 0 L-12 -40 L-4 -46 L10 -6 Z" fill="#F2C14E" stroke="#7A5A24" stroke-width="2"/><path d="M0 0 L-4 -12 L4 -13 Z" fill="#2E2A26"/></g>' +
      '<g class="di-carta"><g transform="scale(.9) translate(-110 -150)">' + P.carta({ v: DI_V, col: P.CARTA_COL.Emma, titolo: 'Emma', cls: 'dic' }) + '</g></g></svg>' +
      P.sott('ADA', 'Con tre semi posso disegnare Emma: tre direzioni, un punto.') +
      P.sott('NARRATORE', 'Ogni seme è una direzione. La carta dice di quanto andare in ognuna.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.fr = all('.di-fr'); this.tr = all('.di-tr'); this.nu = all('.di-nu'); this.stella = q('.di-stella'); this.matita = q('.di-matita'); this.carta = q('.di-carta'); this.righe = all('.dic-r');
    this.E = E;
    this.sub = window.PZ.subs(kit, [[1.0, 6.4], [12.0, 18.4]]);
  },
  render(t) {
    const P = window.PZ;
    this.fr.forEach((f, i) => f.setAttribute('opacity', eo(seg(t, 0.6 + i * 0.6, 1.2 + i * 0.6)).toFixed(2)));
    this.carta.setAttribute('transform', 'translate(1440 ' + (330 + 4 * Math.sin(t * 1.3)).toFixed(1) + ') rotate(4)');
    // La matita cammina sulle frecce: un tratto per seme, mentre il seme sulla carta si accende.
    let pos = this.tappe[0][0];
    this.tappe.forEach(([p0, p1], i) => {
      const s = seg(t, 6.8 + i * 1.5, 8.0 + i * 1.5);
      if (s > 0) pos = [lerp(p0[0], p1[0], eio(s)), lerp(p0[1], p1[1], eio(s))];
      this.tr[i].setAttribute('opacity', s > 0 ? 1 : 0);
      this.tr[i].setAttribute('stroke-dashoffset', (24 * (1 - s) * 8).toFixed(1));
      this.nu[i].setAttribute('opacity', eo(seg(t, 7.4 + i * 1.5, 7.9 + i * 1.5)).toFixed(2));
      const k = Math.sin(Math.PI * seg(t, 6.8 + i * 1.5, 8.0 + i * 1.5)), y = P.righeY(3)[i];
      this.righe[i].setAttribute('transform', 'translate(110 ' + y + ') scale(' + (1 + 0.14 * k).toFixed(3) + ') translate(-110 ' + (-y) + ')');
    });
    this.matita.setAttribute('transform', 'translate(' + pos[0].toFixed(1) + ' ' + pos[1].toFixed(1) + ')');
    this.matita.setAttribute('opacity', (seg(t, 6.4, 6.8) * (1 - seg(t, 11.6, 12.0))).toFixed(2));
    const st = seg(t, 11.4, 11.9);
    this.stella.setAttribute('transform', 'translate(' + this.E[0].toFixed(1) + ' ' + this.E[1].toFixed(1) + ') scale(' + (st <= 0 ? 0 : eob(st, 1.8)).toFixed(3) + ')');
    this.sub(t);
  },
});
