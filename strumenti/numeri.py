"""Il modellino giocattolo del film (bozza 3): tutti i numeri mostrati negli episodi.

Esegui `python3 strumenti/numeri.py`: stampa i calcoli di ogni episodio e si ferma
se un numero non torna con quelli della sceneggiatura.

Le tre righe delle carte sono semi senza nome: ♠ ♥ ♦. Nessuna parola è allineata a un asse.
Come sono stati trovati questi valori: strumenti/progetto_numeri/LEGGIMI.md.
"""
import math

SEMI = ['♠', '♥', '♦']

# Inventati e dichiarati: la tabella E (l'armadio).
E = {
    'Al':    [-0.14, 0.14, 0.15],
    'mare':  [-0.35, 0.61, -0.40],
    'parco': [0.43, 0.59, 0.33],
    'Emma':  [0.55, 0.07, -0.58],
}

# Inventate e dichiarate: le righe di U (le campane del fondo), 14 parole.
U = {
    'Bovary':     [0.39, 0.29, -0.51], 'e':        [0.63, -0.06, -0.41],
    'onde':       [-0.25, 0.51, -0.61], 'foglie':  [0.56, 0.50, 0.19],
    'sabbia':     [-0.04, 0.58, -0.51], 'altalena': [0.51, 0.62, 0.04],
    'conchiglie': [-0.15, 0.54, -0.60], 'scivolo': [0.50, 0.53, 0.04],
    'nuota':      [-0.80, 0.60, -0.05], 'corre':   [0.08, 0.59, 0.77],
    'gioca':      [-0.36, 0.67, 0.38],
    'felice':     [-0.31, -0.43, -1.10], '.':      [0.88, -0.76, -0.02],
    'Fine':       [-0.67, -0.78, 0.69],
}

# Inventate e dichiarate: lanterna (query) di Emma e cartelli (key) del piano 1.
Q_EMMA = [0.90, 0.20, -0.50]
K = {
    'Al':    [-0.40, 0.30, 0.60],
    'mare':  [1.00, -0.30, -1.02],
    'parco': [0.55, 1.25, -1.20],
    'Emma':  [0.20, 0.20, 0.24],
}

# Inventati e dichiarati: gli spostamenti dei tre piani (le cabine).
DELTA = {
    'mare':  [[-0.44, 0.43, -0.14], [-0.93, 0.61, 0.22], [-1.65, 1.08, 0.64]],
    'parco': [[0.18, 0.42, 0.44], [-0.15, 0.60, 0.95], [-0.51, 1.06, 1.70]],
}

# Episodio 3. Inventate e dichiarate: le carte dell'armadio dei nuovi viaggiatori
# e i loro spostamenti nei tre piani (sono loro l'ultima riga, a ogni giro).
E_NUOVI = {
    'Corre':  [0.21, 0.48, 0.36],
    'Felice': [-0.38, -0.12, -0.52],
    'Punto':  [0.47, -0.41, 0.08],
}
DELTA_GIRI = {
    'Corre':  [[0.03, -0.26, -0.22], [0.15, -1.16, -0.98], [0.14, -1.16, -0.99]],
    'Felice': [[0.52, -0.35, 0.09], [0.90, -0.61, 0.15], [1.16, -0.78, 0.19]],
    'Punto':  [[-0.22, -0.18, 0.15], [-1.00, -0.81, 0.70], [-0.99, -0.81, 0.69]],
}
# Le stanze dei giri, lette col periscopio sulla riga dell'ultimo arrivato (piani 1, 2, 3).
STANZE_GIRI = {
    'Corre':  [['foglie', 'altalena', 'corre'], ['felice', '.', 'e'], ['felice', '.', 'e']],
    'Felice': [['felice', '.', 'e'], ['.', 'e', 'felice'], ['.', 'e', 'Bovary']],
    'Punto':  [['.', 'Fine', 'e'], ['Fine', '.', 'corre'], ['Fine', '.', 'nuota']],
}
# La riga in fondo al pozzo a ogni giro: è la somma qui sopra.
PASSI = [
    ('Al parco Emma corre', [0.53, -2.10, -1.83], 'felice'),
    ('Al parco Emma corre felice', [2.20, -1.86, -0.09], '.'),
    ('Al parco Emma corre felice.', [-1.74, -2.21, 1.62], 'Fine'),
]

# Episodio 4: la stessa partita a carte in pozzi con più semi.
CARTE_4 = {
    3: ([0.90, 0.20, -0.50], [1.00, -0.30, -1.02]),
    4: ([0.90, 0.20, -0.50, 0.40], [1.00, -0.30, -1.02, 0.50]),
    5: ([0.90, 0.20, -0.50, 0.40, -0.30], [1.00, -0.30, -1.02, 0.50, 0.60]),
}

# Episodio 4, il rotolo: carte di esempio di un pozzo vero, con 4.096 semi. Inventate e dichiarate:
# numeri pseudo-casuali ripetibili (generatore di Park-Miller), uguali in questo script e nel film.
ROTOLO_N = 4096


def rotolo(seed, n, ampiezza):
    """n valori a due decimali tra -ampiezza/100 e +ampiezza/100, sempre gli stessi per lo stesso seed."""
    x, out = seed, []
    for _ in range(n):
        x = x * 48271 % 2147483647
        out.append(((x % (2 * ampiezza + 1)) - ampiezza) / 100)
    return out


def somma(a, b):
    return [max(-0.99, min(0.99, round(x + y + 1e-9, 2))) for x, y in zip(a, b)]


# La lanterna di Emma e il cartello di Mare continuano le carte a cinque semi: i primi cinque semi restano quelli.
_L = rotolo(7, ROTOLO_N - 5, 60)
LANTERNA_ROTOLO = [0.90, 0.20, -0.50, 0.40, -0.30] + _L
CARTELLO_ROTOLO = [1.00, -0.30, -1.02, 0.50, 0.60] + somma(_L, rotolo(11, ROTOLO_N - 5, 30))
MARE_ROTOLO = rotolo(13, ROTOLO_N, 60)                                        # le carte di Mare e Onde,
ONDE_ROTOLO = somma(MARE_ROTOLO, rotolo(17, ROTOLO_N, 15))                 # che si somigliano molto


def gettone_intero(a, b):
    """Il prodotto scalare fatto con interi (centesimi): esatto, come nel film."""
    return sum(round(x * 100) * round(y * 100) for x, y in zip(a, b)) / 10000


# Il vestito di Emma prende il colore dei vicini: media dei colori delle parole,
# pesata con le probabilità della lettura del periscopio (logit lens) a temperatura 0.15.
COLORE = {
    'Bovary': (240, 112, 100), 'e': (240, 140, 120),
    'onde': (60, 120, 230), 'sabbia': (90, 150, 220), 'conchiglie': (80, 140, 235), 'nuota': (40, 100, 220),
    'foglie': (60, 180, 90), 'altalena': (80, 190, 110), 'scivolo': (70, 175, 100), 'corre': (40, 170, 80),
    'gioca': (40, 170, 170), 'felice': (245, 200, 76), '.': (150, 150, 160), 'Fine': (70, 70, 90),
}
T_COLORE = 0.15


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def r2(v):
    return [round(x + 1e-9, 2) for x in v]


def softmax(v, T=1.0):
    m = max(v)
    e = [math.exp((x - m) / T) for x in v]
    s = sum(e)
    return [x / s for x in e]


def partita(a, b):
    """Prodotto scalare come a schermo: pastiglie arrotondate e gettone.
    Si ferma se la somma delle pastiglie mostrate non dà il gettone mostrato."""
    pastiglie = r2([x * y for x, y in zip(a, b)])
    gettone = round(dot(a, b) + 1e-9, 2)
    assert abs(sum(pastiglie) - gettone) < 0.005, (pastiglie, gettone)
    return pastiglie, gettone


def colore(x):
    p = softmax([dot(x, U[w]) for w in U], T_COLORE)
    c = [sum(pi * COLORE[w][i] for pi, w in zip(p, U)) for i in range(3)]
    return '#%02x%02x%02x' % tuple(round(v) for v in c)


def secchio(x, T=1.0):
    return dict(zip(U, softmax([dot(x, U[w]) for w in U], T)))


def top(d, n):
    return sorted(d, key=lambda w: -d[w])[:n]


def viaggio(contesto):
    print(f'\n== Al {contesto} Emma ==')
    frase = ['Al', contesto, 'Emma']

    # Piano 1: la partita a carte tra la lanterna di Emma e i cartelli dei compagni.
    gettoni = {}
    for t in frase:
        pastiglie, g = partita(Q_EMMA, K[t])
        gettoni[t] = g
        print(f'  partita Emma–{t:5}', pastiglie, '→ gettone', g)
    quote = [round(p, 1) for p in softmax(list(gettoni.values()))]
    assert quote == [0.1, 0.7, 0.2]
    nuova = r2([sum(q * E[t][i] for q, t in zip(quote, frase)) for i in range(3)])
    print('  quote', dict(zip(frase, quote)), '→ nuova carta', nuova)

    # I piani: x = x + Δ, stanze lette col periscopio, colore dai vicini.
    x = E['Emma']
    traccia = [x]
    print('  x0', x, colore(x), 'stanza:', top({w: dot(x, U[w]) for w in U}, 3))
    for n, d in enumerate(DELTA[contesto], 1):
        x = r2([a + b for a, b in zip(x, d)])
        traccia.append(x)
        print(f'  x{n}', x, colore(x), 'stanza:', top({w: dot(x, U[w]) for w in U}, 3))

    # In fondo: le campane (logit) e il secchio (softmax).
    logit = {w: round(dot(x, U[w]) + 1e-9, 2) for w in U}
    print('  campane', {w: logit[w] for w in top(logit, 6)})
    for T in (0.3, 1, 3):
        p = secchio(x, T)
        print(f'  T={T:<4}', [(w, f'{p[w]:.1%}') for w in top(p, 5)], f"Bovary {p['Bovary']:.1%}")
    return traccia, logit


if __name__ == '__main__':
    tm, lm = viaggio('mare')
    tp, lp = viaggio('parco')

    # Ep. 1 e 2: stessa partenza, due strade.
    assert tm[0] == tp[0] == [0.55, 0.07, -0.58]
    assert top({w: dot(tm[1], U[w]) for w in U}, 3) == ['conchiglie', 'onde', 'sabbia']
    assert top({w: dot(tp[1], U[w]) for w in U}, 3) == ['altalena', 'foglie', 'scivolo']
    assert top(lm, 2) == ['nuota', 'gioca'] and top(lp, 2) == ['corre', 'gioca']
    print('\n  campana nuota (ep. 1):', partita(tm[-1], U['nuota']))
    print('  campana corre (ep. 2):', partita(tp[-1], U['corre']))
    pm, pp = secchio(tm[-1]), secchio(tp[-1])
    assert round(pm['nuota'] * 100) == 45 and round(pm['gioca'] * 100) == 19
    assert round(pp['corre'] * 100) == 44 and round(pp['gioca'] * 100) == 19

    # Ep. 3: il termostato sul secchio del parco, poi la frase continua fino a Fine.
    print('\n== Episodio 3 ==')
    for T in (0, 1, 3):
        if T == 0:
            print('  T=0   sempre', top(pp, 1)[0])
            continue
        p = secchio(tp[-1], T)
        print(f'  T={T}   Bovary {p["Bovary"]:.1%}   corre {p["corre"]:.1%}')
    assert round(secchio(tp[-1], 3)['Bovary'] * 100, 1) >= 4
    for (frase, x, attesa), nome in zip(PASSI, ['Corre', 'Felice', 'Punto']):
        # Il percorso dell'ultimo arrivato: carta dell'armadio + spostamenti = riga in fondo.
        pos = E_NUOVI[nome]
        print(f'  {nome}: carta', pos)
        for n, d in enumerate(DELTA_GIRI[nome]):
            pos = r2([a + b for a, b in zip(pos, d)])
            stanza = top({w: dot(pos, U[w]) for w in U}, 3)
            print(f'    piano {n + 1}', pos, 'stanza:', stanza)
            assert stanza == STANZE_GIRI[nome][n]
        assert pos == x
        p = secchio(x)
        print(f'  {frase} ___', x, [(w, f'{p[w]:.0%}') for w in top(p, 3)])
        assert top(p, 1)[0] == attesa

    # Ep. 4: un seme in più, una pastiglia in più.
    print('\n== Episodio 4 ==')
    for n, (a, b) in CARTE_4.items():
        print(f'  {n} semi', partita(a, b))

    print('  rotolo: primi semi della lanterna', LANTERNA_ROTOLO[:6], 'del cartello', CARTELLO_ROTOLO[:6])
    g = gettone_intero(LANTERNA_ROTOLO, CARTELLO_ROTOLO)
    print(f'  rotolo: {ROTOLO_N} pastiglie → gettone {g:.2f}')
    pos = sum(1 for x, y in zip(MARE_ROTOLO[:12], ONDE_ROTOLO[:12]) if x * y > 0)
    print('  Mare e Onde: pastiglie dorate nei primi 12 semi:', pos)
    assert g > 0 and pos >= 10
    assert LANTERNA_ROTOLO[:5] == CARTE_4[5][0] and CARTELLO_ROTOLO[:5] == CARTE_4[5][1]

    print('\nTutti i numeri tornano.')
