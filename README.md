# 🏠 Hostel Room Allotment System

A complete full-stack web application for managing hostel room allotments with a beautiful React frontend and powerful FastAPI backend.

![Frontend Preview](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)
![Backend API](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Database](https://img.shields.io/badge/Database-Excel%20Processing-217346?style=for-the-badge&logo=microsoft-excel)

## ✨ Features

### 🎨 Frontend Features
- **Modern UI Design** - Beautiful glass morphism effects and smooth animations
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Interactive Dashboard** - Real-time statistics and system monitoring
- **Drag & Drop Upload** - Easy file uploading with visual feedback
- **Room Visualization** - Interactive 60-room grid with status indicators
- **Student Management** - Searchable student directory with detailed info
- **Real-time Updates** - Live data synchronization with backend

### ⚡ Backend Features
- **REST API** - Comprehensive FastAPI-based REST API
- **Excel Processing** - Automatic student data processing from Excel files
- **Room Allocation Algorithm** - Smart grouping and room assignment
- **Authentication** - Secure admin access with Basic Auth
- **File Management** - Fee receipt photo uploads and management
- **Data Validation** - Robust input validation and error handling

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- npm or yarn

### 🔥 One-Click Setup (Recommended)

**Windows:**
```bash
start_both.bat
```

**Linux/Mac:**
```bash
chmod +x start_both.sh
./start_both.sh
```

This will automatically:
1. Start the FastAPI backend on `http://localhost:8000`
2. Start the React frontend on `http://localhost:3000`
3. Open both in your browser

### 📱 Access the Application

- **Frontend Dashboard**: http://localhost:3000
- **Backend API Docs**: http://localhost:8000/docs
- **Admin Credentials**: 
  - Username: `admin`
  - Password: `hostel123`

## 🛠️ Manual Setup

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
python main.py
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📊 System Architecture

```
┌─────────────────┐    HTTP/API     ┌─────────────────┐
│   React Frontend│◄──────────────► │  FastAPI Backend│
│   (Port 3000)   │                 │   (Port 8000)   │
└─────────────────┘                 └─────────────────┘
         │                                    │
         │                                    │
         ▼                                    ▼
┌─────────────────┐                 ┌─────────────────┐
│  UI Components  │                 │  Excel Processing│
│  • Dashboard    │                 │  • Student Data │
│  • Upload       │                 │  • Room Allot   │
│  • Room Grid    │                 │  • File Storage │
│  • Students     │                 │                 │
└─────────────────┘                 └─────────────────┘
```

## 🎯 API Endpoints

### Public Endpoints
- `GET /` - API information and status

### Admin Endpoints (Requires Authentication)
- `POST /admin/upload-excel` - Upload student data Excel file
- `POST /admin/upload-fee-photos` - Upload fee receipt photos
- `GET /admin/allotment-data` - Get current room allotments
- `GET /admin/room-status` - Get status of all 60 rooms
- `POST /admin/reset-allotment` - Reset all allotments
- `GET /admin/uploads` - List all uploaded files

## 📋 Excel File Format

Your Excel file must contain these columns:
- **Student Name** - Full name of the student
- **Preference 1** - First room preference
- **Preference 2** - Second room preference  
- **Preference 3** - Third room preference
- **Fee Paid Date** - Date when fee was paid (for priority sorting)

## 🎨 UI Themes & Design

The frontend features a modern design with:
- **Color Palette**: Blue and purple gradients with glass effects
- **Typography**: Inter font family for clean readability
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Layout**: Responsive grid system with Tailwind CSS

## 🔧 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **React Dropzone** - File upload component

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pandas** - Excel file processing
- **OpenPyXL** - Excel file reading
- **Python Multipart** - File upload handling
- **Passlib** - Password hashing
- **Python JOSE** - JWT token handling

## 📁 Project Structure

```
hostel_room_allotment/
├── 📁 server/                 # FastAPI Backend
│   ├── 📁 app/
│   │   ├── 📁 routes/         # API route handlers
│   │   └── 📁 utils/          # Utility functions
│   ├── 📁 uploads/            # Uploaded files storage
│   ├── main.py               # Server entry point
│   └── requirements.txt      # Python dependencies
├── 📁 client/                 # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   ├── 📁 services/       # API services
│   │   └── 📁 types/          # TypeScript types
│   ├── package.json          # Node.js dependencies
│   └── README.md             # Frontend documentation
├── start_both.bat            # Windows startup script
├── start_both.sh             # Unix startup script
└── README.md                 # This file
```

## 🚦 Usage Workflow

1. **Start the System** - Run `start_both.bat` (Windows) or `start_both.sh` (Unix)
2. **Access Frontend** - Navigate to http://localhost:3000
3. **Upload Data** - Go to "Upload Data" tab and drag/drop Excel file
4. **View Dashboard** - Check statistics and system status
5. **Manage Rooms** - Use "Room Allotments" tab to view room assignments
6. **Browse Students** - Search and view student details in "Students" tab

## 🎬 Features Demo

### Dashboard
- Real-time statistics cards with animations
- System status monitoring
- Recent activity feed

### File Upload
- Drag & drop interface with visual feedback
- File validation and progress tracking
- Success/error notifications

### Room Management
- Interactive 60-room grid visualization
- Color-coded room status (Available/Occupied)
- Group details with student information

### Student Directory
- Searchable student list
- Room assignments and fee status
- Preference tracking

## 🔒 Security Features

- **Admin Authentication** - Basic HTTP authentication for admin endpoints
- **Input Validation** - Comprehensive data validation on both frontend and backend
- **File Type Validation** - Restricted file uploads to prevent security issues
- **CORS Configuration** - Properly configured cross-origin requests

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Check if Python 3.11+ is installed
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Ensure port 8000 is not in use

**Frontend not loading:**
- Check if Node.js 16+ is installed
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**CORS errors:**
- Ensure backend is running on port 8000
- Check that frontend is configured to proxy requests correctly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, create an issue on the GitHub repository or contact the development team.

---

**Made with ❤️ for efficient hostel management**
