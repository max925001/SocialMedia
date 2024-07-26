import React from 'react'
import HomeLout from '../../Layout/HomeLout'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { IoLogoTiktok } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
function UserProfile() {
const userdata = useSelector((state)=>state.auth.data)
const post = useSelector((state) =>state?.post?.post?.data)



const isLoggedIn= useSelector((state) =>state.auth.isLoggedIn)

console.log(userdata)
console.log(isLoggedIn)


  return (
    <HomeLout>
      <div className=" w-full h-[70vh]   relative ">


<div className='w-full h-[70vh]   absolute  '>


<div className=' w-full h-[70vh] absolute flex justify-center  '>


<div className=' w-full md:w-2/3  h-[40vh] md:h-[50vh] relative  '>

 {isLoggedIn? <img src={userdata.coverImage} alt="" className=' h-[40vh] md:h-[50vh] w-full object-fill rounded-lg shadow-[4px_3px_12px_white] bg-transparent  cursor-pointer' />
 
 :<div className=' h-[40vh] md:h-[50vh] w-full  rounded-lg shadow-[4px_3px_12px_white] bg-transparent  cursor-pointer'>Add Cover Image</div>}
 {isLoggedIn? <img src={userdata.avatar} className=' w-[100px] h-[100px] md:w-[200px] md:m-2 md:h-[200px] absolute bottom-0 rounded-full  z-20 shadow-[0_0_12px_red] cursor-pointer  hover:scale-105 transition duration-300 ' />:
 
  <FaUser  className='w-[200px]  m-2 h-[200px] absolute bottom-0 rounded-full  z-20 shadow-[0_0_12px_red] cursor-pointer hover:scale-105 transition duration-300 text-white '/>}


  <div className=' w-full h-[30vh] md:h-[20vh] grid md:grid-rows-2 text-2xl  '>
  
  <div className='grid   md:grid-cols-3  justify-around '>
<h2 className='text-white  mt-3 text-lg  font-bold md:text-xl'>Username: {userdata.username}</h2>
<h2 className='text-white  mt-3 text-lg  font-bold md:text-xl'>Fullname :{userdata.fullname}</h2>
<button className='bg-red-500 rounded-lg p-2 text-black h-[40px]   mt-3 font-bold text-xl hover:bg-red-700 transition-all duration-300'>Edit Profile</button>



  </div>
  
<div className='grid grid-cols-3 justify-around'>
  <h2 className='text-white text-lg  font-bold md:text-xl'>Posts:{isLoggedIn?post?.length:0}</h2>
  <h2 className='text-white text-lg   font-bold md:text-xl'>Followers:0</h2>
  <h2 className='text-white  text-lg  font-bold md:text-xl'>Following:0</h2>
</div>


   </div>
  
</div>


</div>



</div>







      </div>
      <div className=' w-full md:w-2/3 h-[1px] bg-white m-auto shadow-[0px_0px_10px_red] hover:bg-red-300 transition-all duration-300 cursor-pointer '></div>
      <div className='w-full  '>

<div className='md:w-2/3 flex justify-between items-center m-auto'>
<div className='p-2'><NavLink  to='userpost'><BsPostcard className='text-3xl font-semibold text-white'/></NavLink></div>
<div><NavLink to='usereels'><IoLogoTiktok className='text-3xl font-semibold text-white'/></NavLink></div>
<div><NavLink to='savedpost'><MdSaveAlt className='text-3xl font-semibold text-white'/></NavLink></div>






</div>

<div className='w-full '>

<div className='m-auto'><Outlet/></div>



</div>


      </div>
    </HomeLout>
  )
}

export default UserProfile

