@echo off
REM HappyCart Expo Go starter (Windows)

echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Expo Go will connect through an Expo tunnel.
echo.
echo Make sure your phone has internet access.
echo Open Expo Go and scan the QR code shown below.
echo ========================================
echo.

set "EXPO_NO_REDIRECT_PAGE=1"
node .\node_modules\expo\bin\cli start --go --tunnel ngrok --clear --port 8083
