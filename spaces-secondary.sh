#!/bin/bash

PATH=/usr/local/bin/:$PATH

# Check if chunkc exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

SPACES=$(yabai -m query --spaces --display 2)
ACTIVE=$(yabai -m query --spaces --space | jq .index)
APP_NAME=$(yabai -m query --windows --window | jq .app)

echo $(cat <<-EOF
{
	"desktop": {
        "spaces": $SPACES,
        "active": $ACTIVE,
        "app": $APP_NAME
	}
}
EOF
)
