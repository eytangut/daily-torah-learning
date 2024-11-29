@echo off

REM Build the web app
call npm run build

REM Copy web assets to Android platform
call npx cap sync android

REM Navigate to Android directory
cd android

REM Build debug APK
call gradlew assembleDebug

REM Navigate back to project root
cd ..

REM Display APK location
echo Debug APK built successfully. Find it at: android\app\build\outputs\apk\debug\app-debug.apk