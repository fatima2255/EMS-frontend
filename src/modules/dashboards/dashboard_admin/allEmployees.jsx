import { useEffect, useState } from 'react';
import { getEmployees, updateEmployee } from '../../../api/apiConfig';
import DashboardLayout from '../../../layouts/dashboard_layout';
import { getSidebarLinks } from '../../../utils/sideLinks';
import { FaEdit } from 'react-icons/fa';

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const sidebarLinks = getSidebarLinks(role);

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(token);
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch employees');
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee.employeeId);
    setUpdatedData(employee);
  };

  const handleUpdateChange = (field, value) => {
    setUpdatedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await updateEmployee(editingEmployee, updatedData);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <DashboardLayout role={role} sidebarLinks={sidebarLinks}>
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Employees</h2>

        {loading ? (
          <div className="text-center text-blue-600 font-semibold">Loading employees...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : employees.length === 0 ? (
          <div className="text-center text-gray-500">No employees found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gradient-to-r from-blue-900 to-black text-white">
                <tr>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Designation</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Manager Name</th>
                  <th className="px-4 py-2">Manager ID</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{emp.employeeId}</td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.fullName || ''}
                          onChange={(e) => handleUpdateChange('fullName', e.target.value)}
                        />
                      ) : emp.fullName}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <select
                          className="border px-2 py-1 rounded"
                          value={updatedData.role}
                          onChange={(e) => handleUpdateChange('role', e.target.value)}
                        >
                          <option value="employee">Employee</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : emp.role}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.designation || ''}
                          onChange={(e) => handleUpdateChange('designation', e.target.value)}
                        />
                      ) : emp.designation}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          type="number"
                          className="border px-2 py-1 rounded"
                          value={updatedData.salary || ''}
                          onChange={(e) => handleUpdateChange('salary', e.target.value)}
                        />
                      ) : `Rs. ${emp.salary}`}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.email || ''}
                          onChange={(e) => handleUpdateChange('email', e.target.value)}
                        />
                      ) : emp.email}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.username || ''}
                          onChange={(e) => handleUpdateChange('username', e.target.value)}
                        />
                      ) : emp.username}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.contact || ''}
                          onChange={(e) => handleUpdateChange('contact', e.target.value)}
                        />
                      ) : emp.contact}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          className="border px-2 py-1 rounded"
                          value={updatedData.managerFullName || ''}
                          onChange={(e) => handleUpdateChange('managerFullName', e.target.value)}
                        />
                      ) : emp.managerFullName}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <input
                          type="number"
                          className="border px-2 py-1 rounded"
                          value={updatedData.managerId || ''}
                          onChange={(e) => handleUpdateChange('managerId', e.target.value)}
                        />
                      ) : emp.managerId}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee === emp.employeeId ? (
                        <button
                          onClick={handleUpdateSubmit}
                          className="text-green-600 hover:underline font-medium"
                        >
                          Save
                        </button>
                      ) : (
                        <FaEdit
                          onClick={() => handleEdit(emp)}
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        />
                      )}
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

export default ViewAllEmployees;