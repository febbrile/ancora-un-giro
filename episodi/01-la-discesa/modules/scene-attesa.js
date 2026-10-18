const { seg, eo, eio, lerp } = kit;
function attesaMetà(P, parco) {
  return '<svg class="art" viewBox="0 0 960 1080">' + P.defs +
    '<defs><linearGradient id="attesa-m' + (parco ? 'p' : 'm') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient></defs>' +
    '<rect width="960" height="1080" fill="url(#attesa-m' + (parco ? 'p' : 'm') + ')"/><rect y="760" width="960" height="320" fill="#1B2244"/><path d="M0 760 L960 760" stroke="#2A3466" stroke-width="4"/>' +
    '<g transform="translate(155 635) scale(.75)">' + P.al() + '</g>' +
    '<g transform="translate(400 ' + (parco ? 619 : 613) + ') scale(.8)">' + (parco ? P.parco() : P.mare()) + '</g>' +
    '<g class="attesa-emma" style="transform-origin:730px 760px"><g transform="translate(675 595) scale(.55)">' + P.emma('#FE8787') + '</g>' +
    '<text x="730" y="578" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="56" fill="#FFD978">?</text></g></svg>';
}
kit.scene('attesa', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="attesa-sx" style="position:absolute;left:0;top:0;width:960px;height:1080px;overflow:hidden;transform-origin:480px 540px">' + attesaMetà(P, false) + '</div>' +
      '<div class="attesa-dx" style="position:absolute;left:960px;top:0;width:960px;height:1080px;overflow:hidden;transform-origin:0 0;border-radius:0">' + attesaMetà(P, true) + '</div>' +
      '<div class="attesa-et" style="position:absolute;left:1500px;top:470px;width:346px;text-align:center;font-family:var(--mono, ui-monospace, monospace);font-size:20px;color:var(--second)">esperimento 2 · in attesa</div>' +
      P.sott('ADA', 'Partiamo dal mare. Tu, Emma del parco, aspettami qui.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.sx = q('.attesa-sx').style; this.dx = q('.attesa-dx').style; this.et = q('.attesa-et').style;
    this.emme = [...kit.stage.querySelectorAll('.attesa-emma')].map(e => e.style);
    this.sub = window.PZ.subs(kit, [[0.4, 5.8]]);
  },
  render(t) {
    const p = eio(seg(t, 1.6, 3.2));
    const fz = seg(t, 1.0, 1.5);
    this.dx.filter = 'grayscale(' + (0.85 * fz).toFixed(2) + ') brightness(' + (1 - 0.25 * fz).toFixed(2) + ')';
    this.dx.transform = 'translate(' + lerp(0, 540, p) + 'px,' + lerp(0, 64, p) + 'px) scale(' + lerp(1, 0.36, p) + ')';
    this.dx.outline = p > 0 ? (lerp(0, 12, p)).toFixed(1) + 'px solid #C9973F' : 'none';
    this.dx.borderRadius = lerp(0, 30, p) + 'px';
    this.et.opacity = eo(seg(t, 3.0, 3.5));
    this.sx.transform = 'translateX(' + lerp(0, 380, p) + 'px) scale(' + (lerp(1, 1.08, p) + 0.004 * t) + ')';
    this.emme.forEach((e, i) => { e.transform = 'scale(' + (1 + (i === 0 ? 0.015 * Math.sin(t * 2 * Math.PI / 3) : 0)) + ')'; });
    this.sub(t);
  },
});
