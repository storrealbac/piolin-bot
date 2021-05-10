#!/bin/sh

# Read options from arguments:
# i: image name (input)
# f: font name
# c: caption string
font="Impact" # Default font
while getopts "i:f:c:o:" arg; do
	#shift $((OPTIND-1))
	case "${arg}" in
		(i) image="$OPTARG" ;;
		(f) font="$OPTARG" ;;
		(c) caption="$OPTARG" ;;
		(o) output="$OPTARG" ;;
		(*) exit ;;
	esac
done
shift $((OPTIND-1))

# Adds text to image
convert -verbose "$image" -pointsize 100 -fill white -stroke black -strokewidth 3 -gravity south -font "Impact" -annotate 0 "$caption" "$output"
