"""Il modellino giocattolo di «Ancora un giro»: l'unica fonte di colori, finestre e paperelle.

Esegui `python3 strumenti/modellino.py`: stampa i giri di «Al mare Emma» e di «Al parco Emma» e si ferma se qualcosa
non torna.
Con `--scrivi` riporta i risultati in episodi/comune/shared.js, tra i segni `// <modellino>` e `// </modellino>`.

Nel modellino ogni passeggero è una freccia con tre coordinate senza nome. I numeri non vanno mai a schermo:
decidono i colori dei vestiti, i paesaggi delle finestre e quante paperelle di ogni colore cadono nella vasca.

Cosa è inventato (e dichiarato qui) e cosa è calcolato:
- inventati: i biglietti (B), le paperelle (P), i fili di luce di Al e del vagone di mezzo e quelli di Emma nei
  tratti 2 e 3, gli spostamenti di Al e del vagone di mezzo (S), gli scambi di Emma (SCAMBI_EMMA), i colori delle
  parole (COLORE), i paesaggi delle finestre;
- calcolati: i fili di Emma nel primo tratto (sguardi: query · key, poi softmax), quello che i fili portano a Emma in
  ogni tratto, i colori dei vestiti, le finestre, la vasca.

Le due frasi differiscono per un solo vagone: tutto il resto (biglietti di Al ed Emma, fili dichiarati, scambi di Emma)
è lo stesso, e la differenza la portano solo i fili di luce. Al, davanti, non guarda nessuno: è uguale nei due treni.
"""
import json
import math
import re
import sys
from pathlib import Path

# ── Inventati e dichiarati ────────────────────────────────────────────────────────────────────────────

# I biglietti: il vestito con cui ogni pezzo sale sul treno (sempre lo stesso, in qualunque frase).
B = {
    'Al':    [-0.14, 0.14, 0.15],
    'mare':  [-0.35, 0.61, -0.40],
    'parco': [0.20, 0.90, 0.00],
    'Emma':  [0.55, 0.07, -0.58],
    'nuota': [-0.62, 0.48, -0.08],
    'gioca': [-0.29, 0.52, 0.30],
    'corre': [0.06, 0.46, 0.60],
}

# Le paperelle: una per ogni parola che può venire dopo (14 parole nel modellino).
P = {
    'Bovary':     [0.39, 0.29, -0.51], 'e':        [0.63, -0.06, -0.41],
    'onde':       [-0.25, 0.51, -0.61], 'foglie':  [0.56, 0.50, 0.19],
    'sabbia':     [-0.04, 0.58, -0.51], 'altalena': [0.51, 0.62, 0.04],
    'conchiglie': [-0.15, 0.54, -0.60], 'scivolo': [0.50, 0.53, 0.04],
    'nuota':      [-0.80, 0.60, -0.05], 'corre':   [0.08, 0.59, 0.77],
    'gioca':      [-0.36, 0.67, 0.38],
    'felice':     [-0.31, -0.43, -1.10], '.':      [0.88, -0.76, -0.02],
    'Fine':       [-0.67, -0.78, 0.69],
}

# Il colore di ogni parola: serve per le paperelle e per i vestiti (che prendono il colore dei vicini).
COLORE = {
    'Bovary': (240, 112, 100), 'e': (240, 140, 120),
    'onde': (60, 120, 230), 'sabbia': (90, 150, 220), 'conchiglie': (80, 140, 235), 'nuota': (40, 100, 220),
    'foglie': (60, 180, 90), 'altalena': (80, 190, 110), 'scivolo': (70, 175, 100), 'corre': (40, 170, 80),
    'gioca': (40, 170, 170), 'felice': (245, 200, 76), '.': (150, 150, 160), 'Fine': (70, 70, 90),
}
T_COLORE = 0.15

# I fili di luce nel primo tratto. Per Emma si calcolano (sotto); per Al e per il vagone di mezzo sono dichiarati.
# Si guarda sempre avanti: ognuno guarda chi gli siede davanti e sé stesso.
Q_EMMA = [0.90, 0.20, -0.50]
K = {'Al': [-0.40, 0.30, 0.60], 'mare': [1.00, -0.30, -1.02], 'parco': [0.60, 1.25, -1.12], 'Emma': [0.20, 0.20, 0.24]}
FILI_DICHIARATI = {
    'Al':    {'Al': 1.0},
    'mare':  {'Al': 0.3, 'mare': 0.7},
    'parco': {'Al': 0.3, 'parco': 0.7},
}
# Nei tratti 2 e 3 i fili di Emma sono dichiarati, verso Al, il vagone di mezzo ed Emma stessa
# (quelli degli altri restano come nel primo tratto).
FILI_EMMA_TRATTI = [None, (0.1, 0.6, 0.3), (0.1, 0.5, 0.4)]

# Gli spostamenti dei tre tratti (fili di luce + scambi) di Al e del vagone di mezzo.
S = {
    'Al':    [[0.02, 0.03, 0.02], [0.03, 0.05, 0.03], [0.04, 0.06, 0.04]],
    'mare':  [[-0.08, 0.10, -0.06], [-0.12, 0.15, -0.08], [-0.15, 0.18, -0.10]],
    'parco': [[-0.11, 0.20, 0.11], [-0.16, 0.30, 0.17], [-0.21, 0.38, 0.22]],
}
# Emma: in ogni tratto si sposta di quello che le portano i fili (calcolato) più lo scambio (dichiarato, lo stesso
# in ogni frase). Nel modellino lo scambio di un passeggero non dipende dalla frase: il contesto entra dai fili.
SCAMBI_EMMA = [[-0.29, -0.03, 0.24], [-0.69, 0.02, 0.69], [-1.04, 0.18, 1.09]]
# Controllo: in «Al mare Emma» fili + scambi danno gli spostamenti di Emma di sempre.
SPOSTAMENTI_EMMA_MARE = [[-0.44, 0.43, -0.14], [-0.93, 0.61, 0.22], [-1.65, 1.08, 0.64]]

# I paesaggi delle finestre: si riconoscono dalle tre parole più vicine all'ultimo vagone.
PAESAGGI = [
    ('spiaggia', {'sabbia', 'conchiglie', 'onde'}),
    ('molo', {'nuota', 'onde', 'conchiglie'}),
    ('mare aperto', {'nuota', 'gioca', 'onde'}),
    ('giardino', {'altalena', 'sabbia', 'Bovary'}),
    ('parco giochi', {'gioca', 'corre', 'altalena'}),
    ('prato', {'gioca', 'corre', 'nuota'}),
]

# Le frasi del modellino, e le parole che salgono sul treno dopo la pesca.
FRASI = {
    'mare':  (['Al', 'mare', 'Emma'], ['nuota']),
    'parco': (['Al', 'parco', 'Emma'], ['gioca', 'corre']),
}

PAPERELLE_IN_VASCA = 40

# ── Calcoli ───────────────────────────────────────────────────────────────────────────────────────────


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def r2(v):
    return [round(x + 1e-9, 2) for x in v]


def somma(a, b):
    return r2([x + y for x, y in zip(a, b)])


def softmax(v, T=1.0):
    m = max(v)
    e = [math.exp((x - m) / T) for x in v]
    s = sum(e)
    return [x / s for x in e]


def colore(x):
    """Il vestito prende il colore delle parole a cui somiglia (media pesata dei colori dei vicini)."""
    p = softmax([dot(x, P[w]) for w in P], T_COLORE)
    c = [sum(pi * COLORE[w][i] for pi, w in zip(p, P)) for i in range(3)]
    return '#%02x%02x%02x' % tuple(round(v) for v in c)


def vicini(x, n=3):
    lg = {w: dot(x, P[w]) for w in P}
    return sorted(lg, key=lambda w: -lg[w])[:n]


def paesaggio(x):
    v = set(vicini(x))
    for nome, parole in PAESAGGI:
        if v == parole:
            return nome
    raise SystemExit(f'Nessun paesaggio per le parole {sorted(v)}: dichiaralo in PAESAGGI.')


def vasca(x, n=PAPERELLE_IN_VASCA, T=1.0):
    """Quante paperelle di ogni parola cadono nella vasca (resti maggiori, totale esatto)."""
    p = dict(zip(P, softmax([dot(x, P[w]) for w in P], T)))
    quote = {w: p[w] * n for w in P}
    conta = {w: int(quote[w]) for w in P}
    resto = n - sum(conta.values())
    for w in sorted(P, key=lambda w: -(quote[w] - conta[w]))[:resto]:
        conta[w] += 1
    return p, {w: c for w, c in sorted(conta.items(), key=lambda kv: -kv[1]) if c > 0}


def tappe_di(t):
    """Il vestito di Al o del vagone di mezzo in stazione e dopo ogni tratto."""
    x, tappe = B[t], [B[t]]
    for d in S[t]:
        x = somma(x, d)
        tappe.append(x)
    return tappe


def giro(chiave):
    frase, nuovi = FRASI[chiave]
    print(f'\n== {" ".join(frase)} ==')
    out = {'frase': frase, 'passeggeri': {}}

    # I fili di luce di Emma, l'ultima: query · key con chi le siede davanti e con sé stessa, poi softmax.
    ultimo = frase[-1]
    assert ultimo == 'Emma' and len(frase) == 3
    sguardi = {t: round(dot(Q_EMMA, K[t]), 2) for t in frase}
    fili = [round(q, 1) for q in softmax(list(sguardi.values()))]
    assert abs(sum(fili) - 1) < 1e-9, fili
    fili = dict(zip(frase, fili))
    print('  sguardi di Emma', sguardi, '→ fili', fili)
    fili_tratti = [fili] + [dict(zip(frase, f)) for f in FILI_EMMA_TRATTI[1:]]
    for f in fili_tratti:
        assert abs(sum(f.values()) - 1) < 1e-9, f

    # Emma, tratto per tratto: i fili le portano la media pesata dei vestiti di chi guarda, poi scatta lo scambio.
    altri = {t: tappe_di(t) for t in frase[:-1]}
    x, tappe, spostamenti = B[ultimo], [B[ultimo]], []
    for k, f in enumerate(fili_tratti):
        vestiti = {**{t: altri[t][k] for t in altri}, ultimo: x}
        porta = r2([sum(f[t] * vestiti[t][i] for t in frase) for i in range(3)])
        if k == 0:
            dopo_fili = somma(x, porta)
        spostamenti.append(somma(porta, SCAMBI_EMMA[k]))
        x = somma(somma(x, porta), SCAMBI_EMMA[k])
        tappe.append(x)
    if chiave == 'mare':
        assert spostamenti == SPOSTAMENTI_EMMA_MARE, spostamenti

    for t in frase:
        if t == ultimo:
            info = {
                'biglietto': colore(B[t]),
                'tratti': [colore(v) for v in tappe[1:]],
                'fili': fili,
                'fili_tratti': fili_tratti,
                'dopo_fili': colore(dopo_fili),
                'finestre': [paesaggio(v) for v in tappe[1:]],
            }
            print('  Emma: biglietto', info['biglietto'], '→ dopo i fili', info['dopo_fili'], '→ tratti', info['tratti'])
            print('        finestre', info['finestre'], [vicini(v) for v in tappe[1:]])
            p, conta = vasca(tappe[-1])
            assert sum(conta.values()) == PAPERELLE_IN_VASCA
            out['vasca'] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
            out['probabilita'] = {w: round(p[w], 3) for w in sorted(p, key=lambda w: -p[w])[:5]}
            print('  vasca', conta)
            print('  probabilità', out['probabilita'])
        else:
            info = {
                'biglietto': colore(B[t]),
                'tratti': [colore(v) for v in altri[t][1:]],
                'fili': FILI_DICHIARATI[t],
            }
            print(f'  {t:5}: biglietto', info['biglietto'], '→ tratti', info['tratti'])
        out['passeggeri'][t] = info
    out['nuovo'] = {w: colore(B[w]) for w in nuovi}
    for w, c in out['nuovo'].items():
        print(f'  passeggero nuovo «{w}»:', c)
    return out


def controlla(dati):
    """Le cose che la storia dà per vere."""
    mare, parco = dati['mare'], dati['parco']
    # Al guarda solo sé stesso: è uguale nei due treni.
    assert mare['passeggeri']['Al'] == parco['passeggeri']['Al']
    # Emma sale con lo stesso vestito in entrambi i treni.
    assert mare['passeggeri']['Emma']['biglietto'] == parco['passeggeri']['Emma']['biglietto']
    # Il filo di Emma verso il vagone di mezzo è il più forte, ed è forte uguale nei due treni.
    assert mare['passeggeri']['Emma']['fili']['mare'] == parco['passeggeri']['Emma']['fili']['parco'] == 0.7
    # Parco somiglia più alle parole del parco che a quelle del mare.
    lg = {w: dot(B['parco'], P[w]) for w in P}
    assert min(lg[w] for w in ('gioca', 'corre', 'altalena', 'scivolo', 'foglie')) > \
        max(lg[w] for w in ('nuota', 'onde', 'conchiglie', 'sabbia'))
    # La paperella più probabile: «nuota» al mare, «gioca» al parco.
    assert mare['vasca'][0][0] == 'nuota' and parco['vasca'][0][0] == 'gioca'


def scrivi(dati):
    f = Path(__file__).resolve().parent.parent / 'episodi' / 'comune' / 'shared.js'
    testo = f.read_text()
    blocco = '// <modellino> generato da strumenti/modellino.py: non modificare a mano\nconst MOD = ' + \
        json.dumps(dati, ensure_ascii=False) + ';\n// </modellino>'
    nuovo, n = re.subn(r'// <modellino>.*?// </modellino>', lambda m: blocco, testo, flags=re.S)
    if n != 1:
        raise SystemExit('Non trovo i segni // <modellino> … // </modellino> in ' + str(f))
    f.write_text(nuovo)
    print('\nScritto in', f)


if __name__ == '__main__':
    dati = {k: giro(k) for k in FRASI}
    controlla(dati)
    if '--scrivi' in sys.argv:
        scrivi(dati)
