# Ancora un giro: regole di lavoro

Una serie di cartoni animati che racconta, con una storia, cosa succede dopo che premi invio in una chat
con un'intelligenza artificiale. È per una persona comune, e la guardano anche i bambini.
Il mondo è un luna park di notte: una frase fa un giro sulle montagne russe e torna con una parola in più.

**La regola che viene prima di tutte: una sola storia.** Chi guarda segue un racconto, non una lezione.
Il rigore scientifico c'è sempre, ma sta sotto il racconto e non si vede.
Se una scena è bella ma scientificamente sbagliata, si riscrive. Se è giusta ma non si capisce, si riscrive lo stesso.

## Le fondamenta

[mondo/SOGGETTO.md](mondo/SOGGETTO.md) viene prima di tutto: la frase da lasciare allo spettatore, le leggi del
luna park, i personaggi, il motore della serie, le regole di racconto e scientifiche, gli errori da non suggerire
e la prova per ogni elemento nuovo. Se una scelta lo contraddice, si cambia la scelta, oppure si discute e si
cambia prima il soggetto.

## Come si lavora

- **Si parla in italiano**, nei messaggi, nei testi dei film, nei commenti e nei commit.
- **Prima il soggetto, poi la sceneggiatura, poi la produzione.** Ogni episodio ha la sua sceneggiatura in
  `sceneggiatura/NN-titolo.md`; i film si toccano solo dopo.
- **Le idee nuove si discutono prima di scriverle**: proponi, spiega il perché, aspetta il sì. Quando l'utente
  chiede di scegliere, proponi poche alternative (di solito tre) e indica la tua preferita.
- **Prima di dire che una scena è a posto, guardala**: rendi i fotogrammi e leggili (vedi «Verifica»).

## Gli errori da non ripetere

Sono gli errori che hanno fatto fallire un primo tentativo con il pubblico vero:
- **Personaggi, luoghi e oggetti che compaiono senza essere presentati.** Chi guarda deve sapere chi è e a cosa
  serve ogni cosa che vede, prima che serva.
- **Formule, numeri e parole tecniche a schermo.** Niente monitor, niente calcoli, niente scritte dentro la montagna.
- **Due letture sovrapposte**, una per bambini e una per esperti: distraggono gli uni e non bastano agli altri.
- **Troppe idee in un episodio.** Un episodio presenta **un solo elemento nuovo** del mondo e usa solo quelli già visti.
- **Spiegazioni fuori dalla trama**: gag didattiche, esempi messi lì per insegnare, riassunti, mappe. Un concetto
  che non fa avanzare la storia della puntata aspetta la sua puntata, dove diventerà la storia.
- **Elementi estranei al mondo.** Ogni cosa deve appartenere a un luna park: un bambino che c'è stato la riconosce.
- **Nessuna domanda.** Ogni episodio parte da una domanda e arriva a una risposta: è una storia completa.

## Racconto e ritmo

- **Il narratore racconta, non spiega.** Ada dice poche battute, brevi, mai numeri.
- **Al massimo 12 caratteri al secondo** di sottotitolo mentre una voce parla.
- **Almeno 3 secondi di sole immagini in ogni scena.** Ogni scena rispetta `durata ≥ parlato/12 + 3 s`:
  controllalo con `python3 strumenti/tempi.py` dopo ogni modifica a una sceneggiatura.
- **Nessuna pausa morta prima di uno stacco.** Dopo l'ultima battuta (o il cartello) una scena dura al massimo
  3 secondi: dove nessuno parla la scena accelera, soprattutto alla fine. Le scene scrivono i tempi in tempo
  interno e il `RITMO` di `shared.js` li porta al tempo vero (`t = G.tempo(ep, id, t)` in `render`, `R(id, x)` in
  `score.js`); in `scenes.json` `dur` è la durata vera. Mai accelerare mentre c'è un sottotitolo:
  `node strumenti/controlla.mjs` controlla le due cose.
- **Un episodio dura al massimo 5 minuti.** Meglio un episodio in più che uno troppo pieno.
- **I sottotitoli scorrono a pezzi** di 18–48 caratteri (`chunkSub` in `shared.js`). Un pezzo non finisce mai con
  un articolo, una preposizione, una congiunzione o una parola con apostrofo.
- Le sole scritte a schermo sono i sottotitoli, il titolo e il cartello finale. Sul telefono si vede la frase della storia.

## Regole scientifiche

L'elenco completo, tradotto nel luna park, è nel §7 del soggetto. Le più importanti:

1. **La giostra non decide, non sceglie, non vuole: porta.**
   - Verbi ammessi per pista, scambi e montagna: porta, sposta, fa scattare, calcola, accende, mescola, misura.
   - Verbi vietati: decide, sceglie, pensa, capisce, vuole, sa.
2. **Biglietteria (lo Spezzaparole) e pesca stanno fuori dalla montagna.**
3. **Dentro la montagna non ci sono lettere**: solo luce e colori. Le paperelle non hanno scritte.
4. **Gli scambi spostano, non trasformano**: Emma resta Emma, cambia il colore del vestito. Ogni vagone ha il suo
   binario e il suo spostamento; tutti i vagoni attraversano tutti i tratti.
5. **Si guarda sempre avanti**: i fili di luce vanno da ogni passeggero a chi gli siede davanti e a sé stesso, mai
   a chi sta dietro.
6. **Alla vasca conta solo l'ultimo vagone.** Le paperelle vere nascono solo lì: nella montagna ci sono spostamenti,
   non probabilità. Emma non diventa una paperella.
   - **Le finestre sulla vasca** sono il momento fisso di ogni episodio: dentro la montagna una finestra dà
     sull'acqua, e solo quando passa l'ultimo vagone si accendono paperelle di luce, quelle che cadrebbero se il
     treno uscisse lì (dal modellino). Non sono vere: non cadono, non salgono sul treno, non si pescano.
     L'ultima finestra è uguale alla vasca.
7. **Stesso treno, stesso giro.** La pista è fissa; la pesca cambia; perché la pista sia fatta così non lo sa
   spiegare nessuno a parole.
8. **Quando il treno torna in stazione, ogni vestito torna del colore del suo biglietto**: a ogni giro si riparte
   dai biglietti.
9. **La pista non l'ha progettata nessuno**: si è piegata sotto milioni di treni carichi di frasi, poi è stata fissata.
10. **I colori non hanno un nome**: conta solo quanto due colori si somigliano.
11. **Parliamo solo del nostro luna park.** Niente confronti con i modelli veri, salvo un episodio dedicato.
12. **Quello che si mostra una volta, si mostra sempre.** Ogni passeggero ha i suoi colori, ogni finestra le sue
    paperelle di luce, ogni vasca le sue paperelle, in ogni episodio. Se mancano i dati, prima si dichiarano nel modellino,
    poi si mostrano.

## Personaggi

- **Ada**: piccola scienziata col camice troppo lungo, gli occhiali tondi e il quaderno. Lavora alla stazione e alla
  bancarella della pesca. **Non sale mai sul treno e non tocca niente dentro la montagna.** È lei che vuole capire:
  ogni episodio è un mistero che indaga da fuori.
- **Lo Spezzaparole**: vecchia biglietteria con una grande forbice, sulla banchina.
- **Emma**: bambina fatta di luce, **bionda, capelli mossi fin sopra le spalle, non spettinati**, fermaglio a
  stellina sulla frangia. Il vestito ha il colore del suo biglietto, poi quello che le danno i fili e gli scambi.
  Quando uno scambio la sposta usa la posa **«tirata via»** (va avanti, capelli e vestito restano indietro).
  Niente frecce disegnate su di lei.
- **Al** (sassolino) e **Mare** (onda con gli occhi): i compagni di viaggio della prima frase. Occhi grandi e
  bordo chiaro, perché si leggano anche piccoli; nel vagone la testa sta sempre sopra la sponda.
- **Le paperelle**: una per ogni parola che può venire dopo. Quella pescata sale sul treno e diventa un passeggero.
- I modelli dei personaggi sono nella tela di design (link nel [README](README.md)) e, in SVG, in
  `episodi/comune/shared.js`: ogni cambio di aspetto parte dalla tela e si riporta in `shared.js`.

## I numeri

- I colori dei vestiti, le paperelle di luce delle finestre e le paperelle nella vasca vengono da un modellino giocattolo
  coerente: **un'unica fonte**, [strumenti/modellino.py](strumenti/modellino.py). Inventati solo i valori che il
  modellino dichiara come inventati; tutto il resto si calcola.
- Se cambi un numero, cambialo lì, esegui `python3 strumenti/modellino.py` e solo dopo riporta i risultati nelle scene.
- I numeri non vanno mai a schermo: decidono colori, quantità e posizioni.

## I film e il sito

- Gli episodi si guardano solo sul nostro sito, https://febbrile.github.io/ancora-un-giro/, pubblicato con GitHub
  Pages da `main`. Pubblicare un episodio vuol dire portarlo su `main`.
- Ogni episodio sta in `episodi/NN-titolo/modules/`: `scenes.json` (scene, durate, misure e sfondo),
  `scene-<id>.js` (una per scena) e `score.js` (musica ed effetti).
- `shared.js` (personaggi, luna park, treno, sottotitoli) e `base.css` sono uguali per tutti gli episodi e stanno
  solo in `episodi/comune/`: il motore li carica da lì.
- Ogni scena è `kit.scene(id, { init, render(t, kit) })`, funzione pura del tempo; i tempi interni usano `seg`, `eo`, `eio`.
  Le scene possono usare solo le funzioni che `sito/motore/kit.js` offre: se ne serve una nuova, prima la si aggiunge lì.
- Testi SVG: Fredoka per titoli e scritte, Atkinson Hyperlegible per i sottotitoli.
- Musica originale, in `score.js`, con gli accordi sul `pad` (il sito li usa per il suo stile «anni 90»).
- L'audio lo suona `sito/motore/suono.js` su tre canali, **musica**, **effetti** e **voce**, ognuno con volume e
  interruttore suoi. Senza altro, la musica è quella di `score.js` scena per scena. Un episodio può avere
  `audio/tracce.json` per un tema continuo (`sito/motore/tema.js`), i volumi di partenza o file audio a un istante
  del film, come una voce narrante.
- In `sito/episodi.json` c'è l'elenco degli episodi: aggiornalo quando ne nasce uno nuovo.
- Prima di dire che il sito funziona, aprilo con un server locale (`python3 -m http.server 8791`, poi
  `sito/guarda.html?ep=…&t=…`); dopo la pubblicazione, aprilo anche online.

## Verifica

- `node strumenti/fotogrammi.mjs <episodio> <tempi…>` rende i fotogrammi in PNG (in `fotogrammi/`, fuori da git)
  con il motore del sito e il Chrome dell'utente; `--foglio` li impagina in un foglio di provini.
  **Leggi i PNG** prima di dichiarare una scena finita. Nel renderer i font possono essere sostitutivi: dillo
  quando la verifica è avvenuta solo lì.
- `node strumenti/controlla.mjs` controlla sottotitoli, finestre e ritmo senza aprire i film.
- Per ogni scena controlla almeno l'inizio, il centro, la fine e ogni battuta:
  - testi che escono dal riquadro, etichette sovrapposte, elementi coperti o tagliati;
  - sottotitoli in anticipo o in ritardo sulle immagini;
  - un personaggio o un oggetto che compare prima di essere stato presentato;
  - scritte o numeri dove non devono esserci.
- Prova del pubblico: dopo ogni episodio, chiediti se una persona che non sa niente di intelligenza artificiale
  saprebbe raccontarlo con parole sue.

## Repository

- `mondo/` il soggetto · `sceneggiatura/` una sceneggiatura per episodio · `episodi/NN-titolo/` i film ·
  `episodi/comune/` i moduli condivisi · `design/` la tela dei personaggi · `sito/` il sito statico ·
  `strumenti/` script.
- `archivio/` contiene un progetto chiuso: non è una fonte, non si legge e non si modifica.
- Commit in italiano, uno per passo logico (soggetto, sceneggiatura, numeri, singolo episodio).
