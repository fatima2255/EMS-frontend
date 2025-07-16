import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: '',
    designation: '',
    salaryPerMonth: '',
    managerId: '',

}

const employeeSlice = createSlice({
    name: "employee",
    initialState,

    reducers: {
        setEmployeeDetails: (state, action) => {
            const {address, designation, salaryPerMonth, managerId } = action.payload;
            state.address = address;
            state.designation = designation;
            state.salaryPerMonth = salaryPerMonth;
            state.managerId = managerId;
        },
    },
});

export const { setEmployeeDetails } = employeeSlice.actions;

export default employeeSlice.reducer;