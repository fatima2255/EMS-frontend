import { FaHome, FaTasks, FaClock, FaProjectDiagram, FaUserPlus, FaDownload } from 'react-icons/fa';

export const getSidebarLinks = (role) => {
    if (role === "manager") {
        return [
            { to: '/employee-dashboard', label: 'Home', icon: <FaHome /> },
            { to: '/attendance', label: 'Attendance', icon: <FaClock /> },
            { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
            { to: '/myTasks', label: 'Tasks', icon: <FaTasks /> },
            { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
        ];
    } else if (role === 'employee') {
        return [
            { to: '/employee-dashboard', label: 'Home', icon: <FaHome /> },
            { to: '/attendance', label: 'Attendance', icon: <FaClock /> },
            { to: '/myTasks', label: 'My Tasks', icon: <FaTasks /> },
        ];
    } else if (role === 'admin') {
        return [
            { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
            { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
            { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
            { to: '/view-all-employees', label: 'View Employees', icon: <FaUserPlus /> },
            { to: '/add-projects', label: 'Add Projects', icon: <FaProjectDiagram /> },
            { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
            { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
            { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
            { to: '/report', label: 'Reports', icon: <FaDownload /> },
        ];
    }
};
