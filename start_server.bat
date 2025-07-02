@echo off
echo Starting Hostel Room Allotment FastAPI Server...
echo Admin credentials: username=admin, password=hostel123
echo Server will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Starting server...
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause
