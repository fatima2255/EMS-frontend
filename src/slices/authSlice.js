import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: localStorage.getItem("user_id"),
    role: localStorage.getItem("role"), 
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem('refreshToken'),
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        login: (state, action) => {
            const { user_id, role , accessToken, refreshToken } = action.payload;
            console.log("🧠 login reducer received:", action.payload);
            state.user_id = user_id;
            state.role = role;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            localStorage.setItem("user_id", user_id);
            localStorage.setItem("role", role);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        logout: (state) => {
            state.user_id = null;
            state.role = null;
            state.accessToken = null;
            state.refreshToken = null;

            localStorage.clear();
        },
    },
});

//exporting actions
export const { login, logout } = authSlice.actions;

// as well as reducer
export default authSlice.reducer;
