import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

//============================================= RESET PASSWORD APIs ==============================================

export const sendResetLink = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset link');
  }
};

export const resetPassword = async (password) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};


//============================================== AUTH APIs  ========================================================
export const signupUser = async (form) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.post(`${API_URL}/auth/signup`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

//============================================= EMPLOYEE APIs =======================================================
export const addEmployeeProfile = async (data) => {
  const token = localStorage.getItem("accessToken");
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

export const getEmployees = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${API_URL}/employees/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateEmployee = async (userId, updatedData) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.put(
    `${API_URL}/employees/update/${userId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

//============================================= ATTENDANCE APIs ====================================================

export const getAttendanceLogs = async (userId) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_URL}/attendance/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Post new attendance activity with token
export const postAttendanceActivity = async ({ userId, activity }) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_URL}/attendance`,
    { userId, activity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Fetch all attendance logs with token
export const fetchAllAttendanceLogs = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${API_URL}/attendance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


//===================================================== PROJECT APIs ==========================================================

export const createProject = async (title, description) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_URL}/projects/add`,
    { title, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getAllProjects = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_URL}/projects/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProject = async (projectId, data) => {
  const token = localStorage.getItem('accessToken');
  return axios.put(`${API_URL}/projects/update/${projectId}`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem('accessToken');

  return axios.delete(`${API_URL}/projects/delete/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );
};


//===================================================== TASK APIs ==========================================================


export const createTask = (taskData) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(`${API_URL}/tasks/add`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTasks = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const updateTaskStatus = async (taskId, status) => {
  const response = await axios.patch(`${API_URL}/tasks/update-status/${taskId}`, {
    status
  });
  return response.data;
};

//===================================================== REPORT API ==========================================================
export const generateReport = async (userId) => {
  const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${API_URL}/reports/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token
            },
            responseType: 'blob',
        });

        return response.data; 
    } catch (err) {
        console.error('Error generating report:', err);
        throw err;
    }
};

