import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../../api/apiConfig';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await signupUser(form);

      //localStorage.clear();
      localStorage.setItem('new_user_id', data.userId);
      localStorage.setItem('new_role', data.role);

      alert('Signup successful! Redirecting to profile setup...');

      navigate('/employee-profile');
    } catch (err) {
      setError(err.message || 'Signup failed');
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact", name: "contact", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-300 font-medium">{field.label} <span className="text-red-500">*</span> </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

          ))}

          {/* Password Field with Show/Hide */}
          <div>
            <label className="block text-gray-300 font-medium">Password <span className="text-red-500">*</span> </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-300 hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>


          <div>
            <label className="block text-gray-300 font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded font-semibold transition duration-200"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;