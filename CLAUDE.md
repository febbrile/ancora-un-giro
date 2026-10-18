# Il pozzo delle parole: regole di lavoro

Un cartone animato a episodi che spiega come un LLM sceglie il prossimo token.
Deve piacere a un bambino come fiaba ed essere corretto per un adulto. Le due cose non si scambiano mai:
se una scena è bella ma scientificamente sbagliata, si riscrive.

## Come si lavora

- **Si parla in italiano**, nei messaggi, nei testi dei film, nei commenti e nei commit.
- **Prima la sceneggiatura, poi la produzione.** Ogni cambiamento di storia, ritmo o numeri passa prima da
  [sceneggiatura/SCENEGGIATURA.md](sceneggiatura/SCENEGGIATURA.md); solo dopo l'approvazione si toccano i film.
- **Le idee nuove si discutono prima di metterle in sceneggiatura**: proponi, spiega il perché, aspetta il sì.
- Quando l'utente chiede di scegliere, proponi poche alternative (di solito tre) e indica la tua preferita.
- Prima di dire che una scena è a posto, **guardala**: rendi i fotogrammi e leggili (vedi "Verifica").

## Ritmo e sottotitoli

- **Al massimo 12 caratteri al secondo** di sottotitolo mentre una voce parla. Il pubblico include bambini.
- **Almeno 3 secondi di sole immagini in ogni scena**: servono anche per leggere il monitor di Ada.
- Ada legge ad alta voce **un solo numero** per volta; gli altri restano sul monitor.
- Ogni scena deve rispettare `durata ≥ parlato/12 + monitor/15 + 3 s`: controllalo con `python3 strumenti/tempi.py`
  dopo ogni modifica alla sceneggiatura.
- Un episodio dura **al massimo 5 minuti** (limite dei film Motion). Meglio un episodio in più che uno troppo pieno.
- I sottotitoli **scorrono a pezzi** di 18–48 caratteri (`chunkSub` in `shared.js`).
  Un pezzo **non finisce mai** con un articolo, una preposizione, una congiunzione o una parola con apostrofo:
  "con un" apre il pezzo dopo, non chiude quello prima.

## Regole scientifiche

1. Il pozzo **non decide, non sceglie, non vuole: calcola**.
   - Verbi ammessi: calcola, sposta, misura, confronta, si accende, indica, mescola.
   - Verbi vietati: decide, sceglie, pensa, capisce, vuole, sa.
2. Tokenizer (lo Spezzaparole) e campionamento (Ada che pesca) stanno **fuori** dal pozzo.
3. Dentro il pozzo non ci sono lettere, solo numeri.
4. Gli strati **spostano** il vettore: `x = x + Δ` (connessione residua). Mai "riscrivono" o "trasformano Emma".
5. Le stanze sono **letture** (logit lens): "cosa verrebbe dopo se il pozzo finisse qui", non tappe obbligate.
6. In uscita si usa solo l'ultima riga. L'uscita è una direzione, non una parola: Emma non *diventa* "nuota".
7. Stessa frase, stesso secchio (deterministico); la pesca varia; il "perché" dei numeri resta opaco.
8. EOS è un token come gli altri; una frase troncata è opera di max_tokens, fuori dal pozzo.
9. Due tipi di pesi: i **parametri** (pietra, fissi) e i **pesi di attention** (luce, calcolati ora).
10. **Le coordinate non hanno un nome.** Le righe delle carte sono semi neutri (♠ ♥ ♦, poi ♣ e altri):
    nessuna riga vuol dire "acqua" o "nome". Conta solo quanto due carte si somigliano.
    Nessuna parola giocattolo è allineata a un asse.
11. Il colore del vestito di Emma viene **dai vicini** (le parole a cui somiglia), non da una singola riga.
12. **Parliamo solo del nostro modellino.** Niente confronti con «i modelli veri» (piani, parole, dimensioni):
    aprono collegamenti che andrebbero spiegati. L'unica eccezione è l'episodio 4, dedicato proprio a questo.

## Le metafore fissate

- **Prodotto scalare = partita a carte.** Ognuno mette una carta sul tavolo; si confrontano seme per seme,
  ogni coppia dà una pastiglia (prodotto), le pastiglie si sommano in un **gettone** (dorato se positivo,
  grigio se negativo). Si dice "prodotto scalare", mai "prodotto cartesiano".
- Attention: lanterna (query) e cartello (key) sono carte; i gettoni diventano **quote** (softmax);
  con le quote si compone la **nuova carta** di Emma.
- Uscita: la stessa partita a carte, giocata con ogni campana del fondo.
- Distribuzione = secchio di palline; temperatura = termostato di Ada; logit lens = periscopio.

## Personaggi

- **Emma**: bambina fatta di luce, **bionda, capelli mossi fin sopra le spalle, non spettinati**, fermaglio a
  stellina sulla frangia. Il vestito ha il colore del suo vettore.
  Quando uno strato la sposta usa la posa **"tirata via"** (una forza invisibile la tira: lei va avanti, capelli,
  braccia e vestito restano indietro). **Niente frecce** disegnate su di lei.
- **Ada**: piccola scienziata col camice lungo, fuori dal pozzo. Osserva, misura, annota, pesca.
  **Non spinge mai Emma** e non tocca niente dentro il pozzo.
- Compagni: **Al** sassolino, **Mare** onda con gli occhi, **Parco** alberello con gli occhi.
- I modelli dei personaggi sono in [personaggi/](personaggi/) (tela Design): ogni cambio di aspetto parte da lì.

## I numeri

- Tutti i numeri sono **giocattolo ma coerenti**: inventati solo dove la sceneggiatura lo dichiara
  (embedding, righe di U, spostamenti Δ, lenti), tutto il resto si ricava con i calcoli veri.
- **Un'unica fonte**: [strumenti/numeri.py](strumenti/numeri.py). Se cambi un numero, cambialo lì, esegui
  `python3 strumenti/numeri.py` e solo dopo copialo in sceneggiatura e nelle scene.
- Le somme mostrate a schermo devono tornare **con i termini arrotondati** che si vedono (es. 0.90 − 0.06 + 0.51 = 1.35).

## I film (artifact Motion)

- Ogni episodio è un artifact Motion su claude.ai (link nel [README](README.md)). La versione pubblicata vive nello
  **store dell'artifact**; `episodi/` ne è la copia di sorgente.
- Documenti dello store: `film/meta`, `film/script` (`window.CUT = kit.scenes();`), `modules/scenes.json`,
  `modules/base.css`, `modules/shared.js`, `modules/score.js`, `modules/scene-<id>.js`.
  `modules/fetched-fonts.json` lo gestisce il player: non toccarlo.
- Ogni scrittura su un documento esistente porta `if_version`. **Modifiche allo stesso documento una alla volta**,
  mai in parallelo. In `str_replace` usa il testo decodificato (virgolette e accenti veri), non quello con escape JSON.
- Dopo ogni modifica allo store, riallinea il file in `episodi/` e fai commit.
- Testi SVG: font Fredoka per le scritte, JetBrains Mono per i numeri; la regola in `base.css` li forza.
- Ogni scena è `kit.scene(id, { init, render(t) })`; i tempi interni usano `seg`, `eo`, `eio`.

## Verifica

- Per guardare un episodio: renderer offline (`render.mjs` con playwright-core e il Chrome dell'utente), che
  scrive un PNG per ogni tempo richiesto. **Leggi i PNG** prima di dichiarare una scena finita.
  Nel renderer offline i font sono sostitutivi: dillo quando la verifica è avvenuta solo lì.
- Controlla in particolare: testi che escono dal riquadro, etichette sovrapposte, sottotitoli in anticipo o in
  ritardo sulle immagini, elementi coperti.

## Repository

- `sceneggiatura/` la sceneggiatura · `episodi/NN-titolo/` i film · `personaggi/` la tela · `strumenti/` script.
- Commit in italiano, uno per passo logico (sceneggiatura, numeri, singolo episodio).
