import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../../api/apiConfig';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await signinUser(form);

            // Save tokens only
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Dispatch user info to Redux
            dispatch(login(data));

            alert('Signin successful');

            // Navigate according to role
            const role = localStorage.getItem('role');
            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'manager') {
                navigate('/manager-dashboard'); // optional: create a manager route
            } else {
                navigate('/employee-dashboard');
            }

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign In</h2>

                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition duration-200"
                    >
                        Sign In
                    </button>

                    <div className='text-center mt-4 text-white'>
                        <p>
                            Don't have an account? <a href="/signup" className="text-indigo-400 hover:underline">Sign Up</a>
                        </p>
                        <p>
                            <a href="/forget-password" className="text-indigo-400 hover:underline">Forget password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
