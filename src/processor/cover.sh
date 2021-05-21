#!/bin/sh

[ -z "$IMGSIZE" ] && IMGSIZE=600 # Set the default image size
[ -z "$BORDERSIZE" ] && BORDERSIZE=100
[ -z "$FONT" ] && FONT="Impact" # Default font
textsize=$(( $IMGSIZE - $BORDERSIZE ))
# Read options from arguments:
# i: input
# o: output
# t: text
while getopts "i:o:t:" arg; do
	case "${arg}" in
		(i) input="$OPTARG" ;;
		(o) output="$OPTARG" ;;
        (t) text="$OPTARG" ;;
		(*) exit ;;
	esac
done

convert -verbose "$input" -blur 0x40 -fill white -stroke black -strokewidth 3 -gravity center -background '#0000' -size ${textsize}x${textsize} -font $FONT caption:"$text" -composite "$output"

