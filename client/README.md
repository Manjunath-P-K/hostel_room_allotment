# Hostel Room Allotment Frontend

A modern React frontend for the Hostel Room Allotment System with beautiful animations and responsive design.

## Features

- 🎨 Modern UI with Tailwind CSS and Framer Motion animations
- 📱 Fully responsive design
- 🏠 Dashboard with real-time statistics
- 📁 File upload with drag & drop support
- 🏢 Interactive room grid visualization
- 👥 Student management interface
- 🔐 Admin authentication
- 🌟 Glass morphism effects and smooth transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3001`

### Quick Start (Windows)
Run `start.bat` to automatically install dependencies and start the server.

### Quick Start (Unix/Mac)
Run `start.sh` to automatically install dependencies and start the server.

## API Integration

The frontend is configured to work with the FastAPI backend running on `http://localhost:8000`. Make sure your backend server is running before using the frontend.

### Authentication
- Username: `admin`
- Password: `hostel123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **React 18** - UI framework
- **JavaScript ES6+** - Modern JavaScript features
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **React Dropzone** - File uploads

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── FileUpload.jsx  # File upload interface
│   ├── Navbar.jsx      # Navigation bar
│   ├── RoomAllotments.jsx # Room management
│   └── StudentsList.jsx   # Student listing
├── services/           # API services
│   └── api.js         # API configuration
├── App.jsx            # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles
```

## Features Overview

### Dashboard
- Real-time statistics
- System status monitoring
- Recent activity feed

### File Upload
- Drag & drop interface
- Excel file validation
- Fee receipt uploads
- Progress indicators

### Room Allotments
- Visual room grid (1-60)
- Color-coded room status
- Group management
- Reset functionality

### Students List
- Searchable student directory
- Room assignments
- Fee payment status
- Preference tracking
