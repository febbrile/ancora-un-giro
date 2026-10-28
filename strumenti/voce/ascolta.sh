#!/bin/sh
# Ascolta le clip di prova una dopo l'altra: `sh strumenti/voce/ascolta.sh [battuta…]`.
# Per ogni battuta suona i modelli in ordine alfabetico e dice quale sta suonando; con CIECO=1 li mescola
# e stampa solo una lettera, con la soluzione in prove/cieco.txt.
cd "$(dirname "$0")/prove" || exit 1
battute=${*:-"domanda carrozza scambi uscita ada"}
: > cieco.txt
for b in $battute; do
  echo "== $b"
  lista=$(ls */"$b".wav 2>/dev/null)
  [ -n "$CIECO" ] && lista=$(echo "$lista" | sort -R)
  i=0
  for f in $lista; do
    i=$((i + 1)); lettera=$(printf "\\$(printf '%03o' $((64 + i)))")
    if [ -n "$CIECO" ]; then echo "  $lettera"; echo "$b $lettera ${f%%/*}" >> cieco.txt; else echo "  ${f%%/*}"; fi
    afplay "$f"
  done
done
