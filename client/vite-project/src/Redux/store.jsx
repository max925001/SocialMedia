import {configureStore}  from '@reduxjs/toolkit'
import  authSlice  from './Slice/AuthSlice'
import PostSlice from './Slice/PostSlice'

export const store= configureStore({
    reducer:{
        auth: authSlice,
        post:PostSlice
        
    }
})

export default store