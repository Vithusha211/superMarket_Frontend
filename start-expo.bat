@echo off
REM HappyCart Expo starter (Windows)
REM Uses the local network address explicitly so Expo Go can reach Metro.

echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Expo Go will connect over the local network.
echo.
echo Make sure the computer and device are on the same Wi-Fi network.
echo If LAN is unavailable, run: npm run start:tunnel
echo ========================================
echo.

set "REACT_NATIVE_PACKAGER_HOSTNAME=192.168.8.135"
node .\node_modules\expo\bin\cli start --go --lan --clear --port 8082
