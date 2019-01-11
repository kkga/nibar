#!/bin/bash

export LC_TIME="en_US.UTF-8"
TIME=$(date +"%a %H:%M")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')

BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

VOLUME=$(osascript -e 'output volume of (get volume settings)')
IS_MUTED=$(osascript -e 'output muted of (get volume settings)')

HDD_TOTAL_BYTES=$(df | grep -m 1 /disk1 | awk -F" " '{print $2}')
HDD_FREE_BYTES=$(df | grep -m 1 /disk1 | awk -F" " '{print $4}')

MEMORY_FREE=$(memory_pressure | grep "Pages free" | grep -o -E '[0-9]+')
MEMORY_TOTAL=$(memory_pressure | grep system | awk -F" " '{print $5}' | grep -o -E '[0-9]+')

WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

echo $(cat <<-EOF
{
  "time": "$TIME",
  "battery": {
    "percentage": $BATTERY_PERCENTAGE,
    "charging": $BATTERY_CHARGING
  },
  "cpu": {
    "loadAverage": $LOAD_AVERAGE
  },
	"volume": {
		"volume": $VOLUME,
		"muted": $IS_MUTED
	},
	"hdd": {
		"freeBytes": $HDD_FREE_BYTES,
		"totalBytes": $HDD_TOTAL_BYTES
	},
	"memory": {
		"total": $MEMORY_TOTAL,
		"free": $MEMORY_FREE
	},
	"wifi": {
		"ssid": "$WIFI_SSID"
	}
}
EOF
)
