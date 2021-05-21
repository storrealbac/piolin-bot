#!/bin/sh

[ -z "$IMGSIZE" ] && IMGSIZE=600 # Set the default image size
# Read options from arguments:
# i: input
# o: output
while getopts "i:o:" arg; do
	case "${arg}" in
		(i) input="$OPTARG" ;;
		(o) output="$OPTARG" ;;
		(*) exit ;;
	esac
done

# Resizes image
convert -verbose "$input" -resize ${IMGSIZE}x${IMGSIZE}^ -gravity center -extent ${IMGSIZE}x${IMGSIZE} "$output"