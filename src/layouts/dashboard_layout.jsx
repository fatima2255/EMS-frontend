import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../src/slices/authSlice';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';

const DashboardLayout = ({ role, sidebarLinks, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        role={role}
        links={sidebarLinks}
        onSignOut={handleSignOut}
      />
      <div className="flex-1 p-6 overflow-y-auto">
        <TopBar currentTime={currentTime} onSignOut={handleSignOut} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
