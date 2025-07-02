#!/bin/bash

echo "Starting Hostel Room Allotment System..."
echo

echo "[1/2] Starting FastAPI Backend Server..."
cd server
python main.py &
BACKEND_PID=$!

echo "Backend server started with PID: $BACKEND_PID"
sleep 3

echo "[2/2] Starting React Frontend Server..."
cd ../client
npm run dev &
FRONTEND_PID=$!

echo "Frontend server started with PID: $FRONTEND_PID"
echo
echo "Both servers are running:"
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Function to handle cleanup
cleanup() {
    echo
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Set trap to call cleanup function on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
