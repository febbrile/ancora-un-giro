# Progetto congiunto: tutte le righe di U possono muoversi (vicino ai valori della bozza 2),
# con obiettivi su secchi, stanze e passi dell'episodio 3.
import math, random, json, sys
random.seed(int(sys.argv[1]) if len(sys.argv) > 1 else 1)

def dot(a, b): return sum(x * y for x, y in zip(a, b))
def add(a, b): return [x + y for x, y in zip(a, b)]
def sm(v, T=1.0):
    m = max(v); e = [math.exp((x - m) / T) for x in v]; s = sum(e); return [x / s for x in e]

E = {'Al': [0.10, 0.10, -0.20], 'mare': [0.80, 0.05, 0.05], 'parco': [0.05, 0.80, 0.05], 'Emma': [0.05, 0.05, 0.80]}
U0 = {
    'Bovary': [0.00, -0.10, 0.90], 'e': [0.10, 0.10, 0.60],
    'onde': [0.80, -0.10, 0.30], 'foglie': [-0.10, 0.80, 0.30],
    'sabbia': [0.70, 0.20, 0.30], 'altalena': [0.20, 0.75, 0.30],
    'conchiglie': [0.75, 0.00, 0.35], 'scivolo': [0.10, 0.70, 0.35],
    'nuota': [0.80, -0.05, -0.60], 'corre': [0.00, 0.80, -0.60],
    'gioca': [0.45, 0.45, -0.60],
    'felice': [-0.5, 0.2, 0.5], '.': [-0.6, -0.2, 0.6], 'Fine': [-0.8, -0.4, 0.2],
}
W = list(U0)
DM = [[0.60, 0.00, -0.20], [0.80, 0.05, -0.80], [1.30, 0.20, -1.60]]
def traj(d):
    x = E['Emma']; out = [x]
    for s in d: x = add(x, s); out.append(x)
    return out
TM = traj(DM); TP = traj([[s[1], s[0], s[2]] for s in DM])

def full(spec, floor=0.004):
    rest = [w for w in W if w not in spec]
    left = 1 - sum(spec.values())
    return [spec.get(w, left / len(rest)) for w in W]

KL = [  # (vettore fisso o indice di passo, obiettivo)
    (TM[3], full({'nuota': .45, 'gioca': .20, 'onde': .09, 'sabbia': .07, 'conchiglie': .07, 'corre': .06, 'Bovary': .006, 'felice': .01, '.': .005, 'Fine': .002})),
    (TP[3], full({'corre': .45, 'gioca': .20, 'foglie': .09, 'altalena': .07, 'scivolo': .07, 'nuota': .06, 'Bovary': .006, 'felice': .01, '.': .005, 'Fine': .002})),
    (0, full({'felice': .50, '.': .25, 'e': .10, 'Fine': .005, 'Bovary': .005})),
    (1, full({'.': .70, 'e': .15, 'Fine': .01, 'Bovary': .005})),
    (2, full({'Fine': .92, 'Bovary': .005})),
]
ROOMS = [(TM[0], ['Bovary', 'e']), (TP[0], ['Bovary', 'e']),
         (TM[1], ['conchiglie', 'onde', 'sabbia']), (TP[1], ['foglie', 'altalena', 'scivolo']),
         (TM[2], ['nuota', 'onde', 'conchiglie']), (TP[2], ['corre', 'foglie', 'altalena']),
         (TM[3], ['nuota', 'gioca']), (TP[3], ['corre', 'gioca'])]

U = {w: [a + random.uniform(-.05, .05) for a in v] for w, v in U0.items()}
X = [[random.uniform(-1, 1) for _ in range(3)] for _ in range(3)]
lr = 0.03
for it in range(60000):
    gU = {w: [0, 0, 0] for w in W}; gX = [[0, 0, 0] for _ in X]
    for src, tg in KL:
        x = X[src] if isinstance(src, int) else src
        p = sm([dot(x, U[w]) for w in W])
        for j, w in enumerate(W):
            d = p[j] - tg[j]
            for i in range(3):
                gU[w][i] += d * x[i]
                if isinstance(src, int): gX[src][i] += d * U[w][i]
    for x, req in ROOMS:
        lg = {w: dot(x, U[w]) for w in W}
        others = [w for w in W if w not in req]
        top = max(others, key=lambda w: lg[w])
        for w in req:
            v = lg[top] + 0.12 - lg[w]
            if v > 0:
                for i in range(3): gU[top][i] += v * x[i]; gU[w][i] -= v * x[i]
    for w in W:
        old = w in ('Bovary', 'e', 'onde', 'foglie', 'sabbia', 'altalena', 'conchiglie', 'scivolo', 'nuota', 'corre', 'gioca')
        n = math.sqrt(dot(U[w], U[w]))
        for i in range(3):
            if old: gU[w][i] += 0.3 * (U[w][i] - U0[w][i])
            gU[w][i] += 0.3 * max(0, n - 1.1) * U[w][i] / n
    for w in W:
        for i in range(3): U[w][i] -= lr * gU[w][i]
    for k in range(len(X)):
        for i in range(3): X[k][i] -= lr * gX[k][i]

r2 = lambda v: [round(a, 2) for a in v]
U = {w: r2(v) for w, v in U.items()}; X = [r2(x) for x in X]
def show(x, n=5):
    p = sm([dot(x, U[w]) for w in W])
    return [(w, round(v * 100, 1)) for w, v in sorted(zip(W, p), key=lambda q: -q[1])[:n]] + [('Bovary', round(p[W.index('Bovary')] * 100, 1)), ('Bov T3', round(sm([dot(x, U[w]) for w in W], 3)[W.index('Bovary')] * 100, 1))]
for w in W: print(f'{w:11}', U[w], U0[w])
for name, x in zip(['corre ___', 'felice ___', '. ___'], X): print(name, x, show(x))
for name, tr in (('mare', TM), ('parco', TP)):
    for n, x in enumerate(tr):
        lg = {w: dot(x, U[w]) for w in U}
        print(name, n, [(w, round(lg[w], 2)) for w in sorted(lg, key=lambda w: -lg[w])[:4]])
    print(' secchio', show(tr[-1], 7))
json.dump({'U': U, 'X': X}, open('progetto.json', 'w'), ensure_ascii=False, indent=1)
