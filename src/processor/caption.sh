#!/bin/sh

# Read options from arguments:
# i: input image
# c: caption string
# o: output image
[ -z "$FONT" ] && FONT="Impact"
while getopts "i:c:o:" arg; do
	case "${arg}" in
		(i) input="$OPTARG" ;;
		(c) caption="$OPTARG" ;;
		(o) output="$OPTARG" ;;
		(*) exit ;;	
	esac
done

# Adds text to image
convert -verbose "$input" -pointsize 100 -fill white -stroke black -strokewidth 3 -gravity south -font $FONT -annotate 0 "$caption" "$output"
