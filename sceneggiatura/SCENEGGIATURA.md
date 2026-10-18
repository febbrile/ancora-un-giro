# Il pozzo delle parole
### Il viaggio di Emma: sceneggiatura di un cartone animato in quattro episodi

Tratto dalla lezione *Come funziona un LLM: dal testo alla distribuzione di probabilità*.
Bozza 3, 18 ottobre 2026. Sostituisce la bozza 2 (che resta nella storia del repository).

**Cosa cambia rispetto alla bozza 2**
- **Più lento.** I sottotitoli arrivavano a 22–30 caratteri al secondo; ora il massimo è 12 (§3).
- **Niente doppio esperimento iniziale.** Ogni episodio ha un solo viaggio:
  1. il mare;
  2. il parco;
  3. la frase che continua fino alla Fine;
  4. un episodio nuovo sulle migliaia di coordinate.
- **Coordinate senza nome.** Le righe delle carte sono semi neutri (♠ ♥ ♦), nessuna parola è allineata a un asse, e il colore di Emma viene dai vicini.
- **Numeri nuovi**, tutti ricalcolati da [strumenti/numeri.py](../strumenti/numeri.py).
- **Gag della temperatura alta.** «Al parco Emma Bovary» (il ritratto che compare nelle stanze) prende il posto di «stira».

---

## 1. L'idea

**Per il bambino.** Emma cade in un pozzo profondissimo, come Alice. A ogni piano atterra in una stanza diversa, e ogni volta una forza invisibile la porta più giù e le cambia il colore del vestito. In fondo suonano le campane, risale un secchio di palline e una piccola scienziata, Ada, pesca la parola che dice cosa farà Emma. Il giorno dopo Emma rifà il viaggio, ma al parco. Poi la frase continua, un viaggiatore in più a ogni giro, finché nel secchio sale la pallina della Fine.

**Per l'adulto.** Un Transformer giocattolo visto dall'interno: tokenizer, embedding, posizione, attention (prodotto scalare query·key, softmax, media pesata), feed-forward, connessione residua (gli strati *spostano* il vettore), logit lens, ultima riga · U, softmax, temperatura, campionamento, ciclo autoregressivo, EOS, max_tokens. Il quarto episodio spiega perché il modellino ha 3 coordinate e i modelli veri migliaia.

**Formato.** Quattro film Motion da 1920×1080, ognuno sotto i 5 minuti. Due voci in italiano, sottotitoli a scorrimento.

| Episodio | Titolo | Durata | Cuore dell'episodio |
|---|---|---|---|
| 1 | Al mare Emma | 4:46 | Il viaggio intero, una volta, con calma |
| 2 | Al parco Emma | 4:16 | Stessa partenza, contesto diverso, strada diversa |
| 3 | Fino alla Fine | 4:37 | Temperatura, il ciclo, l'ultima riga, EOS, max_tokens |
| 4 | Mille semi | 3:01 | Da 3 coordinate a migliaia |

---

## 2. Due voci, due livelli

| Voce | Chi è | Cosa racconta | Registro |
|---|---|---|---|
| **Narratore** | Voce fuori campo, calda | La fiaba: cosa vede e cosa prova Emma | Lento, immagini, **nessun numero** |
| **Ada** | Piccola scienziata, **fuori dal pozzo**, nel suo laboratorio | L'esperimento: carte, gettoni, probabilità | Curiosa, buffa, ragiona ad alta voce. **Un solo numero per battuta** |

Lo strato adulto vive **sul monitor di Ada**, che si legge nei momenti senza voce. Lo strato fiaba vive **dentro il pozzo**.

**Regola per Ada:** osserva, misura, annota e pesca. Non spinge mai Emma e non tocca niente dentro il pozzo.

---

## 3. Ritmo

- **Sottotitoli: al massimo 12 caratteri al secondo** mentre una voce parla.
- **Monitor: 15 caratteri al secondo**, letto nei momenti senza voce.
- **Almeno 3 secondi di sole immagini** in ogni scena.
- Ogni scena deve rispettare: `durata ≥ parlato/12 + monitor/15 + 3 s`.
  Lo controlla `python3 strumenti/tempi.py`, che legge questa sceneggiatura.
- **Massimo 5 minuti** per episodio.
- I sottotitoli scorrono a pezzi di 18–48 caratteri. Un pezzo non finisce mai su un articolo, una preposizione o una congiunzione.

---

## 4. Grammatica visiva

| Elemento | Codifica visiva | Perché |
|---|---|---|
| **Parametri** (armadio E, lenti, ingranaggi, campane U) | Pietra e metallo blu-ardesia, nelle pareti del pozzo. Non si muovono mai da soli | Fissi dopo l'addestramento |
| **Calcoli del momento** (carte nuove, gettoni, quote) | Luce, colore, bagliori | Nascono e muoiono a ogni frase |
| **Il vettore di un token** | La sua **carta**: tre semi ♠ ♥ ♦, un valore per seme, i negativi in rosso | Le righe non hanno un nome |
| **Il colore di Emma** | Il vestito prende il colore **delle parole a cui somiglia** | Il significato sta nelle direzioni, non nelle singole righe |
| **Le stanze** | Arredate con le parole più vicine a Emma in quel momento | Logit lens |
| **Uno strato che sposta** | Posa «tirata via»: una forza invisibile tira Emma, capelli e vestito restano indietro | `x = x + Δ` |
| **Il confine del modello** | Il bordo del pozzo | Tokenizer e campionamento stanno fuori |
| **Il monitor di Ada** | Verde menta su petrolio; mappa con tre assi segnati ♠ ♥ ♦, senza altri nomi | Lo spazio del modellino |

### Il prodotto scalare è una partita a carte
Due carte sul tavolo. Seme per seme i valori escono, si incontrano al centro e si moltiplicano in una **pastiglia**: dorata se positiva, grigia se negativa. Le pastiglie si sommano in un **gettone**. Lo stesso gesto serve due volte: nella Sala degli Sguardi (lanterna contro cartello) e in fondo al pozzo (Emma contro ogni campana).

### Colori del vestito (calcolati da `numeri.py`)

| Momento | Carta di Emma | Colore |
|---|---|---|
| Uscita dall'armadio (uguale nei due viaggi) | ♠ 0.55 ♥ 0.07 ♦ −0.58 | `#bc937f` rosa antico |
| Al mare, piano 1 | ♠ 0.11 ♥ 0.50 ♦ −0.72 | `#728ebe` azzurro polvere |
| Al mare, piano 2 | ♠ −0.82 ♥ 1.11 ♦ −0.50 | `#306edd` azzurro |
| Al mare, fondo | ♠ −2.47 ♥ 2.19 ♦ 0.14 | `#2864dc` **blu mare** |
| Al parco, piano 1 | ♠ 0.73 ♥ 0.49 ♦ −0.14 | `#67a96f` verde salvia |
| Al parco, piano 2 | ♠ 0.58 ♥ 1.09 ♦ 0.81 | `#2fad57` verde |
| Al parco, fondo | ♠ 0.07 ♥ 2.15 ♦ 2.51 | `#28aa50` **verde prato** |

---

## 5. Il modellino

Numeri **giocattolo**: inventati solo dove è scritto «inventati», tutto il resto è calcolato. L'unica fonte è [strumenti/numeri.py](../strumenti/numeri.py).

**Carte dell'armadio (tabella E), inventate:**
```
Al     ♠ −0.14  ♥ 0.14  ♦  0.15
mare   ♠ −0.35  ♥ 0.61  ♦ −0.40
parco  ♠  0.43  ♥ 0.59  ♦  0.33
Emma   ♠  0.55  ♥ 0.07  ♦ −0.58
```

**Campane (righe di U), 14 parole, inventate:**
```
Bovary      ♠  0.39 ♥  0.29 ♦ −0.51     e         ♠  0.63 ♥ −0.06 ♦ −0.41
onde        ♠ −0.25 ♥  0.51 ♦ −0.61     foglie    ♠  0.56 ♥  0.50 ♦  0.19
sabbia      ♠ −0.04 ♥  0.58 ♦ −0.51     altalena  ♠  0.51 ♥  0.62 ♦  0.04
conchiglie  ♠ −0.15 ♥  0.54 ♦ −0.60     scivolo   ♠  0.50 ♥  0.53 ♦  0.04
nuota       ♠ −0.80 ♥  0.60 ♦ −0.05     corre     ♠  0.08 ♥  0.59 ♦  0.77
gioca       ♠ −0.36 ♥  0.67 ♦  0.38     felice    ♠ −0.31 ♥ −0.43 ♦ −1.10
.           ♠  0.88 ♥ −0.76 ♦ −0.02     Fine      ♠ −0.67 ♥ −0.78 ♦  0.69
```

**Piano 1, la partita a carte.**
- Lanterna di Emma (inventata): ♠ 0.90 ♥ 0.20 ♦ −0.50. È la stessa nei due viaggi, perché Emma parte uguale.
- Cartelli e gettoni:

| Cartello | ♠ | ♥ | ♦ | Pastiglie | Gettone |
|---|---|---|---|---|---|
| Mare | 1.00 | −0.30 | −1.02 | 0.90 − 0.06 + 0.51 | **1.35** |
| Parco | 0.55 | 1.25 | −1.20 | 0.50 + 0.25 + 0.60 | **1.35** |
| Al | −0.40 | 0.30 | 0.60 | −0.36 + 0.06 − 0.30 | −0.60 |
| Emma | 0.20 | 0.20 | 0.24 | 0.18 + 0.04 − 0.12 | 0.10 |

- Quote (softmax): Al 0.1 · Mare/Parco 0.7 · Emma 0.2, uguali nei due viaggi.
- Nuova carta = 0.1·Al + 0.7·(Mare o Parco) + 0.2·Emma:
  - al mare **♠ −0.15 ♥ 0.46 ♦ −0.38**;
  - al parco **♠ 0.40 ♥ 0.44 ♦ 0.13**.

Le quote sono uguali, ma le carte da mescolare no: è qui che le strade si separano.

**Spostamenti (ingranaggi, inventati) e posizioni:**
```
              al mare                               al parco
partenza  x0  ♠  0.55 ♥ 0.07 ♦ −0.58               ♠ 0.55 ♥ 0.07 ♦ −0.58
piano 1   Δ1  ♠ −0.44 ♥ 0.43 ♦ −0.14  → x1 ♠  0.11 ♥ 0.50 ♦ −0.72     Δ1 ♠  0.18 ♥ 0.42 ♦ 0.44  → x1 ♠ 0.73 ♥ 0.49 ♦ −0.14
piano 2   Δ2  ♠ −0.93 ♥ 0.61 ♦  0.22  → x2 ♠ −0.82 ♥ 1.11 ♦ −0.50     Δ2 ♠ −0.15 ♥ 0.60 ♦ 0.95  → x2 ♠ 0.58 ♥ 1.09 ♦  0.81
piano 3   Δ3  ♠ −1.65 ♥ 1.08 ♦  0.64  → x3 ♠ −2.47 ♥ 2.19 ♦  0.14     Δ3 ♠ −0.51 ♥ 1.06 ♦ 1.70  → x3 ♠ 0.07 ♥ 2.15 ♦  2.51
```

**Le stanze (logit lens, le prime parole):**

| Piano | Al mare | Al parco |
|---|---|---|
| 0 | e, Bovary | e, Bovary (**identica**) |
| 1 | conchiglie, onde, sabbia | altalena, foglie, scivolo |
| 2 | **nuota**, onde, conchiglie | **corre**, foglie, altalena |
| 3 (fondo) | **nuota**, gioca, onde | **corre**, gioca, foglie |

**Campane e secchio:**

| | Al mare | Al parco |
|---|---|---|
| Campana più forte | nuota: 1.98 + 1.31 − 0.01 = **3.28** | corre: 0.01 + 1.27 + 1.93 = **3.21** |
| Secchio (T = 1) | nuota 45% · gioca 19% · onde 9% · conchiglie 7% | corre 44% · gioca 19% · foglie 9% · altalena 8% |
| Termostato freddo (T = 0) | sempre nuota | sempre corre |
| Termostato caldo (T = 3) | nuota 16% … Bovary 4.8% | corre 17% … **Bovary 4.6%** |

**Episodio 3, i giri successivi.** La riga in fondo a ogni giro è inventata; il secchio è calcolato.
```
Al parco Emma corre ___           felice 46%   .  24%   e 10%
Al parco Emma corre felice ___    .      69%   e  11%
Al parco Emma corre felice. ___   Fine   91%
```

**Episodio 4, la stessa partita con più semi** (un pozzo diverso, carte inventate):
```
3 semi   0.90 − 0.06 + 0.51                 = 1.35
4 semi   0.90 − 0.06 + 0.51 + 0.20          = 1.55
5 semi   0.90 − 0.06 + 0.51 + 0.20 − 0.18   = 1.37
```

---

## 6. Regole scientifiche (non negoziabili)

1. **Il pozzo non decide, non sceglie, non vuole: calcola.**
2. **La scelta avviene fuori dal pozzo**, quando Ada pesca.
3. **Deterministico, variabile, opaco** restano distinti: stessa frase, stesso secchio; la pesca varia; nessuno sa spiegare a parole perché quei numeri funzionano.
4. **Tokenizer e campionamento sono fuori dal modello.**
5. **Dentro il pozzo non ci sono lettere**, solo numeri.
6. **La griglia non si assottiglia**: tutti i viaggiatori cadono insieme fino all'ultimo piano.
7. **Due tipi di pesi**: parametri (pietra, fissi) e quote dello sguardo (luce, del momento).
8. **In uscita si usa solo l'ultima riga**: quella dell'ultimo token arrivato (ep. 3).
9. **L'uscita è una direzione, non una parola.** Emma non diventa «nuota».
10. **EOS è un token come gli altri.** Una frase troncata è opera della forbice esterna.
11. **Le stanze sono letture, non tappe obbligate.**
12. **Le righe delle carte non hanno un nome.** Si segnano con i semi; il significato sta in quanto due carte si somigliano.

**Verbi ammessi per il pozzo:** calcola, sposta, misura, confronta, si accende, indica, mescola.
**Verbi vietati per il pozzo:** decide, sceglie, pensa, capisce, vuole, sa.

---

## 7. Personaggi e luoghi

| Fiaba | Concetto | Aspetto |
|---|---|---|
| **Emma** | Il token «Emma» | Bambina di luce, bionda, capelli mossi fin sopra le spalle, fermaglio a stellina sulla frangia; il vestito ha il colore dei suoi vicini |
| **Al** | Token «Al» | Sassolino tondo e silenzioso |
| **Mare** / **Parco** | Token «mare» / «parco» | Onda con gli occhi / alberello con gli occhi |
| **Corre**, **Felice**, **Punto** *(nuovi, ep. 3)* | I token generati | Una scarpetta da corsa con gli occhi; un piccolo sole sorridente; un sassolino nero lucido. **Da aggiungere alla tela dei personaggi** |
| **Ada** | Chi usa il modello: inferenza, campionamento, logit lens | Piccola scienziata, camice troppo lungo, occhiali tondi, quaderno |
| **Lo Spezzaparole** | Tokenizer | Macchina con una grande forbice, sul bordo del pozzo |
| **Il Grande Armadio** | Tabella E | Cassetti di pietra; da ogni cassetto esce una carta |
| **La toppa sulla schiena** | Posizione | Un numero cucito: 1, 2, 3 (4, 5, 6 nell'ep. 3) |
| **La Sala degli Sguardi** | Attention | Il tavolo da gioco: lanterne e cartelli sono carte |
| **L'ingranaggio e la botola** | Feed-forward e spostamento | Sotto ogni viaggiatore gira un ingranaggio di pietra; poi si apre una botola nel punto dove lo spostamento lo porta |
| **Le stanze** | Logit lens | Stanze sospese, arredate con le parole più vicine |
| **Le campane del fondo** | U | Anello di campane di pietra, una per parola |
| **Il secchio** | Distribuzione | Secchio di vetro con palline colorate, risale con la carrucola |
| **Il termostato** | Temperatura | Manopola sul bancone di Ada, da ghiaccio a fuoco |
| **Fine** | EOS | Pallina scura con un punto bianco |
| **La forbice dell'orologio** | max_tokens | Appesa al muro del laboratorio |
| **Il periscopio** | Logit lens | Tubo di ottone che guarda dentro il pozzo |
| **Il rotolo** *(nuovo, ep. 4)* | Migliaia di coordinate | La carta che si srotola giù per il pozzo |

---

## 8. Sceneggiatura

Formato di ogni scena: **VISIVO** · **NARRATORE** · **ADA** · **MONITOR** · **CONCETTO**. L'intestazione riporta la durata, controllata da `strumenti/tempi.py`.

---

## Episodio 1 · Al mare Emma

### 1.1 · La notte e il laboratorio · 0:18

**VISIVO.** Notte, un prato, il bordo di pietra di un pozzo. Accanto, un laboratorio di legno con la finestra accesa. Ada sale su uno sgabello e batte sulla tastiera: `Al mare Emma▌`. Il cursore lampeggia. Titolo: **«Il pozzo delle parole · Al mare Emma»**.

**NARRATORE.**
> Quando scrivi a un'intelligenza artificiale, la risposta arriva una parola alla volta. E per ogni parola c'è un viaggio.

**MONITOR.**
```
Si genera un token alla volta.
```

**CONCETTO.** Generazione token per token.

---

### 1.2 · Lo Spezzaparole · 0:28

**VISIVO.** Il nastro con la frase entra nello Spezzaparole: *zac, zac*. Escono tre pezzi che prendono vita: Al, Mare, Emma. Ognuno riceve un biglietto con un numero. Sul bordo del pozzo le lettere si staccano dai corpi e restano sul prato.

Gag muta (4 secondi): Ada infila *«precipitevolissimevolmente»* e la forbice la riduce in otto pezzettini che le piovono addosso.

**NARRATORE.**
> Prima di entrare nel pozzo, la frase passa dallo Spezzaparole, che la taglia in pezzi: i token. Le lettere restano fuori, sul prato. Nel pozzo scendono solo numeri.

**MONITOR.**
```
Tokenizer, fuori dal modello: testo → token → numeri
Parole rare = più pezzi
```

**CONCETTO.** Tokenizer esterno; il modello riceve numeri, non lettere.

---

### 1.3 · L'armadio · 0:34

**VISIVO.** Il primo tratto del pozzo è rivestito di cassetti di pietra. I tre scendono, aprono il loro cassetto e ognuno ne tira fuori **una carta**: tre semi ♠ ♥ ♦, un numero per seme. Emma guarda la sua carta e il vestito si accende di un rosa antico. Un ago cuce sulla schiena di ognuno 1, 2, 3.

Stacco sul monitor: tre assi segnati solo ♠ ♥ ♦; compaiono quattro puntini (Al, mare, parco, Emma), ognuno con la sua carta in piccolo. Ada indica Emma.

**NARRATORE.**
> Nel pozzo c'è un grande armadio, con un cassetto per ogni parola. Ognuno prende la sua carta, sempre la stessa, in qualunque frase. E a ognuno si cuce un numero sulla schiena.

**ADA.**
> La carta di Emma ha tre righe. Non hanno un nome: le segno con i semi.

**MONITOR.**
```
Embedding: Emma → ♠ 0.55 ♥ 0.07 ♦ −0.58
+ posizione 1, 2, 3
```

**CONCETTO.** Embedding uguale in ogni frase; posizione; coordinate senza nome.

---

### 1.4 · La caduta · 0:14

**VISIVO.** Il fondo dell'armadio si apre. Emma, Al e Mare cadono tenendosi per mano, in una lunga spirale come Alice. Sotto di loro, piani su piani di stanze sospese.

**NARRATORE.**
> Il fondo dell'armadio si aprì, ed Emma cadde, cadde, cadde, insieme ai suoi compagni.

---

### 1.5 · La partita a carte · 0:45

**VISIVO.** La Sala degli Sguardi: un tavolo verde da gioco. Accanto a ognuno, due lenti di pietra trasformano la sua carta in due carte nuove: una **lanterna** (cosa cerco) e un **cartello** (cosa offro).

Emma mette sul tavolo la lanterna, Mare il cartello. Seme per seme i valori escono, si incontrano al centro e diventano pastiglie: +0.90, −0.06, +0.51. Sul seme ♦ due numeri rossi si scontrano ed esce una pastiglia dorata: la gag del *meno per meno fa più*. Le pastiglie rotolano insieme e diventano un gettone d'oro: **1.35**.

Poi, più veloci e senza parole, le partite con Al (gettone grigio) e con Emma stessa (gettone piccolo).

**NARRATORE.**
> Al primo piano ognuno riceve due carte nuove: una lanterna, che dice cosa cerca, e un cartello, che dice cosa offre. Emma gioca la sua lanterna contro il cartello di Mare.

**ADA.**
> Seme per seme si moltiplica, poi si somma. Meno per meno fa più! Gettone: uno virgola trentacinque.

**MONITOR.**
```
q · k = 0.90 − 0.06 + 0.51 = 1.35
Al −0.60 · Emma 0.10
```

**CONCETTO.** Query e key; prodotto scalare.

---

### 1.6 · La nuova carta · 0:28

**VISIVO.** I tre gettoni crescono, quello d'oro molto più degli altri, e diventano spicchi di una torta: le quote. Con le quote si taglia un pezzo della carta di ognuno; i pezzi si incollano in una **carta nuova** e il vestito di Emma si schiarisce. Sullo sfondo, piccoli, anche Al e Mare fanno lo stesso.

**NARRATORE.**
> I gettoni diventano quote, e la parte più grande va a Mare. Con quelle quote si mescolano le carte, e nasce una carta nuova.

**ADA.**
> Le lenti sono di pietra, sempre uguali. Le quote invece sono nate adesso.

**MONITOR.**
```
softmax → Al 0.1 · Mare 0.7 · Emma 0.2
nuova carta = 0.1·Al + 0.7·Mare + 0.2·Emma
```

**CONCETTO.** Softmax; pesi del momento contro parametri; media pesata.

---

### 1.7 · Sempre più giù · 0:44

**VISIVO.** Una sequenza quasi muta: quattro piani uno sotto l'altro, e la camera scende con i viaggiatori.
- **Il pavimento della Sala.** Sotto ognuno dei tre, dentro il pavimento di pietra, gira un piccolo ingranaggio. Poi si apre una botola: non proprio sotto i piedi, ma un po' più in là, e in un punto diverso per ognuno. Al, Mare ed Emma vengono tirati via, ognuno verso la sua botola (posa «tirata via»), e cadono.
- **Piano 1, la spiaggia strana.** Atterrano insieme: sabbia, onde che escono dalle pareti, conchiglie appese come lampadari, il ritratto di Bovary appeso al nulla. Il vestito di Emma diventa azzurro polvere. Per un attimo la lanterna di Emma si riaccende verso i compagni: gli sguardi, senza carte. Gli ingranaggi girano, tre botole nuove, di nuovo giù.
- **Piano 2, il molo.** Tra onde e conchiglie compare, per la prima volta, un verbo: **nuota**, su un salvagente. Il ritratto è sparito. Vestito azzurro. Sguardi, ingranaggi, botole.
- **Piano 3, il fondo.** Acqua profonda e luminosa: **nuota** grande, **gioca** più piccolo. Vestito blu mare. Qui il pavimento non si apre più.

Nell'angolo, il monitor di Ada disegna la scia di Emma, una freccia per piano. Alla fine la camera si allontana finché si vedono tutti e quattro i piani del nostro pozzo, uno sotto l'altro. Il viaggio ripassa in accelerato, tre volte e sempre più veloce: tre lucine (Al, Mare, Emma) scendono di botola in botola e lasciano tre scie diverse. Nessuna parola.

**NARRATORE.**
> E da lì, giù: un piano dopo l'altro.

**MONITOR.**
```
Ogni piano sposta tutti: x = x + Δ
```

**CONCETTO.**
- Ogni strato rifà gli sguardi (attention).
- Poi, riga per riga, calcola uno spostamento: è il feed-forward, cioè l'ingranaggio.
- Lo spostamento si somma a ciascuno (connessione residua): la botola si apre dove lo porta lo spostamento.
- Vengono spostati tutti, non solo Emma.
- Le stanze sono letture (logit lens).

---

### 1.8 · Le campane del fondo · 0:35

**VISIVO.** Sul fondo arriva solo Emma: Al e Mare restano un gradino più su e la salutano. Un anello di campane di pietra. La forza invisibile la tira verso uno spicchio dell'anello dove ce ne sono parecchie, tutte del mare. Dal vestito parte un'onda di luce che tocca tutte le campane nello stesso istante: *nuota* rintocca forte, *gioca* bene, *onde* piano, le altre quasi mute.

Primo piano sulla campana *nuota*: **la stessa partita a carte**. La carta di Emma contro la carta della campana; le pastiglie 1.98, 1.31, −0.01; il gettone 3.28 vola nella campana, che suona.

**NARRATORE.**
> In fondo al pozzo arrivò solo Emma. Intorno a lei c'era un anello di campane, una per ogni parola. Emma non diventò «nuota»: fu tirata verso le parole del mare.

**ADA.**
> Con ogni campana, la stessa partita a carte. Il gettone più grande è di «nuota»: tre virgola ventotto.

**MONITOR.**
```
Solo l'ultima riga · campane = U
nuota: 1.98 + 1.31 − 0.01 = 3.28
```

**CONCETTO.** Ultima riga · U; il prodotto scalare di nuovo; l'uscita è una direzione.

---

### 1.9 · Il secchio e la pesca · 0:32

**VISIVO.** Il suono delle campane diventa una pioggia di palline in un secchio di vetro: tantissime blu (*nuota*), parecchie turchesi (*gioca*), poche di altri colori. La carrucola gira e il secchio risale fino al bancone di Ada. Una linea tratteggiata sul bancone: *fine del modello*. Ada infila la mano e pesca una pallina blu.

Ultima immagine: Emma che nuota felice tra le onde.

**NARRATORE.**
> Le campane diventarono una pioggia di palline, e un secchio risalì lungo il pozzo. Il pozzo non aveva scelto niente. A pescare è Ada, che sta fuori.

**ADA.**
> Pesco… «nuota». Al mare Emma nuota.

**MONITOR.**
```
softmax: nuota 45% · gioca 19% · onde 9%
Campionamento: fuori dal modello
```

**CONCETTO.** Softmax, distribuzione, campionamento esterno.

---

### 1.10 · Continua · 0:08

**VISIVO.** Ada gira pagina sul quaderno e scrive: *Al parco Emma…* Cartello: **Continua**.

**ADA.**
> E se invece fosse al parco?

---

## Episodio 2 · Al parco Emma

### 2.1 · Il quaderno di Ada · 0:20

**VISIVO.** Il laboratorio di giorno. Sul quaderno, la pagina di ieri: *Al mare Emma nuota*, con un disegno della scia blu. Ada gira pagina e scrive: `Al parco Emma▌`. Lo Spezzaparole fa *zac, zac*: questa volta escono Al, **Parco** (un alberello con gli occhi) ed Emma.

**ADA.**
> Ieri: «Al mare Emma nuota». Oggi cambio una parola sola.

**NARRATORE.**
> Stessa bambina, stesso pozzo. Solo una parola diversa.

---

### 2.2 · La stessa carta · 0:26

**VISIVO.** Emma apre lo stesso cassetto di ieri. Esce la stessa carta. Ada la confronta con quella di ieri, attaccata al quaderno: le sovrappone in controluce. Timbro: **IDENTICA**.

Sul monitor, i quattro puntini di ieri: Emma è nello stesso punto.

**NARRATORE.**
> Emma aprì lo stesso cassetto di ieri, e ricevette la stessa carta. Identica.

**ADA.**
> L'armadio non sa ancora dove si trova Emma. Lo scoprirà solo guardando i compagni.

**MONITOR.**
```
Embedding: uguale in ogni frase
Emma → ♠ 0.55 ♥ 0.07 ♦ −0.58
```

**CONCETTO.** L'embedding non dipende dal contesto.

---

### 2.3 · Il periscopio · 0:26

**VISIVO.** La caduta, più breve di ieri. Emma atterra nella stanza dei ritratti: il più grande è Bovary, su un tavolino c'è una grande «e» di legno. Stacco: Ada mette l'occhio nel periscopio d'ottone.

**NARRATORE.**
> Cadde in una stanza piena di ritratti.

**ADA.**
> Il mio periscopio non mostra dov'è Emma: mostra cosa direbbe il pozzo se finisse qui. «Al parco Emma… Bovary». Come il romanzo!

**MONITOR.**
```
Periscopio = logit lens
Piano 0: e · Bovary  (uguale a ieri)
```

**CONCETTO.** Logit lens; prima degli strati il contesto non c'è.

---

### 2.4 · La partita con Parco · 0:36

**VISIVO.** Il tavolo da gioco. Emma alza **la stessa lanterna di ieri**. Davanti, il cartello di Parco. Seme per seme: +0.50, +0.25, +0.60. Gettone: 1.35. Ada mette accanto il gettone di ieri: **uguali**.

Poi le quote, uguali a ieri. Ma quando si mescolano le carte, al posto della carta di Mare c'è quella di Parco: la nuova carta è diversa.

**NARRATORE.**
> Al primo piano, Emma alzò la stessa lanterna di ieri. Ma questa volta, davanti, c'era il cartello di Parco.

**ADA.**
> Stesso gettone di ieri: uno virgola trentacinque. Ma nelle carte da mescolare c'è Parco al posto di Mare.

**MONITOR.**
```
0.50 + 0.25 + 0.60 = 1.35
nuova carta = 0.1·Al + 0.7·Parco + 0.2·Emma
```

**CONCETTO.** Quote uguali, valori diversi: la media pesata porta dentro il contesto.

---

### 2.5 · Un'altra strada · 0:22

**VISIVO.** Gli ingranaggi girano e si aprono le botole: questa volta quella di Emma si apre **dall'altra parte**, e la forza invisibile la tira lì; anche Al e Parco cadono nelle loro. Il vestito passa da rosa antico a verde salvia. Sul monitor, in trasparenza, la scia blu di ieri; il puntino di oggi parte dallo stesso punto e va altrove.

**NARRATORE.**
> La nuova carta era diversa, e la forza invisibile tirò Emma da un'altra parte.

**ADA.**
> Da qui le due strade si separano.

**MONITOR.**
```
x1 = ♠ 0.73 ♥ 0.49 ♦ −0.14   (ieri: ♠ 0.11 ♥ 0.50 ♦ −0.72)
```

**CONCETTO.** Stesso punto di partenza, spostamento diverso.

---

### 2.6 · Le stanze del parco · 0:36

**VISIVO.**
- **Piano 1.** Un prato dentro una stanza: foglie che cadono dal soffitto, un'altalena, uno scivolo. Il ritratto di Bovary appeso a un ramo.
- **Piano 2.** Compare **corre**, scritto su una scarpetta da corsa.
- **Piano 3.** **corre** grande, **gioca** più piccolo. Il vestito è verde prato.

Al e Parco cadono sempre con Emma.

**NARRATORE.**
> Questa volta le stanze erano un prato: foglie che cadevano dal soffitto, un'altalena, uno scivolo. E il ritratto, appeso a un ramo.

**ADA.**
> Periscopio: altalena, foglie, scivolo. Poi compare un verbo: «corre».

**NARRATORE.**
> E il vestito di Emma diventò verde, come un prato.

**MONITOR.**
```
Le stanze sono letture, non tappe obbligate.
```

**CONCETTO.** Letture intermedie diverse; il residuo porta con sé il passato (il ritratto).

---

### 2.7 · Le campane · 0:26

**VISIVO.** Sul fondo arriva solo Emma. Le stesse campane di ieri, ferme, di pietra. L'onda di luce le tocca tutte: questa volta rintocca forte *corre*. Primo piano: la partita a carte con la campana *corre*, pastiglie 0.01, 1.27, 1.93, gettone 3.21. Anche *gioca* suona bene, come ieri.

**NARRATORE.**
> In fondo, le campane suonarono di nuovo. Ma questa volta la più forte era un'altra.

**ADA.**
> «Corre»: tre virgola ventuno. E «gioca» suona ancora: si gioca al mare e al parco.

**MONITOR.**
```
corre: 0.01 + 1.27 + 1.93 = 3.21
```

**CONCETTO.** Stessa U, vettore diverso, logit diversi.

---

### 2.8 · Il secchio e la pesca · 0:22

**VISIVO.** Pioggia di palline, quasi tutte verdi. Il secchio risale. Ada pesca: una pallina verde. Emma corre sul prato.

**NARRATORE.**
> Risalì un secchio pieno di palline verdi.

**ADA.**
> «Corre», quarantaquattro per cento. Pesco… «corre». Al parco Emma corre.

**MONITOR.**
```
corre 44% · gioca 19% · foglie 9%
```

---

### 2.9 · Due cieli · 0:32

**VISIVO.** Il monitor si espande fino a riempire lo schermo e diventa un cielo notturno con tre assi appena accennati (♠ ♥ ♦). Una sola stella di partenza, rosa antico: Emma. Da lì partono **due scie**: una piega verso le stelle blu (*nuota*, *onde*, *conchiglie*), l'altra verso quelle verdi (*corre*, *foglie*, *altalena*). Tra le due brilla *gioca*. La camera ruota lentamente, senza parole, per dieci secondi.

**NARRATORE.**
> Stessa bambina, stesso pozzo, stesse pietre. È bastata una parola sola per portare Emma in due cieli diversi.

**ADA.**
> Il punto di partenza è lo stesso. È il contesto che sposta.

**MONITOR.**
```
Embedding: uguale. Dopo gli strati: dipende da tutta la frase.
```

**CONCETTO.** Il vettore dopo gli strati dipende dal contesto.

---

### 2.10 · Continua · 0:10

**VISIVO.** Ada guarda la pallina *corre* sul bancone. La pallina si muove da sola. Cartello: **Continua**.

**ADA.**
> E dopo «corre», cosa viene?

---

## Episodio 3 · Fino alla Fine

### 3.1 · Il termostato · 0:36

**VISIVO.** Il secchio del parco è ancora sul bancone. Ada gira la manopola del termostato.
- **Ghiaccio** (T = 0): Ada non pesca nemmeno, prende la pallina più numerosa. *corre, corre, corre*.
- **Fuoco** (T = 3): le palline si pareggiano. Ada pesca… una pallina color corallo: **Bovary**. A schermo: *«Al parco Emma Bovary.»* Emma, con un abito dell'Ottocento e un cappellino, passeggia impettita tra le altalene. (Gag.)
- Termostato a metà (T = 1).

**NARRATORE.**
> Sul bancone di Ada c'è una manopola: il termostato. Non tocca il pozzo. Cambia solo il modo di pescare.

**ADA.**
> Freddo: vince sempre la pallina più numerosa. Caldo: le palline si somigliano… e pesco «Bovary»! Questa è un'altra storia.

**MONITOR.**
```
p = softmax(logit / T)
T = 0 → sempre corre · T = 3 → Bovary 4.6%
```

**CONCETTO.** La temperatura agisce sul campionamento, fuori dal modello.

---

### 3.2 · Stesso secchio, pesca diversa · 0:24

**VISIVO.** Ada rimanda giù la stessa frase: risale un secchio identico, timbro **IDENTICO**. Poi pesca due volte da due secchi identici: *corre*, poi *gioca*. Timbro **DIVERSO**.

**ADA.**
> Stessa frase, stesso secchio: sempre. Ma se pesco due volte, posso tirare fuori palline diverse.

**NARRATORE.**
> Per questo la stessa domanda può avere risposte diverse.

**MONITOR.**
```
Deterministico: il secchio. Variabile: la pesca.
```

---

### 3.3 · Un viaggiatore in più · 0:30

**VISIVO.** La pallina *corre* prende vita: diventa **Corre**, una scarpetta da corsa con gli occhi. Torna allo Spezzaparole, si mette in fila dopo Emma, riceve la sua carta dall'armadio e il numero 4 sulla schiena. Ora a cadere nel pozzo sono in quattro. Montaggio veloce dei piani, senza parole.

**NARRATORE.**
> La pallina pescata prese vita, tornò dallo Spezzaparole e si mise in fila. Ora a cadere nel pozzo erano in quattro.

**ADA.**
> Stesso pozzo, stesse pietre. Solo una riga in più.

**MONITOR.**
```
Token scelto → aggiunto al testo → di nuovo nel modello
```

**CONCETTO.** Ciclo autoregressivo; parametri invariati.

---

### 3.4 · L'ultimo della fila · 0:30

**VISIVO.** Sul fondo, questa volta, davanti alle campane arriva **Corre**. Emma resta un gradino più su con Al e Parco e lo saluta. Le campane suonano per lui: forte *felice*, bene il *punto*. Il secchio risale; Ada pesca una pallina gialla.

**NARRATORE.**
> Questa volta in fondo non arrivò Emma, ma Corre, l'ultimo arrivato. Le campane suonano sempre per l'ultimo della fila.

**ADA.**
> «Felice»: quarantasei per cento. Pesco… «felice».

**MONITOR.**
```
Si usa l'ultima riga: quella dell'ultimo token
```

**CONCETTO.** In uscita conta solo l'ultima posizione.

---

### 3.5 · Ancora un giro · 0:22

**VISIVO.** **Felice**, un piccolo sole sorridente, si mette in fila: sono in cinque. Caduta veloce. In fondo arriva Felice; le campane suonano; nel secchio sale una pallina nera lucida. Ada la pesca: **Punto**.

**NARRATORE.**
> E poi un altro giro, con un viaggiatore in più. In fondo arrivò Felice, e dal secchio uscì un puntino.

**MONITOR.**
```
Al parco Emma corre felice ___ → «.» 69%
```

---

### 3.6 · La pallina della Fine · 0:32

**VISIVO.** Ultimo giro: sono in sei, Punto è l'ultimo della fila. Nel secchio che risale c'è quasi solo una pallina scura con un punto bianco: **Fine**. Ada la pesca, la guarda, sorride e spegne la lampada del pozzo.

**NARRATORE.**
> All'ultimo giro, nel secchio salì una pallina speciale: Fine. Non è un ordine. È una pallina come le altre, che il pozzo ha imparato a mettere nel secchio quando una frase è finita.

**ADA.**
> Fine. Spengo la lampada.

**MONITOR.**
```
EOS: un token come gli altri. Il codice lo riconosce e si ferma.
```

**CONCETTO.** EOS previsto dal modello; il codice di inferenza si ferma.

---

### 3.7 · La forbice dell'orologio · 0:20

**VISIVO.** Inserto: su un'altra pagina scorre una frase, *«Al parco Emma corre felice e poi va verso l'alta—»*, e la forbice appesa all'orologio la taglia. Biglietto: *è stata la forbice, non il pozzo*.

**ADA.**
> E se una frase si interrompe a metà? È la mia forbice: un limite di parole. Il pozzo non c'entra.

**MONITOR.**
```
max_tokens: un limite esterno.
```

---

### 3.8 · La frase intera · 0:20

**VISIVO.** Il quaderno di Ada, in primo piano: *Al parco Emma corre felice.* Dal disegno sul quaderno Emma prende vita e corre sul prato, ridendo, con Corre e Felice. Nessuna parola per gli ultimi dieci secondi.

**NARRATORE.**
> Una parola alla volta, un viaggio alla volta. Così è nata una frase intera.

---

### 3.9 · Il pozzo è fatto di numeri · 0:30

**VISIVO.** Ada si affaccia al pozzo spento con una torcia. Le pareti diventano trasparenti: colonne di numeri, l'armadio in alto, gli ingranaggi in mezzo, le campane sul fondo. I numeri sono **fermi**. Ada passa la lente su una parete: si leggono uno per uno, ma non formano nessuna frase.

**NARRATORE.**
> Il pozzo non pensa e non sogna. È fatto solo di numeri, sistemati uno per uno durante un lunghissimo allenamento.

**ADA.**
> Posso seguire ogni conto. Ma perché proprio questi numeri funzionano… nessuno lo sa ancora dire a parole.

**CONCETTO.** Modello = parametri; ogni conto è tracciabile, il «perché» no.

---

### 3.10 · Riepilogo · 0:25

**VISIVO.** Solo il monitor, a tutto schermo, una riga alla volta. Nessuna voce.

**MONITOR.**
```
1. Tokenizer: testo → numeri                  (fuori)
2. Modello: numeri → secchio                  (deterministico)
   carte → sguardi + ingranaggi, x = x + Δ → ultima riga · U → softmax
3. Pesca con il termostato                    (fuori)
4. La parola torna in fila → di nuovo al 2
5. Stop: Fine (EOS) oppure la forbice
```

---

### 3.11 · Continua · 0:08

**VISIVO.** Ada rigira tra le mani la carta di Emma e conta i semi sulle dita. Cartello: **Continua**.

**ADA.**
> Ma perché solo tre semi?

---

## Episodio 4 · Mille semi

### 4.1 · La domanda · 0:18

**VISIVO.** Notte. Ada alla scrivania con la carta di Emma sotto la lampada. Fuori, il pozzo spento.

**NARRATORE.**
> Una notte Ada si fece una domanda. La carta di Emma ha tre semi. E se ne avesse di più?

---

### 4.2 · Tre semi, tre direzioni · 0:22

**VISIVO.** Ada disegna sul quaderno tre frecce che partono da un punto: ♠, ♥, ♦. Prende la carta di Emma e cammina sulle frecce: un po' su ♠, quasi niente su ♥, indietro su ♦. Lì disegna una stellina: Emma.

**ADA.**
> Con tre semi posso disegnare Emma: tre direzioni, un punto.

**NARRATORE.**
> Ogni seme è una direzione. La carta dice di quanto andare in ognuna.

---

### 4.3 · Il quarto seme · 0:34

**VISIVO.** Ada apre lo sportello di un secondo pozzo, più profondo. Le carte di qui hanno **quattro** semi: ♠ ♥ ♦ ♣. Ada prova a disegnare la quarta freccia: non sa dove metterla. Gira il foglio, lo inclina, lo capovolge; la freccia esce dal bordo e finisce sul tavolo. (Gag.)

Poi Ada mette due carte da quattro semi sul tavolo da gioco: quattro pastiglie, un gettone, **1.55**.

**ADA.**
> Un pozzo con quattro semi. Il quarto asse… dove lo metto? Non c'è posto.

**NARRATORE.**
> Il disegno non bastava più. Ma la partita a carte funzionava ancora: un seme in più, una pastiglia in più.

**MONITOR.**
```
0.90 − 0.06 + 0.51 + 0.20 = 1.55
```

**CONCETTO.** Oltre tre coordinate non si disegna; il prodotto scalare funziona in qualsiasi numero di coordinate.

---

### 4.4 · Il quinto seme · 0:20

**VISIVO.** Un terzo pozzo: carte con un seme in più, una piccola luna ☾. Ada non prova nemmeno a disegnare: gioca subito. Cinque pastiglie, una grigia; gettone **1.37**.

**ADA.**
> Cinque semi. Disegnare, impossibile. Giocare, facilissimo.

**MONITOR.**
```
… + 0.20 − 0.18 = 1.37
```

---

### 4.5 · L'etichetta dei pozzi veri · 0:45

**VISIVO.** Ada si avvicina a un pozzo enorme, che scende oltre il buio. Sul bordo, una targhetta d'ottone: **4.096 semi**. La carta di Emma comincia ad allungarsi: semi su semi, sempre più piccoli, finché diventa un **rotolo** che si srotola giù per il pozzo ed esce dall'inquadratura. La camera lo segue per dieci secondi, in silenzio; dal rotolo piovono pastiglie che si raccolgono in un unico gettone luminoso.

**NARRATORE.**
> Poi Ada lesse l'etichetta di un pozzo vero. C'era scritto: quattromilanovantasei semi.

**ADA.**
> Nessuno può disegnarlo. Ma la partita si gioca allo stesso modo: seme per seme, a ogni piano, per ogni parola.

**MONITOR.**
```
Modelli veri: migliaia di coordinate (per esempio 4.096)
```

**CONCETTO.** Dimensione dei modelli reali; si dichiara, non si disegna.

---

### 4.6 · Le righe senza nome · 0:26

**VISIVO.** Ada srotola un pezzo del rotolo sul tavolo: i semi non hanno nomi, solo simboli sempre diversi. Accanto mette due carte che si somigliano molto, Mare e Onde: le loro pastiglie sono quasi tutte dorate.

**ADA.**
> Che cosa vuol dire ogni seme? Preso da solo, nessuno lo sa. Conta quanto due carte si somigliano.

**NARRATORE.**
> Le parole del mare hanno carte simili. Per questo stanno vicine.

**CONCETTO.** Il significato è distribuito; la somiglianza è il prodotto scalare.

---

### 4.7 · Tre semi o mille · 0:16

**VISIVO.** Il cielo dell'episodio 2, con le due scie. Emma corre lungo la scia verde e si volta a salutare. Dissolvenza sul titolo.

**NARRATORE.**
> Tre semi o migliaia, il viaggio di Emma è sempre lo stesso.

---

## 9. Mappa scena → lezione

| Scene | Concetto | Domande di verifica della lezione |
|---|---|---|
| 1.1 | Generazione token per token | — |
| 1.2 | Tokenizer, indici | 7, 8 |
| 1.3, 2.2 | Embedding, posizione, embedding uguale in ogni frase | 9, 10 |
| 2.3, 1.7 | Logit lens, letture intermedie | 11, 12 |
| 1.5, 1.6, 2.4 | Attention, query/key, prodotto scalare, softmax, pesi del momento | 15, 16 |
| 1.7, 2.5 | Feed-forward (ingranaggi), residuo (botole), tutti si spostano | 15 |
| 1.8, 2.7 | Ultima riga, U, direzione | 13, 14, 17 |
| 1.9, 2.8 | Softmax, distribuzione, campionamento | 4 |
| 3.1, 3.2 | Temperatura, determinismo | 3, 5 |
| 2.9 | Contesto | 9, 10 |
| 3.3–3.7 | Ciclo, ultima riga, EOS, max_tokens | 6, 12 |
| 3.9 | Modello = numeri, opacità | 1, 2 |
| 4.x | Dimensioni, significato distribuito | — |

---

## 10. Note di coerenza scientifica

1. **Connessione residua.** Lo strato calcola uno spostamento e lo somma (`x = x + Δ`): per questo il verbo è «spostare».
2. **Logit lens.** Tecnica reale e approssimativa; le letture dei primi strati sono strane (il ritratto di Bovary che resta appeso) e si chiariscono verso il fondo.
3. **Assi senza nome.** Nei modelli veri una singola coordinata di solito non ha un significato leggibile. Il modellino è stato costruito ruotando tutti i vettori (vedi `strumenti/progetto_numeri/`): le partite a carte e le campane danno gli stessi risultati in qualsiasi orientamento, ed è questo che l'episodio 4 racconta.
4. **Wv omessa** nella media pesata, come nella lezione.
5. **Dati inventati e dichiarati:** E, le righe di U, le lanterne e i cartelli, gli spostamenti Δ, le righe finali dei giri dell'ep. 3, le carte dell'ep. 4. Tutto il resto è calcolato.
6. **Ep. 3, i giri successivi.** Il film mostra solo la riga finale di ogni giro e il suo secchio; il percorso dei nuovi viaggiatori nei piani non è calcolato.
7. **Il vocabolario giocattolo** ha 14 parole; i modelli veri tra 30.000 e 200.000.
8. **Tutti si spostano.** Ogni strato calcola uno spostamento per ogni posizione, non solo per l'ultima: per questo a ogni piano si aprono tre botole e cadono tutti. Gli spostamenti di Al e Mare non sono mostrati come numeri.

---

## 11. Produzione

- **Cosa si riusa** dai film attuali: personaggi, laboratorio, Spezzaparole, armadio, caduta, tavolo da gioco, carte, gettoni, stanze, campane, secchio, pesca, cielo, sottotitoli a scorrimento.
- **Cosa cambia ovunque:**
  - i semi delle carte (♠ ♥ ♦ al posto di goccia, foglia e stella);
  - le etichette del monitor (niente acqua, verde, nome);
  - tutti i numeri;
  - i colori del vestito (§4);
  - le durate di tutte le scene.
- **Cosa è nuovo:**
  - Corre, Felice e Punto (vanno aggiunti alla tela dei personaggi);
  - la discesa a botole con gli ingranaggi (al posto della cabina);
  - la gag di Bovary;
  - l'episodio 4 intero: frecce sul quaderno, il quarto asse che non ci sta, il rotolo.
- **Ordine di lavoro proposto:**
  1. personaggi nuovi sulla tela;
  2. episodio 1;
  3. episodio 2;
  4. episodio 3;
  5. episodio 4.

---

## 12. Domande aperte

1. **Titoli** degli episodi 3 e 4: «Fino alla Fine» e «Mille semi» vanno bene?
2. **La frase dell'episodio 3**: «Al parco Emma corre felice.» ti piace, o vuoi una frase più lunga? Ogni parola in più costa circa 20 secondi.
3. **Gag della temperatura**: «Al parco Emma Bovary» con Emma in abito dell'Ottocento.
4. **Voci**: per ora sono solo sottotitoli. Vuoi voci registrate o sintetiche?
