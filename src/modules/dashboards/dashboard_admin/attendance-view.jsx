import { useEffect, useState } from "react";
import { fetchAllAttendanceLogs, getAttendanceLogs } from "../../../api/apiConfig";
import { useNavigate } from "react-router-dom";

const AdminAttendanceView = () => {
  const [logs, setLogs] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all logs
  const fetchAllLogs = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAttendanceLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching all logs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch logs by user ID
  const fetchUserLogs = async (userId) => {
    try {
      setLoading(true);
      const data = await getAttendanceLogs(userId);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching user logs:", error);
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
    if (searchUserId.trim() === "") {
      fetchAllLogs();
    } else {
      fetchUserLogs(searchUserId.trim());
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Attendance Logs</h2>
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading logs...</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="text-left px-6 py-3">#</th>
                  <th className="text-left px-6 py-3">User ID</th>
                  <th className="text-left px-6 py-3">Activity</th>
                  <th className="text-left px-6 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <tr
                      key={log._id || index}
                      className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                    >
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{log.userId}</td>
                      <td className="px-6 py-3 capitalize">{log.activity}</td>
                      <td className="px-6 py-3">
                        {new Date(log.activity_time).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No attendance logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAttendanceView;
