import React, { useEffect, useState } from 'react';
import { getAllTasks, getAllProjects, getEmployees } from '../../../../api/apiConfig';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { FaHome, FaClock, FaTasks, FaUser, FaProjectDiagram, FaUserPlus } from 'react-icons/fa';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const role = localStorage.getItem('role');

    const sidebarLinks = role === "manager"
        ? [
            { to: '/employee-dashboard', label: 'Home', icon: <FaHome /> },
            { to: '/attendance', label: 'Attendance', icon: <FaClock /> },
            { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
            { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
            { to: '/employee-profile', label: 'My Profile', icon: <FaUser /> },
            { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
        ]
        : [
            { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
            { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
            { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
            { to: '/view-all-employees', label: 'View Employees', icon: <FaUserPlus /> },
            { to: '/add-projects', label: 'Add Projects', icon: <FaProjectDiagram /> },
            { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
            { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
            { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
        ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksData, projectsData, usersData] = await Promise.all([
                    getAllTasks(),
                    getAllProjects(),
                    getEmployees()
                ]);

                setTasks(tasksData);
                setProjects(projectsData);
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getProjectTitle = (project_id) => {
        const project = projects.find(p => p.project_id === project_id);
        return project ? project.title : 'Unknown Project';
    };

    const getUsername = (id) => {
        const user = users.find(u => u.employeeId === id);
        return user ? user.fullName : `User ${id}`;
    };

    return (
        <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
            <div className="bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Tasks</h2>

                {loading ? (
                    <div className="text-center text-blue-600 font-semibold">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="text-center text-gray-500">No tasks found.</div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gradient-to-r from-blue-900 to-black text-white">
                                <tr>
                                    <th className="px-4 py-2">Project</th>
                                    <th className="px-4 py-2">Task ID</th>
                                    <th className="px-4 py-2">Task Title</th>
                                    <th className="px-4 py-2">Assigned To</th>
                                    <th className="px-4 py-2">Assigned By</th>
                                    <th className="px-4 py-2">Due Date</th>
                                    <th className="px-4 py-2">Submission Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{getProjectTitle(task.project_id)}</td>
                                        <td className="px-4 py-2">{task.task_id}</td>
                                        <td className="px-4 py-2">{task.task_name}</td>
                                        <td className="px-4 py-2">{getUsername(task.assigned_to)}</td>
                                        <td className="px-4 py-2">{getUsername(task.assigned_by)}</td>
                                        <td className="px-4 py-2">{new Date(task.due_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">
                                            {task.submission_date ? new Date(task.submission_date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-4 py-2 capitalize">{task.status}</td>
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

export default TaskList;
