#!/bin/bash

DESKTOP_ACTIVE=$(chunkc tiling::query -d id)
DESKTOP_TOTAL=$(chunkc tiling::query -D 1 | tail -c 1)

echo $(cat <<-EOF
{
	"desktop": {
		"active": $DESKTOP_ACTIVE,
		"total": $DESKTOP_TOTAL
	}
}
EOF
)
