const { seg, eo, eio, eob, lerp, TextFx } = kit;
const RI = [
  ['1', 'Lo Spezzaparole: testo → token → numeri', 'fuori dal modello', '#E8743B'],
  ['2', 'Il pozzo: numeri → un secchio di probabilità', 'il modello, deterministico', '#8FB6FF'],
  ['3', 'Ada pesca, con il termostato', 'fuori dal modello', '#E8743B'],
  ['4', 'La parola pescata torna in fila', 'e si ricomincia', '#9BE7C4'],
  ['5', 'Stop: la pallina Fine, o la forbice', 'previsto, o limite esterno', '#9BE7C4'],
];
kit.scene('riepilogo', {
  init(kit) {
    const P = window.PZ;
    let righe = '';
    RI.forEach(([n, a, b, c]) => {
      righe += '<div class="ri-r" style="display:flex;align-items:baseline;gap:28px"><span style="font-family:var(--display, var(--sans, system-ui, sans-serif));font-weight:600;font-size:54px;color:' + c + ';width:50px">' + n + '</span>' +
        '<span style="font-family:var(--display, var(--sans, system-ui, sans-serif));font-size:44px;color:var(--second)">' + a + '</span>' +
        '<span style="font-family:var(--mono, ui-monospace, monospace);font-size:27px;color:color-mix(in srgb, var(--second) 80%, var(--ground))">' + b + '</span></div>';
    });
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="words ri-a" style="left:140px;top:110px;width:1640px;gap:30px">' + righe +
      '<div class="ri-f" style="margin-top:34px;font-family:var(--display, var(--sans, system-ui, sans-serif));font-weight:600;font-size:52px;color:var(--main)">Il pozzo non decide: calcola. La scelta è fuori.</div></div>' +
      '<div class="ri-b" style="position:absolute;inset:0">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<ellipse cx="960" cy="1100" rx="900" ry="240" fill="#398BE9" opacity=".16" filter="url(#pz-soft)"/>' +
      '<g class="ri-e1"><g transform="translate(-100 -150)">' + P.emma('#398BE9') + '</g></g><g class="ri-e2"><g transform="translate(-100 -150)">' + P.emma('#39E98B') + '</g></g>' +
      '<g class="ri-ada"><g transform="translate(-100 -160) scale(1.05)">' + P.ada('quaderno', 'felice') + '</g></g></svg>' +
      '<div class="words" style="left:760px;top:330px;width:1060px"><p class="sub ri-k">Il pozzo delle parole</p><h2 class="line ri-t" style="font-size:96px">Prossimo esperimento:</h2><p class="ri-q" style="font-family:var(--display, var(--sans, system-ui, sans-serif));font-size:58px;color:var(--main)">come si costruisce un pozzo?</p>' +
      '<div class="ri-seg" style="width:200px;height:8px;border-radius:4px;background:var(--accent);transform-origin:0 50%"></div></div></div></div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.r = all('.ri-r').map(e => e.style); this.f = q('.ri-f').style; this.a = q('.ri-a').style; this.b = q('.ri-b').style;
    this.e1 = q('.ri-e1'); this.e2 = q('.ri-e2'); this.ada = q('.ri-ada'); this.t = q('.ri-t'); this.k = q('.ri-k').style; this.qq = q('.ri-q').style; this.sg = q('.ri-seg').style;
  },
  render(t) {
    this.r.forEach((s, i) => { const p = eo(seg(t, -0.4 + i * 0.55, 0.1 + i * 0.55)); s.opacity = p; s.transform = 'translateX(' + (26 * (1 - p)).toFixed(1) + 'px)'; });
    this.f.opacity = eo(seg(t, 3.2, 3.8));
    const x = eio(seg(t, 6.6, 7.4));
    this.a.opacity = 1 - x; this.b.opacity = x;
    const p1 = seg(t, 7.2, 8.0), p2 = seg(t, 7.5, 8.3), p3 = seg(t, 7.8, 8.6);
    this.e1.setAttribute('transform', 'translate(400 ' + (600 + 8 * Math.sin(t * 1.6)).toFixed(1) + ') scale(' + (p1 <= 0 ? 0 : 0.9 * eob(p1, 1.7)).toFixed(3) + ')');
    this.e2.setAttribute('transform', 'translate(610 ' + (620 + 8 * Math.sin(t * 1.6 + 1)).toFixed(1) + ') scale(' + (p2 <= 0 ? 0 : 0.9 * eob(p2, 1.7)).toFixed(3) + ')');
    this.ada.setAttribute('transform', 'translate(170 ' + (700 + 4 * Math.sin(t * 1.3)).toFixed(1) + ') scale(' + (p3 <= 0 ? 0 : 0.8 * eob(p3, 1.6)).toFixed(3) + ')');
    this.k.opacity = eo(seg(t, 7.4, 7.9));
    TextFx.fadeFromRight(this.t, t, 7.6);
    this.qq.opacity = eo(seg(t, 8.4, 9.0));
    this.sg.transform = 'scaleX(' + eo(seg(t, 9.0, 9.5)) + ')';
  },
});
