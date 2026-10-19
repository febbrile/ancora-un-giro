# Ancora un giro

Un cartone animato a episodi che racconta, con una storia, cosa succede dopo che premi invio in una chat con
un'intelligenza artificiale. È pensato per chi non ne sa niente, e lo guardano anche i bambini.

Di notte, dietro lo schermo, c'è un luna park. La frase che hai scritto ci arriva su una striscia di carta:
lo Spezzaparole la strappa in biglietti, i biglietti salgono sul trenino delle montagne russe e diventano passeggeri,
il trenino sparisce in una montagna buia ed esce sopra la vasca della pesca, dove cadono le paperelle.
Ada, una piccola scienziata, ne pesca una senza guardare: è la parola dopo. La paperella sale sul treno, e ancora un giro.

**Guardalo online: https://febbrile.github.io/ancora-un-giro/**

## Episodi

Prima stagione.

| | Titolo | Durata | Cosa racconta | Guarda |
|---|---|---|---|---|
| Prologo | Premi invio | 2:52 | Il mondo e il giro intero, visto da fuori: Ada, lo Spezzaparole, i passeggeri, la montagna, la vasca, la pesca | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=00-premi-invio) |
| 1 | Dentro la montagna | 3:52 | Lo stesso giro, da dentro: i fili di luce, gli scambi, le finestre sulla vasca dove si accendono le paperelle. Emma entra rosa ed esce blu | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=01-dentro-la-montagna) |
| 2 | Al parco | 4:32 | Due treni uguali tranne un vagone: con Mare Emma esce blu, con Parco esce verde. Stessa frase, stessa vasca, ma la pesca può cambiare | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=02-al-parco) |
| 3 | La stessa vasca | 4:22 | La stessa frase arriva tre volte e la vasca si riempie uguale, ma la pesca cambia. La manopola della bancarella cambia la vasca, mai la montagna | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=03-la-stessa-vasca) |
| 4 | Il treno che ricorda | 3:54 | Il treno non ricorda niente: a ogni messaggio risale tutta la chat. La banchina tiene sette vagoni, e i biglietti del principio restano giù | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=04-il-treno-che-ricorda) |
| 5 | Chi ha costruito la pista | 4:34 | Prima che il parco aprisse, i treni di prova grigi hanno piegato la pista, un brivido alla volta. Oggi non si piega più | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=05-chi-ha-costruito-la-pista) |
| 6 | Lo Spezzaparole | 3:38 | Un nome mai sentito sale sul treno a pezzi, tre biglietti con gli occhi, e la storia va avanti lo stesso | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=06-lo-spezzaparole) |
| 7 | Come finisce la storia | 3:24 | Nella vasca c’è sempre stata una paperella del colore della notte: quando Ada la pesca, la risposta è finita | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=07-come-finisce-la-storia) |
| 8 | La paperella sbagliata | 4:22 | Il cane di Emma non esiste, ma la vasca si riempie lo stesso di nomi che suonano bene | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=08-la-paperella-sbagliata) |
| 9 | Il parco più grande del mondo | 4:14 | Oltre le colline c’è un parco immenso: tutto più grande, ma il giro è lo stesso. E le cose del luna park hanno i loro nomi da grandi | [guarda](https://febbrile.github.io/ancora-un-giro/sito/guarda.html?ep=09-il-parco-piu-grande-del-mondo) |

Argomento, domanda e idea di ogni episodio sono nella [scaletta](mondo/SCALETTA.md).

## Da leggere: come funziona un LLM

Accanto ai film, sul sito c'è una sezione di lezioni da leggere, più tecniche, con i numeri.

| | Titolo | Leggi |
|---|---|---|
| 1 | Dal testo alla distribuzione di probabilità | [leggi](https://febbrile.github.io/ancora-un-giro/sito/leggi.html?l=01-dal-testo-alla-distribuzione) |

Personaggi, oggetti e luna park: [tela di design](https://claude.ai/artifact/1YpTiDnCNhg4bgh23faV33).

## Struttura

```
CLAUDE.md                     le regole di lavoro (da leggere prima di tutto)
mondo/SOGGETTO.md             il soggetto: la frase da lasciare, le leggi del luna park, i personaggi, le regole
mondo/SCALETTA.md             la prima stagione: argomento, domanda e idea di ogni episodio
sceneggiatura/NN-titolo.md    una sceneggiatura per episodio, con le note su cosa c'è sotto
episodi/comune/               shared.js (personaggi, luna park, treno, sottotitoli) e base.css, uguali per tutti
episodi/NN-titolo/modules/    le scene di ogni film (scenes.json, scene-<id>.js) e la musica (score.js)
design/project/               la tela di design, generata dagli stessi disegni dei film
sito/                         il sito statico con il player nostro; episodi.json: stagioni ed episodi
sito/lezioni/                 le lezioni da leggere, in Markdown (elenco in sito/lezioni.json)
strumenti/                    modellino, controlli, renderer dei fotogrammi, generatore della tela
archivio/                     un progetto chiuso: non è una fonte
```

## Gli strumenti

```bash
python3 strumenti/modellino.py --scrivi
```

Calcola colori dei vestiti, finestre e paperelle dal modellino giocattolo e li scrive in `episodi/comune/shared.js`.

```bash
python3 strumenti/tempi.py
```

Controlla il ritmo delle sceneggiature: al massimo 12 caratteri al secondo, almeno 3 secondi di sole immagini, 5 minuti per episodio.

```bash
node strumenti/controlla.mjs
```

Controlla i film: sottotitoli, finestre, pezzi che non finiscono su parole deboli, ritmo.

```bash
node strumenti/fotogrammi.mjs 01-dentro-la-montagna --scena fili --foglio
```

Rende i fotogrammi in PNG con il motore del sito e il Chrome installato (serve `npm install` in `strumenti/`).

```bash
node strumenti/provino.mjs schizzo.js schizzo.png
```

Disegna al volo un disegno nuovo con shared.js: `schizzo.js` è il corpo di una funzione `(G)` che restituisce un SVG 1920×1080.

```bash
node strumenti/tela.mjs
```

Rigenera la tela di design da `shared.js`.

## Il sito

È l'unico posto dove si guardano gli episodi: è pubblicato con GitHub Pages da `main`, e pubblicare un episodio vuol dire portarlo su `main`. Per provarlo in locale, dalla cartella del repository:

```bash
python3 -m http.server 8791
```

poi si apre http://localhost:8791/sito/. `guarda.html?ep=00-premi-invio&t=40` apre il film fermo al secondo 40.

Il suono passa per tre canali, musica, effetti e voce, con interruttore e volume nel pannello dell'audio. Tasti: **M** tutto l'audio, **N** la musica, **S** lo stile della musica. Un episodio può avere `audio/tracce.json` per un tema continuo, i volumi di partenza o una voce narrante.
