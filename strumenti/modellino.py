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


# ── Episodio 5 · Chi ha costruito la pista: i treni di prova ──────────────────────────────────────────
# Prima che il parco aprisse la pista era dritta: dentro la montagna i fili non portavano niente e gli scambi non
# spostavano nessuno. Ogni notte passavano i treni di prova, carichi di frasi vere con la parola dopo già scritta
# sulla striscia; a ogni passaggio la pista si piegava un pochino, nella direzione che fa cadere più paperelle di
# quella parola (discesa lungo l'errore sulla parola dopo). Poi la pista è stata fissata: è quella di sempre.
#
# Semplificazione dichiarata: nel modellino la pista si piega lungo una sola strada, con due misure che vanno da 0
# (pista dritta) a 1 (la pista di oggi): quanto è piegata (quanto portano i fili, quanto spostano gli scambi con la
# loro parte fissa, e con loro gli spostamenti dichiarati di Al e del vagone di mezzo) e quanto spinge il vagone che
# passa (FORZA_SCAMBI). Biglietti, paperelle e colori non si piegano. Con due misure la pista di oggi è l'unica che
# dà le vasche di oggi: la discesa ci arriva da sola, senza conoscerla. (Con più misure ci sono tante piste diverse
# che danno le stesse vasche: anche questo è vero, ma qui non serve.)
# Inventati: la pista dritta di partenza, le frasi di prova (per ogni inizio, quanto spesso arriva ogni parola
# dopo: proprio la vasca di oggi), il passo di ogni notte (PASSO_NOTTE) e i momenti da raccontare (NUOTA_RACCONTATE).
# Calcolati: la piega di ogni notte, il brivido di ogni treno, le vasche e le finestre di ogni momento.

PIEGA_DRITTA = (0.0, 0.0)
PIEGA_DI_OGGI = (1.0, 1.0)
PASSO_NOTTE = 0.02
NOTTI_MASSIME = 2000
# I momenti che l'episodio racconta, per «Al mare Emma»: la prima notte in cui nella vasca ci sono almeno tante
# paperelle «nuota» (la prima e l'ultima sono la pista dritta e la pista di oggi). A metà strada la vasca passa per
# notti strane, con molte paperelle scure «Fine»: sono vere, ma l'episodio non le racconta (la «Fine» è dell'episodio 7).
NUOTA_RACCONTATE = (13, 16)


def tappe_piegate(frase, piega, arrotonda=True):
    """Il vestito di Emma dopo ogni tratto, sulla pista piegata così (0 dritta, 1 oggi)."""
    pa, pb = piega
    R = r2 if arrotonda else list
    sguardi = [round(dot(Q_EMMA, K[t]), 2) for t in frase]
    fili = dict(zip(frase, [round(q, 1) for q in softmax(sguardi)]))
    fili_tratti = [fili] + [dict(zip(frase, f)) for f in FILI_EMMA_TRATTI[1:]]
    altri = {}
    for t in frase[:-1]:
        x, tt = B[t], [B[t]]
        for d in S[t]:
            x = R([a + pa * b for a, b in zip(x, d)])
            tt.append(x)
        altri[t] = tt
    x, tappe = B['Emma'], []
    for k, f in enumerate(fili_tratti):
        vestiti = {**{t: altri[t][k] for t in altri}, 'Emma': x}
        porta = R([pa * sum(f[t] * vestiti[t][i] for t in frase) for i in range(3)])
        y = R([a + b for a, b in zip(x, porta)])
        spinta = [pb * FORZA_SCAMBI * sum(max(0.0, dot(y, P[w])) * P[w][i] for w in P) for i in range(3)]
        d = R([pa * SCAMBI_FISSI[k][i] + spinta[i] for i in range(3)])
        x = R([a + b for a, b in zip(y, d)])
        tappe.append(x)
    return tappe


def log_p(x):
    lg = [dot(x, P[w]) for w in P]
    m = max(lg)
    lse = m + math.log(sum(math.exp(v - m) for v in lg))
    return {w: v - lse for w, v in zip(P, lg)}


def gradiente(f, piega, e=1e-6):
    g = []
    for i in range(len(piega)):
        su, giu = list(piega), list(piega)
        su[i] += e
        giu[i] -= e
        g.append((f(su) - f(giu)) / (2 * e))
    return g


def momento(piega):
    """Il treno di prova «Al mare Emma» su questa pista: vestiti di Emma, finestre e vasca."""
    tappe = tappe_piegate(FRASI['mare'][0], piega)
    finestre = [[[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in vasca(v)[1].items()] for v in tappe]
    return {'piega': [round(p, 3) for p in piega], 'tratti': [colore(v) for v in tappe],
            'finestre': finestre, 'vasca': finestre[-1]}


def addestramento(dati):
    print('\n== I treni di prova (episodio 5) ==')
    inizi = {k: FRASI[k][0] for k in FRASI}
    # Le frasi di prova: per ogni inizio, quanto spesso arriva ogni parola dopo (la vasca di oggi).
    prova = {k: {w: math.exp(v) for w, v in log_p(tappe_piegate(f, PIEGA_DI_OGGI, False)[-1]).items()}
             for k, f in inizi.items()}

    def errore(piega):
        return -sum(q * log_p(tappe_piegate(inizi[k], piega, False)[-1])[w]
                    for k in inizi for w, q in prova[k].items()) / len(inizi)

    def brivido(piega, parola='nuota'):
        """Quanto forte parte il brivido dalla vasca dopo un treno «Al mare Emma» con quella parola sulla striscia:
        quanto mancava perché cadessero tutte di quel colore (1 meno la probabilità della parola)."""
        return 1 - math.exp(log_p(tappe_piegate(inizi['mare'], piega, False)[-1])[parola])

    def piega_della_notte(piega):
        """Di quanto si piega la pista in una notte intera, con tutti i treni di prova."""
        g = gradiente(errore, piega)
        return PASSO_NOTTE * math.sqrt(dot(g, g))

    piega, notte, momenti = list(PIEGA_DRITTA), 0, []
    da_raccontare = list(NUOTA_RACCONTATE)
    m = momento(piega)
    momenti.append({'notte': 0, **m})
    while notte < NOTTI_MASSIME and max(abs(p - 1) for p in piega) > 1e-5:
        g = gradiente(errore, piega)
        piega = [p - PASSO_NOTTE * gi for p, gi in zip(piega, g)]
        notte += 1
        if da_raccontare:
            m = momento(piega)
            nuota = dict((w, c) for w, c, _ in m['vasca']).get('nuota', 0)
            if nuota >= da_raccontare[0]:
                momenti.append({'notte': notte, **m})
                da_raccontare.pop(0)
    assert max(abs(p - 1) for p in piega) <= 1e-5, f'la pista non arriva a quella di oggi: {piega}'
    assert not da_raccontare, 'un momento da raccontare non arriva mai'
    # Poi la pista si fissa: le sue misure si fermano al millesimo (come gli altri numeri del modellino, che si
    # fermano al centesimo), ed è proprio la pista di oggi.
    fissata = tuple(round(p, 3) for p in piega)
    assert fissata == PIEGA_DI_OGGI, fissata
    momenti.append({'notte': notte, **momento(fissata)})

    # La pista fissata è quella di sempre: stessi vestiti, stesse finestre, stesse vasche degli episodi 1 e 2.
    oggi = momento(PIEGA_DI_OGGI)
    assert momenti[-1]['vasca'] == oggi['vasca'] == dati['mare']['vasca']
    assert momenti[-1]['finestre'] == oggi['finestre'] == dati['mare']['passeggeri']['Emma']['finestre']
    assert oggi['tratti'] == dati['mare']['passeggeri']['Emma']['tratti']
    for k in inizi:
        conta = vasca(tappe_piegate(inizi[k], fissata)[-1])[1]
        assert [[w, c] for w, c in conta.items()] == [[w, c] for w, c, _ in dati[k]['vasca']], k
    # Sulla pista dritta Emma esce del colore del suo biglietto, e le tre finestre sono uguali.
    dritta = momenti[0]
    assert dritta['tratti'] == [colore(B['Emma'])] * 3
    assert dritta['finestre'][0] == dritta['finestre'][1] == dritta['finestre'][2]
    # Il brivido di un treno «nuota» parte grande quando le paperelle blu sono poche, e diventa sempre più piccolo;
    # non si spegne mai del tutto, perché altri treni portano «gioca» o «onde» e tirano dall'altra parte.
    # Quello che si spegne è la piega di tutta la notte: alla fine i brividi si pareggiano e la pista sta ferma.
    for mo in momenti:
        mo['brivido'] = round(brivido(mo['piega']), 2)
        mo['piega_notte'] = round(piega_della_notte(mo['piega']), 4)
    assert all(a['brivido'] > b['brivido'] > 0 for a, b in zip(momenti, momenti[1:])), [mo['brivido'] for mo in momenti]
    assert momenti[-1]['piega_notte'] < 1e-3 * max(mo['piega_notte'] for mo in momenti)
    # Oggi la pista non si piega più: lo stesso treno, mille volte, dà sempre la stessa vasca.
    assert all(momento(PIEGA_DI_OGGI)['vasca'] == oggi['vasca'] for _ in range(3))

    for mo in momenti:
        conta = {w: c for w, c, _ in mo['vasca']}
        print(f"  notte {mo['notte']:4d}  piega {mo['piega']}  brivido {mo['brivido']:.2f}  "
              f"piega della notte {mo['piega_notte']:.4f}  Emma {mo['tratti']}")
        print('             vasca', conta)
    print('  finestre della pista dritta:', {w: c for w, c, _ in dritta['finestre'][0]})
    return {'momenti': momenti}


# ── Episodio 6 · Lo Spezzaparole: «Al mare Zampirù» ───────────────────────────────────────────────────
# Zampirù è il nome che un bambino ha inventato. Lo Spezzaparole non ha un biglietto per la parola intera:
# la taglia nei pezzi per cui ha un biglietto, e la parola sale in tre vagoni.
#
# Inventati e dichiarati qui: i tagli dello Spezzaparole (TAGLI), i biglietti dei tre pezzi, gli sguardi di «rù»
# (Q_RU e le key dei pezzi), i fili dei pezzi davanti e quelli di «rù» nei tratti 2 e 3, gli spostamenti di «Zam»
# e «pi». Calcolati: i fili di «rù» nel primo tratto, quello che i fili gli portano, gli scambi (gli stessi di
# sempre, con scambio()), i colori, le finestre e la vasca. Al e Mare sono uguali a «Al mare Emma»: guardano
# solo avanti, e davanti a loro c'è la stessa cosa. Le paperelle (P) sono quelle di sempre.

# Lo Spezzaparole: le parole di tutti i giorni hanno un biglietto intero; le altre si tagliano nei pezzi che ha.
TAGLI = {
    'Al': ['Al'], 'mare': ['mare'], 'Emma': ['Emma'], 'parco': ['parco'], 'gelato': ['gelato'],
    'Zampirù': ['Zam', 'pi', 'rù'],
    'precipitevolissimevolmente': ['pre', 'cipit', 'evol', 'issim', 'evol', 'mente'],
}
FRASE_ZAMPIRU = ['Al', 'mare', 'Zampirù']
PESCA_ZAMPIRU = 'nuota'

# I biglietti dei tre pezzi: «Zam» giallo, «pi» corallo, «rù» grigio argento, un colore che non somiglia a niente.
B_PEZZI = {
    'Zam': [-0.20, -0.25, -0.75],
    'pi':  [1.00, 0.10, -0.80],
    'rù':  [-0.50, 0.20, -0.60],
}
# Gli sguardi di «rù», l'ultimo vagone, nel primo tratto: query · key, poi softmax (come per Emma).
Q_RU = [0.50, -0.50, -0.50]
K_PEZZI = {'Zam': [0.70, -1.40, -0.90], 'pi': [1.40, -1.20, -1.10], 'rù': [0.40, -0.20, -0.30]}
# I fili di «Zam» e «pi» (dichiarati): i pezzi guardano soprattutto il pezzo che hanno davanti.
FILI_PEZZI = {
    'Zam': {'Al': 0.2, 'mare': 0.3, 'Zam': 0.5},
    'pi':  {'Al': 0.0, 'mare': 0.2, 'Zam': 0.5, 'pi': 0.3},
}
# Nei tratti 2 e 3 i fili di «rù» vanno soprattutto a Mare (Al, Mare, Zam, pi, rù).
FILI_RU_TRATTI = [None, (0.1, 0.6, 0.1, 0.1, 0.1), (0.1, 0.6, 0.1, 0.1, 0.1)]
# Gli spostamenti dei tre tratti di «Zam» e «pi».
S_PEZZI = {
    'Zam': [[-0.06, 0.08, 0.02], [-0.08, 0.10, 0.04], [-0.10, 0.12, 0.05]],
    'pi':  [[-0.10, 0.06, 0.05], [-0.12, 0.10, 0.08], [-0.15, 0.12, 0.10]],
}


def giro_zampiru(dati):
    pezzi = [p for w in FRASE_ZAMPIRU for p in TAGLI[w]]
    print(f'\n== {" ".join(FRASE_ZAMPIRU)} ==  (sul treno: {" · ".join(pezzi)})')
    for w in ('gelato', 'Zampirù', 'precipitevolissimevolmente'):
        print(f'  lo Spezzaparole: «{w}» →', ' · '.join(TAGLI[w]))
    biglietti = {**B, **B_PEZZI}
    spost = {**S, **S_PEZZI}
    ultimo = pezzi[-1]

    def tappe(t):
        x, tt = biglietti[t], [biglietti[t]]
        for d in spost[t]:
            x = somma(x, d)
            tt.append(x)
        return tt

    # I fili di «rù» nel primo tratto, calcolati; nei tratti 2 e 3, dichiarati.
    chiavi = {**K, **K_PEZZI}
    sguardi = {t: round(dot(Q_RU, chiavi[t]), 2) for t in pezzi}
    fili = dict(zip(pezzi, [round(q, 1) for q in softmax(list(sguardi.values()))]))
    assert abs(sum(fili.values()) - 1) < 1e-9, fili
    print('  sguardi di «rù»', sguardi, '→ fili', fili)
    fili_tratti = [fili] + [dict(zip(pezzi, f)) for f in FILI_RU_TRATTI[1:]]
    for f in fili_tratti:
        assert abs(sum(f.values()) - 1) < 1e-9, f

    # «rù», tratto per tratto: i fili gli portano la media pesata dei vestiti di chi guarda, poi scatta lo scambio.
    altri = {t: tappe(t) for t in pezzi[:-1]}
    x, tt = biglietti[ultimo], [biglietti[ultimo]]
    for k, f in enumerate(fili_tratti):
        vestiti = {**{t: altri[t][k] for t in altri}, ultimo: x}
        porta = r2([sum(f[t] * vestiti[t][i] for t in pezzi) for i in range(3)])
        y = somma(x, porta)
        if k == 0:
            dopo_fili = y
        x = somma(y, scambio(k, y))
        tt.append(x)

    out = {'frase': FRASE_ZAMPIRU, 'pezzi': pezzi, 'tagli': {w: TAGLI[w] for w in TAGLI}, 'passeggeri': {}}
    for t in pezzi:
        if t == ultimo:
            info = {'biglietto': colore(biglietti[t]), 'tratti': [colore(v) for v in tt[1:]], 'fili': fili,
                    'fili_tratti': fili_tratti, 'dopo_fili': colore(dopo_fili), 'finestre': []}
            print(f'  {t:5}: biglietto', info['biglietto'], '→ dopo i fili', info['dopo_fili'], '→ tratti', info['tratti'])
            for k, v in enumerate(tt[1:]):
                conta_k = vasca(v)[1]
                info['finestre'].append([[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta_k.items()])
                print(f'         finestra {k + 1}', conta_k)
            p, conta = vasca(tt[-1])
            assert sum(conta.values()) == PAPERELLE_IN_VASCA
            out['vasca'] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
            assert info['finestre'][-1] == out['vasca'], 'l\'ultima finestra deve essere uguale alla vasca'
            out['probabilita'] = {w: round(p[w], 3) for w in sorted(p, key=lambda w: -p[w])[:5]}
            print('  vasca', conta)
            print('  probabilità', out['probabilita'])
        else:
            info = {'biglietto': colore(biglietti[t]), 'tratti': [colore(v) for v in altri[t][1:]],
                    'fili': FILI_DICHIARATI.get(t) or FILI_PEZZI[t]}
            print(f'  {t:5}: biglietto', info['biglietto'], '→ tratti', info['tratti'])
        out['passeggeri'][t] = info
    out['nuovo'] = {PESCA_ZAMPIRU: colore(B[PESCA_ZAMPIRU])}
    print(f'  passeggero nuovo «{PESCA_ZAMPIRU}»:', out['nuovo'][PESCA_ZAMPIRU])

    # Le cose che la storia dà per vere.
    # Le parole di tutti i giorni salgono intere, quelle mai viste a pezzi; lo stesso pezzo è sempre lo stesso biglietto.
    assert all(len(TAGLI[w]) == 1 for w in ('Al', 'mare', 'Emma', 'gelato'))
    assert len(TAGLI['Zampirù']) == 3 and len(TAGLI['precipitevolissimevolmente']) > 3
    assert ''.join(TAGLI['Zampirù']) == 'Zampirù' and ''.join(TAGLI['precipitevolissimevolmente']) == 'precipitevolissimevolmente'
    # Al e Mare sono identici a «Al mare Emma»: guardano solo avanti.
    for t in ('Al', 'mare'):
        assert out['passeggeri'][t]['biglietto'] == dati['mare']['passeggeri'][t]['biglietto']
        assert out['passeggeri'][t]['tratti'] == dati['mare']['passeggeri'][t]['tratti']
    # I tre pezzi salgono con tre vestiti diversi; «rù» non somiglia ancora a niente.
    assert len({out['passeggeri'][t]['biglietto'] for t in TAGLI['Zampirù']}) == 3
    assert max(vasca(B_PEZZI['rù'])[1].values()) <= 5
    # Nel primo tratto il filo più forte di «rù» va a «pi», poi a «Zam»: i fili legano i pezzi della parola.
    assert max(fili, key=fili.get) == 'pi' and fili['Zam'] > fili['mare']
    # Dopo il primo tratto «rù» ha il giallo di «Zam»: alla prima finestra vince la stessa parola del biglietto di «Zam».
    assert next(iter(vasca(tt[1])[1])) == next(iter(vasca(B_PEZZI['Zam'])[1])) == 'felice'
    # All'uscita la vasca è quella di un nome al mare: vince «nuota», e la «Fine» resta rara.
    v = dict((w, c) for w, c, _ in out['vasca'])
    assert out['vasca'][0][0] == PESCA_ZAMPIRU == 'nuota' and v.get('Fine', 0) <= 1
    return out


# ── Episodio 7 · Come finisce la storia ─────────────────────────────────────────────────────────────
# La risposta a «Al mare Emma», giro dopo giro: «nuota e gioca.», poi la paperella Fine.
# Il primo giro è «Al mare Emma» di sempre. A ogni giro la paperella pescata sale nell'ultimo vagone.
# All'ultimo giro il treno ha sette vagoni: riempie la banchina dell'episodio 4, e nessun biglietto resta giù.
#
# Inventati e dichiarati: i biglietti delle parole nuove (B_FINE) e gli spostamenti dei tre tratti di ogni passeggero
# nuovo (S_FINE), come per Al e Mare. Calcolati: i vestiti, le finestre e la vasca di ogni giro.
# Si guarda sempre avanti: chi siede davanti non sa chi gli siederà dietro, quindi un passeggero ha gli stessi colori
# in tutti i giri, da quando sale. In ogni giro cambia solo l'ultimo vagone, ed è lui a riempire la vasca.
# La paperella Fine è una paperella come le altre (P['Fine'], il colore della notte): nessuno la mette nella vasca,
# ci cade come le altre, tante o poche a seconda di dove passa l'ultimo vagone.

# I biglietti delle parole nuove (le altre sono in B).
B_FINE = {
    'e':      [0.50, -0.05, -0.33],
    '.':      [0.70, -0.61, -0.02],
}
# Gli spostamenti dei tre tratti (fili di luce + scambi) di ogni passeggero nuovo.
S_FINE = {
    'nuota':  [[0.46, -0.22, -0.31], [0.54, -0.27, -0.35], [0.54, -0.26, -0.36]],
    'e':      [[-0.67, 0.76, 0.71], [-0.79, 0.89, 0.82], [-0.79, 0.89, 0.83]],
    'gioca':  [[0.15, -0.70, -0.41], [0.72, -1.41, 0.24], [0.44, -0.68, 0.54]],
    '.':      [[-0.44, -0.35, 0.32], [-0.52, -0.41, 0.38], [-0.51, -0.41, 0.37]],
}
# Le paperelle che Ada pesca, una per giro.
PESCATE_FINE = ['nuota', 'e', 'gioca', '.', 'Fine']


def finisce(dati):
    """I giri della risposta, fino alla paperella Fine."""
    print('\n== Al mare Emma nuota e gioca. (episodio 7) ==')
    biglietti = {**B, **B_FINE}
    out = {'storia': PESCATE_FINE, 'passeggeri': {}, 'giri': []}
    # Il primo giro è quello di sempre: Emma nell'ultimo vagone.
    mare = dati['mare']
    out['giri'].append({'ultimo': 'Emma', 'finestre': mare['passeggeri']['Emma']['finestre'],
                        'vasca': mare['vasca'], 'pescata': PESCATE_FINE[0]})
    print('  giro 1 · ultimo Emma  → vasca', dict((w, c) for w, c, _ in mare['vasca']))
    for n, (ultimo, pescata) in enumerate(zip(PESCATE_FINE, PESCATE_FINE[1:]), start=2):
        x, tappe = biglietti[ultimo], []
        for d in S_FINE[ultimo]:
            x = somma(x, d)
            tappe.append(x)
        out['passeggeri'][ultimo] = {'biglietto': colore(biglietti[ultimo]), 'tratti': [colore(v) for v in tappe]}
        finestre = [[[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in vasca(v)[1].items()] for v in tappe]
        g = {'ultimo': ultimo, 'finestre': finestre, 'vasca': finestre[-1], 'pescata': pescata}
        out['giri'].append(g)
        conta = dict((w, c) for w, c, _ in g['vasca'])
        print(f'  giro {n} · ultimo «{ultimo}»: biglietto', out['passeggeri'][ultimo]['biglietto'],
              '→ tratti', out['passeggeri'][ultimo]['tratti'])
        for k, f in enumerate(finestre[:-1]):
            print(f'        finestra {k + 1}', dict((w, c) for w, c, _ in f))
        print('        vasca', conta, '→ Ada pesca', f'«{pescata}»')
    return out


def controlla_finisce(fine):
    """Le cose che l'episodio 7 dà per vere."""
    vasche = [dict((w, c) for w, c, _ in g['vasca']) for g in fine['giri']]
    fini = [v.get('Fine', 0) for v in vasche]
    print('  paperelle Fine giro dopo giro:', fini)
    # La paperella Fine c'è sempre stata, rara: in ogni vasca ce n'è almeno una.
    assert all(f >= 1 for f in fini), fini
    # Nei primi tre giri è una sola; poi, quando la frase si completa, ne cadono sempre di più.
    assert fini[:3] == [1, 1, 1] and fini[2] < fini[3] < fini[4], fini
    # All'ultimo giro è la paperella più numerosa, ma non l'unica.
    assert list(vasche[-1])[0] == 'Fine' and len(vasche[-1]) > 1
    # Ogni paperella pescata è tra le più numerose della sua vasca: niente di forzato.
    for v, g in zip(vasche, fine['giri']):
        assert v[g['pescata']] == max(v.values()), (g['pescata'], v)
    # Dove Ada pesca il punto, le paperelle Fine sono già di più, ma non abbastanza da uscire per forza.
    assert vasche[3]['.'] > vasche[3]['Fine'] > 1
    # Il treno non supera mai la banchina: all'ultimo giro (Al, Mare, Emma e i passeggeri nuovi) la riempie.
    assert 3 + len(fine['passeggeri']) == BANCHINA, len(fine['passeggeri'])
    # All'ultimo giro, finestra dopo finestra, le paperelle Fine di luce aumentano.
    f_fin = [dict((w, c) for w, c, _ in f).get('Fine', 0) for f in fine['giri'][-1]['finestre']]
    assert f_fin == sorted(f_fin) and f_fin[0] < f_fin[-1], f_fin
    # Il passeggero «nuota» ha il vestito della paperella pescata nel prologo.
    assert fine['passeggeri']['nuota']['biglietto'] == colore(B['nuota'])


# ── Episodio 8 · La paperella sbagliata ──────────────────────────────────────────────────────────────
# «Il cane di Emma si chiama»: una domanda su un cane che non c'è. Nessun treno di prova ha mai portato il cane di
# Emma, ma dopo «si chiama» ha portato tanti nomi di cani: la pista porta lì, e la vasca si riempie lo stesso.
# Le paperelle sono probabilità, e le probabilità fanno sempre uno: la vasca non resta mai vuota.
#
# I nomi da cane sono paperelle come le altre. Nel modellino entrano solo per questa frase: con 14 parole in tutto,
# ogni parola in più sposta un poco le altre. Nelle frasi già girate cambierebbe di un capello il vestito di Al, che
# sta vicino al centro dove tutti i colori si mescolano, e nella vasca del mare, che sta sul filo dell'arrotondamento,
# una paperella passerebbe da «onde» a «felice». Il controllo qui sotto verifica le cose che contano: nel mondo con i
# nomi Emma fa lo stesso viaggio, con gli stessi colori, e nelle vasche del mare e del parco non cade nessun nome.
# Inventati: i nomi e i loro colori, i biglietti dei passeggeri nuovi, i fili di luce dichiarati, gli spostamenti dei
# primi cinque passeggeri, la paperella pescata.
# Calcolati: i fili di «chiama» nel primo tratto, gli scambi di «chiama» (la stessa pista di sempre, `scambio()`),
# i colori dei vestiti, le finestre, la vasca.
NOMI = {
    'Briciola': [0.40, -0.80, 0.85], 'Fido':    [0.39, -0.81, 0.85], 'Pallino':  [0.41, -0.79, 0.85],
    'Birba':    [0.39, -0.80, 0.84], 'Macchia': [0.40, -0.82, 0.83], 'Biscotto': [0.38, -0.80, 0.84],
}
COLORE_NOMI = {
    'Briciola': (214, 150, 92), 'Fido': (176, 118, 76), 'Pallino': (232, 182, 96),
    'Birba': (204, 128, 104), 'Macchia': (158, 112, 84), 'Biscotto': (226, 162, 118),
}
B_CANE = {
    'Il':     [0.10, -0.05, 0.05],
    'cane':   [0.55, -0.45, 0.45],
    'di':     [0.05, 0.02, -0.05],
    'si':     [0.00, -0.15, 0.20],
    'chiama': [-0.10, 0.40, -0.45],
    'Briciola': [0.36, -0.70, 0.78],  # il biglietto della paperella pescata, quando sale sul treno
}
FRASE_CANE = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama']
# I fili di «chiama», l'ultimo vagone, nel primo tratto: query · key con chi gli siede davanti e con sé stesso.
Q_CHIAMA = [0.90, -0.60, 0.80]
K_CANE = {'Il': [-0.60, 0.20, -0.40], 'cane': [1.10, -0.70, 1.00], 'di': [-0.60, 0.30, -0.40],
          'Emma': K['Emma'], 'si': [0.20, -0.10, 0.30], 'chiama': [0.80, -0.60, 0.70]}
# Nei tratti 2 e 3 i fili di «chiama» sono dichiarati, nell'ordine della frase.
FILI_CHIAMA_TRATTI = [None, (0.0, 0.4, 0.0, 0.1, 0.1, 0.4), (0.0, 0.3, 0.0, 0.1, 0.1, 0.5)]
# I fili degli altri passeggeri (si guarda sempre avanti) e i loro spostamenti nei tre tratti.
FILI_CANE = {
    'Il':   {'Il': 1.0},
    'cane': {'Il': 0.4, 'cane': 0.6},
    'di':   {'Il': 0.1, 'cane': 0.6, 'di': 0.3},
    'Emma': {'Il': 0.1, 'cane': 0.2, 'di': 0.2, 'Emma': 0.5},
    'si':   {'Il': 0.1, 'cane': 0.3, 'di': 0.0, 'Emma': 0.2, 'si': 0.4},
}
S_CANE = {
    'Il':   [[0.02, -0.02, 0.02], [0.03, -0.03, 0.03], [0.03, -0.04, 0.04]],
    'cane': [[0.05, -0.06, 0.05], [0.06, -0.08, 0.07], [0.08, -0.10, 0.08]],
    'di':   [[0.06, -0.06, 0.08], [0.08, -0.08, 0.10], [0.10, -0.10, 0.12]],
    'Emma': [[0.04, -0.05, 0.08], [0.06, -0.08, 0.12], [0.08, -0.10, 0.15]],
    'si':   [[0.06, -0.08, 0.08], [0.08, -0.10, 0.12], [0.10, -0.14, 0.14]],
}
PESCA_CANE = 'Briciola'


def con_i_nomi(f):
    """Esegue f nel mondo in cui i nomi da cane sono tra le paperelle, poi rimette le paperelle com'erano."""
    for w in NOMI:
        assert w not in P, w
    for t, v in B_CANE.items():
        assert B.get(t, v) == v, t
    prima_p, prima_c = dict(P), dict(COLORE)
    P.update(NOMI)
    COLORE.update(COLORE_NOMI)
    try:
        return f()
    finally:
        P.clear()
        P.update(prima_p)
        COLORE.clear()
        COLORE.update(prima_c)


def giro_cane(dati):
    """Il giro di «Il cane di Emma si chiama»."""
    import contextlib
    import io

    def calcola():
        # Nel mondo con i nomi Emma fa lo stesso viaggio (gli scambi non la spingono verso nessun nome, che le sta
        # sempre lontano) e nelle vasche del mare e del parco non cade nessun nome.
        with contextlib.redirect_stdout(io.StringIO()):
            rifatti = {k: giro(k) for k in FRASI}
        for k in FRASI:
            assert not any(w in NOMI for w, _, _ in rifatti[k]['vasca']), k
            for campo in ('biglietto', 'dopo_fili', 'tratti'):
                assert rifatti[k]['passeggeri']['Emma'][campo] == dati[k]['passeggeri']['Emma'][campo], (k, campo)

        frase = FRASE_CANE
        print(f'\n== {" ".join(frase)} ==')
        bigl = {t: B_CANE.get(t, B.get(t)) for t in frase}
        ultimo = frase[-1]
        sguardi = {t: round(dot(Q_CHIAMA, K_CANE[t]), 2) for t in frase}
        fili = dict(zip(frase, [round(q, 1) for q in softmax(list(sguardi.values()))]))
        assert abs(sum(fili.values()) - 1) < 1e-9, fili
        print('  sguardi di «chiama»', sguardi, '→ fili', fili)
        fili_tratti = [fili] + [dict(zip(frase, f)) for f in FILI_CHIAMA_TRATTI[1:]]
        for f in fili_tratti:
            assert abs(sum(f.values()) - 1) < 1e-9, f
        # Si guarda sempre avanti: i fili dichiarati vanno solo a chi siede davanti, o a sé stessi.
        for t, f in FILI_CANE.items():
            assert set(f) <= set(frase[:frase.index(t) + 1]) and abs(sum(f.values()) - 1) < 1e-9, t

        altri = {}
        for t in frase[:-1]:
            x, tappe = bigl[t], [bigl[t]]
            for d in S_CANE[t]:
                x = somma(x, d)
                tappe.append(x)
            altri[t] = tappe
        x, tappe = bigl[ultimo], [bigl[ultimo]]
        for k, f in enumerate(fili_tratti):
            vestiti = {**{t: altri[t][k] for t in altri}, ultimo: x}
            porta = r2([sum(f[t] * vestiti[t][i] for t in frase) for i in range(3)])
            y = somma(x, porta)
            if k == 0:
                dopo_fili = y
            x = somma(y, scambio(k, y))
            tappe.append(x)

        out = {'frase': frase, 'passeggeri': {}}
        for t in frase[:-1]:
            out['passeggeri'][t] = {'biglietto': colore(bigl[t]), 'tratti': [colore(v) for v in altri[t][1:]],
                                    'fili': FILI_CANE[t]}
            print(f'  {t:6}: biglietto', out['passeggeri'][t]['biglietto'], '→ tratti', out['passeggeri'][t]['tratti'])
        info = {'biglietto': colore(bigl[ultimo]), 'tratti': [colore(v) for v in tappe[1:]], 'fili': fili,
                'fili_tratti': fili_tratti, 'dopo_fili': colore(dopo_fili), 'finestre': []}
        print('  chiama: biglietto', info['biglietto'], '→ dopo i fili', info['dopo_fili'], '→ tratti', info['tratti'])
        for k, v in enumerate(tappe[1:]):
            conta_k = vasca(v)[1]
            info['finestre'].append([[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta_k.items()])
            print(f'        finestra {k + 1}', conta_k)
        out['passeggeri'][ultimo] = info
        p, conta = vasca(tappe[-1])
        out['vasca'] = [[w, c, '#%02x%02x%02x' % COLORE[w]] for w, c in conta.items()]
        out['probabilita'] = {w: round(p[w], 3) for w in sorted(p, key=lambda w: -p[w])[:8]}
        print('  vasca', conta)
        print('  probabilità', out['probabilita'])
        out['pesca'] = PESCA_CANE
        out['nuovo'] = {PESCA_CANE: colore(B_CANE[PESCA_CANE])}
        print(f'  passeggero nuovo «{PESCA_CANE}»:', out['nuovo'][PESCA_CANE])

        # Le cose che la storia dà per vere.
        # Emma sale con il vestito di sempre.
        assert out['passeggeri']['Emma']['biglietto'] == dati['mare']['passeggeri']['Emma']['biglietto']
        # Il filo più forte di «chiama» va a Cane.
        assert max(fili, key=fili.get) == 'cane'
        # La vasca si riempie lo stesso: tutte le paperelle, come sempre, quasi tutte nomi da cane.
        assert sum(conta.values()) == PAPERELLE_IN_VASCA
        assert sum(c for w, c in conta.items() if w in NOMI) >= 0.8 * PAPERELLE_IN_VASCA
        # Nessun nome è molto più forte degli altri: i nomi sono almeno cinque e il primo non arriva a un quarto.
        assert sum(1 for w in conta if w in NOMI) >= 5 and max(conta.values()) <= PAPERELLE_IN_VASCA / 4
        # La prima finestra è di tutti i colori; l'ultima è uguale alla vasca.
        assert max(c for _, c, _ in info['finestre'][0]) <= 5
        assert info['finestre'][-1] == out['vasca']
        # La paperella pescata c'è davvero nella vasca.
        assert conta.get(PESCA_CANE, 0) > 0
        return out

    return con_i_nomi(calcola)


# ── Episodio 9 · Il parco più grande del mondo ────────────────────────────────────────────────────────
#
# Il parco immenso non si calcola con il nostro modellino: è il ritratto di un modello vero, che nessuno sa scrivere
# a mano. Qui si dichiarano come inventati i suoi colori e il suo lago (quante paperelle cadono di ogni parola dopo
# «Al mare Emma»); da quelli si calcolano le paperelle di luce delle finestre e i vestiti di Emma, con le stesse
# regole del parco di Ada: il vestito prende il colore delle parole a cui somiglia (T_COLORE), e le finestre sono
# la vasca che si avrebbe se il treno uscisse lì.
#
# Ogni parco ha i suoi colori: laggiù lo stesso pezzo sale con un altro vestito, e le paperelle della stessa parola
# hanno un altro colore. Le parole del mare sono viola, quelle del parco arancio.

# Il colore delle parole nel parco grande (inventato). Le parole della coda, che nel nostro modellino non ci sono,
# prendono una tinta ciascuna, girando di un angolo d'oro intorno alla ruota dei colori.
G_COLORE = {
    'nuota': (130, 70, 210), 'onde': (150, 100, 220), 'conchiglie': (165, 115, 215), 'sabbia': (180, 135, 210),
    'corre': (235, 130, 40), 'foglie': (230, 150, 60), 'altalena': (240, 165, 85), 'scivolo': (225, 140, 70),
    'gioca': (220, 90, 160), 'felice': (90, 190, 200), 'Bovary': (120, 180, 90), 'e': (100, 165, 120),
    '.': (172, 162, 140), 'Fine': (40, 62, 72),
}
# Il lago dopo «Al mare Emma» (inventato): la probabilità delle parole che conosciamo. Il resto va alla coda.
G_LAGO = {
    'nuota': 0.40, 'gioca': 0.12, 'onde': 0.05, 'corre': 0.04, 'conchiglie': 0.03, 'sabbia': 0.03,
    'e': 0.02, 'felice': 0.02, 'altalena': 0.01, 'scivolo': 0.01, 'foglie': 0.01,
    'Bovary': 0.005, '.': 0.005, 'Fine': 0.005,
}
# La coda: tantissime altre parole, ognuna poco probabile, sempre meno andando avanti (come 1/(i + G_CODA_PASSO)).
G_CODA, G_CODA_PASSO = 200, 5
# Il lago è grande: dieci volte la vasca di Ada.
G_PAPERELLE = 400
# Le cime della montagna, una per tratto, ognuna con la sua finestra sulla vasca.
G_CIME = 24
# Le finestre: la finestra k mostra il lago «schiacciato» verso il piatto, con forza (k/G_CIME)^2. Per molte cime le
# paperelle di luce restano di tutti i colori; la parola di uscita viene fuori verso la fine. L'ultima è il lago.
G_ESPONENTE_FINESTRE = 2
# I biglietti nel parco grande (inventati), e i vestiti di Al e Mare all'uscita.
G_BIGLIETTI = {'Al': '#c98a6a', 'mare': '#8f6fc4', 'Emma': '#b5b08a'}
G_USCITA = {'Al': '#c4876e', 'mare': '#8a6ccc'}
# I fili di Emma (inventati): il più forte va a Mare, come nel parco di Ada.
G_FILI_EMMA = {'Al': 0.15, 'mare': 0.6, 'Emma': 0.25}
# La paperella che Ada pesca al lago, e che sul telefono diventa «nuota».
G_PESCA = 'nuota'


def g_tinta(i):
    """Il colore della parola i della coda: tinte che girano di un angolo d'oro, chiare e poco sature."""
    h = (i * 137.508) % 360 / 360
    l, s = 0.62, 0.45
    def f(n):
        k = (n + h * 12) % 12
        return l - s * min(l, 1 - l) * max(-1, min(k - 3, 9 - k, 1))
    return tuple(round(255 * f(n)) for n in (0, 8, 4))


def parco_grande():
    print('\n== Il parco più grande del mondo: «Al mare Emma» ==')
    colori = dict(G_COLORE)
    p = dict(G_LAGO)
    resto = 1 - sum(p.values())
    assert resto > 0
    pesi = [1 / (i + G_CODA_PASSO) for i in range(1, G_CODA + 1)]
    for i, w in enumerate(pesi, 1):
        p[f'coda{i}'] = resto * w / sum(pesi)
        colori[f'coda{i}'] = g_tinta(i)
    assert abs(sum(p.values()) - 1) < 1e-9

    def conta(q, n=G_PAPERELLE):
        quote = {w: q[w] * n for w in q}
        c = {w: int(quote[w]) for w in q}
        for w in sorted(q, key=lambda w: -(quote[w] - c[w]))[:n - sum(c.values())]:
            c[w] += 1
        return {w: k for w, k in sorted(c.items(), key=lambda kv: -kv[1]) if k > 0}

    def schiaccia(s, T=1.0):
        """Il lago con forza s (0 = tutte le parole uguali, 1 = il lago vero), alla temperatura T."""
        e = {w: math.exp(s * math.log(p[w]) / T) for w in p}
        z = sum(e.values())
        return {w: e[w] / z for w in e}

    def vestito(s):
        q = schiaccia(s, T_COLORE)
        return '#%02x%02x%02x' % tuple(round(sum(q[w] * colori[w][i] for w in q)) for i in range(3))

    def hex_(w):
        return '#%02x%02x%02x' % colori[w]

    lago = conta(p)
    finestre, emma = [], []
    for k in range(1, G_CIME + 1):
        s = (k / G_CIME) ** G_ESPONENTE_FINESTRE
        c = conta(schiaccia(s))
        finestre.append([[w, n, hex_(w)] for w, n in c.items()])
        emma.append(vestito(s))
        alto = list(c.items())[:3]
        print(f'  finestra {k:2}: {len(c):3} colori, i primi {alto}, Emma {emma[-1]}')
    assert finestre[-1] == [[w, n, hex_(w)] for w, n in lago.items()], 'l\'ultima finestra deve essere uguale al lago'

    # Le cose che la storia dà per vere.
    primo = list(lago)[0]
    assert primo == G_PESCA == 'nuota', primo
    assert sum(lago.values()) == G_PAPERELLE
    # Più colori di quanti se ne possano contare: molti più che nella vasca di Ada.
    assert len(lago) > 3 * len(P), len(lago)
    # Tantissime di un colore, parecchie di un altro, poche di tutti gli altri.
    valori = list(lago.values())
    assert valori[0] > 2 * valori[1] and valori[1] > 2 * valori[2]
    # Per molte cime le finestre restano di tutti i colori: a metà montagna ci sono ancora tutte le parole, e nessuna
    # ha più di una paperella di luce su quaranta.
    meta = finestre[G_CIME // 2 - 1]
    assert len(meta) == len(p) and max(n for _, n, _ in meta) <= G_PAPERELLE // 40
    # Ogni parco ha i suoi colori: nessun vestito né paperella uguale a quelli del parco di Ada, nemmeno la Fine.
    assert all(G_COLORE[w] != COLORE[w] for w in G_COLORE) and G_BIGLIETTI['Emma'] != colore(B['Emma'])

    print('  lago', len(lago), 'colori:', dict(list(lago.items())[:12]), '…')
    print('  Emma: biglietto', G_BIGLIETTI['Emma'], '→ all\'uscita', emma[-1], '; paperella pescata', G_PESCA, hex_(G_PESCA))
    return {
        'frase': ['Al', 'mare', 'Emma'],
        'biglietti': G_BIGLIETTI, 'uscita': {**G_USCITA, 'Emma': emma[-1]},
        'fili_emma': G_FILI_EMMA, 'emma_finestre': emma,
        'finestre': finestre, 'lago': [[w, n, hex_(w)] for w, n in lago.items()],
        'pesca': [G_PESCA, hex_(G_PESCA)],
    }


if __name__ == '__main__':
    dati = {k: giro(k) for k in FRASI}
    controlla(dati)
    dati['manopola'] = manopola(dati)
    dati['chat'] = giro_chat(dati)
    dati['addestramento'] = addestramento(dati)
    dati['zampiru'] = giro_zampiru(dati)  # episodio 6
    dati['finisce'] = finisce(dati)
    controlla_finisce(dati['finisce'])
    dati['cane'] = giro_cane(dati)
    parco_grande()
    if '--scrivi' in sys.argv:
        scrivi(dati)
