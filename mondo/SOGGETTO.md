# Ancora un giro · Il soggetto
### Le fondamenta · bozza 2, 19 ottobre 2026

Questa pagina viene prima di tutto il resto. Ogni personaggio, luogo, episodio o regola nuova deve poterci stare sopra.
Se una scelta futura contraddice questa pagina, si cambia la scelta, oppure si discute e si cambia prima questa pagina.

---

## 1. La frase da lasciare

Alla fine della serie, chi guarda deve saper dire con parole sue:

> **Una macchina che non pensa calcola, un pezzo alla volta, quanto è probabile ogni parola che può venire dopo. Se ne pesca una, e si ricomincia.**

Tutto il resto è dettaglio. Un episodio che non avvicina lo spettatore a questa frase non serve.

## 2. A chi parliamo

A una persona comune, che usa una chat di intelligenza artificiale e non sa cosa succede dopo l'invio. Guardano anche i bambini.
Non diamo per scontato niente: nessuna parola tecnica, nessuna formula, nessun numero da leggere.
La storia è una sola e la seguono tutti allo stesso modo. Il rigore scientifico c'è, ma sta **sotto** il racconto e non si vede.

## 3. Il mondo: il luna park

Di notte, da qualche parte dietro lo schermo, c'è un luna park acceso. In mezzo alle giostre c'è una montagna russa enorme, che sparisce dentro una montagna buia.

Ogni volta che qualcuno scrive e preme invio, la sua frase arriva lì e fa un giro sulla montagna russa. A ogni giro la frase si allunga di una parola, finché la risposta è finita.

### Come funziona il luna park
Sono le leggi fisiche del nostro mondo. Valgono in ogni episodio, anche quando non si vedono.

- **La biglietteria.** Alla stazione, lo **Spezzaparole** strappa la frase in biglietti, uno per pezzo. Sta fuori dalla montagna.
- **I passeggeri.** Ogni biglietto prende vita sul sedile e diventa un passeggero, con un vestito di luce del suo colore. Lo stesso pezzo ha sempre lo stesso vestito quando sale.
- **La fila.** I passeggeri siedono in vagoni uno dietro l'altro, nell'ordine della frase. L'ultimo vagone è quello dell'ultimo pezzo.
- **Nessuno guida.** Il treno parte da solo. La pista lo porta, e nessuno sul treno o fuori dal treno decide dove va.
- **La pista è fissa.** Non cambia da un giro all'altro e non cambia per nessuno. Lo stesso treno, con gli stessi passeggeri, fa sempre lo stesso identico giro.
- **Dentro la carrozza.** Sulle montagne russe si guarda sempre avanti. Da ogni passeggero partono fili di luce verso chi gli siede davanti, e verso sé stesso, mai verso chi sta dietro. Lungo i fili scorrono i colori: Emma, nell'ultimo vagone, prende qualcosa da tutti; Al, davanti, solo da sé.
- **Il fascio di binari.** Ogni vagone corre sul suo binario, dentro un fascio larghissimo di binari paralleli. Gli scambi scattano da soli, a seconda di com'è fatto il vagone che passa, e lo spostano di poco verso un binario vicino. Mentre si sposta, il vestito del passeggero cambia colore. Tutti i vagoni attraversano tutti i tratti della pista: nessuno ne salta uno.
- **La montagna è buia.** Da fuori si vedono il treno che entra e il treno che esce, e si sentono i *clac* degli scambi. Ogni tanto la montagna ha una finestra, da cui si vede un paesaggio che somiglia al colore dei passeggeri in quel momento.
- **La vasca.** Il treno esce dalla montagna sopra la vasca della pesca. Conta solo dove passa l'ultimo vagone: da lì cadono nell'acqua le paperelle, tantissime di un colore, parecchie di un altro, poche di tutti gli altri. Ogni colore è una parola.
- **La pesca.** Ada pesca una paperella senza guardare. Le altre scivolano via dallo scarico e la vasca torna vuota.
- **Ancora un giro.** La paperella pescata sale in un vagone nuovo, in fondo al treno, e il treno riparte, un vagone più lungo.
- **Si riparte dai biglietti.** Quando il treno rientra in stazione, ogni vestito torna del colore del suo biglietto. A ogni giro i colori si rifanno da capo, e con gli stessi passeggeri tornano uguali.
- **Da dove viene la pista.** Non l'ha disegnata nessuno. Per moltissimo tempo ci sono passati milioni di treni carichi di frasi, e a ogni passaggio i binari si sono piegati un pochino. Poi la pista è stata fissata, e da allora non cambia più.

### Personaggi
- **Ada**: piccola scienziata col camice troppo lungo, gli occhiali tondi e il quaderno. Lavora alla stazione e alla bancarella della pesca. **Non sale mai sul treno e non tocca niente dentro la montagna.** Guarda, ascolta, annota, pesca.
- **Lo Spezzaparole**: vecchia biglietteria con una grande forbice.
- **Emma**: bambina fatta di luce, bionda, capelli mossi fin sopra le spalle, fermaglio a stellina. Il vestito ha il colore dei suoi vicini.
- **Al** (sassolino) e **Mare** (onda con gli occhi): i suoi compagni di viaggio nella prima frase. Nelle altre frasi ne arrivano altri.
- **Le paperelle**: una per ogni parola che può venire dopo. Quella pescata diventa un passeggero.

## 4. Le proprietà che il mondo deve avere

Il luna park deve contenere da sé, per come funziona, ciascuna di queste cose, senza bisogno di spiegarle.

| Proprietà | Nel luna park | Nel modello |
|---|---|---|
| Una parola alla volta, poi si ricomincia | Il treno torna in stazione, sale il passeggero nuovo, si riparte | Generazione autoregressiva |
| I pezzi, tagliati fuori | La biglietteria alla stazione | Tokenizer, fuori dal modello |
| Una struttura fissa, a cui qualcosa ha dato forma | La pista piegata dai passaggi, poi fissata | Parametri, addestramento |
| Movimento senza volontà | Il treno senza guidatore | Calcolo, non decisione |
| Tutti insieme, in ordine | La fila dei vagoni | Sequenza e posizione |
| Ognuno tiene conto di chi viene prima | Fili di luce verso chi siede davanti: sulle montagne russe si guarda avanti | Attention causale |
| Tappe uguali per tutti, che spostano | Gli scambi nel fascio di binari | Strati, feed-forward, connessione residua |
| Un interno che da fuori non si vede | La montagna buia | Opacità |
| Tante possibilità, non una risposta | Le paperelle nella vasca | Distribuzione di probabilità |
| L'estrazione avviene fuori | Ada pesca alla bancarella | Campionamento, fuori dal modello |

## 5. Il motore della serie: la curiosità di Ada

Emma non vuole niente: viene portata, e deve essere così. Chi vuole qualcosa è **Ada**: vuole capire cosa succede dentro la montagna. È la stessa domanda dello spettatore.

Ogni episodio è un **mistero** che Ada indaga da fuori, con i suoi strumenti, senza mai entrare. Ogni episodio:
- parte da una domanda di Ada, nata da qualcosa che ha visto o sentito;
- presenta **un solo elemento nuovo** del mondo;
- usa solo elementi già presentati;
- finisce con una risposta, cioè una storia completa, e magari con la domanda dell'episodio dopo.

Alcuni misteri possibili, come esempio di quello che il motore produce (non è ancora la scaletta):
- Cosa succede dentro la montagna? Il primo viaggio con Emma.
- Perché con «al parco» il treno fa una strada diversa?
- Perché la paperella non è sempre dello stesso colore?
- Perché certe parole arrivano alla biglietteria e ne escono in tanti biglietti?
- Chi ha costruito la pista?
- Come fa la storia a finire?

## 6. Regole di racconto

1. **In scena c'è solo ciò che serve alla trama di questa puntata.** Un concetto che non la fa avanzare aspetta la sua puntata, dove diventerà la storia.
2. **Il narratore racconta, non spiega.** Niente commenti, riassunti, mappe o lezioni.
3. **Si presenta prima di usare.** Nessun personaggio, luogo od oggetto compare senza che lo spettatore sappia chi è o a cosa serve.
4. **Ogni elemento appartiene al luna park.** Domanda di controllo: un bambino che c'è stato lo riconoscerebbe? Niente oggetti messi lì perché servono alla spiegazione.
5. **Niente formule, numeri da leggere o parole tecniche**, a meno che l'episodio non sia dedicato proprio a quella parola, e allora la parola arriva alla fine, come premio.
6. **Ogni episodio è una storia completa**, con una domanda all'inizio e una risposta alla fine.

## 7. Le regole scientifiche, nel luna park

Restano quelle del progetto, tradotte nel nuovo mondo.

1. **La giostra non decide, non sceglie, non vuole: porta.**
   - Verbi ammessi per pista, scambi e montagna: porta, sposta, fa scattare, calcola, accende, mescola, misura.
   - Verbi vietati: decide, sceglie, pensa, capisce, vuole, sa.
2. **Biglietteria e pesca stanno fuori dalla montagna.**
3. **Dentro la montagna non ci sono lettere**: solo colori e luce. Le paperelle non hanno scritte.
4. **Gli scambi spostano, non trasformano.** Emma resta Emma; cambia il colore del vestito.
5. **Le finestre sono letture**: mostrano dove porterebbe il viaggio se finisse lì, non sono fermate obbligate.
6. **Alla vasca conta solo l'ultimo vagone.** L'uscita è un colore, una direzione: Emma non diventa una paperella.
7. **Stesso treno, stesso giro.** La pista è deterministica; la pesca no; perché la pista sia fatta così non lo sa spiegare nessuno a parole.
8. **La Fine è una paperella come le altre.** Una storia troncata è opera di qualcosa fuori dalla giostra.
9. **A ogni giro si riparte dai biglietti**: in stazione ogni vestito torna del colore del suo biglietto.
10. **Due tipi di cose**: quello che è fisso (pista, binari, scambi, colori dei biglietti) e quello che nasce a ogni giro (fili di luce, colori mescolati, paperelle).
11. **I colori non hanno un nome.** Nessun colore vuol dire «acqua» o «nome» da solo: conta solo quanto due colori si somigliano.
12. **Parliamo solo del nostro luna park.** Niente confronti con i modelli veri, salvo un episodio dedicato.
13. **Nella montagna ci sono spostamenti, non probabilità.** Le paperelle nascono solo alla vasca.
14. **Quello che si mostra una volta, si mostra sempre.** Ogni passeggero ha il suo colore, ogni finestra il suo paesaggio, calcolati in [strumenti/modellino.py](../strumenti/modellino.py).

## 8. Gli errori da non suggerire mai

Sono le idee sbagliate più diffuse sull'intelligenza artificiale. Nessuna immagine della serie deve farle venire in mente.

- **«Qualcuno ha scritto le regole o le risposte.»** Per questo gli scambi non leggono codici e la pista non l'ha progettata nessuno.
- **«Cerca la risposta in un archivio.»** Nella montagna non ci sono frasi conservate: c'è solo la pista.
- **«Pensa, capisce, vuole.»** Il treno non ha guidatore.
- **«La risposta è già pronta tutta intera.»** Si fa un giro per ogni parola.
- **«Esiste una sola risposta giusta.»** Nella vasca ci sono tante paperelle, e la pesca può cambiare.

## 9. La prova per ogni elemento nuovo

Prima di mettere qualcosa in sceneggiatura:

1. Serve alla trama di **questa** puntata?
2. Appartiene al luna park?
3. È vero nel modellino? La corrispondenza va scritta nelle note dell'episodio.
4. È stato presentato prima di essere usato?
5. Suggerisce uno degli errori del §8?

Se una risposta è sbagliata, l'elemento non entra.

---

## Questioni aperte

- **Il fascio di binari** va disegnato con cura: vagoni che corrono ciascuno sul suo binario, ma restano un treno.
- **Il nome del repository** è ancora quello di un progetto chiuso: va cambiato su GitHub, insieme al sito pubblicato.

## Gli altri file della serie
- [CLAUDE.md](../CLAUDE.md): le regole di lavoro.
- [strumenti/modellino.py](../strumenti/modellino.py): i colori, le finestre e le paperelle.
- `sceneggiatura/`: una sceneggiatura per episodio.
- Da scrivere: `concetti.md` (metafora ↔ concetto, prerequisiti, episodio in cui ognuno viene presentato),
  `nuovo-episodio.md` (lo stampo per scrivere una puntata) e `scaletta.md` (la prima stagione).
