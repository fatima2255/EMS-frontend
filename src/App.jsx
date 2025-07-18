import Signup from './modules/auth/pages/signup';
import Signin from './modules/auth/pages/signin';
import ForgotPassword from './modules/Password/forgetPassword';
import ResetPassword from './modules/Password/resetPassword';
import EmployeeProfile from './modules/employee/employee-profile';
import Dashboard from './modules/dashboards/dashboard_emp/employee_dashboard';
import AttendancePage from './modules/dashboards/dashboard_emp/attendance';
import LandingPage from './modules/landingPage/landingPage';
import AdminDashboard from './modules/dashboards/dashboard_admin/admin_dashboard';
import AdminAttendanceView from './modules/dashboards/dashboard_admin/attendance-view';
import NotFoundPage from './modules/not-found-page.jsx/not_found';
import ViewAllEmployees from './modules/dashboards/dashboard_admin/allEmployees';
import { Routes, Route } from 'react-router-dom';
import ProtectedRouteByRole from '../src/utils/protectedRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/signup"
        element={
          <ProtectedRouteByRole allowedRoles={['admin']}>
            <Signup />
          </ProtectedRouteByRole>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/employee-profile" 
      element={
          <ProtectedRouteByRole allowedRoles={['admin']}>
            <EmployeeProfile />
          </ProtectedRouteByRole>
        } 
      />
      <Route path="/employee-dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/attendance" element={<AttendancePage />} />
      
      <Route path="/view-all-attendance" element={<AdminAttendanceView />} />
      <Route path="/not-found" element={<NotFoundPage />} />
    
  
      <Route path="/view-all-employees" element={<ViewAllEmployees />} />


    </Routes>
  )

}

export default App;
