import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        login: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            //localStorage.setItem("role", user.role);
            //localStorage.setItem("user_id", user.id);
        },
        logout: (state) => {
            state.user = null;
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
