#!/bin/bash

# Check if chunkc exists
# if ! [ -x "$(command -v yabai)" ]; then
#   echo "{\"error\":\"chunkc binary not found\"}"
#   exit 1
# fi

CURRENT_DESKTOP=$(yabai -m query --spaces --space | jq .index)
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
