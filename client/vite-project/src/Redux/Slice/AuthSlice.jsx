import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance";

const initialState ={
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
 
  data: JSON.parse(localStorage.getItem('data') ) || {},
  
  }
  console.log("initialState",initialState)


  export const createAccount = createAsyncThunk("/auth/signup" ,async(data) =>{
    console.log(data)
    try{
    const res = axiosInstance.post("user/register" ,data)
    toast.promise(res,{
    
        loading: "Wait creating your account",
        success: (data) =>{
           return data?. data?. message 
        },
        error: "Failed to create account"
    })
    
    return (await res).data
    
    }catch(error){
    
    toast.error(error?. response?. data?. message)
    }
    
    })
    
    
    
    // console.log(createAccount)

    export const login = createAsyncThunk("/auth/login" ,async(data) =>{

      try{
      const res = axiosInstance.post("user/login" ,data)
      
      toast.promise(res,{
      
          loading: "Wait Authentication is in progress",
          success: (data) =>{
             return data?. data?. message 
          },
          error: "Failed to Login"
      })
      
      return (await res).data
      
      }catch(error){
      
      toast.error(error?. response?. data?. message)
      }
      
      })
  


export const logout =createAsyncThunk("/auth/logout" ,async() =>{




try {
  
  const res =  axiosInstance.post("/user/logout")
  
  toast.promise(res,{

loading:"Please wait logout is in progress",
success: (data) =>{
  return data?.data?.message 
},
error: "Failed to Logout"

  })
  return (await res).data


} catch (error) {
  toast.error(error?. response?. data?.message)
}



})









    export const authSlice = createSlice({
      name:"auth",
      initialState,
      reducers:{},

extraReducers: (builder) =>{
builder.addCase(login.fulfilled,(state,action) =>{



  localStorage.setItem("data" , JSON.stringify(action?. payload?.data))
  localStorage.setItem("isLoggedIn" ,true)
 
  state.isLoggedIn =true
  state.data = action?.payload?.data
  
  



})
.addCase(logout.fulfilled,(state,action) =>{
  localStorage.clear()

  state.isLoggedIn =false
  state.data ={}

})




}


    })

   

    export const {} = authSlice.actions

    export default authSlice.reducer
