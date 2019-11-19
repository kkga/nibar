#!/bin/bash

PATH=/usr/local/bin/:$PATH

# Check if yabai exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

SPACES=$(yabai -m query --spaces --display 2)
ACTIVE=$(yabai -m query --spaces --space | jq .index)

echo $(cat <<-EOF
{
    "desktop": {
        "spaces": $SPACES,
        "active": $ACTIVE
    }
}
EOF
)
