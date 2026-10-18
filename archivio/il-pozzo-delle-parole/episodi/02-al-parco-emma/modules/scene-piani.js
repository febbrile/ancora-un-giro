const { seg, eo, ei, eio, eob, lerp } = kit;
// 2.5 · Un'altra strada: la stessa discesa dell'episodio 1, ma la botola si apre dall'altra parte e le stanze sono un prato.
// Quasi senza parole. Ogni pavimento ha tante botole, ognuna col suo ingranaggio; gli ingranaggi
// girano, se ne apre una sola (la direzione presa dai calcoli) e ci cadono dentro tutti e tre.
// Alla fine si vedono tutti i piani del nostro pozzo e il viaggio ripassa in accelerato, tre volte.
const SG_RH = 1080, SG_F = r => 900 + SG_RH * r;
const SG_X0 = [520, 860, 1180];
const SG_BOTOLE = [300, 620, 940, 1260, 1580];
const SG_SCELTA = [1, 3, 1];
const SG_OFF = [-240, -20, 200];
const SG_HX = r => SG_BOTOLE[SG_SCELTA[r]];
// Dove passa ognuno nella botola aperta: vicini, uno dietro l'altro.
const SG_IN = (j, r) => SG_HX(r) + (j - 1) * 28;
const SG_OPEN = [7.2, 16.8, 26.2];
const SG_SGUARDI = [null, 13.6, 23.0];
const SG_PASSI = [[36.8, 2.6], [39.8, 1.7], [41.8, 1.1]];
const SG_ZOOM = [33.4, 36.4];
const SG_SCIA = ['#17B3B3', '#9BE36B', '#28AA50'];
const SG_V = [[0.55, 0.07, -0.58], [0.73, 0.49, -0.14], [0.58, 1.09, 0.81], [0.07, 2.15, 2.51]];
const SG_VIERI = [[0.55, 0.07, -0.58], [0.11, 0.50, -0.72], [-0.82, 1.11, -0.50], [-2.47, 2.19, 0.14]];
const SG_WAVE = '<path d="M0 340 C90 310 180 330 214 392 C230 424 210 452 182 446 C160 440 160 414 180 414 C164 384 110 378 64 404 C40 418 18 436 0 446 Z"/><path d="M10 352 C90 326 170 344 204 396" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>';
// Dove sta ognuno nella stanza r.
function sgPos(j, r) { return r === 0 ? SG_X0[j] : SG_HX(r - 1) + SG_OFF[j]; }
function sgProj(v) { const c = Math.cos(2.88), s = Math.sin(2.88), S = 90; return [1640 + S * (v[0] * c - v[1] * s), 291 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
// Un vettore come riga di semi e numeri, in SVG chiaro.
function sgVec(P, v, fs) { let g = ''; v.forEach((x, i) => { const ox = i * fs * 5.4; g += P.seme(i, ox, -fs * 0.35, fs / 28, true) + '<text x="' + (ox + fs * 0.75) + '" y="0" font-family="JetBrains Mono, monospace" font-size="' + fs + '" fill="#9BE7C4">' + P.fmt(x) + '</text>'; }); return g; }
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
  const o = SG_RH * r, sfondo = ['#262F60', '#1F3B2C', '#1E4630', '#1A5A34'][r];
  let s = '<rect x="0" y="' + o + '" width="1920" height="' + SG_RH + '" fill="url(#sg-muro' + r + ')"/>' +
    '<defs><linearGradient id="sg-muro' + r + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="' + sfondo + '"/></linearGradient></defs>';
  if (r === 0) s += '<ellipse cx="960" cy="' + (o + 640) + '" rx="620" ry="110" fill="#1E5A3A" opacity=".35"/><path d="M140 ' + (o + 1080) + ' L340 ' + (o + 120) + ' M1780 ' + (o + 1080) + ' L1580 ' + (o + 120) + '" stroke="#2A3466" stroke-width="6"/>';
  if (r === 1) {
    s += '<path d="M0 ' + (o + 200) + ' C200 ' + (o + 186) + ' 380 ' + (o + 236) + ' 560 ' + (o + 214) + '" stroke="#6E4A33" stroke-width="22" stroke-linecap="round" fill="none"/>' +
      '<circle cx="520" cy="' + (o + 200) + '" r="46" fill="#3FAF5F" opacity=".8"/><circle cx="440" cy="' + (o + 180) + '" r="38" fill="#4CBF6A" opacity=".8"/>' +
      '<path d="M300 ' + (o + 216) + ' L300 ' + (o + 250) + '" stroke="#8B93B8" stroke-width="2"/>' +
      '<g class="sg-bov"><g transform="rotate(-6) scale(.9)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
      '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<path d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/>' +
      '<text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g></g>' +
      '<g transform="translate(1200 ' + (o + 560) + ')"><path d="M-130 340 L-100 -40 L100 -40 L130 340" stroke="#8A5A3C" stroke-width="14" fill="none" stroke-linejoin="round"/><path d="M-110 -40 L110 -40" stroke="#6E4A33" stroke-width="16" stroke-linecap="round"/>' +
      '<path d="M-40 -40 L-40 180 M40 -40 L40 180 M-56 180 L56 180" stroke="#C9C1B2" stroke-width="5" stroke-linecap="round" fill="none"/></g>' +
      '<text x="1200" y="' + (o + 470) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="38" fill="#FFE9A8">altalena</text>' +
      '<g transform="translate(1660 ' + (o + 560) + ')"><path d="M-120 340 L-120 40 M-80 340 L-80 40 M-120 100 L-80 100 M-120 170 L-80 170 M-120 240 L-80 240" stroke="#C9C1B2" stroke-width="8" stroke-linecap="round"/><path d="M-80 40 C40 60 120 220 220 330" stroke="#E5484D" stroke-width="22" stroke-linecap="round" fill="none"/></g>' +
      '<text x="1700" y="' + (o + 560) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="38" fill="#FFD3C2">scivolo</text>' +
      '<text x="760" y="' + (o + 320) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#CDEFB0">foglie</text>';
    for (let k = 0; k < 12; k++) s += '<path class="sg-foglia" d="M0 -14 C10 -6 10 8 0 14 C-10 8 -10 -6 0 -14 Z" fill="' + ['#7BC96F', '#E8A33B', '#4CBF6A', '#C9973F'][k % 4] + '"/>';
    s += '<path d="M0 ' + (o + 830) + ' C400 ' + (o + 812) + ' 900 ' + (o + 826) + ' 1300 ' + (o + 818) + ' C1600 ' + (o + 812) + ' 1800 ' + (o + 822) + ' 1920 ' + (o + 830) + ' L1920 ' + (o + 900) + ' L0 ' + (o + 900) + ' Z" fill="#5FA05A"/>';
  }
  if (r === 2) {
    s += '<circle cx="880" cy="' + (o + 420) + '" r="120" fill="#2E7A45" opacity=".7"/><circle cx="780" cy="' + (o + 470) + '" r="90" fill="#2E7A45" opacity=".7"/><rect x="866" y="' + (o + 500) + '" width="28" height="330" fill="#5A3E2E"/>' +
      '<rect x="360" y="' + (o + 700) + '" width="300" height="130" rx="10" fill="#6E4A33"/>' +
      '<g transform="translate(400 ' + (o + 540) + ') scale(1.15)">' + window.PZ.corre() + '</g>' +
      '<text class="sg-nuota2" x="510" y="' + (o + 520) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="52" fill="#FFD978">corre</text>' +
      '<text x="150" y="' + (o + 300) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#CDEFB0">foglie</text><text x="1060" y="' + (o + 280) + '" font-family="Fredoka, sans-serif" font-size="38" fill="#FFE9A8">altalena</text>' +
      '<path d="M0 ' + (o + 830) + ' L1920 ' + (o + 830) + ' L1920 ' + (o + 900) + ' L0 ' + (o + 900) + ' Z" fill="#4C8F4A"/>';
  }
  if (r === 3) {
    s += '<ellipse cx="960" cy="' + (o + 560) + '" rx="760" ry="260" fill="#4CBF6A" opacity=".22" filter="url(#pz-soft)"/>' +
      '<text class="sg-nuota3" x="1060" y="' + (o + 440) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="120" fill="#8EE8A8">corre</text>' +
      '<text class="sg-gioca3" x="1430" y="' + (o + 610) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="70" fill="#5FD0D0">gioca</text>' +
      '<path d="M0 ' + (o + 860) + ' C500 ' + (o + 840) + ' 1400 ' + (o + 850) + ' 1920 ' + (o + 862) + ' L1920 ' + (o + 900) + ' L0 ' + (o + 900) + ' Z" fill="#3B6B3E"/>';
  }
  return s + sgLastra(r);
}
function sgPersonaggio(P, j) {
  const fig = j === 0 ? '<g transform="translate(-102 -166)">' + P.al() + '</g>' : j === 1 ? '<g transform="translate(-100 -178)">' + P.parco() + '</g>' : '<g transform="translate(-80 -219) scale(.8)">' + P.emma(P.VESTITO.rosa) + '</g>';
  const mosso = j === 2 ? '<g transform="translate(-128 -230) scale(.8)">' + P.emmaTirata(P.VESTITO.rosa) + '</g>' :
    '<path d="M-150 -120 L-100 -120 M-160 -90 L-110 -90 M-150 -60 L-100 -60" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" opacity=".45"/><g transform="rotate(18)">' + fig + '</g>';
  return '<g class="sg-p"><g class="sg-n">' + fig + '</g><g class="sg-m"><g class="sg-dir">' + mosso + '</g></g></g>';
}
kit.scene('piani', {
  init(kit) {
    const P = window.PZ, V = P.VESTITO.parco;
    let mondo = '';
    for (let r = 0; r < 4; r++) mondo += sgStanza(r);
    // Botole e ingranaggi: tante per ogni pavimento; se ne aprirà una sola.
    for (let r = 0; r < 3; r++) SG_BOTOLE.forEach((h, b) => {
      const y = SG_F(r), sc = b === SG_SCELTA[r] ? 1 : 0;
      mondo += '<g class="sg-ing" data-r="' + r + '" data-s="' + sc + '"><circle cx="' + h + '" cy="' + (y + 92) + '" r="50" fill="#141A33" stroke="#2A3350" stroke-width="6"/><circle class="sg-ingluce" cx="' + h + '" cy="' + (y + 92) + '" r="44" fill="#FFD978" opacity="0"/>' +
        '<g transform="translate(' + h + ' ' + (y + 92) + ')"><g class="sg-rot">' + sgIngranaggio() + '</g></g></g>' +
        '<g class="sg-cop" data-r="' + r + '" data-s="' + sc + '"><ellipse cx="' + h + '" cy="' + (y + 4) + '" rx="80" ry="20" fill="#56658A" stroke="#2A3350" stroke-width="4"/><path d="M' + (h - 50) + ' ' + (y + 4) + ' L' + (h + 50) + ' ' + (y + 4) + '" stroke="#2A3350" stroke-width="3"/></g>' +
        (sc ? '<ellipse class="sg-buco" data-r="' + r + '" cx="' + h + '" cy="' + (y + 4) + '" rx="0" ry="0" fill="#05060C" stroke="#7A86A8" stroke-width="5"/>' : '');
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
    // Il ripasso accelerato: tre scie che passano insieme dalle stesse botole.
    for (let j = 0; j < 3; j++) {
      let d = 'M' + sgPos(j, 0) + ' ' + (SG_F(0) - 90);
      for (let r = 0; r < 3; r++) d += ' L' + SG_IN(j, r) + ' ' + (SG_F(r) + 10) + ' L' + sgPos(j, r + 1) + ' ' + (SG_F(r + 1) - 90);
      mondo += '<path class="sg-scia" d="' + d + '" stroke="' + SG_SCIA[j] + '" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0"/>' +
        '<g class="sg-luce" opacity="0"><circle r="90" fill="' + SG_SCIA[j] + '" opacity=".45" filter="url(#pz-soft)"/><circle r="38" fill="#FFF4E0"/></g>';
    }
    // Il monitor nell'angolo: la scia di Emma, una freccia per piano.
    const O = sgProj([0, 0, 0]);
    let hud = '<g class="sg-hud"><rect x="1460" y="40" width="420" height="380" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1484" y="78" font-family="JetBrains Mono, monospace" font-size="16" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · DUE SCIE</text>';
    [[1.2, 0, 0], [0, 1.2, 0], [0, 0, 1.2]].forEach((d, i) => { const e = sgProj(d), e2 = sgProj(d.map(x => x * 1.16)); hud += '<line x1="' + O[0].toFixed(1) + '" y1="' + O[1].toFixed(1) + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="#2F6F73" stroke-width="3"/><g transform="translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')"><circle r="13" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.5) + '</g>'; });
    for (let i = 1; i < 4; i++) { const a = sgProj(SG_VIERI[i - 1]), b = sgProj(SG_VIERI[i]); hud += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + P.VESTITO.mare[i] + '" stroke-width="' + (3 + 2 * i) + '" stroke-linecap="round" opacity=".3"/>'; }
    hud += '<text x="1484" y="404" font-family="JetBrains Mono, monospace" font-size="14" fill="#5FB89A">blu: ieri · verde: oggi</text>';
    const q0 = sgProj(SG_V[0]);
    hud += '<circle cx="' + q0[0].toFixed(1) + '" cy="' + q0[1].toFixed(1) + '" r="7" fill="' + V[0] + '"/>';
    for (let i = 1; i < 4; i++) { const a = sgProj(SG_V[i - 1]), b = sgProj(SG_V[i]); hud += '<g class="sg-fr"><line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + V[i] + '" stroke-width="' + (3 + 2 * i) + '" stroke-linecap="round"/><circle cx="' + b[0].toFixed(1) + '" cy="' + b[1].toFixed(1) + '" r="8" fill="' + V[i] + '"/></g>'; }
    hud += '</g>';
    kit.stage.append(kit.h('<div class="ground" style="background:#070912"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="sg-mondo">' + mondo + '</g>' + hud +
      '<g class="sg-ban"><rect x="60" y="40" width="1080" height="80" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<g transform="translate(90 92)"><text font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">x1 =</text><g transform="translate(90 0)">' + sgVec(P, SG_V[1], 24) + '</g>' +
      '<text x="490" font-family="JetBrains Mono, monospace" font-size="26" fill="#8B93B8">(ieri:</text><g transform="translate(600 0)">' + sgVec(P, SG_VIERI[1], 24) + '</g><text x="990" font-family="JetBrains Mono, monospace" font-size="26" fill="#8B93B8">)</text></g></g>' +
      '<g class="sg-ban2"><rect x="60" y="40" width="860" height="80" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="490" y="92" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#9BE7C4">Le stanze sono letture, non tappe obbligate.</text></g>' +
      '</svg>' +
      P.sott('NARRATORE', 'La nuova carta era diversa, e la forza invisibile li tirò da un’altra parte.') +
      P.sott('ADA', 'Da qui le due strade si separano.') +
      P.sott('NARRATORE', 'E il vestito di Emma diventò verde, come un prato.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.mondo = q('.sg-mondo'); this.hud = q('.sg-hud'); this.ban = q('.sg-ban'); this.ban2 = q('.sg-ban2'); this.foglie = all('.sg-foglia');
    this.scia = all('.sg-scia'); this.luci = all('.sg-luce');
    this.lun = this.scia.map(p => { try { return p.getTotalLength(); } catch (e) { return 4000; } });
    this.p = all('.sg-p').map(g => ({ g, n: g.querySelector('.sg-n'), m: g.querySelector('.sg-m'), dir: g.querySelector('.sg-dir') }));
    this.vest = [this.p[2].n.firstElementChild.firstElementChild, this.p[2].dir.firstElementChild.firstElementChild];
    this.ing = all('.sg-ing').map(g => ({ r: +g.getAttribute('data-r'), s: +g.getAttribute('data-s'), rot: g.querySelector('.sg-rot'), luce: g.querySelector('.sg-ingluce') }));
    this.cop = all('.sg-cop').map(g => ({ g, r: +g.getAttribute('data-r'), s: +g.getAttribute('data-s') }));
    this.buchi = all('.sg-buco'); this.sg = all('.sg-sg'); this.fr = all('.sg-fr');
    this.bov = q('.sg-bov'); this.n2 = q('.sg-nuota2'); this.n3 = q('.sg-nuota3'); this.g3 = q('.sg-gioca3');
    this.sub = window.PZ.subs(kit, [[0.4, 7.0], [9.2, 12.2], [28.6, 33.0]]);
  },
  render(t) {
    const P = window.PZ, V = P.VESTITO.parco;
    // La camera segue la caduta; alla fine si allontana fino a mostrare tutti i piani del nostro pozzo.
    let cam = 0;
    SG_OPEN.forEach(o => { cam += eio(seg(t, o + 0.5, o + 2.0)); });
    const z = eio(seg(t, SG_ZOOM[0], SG_ZOOM[1])), zs = lerp(1, 0.24, z);
    const ty = lerp(-cam * SG_RH, 20, z), tx = 960 * (1 - zs);
    this.mondo.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + zs.toFixed(4) + ')');
    // I tre viaggiatori: fermi, poi tirati tutti verso la stessa botola, poi giù nella stanza sotto.
    this.p.forEach((C, j) => {
      let x = SG_X0[j], y = SG_F(0), moving = false, dirx = 1, squash = 0;
      SG_OPEN.forEach((o0, r) => {
        const o = o0 + (2 - j) * 0.18;
        if (t < o) return;
        const x0 = sgPos(j, r), h = SG_IN(j, r), x1 = sgPos(j, r + 1);
        const a = seg(t, o, o + 0.7), b = seg(t, o + 0.7, o + 1.8);
        x = b > 0 ? lerp(h, x1, eio(b)) : lerp(x0, h, eio(a)); y = lerp(SG_F(r), SG_F(r + 1), ei(b)) - 40 * Math.sin(Math.PI * a);
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
    // Girano tutti gli ingranaggi; poi se ne accende uno solo, e si apre la sua botola.
    this.ing.forEach(I => {
      const o = SG_OPEN[I.r], on = seg(t, o - 1.6, o + 0.2);
      const ang = on <= 0 ? 0 : on >= 1 ? 480 : 480 * on;
      I.rot.setAttribute('transform', 'rotate(' + ang.toFixed(1) + ')');
      const scelta = I.s ? eo(seg(t, o - 0.7, o - 0.4)) * (1 - seg(t, o + 0.8, o + 1.4)) : 0;
      I.luce.setAttribute('opacity', (on > 0 && on < 1 ? 0.12 : 0) + scelta * (0.55 + 0.2 * Math.sin(t * 12)));
    });
    this.cop.forEach(C => { const o = SG_OPEN[C.r]; C.g.setAttribute('opacity', C.s ? (1 - seg(t, o - 0.3, o - 0.1)) + seg(t, o + 2.8, o + 3.0) : 1); });
    this.buchi.forEach(b => {
      const o = SG_OPEN[+b.getAttribute('data-r')];
      const op = eob(seg(t, o - 0.3, o), 1.4) * (1 - eio(seg(t, o + 2.4, o + 2.9)));
      b.setAttribute('rx', (90 * op).toFixed(1)); b.setAttribute('ry', (22 * op).toFixed(1));
    });
    this.sg.forEach((g, i) => {
      const t0 = SG_SGUARDI[i + 1];
      const k = Math.sin(Math.PI * seg(t, t0, t0 + 1.4));
      g.setAttribute('opacity', (k * (0.75 + 0.25 * Math.sin(t * 9))).toFixed(2));
    });
    this.fr.forEach((f, i) => f.setAttribute('opacity', eo(seg(t, SG_OPEN[i] + 2.0, SG_OPEN[i] + 2.6)).toFixed(2)));
    this.hud.setAttribute('opacity', (eo(seg(t, 0.5, 1.2)) * (1 - eio(seg(t, SG_ZOOM[0] - 0.4, SG_ZOOM[0] + 0.4)))).toFixed(2));
    this.ban.setAttribute('opacity', (eo(seg(t, 12.4, 13.0)) * (1 - seg(t, 15.4, 16.0))).toFixed(2));
    this.ban2.setAttribute('opacity', (eo(seg(t, 19.4, 20.0)) * (1 - seg(t, 24.0, 24.6))).toFixed(2));
    // Le foglie che cadono dal soffitto, nella prima stanza.
    this.foglie.forEach((f, k) => { const ph = ((t * 0.12 + k * 0.083) % 1), x = 80 + ((k * 157) % 1760) + 40 * Math.sin(t * 1.3 + k), y = SG_RH + 60 + ph * 760; f.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + ((t * 60 + k * 37) % 360).toFixed(0) + ')'); });
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
    this.bov.setAttribute('transform', 'translate(300 ' + (SG_RH + 390 + 4 * Math.sin(t * 1.3)).toFixed(1) + ') rotate(' + (4 * Math.sin(t * 0.9)).toFixed(2) + ' 0 -140)');
    const gl = 0.85 + 0.15 * Math.sin(t * 2.4);
    this.n2.setAttribute('opacity', gl.toFixed(2)); this.n3.setAttribute('opacity', gl.toFixed(2)); this.g3.setAttribute('opacity', (0.8 * gl).toFixed(2));
    this.sub(t);
  },
});
