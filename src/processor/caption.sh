#!/bin/sh

# Read options from arguments:
# i: input image
# f: font name
# c: caption string
# o: output image
font="Impact" # Default font
while getopts "i:f:c:o:" arg; do
	case "${arg}" in
		(i) input="$OPTARG" ;;
		(f) font="$OPTARG" ;;
		(c) caption="$OPTARG" ;;
		(o) output="$OPTARG" ;;
		(*) exit ;;	
	esac
done

# Adds text to image
convert -verbose "$input" -pointsize 100 -fill white -stroke black -strokewidth 3 -gravity south -font $font -annotate 0 "$caption" "$output"
