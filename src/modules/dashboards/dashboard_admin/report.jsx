import { useEffect, useState } from 'react';
import DashboardLayout from '../../../layouts/dashboard_layout';
import { getEmployees, generateReport } from '../../../api/apiConfig';
import { getSidebarLinks } from '../../../utils/sideLinks';
import { useSelector } from 'react-redux';


const Report = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(true);

    const role = useSelector((state) => state.authReducer.role);
    const sidebarLinks = getSidebarLinks(role);


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                const filtered = data.filter(user => user.role?.toLowerCase() !== 'admin');
                setUsers(filtered);
            } catch (err) {
                console.error('Error fetching employees:', err);
                alert('Failed to load employee list.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleGenerateReport = async () => {
        if (!selectedUserId) {
            alert('Please select a user first.');
            return;
        }

        try {
            const blob = await generateReport(selectedUserId);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `weekly_report_${selectedUserId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            alert('Error downloading report');
        }
    };

    return (
        <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
            <div className="min-h-140 bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">📄 Generate Weekly Report</h2>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading users...</p>
                    ) : (
                        <>
                            <label className="block text-blue-900 font-semibold mb-2">Select Employee</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm mb-4"
                            >
                                <option value="">-- Select Employee --</option>
                                {users.map((user) => (
                                    <option key={user.employeeId} value={user.employeeId}>
                                        {user.fullName} (ID: {user.employeeId})
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleGenerateReport}
                                className="w-full bg-blue-800 hover:bg-blue-900 transition-all text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
                            >
                                Generate Report
                            </button>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Report;
