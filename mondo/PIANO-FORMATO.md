# Il piano per portare gli episodi al formato nuovo
### 28 ottobre 2026 · deciso · realizzato il 28 ottobre 2026 (branch `claude/product-accessibility-evaluation-82ce0a`)

Il formato nuovo è quello del prologo (commit `170d469`): la storia parte da qualcosa che riguarda chi usa una chat,
il parco di Ada è dichiarato un giocattolo, e dopo il cartello Fine c'è la coda «Sotto il luna park», sul quaderno,
con i nomi veri delle cose che l'episodio ha mostrato. Le regole sono in CLAUDE.md e nel §6 del soggetto.

## Cosa si fa a ogni episodio, sempre nello stesso ordine

1. **La coda nella sceneggiatura**: quattro o cinque battute del narratore, al massimo un minuto. Nomina solo quello
   che l'episodio ha mostrato, una cosa per volta; può richiamare al massimo un nome già dato in un episodio
   precedente. L'ultima battuta dice cosa cambia per chi usa una chat (soggetto §2): è la frase che chi guarda porta via.
2. **La scena `coda`** (`scene-coda.js`, musica in `score.js`, `dur` in `scenes.json`), sul modello del prologo e
   dell'episodio 1: schizzi a matita delle cose nominate, con il nome scritto a mano accanto. Lavoro meccanico da
   specifica: lo fa un subagente su un modello economico, episodi diversi in parallelo (i file non si toccano).
3. **La verifica**: fotogrammi di inizio, centro, fine e di ogni battuta della coda; `tempi.py` e `controlla.mjs`.
4. **Un commit per episodio**, con la durata aggiornata nella sceneggiatura e nel README.

La voce narrante è arrivata dopo, con `strumenti/voce.py`, una passata per episodio, coda compresa (le regole sono in
CLAUDE.md, «La voce narrante»). Le aperture delle storie non si riscrivono: dove la domanda di partenza è già della chat
(episodi 3, 4, 7, 11, 12, 13, 14) non serve; dove parte dal luna park (2, 5, 6, 8, 9, 10, 15) ci pensa l'ultima
battuta della coda a riportarla alla chat. Riscrivere le aperture è un lavoro a parte, da decidere episodio per episodio.

## L'ordine e i nomi

Si va in ordine di numero, perché ogni coda nomina solo cose nuove e i nomi si accumulano. La colonna dei nomi è
quella realizzata, un commit per episodio; il richiamo è tra parentesi. Le code durano da 41 a 48 secondi: la
battuta finale, quella per chi usa una chat, è la più lunga e decide la durata. Nel 12 il nome è al singolare,
«strumento», perché la storia mostra una teleferica sola.

| Ep | Cosa ha mostrato | Nomi veri nella coda | Per chi usa una chat |
|---|---|---|---|
| 1 | fili, scambi, finestre | **attenzione**, **strati** (richiamo: le probabilità cambiano finestra dopo finestra) | la risposta si costruisce a tappe, non c'è un momento in cui «capisce» |
| 2 | stessa parola, compagni diversi | **contesto**, **embedding** (il vestito con cui un biglietto sale) | la stessa domanda, con altre parole intorno, dà un'altra risposta |
| 3 | la manopola | **campionamento**, **temperatura** | perché due volte la stessa domanda non dà la stessa risposta, e perché a volte «inventa di più» |
| 4 | la banchina | **finestra di contesto** (richiamo: il treno non ricorda, rilegge) | perché in una chat lunga dimentica l'inizio |
| 5 | i treni di prova, il brivido | **addestramento**, **parametri** (gli scambi piegati) | non impara da te mentre ci parli: la pista è fissata |
| 6 | la parola nuova a pezzi | **tokenizzazione**, **sottoparole** (richiamo: token) | le parole rare e i nomi inventati li vede a pezzi |
| 7 | la paperella Fine | **token di fine** | la risposta finisce perché è stata pescata una fine, non perché «ha finito di pensare» |
| 8 | la domanda su una cosa che non c'è | **allucinazione** | una risposta sicura non è per questo vera: la vasca è sempre piena |
| 9 | il parco immenso | **modello di grandi dimensioni (LLM)**, **vocabolario** (richiamo: parametri) | la tua chat fa il giro in un parco così |
| 10 | la frase del parco, le bandierine | **prompt di sistema**, **ruoli** | prima del tuo messaggio ce n'è uno che non vedi, e pesa |
| 11 | il Bruco | **classificatore**, **filtro** | le risposte «già pronte» non le decide il modello |
| 12 | la teleferica | **strumenti**, **chiamata di funzione** | quando cerca o calcola fuori, il risultato lo porta come qualunque parola |
| 13 | la campanella | **limite di token**, **troncamento** | una risposta a metà frase non è un errore del modello |
| 14 | il telone | **ragionamento nascosto**, **catena di pensiero** | l'attesa prima della risposta sono giri che non vedi |
| 15 | il parco gemello | **applicazione** (il parco intorno alla montagna), **stesso modello** | due prodotti con lo stesso modello rispondono diversi |

## Le tre cose decise prima di cominciare (28 ottobre 2026)

1. **La scena «nomi» degli episodi 9 e 15.** Oggi i nomi veri entrano nella storia solo lì (soggetto §7 regola 12 e
   le due frasi nelle leggi del luna park). Con le code, quelle scene ripetono quello che la coda fa meglio.
   Deciso: i nomi veri stanno **solo nelle code**, anche nel 9 e nel 15. La scena «nomi» del 9 (0:50) diventa la
   scena della scala, senza nomi, e tiene la frase da lasciare nella scena «quaderno»; la scena «nomi» del 15 (0:56)
   si accorcia a un confronto tra i due parchi, senza nomi. Si cambiano il soggetto, la scaletta («9 … dà i nomi veri»)
   e CLAUDE.md (fatto); le scene «nomi» sono riscritte senza nomi (commit del 9 e del 15).
2. **La coda dell'episodio 1** si riscrive per prima (fatto, `74ca967`): diceva modello di linguaggio, attenzione, strati, probabilità,
   scelta; modello e probabilità sono del prologo, la scelta è dell'episodio 3. Restano attenzione e strati.
3. **I nomi della tabella** sono approvati; se uno cambia strada facendo, si corregge prima qui.

## Cosa resta fuori

- Le aperture delle storie (vedi sopra).
- La pagina «La chiave» sul sito (scenario B): le code ci sono tutte, si può decidere.
- Il player: la coda deve essere un capitolo a sé (CLAUDE.md); da verificare che l'elenco delle scene lo faccia già.
- Le scene «nomi» del 9 («In grande») e del 15 («I due parchi») tengono la durata di prima: il piano diceva di
  accorciarle, ma camera e musica non sono cambiate; con la voce le battute ci stanno, e restano così.
