import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import { logout } from "./AuthSlice";
import toast from "react-hot-toast";
const initialState ={
    post:[],
    Allpost :[],
    hasMore: true,
    status: null,
    error: null,
    likeCount:0
}



export const  getpost = createAsyncThunk("/post/get" , async() =>{

   const res =axiosInstance.get("/post/getmypost" )

   return (await res).data

})

export const getAllPost = createAsyncThunk("/post/all" ,async(page) =>{

    const res = axiosInstance.get('/post/getallpost', {
        params: { page, limit: 9 },
      })
      toast.promise(res,{

        loading:"Please wait logout is in progress",
        success: (data) =>{
          return data?.data?.message 
        },
        error: "Failed to Logout"
        
          })

    return (await res).data
}) 


export const likes = createAsyncThunk("/post/like" ,async(data) =>{

  console.log(data)
    const res = axiosInstance.post(`/post/like/${data}`)
    console.log(res)
toast.promise(res,{

    loading:"Please wait like is in progress",
    success: (data) =>{
      return data?.data?.message 
    },
    error: "Failed to Like"
  
})
    return (await res).data
})


export const unlikes = createAsyncThunk("/post/unlike" ,async(data) =>{

  console.log(data)
    const res = axiosInstance.post(`/post/unlike/${data}`)
    console.log(res)
toast.promise(res,{

    loading:"Please wait unlike is in progress",
    success: (data) =>{
      return data?.data?.message 
    },
    error: "Failed to unLike"
  
})
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
.addCase(logout.fulfilled,(state,action) =>{

state.post = []
})
.addCase(getAllPost.pending,(state,action) =>{
    state.status = "loading"
})
.addCase(getAllPost.fulfilled,(state,action) =>{
   
    if (action.payload.length == 0) {
        state.hasMore = false;
      }
state.Allpost =[...state.Allpost,...action.payload]
state.status = "success"

})
.addCase(getAllPost.rejected,(state,action) =>{
    state.status = "failed"
    state.error =action.payload

})
.addCase(likes.fulfilled,(state,action) =>{
  console.log("couun",action?.payload?.data?.likeCount)

state.likeCount = action?.payload?.data?.likeCount

})
.addCase(unlikes.fulfilled,(state,action) =>{

state.likeCount = action?.payload?.data?.likeCount
})

}

})




export  const {} =postSlice.actions
export default postSlice.reducer 