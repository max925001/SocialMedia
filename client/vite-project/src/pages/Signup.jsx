import React,{useState} from 'react'
import HomeLout from '../Layout/HomeLout'
import { BsPersonCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slice/AuthSlice';
import toast from 'react-hot-toast';

const Signup = () => {
const dispatch = useDispatch()
const [coverImage, setcoverImage] = useState('')
const [avatarImage ,setavatarImage] = useState('')

const [signupdata , setsignupdata] = useState({
  username:"",

  fullname: "",
  phoneNo:"",
   avatar:"",
  coverImage:"",
  email:"",
  password:"",
 
  
  
  
  })
  


// CoverImage


function getCoverImage(event){
  event.preventDefault()
  //getting
  const uploadImage = event.target.files[0]
  if(uploadImage){
  
      setsignupdata({
          ...signupdata,
          coverImage:uploadImage
      })
      const fileReader = new FileReader()
      fileReader.readAsDataURL(uploadImage)
      fileReader.addEventListener('load' ,function(){
          //console.log(this.result)
          setcoverImage(this.result)
      })
  }
  
  
  
  }





function getImage(event){
  event.preventDefault()
  //getting
  const uploadImage = event.target.files[0]
  if(uploadImage){
  
      setsignupdata({
          ...signupdata,
          avatar:uploadImage
      })
      const fileReader = new FileReader()
      fileReader.readAsDataURL(uploadImage)
      fileReader.addEventListener('load' ,function(){
          //console.log(this.result)
          setavatarImage(this.result)
      })
  }
  
  
  
  }
  function handleinput(e){

    const{ name , value} = e.target
    setsignupdata({
        ...signupdata,
        [name]: value
    })
}

   



async function createNewAccount(event){

  event.preventDefault()

if( !signupdata.username ||!signupdata.email || !signupdata.fullname || !signupdata.password || !signupdata.avatar, !signupdata.coverImage , !signupdata.gender ,!signupdata.phoneNo){
  toast.error("Please fill all the details")
  return
}

// checking name  field length
if(signupdata.fullname.length<5){
toast.error("Name should be atleast of 5 charcters") 
return 
}


// if(!isEmail(signupdata.email)){
// //email regex use in match
// toast.error("Invalid email id")
// return

// }

// password validation

// if(!ispassword(signupdata.password)){
// toast.error("Password should be 6 - 16 character long")
// return

// }


const formData = new FormData()
formData.append("username", signupdata.username)

formData.append("fullname" ,signupdata.fullname)
formData.append("email" ,signupdata.email)
formData.append("password" ,signupdata.password)
formData.append("avatar", signupdata.avatar)
formData.append("coverImage", signupdata.coverImage)
formData.append("phone_no" ,signupdata.phoneNo)
formData.append("gender",signupdata.gender)
console.log("formdatadign",formData)

//dispatch create account action
const response = await dispatch(createAccount(formData))
console.log(response)
console.log(response?.payload?.success)
// if(response?.payload?.success){
//   navigate('/')}

setsignupdata({
username:"",
  fullname: "",
  email:"",
  password:"",
  avatar:"",
  coverImage,
  phoneNo:"",
  gender:""



})

setavatarImage("")
setcoverImage("")

}

    
 

   
    return (
        <HomeLout>
     
<div className=' m-auto min-h-[100vh] w-[350px] bg-white mt-3 rounded md:w-[500px] shadow-[0_0_10px_black] mb-2 '>

<div className='flex justify-center items-center w-full h-16 bg-yellow-400 text-xl text-black '>Signup Page</div>

<form action="" onSubmit={createNewAccount}>

<div className='h-56 w-full relative bg-gray-600'>

<div className='absolute w-full h-full  '>

<label htmlFor="coverImage" className='cursor-pointer w-full h-full'>
{
coverImage ? (
    <img className='w-full h-full ' src={coverImage}/>
):(<h1 className='text-xl   w-full h-full bg-slate-500  flex justify-center items-center '>Select Your CoverImage</h1>)


}

</label>
<input 
onChange={getCoverImage}
type="file" 
className='hidden'
 id='coverImage' 
 name='coverImage'
    accept='.jpg, .jpeg,.png , .svg'

 />

</div>

<div className='absolute bottom-0 '>

<label htmlFor="image_uploads" className='cursor-pointer'>
{
avatarImage ? (
    <img className='w-24 h-24 rounded-full m-auto' src={avatarImage}/>
):(<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>)

}

</label>
<input 
onChange={getImage}
type="file" 
className='hidden'
 id='image_uploads' 
 name='image_uploads'
    accept='.jpg, .jpeg,.png , .svg'

 />
</div>







</div>


<div className='flex flex-col mt-4'>
<input type="text" name="username" id="username"
placeholder='Enter your Username'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none'
value={signupdata.username}
onChange={handleinput}


 />

<input type="text" name="fullname" id="fullname"
placeholder='Enter your fullname'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none'
value={signupdata.fullname}
onChange={handleinput}


 />
<input type="number" name="phoneNo" id=""
placeholder='Enter your PhoneNo'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none'
value={signupdata.phoneNo}
onChange={handleinput}


 />
<input type="email" name="email" id=""
placeholder='Enter your Email'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none'
value={signupdata.email}
onChange={handleinput}

 />
<input type="password" name="password" id=""
placeholder='Enter your password'
className='p-3 m-1 bg-slate-100 text-black text-lg outline-none'
value={signupdata.password}
onChange={handleinput}


 />




</div>




               <div className='bg-slate-100 p-3 mt-2'>
            <label className="block mb-2 text-black text-lg">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={signupdata.gender === 'male'}
                  onChange={handleinput}
                  className="form-radio text-blue-500 text-xl"
                />
                <span className="ml-2">Male</span>
               
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={signupdata.gender === 'female'}
                  onChange={handleinput}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>



            <div className='w-full bg-blue-500 text-white h-12 mt-2 flex justify-center items-center  cursor-pointer shadow-xl rounded-xl hover:bg-blue-700'>

  <h2>Google Login</h2>
</div>




<div iv className='w-full bg-yellow-400 text-white h-12 mt-2 flex justify-center items-center cursor-pointer shadow-xl rounded-xl hover:bg-yellow-700 '><h3>Already have account?<Link to="/login" className='text-black'>Login</Link></h3></div>


<div><button type='submit' className='w-1/2 m-auto rounded-xl bg-yellow-400 text-white h-12 mt-2 flex justify-center items-center cursor-pointer shadow-xl hover:bg-yellow-700 transition-all '>Create Your Account </button></div>





</div>





</form>





</div>

      </HomeLout>
    );
  };

export default Signup
