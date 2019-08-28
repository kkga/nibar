#!/bin/sh
# created by chris helming.
# chris dot helming at gmail

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

#AIRPORT: get IP address
etherip=`ifconfig en0 | grep -E "(inet |status:)" | head -n 1 | awk '{ print $2}'`
airip=`ifconfig en1 | grep -E "(inet |status:)" | head -n 1 | awk '{ print $2}'`

# print the results
# echo "Ethernet speeds:"
# echo "in: $kbin Kb/sec"
# echo "out: $kbout Kb/sec"
echo "$kbin#$kbout#$apkbin#$apkbout#$etherip#$airip"