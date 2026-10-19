# Come funziona un LLM: dal testo alla distribuzione di probabilità

## Il ciclo completo: dal testo al token successivo

Un LLM è una funzione fissa che riceve una sequenza di token e restituisce una distribuzione di probabilità sul token successivo. Tutto il resto (tokenizer, campionamento, temperatura, stop) è software intorno al modello, non il modello.

**Programmazione classica contro machine learning.** Nella programmazione classica il programmatore scrive le regole. Nel machine learning il programmatore fornisce esempi di ingresso con il risultato giusto, e un algoritmo di ottimizzazione regola milioni di parametri numerici finché la funzione approssima la relazione tra ingresso e risultato. Il modello è quella funzione: numeri, non regole leggibili. Una volta addestrato non impara più: usarlo significa solo calcolare la funzione.

**Il ciclo di inferenza.** Ogni risposta viene prodotta un token alla volta, con questo ciclo gestito dal codice di inferenza (il server di chi espone l'API, o il tuo processo con un modello locale):

1. Il tokenizer spezza il testo in token e converte ogni token nel suo indice numerico nel vocabolario.
2. Il modello riceve gli indici e restituisce una distribuzione di probabilità su tutto il vocabolario (ad esempio: "il" 40%, "un" 25%, "questo" 10%, e così via).
3. Il codice sceglie un token da quella distribuzione (campionamento, regolato dalla temperatura).
4. Il token scelto viene aggiunto al testo e si torna al punto 2.
5. Il ciclo si ferma quando viene scelto il token speciale EOS (fine sequenza), oppure quando il codice impone un limite esterno (max\_tokens, stop sequence).

Il modello fa solo il punto 2. È deterministico: stesso ingresso, stessi parametri, stessa distribuzione. La variabilità delle risposte nasce al punto 3, nel campionamento.

**Tre proprietà da tenere separate.**

- Deterministico: il modello calcola sempre la stessa distribuzione per lo stesso ingresso.
- Variabile: la frase finale cambia perché il campionamento pesca dalla distribuzione. È una scelta esterna al modello.
- Opaco (scatola nera): non si riesce a spiegare in termini umani perché i parametri producono quella distribuzione. Opacità del perché, non casualità del cosa.

**Temperatura.** Prima della pesca, il codice può deformare la distribuzione. Temperatura bassa esaspera le differenze (il token più probabile vince quasi sempre), temperatura alta le appiattisce (anche i token improbabili hanno chance reali). Temperatura zero prende sempre il più probabile: output ripetibile. La temperatura non modifica i parametri del modello: vive nel codice di inferenza. Estrazione dati da una fattura: temperatura bassa. Generazione di nomi di prodotto: temperatura alta, con misura, perché oltre un certo punto il testo diventa incoerente.

**Chi decide che la risposta è finita.** Il modello stesso, prevedendo EOS come qualsiasi altro token. Ha imparato a emetterlo durante l'addestramento, perché negli esempi di testo c'era un segnale di fine. EOS non è un comando che il modello esegue: è un token che prevede. Una risposta troncata a metà frase è sempre opera del codice esterno (limite di token), mai del modello.

**Token e tokenizer.** Il modello non lavora su lettere né su parole, ma su token: pezzi di testo di lunghezza variabile presi da un vocabolario fisso (da 30.000 a 200.000 voci). Il vocabolario viene costruito prima dell'addestramento fondendo progressivamente le coppie di caratteri più frequenti. Le parole comuni diventano un token unico, quelle rare vengono spezzate. Due conseguenze pratiche:

- L'italiano costa più token dell'inglese (circa un token ogni tre quarti di parola), perché il vocabolario è stato costruito su testo prevalentemente inglese. Non c'è nessuna traduzione interna: il modello non pensa in inglese.
- Il modello fatica con operazioni sui caratteri (contare le lettere, invertire una stringa, aritmetica su numeri lunghi) perché riceve indici opachi, non lettere. Dentro l'indice 23054 non c'è scritto "b-e-r-r-y". Quando ci riesce, lo fa per via statistica, avendo visto nei dati quella parola scritta lettera per lettera. Per questi compiti la scelta giusta è dare al modello uno strumento.

## Dentro il modello: embedding, strati, attention, uscita

Il significato non è nei token, è nella geometria dei vettori. Gli indici dei token vengono usati una volta sola, nel lookup iniziale, poi spariscono: da lì in poi nel modello viaggiano solo vettori.

**Il modello è dati, non istruzioni.** Un file di modello scaricato è solo matrici di numeri (i parametri). Il programma che le usa è generico, poche righe, uguale per tutti i modelli della stessa famiglia:

```python
# DATI (parametri, caricati da disco, mai modificati in inferenza)
E = tabella_embedding        # vocabolario x 4096
W = [matrici degli strati]   # decine di strati, ciascuno milioni di numeri
U = matrice_uscita           # 4096 x vocabolario

# ISTRUZIONI (il programma, poche righe)
def modello(indici_token):
    x = [E[i] for i in indici_token]      # 1. lookup: indici -> vettori
    for strato in W:
        x = strato.applica(x)             # 2. attention + feed-forward
    logits = x[-1] @ U                    # 3. ultimo vettore -> un punteggio per token
    return logits                         # il modello finisce qui

# CODICE DI INFERENZA (fuori dal modello, scelte di chi lo usa)
def prossimo_token(indici_token, temperatura):
    logits = modello(indici_token)                # riceve i logit restituiti dal modello
    probabilita = softmax(logits / temperatura)   # 4. punteggi -> distribuzione
    return campiona(probabilita)                  # 5. pesca un token
```

**Passo 1, gli embedding.** Il modello ha una tabella con una riga per ogni token del vocabolario. Ogni riga è un vettore di qualche migliaio di numeri decimali (4.096 in un modello tipico). Quando entra il token 23054, il modello prende la riga 23054. Questi numeri sono parametri: partiti casuali, regolati dall'addestramento. Dopo l'addestramento, token usati in contesti simili hanno vettori vicini. Il vettore non è un'etichetta, è una posizione in uno spazio a molte dimensioni: la vicinanza codifica la somiglianza d'uso, le direzioni codificano relazioni (re meno uomo più donna finisce vicino a regina).

Tabella giocattolo, tre token, tre dimensioni (numeri inventati, forma vera):

```
indice  token     vettore
1047    hotel     [ 0.82,  0.10, -0.35]
1048    albergo   [ 0.79,  0.14, -0.31]
2210    trapano   [-0.40,  0.91,  0.22]
```

Attenzione: nella tabella esistono solo token. Se "albergo" viene spezzato in "alb" ed "ergo", ci sono due righe e nessuna per "albergo". A questo livello "alb" non è vicino a "hotel". La vicinanza tra "albergo" e "hotel" emerge dopo gli strati, quando il vettore nella posizione di "ergo" è stato riscritto combinando i pezzi con il contesto. Per lo stesso motivo il vettore di "hotel" è uguale in tutte le frasi nella tabella, ma diverso all'uscita degli strati: "hotel a cinque stelle" e "hotel California" producono vettori diversi.

**Passo 2, gli strati.** Dopo il lookup la frase "ho prenotato un" è una griglia di 3 righe (una per token) per 4.096 colonne. Ogni strato riceve la griglia e restituisce una griglia della stessa forma con numeri diversi. La griglia non si assottiglia mai: tre righe all'ingresso, tre righe alla fine. Ogni riga viene riscritta a ogni strato, decine di volte.

Ogni strato fa due cose per ogni riga:

- Attention: la riga guarda tutte le righe della griglia (se stessa compresa) e si riscrive come media pesata dei loro vettori. I pesi sono calcolati sul momento, frase per frase.
- Feed-forward: il vettore ottenuto passa per una piccola funzione fissa (due moltiplicazioni per matrici di parametri con una non linearità in mezzo) che lo rielabora da solo, senza guardare le altre righe. Qui il modello aggiunge conoscenza propria al contesto raccolto.

Esempio numerico, tre dimensioni. Dopo il lookup:

```
ho          [ 0.10, -0.20,  0.50]
prenotato   [ 0.60,  0.70, -0.10]
un          [ 0.05,  0.00,  0.30]
```

Attention sulla riga di "un" nello strato 1. Il modello assegna i pesi 0.1 a "ho", 0.7 a "prenotato", 0.2 a se stessa (sommano a 1) e fa la media pesata:

```
0.1 * [ 0.10, -0.20,  0.50]  = [ 0.01, -0.02,  0.05]
0.7 * [ 0.60,  0.70, -0.10]  = [ 0.42,  0.49, -0.07]
0.2 * [ 0.05,  0.00,  0.30]  = [ 0.01,  0.00,  0.06]
                        somma = [ 0.44,  0.47,  0.04]
```

Così "un" ha assorbito il contenuto di "prenotato". Il feed-forward rielabora il risultato e produce la nuova riga di "un": [0.40, 0.50, 0.10]. Stesso procedimento, in parallelo, per le altre righe. Dopo lo strato 2 la riga di "un" è [0.75, 0.20, -0.30]: si è spostata verso la zona dello spazio dove stanno le cose prenotabili.

**Come si calcolano i pesi di attention.** Ogni riga produce, tramite due matrici di parametri, due piccoli vettori: la query (cosa sto cercando) e la key (cosa offro). Il peso tra "un" e "prenotato" è il prodotto scalare tra la query di "un" e la key di "prenotato": alto se si corrispondono. Softmax sui punteggi dà i pesi. Il criterio è l'affinità tra ciò che una riga cerca e ciò che le altre offrono, non la distanza nella frase. In "la camera che ho prenotato ieri sera a Roma era", la riga di "era" dà molto peso a "camera" (il soggetto) e poco a "Roma", pur essendo Roma più vicina.

**Da dove vengono query e key.** Dal vettore della riga stessa, moltiplicato per due matrici di parametri dello strato, Wq e Wk. Sono parametri: fissi, decisi dall'addestramento, uguali per ogni frase e per ogni riga. Ogni riga della griglia fa lo stesso calcolo e ottiene la sua query e la sua key. Esempio in tre dimensioni, con query e key di due numeri (nei modelli veri: vettore di 4.096, query e key di 128):

```
riga di "un"        x = [ 0.05,  0.00,  0.30]
riga di "prenotato" p = [ 0.60,  0.70, -0.10]

Wq (3 righe x 2 colonne)     Wk (3 righe x 2 colonne)
  [ 1.0,  0.0]                 [ 0.0,  1.0]
  [ 0.0,  1.0]                 [ 1.0,  0.0]
  [ 2.0,  0.0]                 [ 0.0, -1.0]

query di "un"   = x @ Wq = [0.05*1 + 0*0 + 0.30*2,  0.05*0 + 0*1 + 0.30*0] = [ 0.65,  0.00]
key di "prenotato" = p @ Wk = [0.60*0 + 0.70*1 - 0.10*0,  0.60*1 + 0.70*0 + 0.10*1] = [ 0.70,  0.70]
key di "un"     = x @ Wk = [ 0.00, -0.30]

punteggio un -> prenotato = query(un) . key(prenotato) = 0.65*0.70 + 0*0.70 = 0.455
punteggio un -> un        = query(un) . key(un)        = 0.65*0 + 0*(-0.30) = 0.000
```

I punteggi verso tutte le righe passano per softmax e diventano i pesi (0.1, 0.7, 0.2 nell'esempio sopra). Wq e Wk sono due proiezioni diverse dello stesso vettore: la query è la riga letta da un'angolazione ("cosa cerco"), la key la stessa riga letta da un'altra ("cosa offro"). L'addestramento regola le due matrici in modo che la query di un token che ha bisogno del suo verbo si allinei con la key dei token che sono verbi. Stesso principio per i vettori che vengono mediati: anche quelli passano per una terza matrice, Wv (value), prima della media pesata. Ogni strato ha le sue Wq, Wk, Wv, e di solito ne ha molte copie in parallelo (le "teste" di attention), ognuna specializzata su un tipo di relazione diverso.

**Cosa fa softmax, in numeri.** Due passaggi: eleva e (circa 2,718) a ciascun punteggio, poi divide ogni risultato per la somma di tutti. Punteggi della riga di "un" verso le tre righe:

```
                 ho      prenotato   un
punteggio      -0.50      0.455     0.00
e^punteggio     0.61      1.58      1.00      somma = 3.19
peso = e^p/somma 0.19      0.49      0.31     somma = 1
```

L'esponenziale rende tutto positivo (un punteggio negativo diventa un peso piccolo, mai zero) e amplifica le distanze. Con punteggi dieci volte più grandi:

```
punteggio      -5.00      4.55      0.00
e^punteggio     0.007    94.6       1.00      somma = 95.6
peso            0.0001    0.99      0.01
```

Stesso meccanismo in uscita sui logit: la temperatura è il numero per cui si dividono i logit prima del softmax. Dividere per un numero piccolo (temperatura bassa) allarga le distanze e concentra la probabilità sul primo; dividere per un numero grande (temperatura alta) le schiaccia e appiattisce la distribuzione.

Il modello di suo non conosce l'ordine dei token: la griglia è un insieme di righe. Per questo, prima del primo strato, a ogni vettore viene aggiunta un'informazione sulla posizione. Il modello impara da solo quanto farla contare.

Due cose diverse si chiamano pesi, e vanno tenute separate: i parametri del modello (fissi, uguali per ogni frase, decisi dall'addestramento) e i pesi di attention (calcolati sul momento, diversi a ogni frase e a ogni strato). È la differenza tra la ricetta e il piatto.

**Passo 3 e 4, l'uscita.** Dopo l'ultimo strato si prende solo l'ultima riga della griglia, perché l'obiettivo è il token successivo all'ultimo. Le altre righe hanno fatto il loro lavoro influenzando l'ultima (in addestramento si usano tutte: ogni riga prevede il token che la segue). La matrice di uscita U ha una riga per ogni token del vocabolario. Il modello fa il prodotto scalare tra l'ultimo vettore e ogni riga di U, in un'unica moltiplicazione di matrici: nessuna ricerca, un punteggio per tutti i token in un colpo solo.

```
ultimo vettore:  [ 0.75,  0.20, -0.30]

U[hotel]    = [ 0.80,  0.10, -0.30]  ->  0.60+0.02+0.09 =  0.71
U[albergo]  = [ 0.75,  0.15, -0.25]  ->  0.56+0.03+0.08 =  0.67
U[trapano]  = [-0.40,  0.90,  0.20]  -> -0.30+0.18-0.06 = -0.18
```

Questi sono i logit. Softmax li trasforma in probabilità che sommano a 1: hotel 45%, albergo 43%, trapano quasi zero. L'ultimo vettore non è "il vettore di hotel": è una direzione verso una regione dello spazio dove stanno hotel, albergo, resort, appartamento. Per questo più token possono avere probabilità alta insieme. Il modello non ha scelto una parola, ha indicato una direzione. La scelta la fa il campionamento, fuori.

**E e U: la stessa tabella?** Hanno la stessa forma: una riga per ogni token del vocabolario, 4.096 numeri per riga ("4096 x vocabolario" per U è solo la convenzione della moltiplicazione, cioè la tabella trasposta). Hanno lo stesso ruolo: la posizione di ogni token nello spazio. Ma in generale sono due blocchi di parametri distinti, addestrati ciascuno per il proprio compito: E rappresenta il token in ingresso, U riconosce la direzione in uscita. Molti modelli le legano di proposito usando un'unica tabella per entrambe (weight tying): risparmia parametri e funziona perché il significato è lo stesso. Concettualmente lo stesso tabellone visto da due lati; fisicamente dipende dal modello. L'esempio sopra mostra tre righe di U su un vocabolario di centomila.

**Il prodotto scalare, passo per passo.** In uscita i due vettori sono sempre gli stessi due tipi: da una parte l'ultimo vettore della griglia (fisso, uno solo per tutta l'operazione), dall'altra la riga di U del token che si sta esaminando. Si ripete per ogni token del vocabolario, cambiando solo la riga di U: centomila prodotti scalari, centomila logit. Il calcolo: si moltiplicano i due vettori posizione per posizione e si sommano i risultati. Un solo numero in uscita. Ultimo vettore v = [0.75, 0.20, -0.30]:

```
v = ultimo_vettore = [0.75, 0.20, -0.30]      (uno solo, fisso)
U[t] = riga di U del token t                 (cambia a ogni token)

logit[t] = v . U[t] = v[0]*U[t][0] + v[1]*U[t][1] + v[2]*U[t][2]

t = hotel     U[hotel]   = [ 0.80,  0.10, -0.30]
  v[0]*U[0] =  0.75 *  0.80 =  0.60
  v[1]*U[1] =  0.20 *  0.10 =  0.02
  v[2]*U[2] = -0.30 * -0.30 =  0.09   (meno per meno dà più)
  logit[hotel]   = 0.71

t = trapano   U[trapano] = [-0.40,  0.90,  0.20]
  v[0]*U[0] =  0.75 * -0.40 = -0.30
  v[1]*U[1] =  0.20 *  0.90 =  0.18
  v[2]*U[2] = -0.30 *  0.20 = -0.06
  logit[trapano] = -0.18
```

In notazione matematica, con d = numero di dimensioni (3 qui, 4.096 in un modello vero):

```latex
\text{logit}_t = v \cdot U_t = \sum_{i=1}^{d} v_i \, U_{t,i}
```

Il risultato è alto quando i due vettori hanno segni concordi nelle stesse posizioni (puntano nella stessa direzione), basso o negativo quando i segni sono discordi. Per questo misura l'allineamento. Vale in tutto il modello: tra query e key per i pesi di attention, tra ultimo vettore e righe di U per i logit.

**Una parola da evitare.** Il modello non decide, non ragiona, non sceglie: calcola, con parametri fissi, frase per frase. Il confine tra capire un LLM e antropomorfizzarlo passa da qui.

## Glossario

I termini nell'ordine in cui compaiono nel ciclo, non in ordine alfabetico: così rileggendoli si ripercorre il flusso.

| Termine | Cosa è | Dove vive |
| --- | --- | --- |
| Modello | Una funzione matematica con miliardi di parametri numerici, regolati dall'addestramento. Riceve indici di token, restituisce una distribuzione di probabilità sul token successivo. Deterministica. | È il file di pesi |
| Parametri | I numeri del modello: tabella embedding, matrici di ogni strato, matrice di uscita. Fissi dopo l'addestramento, uguali per ogni frase. Detti anche pesi del modello. | Nel modello |
| Addestramento | Il processo di ottimizzazione numerica che regola i parametri partendo da esempi: prova, misura l'errore, aggiusta, ripete milioni di volte. Nessun ragionamento, statistica. | Prima dell'uso |
| Inferenza | L'uso del modello addestrato: calcolare la funzione su un nuovo ingresso. Il modello non impara più. | Il ciclo di generazione |
| Token | L'unità su cui lavora il modello: un pezzo di testo di lunghezza variabile preso da un vocabolario fisso. Parole comuni: un token. Parole rare: più token. | Vocabolario |
| Vocabolario | L'insieme fisso di token (30.000 a 200.000) costruito prima dell'addestramento fondendo le coppie di caratteri più frequenti. Include token speciali come EOS. | Tokenizer |
| Tokenizer | Il componente che spezza il testo in token e converte ogni token nel suo indice numerico, e viceversa all'uscita. Fuori dal modello. | Codice di inferenza |
| EOS | Token speciale che significa fine sequenza. Il modello lo prevede come qualsiasi altro token; il codice lo riconosce e ferma il ciclo. Non è un comando. | Vocabolario |
| Indice | Il numero intero che identifica un token nel vocabolario (es. 23054). Opaco: non contiene le lettere del token. Usato una volta sola, nel lookup. | Ingresso del modello |
| Vettore | Una lista di numeri decimali (4.096 in un modello tipico) che rappresenta un token come posizione in uno spazio a molte dimensioni. È ciò che viaggia tra gli strati. | Nel modello |
| Embedding | Il vettore iniziale di un token, preso dalla tabella embedding tramite lookup sull'indice. Token usati in contesti simili hanno embedding vicini. Uguale in tutte le frasi. | Tabella embedding |
| Spazio | Lo spazio a molte dimensioni in cui vivono i vettori. Il significato sta nella geometria: vicinanza = somiglianza d'uso, direzioni = relazioni. | Concetto |
| Griglia | L'insieme dei vettori di una frase: una riga per token, una colonna per dimensione. Ogni strato la riceve e la restituisce con la stessa forma. Non si assottiglia mai. | Tra gli strati |
| Strato | Un passaggio di calcolo che riscrive ogni riga della griglia. Fa due cose: attention, poi feed-forward. Un modello ne ha decine, ognuno con parametri propri. | Nel modello |
| Attention | Il meccanismo con cui ogni riga guarda le altre righe della griglia e si riscrive come media pesata dei loro vettori. È il cuore del Transformer. | Dentro ogni strato |
| Query | Piccolo vettore prodotto da ogni riga tramite una matrice di parametri: "cosa sto cercando". | Attention |
| Key | Piccolo vettore prodotto da ogni riga tramite una matrice di parametri: "cosa offro". | Attention |
| Pesi di attention | I numeri (es. 0.1, 0.7, 0.2) che dicono quanto una riga guarda ciascuna altra riga. Calcolati sul momento come affinità tra query e key, passata per softmax. Diversi a ogni frase e a ogni strato. Non sono parametri. | Attention |
| Prodotto scalare | Somma dei prodotti posizione per posizione tra due vettori. Misura di allineamento: alto se puntano nella stessa direzione. Usato per query-key e per vettore-uscita. | Calcolo |
| Feed-forward | La seconda parte di ogni strato: una piccola funzione fissa che rielabora ogni riga da sola, senza guardare le altre. Due moltiplicazioni per matrici con una non linearità in mezzo. | Dentro ogni strato |
| Posizione | Informazione sull'ordine dei token aggiunta ai vettori prima del primo strato, perché la griglia di per sé non ha un ordine. | Prima degli strati |
| Matrice di uscita | Matrice con una riga per ogni token del vocabolario. L'ultimo vettore viene confrontato con tutte le sue righe in un'unica moltiplicazione. | Nel modello |
| Logit | Il punteggio grezzo di ogni token, risultato del prodotto scalare tra l'ultimo vettore e la riga corrispondente della matrice di uscita. | Uscita del modello |
| Softmax | Funzione che trasforma una lista di punteggi in probabilità che sommano a 1, esasperando le differenze. Usata sui logit e sui punteggi di attention. | Calcolo |
| Distribuzione | L'uscita del modello: una probabilità per ogni token del vocabolario. Non è una parola scelta, è una direzione nello spazio. | Uscita del modello |
| Campionamento | La scelta di un token dalla distribuzione, fatta dal codice di inferenza. È qui che nasce la variabilità delle risposte. | Codice di inferenza |
| Temperatura | Parametro del codice di inferenza che deforma la distribuzione prima della pesca: bassa esaspera le differenze, alta le appiattisce, zero prende sempre il più probabile. Non tocca i parametri del modello. | Codice di inferenza |
| max\_tokens, stop sequence | Limiti esterni imposti dal codice che fermano il ciclo anche senza EOS. Una risposta troncata a metà frase viene da qui. | Codice di inferenza |
| Scatola nera | L'opacità del modello: ogni calcolo è tracciabile, ma non si riesce a spiegare in termini umani perché i parametri producono quel risultato. Opaco, non imprevedibile. | Concetto |
| Transformer | L'architettura dei modelli attuali: embedding, posizione, decine di strati con attention e feed-forward, matrice di uscita. | Architettura |

## Domande di verifica

Le domande fatte durante la lezione, con le risposte. Rileggile coprendo la risposta e prova a rispondere da solo.

1. Nel riconoscimento dello spam, cosa fornisce il programmatore nel caso classico e nel machine learning? Classico: le regole scritte a mano. Machine learning: esempi etichettati; le regole le trova l'ottimizzazione.
2. Cosa c'è dentro un modello addestrato? Numeri (parametri), non regole leggibili. Una funzione con miliardi di coefficienti.
3. Con temperatura zero e stessa richiesta, mi aspetto la stessa risposta? Sì, in pratica sempre: si prende sempre il token più probabile, nessuna pesca.
4. Cosa produce esattamente il modello a ogni passo? Una distribuzione di probabilità su tutto il vocabolario, non una parola.
5. La temperatura modifica i parametri del modello? No. Vive nel codice di inferenza e deforma la distribuzione prima del campionamento.
6. Se una risposta arriva troncata a metà frase, chi si è fermato? Il codice esterno (limite di token). Il modello si ferma prevedendo EOS a fine risposta completa.
7. Perché lo stesso prompt in italiano costa più token che in inglese? Il vocabolario del tokenizer è stato costruito su testo prevalentemente inglese: token lunghi per l'inglese, corti per l'italiano. Nessuna traduzione interna.
8. Perché un modello sbaglia a contare le lettere di una parola o a invertire una stringa? Riceve indici di token, non caratteri. Ogni operazione sulle lettere la fa per via statistica.
9. Chi ha messo hotel e albergo vicini nello spazio, e in base a cosa? L'ottimizzazione durante l'addestramento, perché i due token servivano a prevedere gli stessi token successivi.
10. Il vettore di hotel è lo stesso in tutte le frasi? Nella tabella embedding sì. All'uscita degli strati no: viene riscritto in base al contesto.
11. "alb" ed "hotel" sono lontani, "albergo" e "hotel" sono vicini: dove è vera ciascuna affermazione? La prima nella tabella embedding (livello del singolo token). La seconda all'uscita degli strati (livello del contesto).
12. Se aggiungo una parola alla frase, cosa cambia nella griglia? Una riga in più. Il numero di colonne e i parametri non cambiano. Le righe esistenti vengono riscritte diversamente perché l'attention vede anche la nuova riga.
13. Perché per prevedere il prossimo token basta l'ultima riga? Perché l'obiettivo è il token successivo all'ultimo. Le altre righe hanno influenzato l'ultima tramite l'attention.
14. Dopo l'ultimo strato la riga di "ho" esiste ancora? Sì. La si ignora in inferenza perché non serve il token successivo a "ho". In addestramento si usa: prevede "prenotato".
15. Come decide il modello i pesi di attention (0.1, 0.7, 0.2)? Non decide, calcola: prodotto scalare tra la query della riga e la key di ciascuna altra riga, passato per softmax. Affinità tra ciò che cerco e ciò che l'altro offre.
16. In "la camera che ho prenotato ieri sera a Roma era", quale token riceve molto peso da "era"? "camera", il soggetto. Roma è più vicina ma non serve: la distanza nella frase non è il criterio.
17. Perché l'ultimo vettore può essere vicino sia a hotel che ad albergo? Perché non è il vettore di una parola: è una direzione verso una regione dello spazio dove stanno più token simili.

**Prossimo argomento:** l'addestramento. Domanda di apertura da tenere a mente: cosa significa, per un modello, sbagliare durante l'addestramento, dato che l'uscita è una distribuzione di probabilità e non una risposta?
