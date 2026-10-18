const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('continua', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<ellipse cx="960" cy="1120" rx="900" ry="260" fill="#398BE9" opacity=".18" filter="url(#pz-soft)"/>' +
      '<g class="continua-emma"><g transform="translate(-100 -150)">' + P.emma('#FE8787') + '</g>' +
      '<text x="0" y="-150" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="72" fill="#FFD978">?</text></g></svg>' +
      '<div class="words" style="left:720px;top:360px;width:1060px"><p class="sub continua-kicker">Il pozzo delle parole</p><h2 class="line continua-tit" style="font-size:140px">Continua…</h2>' +
      '<p class="sub continua-next">Episodio 2 · Il primo sguardo</p>' +
      '<div class="continua-seg" style="width:180px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div></div>'));
    const q = s => kit.stage.querySelector(s);
    this.emma = q('.continua-emma');
    this.tit = q('.continua-tit');
    this.k = q('.continua-kicker').style; this.n = q('.continua-next').style; this.seg = q('.continua-seg').style;
  },
  render(t) {
    const p = seg(t, 0, 0.9);
    const y = 560 + 10 * Math.sin(t * 1.6);
    this.emma.setAttribute('transform', 'translate(440 ' + y.toFixed(1) + ') scale(' + (p <= 0 ? 0 : 1.05 * eob(p, 1.7)).toFixed(3) + ') rotate(' + (4 * Math.sin(t * 1.1)).toFixed(2) + ')');
    this.k.opacity = eo(seg(t, 0.2, 0.7));
    TextFx.fadeFromRight(this.tit, t, 0.4);
    this.n.opacity = eo(seg(t, 1.2, 1.7));
    this.seg.transform = 'scaleX(' + eo(seg(t, 1.6, 2.1)) + ')';
  },
});
