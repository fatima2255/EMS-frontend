import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import employeeReducer from '../slices/employeeSlice'
import attendanceReducer from '../slices/attendanceSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    employeeReducer,
    attendanceReducer,
  },
})