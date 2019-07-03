#!/bin/bash

PATH=/usr/local/bin/:$PATH

# Check if chunkc exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

CURRENT_DESKTOP=$(yabai -m query --spaces --space | jq .index)
DESKTOP_ACTIVE=$(yabai -m query --spaces --space | jq .index)
DESKTOP_START=$(yabai -m query --spaces | jq '.[0]' | jq .index)
DESKTOP_END=$(yabai -m query --spaces | jq '.[-1]' | jq .index)
APP_NAME=$(yabai -m query --windows --window | jq .app)

echo $(cat <<-EOF
{
	"desktop": {
        "active": $DESKTOP_ACTIVE,
        "start": $DESKTOP_START,
        "end": $DESKTOP_END,
        "app": $APP_NAME
	}
}
EOF
)
