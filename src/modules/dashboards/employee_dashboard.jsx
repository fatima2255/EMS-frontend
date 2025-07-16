import { useState, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaClock,
  FaTasks,
} from 'react-icons/fa';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Live clock update
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
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-purple-700 text-white relative`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {isSidebarOpen ? (
            <>
              <h1 className="text-lg font-bold whitespace-nowrap">Employee</h1>
              <button onClick={() => setIsSidebarOpen(false)}>
                <FaTimes />
              </button>
            </>
          ) : null}
        </div>

        {/* Sidebar toggle button when closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-5 right-[23px] bg-purple-700 text-white p-2 rounded-r-md shadow-lg"
          >
            <FaBars />
          </button>
        )}

        <nav className="flex flex-col space-y-2 mt-8 px-2">
          <SidebarLink icon={<FaHome />} label="Home" open={isSidebarOpen} />
          <SidebarLink icon={<FaClock />} label="Attendance" open={isSidebarOpen} to="/attendance" />
          <SidebarLink icon={<FaTasks />} label="Tasks" open={isSidebarOpen} />
          <SidebarLink icon={<FaUser />} label="My Profile" open={isSidebarOpen} />
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 hover:bg-purple-800 p-2 rounded text-left"
          >
            <FaSignOutAlt />
            {isSidebarOpen && 'Sign Out'}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MdOutlineCalendarToday className="text-xl" />
            <span>{currentTime.toLocaleString()}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Sign Out
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Total Attendance" value="24" icon={<FaClock />} />
          <SummaryCard title="Holiday This Year" value="65" icon={<FaClock />} />
          <SummaryCard title="Leave This Year" value="15" icon={<FaClock />} />
        </div>

        {/* Charts and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Activity Chart Placeholder */}
          <div className="bg-white p-4 rounded shadow col-span-2">
            <h3 className="text-lg font-semibold mb-2">Employee Activity</h3>
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              Bar Chart Here
            </div>
          </div>

          {/* Task Completion */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Complete Task Target</h3>
            <div className="w-32 h-32 mx-auto rounded-full border-[12px] border-yellow-400 flex items-center justify-center text-xl font-bold">
              78%
            </div>
          </div>
        </div>

        {/* Working Hours + Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Working Hours Placeholder */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
            <p>Check-In: 09:15 AM</p>
            <p>Check-Out: 05:45 PM</p>
            <p>Total: 8 hours 30 minutes</p>
          </div>

          {/* Tasks List */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Update employee profiles</li>
              <li>Review attendance logs</li>
              <li>Submit payroll summary</li>
              <li>Attend team stand-up</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ icon, label, open, to = "#" }) => {
  return (
    <Link to={to} className="flex items-center gap-2 hover:bg-purple-800 p-2 rounded">
      {icon}
      {open && label}
    </Link>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="text-3xl text-purple-600">{icon}</div>
  </div>
);

export default Dashboard;
