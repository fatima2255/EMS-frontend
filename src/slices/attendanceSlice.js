import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activity: '',
}

const AttendanceSlice = createSlice({
    name: "attendance",
    initialState,

    reducers: {
        setAttendanceLogs: (state, action) => {
            state.activity = action.payload;
        },
               
    }
});

export const { setAttendanceLogs } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;