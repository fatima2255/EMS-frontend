import { useEffect, useState } from 'react';
import { getEmployees } from '../../../api/apiConfig';
import DashboardLayout from '../../../layouts/dashboard_layout';
import { FaHome, FaUserPlus, FaClock } from 'react-icons/fa';

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token and role from localStorage
  const token = localStorage.getItem('accessToken');

  const sidebarLinks = [
    { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
    { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
    { to: '/view-all-employees', label: 'View Employees', icon: <FaUserPlus /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployees(token);
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <DashboardLayout role="Admin" sidebarLinks={sidebarLinks}>
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Employees</h2>

        {loading ? (
          <div className="text-center text-blue-600 font-semibold">Loading employees...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : employees.length === 0 ? (
          <div className="text-center text-gray-500">No employees found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gradient-to-r from-blue-900 to-black text-white">
                <tr>
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Manager Full Name</th>
              <th className="px-4 py-2">Manager ID</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{emp.employeeId}</td>
                <td className="px-4 py-2">{emp.fullName}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">{emp.designation}</td>
                <td className="px-4 py-2">Rs. {emp.salary}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.username}</td>
                <td className="px-4 py-2">{emp.contact}</td>
                <td className="px-4 py-2">{emp.managerFullName}</td>
                <td className="px-4 py-2">{emp.managerId}</td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewAllEmployees;
