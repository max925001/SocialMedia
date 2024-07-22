import React, { useState } from 'react'
import HomeLout from '../Layout/HomeLout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../Redux/Slice/AuthSlice'
function Login() {

 const dispatch =useDispatch()
  const nagivate =useNavigate()

const [logindata ,setLogindata] = useState({
  username:"",
  password:""
})


const handleinput = (e) =>{


const {name ,value} = e.target


setLogindata({...logindata ,
  [name]:value
})


}




const handleSubmit = async (e) =>{

e.preventDefault()


if(!logindata.username || !logindata.password){

  toast.error("Please fill all the details")
  return

}

const formData =  new FormData()
formData.append("username",logindata.username)
formData.append("password", logindata.password)



try {
  const response = await dispatch(login(logindata));
  
  if (response.payload.success) {
   
    nagivate('/')
    
  }
} catch (error) {
  console.error('Error during login:', error);
}






}
  return (
    <HomeLout>
    
    <div className='m-auto min-h-[68vh] w-[350px]  bg-white rounded-2xl md:w-[500px] shadow-[0_0_10px_black] mb-8 mt-6 hover:scale-95 transition-all'>

<div className='flex justify-center items-center w-full h-16 bg-yellow-400 text-xl text-black  rounded-t-2xl'><h1>Login Page</h1></div>

<form action="" onSubmit={handleSubmit}>
<div className='w-full flex flex-col relative '>

<input type="text" name="username" id="username"
placeholder='Enter your username'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none mt-8'
value={logindata.username}
onChange={handleinput}


 />


<input type="password" name="password" id="password"
placeholder='Enter your password'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none mt-8'
value={logindata.password}
onChange={handleinput}


 />


<div className='w-full mt-8 bg-blue-500 text-white h-12  flex justify-center items-center  cursor-pointer shadow-xl rounded-xl hover:bg-blue-700'>

<h2>Google Login</h2>

</div>

<div iv className='w-full bg-yellow-400 text-white h-12 mt-8 flex justify-center items-center cursor-pointer shadow-xl rounded-xl hover:bg-yellow-700  '><h3>Don't have account? <Link to="/signup" className='text-black'>Signup</Link></h3></div>


<div><button type='submit' className='w-full m-auto rounded-xl bg-yellow-400 text-white h-12 mt-2 flex justify-center items-center cursor-pointer shadow-xl hover:bg-yellow-700 transition-all '>Login</button></div>

</div>




</form>


    </div>
      
    </HomeLout>
  )
}

export default Login
