import { useState } from 'react';
import DashboardLayout from '../../../../layouts/dashboard_layout';
import { createProject } from '../../../../api/apiConfig';
import { getSidebarLinks } from '../../../../utils/sideLinks';
import { useSelector } from 'react-redux';




const AddProject = () => {
  const role = useSelector((state) => state.authReducer.role);
  const sidebarLinks = getSidebarLinks(role);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(title, description);
      alert("Project created successfully.");
      setIsError(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Error: ' + (err.message || 'Something went wrong'));
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center"> Add Project</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-blue-900 mb-1">Project Title <span className="text-red-500">*</span> </label>
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
              <label htmlFor="description" className="block text-sm font-semibold text-blue-900 mb-1">Project Description <span className="text-red-500">*</span> </label>
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
            <div className="flex-justify-end">
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
