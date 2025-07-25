import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployeeProfile } from '../../api/apiConfig';

const EmployeeProfile = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("new_user_id");
    //const userRole = useSelector((state) => state.authReducer.role);
    const userRole = localStorage.getItem("new_role"); 
    const [formData, setFormData] = useState({
        address: '',
        designation: '',
        salaryPerMonth: '',
        managerId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            userId: parseInt(userId),
            address: formData.address,
            designation: formData.designation,
            salaryPerMonth: parseInt(formData.salaryPerMonth),
            managerId: parseInt(formData.managerId),
            isManager: userRole === 'manager',
            profile_completed: true
        };

        try {
            await addEmployeeProfile(dataToSend);

            alert("Profile submitted successfully.");
            localStorage.removeItem('new_user_id');
            localStorage.removeItem('new_role');
            navigate('/admin-dashboard'); 
        } catch (err) {
            alert('Error: ' + (err.message || 'Something went wrong'));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Set Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 text-white bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 text-white bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your designation"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold">Salary Per Month</label>
                        <input
                            type="number"
                            name="salaryPerMonth"
                            value={formData.salaryPerMonth}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 text-white bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your salary"
                            min="10000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold">Manager ID</label>
                        <input
                            type="number"
                            name="managerId"
                            value={formData.managerId}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 text-white bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter manager ID"
                             min="1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Submit Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeProfile;
