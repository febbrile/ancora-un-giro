"""Il modellino giocattolo di «Ancora un giro»: l'unica fonte di colori, finestre e paperelle.

Esegui `python3 strumenti/modellino.py`: stampa i giri di «Al mare Emma» e di «Al parco Emma» e si ferma se qualcosa
non torna.
Con `--scrivi` riporta i risultati in episodi/comune/shared.js, tra i segni `// <modellino>` e `// </modellino>`.

Nel modellino ogni passeggero è una freccia con tre coordinate senza nome. I numeri non vanno mai a schermo:
decidono i colori dei vestiti, le paperelle di luce nelle finestre e quante paperelle di ogni colore cadono nella vasca.

Cosa è inventato (e dichiarato qui) e cosa è calcolato:
- inventati: i biglietti (B), le paperelle (P), i fili di luce di Al e del vagone di mezzo e quelli di Emma nei
  tratti 2 e 3, gli spostamenti di Al e del vagone di mezzo (S), la parte fissa degli scambi e la loro forza
  (SCAMBI_FISSI, FORZA_SCAMBI), i colori delle parole (COLORE);
- calcolati: i fili di Emma nel primo tratto (sguardi: query · key, poi softmax), quello che i fili portano a Emma in
  ogni tratto, gli scambi di Emma, i colori dei vestiti, le finestre, la vasca.

Le due frasi differiscono per un solo vagone: biglietti di Al ed Emma, fili dichiarati e scambi sono gli stessi.
La differenza entra dai fili di luce, e gli scambi, che scattano a seconda del vagone che passa, la portano avanti.
Al, davanti, non guarda nessuno: è uguale nei due treni.

Le finestre sulla vasca: dopo ogni tratto, quando passa l'ultimo vagone, nell'acqua si accendono le paperelle
che cadrebbero se il treno uscisse lì (la stessa vasca, calcolata con il vestito di quel momento). L'ultima
finestra è uguale alla vasca vera.
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
# Gli scambi di Emma: in ogni tratto, dopo i fili, lo scambio la sposta di una parte fissa (la pista di quel tratto)
# più una spinta che dipende dal vagone che passa: per ogni parola a cui il vagone somiglia, lo scambio lo spinge un
# po' più verso quella parola. La parte fissa è tarata perché «Al mare Emma» dia gli spostamenti di sempre.
SCAMBI_FISSI = [[-0.44, -0.41, 0.78], [-0.61, -0.66, 1.41], [-0.47, -1.02, 1.77]]
FORZA_SCAMBI = 0.2
# Controllo: in «Al mare Emma» fili + scambi danno gli spostamenti di Emma di sempre.
SPOSTAMENTI_EMMA_MARE = [[-0.44, 0.43, -0.14], [-0.93, 0.61, 0.22], [-1.65, 1.08, 0.64]]

# Le frasi del modellino, e le parole che salgono sul treno dopo la pesca.
FRASI = {
    'mare':  (['Al', 'mare', 'Emma'], ['nuota']),
    'parco': (['Al', 'parco', 'Emma'], ['corre', 'gioca']),
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


def vasca(x, n=PAPERELLE_IN_VASCA, T=1.0):
    """Quante paperelle di ogni parola cadono nella vasca (resti maggiori, totale esatto)."""
    p = dict(zip(P, softmax([dot(x, P[w]) for w in P], T)))
    quote = {w: p[w] * n for w in P}
    conta = {w: int(quote[w]) for w in P}
    resto = n - sum(conta.values())
    for w in sorted(P, key=lambda w: -(quote[w] - conta[w]))[:resto]:
        conta[w] += 1
    return p, {w: c for w, c in sorted(conta.items(), key=lambda kv: -kv[1]) if c > 0}


def scambio(k, x):
    """Lo scambio del tratto k sul vagone x: la parte fissa più la spinta verso le parole a cui x somiglia."""
    spinta = [FORZA_SCAMBI * sum(max(0.0, dot(x, P[w])) * P[w][i] for w in P) for i in range(3)]
    return r2([a + b for a, b in zip(SCAMBI_FISSI[k], spinta)])


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

    # Emma, tratto per tratto: i fili le portano la media pesata dei vestiti di chi guarda, poi scatta lo scambio,
    # calcolato sul vagone così com'è dopo i fili.
    altri = {t: tappe_di(t) for t in frase[:-1]}
    x, tappe, spostamenti = B[ultimo], [B[ultimo]], []
    for k, f in enumerate(fili_tratti):
        vestiti = {**{t: altri[t][k] for t in altri}, ultimo: x}
        porta = r2([sum(f[t] * vestiti[t][i] for t in frase) for i in range(3)])
        y = somma(x, porta)
        if k == 0:
            dopo_fili = y
        d = scambio(k, y)
        spostamenti.append(somma(porta, d))
        x = somma(y, d)
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
            }
            print('  Emma: biglietto', info['biglietto'], '→ dopo i fili', info['dopo_fili'], '→ tratti', info['tratti'])
            # Le finestre: la vasca che si avrebbe dopo ogni tratto.
            info['finestre'] = []
            for k, v in enumerate(tappe[1:]):
                conta_k = vasca(v)[1]
                info['finestre'].append([[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta_k.items()])
                print(f'        finestra {k + 1}', conta_k)
            USCITE[chiave] = tappe[-1]  # episodio 3: serve alla manopola
            p, conta = vasca(tappe[-1])
            assert sum(conta.values()) == PAPERELLE_IN_VASCA
            out['vasca'] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
            assert info['finestre'][-1] == out['vasca'], 'l\'ultima finestra deve essere uguale alla vasca'
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
    # La paperella più probabile: «nuota» al mare, «corre» al parco; al parco anche «gioca» può uscire.
    assert mare['vasca'][0][0] == 'nuota' and parco['vasca'][0][0] == 'corre'
    assert dict((w, c) for w, c, _ in parco['vasca']).get('gioca', 0) > 0


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


# ── Episodio 3 · La manopola della bancarella ────────────────────────────────────────────────────────
# La manopola sta sul bancone della bancarella, fuori dalla montagna: non tocca la pista né il vestito di Emma,
# cambia solo quante paperelle di ogni colore cadono sotto l'ultimo vagone. È la temperatura: le somiglianze tra il
# vestito e le paperelle si dividono per T prima di contarle. Sulla tacca di mezzo T = 1 e la vasca è quella di
# sempre, uguale all'ultima finestra (le finestre sono dentro la montagna e la manopola non le vede).
# Inventati: le tre posizioni della manopola, il biglietto di «altalena», le paperelle che Ada pesca.
# Calcolati: le vasche, i vestiti dei passeggeri nuovi.
MANOPOLA = {'mezzo': 1.0, 'stretta': 0.3, 'larga': 3.0}
B['altalena'] = [0.42, 0.50, 0.02]
# Le pesche di «Al mare Emma»: tre case con la manopola sulla tacca, due giri verso la lucina grande, uno verso le
# lucine piccole.
PESCHE_MANOPOLA = {'mezzo': ['nuota', 'gioca', 'corre'], 'stretta': ['nuota', 'nuota'], 'larga': ['altalena']}
USCITE = {}  # il vestito dell'ultimo vagone all'uscita, per frase (lo riempie giro())


def manopola(dati):
    """Le vasche di «Al mare Emma» con la manopola nelle sue tre posizioni."""
    print('\n== La manopola · Al mare Emma ==')
    x, out = USCITE['mare'], {'posizioni': MANOPOLA, 'vasche': {}, 'pesche': PESCHE_MANOPOLA}
    for pos, T in MANOPOLA.items():
        conta = vasca(x, T=T)[1]
        assert sum(conta.values()) == PAPERELLE_IN_VASCA
        out['vasche'][pos] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
        print(f'  {pos:7} T={T}', conta)
    v = {pos: dict((w, c) for w, c, _ in out['vasche'][pos]) for pos in MANOPOLA}
    # Sulla tacca di mezzo la vasca è quella di sempre.
    assert out['vasche']['mezzo'] == dati['mare']['vasca']
    # Verso la lucina grande cadono quasi solo paperelle del colore più numeroso.
    assert out['vasche']['stretta'][0][0] == 'nuota' and out['vasche']['stretta'][0][1] >= 0.9 * PAPERELLE_IN_VASCA
    # Verso le lucine piccole i colori si pareggiano: nessuno sopra un quinto, quasi tutti presenti.
    assert out['vasche']['larga'][0][1] <= PAPERELLE_IN_VASCA / 5 and len(v['larga']) >= len(P) - 1
    # La parola più numerosa resta la stessa: la manopola non cambia l'ordine dei colori.
    assert all(out['vasche'][pos][0][0] == 'nuota' for pos in MANOPOLA)
    # Ogni paperella pescata c'è davvero nella sua vasca.
    for pos, parole in PESCHE_MANOPOLA.items():
        for w in parole:
            assert v[pos].get(w, 0) > 0, (pos, w)
    out['nuovo'] = {w: colore(B[w]) for pos in PESCHE_MANOPOLA for w in PESCHE_MANOPOLA[pos]}
    for w, c in out['nuovo'].items():
        print(f'  passeggero nuovo «{w}»:', c)


# ── Episodio 4 · Il treno che ricorda: la chat e la banchina ─────────────────────────────────────────
# La chat: «Al mare Emma» → «nuota», poi «Al parco» → «corre», poi ancora «Al parco».
# A ogni messaggio sale sul treno tutta la chat, risposte comprese: tra un messaggio e l'altro non resta niente.
# Sulla banchina stanno al massimo BANCHINA vagoni: se la chat è più lunga, i biglietti del principio restano giù.
#
# Inventati e dichiarati qui: BANCHINA, la chiave di «nuota» (K_CHAT), lo sguardo di Parco quando è l'ultimo
# (Q_PARCO), i fili di Parco nei tratti 2 e 3 (FILI_PARCO_TRATTI), gli spostamenti di «nuota» e del secondo Al
# (S_CHAT). Calcolati: i fili di Parco nel primo tratto, quello che gli portano, i suoi scambi, i colori, le finestre,
# la vasca. Al, Mare ed Emma in testa al treno guardano solo avanti: fanno lo stesso viaggio dell'episodio 1.

BANCHINA = 7
CHAT = [(['Al', 'mare', 'Emma'], ['nuota']), (['Al', 'parco'], ['corre']), (['Al', 'parco'], [])]
K_CHAT = {**K, 'nuota': [-0.10, 0.40, 0.20]}
Q_PARCO = [4.0, 1.0, 3.2]
FILI_PARCO_TRATTI = [None, (0.1, 0.1, 0.3, 0.1, 0.1, 0.3), (0.1, 0.1, 0.2, 0.1, 0.1, 0.4)]
S_CHAT = {
    'nuota': [[-0.06, 0.05, 0.00], [-0.09, 0.08, 0.01], [-0.11, 0.10, 0.01]],
    'Al':    [[0.03, 0.06, 0.04], [0.04, 0.07, 0.05], [0.05, 0.08, 0.06]],
}


def tappe_emma_mare():
    """Le tappe di Emma in «Al mare Emma», rifatte come in giro(): servono i vestiti, non solo i colori."""
    frase = FRASI['mare'][0]
    fili = dict(zip(frase, [round(q, 1) for q in softmax([dot(Q_EMMA, K[t]) for t in frase])]))
    fili_tratti = [fili] + [dict(zip(frase, f)) for f in FILI_EMMA_TRATTI[1:]]
    altri = {t: tappe_di(t) for t in frase[:-1]}
    x, tappe = B['Emma'], [B['Emma']]
    for k, f in enumerate(fili_tratti):
        vestiti = {**{t: altri[t][k] for t in altri}, 'Emma': x}
        y = somma(x, r2([sum(f[t] * vestiti[t][i] for t in frase) for i in range(3)]))
        x = somma(y, scambio(k, y))
        tappe.append(x)
    return tappe


def fili_arrotondati(pesi):
    """Arrotonda i fili al decimo; quello che manca per fare uno va al filo più forte."""
    f = [round(p, 1) for p in pesi]
    f[max(range(len(f)), key=lambda i: pesi[i])] += round(1 - sum(f), 1)
    return [round(x, 1) for x in f]


def giro_chat(dati):
    print('\n== La chat (episodio 4) ==')
    out = {'banchina': BANCHINA, 'messaggi': []}
    chat = []
    for k, (scritto, risposta) in enumerate(CHAT):
        striscia = chat + scritto
        sale, giu = striscia[-BANCHINA:], striscia[:-BANCHINA]
        out['messaggi'].append({'striscia': striscia, 'sale': sale, 'giu': giu,
                                'biglietti': [colore(B[t]) for t in sale]})
        print(f'  messaggio {k + 1}: sale {sale}, resta giù {giu}')
        chat = striscia + risposta
        assert len(sale) + len(risposta) <= BANCHINA, 'durante la risposta il treno non supera la banchina'
    # Il secondo messaggio è quello che entra nella montagna: «Al mare Emma nuota Al parco».
    frase = out['messaggi'][1]['sale']
    assert frase == ['Al', 'mare', 'Emma', 'nuota', 'Al', 'parco'] and not out['messaggi'][1]['giu']
    # Al terzo la chat non ci sta più: restano giù proprio Al e Mare, il principio.
    assert out['messaggi'][2]['giu'] == ['Al', 'mare']
    vestiti = [tappe_di('Al'), tappe_di('mare'), tappe_emma_mare()]
    for t in ('nuota', 'Al'):
        x, tappe = B[t], [B[t]]
        for d in S_CHAT[t]:
            x = somma(x, d)
            tappe.append(x)
        vestiti.append(tappe)
    # In testa al treno, lo stesso viaggio dell'episodio 1.
    mare = dati['mare']['passeggeri']
    for i, t in enumerate(('Al', 'mare', 'Emma')):
        assert [colore(v) for v in vestiti[i][1:]] == mare[t]['tratti'], t
    # Parco, l'ultimo: i fili del primo tratto vengono da sguardo · chiave, poi softmax.
    sguardi = [round(dot(Q_PARCO, K_CHAT[t]), 2) for t in frase]
    fili = fili_arrotondati(softmax(sguardi))
    print('  sguardi di Parco', sguardi, '→ fili', fili)
    assert max(range(6), key=lambda i: fili[i]) == 2, 'il filo più forte di Parco va a Emma'
    fili_tratti = [fili] + [list(f) for f in FILI_PARCO_TRATTI[1:]]
    for f in fili_tratti:
        assert abs(sum(f) - 1) < 1e-9, f
    x, tappe = B['parco'], [B['parco']]
    for k, f in enumerate(fili_tratti):
        davanti = [v[k] for v in vestiti] + [x]
        porta = r2([sum(f[j] * davanti[j][i] for j in range(6)) for i in range(3)])
        y = somma(x, porta)
        if k == 0:
            dopo_fili = y
        x = somma(y, scambio(k, y))
        tappe.append(x)
    passeggeri = []
    for i, t in enumerate(frase[:-1]):
        passeggeri.append({'parola': t, 'biglietto': colore(B[t]), 'tratti': [colore(v) for v in vestiti[i][1:]]})
    finestre = [[[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in vasca(v)[1].items()] for v in tappe[1:]]
    p, conta = vasca(tappe[-1])
    vasca_parco = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
    assert finestre[-1] == vasca_parco
    passeggeri.append({'parola': 'parco', 'biglietto': colore(B['parco']), 'dopo_fili': colore(dopo_fili),
                       'tratti': [colore(v) for v in tappe[1:]], 'fili': fili, 'fili_tratti': fili_tratti,
                       'finestre': finestre})
    for q in passeggeri:
        print(f"  {q['parola']:6} biglietto {q['biglietto']} → tratti {q['tratti']}")
    print('  Parco dopo i fili', colore(dopo_fili))
    for k, f in enumerate(finestre):
        print(f'        finestra {k + 1}', {w: c for w, c, _ in f})
    print('  vasca', conta)
    print('  probabilità', {w: round(p[w], 3) for w in sorted(p, key=lambda w: -p[w])[:5]})
    # La paperella più probabile è «corre»; un po' di mare (il blu di «nuota») c'è ancora.
    assert vasca_parco[0][0] == 'corre'
    out['giro'] = {'frase': frase, 'passeggeri': passeggeri, 'vasca': vasca_parco,
                   'nuovo': {'corre': colore(B['corre'])}}
    print('  passeggero nuovo «corre»:', colore(B['corre']))
    return out


if __name__ == '__main__':
    dati = {k: giro(k) for k in FRASI}
    controlla(dati)
    dati['manopola'] = manopola(dati)
    dati['chat'] = giro_chat(dati)
    if '--scrivi' in sys.argv:
        scrivi(dati)
