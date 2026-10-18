const { seg, eo, eio, eob, lerp } = kit;
const ID_TOK = [
  { nome: 'Al', v: [0.10, 0.10, -0.20], c: '#17B3B3', t0: 1.4, dx: 18, dy: 30 },
  { nome: 'mare', v: [0.80, 0.05, 0.05], c: '#8787FE', t0: 1.9, dx: 18, dy: 6 },
  { nome: 'parco', v: [0.05, 0.80, 0.05], c: '#87FE87', t0: 2.4, dx: -150, dy: 6 },
  { nome: 'Emma', v: [0.05, 0.05, 0.80], c: '#FE8787', t0: 2.9, dx: 24, dy: -14 },
];
function idProj(v, a) {
  const S = 330, cx = 640, cy = 540;
  const c = Math.cos(a), s = Math.sin(a);
  return [cx + S * (v[0] * c - v[1] * s), cy - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)];
}
function idFmt(v) { return '[' + v.map(x => x.toFixed(2)).join(', ') + ']'; }
kit.scene('identiche', {
  init(kit) {
    const P = window.PZ;
    let ax = '';
    ['acqua', 'verde', 'nome'].forEach(n => { ax += '<line class="id-asse" stroke="#2F6F73" stroke-width="3"/><text class="id-et" font-family="JetBrains Mono, monospace" font-size="20" fill="#5FB89A">' + n + '</text>'; });
    let tok = '';
    ID_TOK.forEach(k => {
      tok += '<g class="id-tok"><line class="id-gui" stroke="' + k.c + '" stroke-width="1.5" stroke-dasharray="4 6" opacity=".6"/>' +
        (k.nome === 'Emma' ? '<circle class="id-pt" r="13" fill="none" stroke="' + k.c + '" stroke-width="3" stroke-dasharray="5 4"/>' : '<circle class="id-pt" r="12" fill="' + k.c + '"/>') +
        '<text class="id-nome" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="' + k.c + '">' + k.nome + '</text>' +
        '<text class="id-coord" font-family="JetBrains Mono, monospace" font-size="17" fill="#9BE7C4">' + idFmt(k.v) + '</text></g>';
    });
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="840" width="1920" height="240" fill="#A9744F"/><rect x="0" y="820" width="1920" height="30" fill="#8A5A3C"/>' +
      '<g class="id-cam" style="transform-origin:680px 430px">' +
      '<rect x="100" y="50" width="1160" height="760" rx="22" fill="#0F2A2A" stroke="#C9973F" stroke-width="10"/>' +
      '<text x="140" y="104" font-family="JetBrains Mono, monospace" font-size="20" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · OGNI TOKEN HA IL SUO POSTO</text>' +
      ax + tok +
      '<circle class="id-alone" r="30" fill="none" stroke="#FE8787" stroke-width="3"/>' +
      '<circle class="id-pm" r="13" fill="#FE8787" stroke="#8787FE" stroke-width="5"/>' +
      '<circle class="id-pp" r="13" fill="#FE8787" stroke="#87FE87" stroke-width="5"/>' +
      '<g class="id-r1"><circle cx="156" cy="712" r="10" fill="#FE8787" stroke="#8787FE" stroke-width="4"/><text x="180" y="722" font-family="JetBrains Mono, monospace" font-size="27" fill="#E6FFF4">Emma, frase del mare:  [0.05, 0.05, 0.80]</text></g>' +
      '<g class="id-r2"><circle cx="156" cy="758" r="10" fill="#FE8787" stroke="#87FE87" stroke-width="4"/><text x="180" y="768" font-family="JetBrains Mono, monospace" font-size="27" fill="#E6FFF4">Emma, frase del parco: [0.05, 0.05, 0.80]</text></g>' +
      '<g class="id-timbro"><g transform="rotate(-7)"><rect x="-160" y="-38" width="320" height="76" rx="10" fill="#0F2A2A" stroke="#E8743B" stroke-width="6"/>' +
      '<text x="0" y="15" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" letter-spacing="3" fill="#E8743B">STESSO PUNTO</text></g></g></g>' +
      '<g class="id-ada" style="transform-origin:1560px 840px"><g transform="translate(1400 300) scale(1.6)">' + P.ada('quaderno', 'felice') + '</g></g></svg>' +
      P.sott('ADA', 'Ogni parola ha un suo posto in questo spazio: Al, mare, parco, Emma. Per ora non importa dove. Guardo Emma: nella frase del mare è qui. Zero virgola zero cinque, zero virgola zero cinque, zero virgola ottanta. Nella frase del parco… stesso punto. Identiche! Ne ha altre 4.093, ma il mio schermo ne mostra solo tre.') + '</div>'));
    const all = s => [...kit.stage.querySelectorAll(s)];
    const q = s => kit.stage.querySelector(s);
    this.assi = all('.id-asse'); this.et = all('.id-et');
    this.tok = all('.id-tok').map((g, i) => ({ g, k: ID_TOK[i], gui: g.querySelector('.id-gui'), pt: g.querySelector('.id-pt'), nome: g.querySelector('.id-nome'), coord: g.querySelector('.id-coord') }));
    this.alone = q('.id-alone'); this.pm = q('.id-pm'); this.pp = q('.id-pp');
    this.r1 = q('.id-r1'); this.r2 = q('.id-r2'); this.timbro = q('.id-timbro');
    this.cam = q('.id-cam').style; this.ada = q('.id-ada').style;
    this.sub = window.PZ.subs(kit, [[0.4, 14.6]]);
  },
  render(t) {
    const a = 0.62 + 0.05 * t;
    const O = idProj([0, 0, 0], a);
    const AX = [[1.5, 0, 0], [0, 1.5, 0], [0, 0, 1.25]];
    const axp = eo(seg(t, 0.1, 0.9));
    this.assi.forEach((l, i) => {
      const e = idProj(AX[i].map(x => x * axp), a);
      l.setAttribute('x1', O[0]); l.setAttribute('y1', O[1]); l.setAttribute('x2', e[0].toFixed(1)); l.setAttribute('y2', e[1].toFixed(1));
      this.et[i].setAttribute('x', (e[0] + 10).toFixed(1)); this.et[i].setAttribute('y', (e[1] - 8).toFixed(1));
      this.et[i].setAttribute('opacity', axp.toFixed(2));
    });
    let E = null;
    this.tok.forEach(T => {
      const p = idProj(T.k.v, a), b = idProj([T.k.v[0], T.k.v[1], 0], a);
      if (T.k.nome === 'Emma') E = p;
      const s = seg(t, T.k.t0, T.k.t0 + 0.5);
      T.g.setAttribute('opacity', s > 0 ? 1 : 0);
      T.pt.setAttribute('cx', p[0].toFixed(1)); T.pt.setAttribute('cy', p[1].toFixed(1));
      T.pt.setAttribute('r', ((T.k.nome === 'Emma' ? 13 : 12) * eob(s, 1.8)).toFixed(2));
      T.gui.setAttribute('x1', b[0].toFixed(1)); T.gui.setAttribute('y1', b[1].toFixed(1)); T.gui.setAttribute('x2', p[0].toFixed(1)); T.gui.setAttribute('y2', p[1].toFixed(1));
      T.nome.setAttribute('x', (p[0] + T.k.dx).toFixed(1)); T.nome.setAttribute('y', (p[1] + T.k.dy).toFixed(1));
      T.coord.setAttribute('x', (p[0] + T.k.dx).toFixed(1)); T.coord.setAttribute('y', (p[1] + T.k.dy + 24).toFixed(1));
      T.nome.setAttribute('opacity', eo(seg(t, T.k.t0 + 0.2, T.k.t0 + 0.6)).toFixed(2));
      T.coord.setAttribute('opacity', (eo(seg(t, T.k.t0 + 0.3, T.k.t0 + 0.7)) * (T.k.nome === 'Emma' ? 1 : lerp(1, 0.45, eio(seg(t, 4.4, 5.0))))).toFixed(2));
      if (T.k.nome !== 'Emma') T.g.setAttribute('opacity', s > 0 ? lerp(1, 0.55, eio(seg(t, 4.4, 5.0))).toFixed(2) : 0);
    });
    const pm = seg(t, 4.9, 5.6), pp = seg(t, 9.8, 10.5);
    this.pm.setAttribute('cx', (E[0] - 30 * (1 - eo(pm))).toFixed(1)); this.pm.setAttribute('cy', (E[1] - 240 * (1 - eo(pm))).toFixed(1));
    this.pm.setAttribute('opacity', pm > 0 ? 1 : 0);
    this.pp.setAttribute('cx', (E[0] + 30 * (1 - eo(pp))).toFixed(1)); this.pp.setAttribute('cy', (E[1] - 240 * (1 - eo(pp))).toFixed(1));
    this.pp.setAttribute('opacity', pp > 0 ? 0.9 : 0);
    const ring = seg(t, 10.5, 11.4);
    this.alone.setAttribute('cx', E[0].toFixed(1)); this.alone.setAttribute('cy', E[1].toFixed(1));
    this.alone.setAttribute('r', (16 + 46 * eo(ring)).toFixed(1));
    this.alone.setAttribute('opacity', ring > 0 && ring < 1 ? (1 - ring).toFixed(2) : 0);
    this.r1.setAttribute('opacity', eo(seg(t, 6.3, 6.8)).toFixed(2));
    this.r2.setAttribute('opacity', eo(seg(t, 10.2, 10.7)).toFixed(2));
    const st = seg(t, 10.9, 11.3);
    this.timbro.setAttribute('transform', 'translate(' + (E[0] + 340).toFixed(1) + ' ' + (E[1] + 60).toFixed(1) + ') scale(' + (st <= 0 ? 0 : lerp(1.15, 0.78, eob(st, 1.5))).toFixed(3) + ')');
    this.cam.transform = 'scale(' + (1 + 0.006 * t) + ')';
    this.ada.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3.2)) + ')';
    this.sub(t);
  },
});
