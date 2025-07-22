import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { getSidebarLinks } from '../../../../utils/sideLinks';
import { createTask, getAllProjects, getEmployees } from '../../../../api/apiConfig';

const role = localStorage.getItem('role');

// Sidebar links
const sidebarLinks = getSidebarLinks(role);

const AddTask = () => {
    const [projects, setProjects] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [projectId, setProjectId] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);
    const [dueDate, setDueDate] = useState(new Date());
    const [message, setMessage] = useState('');

    const assignedBy = localStorage.getItem('user_id');

    useEffect(() => {
        getAllProjects()
            .then(data => setProjects(data))
            .catch(err => console.error('Failed to fetch projects:', err));

        getEmployees()
            .then(data => {
                // console.log("Fetched users:", data); // debug
                setUsers(data);
            })
            .catch(err => console.error('Failed to fetch users:', err));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTask({
                project_id: parseInt(projectId),
                task_name: taskName,
                task_description: taskDescription,
                assigned_to: parseInt(assignedTo),
                assigned_by: parseInt(assignedBy),
                due_date: dueDate
            });

            setMessage('Task created successfully!');
            setTaskName('');
            setTaskDescription('');
            setProjectId('');
            setAssignedTo('');
            setDueDate(new Date());
        } catch (err) {
            console.error(err);
            setMessage('Error creating task.');
        }
    };

    return (
        <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">📋 Add New Task</h2>

                    {message && (
                        <p className="text-center text-green-700 font-medium mb-4">
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">Select Project</label>
                            <select
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
                                required
                            >
                                <option value="">-- Select Project --</option>
                                {projects.map(project => (
                                    <option key={project.project_id} value={project.project_id}>
                                        #{project.project_id} - {project.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Task Name */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">Task Name</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                placeholder="Enter task title..."
                                required
                            />
                        </div>

                        {/* Task Description */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">Task Description</label>
                            <textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                rows="4"
                                placeholder="Describe the task in detail..."
                                required
                            />
                        </div>

                        {/* Assigned To */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">Assign To</label>
                            <select
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm bg-white"
                                required
                            >
                                <option value="">-- Select Employee --</option>
                                {users
                                    .filter(user => user.role?.toLowerCase() !== 'admin')
                                    .map(user => (
                                        <option key={user.employeeId} value={user.employeeId}>
                                            {user.fullName} (ID: {user.employeeId})
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">Due Date</label>
                            <DatePicker
                                selected={dueDate}
                                onChange={(date) => setDueDate(date)}
                                className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                dateFormat="yyyy-MM-dd"
                                minDate={new Date()}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-800 hover:bg-blue-900 transition-all text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:scale-105"
                            >
                                Assign Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>

    );
};

export default AddTask;
