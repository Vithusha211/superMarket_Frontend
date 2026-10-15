@echo off
REM HappyCart Expo Go starter (Windows)

echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Expo Go will connect over your local Wi-Fi.
echo.
echo Connect your phone and computer to the same Wi-Fi network.
echo Open Expo Go on your phone and scan the QR code shown below.
echo If the connection fails, try: npm run start:go:tunnel
echo ========================================
echo.

node .\node_modules\expo\bin\cli start --go --lan --clear --port 8083
