import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
    reducer : {
        user : UserReducer,
        cart : cartReducer
    }
})

export default store;