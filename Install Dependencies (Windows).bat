@echo off
cd /d %~dp0
cls
echo.
echo.

::NET SESSION >nul 2>&1
::IF %ERRORLEVEL% NEQ 0 (
::	echo This setup needs Admin permissions. Please run this file as an Admin.
::      echo Press any key to exit...
::	pause >nul 2<&1
::	exit
::)

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (

    set SETUP_DIR=%CD%

    echo NodeJs is not installed on this computer...
    echo.
    echo Press any key to download NodeJs...
    pause >nul 2<&1

if not exist "%systemdrive%\Program Files (x86)" (
    start https://nodejs.org/dist/latest/win-x86/node.exe
) else (
    start https://nodejs.org/dist/latest/win-x64/node.exe
)
cls
@echo.
@echo.
@echo Please open the downloaded file and follow the instructions when it's done downloading...
@echo.
@echo.
@echo Press any key to exit...
pause >nul 2<&1
exit

) else (

@ call npm cache clean
@echo Installing npm, please wait...
call npm install
cls
echo.
echo.
@echo npm installed successfully...

cls
echo.
echo.

@echo Installing socket.io-client, please wait...
call npm install socket.io-client
cls
echo.
echo.
@echo Dependencies installed successfully...

@echo.
@echo Press any key to exit...
@pause >nul 2<&1

)