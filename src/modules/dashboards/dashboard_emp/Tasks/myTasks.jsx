import React, { useEffect, useState } from 'react';
import { getAllTasks, getAllProjects, getEmployees, updateTaskStatus } from '../../../../api/apiConfig';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { getSidebarLinks } from '../../../../utils/sideLinks';

const MyTasks = () => {
    const userId = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const sidebarLinks = getSidebarLinks(role);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allTasks, allProjects, allEmployees] = await Promise.all([
                    getAllTasks(),
                    getAllProjects(),
                    getEmployees()
                ]);

                const myTasks = allTasks.filter(task => task.assigned_to.toString() === userId);
                setTasks(myTasks);
                setProjects(allProjects);
                setEmployees(allEmployees);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const getProjectTitle = (id) => {
        const project = projects.find(p => p.project_id === id);
        return project ? project.title : 'Unknown Project';
    };

    const getAssignedByName = (id) => {
        const user = employees.find(u => u.employeeId === id);
        return user ? user.fullName : `User ${id}`;
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const response = await updateTaskStatus(taskId, newStatus);

            const updatedTasks = tasks.map(task =>
                task.task_id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                        submission_date: newStatus === 'completed' ? new Date().toISOString() : task.submission_date
                    }
                    : task
            );

            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    return (
        <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
            <div className="bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Tasks</h2>
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
                                    <th className="px-4 py-2">Task Name</th>
                                    <th className="px-4 py-2">Assigned By</th>
                                    <th className="px-4 py-2">Due Date</th>
                                    <th className="px-4 py-2">Submission Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id} className="border-b">
                                        <td className="px-4 py-2">{getProjectTitle(task.project_id)}</td>
                                        <td className="px-4 py-2">{task.task_name}</td>
                                        <td className="px-4 py-2">{getAssignedByName(task.assigned_by)}</td>
                                        <td className="px-4 py-2">{new Date(task.due_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">
                                            {task.submission_date ? new Date(task.submission_date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-4 py-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
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

export default MyTasks;
