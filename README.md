# Ancora un giro

Un cartone animato a episodi che racconta, con una storia, cosa succede dopo che premi invio in una chat con
un'intelligenza artificiale. È pensato per chi non ne sa niente, e lo guardano anche i bambini.

Di notte, dietro lo schermo, c'è un luna park. La frase che hai scritto ci arriva su una striscia di carta:
lo Spezzaparole la strappa in biglietti, i biglietti salgono sul trenino delle montagne russe e diventano passeggeri,
il trenino sparisce in una montagna buia ed esce sopra la vasca della pesca, dove cadono le paperelle.
Ada, una piccola scienziata, ne pesca una senza guardare: è la parola dopo. La paperella sale sul treno, e ancora un giro.

**Guardalo online: https://febbrile.github.io/ancora-un-giro/** (senza accesso a claude.ai).

## Episodi

| | Titolo | Durata | Cosa racconta | Guarda |
|---|---|---|---|---|
| Prologo | Premi invio | 3:26 | Il mondo e il giro intero, visto da fuori: Ada, lo Spezzaparole, i passeggeri, la montagna, la vasca, la pesca | [apri](https://claude.ai/artifact/HNCae1Yqakm6xrZYTBu4Ah) |
| 1 | Dentro la montagna | 4:28 | Lo stesso giro, da dentro: i fili di luce, gli scambi, le finestre. Emma entra rosa ed esce blu | [apri](https://claude.ai/artifact/Neb3nYKCJBYY7oUBes7foS) |

Personaggi, oggetti e luna park: [tela di design](https://claude.ai/artifact/1YpTiDnCNhg4bgh23faV33).

I film e la tela sono privati finché non li condividi dal menu Share della pagina.

## Struttura

```
CLAUDE.md                     le regole di lavoro (da leggere prima di tutto)
mondo/SOGGETTO.md             il soggetto: la frase da lasciare, le leggi del luna park, i personaggi, le regole
sceneggiatura/NN-titolo.md    una sceneggiatura per episodio, con le note su cosa c'è sotto
episodi/comune/               shared.js (personaggi, luna park, treno, sottotitoli) e base.css, uguali per tutti
episodi/NN-titolo/            il sorgente di ogni film Motion: meta.json, cut.js, modules/
design/project/               la tela di design, generata dagli stessi disegni dei film
sito/                         il sito statico con il player nostro
strumenti/                    modellino, controlli, renderer dei fotogrammi, generatore della tela
archivio/                     un progetto chiuso: non è una fonte
```

## Gli strumenti

```bash
python3 strumenti/modellino.py --scrivi
```

Calcola colori dei vestiti, finestre e paperelle dal modellino giocattolo e li scrive in `episodi/comune/shared.js`.

```bash
python3 strumenti/allinea.py
```

Copia `shared.js` e `base.css` comuni in ogni episodio.

```bash
python3 strumenti/tempi.py
```

Controlla il ritmo delle sceneggiature: al massimo 12 caratteri al secondo, almeno 3 secondi di sole immagini, 5 minuti per episodio.

```bash
node strumenti/controlla.mjs
```

Controlla i film: sottotitoli, finestre, pezzi che non finiscono su parole deboli, moduli comuni.

```bash
node strumenti/fotogrammi.mjs 01-dentro-la-montagna --scena fili --foglio
```

Rende i fotogrammi in PNG con il motore del sito e il Chrome installato (serve `npm install` in `strumenti/`).

```bash
node strumenti/tela.mjs
```

Rigenera la tela di design da `shared.js`.

## Il sito

È pubblicato con GitHub Pages da `main`. Il sito fa girare gli stessi file di `episodi/` nel browser, senza Motion. Per provarlo, dalla cartella del repository:

```bash
python3 -m http.server 8791
```

poi si apre http://localhost:8791/sito/. `guarda.html?ep=00-premi-invio&t=40` apre il film fermo al secondo 40.

Il suono passa per tre canali, musica, effetti e voce, con interruttore e volume nel pannello dell'audio. Tasti: **M** tutto l'audio, **N** la musica, **S** lo stile della musica. Un episodio può avere `audio/tracce.json`, letto solo dal sito, per un tema continuo, i volumi di partenza o una voce narrante.
