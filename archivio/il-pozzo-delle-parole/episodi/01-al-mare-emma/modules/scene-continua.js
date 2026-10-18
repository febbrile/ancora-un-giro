const { seg, eo, eio, eob, lerp, TextFx } = kit;
// 1.11 · Continua: e se invece fosse al parco?
kit.scene('continua', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<ellipse cx="960" cy="1120" rx="900" ry="260" fill="#87FE87" opacity=".14" filter="url(#pz-soft)"/>' +
      '<g class="cont-emma"><g transform="translate(-100 -150)">' + P.emma(P.VESTITO.rosa) + '</g>' +
      '<text x="0" y="-150" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="72" fill="#FFD978">?</text></g></svg>' +
      '<div class="words" style="left:720px;top:330px;width:1060px"><p class="sub cont-k">Il pozzo delle parole</p><h2 class="line cont-t" style="font-size:140px">Continua…</h2>' +
      '<p class="sub cont-n">Episodio 2 · Al parco Emma</p>' +
      '<div class="cont-seg" style="width:180px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div>' +
      P.sott('ADA', 'E se invece fosse al parco?') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.emma = q('.cont-emma'); this.tit = q('.cont-t');
    this.k = q('.cont-k').style; this.n = q('.cont-n').style; this.s = q('.cont-seg').style;
    this.sub = window.PZ.subs(kit, [[0.6, 4.4]]);
  },
  render(t) {
    const p = seg(t, 0, 0.9);
    this.emma.setAttribute('transform', 'translate(440 ' + (560 + 10 * Math.sin(t * 1.6)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : 1.05 * eob(p, 1.7)).toFixed(3) + ') rotate(' + (4 * Math.sin(t * 1.1)).toFixed(2) + ')');
    this.k.opacity = eo(seg(t, 0.2, 0.7));
    TextFx.fadeFromRight(this.tit, t, 0.4);
    this.n.opacity = eo(seg(t, 1.2, 1.7));
    this.s.transform = 'scaleX(' + eo(seg(t, 1.6, 2.1)) + ')';
    this.sub(t);
  },
});
