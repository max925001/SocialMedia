import React from 'react'
import HomeLout from '../../Layout/HomeLout'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
function UserProfile() {
const userdata = useSelector((state)=>state.auth.data)
const isLoggedIn= useSelector((state) =>state.auth.isLoggedIn)
console.log(userdata)
console.log(isLoggedIn)


  return (
    <HomeLout>
      <div className=" w-full h-[100vh]   relative ">


<div className='w-full h-[80vh]  mt-4 absolute  '>


<div className=' w-full h-[80vh] absolute flex justify-center '>


<div className=' w-full md:w-2/3  h-[40vh] md:h-[50vh] relative  '>

 {isLoggedIn? <img src={userdata.coverImage} alt="" className=' h-[40vh] md:h-[50vh] w-full object-fill rounded-lg shadow-[4px_3px_12px_white] bg-transparent  cursor-pointer' />
 
 :<div className=' h-[40vh] md:h-[50vh] w-full  rounded-lg shadow-[4px_3px_12px_white] bg-transparent  cursor-pointer'>Add Cover Image</div>}
 {isLoggedIn? <img src={userdata.avatar} className=' w-[100px] h-[100px] md:w-[200px] md:m-2 md:h-[200px] absolute bottom-0 rounded-full  z-20 shadow-[0_0_12px_red] cursor-pointer  hover:scale-105 transition duration-300 ' />:
 
  <FaUser  className='w-[200px]  m-2 h-[200px] absolute bottom-0 rounded-full  z-20 shadow-[0_0_12px_red] cursor-pointer hover:scale-105 transition duration-300 text-white '/>}


  <div className=' w-full h-[30vh] grid grid-flow-row gap-0 '>
  
  <div className='flex flex-col md:flex-row justify-around '>
<h2 className='text-white  mt-6 font-bold text-xl'>Username: {userdata.username}</h2>
<h2 className='text-white  mt-6 font-bold text-xl'>Fullname :{userdata.fullname}</h2>
<button className='bg-red-500 rounded-lg p-2 text-black h-[40px]   mt-6 font-bold text-xl hover:bg-red-700 transition-all duration-300'>Edit Profile</button>



  </div>
  
<div className='flex flex-row justify-around'>
  <h2 className='text-white  mt-6 font-bold text-xl'>Posts:{isLoggedIn?userdata.post.length:0}</h2>
  <h2 className='text-white  mt-6 font-bold text-xl'>Followers:0</h2>
  <h2 className='text-white  mt-6 font-bold text-xl'>Following:0</h2>
</div>


   </div>
</div>


</div>



</div>







      </div>
      <div className='w-full h-[200px] bg-white '></div>
    </HomeLout>
  )
}

export default UserProfile

