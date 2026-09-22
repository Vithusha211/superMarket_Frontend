@echo off
REM HappyCart Expo starter (Windows)
REM Uses the local network by default so startup does not depend on ngrok.

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

npx expo start --go --lan --clear --port 8081
