@echo off
REM HappyCart Expo starter (Windows)
REM Uses the active Wi-Fi IPv4 so Expo Go can reach Metro.

set EXPO_NO_DEPENDENCY_VALIDATION=1
set REACT_NATIVE_PACKAGER_HOSTNAME=

REM Prefer current Wi-Fi IPv4 from PowerShell (more reliable than first ipconfig hit)
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -eq 'Wi-Fi' -and $_.IPAddress -notlike '169.*' } | Select-Object -First 1 -ExpandProperty IPAddress)"`) do (
  set REACT_NATIVE_PACKAGER_HOSTNAME=%%i
)

if "%REACT_NATIVE_PACKAGER_HOSTNAME%"=="" (
  for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i /c:"IPv4 Address"') do (
    for /f "tokens=* delims= " %%b in ("%%a") do (
      set REACT_NATIVE_PACKAGER_HOSTNAME=%%b
      goto :found
    )
  )
)

:found
echo.
echo ========================================
echo  HappyCart Expo
echo ========================================
echo Using host: %REACT_NATIVE_PACKAGER_HOSTNAME%
echo.
echo Open in Expo Go:
echo   exp://%REACT_NATIVE_PACKAGER_HOSTNAME%:8081
echo.
echo If download fails:
echo  1) PC must be on PHONE hotspot Wi-Fi
echo  2) Ctrl+C, run npm start again
echo  3) Use the NEW exp:// link shown above
echo ========================================
echo.

npx expo start --lan --port 8081
