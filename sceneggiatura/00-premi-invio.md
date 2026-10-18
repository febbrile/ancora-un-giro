# Prologo · Premi invio

**La domanda.** Cosa succede quando qualcuno preme invio?
**La risposta.** La frase fa un giro sulle montagne russe di un luna park e torna con una parola in più. Poi riparte.
**Cosa presenta.** Il mondo: il luna park, Ada, lo Spezzaparole, i passeggeri, il treno, la montagna, la vasca, la pesca.
**Cosa resta un mistero.** Cosa succede dentro la montagna (episodio 1).

Durata: 3:26 · Voci: narratore, Ada.

---

### invio · Premi invio · 0:18

**VISIVO.** Sera, un salotto con una lampada calda. In primo piano due mani tengono un telefono. Sullo schermo, una chat: le dita scrivono *Al mare Emma*, poi premono il tasto di invio. Il messaggio sale nella chat.

**NARRATORE.**
> È sera. Qualcuno scrive l'inizio di una storia e chiede a un'intelligenza artificiale di continuarla. Poi preme invio.

---

### volo · Il volo · 0:14

**VISIVO.** Le tre parole si staccano dallo schermo e diventano una striscia di carta. La striscia esce dalla finestra e vola sopra i tetti, nella notte, verso delle luci colorate lontane.

**NARRATORE.**
> In quell'istante, la frase parte per un viaggio.

---

### lunapark · Il luna park · 0:26

**VISIVO.** Un luna park acceso nella notte: una ruota panoramica, i tendoni, le lucine. In mezzo, le montagne russe: i binari salgono, scendono e spariscono dentro una grande montagna scura. La camera scende fino alla stazione. Sulla banchina c'è **Ada**: camice troppo lungo, occhiali tondi, quaderno sotto il braccio. La striscia di carta le atterra in mano. Ada la legge.

**NARRATORE.**
> Vola sopra i tetti, fino a un luna park acceso nella notte. Alla stazione delle montagne russe lavora Ada, una piccola scienziata.

**ADA.**
> Al mare Emma… e poi?

**NARRATORE.**
> Per scoprirlo, c'è una sola strada: un giro sulle montagne russe.

---

### spezzaparole · Lo Spezzaparole · 0:20

**VISIVO.** Sulla banchina c'è una vecchia biglietteria rossa e oro, con due quadranti tondi e una grande forbice di lato: lo **Spezzaparole**. Ada infila la striscia nella fessura in alto. *Zac, zac*: dalla bocca della biglietteria escono tre biglietti, uno per pezzo: «Al», «mare», «Emma».

**NARRATORE.**
> Prima, però, la frase passa dallo Spezzaparole: una vecchia biglietteria, con una grande forbice.

---

### passeggeri · I passeggeri · 0:28

**VISIVO.** Il trenino è fermo in stazione: tre vagoni tondi, color crema, con la sbarra di sicurezza alzata. I tre biglietti volano verso i sedili e, appena li toccano, prendono vita, uno alla volta. Nel primo vagone **Al**, un sassolino tondo. Nel secondo **Mare**, un'onda con gli occhi. Nell'ultimo **Emma**, una bambina fatta di luce, bionda, con un fermaglio a stellina: il suo vestito è rosa antico. Le sbarre si abbassano.

**NARRATORE.**
> I biglietti volano sul trenino e, appena toccano i sedili, prendono vita. Al è un sassolino. Mare è un'onda. Ed Emma, nell'ultimo vagone, è una bambina fatta di luce.

---

### partenza · La partenza · 0:24

**VISIVO.** Ada resta sulla banchina. Il trenino parte da solo: nel primo vagone non c'è nessuno alla guida, solo un fanale acceso. Sale piano la prima salita, scende di colpo, curva e sparisce nella bocca buia della montagna. Da fuori si sentono le ruote e, ogni tanto, un *clac* nel buio. Ada ascolta.

**NARRATORE.**
> Ada sul trenino non sale mai. Il treno parte da solo, senza nessuno alla guida, e sparisce dentro la montagna.

---

### vasca · La vasca · 0:26

**VISIVO.** Accanto ai binari, la bancarella della pesca: un tendone a righe e una vasca d'acqua vuota. Il treno esce dall'altra bocca della montagna, proprio sopra la vasca. Mentre passa l'ultimo vagone, nell'acqua cadono le paperelle: tantissime blu, parecchie turchesi, poche di tanti altri colori. Il treno scivola in stazione e si ferma.

**NARRATORE.**
> Accanto ai binari c'è la bancarella della pesca. Quando il treno esce dalla montagna, nella vasca cadono le paperelle. Ogni colore è una parola.

---

### pesca · La pesca · 0:26

**VISIVO.** Ada si avvicina alla vasca, chiude gli occhi e infila la mano tra le paperelle. Ne tira fuori una: una luce blu le illumina il viso. Le altre paperelle scivolano via dallo scarico e la vasca torna vuota. La paperella le salta di mano, corre lungo la banchina e si siede in un vagone nuovo, dietro Emma. Stacco sul telefono, nel salotto: sotto *Al mare Emma* compare una parola nuova (troppo piccola per leggerla).

**NARRATORE.**
> Ada ne pesca una, senza guardare. La paperella sale sul treno, in un vagone nuovo, e sul telefono la storia cresce di una parola.

---

### ancora · Ancora un giro · 0:24

**VISIVO.** Le sbarre si abbassano e il treno riparte, un vagone più lungo: sparisce di nuovo nella montagna. Sul telefono la storia si allunga ancora, riga dopo riga. Ada si sporge dalla banchina e guarda la montagna buia. Titolo: **Ancora un giro**.

**NARRATORE.**
> E il treno riparte, un vagone più lungo: ancora un giro.

**ADA.**
> La vasca si riempie sempre. Ma cosa succede, là dentro?

---

## Note per noi

| Nella storia | Nel modellino |
|---|---|
| Il telefono e la chat | Chi usa il modello, fuori da tutto |
| La striscia che vola, Ada che la porta | Il programma intorno al modello |
| Lo Spezzaparole | Tokenizer, fuori dal modello |
| I biglietti che prendono vita, ognuno col suo vestito | Embedding |
| La fila dei vagoni | Sequenza e posizione |
| Il treno senza guida, la montagna buia | Calcolo senza volontà, opacità |
| Le paperelle che cadono dove passa l'ultimo vagone | Distribuzione sull'ultima posizione |
| Ada pesca senza guardare | Campionamento, fuori dal modello |
| La paperella che sale, il treno che riparte | Il token aggiunto, il ciclo autoregressivo |

- **Colori e vasca** vengono da [strumenti/modellino.py](../strumenti/modellino.py): Al `#429096`, Mare `#4681d7`, Emma `#bc937f` in stazione e `#2864dc` all'uscita; nella vasca 40 paperelle (18 blu «nuota», 7 turchesi «gioca», 4 «onde», 3 «conchiglie», 2 «sabbia», 2 «corre», una ciascuna «foglie», «altalena», «scivolo», «Fine»). Il passeggero nuovo ha il vestito `#2f73d4`.
- **In stazione ogni vestito torna del colore del suo biglietto**: si vede, ma non si commenta.
- **Nel prologo la parola pescata non si legge**: si vede solo la luce blu. La rivela l'episodio 1.
- **Cosa non diciamo**: i nomi veri (token, modello), perché le parole lunghe si spezzano, da dove viene la pista, perché la pesca cambia. Ognuna di queste cose avrà la sua puntata.
