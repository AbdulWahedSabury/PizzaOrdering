import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/user/userSlice'

const store = configureStore({
    reducer : {
        user : UserReducer
    }
})

export default store;