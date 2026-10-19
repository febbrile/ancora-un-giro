"""Il modellino giocattolo di «Ancora un giro»: l'unica fonte di colori, finestre e paperelle.

Esegui `python3 strumenti/modellino.py`: stampa il giro di «Al mare Emma» e si ferma se qualcosa non torna.
Con `--scrivi` riporta i risultati in episodi/comune/shared.js, tra i segni `// <modellino>` e `// </modellino>`.

Nel modellino ogni passeggero è una freccia con tre coordinate senza nome. I numeri non vanno mai a schermo:
decidono i colori dei vestiti, i paesaggi delle finestre e quante paperelle di ogni colore cadono nella vasca.

Cosa è inventato (e dichiarato qui) e cosa è calcolato:
- inventati: i biglietti (B), le paperelle (P), i fili di luce di Al e di Mare e quelli di Emma nei tratti 2 e 3,
  gli scambi (S), i colori delle parole (COLORE), i paesaggi delle finestre;
- calcolati: i fili di Emma (sguardi: query · key, poi softmax), i colori dei vestiti, le finestre, la vasca.
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
    'parco': [0.43, 0.59, 0.33],
    'Emma':  [0.55, 0.07, -0.58],
    'nuota': [-0.62, 0.48, -0.08],
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

# I fili di luce nel primo tratto. Per Emma si calcolano (sotto); per Al e Mare sono dichiarati.
# Si guarda sempre avanti: ognuno guarda chi gli siede davanti e sé stesso.
Q_EMMA = [0.90, 0.20, -0.50]
K = {'Al': [-0.40, 0.30, 0.60], 'mare': [1.00, -0.30, -1.02], 'parco': [0.60, 1.25, -0.32], 'Emma': [0.20, 0.20, 0.24]}
FILI_DICHIARATI = {
    'Al':   {'Al': 1.0},
    'mare': {'Al': 0.3, 'mare': 0.7},
}
# Nei tratti 2 e 3 i fili di Emma sono dichiarati (quelli di Al e Mare restano come nel primo tratto).
FILI_EMMA_TRATTI = [None, {'Al': 0.1, 'mare': 0.6, 'Emma': 0.3}, {'Al': 0.1, 'mare': 0.5, 'Emma': 0.4}]

# Gli spostamenti dei tre tratti (fili di luce + scambi), per ogni passeggero.
# Per Emma, nel primo tratto, la parte dei fili è quella calcolata; il resto è dello scambio.
S = {
    'Emma': [[-0.44, 0.43, -0.14], [-0.93, 0.61, 0.22], [-1.65, 1.08, 0.64]],
    'Al':   [[0.02, 0.03, 0.02], [0.03, 0.05, 0.03], [0.04, 0.06, 0.04]],
    'mare': [[-0.08, 0.10, -0.06], [-0.12, 0.15, -0.08], [-0.15, 0.18, -0.10]],
}

# I paesaggi delle finestre: si riconoscono dalle tre parole più vicine all'ultimo vagone.
PAESAGGI = [
    ('spiaggia', {'sabbia', 'conchiglie', 'onde'}),
    ('molo', {'nuota', 'onde', 'conchiglie'}),
    ('mare aperto', {'nuota', 'gioca', 'onde'}),
]

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


def giro(frase):
    print(f'\n== {" ".join(frase)} ==')
    out = {'frase': frase, 'passeggeri': {}}

    # I fili di luce di Emma, l'ultima: query · key con chi le siede davanti e con sé stessa, poi softmax.
    ultimo = frase[-1]
    assert ultimo == 'Emma'
    sguardi = {t: round(dot(Q_EMMA, K[t]), 2) for t in frase}
    fili = [round(q, 1) for q in softmax(list(sguardi.values()))]
    assert abs(sum(fili) - 1) < 1e-9, fili
    fili = dict(zip(frase, fili))
    print('  fili di Emma', fili)
    porta = r2([sum(fili[t] * B[t][i] for t in frase) for i in range(3)])
    assert porta == [-0.15, 0.46, -0.38], porta

    for t in frase:
        x = B[t]
        tappe = [x]
        for d in S[t]:
            x = somma(x, d)
            tappe.append(x)
        info = {
            'biglietto': colore(B[t]),
            'tratti': [colore(v) for v in tappe[1:]],
            'fili': FILI_DICHIARATI.get(t, fili if t == ultimo else None),
        }
        if t == ultimo:
            for f in FILI_EMMA_TRATTI[1:]:
                assert abs(sum(f.values()) - 1) < 1e-9, f
            info['fili_tratti'] = [fili] + FILI_EMMA_TRATTI[1:]
            dopo_fili = somma(B[t], porta)
            info['dopo_fili'] = colore(dopo_fili)
            info['finestre'] = [paesaggio(v) for v in tappe[1:]]
            print('  Emma: biglietto', info['biglietto'], '→ dopo i fili', info['dopo_fili'], '→ tratti', info['tratti'])
            print('        finestre', info['finestre'], [vicini(v) for v in tappe[1:]])
            p, conta = vasca(tappe[-1])
            assert sum(conta.values()) == PAPERELLE_IN_VASCA
            out['vasca'] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
            out['probabilita'] = {w: round(p[w], 3) for w in sorted(p, key=lambda w: -p[w])[:5]}
            print('  vasca', conta)
            print('  probabilità', out['probabilita'])
        else:
            print(f'  {t:5}: biglietto', info['biglietto'], '→ tratti', info['tratti'])
        out['passeggeri'][t] = info
    out['nuovo'] = {'nuota': colore(B['nuota'])}
    print('  passeggero nuovo «nuota»:', out['nuovo']['nuota'])
    return out


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
    dati = {'mare': giro(['Al', 'mare', 'Emma'])}
    if '--scrivi' in sys.argv:
        scrivi(dati)
