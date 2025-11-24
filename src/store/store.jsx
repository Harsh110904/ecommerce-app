import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import cartSlice from './reducers/cartSlice'
import productSlice from './reducers/productSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
})
export default store