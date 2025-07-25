import { useEffect, useState } from 'react';
import { getAttendanceLogs, getAllTasks } from '../api/apiConfig';

const WorkingHoursCard = ({ userId, setDaysPresent, setActiveTaskCount, setCompletedCount, setMyTasks }) => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [totalTime, setTotalTime] = useState('Calculating...');

  useEffect(() => {
    const fetchTasksAndAttendance = async () => {
      try {
        const [allTasks, attendance] = await Promise.all([
          getAllTasks(),
          getAttendanceLogs(userId),
        ]);

        const userIdNum = Number(userId);
        const today = new Date().toISOString().split('T')[0];

        const userTasks = allTasks.filter(task => task.assigned_to === userIdNum);

        // ✅ Active (Pending) Tasks: due today or future & not completed
        const activeTasks = userTasks.filter(task =>
          task.status.toLowerCase() !== 'completed' &&
          new Date(task.due_date).toISOString().split('T')[0] >= today
        );

        // ✅ Completed Tasks: completed today or earlier
        const completedTasks = userTasks.filter(task =>
          task.status.toLowerCase() === 'completed'
        );

        setMyTasks(activeTasks);
        setCompletedCount(completedTasks.length);
        setActiveTaskCount(activeTasks.length);

        // Days present calculation
        const uniqueDays = new Set(
          attendance.map(log =>
            new Date(log.activity_time).toISOString().split('T')[0]
          )
        );
        setDaysPresent(uniqueDays.size);
      } catch (error) {
        console.error("Failed to fetch tasks or attendance:", error);
      }
    };

    const fetchAndCalculate = async () => {
      try {
        const entries = await getAttendanceLogs(userId);
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = entries.filter(entry =>
          new Date(entry.activity_time).toISOString().split('T')[0] === today
        );

        const sortedEntries = todayEntries.sort((a, b) => new Date(a.activity_time) - new Date(b.activity_time));

        let checkIn = null;
        let checkOut = null;
        let brbTime = null;
        let inactiveTime = 0;

        sortedEntries.forEach(entry => {
          const time = new Date(entry.activity_time);
          if (entry.activity === 'checkin') checkIn = time;
          else if (entry.activity === 'checkout') checkOut = time;
          else if (entry.activity === 'brb') brbTime = time;
          else if (entry.activity === 'back' && brbTime) {
            inactiveTime += time - brbTime;
            brbTime = null;
          }
        });

        setCheckInTime(checkIn);
        setCheckOutTime(checkOut);

        const updateTime = () => {
          const endTime = checkOut || new Date();
          if (checkIn) {
            const total = endTime - checkIn - inactiveTime;
            const hours = Math.floor(total / (1000 * 60 * 60));
            const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((total % (1000 * 60)) / 1000);
            setTotalTime(`${hours} hours ${minutes} minutes ${seconds} seconds`);
          } else {
            setTotalTime('Not checked in today');
          }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        setTotalTime('Error loading');
      }
    };

    fetchTasksAndAttendance();
    fetchAndCalculate();
  }, [userId]);

  const formatTime = (date) =>
    date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
      <p>Check-In: {formatTime(checkInTime)}</p>
      <p>Check-Out: {checkOutTime ? formatTime(checkOutTime) : '—'}</p>
      <p>Total: {totalTime}</p>
    </div>
  );
};

export default WorkingHoursCard;
