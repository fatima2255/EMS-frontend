import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getAttendanceLogs, getAllTasks } from '../api/apiConfig';

const WeeklyActivityChart = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logs, allTasks] = await Promise.all([
          getAttendanceLogs(userId),
          getAllTasks(),
        ]);

        // Filter tasks for current user and completed
        const userCompletedTasks = allTasks.filter(
          (task) =>
            task.assigned_to === Number(userId) &&
            task.status === 'completed' &&
            task.submission_date // Make sure there's a submission date
        );

        const today = new Date();
        const past7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(today.getDate() - i);
          return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        }).reverse();

        const formatted = past7Days.map((dateStr) => {
          const checkins = logs.filter(
            (log) =>
              log.activity === 'checkin' &&
              new Date(log.activity_time).toISOString().startsWith(dateStr)
          );

          const checkouts = logs.filter(
            (log) =>
              log.activity === 'checkout' &&
              new Date(log.activity_time).toISOString().startsWith(dateStr)
          );

          const completedTasks = userCompletedTasks.filter(
            (task) =>
              new Date(task.submission_date).toISOString().startsWith(dateStr)
          );

          return {
            day: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
            checkin: checkins.length,
            checkout: checkouts.length,
            completedTasks: completedTasks.length,
          };
        });

        setData(formatted);
      } catch (err) {
        console.error("Error fetching weekly chart data:", err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow col-span-2">
      <h3 className="text-lg font-semibold mb-2">Employee Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="checkin" fill="#3b82f6" name="Check-in" />
          <Bar dataKey="checkout" fill="#f59e0b" name="Check-out" />
          <Bar dataKey="completedTasks" fill="#10b981" name="Tasks Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivityChart;
