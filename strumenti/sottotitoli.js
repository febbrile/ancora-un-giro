const WEAK = new Set('il lo la i gli le un uno una di a da in con su per tra fra del dello della dei degli delle al allo alla ai agli alle dal dallo dalla dai dagli dalle nel nello nella nei negli nelle sul sullo sulla sui sugli sulle e ed o ma che se come non mi ti si ci vi ne è suo sua suoi sue mio mia tuo tua quel quella questo questa ogni più'.split(' '));
const MAX = 48, MIN = 18;
const punct = w => /[.,:;?!…»]$/.test(w);
const weak = w => WEAK.has(w.toLowerCase().replace(/[«"]/g, '')) || /['’]$/.test(w);
function splitLong(words) {
  const s = words.join(' ');
  if (s.length <= MAX || words.length < 2) return [s];
  let best = -1, bs = 1e9;
  for (let i = 0; i < words.length - 1; i++) {
    if (weak(words[i])) continue;
    const L = words.slice(0, i + 1).join(' ').length, R = words.slice(i + 1).join(' ').length;
    const sc = Math.abs(L - R) + (punct(words[i]) ? -8 : 0);
    if (sc < bs) { bs = sc; best = i; }
  }
  if (best < 0) best = Math.floor(words.length / 2) - 1;
  return splitLong(words.slice(0, best + 1)).concat(splitLong(words.slice(best + 1)));
}
function chunk(text) {
  const words = text.split(' ');
  const cl = []; let cur = [];
  words.forEach((w, k) => { cur.push(w); if (punct(w) || k === words.length - 1) { cl.push(cur); cur = []; } });
  const len = c => c.join(' ').length;
  let merged = cl.slice(), changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < merged.length; i++) {
      const c = merged[i];
      if (len(c) >= MIN || merged.length < 2) continue;
      const strong = /[.?!\u2026\u00bb]$/.test(c[c.length - 1]);
      const back = i > 0 && len(merged[i - 1]) + 1 + len(c) <= MAX;
      const fwd = i < merged.length - 1 && len(c) + 1 + len(merged[i + 1]) <= MAX;
      if ((strong && back) || (!fwd && back)) { merged[i - 1] = merged[i - 1].concat(c); merged.splice(i, 1); changed = true; break; }
      if (fwd) { merged[i + 1] = c.concat(merged[i + 1]); merged.splice(i, 1); changed = true; break; }
    }
  }
  return merged.flatMap(splitLong);
}
module.exports = { chunk };
if (require.main === module) {
  const T = [
    'Quando scrivi a un’intelligenza artificiale, la risposta arriva una parola alla volta. E per ogni parola, dentro la macchina, succede un piccolo viaggio.',
    'Esperimento numero uno. Due frasi, una sola parola diversa: mare, parco. Cosa viene dopo Emma? Non lo so: per questo faccio l’esperimento.',
    'Prima di entrare nel pozzo, le frasi passano dallo Spezzaparole, che le taglia in pezzi chiamati token. Le parole comuni restano intere; quelle rare finiscono in pezzettini.',
    'I pezzi prendono vita, e ognuno riceve un biglietto con un numero.',
    'E c’è un segreto: nel pozzo le lettere non possono entrare. Restano sul prato. Laggiù esistono solo numeri.',
    'E con una parola rara? Proviamo: precipitevolissimevolmente.',
    'Ah! Otto pezzi. Le parole rare costano più token.',
    'Nel pozzo c’è un armadio, con un cassetto per ogni parola. Ognuno prende il suo vestito di luce: sempre lo stesso, in qualunque frase.',
    'E siccome il pozzo non sa chi viene prima e chi dopo, a ognuno si cuce un numero sulla schiena.',
    'Ogni parola ha un suo posto in questo spazio: Al, mare, parco, Emma. Per ora non importa dove. Guardo Emma: nella frase del mare è qui. Zero virgola zero cinque, zero virgola zero cinque, zero virgola ottanta. Nella frase del parco… stesso punto. Identiche! Ne ha altre 4.093, ma il mio schermo ne mostra solo tre.',
    'Partiamo dal mare. Tu, Emma del parco, aspettami qui.',
    'Il fondo dell’armadio si aprì, ed Emma cadde, cadde, cadde: giù, sempre più giù, insieme ai suoi compagni.',
    'Emma atterrò in una stanza piena di ritratti. Nessuno sapeva niente del mare: era la stanza delle cose che vengono dopo «Emma», quando di Emma non si sa nient’altro.',
    'Guardo col periscopio. Se il pozzo finisse qui, cosa direbbe? «Al mare Emma… Bovary». Ah, come il romanzo!',
    'No: Emma non ha ancora guardato i suoi compagni. Per ora conosce solo il proprio nome.',
  ];
  T.forEach(t => { console.log(chunk(t).map(c => '[' + c + ']').join('\n')); console.log('---'); });
}
