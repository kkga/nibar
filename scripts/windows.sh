#!/bin/sh

PATH=/usr/local/bin/:$PATH

# Check if yabai exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

WINDOWS=$(yabai -m query --windows --space mouse)

echo $(cat <<-EOF
{
  "windows": $WINDOWS
}
EOF
)
