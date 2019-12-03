#!/bin/sh

PATH=/usr/local/bin/:$PATH

# Check if yabai exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

SPACES_SECONDARY=$(yabai -m query --spaces --display 2)

echo $(cat <<-EOF
{
  "spaces_secondary": $SPACES_SECONDARY
}
EOF
)
