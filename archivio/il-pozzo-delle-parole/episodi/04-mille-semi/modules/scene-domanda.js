const { seg, eo, ei, eio, eob, lerp, TextFx } = kit;
// 4.1 · La domanda: di notte, Ada guarda la carta di Emma. Tre semi. E se ne avesse di più?
kit.scene('domanda', {
  init(kit) {
    const P = window.PZ;
    const r = kit.rng(4);
    let stelle = '';
    for (let i = 0; i < 26; i++) stelle += '<circle class="do-st" cx="' + (1240 + r() * 560).toFixed(0) + '" cy="' + (90 + r() * 330).toFixed(0) + '" r="' + (1 + r() * 1.8).toFixed(1) + '" fill="#FFF4E0"/>';
    kit.stage.append(kit.h('<div class="ground" style="background:#2A211C"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect width="1920" height="1080" fill="#3B2C22"/><path d="M0 0 L1920 0 L1920 820 L0 820 Z" fill="#4A372A"/>' +
      '<rect x="1200" y="60" width="640" height="420" rx="10" fill="#141A33" stroke="#6E4A33" stroke-width="16"/>' + stelle +
      '<circle cx="1720" cy="140" r="38" fill="#FFF1C9"/><circle cx="1734" cy="130" r="36" fill="#141A33"/>' +
      '<path d="M1200 400 C1400 380 1600 390 1840 404 L1840 480 L1200 480 Z" fill="#1F3B2C"/>' +
      '<g transform="translate(1520 430) scale(.6)"><ellipse rx="146" ry="26" fill="#5B6B8C" stroke="#3E4A66" stroke-width="5"/><ellipse rx="120" ry="16" fill="#070912"/></g>' +
      '<path d="M1520 60 L1520 480 M1200 270 L1840 270" stroke="#6E4A33" stroke-width="10"/>' +
      '<rect x="0" y="780" width="1920" height="300" fill="#8A5A3C"/><rect x="0" y="760" width="1920" height="34" fill="#6E4A33"/>' +
      '<path class="do-luce" d="M640 330 L380 770 L1000 770 Z" fill="#FFE9A8" opacity=".18"/>' +
      '<g transform="translate(600 250)"><path d="M40 80 L0 0" stroke="#2E2A26" stroke-width="10" stroke-linecap="round"/><path d="M-40 0 L40 0 L60 70 L-60 70 Z" fill="#E8743B"/><rect x="30" y="76" width="20" height="440" fill="#2E2A26"/><rect x="-20" y="500" width="120" height="16" rx="6" fill="#2E2A26"/></g>' +
      '<g class="do-carta"><g transform="scale(1.1) translate(-110 -150)">' + P.carta({ v: [0.55, 0.07, -0.58], col: P.CARTA_COL.Emma, titolo: 'Emma', cls: 'doc' }) + '</g></g>' +
      '<g transform="translate(130 330) scale(1.45)">' + P.ada('mani', 'calma') + '</g></svg>' +
      '<div class="do-tit" style="position:absolute;inset:0;background:color-mix(in srgb, var(--ground) 88%, transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px">' +
      '<h1 class="line" style="font-size:112px;margin:0">Il pozzo delle parole</h1><p class="sub" style="margin:0">Episodio 4 · Mille semi</p></div>' +
      P.sott('NARRATORE', 'Una notte Ada si fece una domanda. La carta di Emma ha tre semi. E se ne avesse di più?') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.tit = q('.do-tit').style; this.line = q('.do-tit .line'); this.carta = q('.do-carta'); this.righe = [...kit.stage.querySelectorAll('.doc-r')];
    this.st = [...kit.stage.querySelectorAll('.do-st')];
    this.sub = window.PZ.subs(kit, [[3.6, 11.6]]);
  },
  render(t) {
    const P = window.PZ;
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.tit.opacity = 1 - eio(seg(t, 2.8, 3.4));
    this.carta.setAttribute('transform', 'translate(700 ' + (600 + 4 * Math.sin(t * 1.2)).toFixed(1) + ') rotate(' + (-6 + 2 * Math.sin(t * 0.7)).toFixed(2) + ')');
    // «...tre semi»: le tre righe si accendono una dopo l'altra, poi un posto vuoto sotto.
    this.righe.forEach((g, i) => { const k = Math.sin(Math.PI * seg(t, 7.6 + i * 0.5, 8.2 + i * 0.5)); const y = P.righeY(3)[i]; g.setAttribute('transform', 'translate(110 ' + y + ') scale(' + (1 + 0.12 * k).toFixed(3) + ') translate(-110 ' + (-y) + ')'); });
    this.st.forEach((s, i) => s.setAttribute('opacity', (0.4 + 0.4 * Math.sin(t * 1.5 + i * 1.7)).toFixed(2)));
    this.sub(t);
  },
});
