@echo off
setlocal

:: Define paths
set "SOURCE_DIR=./dist"
set "DEST_ZIP=./docs/dist.zip"

:: Check if the source directory exists
if not exist "%SOURCE_DIR%" (
    echo Source directory %SOURCE_DIR% does not exist.
    exit /b
)

:: Remove existing zip file if it exists
if exist "%DEST_ZIP%" (
    del "%DEST_ZIP%"
)

:: Create a new zip file from the source directory
tar -a -c -f "%DEST_ZIP%" -C "%SOURCE_DIR%" .

echo Zipping completed. The zip file is located at %DEST_ZIP%.

endlocal