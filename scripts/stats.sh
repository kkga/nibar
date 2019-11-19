#!/bin/bash

# ETHERNET: get the current number of bytes in and bytes out
myvar1=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $7}'` #  bytes in
myvar3=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $10}'` # bytes out

# AIRPORT: get the current number of bytes in and bytes out
apmyvar1=`netstat -ibn | grep -e "en1" -m 1 | awk '{print $7}'` #  bytes in
apmyvar3=`netstat -ibn | grep -e "en1" -m 1 | awk '{print $10}'` # bytes out

#wait one second
sleep 1

# ETHERNET: get the number of bytes in and out one second later
myvar2=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $7}'` # bytes in again
myvar4=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $10}'` # bytes out again

# AIRPORT: get the number of bytes in and out one second later
apmyvar2=`netstat -ibn | grep -e "en1" -m 1 | awk '{print $7}'` # bytes in again
apmyvar4=`netstat -ibn | grep -e "en1" -m 1 | awk '{print $10}'` # bytes out again

# ETHERNET: find the difference between bytes in and out during that one second
subin=$(($myvar2 - $myvar1))
subout=$(($myvar4 - $myvar3))

# AIRPORT: find the difference between bytes in and out during that one second
apsubin=$(($apmyvar2 - $apmyvar1))
apsubout=$(($apmyvar4 - $apmyvar3))

# ETHERNET: convert bytes to kilobytes
kbin=`echo "scale=2; $subin/1024;" | bc`
kbout=`echo "scale=2; $subout/1024;" | bc`

# AIRPORT: convert bytes to kilobytes
apkbin=`echo "scale=2; $apsubin/1024;" | bc`
apkbout=`echo "scale=2; $apsubout/1024;" | bc`

# convert kilobytes to megabytes
mbin=`echo "scale=2; $kbin/1024;" | bc`
mbout=`echo "scale=2; $kbout/1024;" | bc`

#AIRPORT: get IP address
etherip=`ifconfig en0 | grep -E "(inet |status:)" | head -n 1 | awk '{ print $2}'`
airip=`ifconfig en1 | grep -E "(inet |status:)" | head -n 1 | awk '{ print $2}'`

# print the results
# echo "Ethernet speeds:"
# echo "in: $kbin Kb/sec"
# echo "out: $kbout Kb/sec"
# echo "$kbin#$kbout#$apkbin#$apkbout#$etherip#$airip"

# Check if date exists
if ! [ -x "$(command -v date)" ]; then
  echo "{\"error\":\"date binary not found\"}"
  exit 1
fi

# Check if pmset exists
if ! [ -x "$(command -v pmset)" ]; then
  echo "{\"error\":\"pmset binary not found\"}"
  exit 1
fi

# Check if egrep exists
if ! [ -x "$(command -v egrep)" ]; then
  echo "{\"error\":\"egrep binary not found\"}"
  exit 1
fi

# Check if cut exists
if ! [ -x "$(command -v cut)" ]; then
  echo "{\"error\":\"cut binary not found\"}"
  exit 1
fi

# Check if memory_pressure exists
if ! [ -x "$(command -v memory_pressure)" ]; then
  echo "{\"error\":\"memory_pressure binary not found\"}"
  exit 1
fi

# Check if sysctl exists
if ! [ -x "$(command -v sysctl)" ]; then
  echo "{\"error\":\"sysctl binary not found\"}"
  exit 1
fi

# Check if osascript exists
if ! [ -x "$(command -v osascript)" ]; then
  echo "{\"error\":\"osascript binary not found\"}"
  exit 1
fi

# Check if df exists
if ! [ -x "$(command -v df)" ]; then
  echo "{\"error\":\"df binary not found\"}"
  exit 1
fi

# Check if grep exists
if ! [ -x "$(command -v grep)" ]; then
  echo "{\"error\":\"grep binary not found\"}"
  exit 1
fi

# Check if awk exists
if ! [ -x "$(command -v awk)" ]; then
  echo "{\"error\":\"awk binary not found\"}"
  exit 1
fi

# Check if networksetup exists
if ! [ -x "$(command -v networksetup)" ]; then
  echo "{\"error\":\"networksetup binary not found\"}"
  exit 1
fi

export LC_TIME="en_US.UTF-8"
TIME=$(date +"%H:%M")
DATE=$(date +"%a %d/%m")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

WIFI_STATUS=$(ifconfig en0 | grep status | cut -c 10-)
WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

DND=$(defaults -currentHost read com.apple.notificationcenterui doNotDisturb)

echo $(cat <<-EOF
{
    "datetime": {
        "time": "$TIME",
        "date": "$DATE"
    },
    "battery": {
        "percentage": $BATTERY_PERCENTAGE,
        "charging": $BATTERY_CHARGING,
		"remaining": "$BATTERY_REMAINING"
    },
    "cpu": {
        "loadAverage": $LOAD_AVERAGE
    },
    "wifi": {
		"status": "$WIFI_STATUS",
        "ssid": "$WIFI_SSID"
    },
	"netstats": {
		"kbin": "$kbin",
		"kbout": "$kbout",
		"mbin": "$mbin",
		"mbout": "$mbout"
	},
    "dnd": $DND
}
EOF
)
