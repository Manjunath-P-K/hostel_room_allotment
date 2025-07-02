# Hostel Room Allotment System

A FastAPI-based backend system for managing hostel room allotments with admin authentication and Excel file processing.

## 🏗️ Architecture

Professional modular structure with clean separation of concerns:

```
server/
├── app/                          # Main application package
│   ├── main.py                  # FastAPI application setup
│   ├── routes/                  # API route modules
│   │   ├── admin.py            # Admin routes (protected)
│   │   └── public.py           # Public routes
│   └── utils/                   # Utility modules
│       ├── auth.py             # Authentication utilities
│       ├── file_handler.py     # File handling utilities
│       └── room_allocation.py  # Room allocation logic
├── data/                        # Sample data files
├── scripts/                     # Utility scripts
├── tests/                       # Test files
└── uploads/                     # Uploaded files directory
```

## 🚀 Quick Start

### Option 1: Using Startup Scripts

**Windows:**
```bash
start_server.bat
```

**Linux/Mac:**
```bash
chmod +x start_server.sh
./start_server.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
# or
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 📊 Features

- ✅ **Admin Authentication**: Secure HTTP Basic Auth
- ✅ **Excel Processing**: Robust file handling with pandas
- ✅ **Room Allocation**: Smart grouping algorithm (groups of 3)
- ✅ **File Management**: Upload and storage system
- ✅ **CORS Support**: Frontend integration ready
- ✅ **Auto Documentation**: Swagger/ReDoc integration
- ✅ **Modular Design**: Professional code organization

## 🔐 Authentication

**Admin Credentials:**
- Username: `admin`
- Password: `hostel123`

## 📋 Excel File Format

Required columns:
- Student Name
- Preference 1, 2, 3 (room numbers 1-60)
- Fee Paid Date
- Fees Photo

## 🎯 Room Allocation Logic

1. Students grouped in sets of 3 sequentially
2. Groups sorted by earliest fee payment date
3. Rooms assigned based on group preferences
4. Each room (1-60) assigned to only one group

## 📖 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing

```bash
# Generate sample data
cd scripts && python create_sample_excel.py

# Run API tests
cd tests && python test_api.py
```

---

**Production-ready FastAPI backend for hostel management!** 🎉
