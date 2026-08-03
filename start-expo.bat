@echo off
REM HappyCart Expo starter (Windows)
REM Fixes "Failed to download remote update" by using LAN + offline mode.

set EXPO_OFFLINE=1
set EXPO_NO_DEPENDENCY_VALIDATION=1

REM Prefer Wi-Fi IPv4 (skip VirtualBox/WSL/hyper-v when possible)
set REACT_NATIVE_PACKAGER_HOSTNAME=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i /c:"IPv4 Address"') do (
  for /f "tokens=* delims= " %%b in ("%%a") do (
    set REACT_NATIVE_PACKAGER_HOSTNAME=%%b
    goto :found
  )
)

:found
echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Using host: %REACT_NATIVE_PACKAGER_HOSTNAME%
echo.
echo BEST FIX if LAN fails (Android USB):
echo  1) Enable USB debugging on phone
echo  2) Plug USB cable into PC
echo  3) In another terminal run:
echo       adb reverse tcp:8081 tcp:8081
echo  4) In Expo Go open:
echo       exp://127.0.0.1:8081
echo.
echo OR same Wi-Fi / phone hotspot, then open:
echo       exp://%REACT_NATIVE_PACKAGER_HOSTNAME%:8081
echo.
echo Hotspot tip: turn ON phone hotspot, connect PC to it,
echo run this script again, use the NEW exp:// URL shown.
echo ========================================
echo.

npx expo start --lan --clear --port 8081
