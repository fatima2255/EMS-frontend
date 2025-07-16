import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAttendanceLogs } from '../../slices/attendanceSlice';
import axios from 'axios';
import { FaSignInAlt, FaSignOutAlt, FaCoffee, FaUndo } from 'react-icons/fa';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('user_id');

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/${userId}`);
      const sorted = res.data.sort((a, b) => new Date(a.activity_time) - new Date(b.activity_time));
      setLogs(sorted);
      dispatch(setAttendanceLogs(sorted));
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getLastActivity = () => logs[logs.length - 1]?.activity;

  const todayLogs = logs.filter(log =>
    new Date(log.activity_time).toDateString() === new Date().toDateString()
  );

  const hasCheckedInToday = todayLogs.some(log => log.activity === 'checkin');
  const hasCheckedOutToday = todayLogs.some(log => log.activity === 'checkout');
  const lastActivity = getLastActivity();

  const canCheckin = !hasCheckedInToday;
  const canCheckout = hasCheckedInToday && !hasCheckedOutToday;
  const canBrb = (lastActivity === 'checkin' || lastActivity === 'back');
  const canBack = lastActivity === 'brb';

  const handleActivity = async (activity) => {
    try {
      await axios.post('http://localhost:5000/api/attendance', {
        userId,
        activity
      });

      setMessage(`✅ Successfully performed: ${activity}`);
      await fetchLogs(); // Refresh logs after activity
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Error performing action');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🕒 Attendance Panel</h2>

        {message && (
          <div className="mb-4 text-sm text-center py-2 px-4 rounded bg-blue-100 text-blue-700">
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-40"
            onClick={() => handleActivity('checkin')}
            disabled={!canCheckin}
          >
            <FaSignInAlt /> Check In
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-40"
            onClick={() => handleActivity('checkout')}
            disabled={!canCheckout}
          >
            <FaSignOutAlt /> Check Out
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition disabled:opacity-40"
            onClick={() => handleActivity('brb')}
            disabled={!canBrb || lastActivity === 'brb'}
          >
            <FaCoffee /> BRB
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-40"
            onClick={() => handleActivity('back')}
            disabled={!canBack}
          >
            <FaUndo /> Back
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📋 Today’s Logs</h3>
          <ul className="space-y-3">
            {todayLogs.length === 0 && (
              <p className="text-sm text-gray-500 italic">No activity recorded yet.</p>
            )}
            {todayLogs.map((log, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg shadow-sm ${
                  log.activity === 'checkin'
                    ? 'bg-green-50 text-green-700'
                    : log.activity === 'checkout'
                    ? 'bg-red-50 text-red-700'
                    : log.activity === 'brb'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <span className="font-semibold uppercase w-20">{log.activity}</span>
                <span>{new Date(log.activity_time).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
