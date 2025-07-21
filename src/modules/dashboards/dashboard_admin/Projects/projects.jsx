import { useState } from 'react';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { FaHome, FaUserPlus, FaClock, FaProjectDiagram, FaTasks } from 'react-icons/fa';
import { createProject } from '../../../../api/apiConfig';

const sidebarLinks =
  [
    { to: '/admin-dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/signup', label: 'Add User', icon: <FaUserPlus /> },
    { to: '/view-all-attendance', label: 'Attendance', icon: <FaClock /> },
    { to: '/view-all-employees', label: 'View Employees', icon: <FaUserPlus /> },
    { to: '/add-projects', label: 'Add Projects', icon: <FaProjectDiagram /> },
    { to: '/view-projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { to: '/add-tasks', label: 'Assign Tasks', icon: <FaTasks /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
  ];


const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(title, description);
      setMessage('✅ Project created successfully!');
      setIsError(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      setMessage('❌ Failed to create project. Please try again.');
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <DashboardLayout role="Admin" sidebarLinks={sidebarLinks}>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center"> Add Project</h2>

          {message && (
            <p className={`text-center font-medium mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-blue-900 mb-1">Project Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-blue-900 mb-1">Project Description</label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                placeholder="Describe the project"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 transition-all text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:scale-105"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProject;
