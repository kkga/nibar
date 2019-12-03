#!/usr/bin/env bash

FREE_MEMORY=$(top -l 1 | head -n 7 | grep PhysMem | egrep -o '[0-9]+' | tail -1)
WIFI_SSID=$(networksetup -getairportnetwork en0 | awk -F": " '{print $2}')
BATTERY_LEVEL=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | awk '{print $4}')
VOLUME_LEVEL=$(osascript -e 'output volume of (get volume settings)')
VOLUME_MUTED=$(osascript -e 'output muted of (get volume settings)')

DATE_TIME=$(date +"%a %H:%M")

echo $(cat <<EOF
{
  "memory": {
    "free": "$FREE_MEMORY"
  },
  "wifi": {
    "ssid": "$WIFI_SSID"
  },
  "battery": {
    "level": "$BATTERY_LEVEL",
    "status": "$BATTERY_STATUS"
  },
  "volume": {
    "level": "$VOLUME_LEVEL",
    "muted": "$VOLUME_MUTED"
  },
  "date_time": "$DATE_TIME"
}
EOF
)
