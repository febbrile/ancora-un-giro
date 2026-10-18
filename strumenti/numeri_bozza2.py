"""Il modellino giocattolo della bozza 2 (i film attuali, prima della ricostruzione): tutti i numeri.

Esegui `python3 strumenti/numeri.py`: stampa i calcoli e fallisce se un numero
non torna con quelli della sceneggiatura (sezione 4) e degli episodi.
"""
import math

E = {
    'Al':    [0.10, 0.10, -0.20],
    'mare':  [0.80, 0.05, 0.05],
    'parco': [0.05, 0.80, 0.05],
    'Emma':  [0.05, 0.05, 0.80],
}

# Vocabolario giocattolo: righe della matrice di uscita U.
U = {
    'Bovary':     [0.00, -0.10, 0.90], 'e':        [0.10, 0.10, 0.60],
    'onde':       [0.80, -0.10, 0.30], 'foglie':   [-0.10, 0.80, 0.30],
    'sabbia':     [0.70, 0.20, 0.30],  'altalena': [0.20, 0.75, 0.30],
    'conchiglie': [0.75, 0.00, 0.35],  'scivolo':  [0.10, 0.70, 0.35],
    'nuota':      [0.80, -0.05, -0.60], 'corre':   [0.00, 0.80, -0.60],
    'gioca':      [0.45, 0.45, -0.60], 'stira':    [-0.60, -0.50, -0.20],
}

# Attention del piano 1: la lanterna (query) di Emma e i cartelli (key) dei compagni.
Q_EMMA = [0.90, 0.20, -0.50]
K = {
    'Al':    [-0.40, 0.30, 0.60],
    'mare':  [1.00, -0.30, -1.02],
    'parco': [0.55, 1.25, -1.20],
    'Emma':  [0.20, 0.20, 0.24],
}

# Spostamenti dei tre piani, frase del mare (al parco: x e y scambiati).
DELTA_MARE = [[0.60, 0.00, -0.20], [0.80, 0.05, -0.80], [1.30, 0.20, -1.60]]


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def add(a, b):
    return [round(x + y, 2) for x, y in zip(a, b)]


def softmax(v, T=1.0):
    e = [math.exp(x / T) for x in v]
    s = sum(e)
    return [x / s for x in e]


def close(a, b, tol=0.005):
    return all(abs(x - y) <= tol for x, y in zip(a, b))


def viaggio(contesto, delta):
    print(f'\n== Al {contesto} Emma ==')
    frase = ['Al', contesto, 'Emma']

    # Piano 1: la partita a carte (prodotto scalare lanterna · cartello).
    gettoni = [round(dot(Q_EMMA, K[t]) + 1e-9, 2) for t in frase]
    pesi = [round(p, 1) for p in softmax(gettoni)]
    raccolto = [round(sum(w * E[t][i] for w, t in zip(pesi, frase)), 2) for i in range(3)]
    print('gettoni   ', dict(zip(frase, gettoni)))
    print('quote     ', dict(zip(frase, pesi)))
    print('nuova carta', raccolto)
    assert pesi == [0.1, 0.7, 0.2]

    # I tre piani: x = x + Δ (connessione residua) e le stanze (logit lens).
    x = E['Emma']
    print('x0', x)
    for n, d in enumerate(delta, 1):
        x = add(x, d)
        lens = sorted(U, key=lambda w: -dot(x, U[w]))[:3]
        print(f'x{n}', x, 'stanza:', lens)

    # In fondo al pozzo: campane (logit) e secchio (softmax con temperatura).
    logit = {w: round(dot(x, U[w]), 2) for w in U}
    print('logit     ', dict(sorted(logit.items(), key=lambda p: -p[1])))
    for T in (0.3, 1, 3):
        p = dict(zip(U, softmax(list(logit.values()), T)))
        top = sorted(p.items(), key=lambda q: -q[1])[:3]
        print(f'T={T:<4}', [(w, f'{v:.1%}') for w, v in top], f"stira {p['stira']:.1%}")
    return x, logit


if __name__ == '__main__':
    assert close([0.1 * a + 0.7 * b + 0.2 * c for a, b, c in zip(E['Al'], E['mare'], E['Emma'])], [0.58, 0.06, 0.18])
    # Stesso gettone per Mare e Parco: 1.35 e 1.345, entrambi mostrati come 1.35.
    assert close([dot(Q_EMMA, K['mare']), dot(Q_EMMA, K['parco'])], [1.35, 1.35], tol=0.006)

    x_mare, logit = viaggio('mare', DELTA_MARE)
    assert x_mare == [2.75, 0.30, -1.80]
    assert logit['nuota'] == 3.27 and logit['gioca'] == 2.45 and logit['stira'] == -1.44
    p1 = dict(zip(U, softmax(list(logit.values()), 1)))
    p3 = dict(zip(U, softmax(list(logit.values()), 3)))
    assert round(p1['nuota'], 2) == 0.45 and round(p1['gioca'], 2) == 0.20
    assert round(p1['stira'], 3) == 0.004 and round(p3['stira'], 3) == 0.037

    x_parco, logit_p = viaggio('parco', [[d[1], d[0], d[2]] for d in DELTA_MARE])
    # U non è perfettamente speculare: corre 3.28 (episodio 3, scena corre), 45% a T=1.
    assert x_parco == [0.30, 2.75, -1.80] and logit_p['corre'] == 3.28
    print('\nTutti i numeri tornano.')
