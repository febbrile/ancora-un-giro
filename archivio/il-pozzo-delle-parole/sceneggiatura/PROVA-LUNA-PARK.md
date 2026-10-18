# Prova · Il prologo nel luna park
### Da leggere accanto al prologo del pozzo in [TRATTAMENTO.md](TRATTAMENTO.md) · 19 ottobre 2026

Stessa storia, stessi personaggi, un altro mondo. Serve a capire quale dei due regge meglio, prima di scrivere le fondamenta del soggetto.

---

## Prologo · Premi invio

*Circa 2 minuti.*

È sera. Qualcuno, seduto sul divano, scrive sul telefono l'inizio di una storia: *Al mare Emma*. Chiede all'intelligenza artificiale di continuarla e preme invio.

«In quell'istante, la frase parte per un viaggio.»

Le parole si staccano dallo schermo e diventano una striscia di carta, che vola via sopra i tetti, sempre più lontano, fino a un luna park acceso nella notte. In mezzo alle giostre c'è una montagna russa enorme. I binari salgono, scendono, si attorcigliano, e poi spariscono dentro una montagna scura.

Alla stazione della montagna russa lavora **Ada**, una piccola scienziata con un camice troppo lungo e un quaderno sempre sotto il braccio. La striscia di carta le atterra in mano. Ada la legge ad alta voce: «Al mare Emma… e poi?». Per scoprirlo c'è una sola strada: un giro sulla montagna russa.

Ada infila la striscia nello **Spezzaparole**, una vecchia biglietteria con una grande forbice. *Zac, zac*: la striscia diventa tre biglietti, «Al», «mare», «Emma».

I biglietti volano verso il trenino fermo in stazione e, appena toccano i sedili, prendono vita. **Al** è un sassolino tondo e silenzioso. **Mare** è un'onda con gli occhi. **Emma** è una bambina fatta di luce, bionda, con un fermaglio a stellina tra i capelli. Si siedono in fila, uno dietro l'altro: Al davanti, poi Mare, ed Emma nell'ultimo vagone. La sbarra di sicurezza si abbassa.

Ada sul trenino non sale mai. Il treno parte da solo, senza nessuno alla guida. Sale piano, scende di colpo, fa una curva, e sparisce dentro la montagna. Da fuori si sentono soltanto il rumore delle ruote e, ogni tanto, il *clac* di qualcosa che scatta nel buio.

Accanto ai binari c'è la bancarella della pesca, con una vasca d'acqua vuota. Il treno esce dalla montagna proprio sopra la vasca e, mentre passa, nell'acqua cadono paperelle colorate: tantissime di un colore, parecchie di un altro, poche di tutti gli altri. Poi il treno scivola in stazione e si ferma.

Ada si avvicina alla vasca e pesca una paperella senza guardare. Una luce blu le illumina il viso. Le altre paperelle scivolano via dallo scarico, e la vasca torna vuota.

La paperella le salta di mano, corre lungo il binario e si siede in un vagone nuovo, dietro Emma. Sul telefono, la storia cresce di una parola. La sbarra si abbassa e il treno riparte, un vagone più lungo. Una parola alla volta, il treno si allunga e la storia sul telefono cresce.

Ada guarda la montagna buia in cui il treno sparisce ogni volta.

«La vasca si riempie sempre. Ma cosa succede, là dentro?»

Titolo: **Il pozzo delle parole**. *(Il titolo della serie andrà ripensato.)*

---
---

# Note per noi

## Cosa guadagniamo rispetto al pozzo
- **Il giro è nella natura della giostra.** Il treno torna in stazione, sale il passeggero nuovo e riparte. Nel pozzo serviva un nastro che risaliva.
- **Il passeggero nuovo è la parola pescata.** Non torna dallo Spezzaparole: sale direttamente sul treno, come il token campionato che si aggiunge alla sequenza.
- **L'ordine si vede da solo**: chi sta davanti e chi sta dietro. Il numero cucito sulla schiena non serve più.
- **Viaggiano insieme davvero**, seduti nello stesso treno: lo scambio di colori tra vicini di posto viene naturale.
- **Nessuno guida**: il «non sceglie» si sente nella pancia.
- **La montagna buia** dà l'opacità. Ada vede entrare e uscire il treno, e sente i *clac*.
- **La pesca alla bancarella** è un gioco vero dei luna park, e la vasca si svuota a ogni giro, come la distribuzione che si ricalcola.
- **Il luna park è un mondo largo**, con spazio per molti episodi.

## Corrispondenze
| Nel luna park | Nel modello |
|---|---|
| Il telefono, la striscia, Ada alla stazione | Il programma intorno al modello |
| Lo Spezzaparole (biglietteria) | Tokenizer, fuori dal modello |
| I biglietti che prendono vita sul sedile | Embedding |
| La fila dei vagoni | L'ordine dei token (posizione) |
| La montagna russa e le sue gallerie | Il modello, i suoi strati, la sua opacità |
| Il treno che parte da solo | Calcolo senza volontà |
| Le paperelle nella vasca | Distribuzione (softmax) |
| Ada pesca senza guardare | Campionamento, fuori dal modello |
| La paperella che sale nel vagone nuovo e il treno che riparte | Il token aggiunto e il ciclo autoregressivo |

## Rischi da risolvere nell'episodio 1 (dentro la montagna)
1. **Gli scambi non devono sembrare regole scritte.** Niente codici da leggere: lo scambio scatta da solo, a seconda di com'è fatto il vagone che passa. Tutti i treni attraversano **tutti** i tratti della pista; uno scambio sposta di poco, verso un binario vicino in un fascio larghissimo, e non porta mai su una linea che salta un tratto.
2. **Ogni vagone ha il suo scambio.** Una correzione a quello che ho detto ieri: non è tutto il treno a far scattare uno scambio. Nel modello ogni token riceve il suo spostamento. Il treno conta in un altro modo: nel tratto prima dello scambio, Emma riceve i colori dei vicini di posto, e il suo scambio scatta così perché lei ora porta un po' di Mare. Al parco, con un altro vicino, scatterebbe diversamente. Visivamente servono vagoni che corrono ciascuno sul suo binario dentro il fascio: va disegnato con cura.
3. **Le paperelle dipendono dall'ultimo vagone.** Sopra la vasca conta solo dove passa l'ultimo vagone: Emma nel primo giro, il passeggero nuovo nei giri dopo.
4. **Le finestre nella montagna.** Tra una galleria e l'altra il treno può passare davanti a finestre aperte sul paesaggio, una spiaggia o un molo, che somiglia al colore di Emma in quel momento. Sono le stanze del pozzo (logit lens), e diventano finestre vere.
5. **Da dove viene la pista** (per una puntata futura). Non l'ha disegnata nessuno: per anni ci sono passati milioni di treni carichi di frasi, a ogni passaggio i binari si sono piegati un pochino, poi la pista è stata fissata. Non va mai detto che degli ingegneri hanno progettato le strade.

## Cosa perdiamo
- **Il nome e l'immagine del pozzo**: titolo, sito e personaggi della tela andranno rivisti.
- **La caduta**, che diceva «non scegliere» con la gravità. Qui lo dice il treno senza guidatore, e funziona allo stesso modo.
- **Il lavoro già prodotto** per i film Motion del pozzo. I personaggi si salvano tutti.
