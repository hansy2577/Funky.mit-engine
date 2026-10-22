@echo off
color 3
cd ...
echo start compile to exe
powershell -command "Start-Sleep -Milliseconds 1000"
echo _______________

npm run build

echo _______________
echo Finished !
powershell -command "Start-Sleep -Milliseconds 1000"
echo have fun :]
pause
