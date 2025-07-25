import { useEffect, useState } from 'react';
import DashboardLayout from '../../../layouts/dashboard_layout';
import { FaClock } from 'react-icons/fa';
import { getSidebarLinks } from '../../../utils/sideLinks';
import WeeklyActivityChart from '../../../components/weeklyActivity';
import { useSelector } from 'react-redux';
import TaskTarget from '../../../components/taskTarget';
import SummaryCard from "../../../components/summaryCard";
import WorkingHoursCard from "../../../components/workingHours";

const EmployeeDashboard = () => {
  const userId = localStorage.getItem("user_id");
  const [myTasks, setMyTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [daysPresent, setDaysPresent] = useState(0);

  const role = useSelector((state) => state.authReducer.role);
  const sidebarLinks = getSidebarLinks(role);

  const totalTasks = myTasks.length + completedCount; // Only active + completed future tasks
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
          <TaskTarget completedTasks={completedCount} totalTasks={totalTasks} percentage={percentage} />
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
          <h3 className="text-lg font-semibold mb-2">Upcoming Tasks</h3>
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
              <li className="text-gray-500">No upcoming tasks.</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
