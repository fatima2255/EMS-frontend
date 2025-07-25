import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../../api/apiConfig';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', password: '' });
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear specific error when the user starts typing
        if (name === 'username') setUsernameError('');
        if (name === 'password') setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');

        try {
            const data = await signinUser(form);
            console.log("data from backend:", data);

            dispatch(login({
                user_id: data.userId,
                role: data.role,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            }));
            console.log("id from localStorage:", localStorage.getItem('user_id'));

            const role = localStorage.getItem('role');
            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'manager' || role === 'employee') {
                navigate('/employee-dashboard');
            }
        } catch (err) {
            console.log("Login error:", err.message);

            // Example error handling based on backend response
            if (err.message.toLowerCase().includes('username')) {
                setUsernameError('Invalid username');
            } else if (err.message.toLowerCase().includes('password')) {
                setPasswordError('Invalid password');
            } else {
                setPasswordError('Invalid username or password');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">Username <span className="text-red-500">*</span> </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className={`w-full border ${usernameError ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {usernameError && <p className="text-red-400 text-sm mt-1">{usernameError}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">Password <span className="text-red-500">*</span> </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                        {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-3 py-2 px-4 rounded font-semibold transition duration-200"
                    >
                        Sign In
                    </button>

                    <div className='text-left mt-2 text-white'>
                        <p>
                            <a href="/forget-password" className="text-indigo-400 hover:underline">Forgot password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
