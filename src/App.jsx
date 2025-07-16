import Signup from './modules/auth/pages/signup';
import Signin from './modules/auth/pages/signin';
import ForgotPassword from './modules/Password/forgetPassword';
import ResetPassword from './modules/Password/resetPassword';
import EmployeeProfile from './modules/employee/employee-profile';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
    </Routes>
  )

}

export default App;
