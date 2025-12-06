import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    data: null, // Current logged in user
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.data = action.payload
        },
        loadusers: (state, action) => {
            state.users = action.payload
        },
        logout: (state) => {
            state.data = null
        }
    },
});

export const { loaduser, loadusers, logout } = userSlice.actions;
export default userSlice.reducer;