import { useEffect, useState } from "react";
import { fetchAllAttendanceLogs, getAttendanceLogs } from "../../../api/apiConfig";
import DashboardLayout from "../../../layouts/dashboard_layout";
import { FaHome, FaUserPlus, FaClock, FaProjectDiagram, FaTasks} from 'react-icons/fa';

const AdminAttendanceView = () => {
  const [logs, setLogs] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");

  const sidebarLinks = [
    { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
    { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
    { to: '/view-all-employees', label: 'View Employees', icon: <FaUserPlus /> },
    { to: '/add-projects', label: 'Add Projects', icon: <FaProjectDiagram /> },
    { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
  ];


  const fetchAllLogs = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAttendanceLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching all logs:", error);
      setError("Failed to load logs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLogs = async (userId) => {
    try {
      setLoading(true);
      const data = await getAttendanceLogs(userId);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching user logs:", error);
      setError("User not found or server error.");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    if (searchUserId.trim() === "") {
      fetchAllLogs();
    } else {
      fetchUserLogs(searchUserId.trim());
    }
  };

  const formatDate = (datetime) => new Date(datetime).toLocaleDateString();
  const formatTime = (datetime) =>
    new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <DashboardLayout role="Admin" sidebarLinks={sidebarLinks}>
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Attendance Logs</h2>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Search by User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center text-blue-600 font-semibold">Loading logs...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : logs.length === 0 ? (
          <div className="text-center text-gray-500">No attendance logs found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gradient-to-r from-blue-900 to-black text-white">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Activity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log._id || index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{log.userId}</td>
                    <td className="px-4 py-2">{log.fullName || "unknown"}</td>
                    <td className="px-4 py-2 capitalize">{log.activity}</td>
                    <td className="px-4 py-2">{formatDate(log.activity_time)}</td>
                    <td className="px-4 py-2">{formatTime(log.activity_time)}</td>
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

export default AdminAttendanceView;
