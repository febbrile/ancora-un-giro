const { seg, eo, eio, eob, lerp, TextFx } = kit;
// 2.9 · Continua: la pallina «corre» si muove da sola. E dopo, cosa viene?
kit.scene('continua', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground" style="background:#F3EADB">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="760" width="1920" height="320" fill="#A9744F"/><rect x="0" y="740" width="1920" height="30" fill="#8A5A3C"/>' +
      '<g transform="translate(160 320) scale(1.4)">' + P.ada('mani', 'sorpresa') + '</g>' +
      '<g class="cont-palla"><circle r="30" fill="#2E9E4F"/><ellipse cx="-9" cy="-10" rx="9" ry="5" fill="#FFFFFF" opacity=".4"/>' +
      '<text y="-48" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="36" fill="#2E2A26">corre</text></g></svg>' +
      '<div class="words" style="left:820px;top:300px;width:1000px"><p class="sub cont-k" style="color:#7A6F60">Il pozzo delle parole</p><h2 class="line cont-t" style="font-size:140px;color:#2E2A26">Continua…</h2>' +
      '<p class="sub cont-n" style="color:#7A6F60">Episodio 3 · Fino alla Fine</p><div class="cont-seg" style="width:180px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div>' +
      P.sott('ADA', 'E dopo «corre», cosa viene?') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.palla = q('.cont-palla'); this.t = q('.cont-t');
    this.k = q('.cont-k').style; this.n = q('.cont-n').style; this.s = q('.cont-seg').style;
    this.sub = window.PZ.subs(kit, [[1.0, 4.4]]);
  },
  render(t) {
    const salto = Math.abs(Math.sin(t * 3.2)) * 26 * seg(t, 0.6, 1.2);
    this.palla.setAttribute('transform', 'translate(' + (640 + 10 * Math.sin(t * 2.1)).toFixed(1) + ' ' + (710 - salto).toFixed(1) + ') rotate(' + (8 * Math.sin(t * 4)).toFixed(2) + ')');
    this.k.opacity = eo(seg(t, 4.6, 5.1));
    TextFx.fadeFromRight(this.t, t, 4.8);
    this.n.opacity = eo(seg(t, 5.6, 6.1));
    this.s.transform = 'scaleX(' + eo(seg(t, 6.0, 6.5)) + ')';
    this.sub(t);
  },
});
