const { seg, eo, ei, eio, eob, lerp } = kit;
kit.scene('cabina', {
  init(kit) {
    const P = window.PZ;
    let denti = '';
    for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; denti += '<rect x="-5" y="-34" width="10" height="12" fill="#C9973F" transform="rotate(' + (a * 180 / Math.PI).toFixed(0) + ')"/>'; }
    const ingr = c => '<g class="' + c + '"><circle r="24" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' + denti + '<circle r="7" fill="#7A5A24"/></g>';
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="cab-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient><clipPath id="cab-oblo"><circle cx="760" cy="490" r="62"/></clipPath></defs>' +
      '<rect width="1920" height="1080" fill="url(#cab-muro)"/><rect y="860" width="1920" height="220" fill="#1B2244"/>' +
      '<path class="cab-pista" d="M900 800 C1150 760 1450 780 1820 720" stroke="#D586DD" stroke-width="6" stroke-dasharray="16 14" fill="none" opacity="0"/>' +
      '<g class="cab-cabina" style="transform-origin:760px 860px"><rect x="620" y="400" width="280" height="460" rx="18" fill="#5B6B8C" stroke="#3E4A66" stroke-width="6"/>' +
      '<path d="M600 410 L760 330 L920 410 Z" fill="#3E4A66"/>' +
      '<circle cx="760" cy="490" r="66" fill="#10152B" stroke="#C9973F" stroke-width="8"/>' +
      '<g clip-path="url(#cab-oblo)"><g transform="translate(734 478)">' + ingr('cab-g1') + '</g><g transform="translate(788 506)">' + ingr('cab-g2') + '</g>' +
      '<path d="M700 530 L740 510 L760 540 L820 470" stroke="#FFD978" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' +
      '<rect x="900" y="624" width="14" height="40" rx="4" fill="#3E4A66"/></g>' +
      '<g class="cab-bigl"><rect x="0" y="-34" width="190" height="68" rx="6" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/>' +
      '<path d="M24 14 L150 -6" stroke="#D586DD" stroke-width="7" stroke-linecap="round"/><path d="M132 -18 L152 -6 L136 10" stroke="#D586DD" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>' +
      '<g class="cab-emma"><g transform="translate(-80 -214) scale(.8)">' + P.emma('#A48BF9') + '</g></g>' +
      '<rect class="cab-porta" x="652" y="580" width="216" height="280" rx="10" fill="#3E4A66" stroke="#2A3350" stroke-width="4" style="transform-origin:760px 580px"/>' +
      '<g class="cab-tirata"><g transform="translate(-128 -230) scale(.8)">' + P.emmaTirata('#A48BF9') + '</g></g>' +
      '</svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      '<div class="monitor cab-mon" style="left:1180px;top:60px;width:660px"><div class="mon-tit">MONITOR DI ADA · PIANO 1</div>' +
      '<div style="font-size:22px">feed-forward: Δ₁ = [0.60, 0.00, −0.20]</div><div class="cab-x1" style="font-size:26px;color:#E6FFF4">x₁ = x₀ + Δ₁ = [0.65, 0.05, 0.60]</div></div>' +
      P.sott('ADA', 'Nella cabina Emma è da sola: una macchina aggiunge quello che il pozzo ha imparato del mondo, e stampa una freccia. Lo strato non la ricostruisce: la sposta. Zero virgola sei verso l’acqua, meno zero virgola due verso le azioni.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.emma = q('.cab-emma'); this.tir = q('.cab-tirata'); this.tirV = this.tir.firstElementChild.firstElementChild;
    this.porta = q('.cab-porta').style; this.cab = q('.cab-cabina').style;
    this.g1 = q('.cab-g1'); this.g2 = q('.cab-g2'); this.bigl = q('.cab-bigl'); this.pista = q('.cab-pista');
    this.mon = q('.cab-mon').style; this.x1 = q('.cab-x1').style;
    this.sub = window.PZ.subs(kit, [[0.4, 12.6]]);
  },
  render(t) {
    const P = window.PZ;
    const w = eio(seg(t, 0, 1.5));
    const ex = lerp(300, 760, w), bob = Math.abs(Math.sin(t * 9)) * 8 * (w > 0 && w < 1 ? 1 : 0);
    this.emma.setAttribute('transform', 'translate(' + ex.toFixed(1) + ' ' + (860 - bob).toFixed(1) + ')');
    const closed = eio(seg(t, 1.6, 2.1)) * (1 - eio(seg(t, 6.0, 6.5)));
    this.porta.transform = 'scaleY(' + closed.toFixed(3) + ')';
    const work = seg(t, 2.1, 5.2);
    const shake = work > 0 && work < 1 ? Math.sin(t * 40) * 3 : 0;
    this.cab.transform = 'translateX(' + shake.toFixed(1) + 'px)';
    const ang = 140 * (t - 2.1) * (work > 0 ? 1 : 0) * (work < 1 ? 1 : 0) + (work >= 1 ? 140 * 3.1 : 0);
    this.g1.setAttribute('transform', 'rotate(' + ang.toFixed(1) + ')'); this.g2.setAttribute('transform', 'rotate(' + (-ang * 1.1).toFixed(1) + ')');
    const b = seg(t, 5.0, 5.6);
    this.bigl.setAttribute('transform', 'translate(' + lerp(900, 930, eo(b)).toFixed(1) + ' ' + lerp(644, 600, eo(b)).toFixed(1) + ') scale(' + (b <= 0 ? 0 : eob(b, 1.7)).toFixed(3) + ')');
    this.bigl.setAttribute('opacity', (1 - seg(t, 7.0, 7.4)).toFixed(2));
    const pull = seg(t, 7.0, 10.2);
    this.emma.setAttribute('opacity', pull > 0 ? 0 : 1);
    const pp = ei(pull) * 0.35 + eo(pull) * 0.65;
    const tx = lerp(840, 1720, pp), ty = lerp(800, 720, pp) - 60 * Math.sin(Math.PI * pp);
    this.tir.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ')');
    this.tir.setAttribute('opacity', pull > 0 && pull < 1 ? 1 : (pull >= 1 ? (1 - seg(t, 10.2, 10.6)) : 0));
    this.tirV.style.color = P.mix('#A48BF9', '#D586DD', eio(seg(t, 7.4, 9.6)));
    this.pista.setAttribute('opacity', (0.7 * eo(seg(t, 6.6, 7.2)) * (1 - seg(t, 10.4, 11))).toFixed(2));
    this.mon.opacity = eo(seg(t, 5.4, 5.9));
    this.x1.opacity = eo(seg(t, 9.6, 10.1));
    this.sub(t);
  },
});
