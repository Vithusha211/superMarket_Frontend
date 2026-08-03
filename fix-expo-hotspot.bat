@echo off
REM ============================================
REM  FIX: Failed to download remote update
REM  Use PHONE HOTSPOT (bypasses Wi-Fi isolation)
REM ============================================
echo.
echo STEP 1: On your PHONE - turn ON Mobile Hotspot
echo STEP 2: On this PC - connect Wi-Fi to that hotspot
echo STEP 3: Press any key after PC is connected...
pause >nul
echo.

set EXPO_OFFLINE=1
set EXPO_NO_DEPENDENCY_VALIDATION=1
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
echo  Open this URL in Expo Go:
echo.
echo    exp://%REACT_NATIVE_PACKAGER_HOSTNAME%:8081
echo.
echo  Expo Go -^> Enter URL manually -^> paste above
echo ========================================
echo.
echo Starting Metro...
echo.

npx expo start --lan --clear --port 8081
