import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getpost } from '../../Redux/Slice/PostSlice'
import { FaComment, FaHeart, FaSave, FaTrash } from 'react-icons/fa'

function UserPost() {
  const dispatch = useDispatch()
  const post = useSelector((state) =>state.post.post)
  const isLoggedIn = useSelector((state) =>state.auth.isLoggedIn )
  console.log(isLoggedIn)
  console.log("userpost" ,post)



  const getuserPost = async() =>{

    await dispatch(getpost())
  }
  useEffect(()=>{
    
     if(isLoggedIn){
      getuserPost()
     }
  },[])
  return (
    <div className='w-full md:w-2/3  m-auto'>
   <h1>user post</h1>
   <div className=' grid grid-cols-2 grid-flow-row md:grid-cols-3 gap-2 m-auto md:m-1'>
    {

post?.data?.map((data) =>(


  <div className="max-w-sm w-full rounded overflow-hidden shadow-lg m-auto bg-gray-800 hover:bg-gray-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img className="w-full h-64 object-contain" src={data.image} alt="Card Image" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-between items-center">
          <div className="text-white flex items-center space-x-2">
            <FaHeart className="text-red-500 hover:text-red-400 transition duration-300" />
            <span>{data.likes.length===undefined?0:data.likes.length}</span>
          </div>
          <div className="text-white flex items-center space-x-2">
            <FaComment className="text-blue-500 hover:text-blue-400 transition duration-300" />
            <span>{0}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
          <button className="text-white bg-red-500 hover:bg-red-700 p-1 rounded-full transition duration-300">
            <FaTrash />
          </button>
          <button className="text-white bg-green-500 hover:bg-green-700 p-1 rounded-full transition duration-300">
            <FaSave />
          </button>
        </div>
      </div>
     
    </div>
  

))
    }
   </div>
   
    </div>
  )
}

export default UserPost
