const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.7 · Sempre più giù: quasi senza parole. A ogni piano gira un ingranaggio sotto ognuno, si apre una botola
// in un punto diverso per ciascuno (lo spostamento) e cadono tutti e tre nella stanza sotto.
// Alla fine si vedono tutti i piani del nostro pozzo e il viaggio ripassa in accelerato, tre volte.
const SG_RH = 1080, SG_F = r => 900 + SG_RH * r;
const SG_X0 = [520, 860, 1180];
const SG_H = [[440, 900, 1320], [380, 960, 1440], [340, 1020, 1520]];
const SG_OPEN = [4.2, 14.4, 24.8];
const SG_SGUARDI = [null, 11.0, 21.4];
const SG_PASSI = [[35.2, 2.6], [38.2, 1.7], [40.2, 1.1]];
const SG_SCIA = ['#17B3B3', '#8787FE', '#2864DC'];
const SG_V = [[0.55, 0.07, -0.58], [0.11, 0.50, -0.72], [-0.82, 1.11, -0.50], [-2.47, 2.19, 0.14]];
const SG_WAVE = '<path d="M0 340 C90 310 180 330 214 392 C230 424 210 452 182 446 C160 440 160 414 180 414 C164 384 110 378 64 404 C40 418 18 436 0 446 Z"/><path d="M10 352 C90 326 170 344 204 396" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>';
// Dove sta ognuno nella stanza r.
function sgPos(j, r) { return r === 0 ? SG_X0[j] : SG_H[r - 1][j]; }
function sgProj(v) { const c = Math.cos(-0.5236), s = Math.sin(-0.5236), S = 120; return [1670 + S * (v[0] * c - v[1] * s), 290 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
function sgIngranaggio() {
  let d = '';
  for (let k = 0; k < 10; k++) d += '<rect x="-5" y="-38" width="10" height="12" fill="#C9973F" transform="rotate(' + (k * 36) + ')"/>';
  return '<g class="sg-gear"><circle r="28" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' + d + '<circle r="8" fill="#7A5A24"/></g>';
}
function sgLastra(r) {
  const y = SG_F(r);
  let s = '<rect x="0" y="' + y + '" width="1920" height="180" fill="#3E4A66"/><path d="M0 ' + (y + 60) + ' L1920 ' + (y + 60) + ' M0 ' + (y + 120) + ' L1920 ' + (y + 120) + '" stroke="#2A3350" stroke-width="4"/>';
  for (let k = 0; k < 12; k++) s += '<path d="M' + (k * 170 + (k % 2) * 60) + ' ' + y + ' L' + (k * 170 + (k % 2) * 60) + ' ' + (y + 60) + '" stroke="#2A3350" stroke-width="4"/>';
  return s + '<path d="M0 ' + y + ' L1920 ' + y + '" stroke="#5B6B8C" stroke-width="6"/>';
}
function sgStanza(r) {
  const o = SG_RH * r, sfondo = ['#262F60', '#222B57', '#1E3C6E', '#123A7A'][r];
  let s = '<rect x="0" y="' + o + '" width="1920" height="' + SG_RH + '" fill="url(#sg-muro' + r + ')"/>' +
    '<defs><linearGradient id="sg-muro' + r + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="' + sfondo + '"/></linearGradient></defs>';
  if (r === 0) s += '<ellipse cx="960" cy="' + (o + 640) + '" rx="620" ry="110" fill="#1E5A3A" opacity=".35"/><path d="M140 ' + (o + 1080) + ' L340 ' + (o + 120) + ' M1780 ' + (o + 1080) + ' L1580 ' + (o + 120) + '" stroke="#2A3466" stroke-width="6"/>';
  if (r === 1) {
    s += '<g fill="#6E88FD" opacity=".6" transform="translate(0 ' + (o + 40) + ')">' + SG_WAVE + '</g><g fill="#8787FE" opacity=".55" transform="translate(0 ' + (o + 210) + ')">' + SG_WAVE + '</g>' +
      '<g fill="#8787FE" opacity=".55" transform="translate(1920 ' + (o + 140) + ') scale(-1 1)">' + SG_WAVE + '</g>' +
      '<text x="236" y="' + (o + 560) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#C9D4FF">onde</text>';
    [[300, 200, '#F7C6D9', '#E79CB8'], [1000, 230, '#F2C7A0', '#D99A6C'], [1250, 190, '#F7C6D9', '#E79CB8']].forEach(([x, len, c1, c2]) => {
      s += '<path d="M' + x + ' ' + o + ' L' + x + ' ' + (o + len) + '" stroke="#8B93B8" stroke-width="2"/><ellipse cx="' + x + '" cy="' + (o + len + 24) + '" rx="64" ry="50" fill="' + c1 + '" opacity=".45" filter="url(#pz-soft)"/>' +
        '<path d="M' + (x - 36) + ' ' + (o + len + 34) + ' Q' + x + ' ' + (o + len - 30) + ' ' + (x + 36) + ' ' + (o + len + 34) + ' Q' + x + ' ' + (o + len + 56) + ' ' + (x - 36) + ' ' + (o + len + 34) + ' Z" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="2"/>';
    });
    s += '<text x="1090" y="' + (o + 330) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#FFD3E2">conchiglie</text>' +
      '<path d="M0 ' + (o + 830) + ' C400 ' + (o + 800) + ' 900 ' + (o + 820) + ' 1300 ' + (o + 810) + ' C1600 ' + (o + 802) + ' 1800 ' + (o + 816) + ' 1920 ' + (o + 830) + ' L1920 ' + (o + 900) + ' L0 ' + (o + 900) + ' Z" fill="#E4CB93"/>' +
      '<text x="1640" y="' + (o + 880) + '" font-family="Fredoka, sans-serif" font-size="34" fill="#8E6B2E">sabbia</text>' +
      '<g class="sg-bov"><g transform="rotate(-8) scale(1.1)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
      '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<path d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/>' +
      '<text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g></g>';
  }
  if (r === 2) {
    s += '<rect x="0" y="' + (o + 560) + '" width="1920" height="340" fill="#3E6FD8" opacity=".55"/>' +
      '<path d="M0 ' + (o + 560) + ' Q240 ' + (o + 540) + ' 480 ' + (o + 560) + ' T960 ' + (o + 560) + ' T1440 ' + (o + 560) + ' T1920 ' + (o + 560) + '" stroke="#FFFFFF" stroke-width="4" fill="none" opacity=".4"/>' +
      '<rect x="0" y="' + (o + 860) + '" width="1920" height="40" fill="#8A5A3C"/><path d="M0 ' + (o + 880) + ' L1920 ' + (o + 880) + '" stroke="#6E4A33" stroke-width="3"/>' +
      '<rect x="690" y="' + (o + 360) + '" width="16" height="500" fill="#6E4A33"/>' +
      '<g transform="translate(698 ' + (o + 470) + ')"><circle r="56" fill="none" stroke="#FFFFFF" stroke-width="24"/><circle r="56" fill="none" stroke="#E5484D" stroke-width="24" stroke-dasharray="44 44"/></g>' +
      '<text class="sg-nuota2" x="698" y="' + (o + 580) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="46" fill="#FFD978">nuota</text>' +
      '<text x="150" y="' + (o + 300) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#C9D4FF">onde</text><text x="1100" y="' + (o + 260) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#FFD3E2">conchiglie</text>';
  }
  if (r === 3) {
    s += '<ellipse cx="960" cy="' + (o + 560) + '" rx="760" ry="260" fill="#398BE9" opacity=".25" filter="url(#pz-soft)"/>' +
      '<text class="sg-nuota3" x="520" y="' + (o + 460) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="120" fill="#8FC4FF">nuota</text>' +
      '<text class="sg-gioca3" x="1200" y="' + (o + 420) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="70" fill="#5FD0D0">gioca</text>' +
      '<path d="M0 ' + (o + 860) + ' C500 ' + (o + 840) + ' 1400 ' + (o + 850) + ' 1920 ' + (o + 862) + ' L1920 ' + (o + 900) + ' L0 ' + (o + 900) + ' Z" fill="#2B4E7A"/>';
  }
  return s + sgLastra(r);
}
function sgPersonaggio(P, j) {
  const fig = j === 0 ? '<g transform="translate(-102 -166)">' + P.al() + '</g>' : j === 1 ? '<g transform="translate(-100 -184)">' + P.mare() + '</g>' : '<g transform="translate(-80 -219) scale(.8)">' + P.emma(P.VESTITO.rosa) + '</g>';
  const mosso = j === 2 ? '<g transform="translate(-128 -230) scale(.8)">' + P.emmaTirata(P.VESTITO.rosa) + '</g>' :
    '<path d="M-150 -120 L-100 -120 M-160 -90 L-110 -90 M-150 -60 L-100 -60" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" opacity=".45"/><g transform="rotate(18)">' + fig + '</g>';
  return '<g class="sg-p"><g class="sg-n">' + fig + '</g><g class="sg-m"><g class="sg-dir">' + mosso + '</g></g></g>';
}
kit.scene('piani', {
  init(kit) {
    const P = window.PZ, V = P.VESTITO.mare;
    let mondo = '';
    for (let r = 0; r < 4; r++) mondo += sgStanza(r);
    // Botole e ingranaggi: tre per ogni piano che si apre.
    for (let r = 0; r < 3; r++) SG_H[r].forEach((h, j) => {
      const y = SG_F(r);
      mondo += '<g class="sg-ing" data-r="' + r + '"><circle cx="' + h + '" cy="' + (y + 92) + '" r="50" fill="#141A33" stroke="#2A3350" stroke-width="6"/><circle class="sg-ingluce" cx="' + h + '" cy="' + (y + 92) + '" r="44" fill="#FFD978" opacity="0"/>' +
        '<g transform="translate(' + h + ' ' + (y + 92) + ')"><g class="sg-rot">' + sgIngranaggio() + '</g></g></g>' +
        '<ellipse class="sg-buco" cx="' + h + '" cy="' + (y + 4) + '" rx="0" ry="0" fill="#05060C" stroke="#7A86A8" stroke-width="5"/>';
    });
    // Gli sguardi: la lanterna di Emma si riaccende verso i compagni.
    let sguardi = '';
    for (let r = 1; r < 3; r++) {
      const e = sgPos(2, r), a = sgPos(0, r), m = sgPos(1, r), y = SG_F(r);
      sguardi += '<g class="sg-sg" data-r="' + r + '"><path d="M' + (e - 20) + ' ' + (y - 200) + ' L' + m + ' ' + (y - 150) + '" stroke="#FFE9A8" stroke-width="16" stroke-linecap="round"/>' +
        '<path d="M' + (e - 20) + ' ' + (y - 200) + ' L' + a + ' ' + (y - 130) + '" stroke="#FFE9A8" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="' + (e - 20) + '" cy="' + (y - 200) + '" r="40" fill="#FFD978" opacity=".5" filter="url(#pz-soft)"/><circle cx="' + (e - 20) + '" cy="' + (y - 200) + '" r="13" fill="#FFE9A8"/></g>';
    }
    mondo += sguardi;
    for (let j = 0; j < 3; j++) mondo += sgPersonaggio(P, j);
    // Il ripasso accelerato: tre scie, di botola in botola.
    for (let j = 0; j < 3; j++) {
      let d = 'M' + sgPos(j, 0) + ' ' + (SG_F(0) - 90);
      for (let r = 0; r < 3; r++) d += ' L' + SG_H[r][j] + ' ' + (SG_F(r) + 10) + ' L' + SG_H[r][j] + ' ' + (SG_F(r + 1) - 90);
      mondo += '<path class="sg-scia" d="' + d + '" stroke="' + SG_SCIA[j] + '" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0"/>' +
        '<g class="sg-luce" opacity="0"><circle r="90" fill="' + SG_SCIA[j] + '" opacity=".45" filter="url(#pz-soft)"/><circle r="38" fill="#FFF4E0"/></g>';
    }
    // Il monitor nell'angolo: la scia di Emma, una freccia per piano.
    const O = sgProj([0, 0, 0]);
    let hud = '<g class="sg-hud"><rect x="1460" y="40" width="420" height="380" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1484" y="78" font-family="JetBrains Mono, monospace" font-size="16" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · LA SCIA</text>';
    [[1.2, 0, 0], [0, 1.2, 0], [0, 0, 1.2]].forEach((d, i) => { const e = sgProj(d), e2 = sgProj(d.map(x => x * 1.16)); hud += '<line x1="' + O[0].toFixed(1) + '" y1="' + O[1].toFixed(1) + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="#2F6F73" stroke-width="3"/><g transform="translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')"><circle r="13" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.5) + '</g>'; });
    const q0 = sgProj(SG_V[0]);
    hud += '<circle cx="' + q0[0].toFixed(1) + '" cy="' + q0[1].toFixed(1) + '" r="7" fill="' + V[0] + '"/>';
    for (let i = 1; i < 4; i++) { const a = sgProj(SG_V[i - 1]), b = sgProj(SG_V[i]); hud += '<g class="sg-fr"><line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + V[i] + '" stroke-width="' + (3 + 2 * i) + '" stroke-linecap="round"/><circle cx="' + b[0].toFixed(1) + '" cy="' + b[1].toFixed(1) + '" r="8" fill="' + V[i] + '"/></g>'; }
    hud += '</g>';
    kit.stage.append(kit.h('<div class="ground" style="background:#070912"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="sg-mondo">' + mondo + '</g>' + hud +
      '<g class="sg-ban"><rect x="60" y="40" width="760" height="80" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="440" y="92" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Ogni piano sposta tutti: x = x + Δ</text></g>' +
      '</svg>' +
      P.sott('NARRATORE', 'E da lì, giù: un piano dopo l’altro.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.mondo = q('.sg-mondo'); this.hud = q('.sg-hud'); this.ban = q('.sg-ban');
    this.scia = all('.sg-scia'); this.luci = all('.sg-luce');
    this.lun = this.scia.map(p => { try { return p.getTotalLength(); } catch (e) { return 4000; } });
    this.p = all('.sg-p').map(g => ({ g, n: g.querySelector('.sg-n'), m: g.querySelector('.sg-m'), dir: g.querySelector('.sg-dir') }));
    this.vest = [this.p[2].n.firstElementChild.firstElementChild, this.p[2].dir.firstElementChild.firstElementChild];
    this.ing = all('.sg-ing').map(g => ({ r: +g.getAttribute('data-r'), rot: g.querySelector('.sg-rot'), luce: g.querySelector('.sg-ingluce') }));
    this.buchi = all('.sg-buco'); this.sg = all('.sg-sg'); this.fr = all('.sg-fr');
    this.bov = q('.sg-bov'); this.n2 = q('.sg-nuota2'); this.n3 = q('.sg-nuota3'); this.g3 = q('.sg-gioca3');
    this.sub = window.PZ.subs(kit, [[0.4, 3.6]]);
  },
  render(t) {
    const P = window.PZ, V = P.VESTITO.mare;
    // La camera segue la caduta; alla fine si allontana fino a mostrare tutti i piani del nostro pozzo.
    let cam = 0;
    SG_OPEN.forEach(o => { cam += eio(seg(t, o + 0.5, o + 2.0)); });
    const z = eio(seg(t, 32.0, 35.0)), zs = lerp(1, 0.24, z);
    const ty = lerp(-cam * SG_RH, 20, z), tx = 960 * (1 - zs);
    this.mondo.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + zs.toFixed(4) + ')');
    // I tre viaggiatori: fermi, poi tirati verso la botola, poi giù nella stanza sotto.
    this.p.forEach((C, j) => {
      let x = SG_X0[j], y = SG_F(0), moving = false, dirx = 1, squash = 0;
      SG_OPEN.forEach((o0, r) => {
        const o = o0 + j * 0.12;
        if (t < o) return;
        const x0 = sgPos(j, r), h = SG_H[r][j];
        const a = seg(t, o, o + 0.6), b = seg(t, o + 0.6, o + 1.8);
        x = lerp(x0, h, eio(a)); y = lerp(SG_F(r), SG_F(r + 1), ei(b)) - 40 * Math.sin(Math.PI * a);
        moving = t < o + 1.8; dirx = h >= x0 ? 1 : -1;
        squash = Math.sin(Math.PI * seg(t, o + 1.8, o + 2.15));
      });
      const breath = 0.01 * Math.sin(t * 2 + j);
      C.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
      C.n.setAttribute('opacity', moving ? 0 : 1);
      C.m.setAttribute('opacity', moving ? 1 : 0);
      C.n.setAttribute('transform', 'scale(' + (1 + 0.1 * squash).toFixed(3) + ',' + (1 - 0.12 * squash + breath).toFixed(3) + ')');
      C.dir.setAttribute('transform', 'scale(' + dirx + ' 1)');
    });
    // Il vestito di Emma: rosa antico, poi sempre più blu a ogni atterraggio.
    let col = P.VESTITO.rosa;
    SG_OPEN.forEach((o, r) => { const k = eio(seg(t, o + 1.9, o + 2.5)); if (k > 0) col = P.mix(r === 0 ? P.VESTITO.rosa : V[r], V[r + 1], k); });
    this.vest.forEach(g => { g.style.color = col; });
    // Ingranaggi e botole.
    this.ing.forEach((I, k) => {
      const o = SG_OPEN[I.r], on = seg(t, o - 1.4, o + 0.2);
      const ang = on <= 0 ? 0 : on >= 1 ? 480 : 480 * on;
      I.rot.setAttribute('transform', 'rotate(' + ang.toFixed(1) + ')');
      I.luce.setAttribute('opacity', (on > 0 && on < 1 ? 0.35 + 0.15 * Math.sin(t * 12) : 0).toFixed(2));
    });
    this.buchi.forEach((b, k) => {
      const r = Math.floor(k / 3), o = SG_OPEN[r] + (k % 3) * 0.12;
      const op = eob(seg(t, o - 0.3, o), 1.4) * (1 - eio(seg(t, o + 2.4, o + 2.9)));
      b.setAttribute('rx', (80 * op).toFixed(1)); b.setAttribute('ry', (20 * op).toFixed(1));
    });
    this.sg.forEach((g, i) => {
      const t0 = SG_SGUARDI[i + 1];
      const k = Math.sin(Math.PI * seg(t, t0, t0 + 1.4));
      g.setAttribute('opacity', (k * (0.75 + 0.25 * Math.sin(t * 9))).toFixed(2));
    });
    this.fr.forEach((f, i) => f.setAttribute('opacity', eo(seg(t, SG_OPEN[i] + 2.0, SG_OPEN[i] + 2.6)).toFixed(2)));
    this.hud.setAttribute('opacity', (eo(seg(t, 0.5, 1.2)) * (1 - eio(seg(t, 31.6, 32.4)))).toFixed(2));
    this.ban.setAttribute('opacity', (eo(seg(t, 7.0, 7.6)) * (1 - seg(t, 12.8, 13.4))).toFixed(2));
    // Il ripasso: le lucine scendono di botola in botola, ogni volta più veloci.
    this.scia.forEach((p, j) => {
      const L = this.lun[j], a = seg(t, SG_PASSI[0][0], SG_PASSI[0][0] + SG_PASSI[0][1]);
      p.setAttribute('stroke-dasharray', L.toFixed(0) + ' ' + L.toFixed(0));
      p.setAttribute('stroke-dashoffset', (L * (1 - a)).toFixed(0));
      p.setAttribute('opacity', a > 0 ? '0.85' : '0');
      let u = -1, fade = 1;
      SG_PASSI.forEach(([t0, d]) => { if (t >= t0 && t <= t0 + d + 0.4) { u = Math.min(1, (t - t0) / d); fade = 1 - seg(t, t0 + d, t0 + d + 0.4); } });
      const g = this.luci[j];
      if (u < 0) { g.setAttribute('opacity', 0); return; }
      let pt = { x: 0, y: 0 }; try { pt = p.getPointAtLength(L * eio(u)); } catch (e) {}
      g.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
      g.setAttribute('opacity', fade.toFixed(2));
    });
    this.bov.setAttribute('transform', 'translate(660 ' + (SG_RH + 400 + 8 * Math.sin(t * 1.3)).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 0.9)).toFixed(2) + ')');
    const gl = 0.85 + 0.15 * Math.sin(t * 2.4);
    this.n2.setAttribute('opacity', gl.toFixed(2)); this.n3.setAttribute('opacity', gl.toFixed(2)); this.g3.setAttribute('opacity', (0.8 * gl).toFixed(2));
    this.sub(t);
  },
});
