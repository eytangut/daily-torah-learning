@echo off
setlocal

REM Define the paths
set DIST_FOLDER=dist
set ZIP_FILE=docs\dist.zip

REM Check if the DIST folder exists
if not exist "%DIST_FOLDER%" (
    echo The dist folder does not exist.
    exit /b 1
)

REM Create the docs directory if it does not exist
if not exist "docs" (
    mkdir docs
)

REM Remove the existing zip file if it exists
if exist "%ZIP_FILE%" (
    del "%ZIP_FILE%"
)

REM Package the dist folder into a zip file
powershell -command "Compress-Archive -Path '%DIST_FOLDER%\*' -DestinationPath '%ZIP_FILE%'"

echo Packaging complete: %ZIP_FILE%

endlocal