import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
const initialState ={
    post:[]
}



export const  getpost = createAsyncThunk("/post/get" , async() =>{

   const res =axiosInstance("/post/getmypost" )
console.log("post",res)
   return (await res).data

})










const postSlice = createSlice({
name:"post",
initialState,
reducers:{},
extraReducers:(builder)=>{

builder.addCase(getpost.fulfilled,(state ,action) =>{

state.post = action.payload
})



}

})




export  const {} =postSlice.actions
export default postSlice.reducer 