const { seg, eo, ei, eio, eob, lerp } = kit;
// 4.5 · L'etichetta dei pozzi veri: 4.096 semi. La lanterna di Emma si allunga in un rotolo che scende nel buio;
// le pastiglie, seme per seme, fanno un solo gettone. I valori del rotolo sono quelli di strumenti/numeri.py.
const RO_N = 4096, RO_H = 52, RO_SLOT = 24, RO_V0 = 13.0, RO_VEL = 260;
kit.scene('rotolo', {
  init(kit) {
    const P = window.PZ;
    const L = P.rotolo(7, RO_N - 5, 60);
    this.lan = [0.90, 0.20, -0.50, 0.40, -0.30].concat(L);
    this.car = [1.00, -0.30, -1.02, 0.50, 0.60].concat(P.sommaRot(L, P.rotolo(11, RO_N - 5, 30)));
    let g = 0; for (let i = 0; i < RO_N; i++) g += Math.round(this.lan[i] * 100) * Math.round(this.car[i] * 100);
    this.gett = g / 10000;
    const r = kit.rng(6);
    let pietre = '';
    for (let k = 0; k < 40; k++) pietre += '<rect x="' + (k % 2 ? 300 : 1500) + '" y="' + (k * 60 - 300) + '" width="120" height="54" rx="8" fill="#2A3350" opacity="' + (0.5 + 0.4 * r()).toFixed(2) + '"/>';
    let righe = '';
    for (let k = 0; k < RO_SLOT; k++) righe += '<g class="ro-r"><rect x="-130" y="-22" width="260" height="44" rx="8" fill="#2E2A26" fill-opacity=".06"/><g class="ro-s"></g><text x="112" y="11" text-anchor="end" font-family="JetBrains Mono, monospace" font-weight="600" font-size="28"></text></g>';
    let pastiglie = '';
    for (let k = 0; k < 30; k++) pastiglie += '<g class="ro-p"><rect x="-26" y="-11" width="52" height="22" rx="11"/></g>';
    kit.stage.append(kit.h('<div class="ground" style="background:#05060C"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      // A · il bordo del pozzo vero, con la targhetta.
      '<g class="ro-A"><defs><linearGradient id="ro-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#26306A"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#ro-cielo)"/><path d="M0 760 C500 730 1400 740 1920 770 L1920 1080 L0 1080 Z" fill="#1F3B2C"/>' +
      '<ellipse cx="960" cy="800" rx="760" ry="150" fill="#5B6B8C" stroke="#3E4A66" stroke-width="10"/><ellipse cx="960" cy="800" rx="700" ry="118" fill="#030408"/>' +
      '<g transform="translate(960 640)"><rect x="-170" y="-50" width="340" height="100" rx="12" fill="#C9973F" stroke="#7A5A24" stroke-width="5"/><text y="18" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="50" fill="#3A2418">4.096 semi</text></g>' +
      '<g transform="translate(150 390) scale(1.2)">' + P.ada('mani', 'sorpresa') + '</g></g>' +
      // B · dentro il pozzo: il rotolo che scende.
      '<g class="ro-B"><rect width="1920" height="1080" fill="#05060C"/><g class="ro-pietre">' + pietre + '</g>' +
      '<g class="ro-strip"><rect class="ro-fondo" x="830" y="0" width="260" height="0" fill="#FFFDF6" stroke="#B5715C" stroke-width="7"/>' +
      '<text class="ro-tit" x="846" y="0" font-family="Fredoka, sans-serif" font-weight="600" font-size="27" fill="#B5715C">Emma · lanterna</text>' + '<g class="ro-righe">' + righe + '</g></g>' +
      '<rect x="0" y="900" width="1920" height="180" fill="url(#ro-sfuma)"/><defs><linearGradient id="ro-sfuma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060C" stop-opacity="0"/><stop offset="1" stop-color="#05060C"/></linearGradient></defs>' +
      '<text class="ro-conta" x="1180" y="120" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4"></text>' +
      '<g class="ro-pas">' + pastiglie + '</g>' +
      '<g class="ro-g"><circle r="150" fill="#F5C84C" opacity=".35" filter="url(#pz-soft)"/>' + P.gettone(this.gett) + '</g>' +
      '<g class="ro-mon"><rect x="420" y="60" width="1080" height="84" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="960" y="114" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Modelli veri: migliaia di coordinate (per esempio 4.096)</text></g></g></svg>' +
      P.sott('NARRATORE', 'Poi Ada lesse l’etichetta di un pozzo vero. C’era scritto: quattromilanovantasei semi.') +
      P.sott('ADA', 'Nessuno può disegnarlo. Ma la partita si gioca allo stesso modo: seme per seme, a ogni piano, per ogni parola.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.ro-A'); this.B = q('.ro-B'); this.strip = q('.ro-strip'); this.fondo = q('.ro-fondo'); this.tit = q('.ro-tit');
    this.righe = all('.ro-r').map(g => ({ g, s: g.querySelector('.ro-s'), t: g.querySelector('text'), idx: -1 }));
    this.pietre = q('.ro-pietre'); this.conta = q('.ro-conta'); this.pas = all('.ro-p'); this.g = q('.ro-g'); this.mon = q('.ro-mon');
    this.sub = window.PZ.subs(kit, [[0.6, 8.8], [28.4, 38.8]]);
  },
  render(t) {
    const P = window.PZ;
    const ab = eio(seg(t, 8.4, 9.2));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    // Il rotolo: prima una carta a cinque semi, poi si allunga, poi scende e la camera lo segue.
    const cresce = eio(seg(t, 9.6, 12.6));
    const scorri = t < RO_V0 ? 0 : (t < 26 ? RO_VEL * (t - RO_V0) : RO_VEL * (26 - RO_V0));
    const top = 180 - scorri;
    const visibili = Math.min(RO_N, 5 + Math.floor(cresce * 12) + Math.floor(scorri / RO_H));
    this.fondo.setAttribute('y', top.toFixed(1)); this.fondo.setAttribute('height', (64 + visibili * RO_H + 400).toFixed(1));
    this.tit.setAttribute('y', (top + 44).toFixed(1));
    const primo = Math.max(0, Math.floor((scorri - 120) / RO_H));
    this.righe.forEach((R, k) => {
      const i = primo + k, y = top + 92 + i * RO_H;
      if (i >= visibili || y > 1100) { R.g.setAttribute('opacity', 0); return; }
      R.g.setAttribute('opacity', 1);
      R.g.setAttribute('transform', 'translate(960 ' + y.toFixed(1) + ')');
      if (R.idx !== i) {
        R.idx = i;
        R.s.innerHTML = P.semeN(i, -96, 0, 0.9);
        R.t.textContent = P.fmt(this.lan[i]); R.t.setAttribute('fill', this.lan[i] < 0 ? '#B8332E' : '#2E2A26');
      }
    });
    this.pietre.setAttribute('transform', 'translate(0 ' + (-(scorri * 0.6) % 120).toFixed(1) + ')');
    this.conta.textContent = t > 9.6 ? 'semi sul rotolo: ' + visibili + ' … di 4.096' : '';
    this.conta.setAttribute('opacity', (seg(t, 9.6, 10.0) * (1 - seg(t, 26.0, 26.6))).toFixed(2));
    // Le pastiglie piovono e diventano un solo gettone.
    this.pas.forEach((p, k) => {
      const t0 = 15.0 + k * 0.35, u = seg(t, t0, t0 + 1.6);
      const i = 5 + k * 7, v = Math.round(this.lan[i] * 100) * Math.round(this.car[i] * 100) / 10000;
      p.firstElementChild.setAttribute('fill', v >= 0 ? '#F5C84C' : '#8A90A8');
      p.setAttribute('transform', 'translate(' + lerp(960 + (k % 2 ? 160 : -160), 960, ei(u)).toFixed(1) + ' ' + lerp(300 + (k % 5) * 80, 820, ei(u)).toFixed(1) + ') scale(' + (u <= 0 || u >= 1 ? 0 : 1 - 0.5 * u).toFixed(3) + ')');
    });
    const gp = seg(t, 25.4, 26.4);
    this.g.setAttribute('transform', 'translate(960 820) scale(' + (gp <= 0 ? 0 : 1.6 * eob(gp, 1.6)).toFixed(3) + ')');
    this.mon.setAttribute('opacity', eo(seg(t, 39.2, 39.8)).toFixed(2));
    this.sub(t);
  },
});
