import React from 'react'
import Footer from '../components/Footer'
import { IoReorderThree } from "react-icons/io5";
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa6";
import { HiUserCircle } from "react-icons/hi";
import { MdSaveAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from '../Redux/Slice/AuthSlice';
function HomeLout({children}) {
 const authslice = useSelector((state) =>state.auth)
 const dispatch = useDispatch()

  function hideDrawer(){
    const element = document.getElementsByClassName("drawer-toggle")
    console.log(element)
  element[0].checked = false
  changewidth()

 
}
function changewidth(){
const drawerside = document.getElementsByClassName('drawer-side')
drawerside[0].style.width ="auto"


}


 async function handleLogout(e){

e.preventDefault()

const res = await dispatch(logout())
console.log(res)

if(res?. payload?. success)
  navigate("/")
  



}
  return (
    <>
    <div className='z-50  min-h-[90vh]'>


  
<div className="drawer z-50">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button text-3xl"><IoReorderThree/></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
   
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-xl font-semibold">
      {/* Sidebar content here */}
<li><h1>Enginner</h1></li>
      <li className='w-fit absolute right-2 z-50'>
        <button onClick={hideDrawer}>
          <AiFillCloseCircle size={24}/>
        </button>
      </li>
      <li><Link >  <FaHome className='text-white m-2'/> Home</Link></li>
<li><Link><IoMdSearch className='text-white m-2'/>Search</Link></li>
<li><Link> <IoLogoTiktok className='text-white  m-2'/> Reels</Link></li>
<li><Link> <FaFacebookMessenger className='text-white  m-2'/> Messages</Link></li>

     
      <li><Link to='/saved'><MdSaveAlt className='text-white  m-2'/>Saved</Link></li>
      
      
      <li><Link>{authslice.isLoggedIn ? <img src={authslice.data.avatar} className='w-9 h-9 rounded-full'/>:<HiUserCircle className='text-white text-3xl m-2'/>} Profile</Link></li>

      <div className='w-full h-40  absolute bottom-0 left-0 flex flex-col  '>

<button className='m-3'>{authslice.isLoggedIn?(<div className='bg-red-500 w-1/2 h-14 text-black rounded-xl pt-3 hover:scale-105 transition-all'><Link to="/editprofile">Edit Profile</Link></div>):(<div className='bg-red-500 w-1/2 h-14 text-black rounded-xl pt-3 hover:scale-105 transition-all'><Link to="/signup">Signup</Link></div>) }</button>

<button className='m-3'>{authslice.isLoggedIn?(<div className='bg-red-500 w-1/2 pt-3 h-14 text-black rounded-xl hover:scale-105 transition-all' onClick={handleLogout}>Logout</div>):(<div className='bg-red-500 w-1/2 h-14 text-black rounded-xl pt-3 hover:scale-105 transition-all'><Link to='/login'>Login</Link></div>) }</button>



      </div>
    </ul>
   
  </div>
</div>
{children}

    </div>
    <Footer/>
    </>
  )
}

export default HomeLout
