import { useEffect, useState } from "react";
import { FaUsers, FaProjectDiagram, FaTasks } from "react-icons/fa";
import DashboardLayout from "../../../layouts/dashboard_layout";
import { getSidebarLinks } from "../../../utils/sideLinks";
import { useSelector } from "react-redux";
import SummaryCard from "../../../components/summaryCard";
import AttendanceChart from "../../../components/attendanceChart";
import { getEmployees, getAllProjects, getAllTasks, fetchAllAttendanceLogs } from "../../../api/apiConfig";

const AdminDashboard = () => {
  const role = useSelector((state) => state.authReducer.role);
  const sidebarLinks = getSidebarLinks(role);

  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    pendingTasks: 0,
  });
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employees = await getEmployees();
        const projects = await getAllProjects();
        const tasks = await getAllTasks();
        const attendanceLogs = await fetchAllAttendanceLogs();

        // Count only pending tasks
        const pendingTasks = tasks.filter(
          (task) => task.status?.toLowerCase() === "pending"
        );

        setStats({
          employees: employees.length,
          projects: projects.length,
          pendingTasks: pendingTasks.length,
        });

        // Prepare date range for last 7 days
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);

        // Initialize a map for counting attendance per day
        const dailyAttendanceMap = new Map();

        attendanceLogs.forEach((log) => {
          const logDate = new Date(log.activity_time); // parse activity_time
          if (isNaN(logDate.getTime())) return; // skip invalid date

          // Only consider logs in last 7 days
          if (logDate >= sevenDaysAgo && logDate <= today) {
            const dateKey = logDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            dailyAttendanceMap.set(
              dateKey,
              (dailyAttendanceMap.get(dateKey) || 0) + 1
            );
          }
        });

        // Convert map to chart-friendly array (sorted by date)
        const chartData = Array.from(dailyAttendanceMap.entries())
          .map(([date, present]) => ({ time: date, present }))
          .sort((a, b) => new Date(a.time) - new Date(b.time));

        setAttendanceData(chartData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
      <div className="text-xl font-semibold mb-4">Welcome Admin</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Employees" value={stats.employees} icon={<FaUsers />} />
        <SummaryCard title="Active Projects" value={stats.projects} icon={<FaProjectDiagram />} />
        <SummaryCard title="Pending Tasks" value={stats.pendingTasks} icon={<FaTasks />} />
      </div>

      {/* Attendance Chart */}
      <AttendanceChart data={attendanceData} />
    </DashboardLayout>
  );
};

export default AdminDashboard;
