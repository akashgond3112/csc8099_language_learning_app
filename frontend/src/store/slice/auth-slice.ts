import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userId: localStorage.getItem("userId")
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        setToken(sate, action) {
            sate.token = action.payload;
        },

        setRefreshToken(state, action) {
            state.refreshToken = action.payload
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        }


    }
})

export const { setToken, setRefreshToken, setIsLoggedIn } = authSlice.actions;
export default authSlice;