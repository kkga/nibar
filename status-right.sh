#!/bin/bash

CURRENT_DESKTOP=$(chunkc tiling:query -m id)


DESKTOP_ACTIVE=$(chunkc tiling::query -d id)
DESKTOP_START=$(chunkc tiling::query -D $CURRENT_DESKTOP | head -c 1)
DESKTOP_END=$(chunkc tiling::query -D $CURRENT_DESKTOP | tail -c 1)

echo $(cat <<-EOF
{
	"desktop": {
		"active": $DESKTOP_ACTIVE,
		"start": $DESKTOP_START,
    "end": $DESKTOP_END
	}
}
EOF
)
