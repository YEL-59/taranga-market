@echo off
echo Cleaning up Next.js dev server...

:: Find and kill process on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process %%a on port 3000
    taskkill /F /PID %%a /T
)

:: Find and kill process on port 3001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Killing process %%a on port 3001
    taskkill /F /PID %%a /T
)

:: Common node processes
taskkill /F /IM node.exe /T 2>nul

:: Clear the lock and cache
if exist .next\dev\lock (
    echo Removing .next\dev\lock
    del /F /Q .next\dev\lock
)

echo Done! You can now run 'npm run dev' again.



//first run :.\clean-dev.bat
//then run nom run dev 
