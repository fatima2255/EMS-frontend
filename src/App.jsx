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
import AddProject from './modules/dashboards/dashboard_admin/Projects/projects';
import ViewProjects from './modules/dashboards/dashboard_admin/Projects/viewProjects';
import AddTask from './modules/dashboards/dashboard_emp/Tasks/addTask';
import TaskList from './modules/dashboards/dashboard_emp/Tasks/viewTasks';
import MyTasks from './modules/dashboards/dashboard_emp/Tasks/myTasks';
import Report from './modules/dashboards/dashboard_admin/report';

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

      <Route path="/employee-dashboard" element={
        <ProtectedRouteByRole allowedRoles={['manager', 'employee']}>
          <Dashboard />
        </ProtectedRouteByRole>
        } />

      <Route path="/admin-dashboard" element={
        <ProtectedRouteByRole allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRouteByRole>
      }
      />

      <Route path="/attendance" element={
        <ProtectedRouteByRole allowedRoles={['manager', 'employee']}>
          <AttendancePage />
        </ProtectedRouteByRole>} />

      <Route path="/view-all-attendance" element={
        <ProtectedRouteByRole allowedRoles={'admin'}>
          <AdminAttendanceView />
        </ProtectedRouteByRole>
      } 
      />
      
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/report" element={<Report />} />

      <Route path="/view-all-employees" element={
        <ProtectedRouteByRole allowedRoles={['admin']}>
          <ViewAllEmployees />
        </ProtectedRouteByRole>
      } />

      <Route path="/add-projects" element={
        <ProtectedRouteByRole allowedRoles={['admin']}>
          <AddProject />
        </ProtectedRouteByRole>
      } />

      <Route path="/view-projects" element={
        <ProtectedRouteByRole allowedRoles={['admin', 'manager']}>
          <ViewProjects />
        </ProtectedRouteByRole>
      } />

      <Route path="/add-tasks" element={
        <ProtectedRouteByRole allowedRoles={['admin', 'manager']}>
          <AddTask />
        </ProtectedRouteByRole>
        
        }/>

      <Route path="/tasks" element={
        <ProtectedRouteByRole allowedRoles={['admin']}>
          <TaskList />
        </ProtectedRouteByRole>
      } />


      <Route path="/myTasks" element={
        <ProtectedRouteByRole allowedRoles={['manager', 'employee']}>
          <MyTasks />
        </ProtectedRouteByRole>
      } />

    </Routes>
  )

}

export default App;
