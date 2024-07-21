import {configureStore}  from '@reduxjs/toolkit'
import  authSlice  from './Slice/AuthSlice'


export const store= configureStore({
    reducer:{
        auth: authSlice
        
    }
})

export default store