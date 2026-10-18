const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('notte', {
  init(kit) {
    const P = window.PZ;
    const r = kit.rng(3);
    let stars = '';
    for (let i = 0; i < 46; i++) stars += '<circle class="notte-star" cx="' + (r() * 1920).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (1 + r() * 2.2).toFixed(1) + '" fill="#FFF4E0"/>';
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="notte-cam" style="position:absolute;inset:0;transform-origin:1410px 640px">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="notte-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#26306A"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#notte-cielo)"/>' + stars +
      '<circle cx="1640" cy="170" r="120" fill="#FFF1C9" opacity=".18" filter="url(#pz-soft)"/><circle cx="1640" cy="170" r="52" fill="#FFF1C9"/>' +
      '<path d="M0 800 C380 740 760 770 1100 760 C1450 748 1700 770 1920 790 L1920 1080 L0 1080 Z" fill="#1F3B2C"/>' +
      '<path d="M0 860 C420 820 900 850 1300 840 C1600 832 1800 850 1920 860 L1920 1080 L0 1080 Z" fill="#183024"/>' +
      '<g class="notte-pozzo">' +
      '<rect x="548" y="560" width="16" height="170" fill="#8A5A3C"/><rect x="836" y="560" width="16" height="170" fill="#8A5A3C"/><rect x="530" y="548" width="340" height="22" rx="4" fill="#8A5A3C"/>' +
      '<circle cx="700" cy="594" r="22" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/><path d="M700 616 L700 700" stroke="#C9973F" stroke-width="3"/>' +
      '<rect x="560" y="720" width="280" height="110" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/>' +
      '<path d="M560 756 L840 756 M560 792 L840 792 M630 720 L630 756 M720 720 L720 756 M800 720 L800 756 M600 756 L600 792 M690 756 L690 792 M770 756 L770 792 M650 792 L650 830 M740 792 L740 830" stroke="#3E4A66" stroke-width="3"/>' +
      '<ellipse cx="700" cy="722" rx="146" ry="26" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><ellipse class="notte-bocca" cx="700" cy="722" rx="120" ry="16" fill="#070912"/>' +
      '<ellipse class="notte-luce" cx="700" cy="716" rx="110" ry="30" fill="#8FB6FF" opacity=".2" filter="url(#pz-soft)"/></g>' +
      '<g class="notte-lab">' +
      '<path d="M1150 520 L1410 390 L1670 520 Z" fill="#8A5A3C"/><rect x="1180" y="518" width="460" height="300" fill="#A9744F"/>' +
      '<path d="M1180 578 L1640 578 M1180 638 L1640 638 M1180 698 L1640 698 M1180 758 L1640 758" stroke="#8A5A3C" stroke-width="3"/>' +
      '<rect x="1210" y="640" width="70" height="178" rx="4" fill="#6E4A33"/>' +
      '<rect class="notte-fin" x="1310" y="566" width="220" height="150" rx="6" fill="#FFE2A8" stroke="#6E4A33" stroke-width="8"/>' +
      '<rect x="1328" y="600" width="112" height="64" rx="5" fill="#0F2A2A" stroke="#2F6F73" stroke-width="3"/>' +
      '<text class="notte-scritto" x="1336" y="638" font-family="JetBrains Mono, monospace" font-size="14" fill="#9BE7C4"></text>' +
      '<rect class="notte-cursore" x="1336" y="626" width="7" height="15" fill="#9BE7C4"/>' +
      '<g transform="translate(1438 600) scale(.5)">' + P.adaHead('calma') + '</g>' +
      '<path d="M1300 716 L1540 716" stroke="#6E4A33" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M1310 716 L1240 850 L1580 850 L1530 716 Z" fill="#FFE2A8" opacity=".10"/></g>' +
      '</svg></div>' +
      '<div class="words notte-tit" style="left:120px;top:110px;width:1100px"><h1 class="line" style="font-size:112px">Il pozzo delle parole</h1><p class="sub">Episodio 1 · La discesa</p></div>' +
      P.sott('NARRATORE', 'Quando scrivi a un’intelligenza artificiale, la risposta arriva una parola alla volta. E per ogni parola, dentro la macchina, succede un piccolo viaggio.') +
      '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.notte-cam').style;
    this.tit = q('.notte-tit').style;
    this.line = q('.notte-tit .line');
    this.sub = q('.notte-tit .sub').style;
    this.sub = window.PZ.subs(kit, [[3.9, 10.8]]);
    this.stars = [...kit.stage.querySelectorAll('.notte-star')];
    this.scritto = q('.notte-scritto');
    this.cur = q('.notte-cursore');
    this.luce = q('.notte-luce');
    this.typed = kit.typist('Al mare Emma', 5.2, 9);
  },
  render(t) {
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.sub.opacity = eo(seg(t, 0.2, 0.9));
    this.tit.opacity = 1 - eio(seg(t, 3.0, 3.6));
    this.tit.transform = 'translateY(' + lerp(0, -20, eio(seg(t, 3.0, 3.6))) + 'px)';
    const s = lerp(1, 1.75, eio(seg(t, 3.3, 6.4))) * (1 + 0.004 * t);
    this.cam.transform = 'scale(' + s + ')';
    this.stars.forEach((st, i) => st.setAttribute('opacity', (0.45 + 0.4 * Math.sin(t * 1.4 + i * 1.7)).toFixed(2)));
    this.luce.setAttribute('opacity', (0.16 + 0.06 * Math.sin(t * 2.1)).toFixed(3));
    const txt = this.typed.at(t);
    this.scritto.textContent = txt;
    this.cur.setAttribute('x', (1336 + txt.length * 8.4).toFixed(1));
    this.cur.setAttribute('opacity', t < 5.0 ? 0 : (Math.floor(t / 0.53) % 2 ? 0.2 : 1));
    this.sub(t);
  },
});
