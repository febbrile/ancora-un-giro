# Ruota tutto il modellino (E, Δ, U, vettori dei passi) con una rotazione R scelta perché
# nessun vettore mostrato sia allineato a un asse; arrotonda e controlla che tutto torni ancora.
import math, random, json
D = json.load(open('progetto.json'))
U, X = D['U'], D['X']
W = list(U)
E = {'Al': [0.10, 0.10, -0.20], 'mare': [0.80, 0.05, 0.05], 'parco': [0.05, 0.80, 0.05], 'Emma': [0.05, 0.05, 0.80]}
DM = [[0.60, 0.00, -0.20], [0.80, 0.05, -0.80], [1.30, 0.20, -1.60]]
DP = [[s[1], s[0], s[2]] for s in DM]

def dot(a, b): return sum(x * y for x, y in zip(a, b))
def sm(v, T=1.0):
    m = max(v); e = [math.exp((x - m) / T) for x in v]; s = sum(e); return [x / s for x in e]
def mat(axis, ang):
    x, y, z = axis; n = math.sqrt(x*x + y*y + z*z); x, y, z = x/n, y/n, z/n
    c, s = math.cos(ang), math.sin(ang); C = 1 - c
    return [[c + x*x*C, x*y*C - z*s, x*z*C + y*s], [y*x*C + z*s, c + y*y*C, y*z*C - x*s], [z*x*C - y*s, z*y*C + x*s, c + z*z*C]]
def rot(R, v): return [round(dot(r, v), 2) for r in R]

def build(R):
    e = {k: rot(R, v) for k, v in E.items()}
    u = {k: rot(R, v) for k, v in U.items()}
    dm = [rot(R, d) for d in DM]; dp = [rot(R, d) for d in DP]
    x = [rot(R, v) for v in X]
    return e, u, dm, dp, x

def traj(e, d):
    x = e['Emma']; out = [x]
    for s in d: x = [round(a + b, 2) for a, b in zip(x, s)]; out.append(x)
    return out

def mixed(v):  # quanto un vettore è "misto": il secondo componente più grande rispetto al primo
    a = sorted((abs(c) for c in v), reverse=True)
    return a[1] / a[0] if a[0] else 0

def check(e, u, dm, dp, x, verbose=False):
    TM, TP = traj(e, dm), traj(e, dp)
    rooms = [(TM[1], {'conchiglie', 'onde', 'sabbia'}), (TP[1], {'foglie', 'altalena', 'scivolo'}),
             (TM[2], {'nuota', 'onde', 'conchiglie'}), (TP[2], {'corre', 'foglie', 'altalena'}),
             (TM[3], {'nuota', 'gioca'}), (TP[3], {'corre', 'gioca'}), (TM[0], {'Bovary', 'e'})]
    ok = True
    for v, req in rooms:
        top = set(sorted(W, key=lambda w: -dot(v, u[w]))[:len(req)])
        ok &= top == req
    for v, best in zip(x, ['felice', '.', 'Fine']):
        ok &= max(W, key=lambda w: dot(v, u[w])) == best
    return ok, TM, TP

random.seed(7)
best = None
for _ in range(20000):
    R = mat([random.gauss(0, 1) for _ in range(3)], random.uniform(0.5, 2.6))
    e, u, dm, dp, x = build(R)
    ok, TM, TP = check(e, u, dm, dp, x)
    if not ok: continue
    shown = list(e.values()) + TM[1:] + TP[1:] + [u['nuota'], u['corre']]
    score = min(mixed(v) for v in shown)
    score -= 0.02 * sum(1 for v in shown for c in v if abs(c) < 0.05)
    if best is None or score > best[0]: best = (score, R)

R = best[1]
e, u, dm, dp, x = build(R)
ok, TM, TP = check(e, u, dm, dp, x)
print('score', round(best[0], 3), 'ok', ok)
print('R', [[round(c, 4) for c in r] for r in R])
for k, v in e.items(): print('E', k, v)
print('mare', TM); print('parco', TP)
print('Δ mare', dm); print('Δ parco', dp)
for w in W: print('U', w, u[w])
print('X3', x)
json.dump({'R': R, 'E': e, 'U': u, 'DM': dm, 'DP': dp, 'X': x}, open('ruotato.json', 'w'), ensure_ascii=False, indent=1)
