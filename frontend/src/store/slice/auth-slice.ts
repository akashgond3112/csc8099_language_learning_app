import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    imageUrl: localStorage.getItem("imageUrl"),
    isLoggedIn: false
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

    }
})

export const { } = authSlice.actions;
export default authSlice;