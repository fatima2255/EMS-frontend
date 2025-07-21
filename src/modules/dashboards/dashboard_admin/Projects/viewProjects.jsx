import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { FaHome, FaProjectDiagram, FaUserPlus, FaClock, FaEdit, FaTrash, FaTasks, FaUser } from 'react-icons/fa';
import { getAllProjects } from '../../../../api/apiConfig';

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


const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // State for update modal
    const [editingProject, setEditingProject] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    // State for delete confirmation
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchAllProjects();
    }, []);

    const fetchAllProjects = async () => {
        try {
            setLoading(true);
            const data = await getAllProjects();
            setProjects(data);
            setMessage('');
        } catch (err) {
            console.error(err);
            setMessage('Failed to fetch projects.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = (project) => {
        setEditingProject(project);
        setUpdatedTitle(project.title);
        setUpdatedDescription(project.description);
    };

    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/projects/update/${editingProject.project_id}`, {
                title: updatedTitle,
                description: updatedDescription,
            });
            setEditingProject(null);
            fetchAllProjects();
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/delete/${id}`);
            setConfirmDeleteId(null);
            fetchAllProjects();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    return (
        <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
            <div className="min-h-[80vh] p-6 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">All Projects</h2>

                    {loading && <p className="text-center text-blue-700">Loading projects...</p>}
                    {message && !loading && (
                        <p className="text-center text-red-600 font-medium">{message}</p>
                    )}

                    {!loading && projects.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            {projects.map((project) => (
                                <div
                                    key={project.project_id}
                                    className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all border border-blue-100 relative"
                                >
                                    <h3 className="text-xl font-semibold text-blue-800 mb-2">
                                        #{project.project_id} - {project.title}
                                    </h3>
                                    <p className="text-gray-700">{project.description}</p>

                                    {role === 'admin' && (
                                        <div className="mt-4 flex gap-4">
                                            <button
                                                onClick={() => handleUpdateClick(project)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => setConfirmDeleteId(project.project_id)}
                                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Update Modal */}
                    {editingProject && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                                <h3 className="text-xl font-semibold mb-4 text-blue-800">Update Project</h3>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Project Title"
                                />
                                <textarea
                                    value={updatedDescription}
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                                    rows="4"
                                    placeholder="Project Description"
                                ></textarea>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setEditingProject(null)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateSubmit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation */}
                    {confirmDeleteId !== null && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                                <h3 className="text-lg font-semibold mb-4 text-red-700">Are you sure you want to delete this project?</h3>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => handleDelete(confirmDeleteId)}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewProjects;
