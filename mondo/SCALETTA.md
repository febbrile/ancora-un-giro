# Ancora un giro · La scaletta della prima stagione
### 19 ottobre 2026

Per ogni episodio: l'argomento, la domanda di Ada che lo apre, l'unico elemento nuovo che porta nel luna park e l'idea
da sviluppare. La sceneggiatura nasce da qui, ma solo quando arriva il suo turno: un elemento nuovo entra nelle leggi
del [soggetto](SOGGETTO.md) quando il suo episodio viene scritto, non prima.

Ogni episodio usa solo elementi già presentati e si chiude da solo. La domanda con cui finisce apre l'episodio dopo.

## L'ordine

- **Prologo e 1** mostrano il giro intero, da fuori e da dentro.
- **2 e 3** completano il giro: cosa cambia la vasca, cosa fa la pesca.
- **4 e 5** rispondono alle due paure più diffuse: «si ricorda di me» e «impara da me».
- **6 e 7** guardano i due bordi del giro: come comincia una frase e come finisce.
- **8** usa quello che si è visto per raccontare un errore che tutti hanno incontrato.
- **9** chiude la stagione e dà i nomi veri.

---

## 2 · Al parco

- **Argomento**: il contesto. La stessa parola, con compagni diversi, porta a esiti diversi.
- **Domanda di Ada**: «E se al posto del mare ci fosse un parco?» (chiude l'episodio 1).
- **Elemento nuovo**: Parco, l'alberello con gli occhi, compagno di viaggio di Emma.
- **Idea**: partono due treni identici tranne un vagone, Mare in uno e Parco nell'altro. Emma sale rosa su entrambi:
  dal primo esce blu e la vasca si riempie di paperelle blu, dal secondo esce verde e la vasca si riempie quasi tutta di «gioca».
  Ada pesca e la storia va al parco.
- **Chiude con**: Ada pesca una seconda volta dalla stessa vasca, ed esce una paperella diversa.
- **Sotto**: attention con un contesto diverso. Emma sale con lo stesso colore ed esce con un colore diverso.
  La frase «Al parco Emma» va calcolata nel modellino prima di scrivere la sceneggiatura.

## 3 · La stessa vasca

- **Argomento**: il campionamento. Stessa frase, stessa vasca; la pesca cambia.
- **Domanda di Ada**: «Perché non esce sempre la stessa paperella?»
- **Elemento nuovo**: la manopola della bancarella.
- **Idea**: tre persone mandano la stessa frase e la vasca si riempie tre volte uguale. Ada pesca alla cieca e nascono
  tre storie diverse. Girata da un lato, la manopola lascia nella vasca quasi solo il colore più forte; dall'altro
  i colori si pareggiano e le storie diventano strane. Quello che è pescato resta pescato: il treno non torna indietro.
- **Chiude con**: la persona legge la risposta e scrive ancora.
- **Sotto**: la vasca è la distribuzione, deterministica; la manopola è la temperatura e sta fuori dalla montagna,
  come la pesca. Generazione autoregressiva: nessuna parola già uscita viene corretta.

## 4 · Il treno che ricorda

- **Argomento**: la conversazione. Tra un messaggio e l'altro non resta niente: ogni volta si rilegge tutto.
- **Domanda di Ada**: «Come fa il treno a sapere di cosa parlavamo prima?»
- **Elemento nuovo**: la banchina, che ha una lunghezza fissa.
- **Idea**: al secondo messaggio arriva alla stazione una striscia lunghissima, con dentro tutta la chat di prima,
  risposte comprese. Il treno non si ricorda niente: ci risalgono tutti, ogni volta. Quando la chat è troppo lunga,
  i vagoni più vecchi non stanno sulla banchina e restano giù: il treno parte senza di loro.
- **Chiude con**: Ada guarda la pista e si chiede chi l'abbia fatta così.
- **Sotto**: tutta la conversazione è il contesto; nessuno stato tra una chiamata e l'altra; la banchina è la finestra di contesto.
  Come si distingue chi ha detto cosa resta fuori (vedi i rimandi).

## 5 · Chi ha costruito la pista

- **Argomento**: l'addestramento, e la pista che dopo resta fissa.
- **Domanda di Ada**: «Chi ha costruito una pista così?»
- **Elemento nuovo**: i treni di prova, prima che il parco aprisse.
- **Idea**: si torna indietro nel tempo. Di notte girano, senza fine, treni carichi di frasi vere; la parola dopo
  è già scritta sulla loro striscia. Quando la vasca dà poche paperelle di quel colore, la pista si piega un poco
  perché la volta dopo ne dia di più. Nessuno la piega con le mani, e nessuna frase resta nella montagna.
  Poi la pista si fissa: oggi, mentre tu scrivi, non si piega più.
- **Chiude con**: sulla striscia arriva una parola che nessun treno di prova ha mai portato.
- **Sotto**: addestramento sulla parola successiva e parametri fissi durante l'uso. Vanno evitati con cura gli errori
  «qualcuno ha scritto le regole» e «cerca in un archivio».

## 6 · Lo Spezzaparole

- **Argomento**: la tokenizzazione.
- **Domanda di Ada**: «Perché quella parola è salita in tre vagoni?»
- **Elemento nuovo**: la parola nuova, che lo Spezzaparole non ha mai visto intera.
- **Idea**: un bambino scrive un nome che ha inventato. Lo Spezzaparole lo taglia nei pezzi che conosce, e il treno
  si allunga di tre vagoni per una parola sola, ognuno con il suo vestito. Le parole di tutti i giorni salgono
  intere, quelle strane a pezzi. Qui trova posto la parola lunghissima che nel primo trattamento era fuori contesto.
- **Chiude con**: la risposta va avanti, giro dopo giro, e Ada si chiede quando finirà.
- **Sotto**: tokenizer a pezzi di parola, fuori dalla montagna. I pezzi frequenti sono interi, quelli rari spezzati.

## 7 · Come finisce la storia

- **Argomento**: il segnale di fine.
- **Domanda di Ada**: «Il treno potrebbe girare per sempre?»
- **Elemento nuovo**: la paperella «Fine».
- **Idea**: c'è sempre stata, rara, in fondo alla vasca, già nel prologo. Giro dopo giro, quando la frase si completa,
  di paperelle «Fine» ne cadono sempre di più. Ada ne pesca una: le luci si spengono, e la risposta arriva sul telefono.
- **Chiude con**: Ada si chiede che cosa succede se la frase chiede una cosa che la pista non ha mai incontrato.
- **Sotto**: EOS è un token come gli altri e nasce nella stessa vasca. Il troncamento per lunghezza è un'altra cosa,
  fuori dalla giostra: è rimandato.

## 8 · La paperella sbagliata

- **Argomento**: le allucinazioni.
- **Domanda di Ada**: «E se nessun treno di prova ha mai portato la risposta?»
- **Elemento nuovo**: una domanda su qualcosa che non esiste, come il nome del cane di Emma.
- **Idea**: la vasca si riempie lo stesso, con paperelle che suonano bene. Nessuna paperella sa se è vera, nella
  montagna non c'è niente da controllare, e Ada pesca con la sicurezza di sempre. Il telefono risponde con un nome.
- **Chiude con**: Ada guarda lontano e vede, oltre le colline, le luci di un altro parco.
- **Sotto**: la distribuzione è sempre piena: misura cosa è probabile, non cosa è vero. Si appoggia agli episodi 5 e 6.

## 9 · Il parco più grande del mondo

- **Argomento**: i modelli veri, e i nomi veri.
- **Domanda di Ada**: «Che cosa c'è laggiù?»
- **Elemento nuovo**: il parco immenso.
- **Idea**: montagne una dietro l'altra, migliaia di scambi, vasche grandi come laghi. Ma il giro è lo stesso.
  Alla fine, come premio, arrivano le parole vere: token, modello, probabilità, addestramento. Ada chiude il quaderno
  sulla frase da lasciare.
- **Sotto**: è l'unico episodio in cui si fanno confronti con i modelli veri (regola 12 del soggetto).

---

## Rimandi

Idee buone che non entrano in questa stagione, perché porterebbero un secondo elemento nuovo o non servono ancora:

- **Il custode che chiude il parco** a un'ora fissa, a metà frase: il troncamento per lunghezza.
- **I messaggi che non hai scritto**: biglietti che la chat aggiunge alla striscia per dire chi parla e come comportarsi.
- **Perché la pista è fatta così**: nessuno sa dirlo a parole. Può diventare un episodio su ciò che nemmeno Ada riesce a vedere.
