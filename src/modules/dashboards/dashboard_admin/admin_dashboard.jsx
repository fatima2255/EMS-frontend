import DashboardLayout from '../../../layouts/dashboard_layout';
import { FaHome, FaUserPlus, FaClock } from 'react-icons/fa';

const sidebarLinks = [
  { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
  { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
  { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="Admin" sidebarLinks={sidebarLinks}>
      <div className="text-xl font-semibold mb-4">Welcome Admin</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Quick Actions</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Create user accounts for employees or managers</li>
            <li>Assign roles and set profile details</li>
            <li>View complete attendance table</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">System Status</h3>
          <p className="text-gray-600">System running smoothly.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
