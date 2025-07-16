import Signup from './modules/auth/pages/signup';
import Signin from './modules/auth/pages/signin';
import ForgotPassword from './modules/Password/forgetPassword';
import ResetPassword from './modules/Password/resetPassword';
import EmployeeProfile from './modules/employee/employee-profile';
import Dashboard from './modules/dashboards/employee_dashboard';
import AttendancePage from './modules/dashboards/attendance';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
      <Route path="/employee-dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<AttendancePage />} />
    </Routes>
  )

}

export default App;
