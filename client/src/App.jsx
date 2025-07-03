import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import RoomAllotments from './components/RoomAllotments';
import StudentsList from './components/StudentsList';
import AdminLogin from './components/AdminLogin';

function App() {
  const [activeTab, setActiveTab] = useState('allotments');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (username, password) => {
    setLoginError('');
    // Try to access a protected admin endpoint to verify credentials
    const res = await fetch('/admin/allotment-data', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }
    });
    if (res.ok) {
      setIsAdmin(true);
      setShowLogin(false);
      setActiveTab('dashboard');
      // Store credentials in sessionStorage for future requests
      sessionStorage.setItem('adminAuth', btoa(`${username}:${password}`));
    } else {
      setLoginError('Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('adminAuth');
    setActiveTab('allotments');
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setLoginError('');
  };

  const handleCancelLogin = () => {
    setShowLogin(false);
    setLoginError('');
    setActiveTab('allotments'); // Ensure we go back to allotments
  };

  const handleHideLogin = () => {
    setShowLogin(false);
    setLoginError('');
  };

  const renderContent = () => {
    if (showLogin && !isAdmin) {
      return <AdminLogin onLogin={handleLogin} error={loginError} onCancel={handleCancelLogin} />;
    }
    
    // Always show Room Allotments for non-admins, regardless of activeTab
    if (!isAdmin) {
      return <RoomAllotments isAdmin={false} />;
    }
    
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <FileUpload />;
      case 'allotments':
        return <RoomAllotments isAdmin={isAdmin} />;
      case 'students':
        return <StudentsList />;
      default:
        return <RoomAllotments isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onShowLogin={handleShowLogin}
        onHideLogin={handleHideLogin}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
