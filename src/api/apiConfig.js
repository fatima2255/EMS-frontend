import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;



//============================================= RESET PASSWORD APIS ==============================================

export const sendResetLink = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset link');
  }
};

export const resetPassword = async (token, password) => {
  try {
    const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};


//============================================= AUTH APIS ==============================================
export const signupUser = async (form) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, form);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Signup failed';
    throw new Error(message);
  }
};


export const signinUser = async (form) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, form);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Signin failed';
    throw new Error(message);
  }
};

//========================================= EMPLOYEE APIS===============================================
export const addEmployeeProfile = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/employees/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
