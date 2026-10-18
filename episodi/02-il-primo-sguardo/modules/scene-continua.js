const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('continua', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<ellipse cx="960" cy="1120" rx="900" ry="260" fill="#87FE87" opacity=".14" filter="url(#pz-soft)"/>' +
      '<g class="cont-emma"><g transform="translate(-100 -150)">' + P.emma('#398BE9') + '</g></g>' +
      '<g class="cont-parco"><g transform="translate(-100 -150)">' + P.emma('#FE8787') + '</g><text x="0" y="-150" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="64" fill="#FFD978">?</text></g></svg>' +
      '<div class="words" style="left:820px;top:360px;width:1000px"><p class="sub cont-k">Il pozzo delle parole</p><h2 class="line cont-t" style="font-size:140px">Continua…</h2>' +
      '<p class="sub cont-n">Episodio 3 · Al parco</p><div class="cont-seg" style="width:180px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div></div>'));
    const q = s => kit.stage.querySelector(s);
    this.e = q('.cont-emma'); this.pc = q('.cont-parco'); this.t = q('.cont-t');
    this.k = q('.cont-k').style; this.n = q('.cont-n').style; this.s = q('.cont-seg').style;
  },
  render(t) {
    const p = seg(t, 0, 0.9), p2 = seg(t, 1.0, 1.9);
    this.e.setAttribute('transform', 'translate(380 ' + (560 + 10 * Math.sin(t * 1.6)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : 0.95 * eob(p, 1.7)).toFixed(3) + ')');
    this.pc.setAttribute('transform', 'translate(620 ' + (580 + 10 * Math.sin(t * 1.6 + 1)).toFixed(1) + ') scale(' + (p2 <= 0 ? 0 : 0.95 * eob(p2, 1.7)).toFixed(3) + ')');
    this.k.opacity = eo(seg(t, 0.2, 0.7));
    TextFx.fadeFromRight(this.t, t, 0.4);
    this.n.opacity = eo(seg(t, 1.2, 1.7));
    this.s.transform = 'scaleX(' + eo(seg(t, 1.6, 2.1)) + ')';
  },
});
