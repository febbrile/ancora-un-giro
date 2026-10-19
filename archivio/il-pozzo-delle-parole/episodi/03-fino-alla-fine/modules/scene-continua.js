const { seg, eo, eio, eob, lerp, TextFx } = kit;
// 3.11 · Continua: Ada conta i semi sulla carta di Emma. Ma perché solo tre?
kit.scene('continua', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground" style="background:#F3EADB">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="760" width="1920" height="320" fill="#A9744F"/><rect x="0" y="740" width="1920" height="30" fill="#8A5A3C"/>' +
      '<g transform="translate(150 320) scale(1.4)">' + P.ada('mani', 'occhio') + '</g>' +
      '<g class="co-carta"><g transform="scale(.9) translate(-110 -150)">' + P.carta({ v: [0.55, 0.07, -0.58], col: P.CARTA_COL.Emma, titolo: 'Emma', cls: 'coc' }) + '</g></g></svg>' +
      '<div class="words" style="left:900px;top:300px;width:960px"><p class="sub co-k" style="color:#7A6F60">Il pozzo delle parole</p><h2 class="line co-t" style="font-size:140px;color:#2E2A26">Continua…</h2>' +
      '<p class="sub co-n" style="color:#7A6F60">Episodio 4 · Mille semi</p><div class="co-seg" style="width:180px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div>' +
      P.sott('ADA', 'Ma perché solo tre semi?') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.carta = q('.co-carta'); this.righe = [...kit.stage.querySelectorAll('.coc-r')]; this.t = q('.co-t');
    this.k = q('.co-k').style; this.n = q('.co-n').style; this.s = q('.co-seg').style;
    this.sub = window.PZ.subs(kit, [[1.0, 3.8]]);
  },
  render(t) {
    const P = window.PZ;
    this.carta.setAttribute('transform', 'translate(560 ' + (500 + 6 * Math.sin(t * 1.4)).toFixed(1) + ') rotate(' + (4 * Math.sin(t * 0.9)).toFixed(2) + ')');
    this.righe.forEach((r, i) => { const k = Math.sin(Math.PI * seg(t, 0.8 + i * 0.6, 1.3 + i * 0.6)); const y = P.righeY(3)[i]; r.setAttribute('transform', 'translate(110 ' + y + ') scale(' + (1 + 0.15 * k).toFixed(3) + ') translate(-110 ' + (-y) + ')'); });
    this.k.opacity = eo(seg(t, 3.8, 4.3));
    TextFx.fadeFromRight(this.t, t, 4.0);
    this.n.opacity = eo(seg(t, 4.8, 5.3));
    this.s.transform = 'scaleX(' + eo(seg(t, 5.2, 5.7)) + ')';
    this.sub(t);
  },
});
