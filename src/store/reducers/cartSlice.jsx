import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadcart: (state, action) => {
            state.carts = action.payload
        },
        addtocart: (state, action) => {
            const existingItem = state.carts.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.carts.push({ ...action.payload, quantity: 1 });
            }
        },
        removefromcart: (state, action) => {
            state.carts = state.carts.filter(item => item.id !== action.payload);
        }
    }
});

export const { loadcart, addtocart, removefromcart } = cartSlice.actions
export default cartSlice.reducer