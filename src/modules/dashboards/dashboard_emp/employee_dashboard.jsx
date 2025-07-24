import { useEffect, useState } from 'react';
import DashboardLayout from '../../../layouts/dashboard_layout';
import { FaClock } from 'react-icons/fa';
import { getSidebarLinks } from '../../../utils/sideLinks';
import { getAttendanceLogs, getAllTasks } from '../../../api/apiConfig';
import WeeklyActivityChart from '../../../components/weeklyActivity';
import { useSelector } from 'react-redux';
import TaskTarget from '../../../components/taskTarget';



// Summary Card Component
const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="text-3xl text-blue-950">{icon}</div>
  </div>
);

// Working Hours Component
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

        // ✅ Active Tasks: due today or in future & not completed
        const activeTasks = userTasks.filter(task =>
          task.status.toLowerCase() !== 'completed' &&
          new Date(task.due_date).toISOString().split('T')[0] >= today
        );

        // ✅ Completed Today Tasks
        const completedToday = userTasks.filter(task =>
          task.status.toLowerCase() === 'completed' &&
          task.completed_at && new Date(task.completed_at).toISOString().split('T')[0] === today
        );

        setMyTasks(activeTasks);
        setCompletedCount(completedToday.length);
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

// Main Dashboard
const EmployeeDashboard = () => {
  const userId = localStorage.getItem("user_id");
  const [myTasks, setMyTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [daysPresent, setDaysPresent] = useState(0);

  const role = useSelector((state) => state.authReducer.role);
  const sidebarLinks = getSidebarLinks(role);

  const totalTasks = myTasks.length + completedCount;
  const percentage = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    
    <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Days Present" value={daysPresent} icon={<FaClock />} />
        <SummaryCard title="Completed Tasks" value={completedCount} icon={<FaClock />} />
        <SummaryCard title="Active Tasks" value={activeTaskCount} icon={<FaClock />} />
      </div>

      {/* Charts and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow col-span-2">
          <WeeklyActivityChart userId={userId} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <TaskTarget completedTasks={2} totalTasks={4} />
        </div>
      </div>

      {/* Working Hours and Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <WorkingHoursCard
          userId={userId}
          setDaysPresent={setDaysPresent}
          setActiveTaskCount={setActiveTaskCount}
          setCompletedCount={setCompletedCount}
          setMyTasks={setMyTasks}
        />
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
          <ul className="list-disc pl-6 space-y-1">
            {myTasks.length > 0 ? (
              myTasks.map((task) => (
                <li key={task._id}>
                  <span className="font-medium">{task.task_name}</span>: {task.task_description}
                  <span className="block text-sm text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No active tasks for today.</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;