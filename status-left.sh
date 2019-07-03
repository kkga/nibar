#!/bin/bash

# Check if chunkc exists
# if ! [ -x "$(command -v /usr/local/bin/yabai)" ]; then
#   echo "{\"error\":\"chunkc binary not found\"}"
#   exit 1
# fi

# CURRENT_DESKTOP=$(/usr/local/bin/yabai -m query --spaces --space | jq .index)
DESKTOP_ACTIVE=$(/usr/local/bin/yabai -m query --spaces --space | /usr/local/bin/jq .index)
# DESKTOP_START=$(chunkc tiling::query -D $CURRENT_DESKTOP | head -c 1)
# DESKTOP_END=$(chunkc tiling::query -D $CURRENT_DESKTOP | tail -c 1)

echo $(cat <<-EOF
{
	"desktop": {
		"active": $DESKTOP_ACTIVE,
		"start": 1,
        "end": 6
	}
}
EOF
)
