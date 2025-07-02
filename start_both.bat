@echo off
echo Starting Hostel Room Allotment System...
echo.

echo [1/2] Starting FastAPI Backend Server...
start "Backend Server" cmd /k "cd /d F:\hostel_room_allotment\server && python main.py"

timeout /t 3 /nobreak > nul

echo [2/2] Starting React Frontend Server...
start "Frontend Server" cmd /k "cd /d F:\hostel_room_allotment\client && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
