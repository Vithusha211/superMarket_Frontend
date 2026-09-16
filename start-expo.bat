@echo off
REM HappyCart Expo starter (Windows)
REM Uses an Expo tunnel so Expo Go can reach Metro across hotspot/Wi-Fi networks.

set EXPO_NO_DEPENDENCY_VALIDATION=1
echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Expo Go will use a secure tunnel.
echo.
echo If download fails:
echo  1) Keep the PC online
echo  2) Scan the QR code shown by Expo
echo  3) Or enter the exp.direct URL shown by Expo Go
echo ========================================
echo.

npx expo start --tunnel --clear --port 8081
