# Il pozzo delle parole
### Il viaggio di Emma: sceneggiatura per un cortometraggio animato in Manim (Python)

Tratto dalla lezione *Come funziona un LLM: dal testo alla distribuzione di probabilità*.
Bozza 2, 17 ottobre 2026. Sostituisce la bozza 1 ("Il viaggio di Un").

---

## 1. L'idea

**Per il bambino.** Emma cade in un pozzo profondissimo, come Alice. A ogni piano atterra in una stanza diversa, piena di parole e di oggetti, e ogni volta qualcosa la sposta e la fa cambiare colore. In fondo al pozzo una forza invisibile la tira verso le parole del mare, le campane suonano e un secchio pieno di palline risale in superficie. Lì una piccola scienziata pesca la parola che dice cosa farà Emma. Poi l'esperimento si ripete: questa volta Emma non è al mare, ma al parco, e il viaggio finisce in un posto diverso.

**Per l'adulto.** Un esperimento controllato su un Transformer giocattolo: due frasi che differiscono per una sola parola, *"Al mare Emma…"* e *"Al parco Emma…"*. Lo stesso token parte dallo stesso embedding e finisce in due direzioni diverse. Il film mostra tokenizer, embedding, attention, feed-forward, connessione residua (gli strati *spostano* il vettore), logit lens (cosa "direbbe" il modello a metà strada), prodotto scalare con la matrice di uscita, softmax, temperatura, campionamento, EOS.

**Durata target:** circa 11 minuti (versione completa), 5 minuti (versione corta, §9).
**Formato:** 16:9, 1080p, 30 fps. Due voci in italiano.

---

## 2. Due voci, due livelli

| Voce | Chi è | Cosa racconta | Registro |
|---|---|---|---|
| **Narratore** | Voce fuori campo, calda | La fiaba: cosa vede e cosa prova Emma | Lento, immagini, nessun numero |
| **Ada** | Piccola scienziata, sta **fuori dal pozzo**, nel suo laboratorio | L'esperimento: coordinate, spostamenti, probabilità | Ragiona ad alta voce, curiosa, a volte sbaglia una previsione e si corregge. Buffa anche per un bambino |

Lo strato adulto vive **nel laboratorio di Ada**: un monitor con una mappa 3D, un quaderno di appunti, un periscopio che guarda dentro il pozzo. Lo strato fiaba vive **dentro il pozzo**. Il montaggio alterna i due luoghi, così i due livelli sono separati anche nello spazio.

**Regola per Ada:** osserva, misura, annota e alla fine pesca. **Non spinge mai Emma** e non tocca niente dentro il pozzo. Il pozzo calcola da solo; Ada è il codice che lo usa.

Il codice avrà un interruttore `STRATO_ADULTO`. In versione bambini le battute di Ada si fermano alla prima frase (le parti tra parentesi quadre `[…]` si tagliano) e il monitor resta sullo sfondo.

---

## 3. Grammatica visiva

| Elemento | Codifica visiva | Perché |
|---|---|---|
| **Parametri** (armadio E, lenti Wq/Wk, macchine del feed-forward, campane U) | Pietra e metallo blu-ardesia, nelle pareti del pozzo. Non si muovono mai da soli | Fissi dopo l'addestramento, uguali per ogni frase |
| **Calcoli del momento** (vettori, pesi di attention, logit) | Luce, colore, bagliori | Nascono e muoiono a ogni frase |
| **Il vettore di Emma** | Il colore del suo vestito | Il vettore giocattolo ha 3 numeri, il colore è calcolato da quei 3 numeri |
| **Le stanze** | Scenografia fatta delle parole più vicine a Emma in quel momento | Logit lens: "se il pozzo finisse qui, cosa verrebbe dopo?" |
| **Spostamento di uno strato** | Un colpo di vento, una corrente, uno scivolo: Emma viene spostata nella stanza successiva | Connessione residua: `x = x + Δ` |
| **Confine del modello** | Il bordo del pozzo | Tokenizer e campionamento stanno *fuori* |

### Colori calcolati dai numeri

La mappa del modellino ha tre assi a cui Ada, per comodità, ha dato un nome: **acqua** (x), **verde** (y), **nome di persona / azione** (z, positivo = nome, negativo = azione). Il colore usa la direzione del vettore: rosso = z, verde = y, blu = x.

| Momento | Coordinate | Colore |
|---|---|---|
| Emma all'uscita dall'armadio (uguale nei due viaggi) | [0.05, 0.05, 0.80] | `#fe8787` corallo |
| Al mare, dopo il piano 1 | [0.65, 0.05, 0.60] | `#d586dd` lilla |
| Al mare, dopo il piano 2 | [1.45, 0.10, -0.20] | `#6e88fd` azzurro |
| Al mare, in fondo (piano 3) | [2.75, 0.30, -1.80] | `#398be9` **blu mare** |
| Al parco, dopo il piano 1 | [0.05, 0.65, 0.60] | `#d5dd86` giallo paglia |
| Al parco, dopo il piano 2 | [0.10, 1.45, -0.20] | `#6efd88` verde chiaro |
| Al parco, in fondo (piano 3) | [0.30, 2.75, -1.80] | `#39e98b` **verde prato** |

Emma parte corallo, il colore di un nome di persona. Al mare diventa blu, al parco verde. Un bambino capisce la storia guardando solo il colore.

---

## 4. Il modellino (tutti i numeri del film)

Tutti i numeri sono **giocattolo**: inventati, ma con la forma e i calcoli veri. Sono stati verificati con uno script e andranno in un unico file `dati.py`.

**Frasi:** `Al | mare | Emma` e `Al | parco | Emma` (3 token, come nella lezione).

**Embedding (tabella E):**
```
Al     [ 0.10,  0.10, -0.20]
mare   [ 0.80,  0.05,  0.05]
parco  [ 0.05,  0.80,  0.05]
Emma   [ 0.05,  0.05,  0.80]
```

**Vocabolario giocattolo (righe di U), 12 parole:**
```
Bovary      [ 0.00, -0.10,  0.90]     e          [ 0.10,  0.10,  0.60]
onde        [ 0.80, -0.10,  0.30]     foglie     [-0.10,  0.80,  0.30]
sabbia      [ 0.70,  0.20,  0.30]     altalena   [ 0.20,  0.75,  0.30]
conchiglie  [ 0.75,  0.00,  0.35]     scivolo    [ 0.10,  0.70,  0.35]
nuota       [ 0.80, -0.05, -0.60]     corre      [ 0.00,  0.80, -0.60]
gioca       [ 0.45,  0.45, -0.60]     stira      [-0.60, -0.50, -0.20]
```

**Piano 1, attention sulla riga di Emma** (pesi: Al 0.1, mare/parco 0.7, Emma 0.2):
```
0.1 × Al   [0.10, 0.10, -0.20] = [0.01, 0.01, -0.02]
0.7 × mare [0.80, 0.05,  0.05] = [0.56, 0.04,  0.04]
0.2 × Emma [0.05, 0.05,  0.80] = [0.01, 0.01,  0.16]
                      raccolto = [0.58, 0.06,  0.18]
```
Il feed-forward rielabora il raccolto e produce lo spostamento Δ1.

**Spostamenti e posizioni (al mare):**
```
partenza   x0 = [0.05, 0.05,  0.80]
piano 1    Δ1 = [0.60, 0.00, -0.20]   →  x1 = [0.65, 0.05,  0.60]
piano 2    Δ2 = [0.80, 0.05, -0.80]   →  x2 = [1.45, 0.10, -0.20]
piano 3    Δ3 = [1.30, 0.20, -1.60]   →  x3 = [2.75, 0.30, -1.80]
```
Al parco gli spostamenti sono speculari (x e y scambiati): x3 = [0.30, 2.75, −1.80].

**Le stanze (logit lens: le parole più allineate con Emma a ogni piano):**

| Piano | Al mare | Al parco |
|---|---|---|
| 0 (appena uscita dall'armadio) | Bovary, e | Bovary, e (**identica**) |
| 1 | conchiglie, onde, sabbia, *Bovary ancora lì* | foglie, altalena, scivolo, *Bovary ancora lì* |
| 2 | **nuota**, onde, conchiglie | **corre**, foglie, altalena |
| 3 (fondo) | **nuota**, gioca | **corre**, gioca |

**Logit in fondo al pozzo (al mare):**
```
nuota 3.27   gioca 2.45   onde 1.63   sabbia 1.44   conchiglie 1.43   corre 1.32
altalena 0.23   scivolo −0.14   foglie −0.58   e −0.78   stira −1.44   Bovary −1.65

nuota:  2.75×0.80 + 0.30×(−0.05) + (−1.80)×(−0.60) = 2.20 − 0.01 + 1.08 = 3.27
stira:  2.75×(−0.60) + 0.30×(−0.50) + (−1.80)×(−0.20) = −1.65 − 0.15 + 0.36 = −1.44
```

**Urna (softmax sui 12 logit), al mare:**

| Temperatura | nuota | gioca | onde | sabbia | corre | stira |
|---|---|---|---|---|---|---|
| 0 | sempre nuota | | | | | |
| 0.3 | 93% | 6% | 0.4% | 0.2% | 0.1% | ~0% |
| **1** | **45%** | **20%** | 9% | 7% | 6% | 0.4% |
| 3 | 18% | 14% | 10% | 10% | 9% | 3.7% |

Al parco i valori sono gli stessi con *corre* al posto di *nuota* (45%) e *gioca* sempre al 20%.

---

## 5. Regole scientifiche (non negoziabili)

1. **Il pozzo non decide, non sceglie, non vuole: calcola.** Emma è un personaggio, ma quello che le succede è sempre effetto di lenti, correnti e macchine fisse, mai una sua scelta.
2. **La scelta avviene fuori dal pozzo**, quando Ada pesca. Il pozzo restituisce un secchio di palline, non una parola.
3. **Deterministico, variabile, opaco** restano distinti: stessa frase, stesso secchio; la pesca varia; nessuno sa spiegare a parole perché quei numeri funzionano.
4. **Tokenizer e campionamento sono fuori dal modello.**
5. **Dentro il pozzo non ci sono lettere**, solo numeri.
6. **La griglia non si assottiglia**: Al, Mare ed Emma cadono insieme fino in fondo.
7. **Due tipi di "pesi"**: parametri (pietra, fissi) e pesi di attention (luce, del momento).
8. **In uscita si usa solo l'ultima riga.**
9. **L'uscita è una direzione, non una parola.** Emma non *diventa* "nuota".
10. **EOS è un token come gli altri.** Una frase troncata è opera della forbice esterna.
11. **Le stanze sono letture, non tappe obbligate.** Ada le vede con il periscopio (logit lens). Rispondono alla domanda *"cosa verrebbe dopo se finisse qui?"*, non a *"chi è Emma adesso?"*.
12. **Gli assi con un nome sono una comodità del modellino.** Nei modelli veri una singola coordinata di solito non ha un significato leggibile: il significato sta nelle direzioni.

**Verbi ammessi per il pozzo:** calcola, sposta, misura, confronta, si accende, indica, mescola.
**Verbi vietati per il pozzo:** decide, sceglie, pensa, capisce, vuole, sa.

---

## 6. Personaggi e luoghi

| Fiaba | Concetto | Aspetto |
|---|---|---|
| **Emma** | Il token "Emma", poi la sua riga nella griglia | Una bambina fatta di luce, bionda con i capelli mossi fin sopra le spalle e un fermaglio a stellina sulla frangia, con un vestito il cui colore è il suo vettore. Sopra la testa le fluttua un punto interrogativo: *cosa farà?* |
| **Al** | Token "Al" | Un sassolino tondo e silenzioso |
| **Mare** / **Parco** | Token "mare" / "parco" | Un'onda con gli occhi / un piccolo albero con gli occhi |
| **Ada** | Chi usa il modello: codice di inferenza, campionamento, logit lens | Piccola scienziata con camice troppo lungo, occhiali tondi, quaderno. Laboratorio sul bordo del pozzo |
| **Lo Spezzaparole** | Tokenizer | Una macchina con una grande forbice, sul bordo del pozzo, *fuori* |
| **Il Grande Armadio** | Tabella embedding E | Il primo tratto del pozzo è rivestito di cassetti di pietra numerati |
| **La toppa sulla schiena** | Informazione di posizione | Un numero cucito: 1, 2, 3 |
| **Le stanze** | Letture logit lens del vettore a ogni piano | Stanze sospese nel pozzo, arredate con le parole più vicine |
| **La Sala degli Sguardi** | Attention | Lanterna (query) e cartello (key), prodotti da lenti di pietra fisse |
| **La Cabina** | Feed-forward | Una cabina individuale con una macchina a due ingranaggi e una piega in mezzo |
| **La corrente** | Connessione residua, spostamento Δ | Un soffio o uno scivolo che porta Emma alla stanza successiva |
| **Le campane del fondo** | Matrice di uscita U | Un anello di campane di pietra, una per parola del vocabolario |
| **Il secchio** | Distribuzione (dopo softmax) | Un secchio di vetro pieno di palline colorate che risale con la carrucola |
| **Il termostato** | Temperatura | Una manopola sul bancone di Ada, da ghiaccio a fuoco |
| **Fine** | Token EOS | Una pallina scura con un punto bianco |
| **La forbice dell'orologio** | max_tokens | Appesa al muro del laboratorio |
| **Il periscopio** | Logit lens | Un lungo tubo di ottone con cui Ada guarda dentro il pozzo |
| **Il monitor** | Lo spazio vettoriale | Mappa 3D con tre assi: acqua, verde, nome/azione |

---

## 7. Sceneggiatura

Formato di ogni scena: **VISIVO** · **NARRATORE** · **ADA** · **MONITOR** (testo e numeri a schermo) · **CONCETTO** · **MANIM**.

---

### SCENA 0 — Il laboratorio sul bordo del pozzo (0:00–0:40)

**VISIVO.** Notte, un prato. In mezzo, il bordo di pietra di un pozzo. Accanto, un piccolo laboratorio di legno con una finestra illuminata. Dentro, Ada sale su uno sgabello e batte sulla tastiera: `Al mare Emma▌`. Il cursore lampeggia. Titolo: **"Il pozzo delle parole"**.

**NARRATORE.**
> Quando scrivi a un'intelligenza artificiale, la risposta arriva una parola alla volta. E per ogni parola, dentro la macchina, succede un viaggio. Così piccolo che dura meno di un battito di ciglia.

**ADA.**
> Esperimento numero uno. Frase: "Al mare Emma…". Domanda: cosa viene dopo? [Ipotesi: non ne ho idea. Per questo faccio l'esperimento.]

**MONITOR.** `Ogni risposta si genera un token alla volta.`

**MANIM.** `AddTextLetterByLetter`; cursore = `Rectangle` che lampeggia. Il laboratorio è un insieme di `Polygon` e `RoundedRectangle`, nessuna immagine esterna.

---

### SCENA 1 — Lo Spezzaparole (0:40–1:25) · *schermo diviso*

**VISIVO.** Lo schermo si divide. A sinistra `Al mare Emma`, a destra `Al parco Emma`: Ada ha preparato due frasi. Ogni nastro entra nello Spezzaparole: *zac, zac*. Escono tre pezzi per lato, che prendono vita: Al (sassolino), Mare (onda) / Parco (alberello), **Emma**, due volte, identica.

Gag rapida (solo a sinistra): Ada infila per curiosità "*precipitevolissimevolmente*" e la forbice la riduce in tanti pezzettini che le cadono addosso.

Ognuno riceve un biglietto numerato. Sul bordo del pozzo le lettere si staccano dai corpi e restano sul prato: dentro scendono solo numeri.

**NARRATORE.**
> Prima di entrare nel pozzo le frasi passano dallo Spezzaparole, che le taglia in pezzi chiamati token. Le parole comuni restano intere, quelle rare finiscono in pezzettini.
> E c'è un segreto: nel pozzo le lettere non possono entrare. Restano sul prato. Laggiù esistono solo numeri.

**ADA.**
> Due frasi, una sola parola diversa: mare, parco. Tutto il resto è identico. [In un esperimento si cambia una cosa sola, altrimenti non si capisce cosa ha fatto la differenza.]

**MONITOR.**
```
Tokenizer (fuori dal modello): testo → token → indici
Al → 1204   mare → 8812   parco → 15530   Emma → 22741   (indici inventati)
Parole rare = più token. Il modello riceve indici, non lettere.
```

**CONCETTO.** Tokenizer esterno; il modello non vede lettere; esperimento con una sola variabile.

**MANIM.** Due `VGroup` gemelli in due metà dello schermo; una funzione `costruisci_scena(contesto)` usata due volte, così il lato destro è sempre il gemello esatto del sinistro.

---

### SCENA 2 — Il Grande Armadio (1:25–2:10) · *schermo diviso*

**VISIVO.** Il primo tratto del pozzo è rivestito di cassetti di pietra. In ogni metà, i tre scendono, aprono il loro cassetto ed escono vestiti di luce. Le due Emma ricevono **lo stesso identico vestito corallo**. Un ago cuce sulla schiena di ognuno 1, 2, 3.

Stacco sul monitor di Ada: due puntini nella mappa 3D, **sovrapposti**. Ada li confronta con una lente.

Poi la metà destra (parco) si congela e scivola in una cornice nell'angolo: *"Esperimento 2 – in attesa"*.

**NARRATORE.**
> Nel pozzo c'è un armadio con un cassetto per ogni parola. Ognuno prende il suo vestito di luce, sempre lo stesso, in qualunque frase. E siccome il pozzo non sa chi viene prima e chi dopo, a ognuno si cuce un numero sulla schiena.

**ADA.**
> Coordinate di Emma, frase del mare: zero virgola zero cinque, zero virgola zero cinque, zero virgola ottanta. Frase del parco… identiche. Annoto: *identiche*. [Ne ha altre 4.093, ma il mio schermo ne mostra solo tre.]
> Partiamo dal mare. Tu, Emma del parco, aspettami qui.

**MONITOR.**
```
Embedding: lookup nella tabella E (vocabolario × 4.096)
Emma → [0.05, 0.05, 0.80]  in entrambe le frasi
+ informazione di posizione
Griglia: 3 righe (Al, mare, Emma) × 3 colonne   [nei modelli veri × 4.096]
```

**CONCETTO.** L'embedding è uguale in ogni frase; il contesto non è ancora entrato.

**MANIM.** `DecimalMatrix` per la griglia; il vestito si colora con `vettore_a_colore()`; monitor = `ThreeDAxes` dentro un riquadro (render separato e composto, oppure `Scene` con la mappa 3D proiettata).

---

### SCENA 3 — La caduta e la Stanza dei Nomi (2:10–2:55)

**VISIVO.** Il fondo dell'armadio si apre: Emma, Al e Mare cadono tenendosi per mano, in una lunga spirale come Alice. Atterrano su un tappeto, nella prima stanza: una galleria di ritratti. Il più grande ha una targhetta: **Bovary**. Su un tavolino c'è una grande **"e"** di legno. In un angolo, fuori posto, uno scivolo e qualche conchiglia sparsa.

Emma guarda il ritratto e il punto interrogativo sopra la sua testa diventa più grande.

Stacco: Ada con l'occhio nel periscopio.

**NARRATORE.**
> Emma cadde, cadde, cadde. E atterrò in una stanza piena di ritratti. Nessuno di loro sapeva niente del mare. Era la stanza delle cose che vengono dopo "Emma", quando di Emma non si sa nient'altro.

**ADA.**
> Guardo col periscopio. Se il pozzo finisse qui, cosa direbbe? "Al mare Emma… Bovary". [Ah. Come il romanzo.] No, non ha ancora guardato i suoi compagni: conosce solo il proprio nome.

**MONITOR.**
```
Logit lens: il vettore di metà strada confrontato con la matrice di uscita.
"Se il modello finisse qui, quale token verrebbe dopo?"
Piano 0:  Bovary 0.72   e 0.49   scivolo 0.32   conchiglie 0.32
Qui il contesto non c'è ancora: parla solo "Emma".
```

**CONCETTO.** Prima degli strati il vettore contiene solo il token; il logit lens è una lettura.

**MANIM.** La caduta: Emma ruota lungo una `ParametricFunction` a spirale, con la camera che la segue (`MovingCameraScene`). Le parole della stanza sono `Text` disposte come oggetti, con dimensione proporzionale al logit.

---

### SCENA 4 — Piano 1: lo sguardo, la cabina, la corrente (2:55–4:20)

**VISIVO.**
1. **La Sala degli Sguardi.** I tre in cerchio. Accanto a ognuno, due lenti di pietra: una trasforma il colore in una **lanterna** (cosa cerco), l'altra in un **cartello** (cosa offro). Lanterne e cartelli sono **carte da gioco con tre semi**: acqua (goccia blu), verde (foglia), nome (stella rossa). Su ogni seme c'è un valore; i negativi sono scritti in rosso.
   - **La partita a carte (Emma e Mare, per intero).** Emma mette sul tavolo la carta-lanterna, Mare la carta-cartello. Seme per seme i due valori escono dalle carte, si incontrano al centro e si moltiplicano: ne esce una pastiglia con il prodotto (dorata se positivo, grigia se negativo). Sul seme «nome» due valori negativi danno un prodotto positivo: la gag del *meno per meno fa più*. Le tre pastiglie si sommano in un **gettone**: il punteggio, 1.35. È il prodotto scalare.
   - **Le altre due partite (veloci).** Lo stesso con Al (gettone grigio, sotto zero) e con Emma stessa.
   - **Dai gettoni alle quote.** I gettoni crescono (le differenze si allargano, e^punteggio) e diventano quote che sommano a 100%: 10, 70, 20 (softmax).
   - **La nuova carta.** Con le quote si prende un pezzo della carta di ognuno, seme per seme (0.1·Al + 0.7·Mare + 0.2·Emma): nasce la **nuova carta di Emma** `[0.58, 0.06, 0.18]` e il vestito cambia colore. Sullo sfondo, piccoli, anche Al e Mare fanno lo stesso.

   Numeri (lenti giocattolo, verificati): query di Emma `q = [0.90, 0.20, −0.50]`; key di Mare `[1.00, −0.30, −1.02]` → `0.90 − 0.06 + 0.51 = 1.35`; key di Al `[−0.40, 0.30, 0.60]` → `−0.36 + 0.06 − 0.30 = −0.60`; key di Emma `[0.20, 0.20, 0.24]` → `0.18 + 0.04 − 0.12 = 0.10`. Softmax di `(−0.60, 1.35, 0.10)` = `(0.10, 0.70, 0.20)`. Al parco la query è **la stessa** (stesso embedding), cambia la key di Parco `[0.55, 1.25, −1.20]` → `1.35`.
2. **La Cabina.** Emma entra da sola in una cabina. La macchina gira e stampa un biglietto con una freccia: lo spostamento.
3. **La forza invisibile.** Si apre il pavimento: una forza che non si vede tira Emma nella direzione scritta sul biglietto (posa «tirata via»: lei va avanti, boccoli, braccia e vestito restano indietro), fino alla stanza successiva. Il vestito passa da corallo a **lilla**.

**NARRATORE.**
> Al primo piano ognuno riceve una lanterna, che illumina ciò che cerca, e un cartello, che mostra ciò che offre. Emma alza la sua lanterna: chi si accende di più? Mare!
> Emma prende un po' di tutti, ma soprattutto un po' di mare. Poi entra da sola in una cabina, dove una macchina aggiunge ciò che il pozzo ha imparato del mondo. E una corrente la porta via.

**ADA.**
> Pesi dello sguardo: Al zero virgola uno, mare zero virgola sette, Emma zero virgola due. [Non li ha decisi nessuno: li ho visti uscire dal confronto tra lanterna e cartello. Le lenti invece sono di pietra, sono sempre le stesse.]
> E adesso la parte importante: lo strato non la ricostruisce da capo, **la sposta**. Prende la sua posizione e le aggiunge una freccia. Zero virgola sei verso l'acqua, meno zero virgola due verso… le azioni. Nuove coordinate: zero sessantacinque, zero zero cinque, zero sessanta.

**MONITOR.**
```
Attention (riga di Emma):  query · key → softmax → pesi
Al 0.1   mare 0.7   Emma 0.2      ← pesi di attention: calcolati ora, non parametri
raccolto = 0.1·Al + 0.7·mare + 0.2·Emma = [0.58, 0.06, 0.18]
Feed-forward (Emma da sola) → Δ1 = [0.60, 0.00, -0.20]
Connessione residua:  x1 = x0 + Δ1 = [0.65, 0.05, 0.60]
(semplificato: nei modelli veri i vettori passano anche per Wv)
```

Inserto opzionale, solo monitor (5 secondi): *"la camera che ho prenotato ieri sera a Roma era"*: lo sguardo di "era" va su "camera", non su "Roma". **Conta l'affinità, non la distanza.**

**CONCETTO.** Attention = media pesata; pesi del momento; feed-forward riga per riga; uno strato *somma* uno spostamento.

**MANIM.** Spessore dei fasci proporzionale al peso. Lo spostamento si mostra **anche sul monitor**: una `Arrow3D` Δ1 parte dal puntino di Emma e il puntino scivola lungo la freccia (`MoveAlongPath`), lasciando una scia (`TracedPath`). La freccia del biglietto nella cabina e quella del monitor devono essere **la stessa freccia** disegnata in due stili.

---

### SCENA 5 — La spiaggia strana (4:20–4:55)

**VISIVO.** Emma atterra su una spiaggia **dentro una stanza**: il pavimento è **sabbia**, dalle pareti escono **onde** che non bagnano, il soffitto è pieno di **conchiglie** appese come lampadari. E in mezzo, appeso al nulla, il **ritratto di Bovary**, un po' storto e bagnato. Emma lo guarda, il ritratto la guarda.

**NARRATORE.**
> La nuova stanza era una spiaggia. Ma era una spiaggia un po' strana: c'era ancora un ritratto appeso, come se qualcuno avesse dimenticato di portarlo via.

**ADA.**
> Periscopio. Se il pozzo finisse qui: conchiglie, onde, sabbia… e Bovary, ancora un po'. [È normale: a metà strada le letture sono confuse. Il pozzo non ha finito di calcolare.]

**MONITOR.**
```
Piano 1 (logit lens):  conchiglie 0.70   onde 0.70   sabbia 0.64   Bovary 0.54
Il contesto sta entrando; il vecchio non è ancora sparito.
Le letture a metà strada sono spesso strane: non sono ancora la risposta.
```

**CONCETTO.** Gli strati intermedi danno letture miste e incoerenti; il vettore porta con sé ciò che aveva (residuo).

---

### SCENA 6 — Piani 2 e 3: la caduta veloce (4:55–5:40)

**VISIVO.** Due cicli rapidi (sguardo → cabina → corrente, 4 secondi ciascuno).
- **Stanza 2.** Un molo sopra l'acqua. Le parole sono diverse: tra **onde** e **conchiglie** compare, per la prima volta, un verbo: **nuota**, scritto su un salvagente. Il vestito di Emma è **azzurro**. Il ritratto è sparito.
- **Stanza 3, il fondo.** Acqua profonda e luminosa. Intorno solo verbi: **nuota** grande e luminoso, **gioca** più piccolo. Il vestito è **blu mare**.

Sul monitor la scia di Emma si allunga: le frecce diventano **sempre più lunghe** e il puntino si allontana dall'origine.

La camera esce per un attimo: accanto al nostro pozzo di tre piani si vede in trasparenza un **pozzo fantasma** con decine di piani, che scende fino al buio.

Dettaglio da non perdere: **Al e Mare cadono sempre insieme a Emma.**

**NARRATORE.**
> Al secondo piano, per la prima volta, Emma vide una parola diversa dalle altre: non una cosa, ma un'azione. E più scendeva, più il suo vestito diventava blu, come il mare.

**ADA.**
> Piano due: compare "nuota". Piano tre: "nuota" in testa, "gioca" dietro. [Guarda le frecce: si allungano a ogni piano. Più è lungo il vettore, più netta è la lettura.]
> Il mio pozzo ha tre piani. Quelli veri ne hanno decine. Ma i viaggiatori restano sempre tre: nessuno si perde per strada.

**MONITOR.**
```
x2 = x1 + Δ2 = [1.45, 0.10, -0.20]   logit lens: nuota 1.27  onde 1.09  conchiglie 1.02
x3 = x2 + Δ3 = [2.75, 0.30, -1.80]   logit lens: nuota 3.27  gioca 2.45
La griglia non si assottiglia: 3 righe dall'inizio alla fine.
```

**CONCETTO.** Gli strati affinano la direzione; la griglia resta di 3 righe; i modelli veri hanno decine di strati.

---

### SCENA 7 — Le campane del fondo (5:40–6:35)

**VISIVO.** Sul fondo solo **Emma** arriva davanti a un anello di campane di pietra. Al e Mare restano un gradino più su e la salutano: sono già dentro il suo colore.

Una forza invisibile **tira Emma** verso un punto preciso dell'anello (posa «tirata via», vestito blu): non verso una campana sola, ma verso uno spicchio dove ce ne sono parecchie. Dal suo vestito parte un'onda di luce che tocca **tutte le campane nello stesso istante**. Ognuna suona con una forza che dipende da quanto guarda nella stessa direzione: *nuota* rintocca forte, *gioca* bene, *onde* e *sabbia* piano. *Bovary* e *stira* restano mute.

Primo piano sulla campana *nuota*: **la stessa partita a carte della Sala degli Sguardi**. La carta di Emma contro la carta della campana (2.20, −0.01, +1.08: di nuovo un *meno per meno*); il gettone 3.27 vola nella campana, che suona. Il bambino riconosce il gesto, l'adulto vede che attention e uscita usano la stessa operazione: il prodotto scalare.

**NARRATORE.**
> Sul fondo del pozzo arrivò solo Emma. Una forza invisibile la tirava da una parte, e intorno a lei le campane cominciarono a suonare. Ma attenzione: Emma non era diventata "nuota". Veniva tirata verso laggiù, dove abitano le parole che vanno d'accordo con il mare.

**ADA.**
> Ultima riga della griglia, quella di Emma. La confronto con ogni campana: moltiplico coordinata per coordinata e sommo. Per "nuota": due virgola venti, meno zero virgola zero uno, più uno virgola zero otto. Tre virgola ventisette! [Meno per meno fa più: per questo anche la terza coordinata aiuta.]

**MONITOR.**
```
Si usa solo l'ultima riga (in addestramento si usano tutte).
logit[t] = v · U[t] = Σ v_i U[t,i]     (una moltiplicazione di matrici, tutte insieme)
v = [2.75, 0.30, -1.80]
nuota:  2.20 − 0.01 + 1.08 =  3.27
gioca:                         2.45
stira: −1.65 − 0.15 + 0.36 = −1.44
L'uscita è una direzione, non una parola.
```

**MANIM.** Sul monitor: `Arrow3D` dall'origine a v, e per ogni parola la sua direzione come linea sottile; la proiezione di v su ognuna come tratteggio. Le campane: `fill_opacity` legata al logit con `ValueTracker`.

---

### SCENA 8 — Il secchio (6:35–7:00)

**VISIVO.** Il suono delle campane diventa una pioggia di palline che cade in un secchio di vetro: tantissime blu (*nuota*), parecchie azzurre (*gioca*), poche di altri colori, quasi nessuna marrone (*stira*). La carrucola gira: il secchio **risale** fino al bordo del pozzo, sul bancone di Ada.

**NARRATORE.**
> Il suono delle campane diventò una pioggia di palline, e un secchio risalì lungo il pozzo. Il pozzo aveva finito. Non aveva scelto nessuna parola: aveva riempito un secchio.

**ADA.**
> Probabilità: "nuota" quarantacinque per cento, "gioca" venti, le altre si dividono il resto.

**MONITOR.**
```
softmax: p_t = e^{logit_t} / Σ e^{logit}
nuota 45%   gioca 20%   onde 9%   sabbia 7%   conchiglie 7%   corre 6%   …   stira 0.4%
(vocabolario giocattolo: 12 parole. Nei modelli veri: 30.000–200.000)
```

**MANIM.** `BarChart` che si trasforma dai logit alle probabilità; palline con layout a seme fisso.

---

### SCENA 9 — Ada pesca (7:00–8:10)

La scena del **confine del modello**.

**VISIVO.**
1. Il secchio arriva sul bancone. Una linea tratteggiata separa il pozzo dal laboratorio: *"fine del modello"*.
2. **Determinismo.** Ada rimanda giù la stessa frase: risale un secchio **identico**, timbro *IDENTICO*. Poi pesca due volte da due secchi identici: *nuota*, poi *gioca*. Timbro *DIVERSO*.
3. **Termostato.**
   - **Ghiaccio** (T 0.3): il secchio è quasi tutto blu. *nuota*.
   - **Zero**: Ada non pesca nemmeno, prende la pallina più numerosa. *nuota, nuota, nuota*.
   - **Fuoco** (T 3): le palline si pareggiano. Ada pesca… una pallina marrone: **stira**. A schermo: *"Al mare Emma stira."* Emma, in costume da bagno, stira un asciugamano sulla sabbia con un ferro enorme. (Gag.)
4. Termostato a 1. Pesca: **nuota**.

**NARRATORE.**
> E adesso la domanda più importante: chi sceglie la parola? Non il pozzo. Il pozzo riempie il secchio e si ferma. A pescare è Ada, che sta fuori.

**ADA.**
> Stessa frase, stesso secchio: sempre. Ma se pesco due volte, posso tirare fuori palline diverse. [Ecco perché la stessa domanda può avere risposte diverse.]
> E poi c'è il termostato. Freddo: vince quasi sempre la pallina più numerosa. Ghiacciato: vince sempre lei. Caldo… anche le palline più strane hanno la loro occasione. "Stira" aveva quasi il quattro per cento. Ed è uscita lei. [Troppo caldo, e le frasi smettono di avere senso.]
> Temperatura normale. Pesco… "nuota". Al mare Emma nuota.

**MONITOR.**
```
Campionamento e temperatura: codice di inferenza, fuori dal modello.
p = softmax(logit / T)          — T non tocca i parametri
T = 0    → sempre nuota (output ripetibile)
T = 0.3  → nuota 93%  gioca 6%
T = 1    → nuota 45%  gioca 20%  …  stira 0.4%
T = 3    → nuota 18%  gioca 14%  …  stira 3.7%
Deterministico: la distribuzione.   Variabile: la pesca.
```

**MANIM.** Il termostato è un `ValueTracker(T)` collegato a un istogramma `always_redraw` che ricalcola `softmax(logit / T)` a ogni frame. Le pescate hanno esiti **fissati in sceneggiatura**, non casuali.

---

### SCENA 10 — Esperimento 2: al parco (8:10–9:10)

**VISIVO.** La cornice nell'angolo si ingrandisce: è l'Emma del parco, ancora corallo, con Al e Parco. Ada gira pagina: *"Esperimento 2"*. Il viaggio è un **montaggio veloce**, con lo stesso ritmo ma ambienti diversi:

- **Stanza dei Nomi**: **identica** a quella del mare, stessi ritratti e stesso Bovary. Ada: *"Uguale!"*
- **Piano 1**: la lanterna di Emma accende fortissimo il cartello di **Parco**. Vestito **giallo paglia**.
- **Stanza 1**: un prato dentro una stanza, **foglie** che cadono dal soffitto, un'**altalena**, uno **scivolo**… e Bovary appeso a un ramo.
- **Stanza 2**: compare **corre**, scritto su una scarpetta. Vestito **verde chiaro**.
- **Fondo**: **corre** grande, **gioca** più piccolo. Vestito **verde prato**.
- Campane, secchio (corre 45%, gioca 20%), Ada pesca: **corre**. *"Al parco Emma corre."*

**NARRATORE.**
> Poi Ada rifece l'esperimento, con una sola parola diversa. Emma cadde di nuovo nello stesso pozzo, con lo stesso vestito. Ma questa volta, accanto a lei, c'era un piccolo albero.

**ADA.**
> Piano zero: identico al mare. Il contesto non è ancora entrato. Piano uno… eccolo: la lanterna va su "parco". Da qui le strade si separano.
> Ed ecco: "gioca" c'è anche qui, venti per cento, come al mare. [Al mare e al parco si può giocare in tutti e due i posti.]

**MONITOR.**
```
Stesso embedding, stessi parametri, una parola diversa nel contesto.
parco:  x3 = [0.30, 2.75, -1.80]   corre 45%   gioca 20%
mare:   x3 = [2.75, 0.30, -1.80]   nuota 45%   gioca 20%
```

**CONCETTO.** L'embedding è uguale; il vettore dopo gli strati dipende dal contesto.

---

### SCENA 11 — Un solo cielo (9:10–9:45)

**VISIVO.** Il monitor di Ada si espande fino a riempire lo schermo e diventa un cielo notturno 3D. Una sola stella di partenza, corallo: Emma. Da lì partono **due scie**: una piega verso le stelle blu (*nuota*, *onde*, *sabbia*), l'altra verso quelle verdi (*corre*, *foglie*, *altalena*). In mezzo, tra le due, brilla *gioca*. La camera ruota lentamente.

**NARRATORE.**
> Stessa bambina, stesso pozzo, stesse pietre. È bastata una parola sola, mare o parco, per portare Emma in due cieli diversi.

**ADA.**
> Conclusione dell'esperimento: il punto di partenza è lo stesso, è il contesto che sposta. [E le due strade si separano proprio al primo sguardo.]

**MONITOR.**
```
Il vettore di un token nella tabella è sempre lo stesso.
Dopo gli strati dipende da tutta la frase.
```

**MANIM.** `ThreeDScene` con le due `TracedPath` già calcolate; `begin_ambient_camera_rotation`. È l'immagine di copertina del film.

---

### SCENA 12 — Il ciclo e la Fine (9:45–10:20)

**VISIVO.**
1. La pallina *nuota* prende vita e corre di nuovo allo Spezzaparole. `Al mare Emma nuota▌`. Ora sono **quattro** a cadere nel pozzo. Montaggio in avanti veloce: `…felice` … `.`
2. Nel secchio compare una pallina scura con un punto bianco: **Fine**. Ada la pesca, la guarda, sorride e spegne la lampada del pozzo.
3. Inserto: un'altra frase scorre, *"Al parco Emma corre verso l'alta—"*, e la **forbice dell'orologio** sul muro la taglia. Biglietto: *"è stata la forbice, non il pozzo"*.

**NARRATORE.**
> La parola pescata torna in fila, e il viaggio ricomincia: ogni volta con un viaggiatore in più. Finché nel secchio sale una pallina speciale: Fine. Non è un ordine. È una pallina come le altre, che il pozzo ha imparato a mettere nel secchio quando una frase è finita.

**ADA.**
> Fine sequenza. Spengo. [E se una frase si interrompe a metà? È la mia forbice, il limite di parole. Il pozzo non c'entra.]

**MONITOR.**
```
Token scelto → aggiunto al testo → di nuovo nel modello.
Una parola in più = una riga in più nella griglia. Parametri invariati.
EOS: token previsto come gli altri; il codice lo riconosce e ferma il ciclo.
max_tokens / stop sequence: limiti esterni.
```

---

### SCENA 13 — Il pozzo è fatto di numeri (10:20–11:00)

**VISIVO.** Ada si affaccia al pozzo spento con una torcia. Le pareti diventano trasparenti: sono colonne di numeri, matrici impilate (E in alto, gli strati in mezzo, U sul fondo). I numeri sono **fermi**. Ada passa la lente su una parete: si leggono uno per uno, ma non formano nessuna frase, nessuna regola.

Ultima inquadratura: il cielo con le due scie, e in basso due righe scritte sul quaderno di Ada: *Al mare Emma nuota. Al parco Emma corre.*

Sul quaderno, l'ultima pagina: *Esperimento 3: come si costruisce un pozzo?*

**NARRATORE.**
> Il pozzo non pensa e non sogna. È fatto solo di numeri, sistemati uno per uno durante un lunghissimo allenamento. Ma con quei numeri, una bambina di nome Emma ha trovato due strade diverse: una verso il mare, e una verso il parco.

**ADA.**
> Posso seguire ogni conto che fa. Ma se mi chiedi *perché* proprio questi numeri funzionano… [Non lo so dire a parole. Nessuno lo sa ancora davvero.] Prossimo esperimento: come si costruisce un pozzo.

**MONITOR (riepilogo, 6 secondi):**
```
1. Tokenizer: testo → indici                          (fuori dal modello)
2. Modello: indici → distribuzione                      (deterministico)
   embedding → strati (attention + feed-forward, x = x + Δ) → ultima riga · U → softmax
3. Campionamento con temperatura                      (fuori dal modello)
4. Il token si aggiunge al testo → si torna al punto 2
5. Stop: EOS previsto dal modello, o limite esterno

Il modello non decide: calcola. La scelta è fuori.
Opaco ≠ casuale: ogni conto è tracciabile, il "perché" no.
```

---

## 8. Mappa scena → lezione

| Scena | Concetto | Domande di verifica della lezione |
|---|---|---|
| 0 | Generazione token per token | — |
| 1 | Tokenizer, indici opachi | 7, 8 |
| 2 | Embedding, posizione, griglia | 10 |
| 3 | Vettore senza contesto; logit lens | 10, 11 |
| 4 | Attention, query/key, pesi del momento, feed-forward, residuo | 15, 16 |
| 5–6 | Strati, griglia invariata, letture intermedie | 12 |
| 7 | Ultima riga, U, prodotto scalare, direzione | 13, 14, 17 |
| 8 | Softmax, distribuzione | 4 |
| 9 | Campionamento, temperatura, determinismo | 3, 5 |
| 10–11 | Stesso embedding, contesto diverso | 9, 10 |
| 12 | Ciclo, EOS, max_tokens | 6, 12 |
| 13 | Modello = numeri, scatola nera, addestramento | 1, 2 |

---

## 9. Versione corta (circa 5 minuti)

Scene **0, 2, 3, 4, 7, 9, 11**, con raccordi di una riga al posto delle altre. Contiene l'essenziale: stessa partenza, primo sguardo, Emma tirata verso le campane, Ada che pesca, due scie nello stesso cielo.

---

## 10. Note di coerenza scientifica

1. **Connessione residua.** La lezione dice che ogni strato "riscrive" la riga. È vero nel risultato, ma nei Transformer reali lo strato calcola uno spostamento e lo **somma** alla riga (`x = x + Δ`). Il film usa questa forma, più precisa, ed è per questo che il verbo "spostare" è corretto.
2. **Logit lens.** Le stanze sono letture del vettore intermedio attraverso la matrice di uscita. È una tecnica di ricerca reale (*logit lens*; nella versione migliorata, *tuned lens*), utile ma approssimativa. Nei modelli veri le letture dei primi strati sono spesso strane o legate al solo token corrente, e diventano sensate negli ultimi strati: il film rispetta questo andamento.
3. **Lunghezza crescente del vettore.** Nel modellino le frecce si allungano a ogni piano, e le letture diventano più nette. Anche nei modelli veri la norma del vettore tende a crescere lungo gli strati, ma Ada lo presenta come una proprietà del suo modellino, non come una legge.
4. **Assi con un nome.** Acqua, verde e nome/azione sono etichette del modellino. Ada lo dice almeno una volta (regola 12).
5. **Wv omessa** nella media pesata, come nella lezione; dichiarato sul monitor.
6. **Dati inventati e dichiarati come tali:** indici dei token, i 12 vettori di U, gli spostamenti Δ2 e Δ3, i pesi di attention (presentati senza i punteggi query·key).
7. **Rispetto alla bozza 1** spariscono le incoerenze numeriche della lezione (45/43%, pesi 0.1/0.7/0.2 contro 0.19/0.49/0.31): tutti i numeri del film sono nuovi e si ricavano gli uni dagli altri.

### Opzione: misurare le stanze su un modello vero
Si può applicare il logit lens a un piccolo modello linguistico aperto con le due frasi e vedere quali parole compaiono davvero strato per strato. Servirebbe da **ispirazione e verifica** per la scenografia: i numeri del film restano quelli del modellino, perché un modello vero ha 4.096 coordinate e non si può disegnare. Richiede di installare PyTorch e scaricare un modello di qualche centinaio di MB, quindi va deciso prima.

---

## 11. Note tecniche

**Stack.** Manim Community Edition (v0.19), Python 3.11+, LaTeX (già installato), ffmpeg (**da installare**: `brew install ffmpeg`), plugin `manim-voiceover` per sincronizzare le due voci.

**Struttura del progetto.**
```
pozzo_delle_parole/
  dati.py          # TUTTI i numeri del §4, calcolati da E, U e Δ (nessun numero scritto a mano altrove)
  stile.py         # palette, font, vettore_a_colore(), STRATO_ADULTO
  personaggi.py    # Emma, Al, Mare, Parco, Ada, campane, secchio
  monitor.py       # la mappa 3D di Ada, condivisa da tutte le scene
  scene/
    s00_laboratorio.py … s13_numeri.py
  audio/
    narratore/  ada/
```

**Principi.**
- Un'unica fonte per i numeri: colore del vestito, posizione sulla mappa, parole delle stanze, campane, secchio e monitor leggono tutti `dati.py`. Le stanze si generano dai primi k logit del logit lens, quindi se cambi un vettore, cambiano anche le stanze.
- Niente casualità vera: semi fissi per i layout, pescate decise in sceneggiatura.
- Personaggi costruiti in codice (forme e curve), così si colorano direttamente dal vettore.
- Ogni scena è parametrizzata per contesto (`"mare"` / `"parco"`): l'esperimento 2 è la stessa scena con un argomento diverso.

---

## 12. Domande aperte

1. **Nomi:** "Il pozzo delle parole", "Ada" e "lo Spezzaparole" vanno bene?
2. **Gag a temperatura alta:** "stira" ti piace, o preferisci un'altra parola assurda?
3. **Misurare le stanze** su un modello vero (§10), oppure restiamo solo sul modellino?
4. **Voci:** due voci registrate, sintetiche, o una voce sola che cambia tono?
