import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userId: localStorage.getItem("userId"),
    userEmailId: localStorage.getItem("userEmailId"),

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
        },
        setUserId(sate, action) {
            sate.userId = action.payload
        },
        setUserEmailId(sate, action) {
            sate.userEmailId = action.payload
        }



    }
})

export const { setToken, setRefreshToken, setIsLoggedIn, setUserId, setUserEmailId } = authSlice.actions;
export default authSlice;