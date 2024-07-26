import User from "../models/userSchema.js"
import { ApiResponse } from "../utilis/ApiResponse.js"
import { uploadOnCloudinary } from "../utilis/cloudinary.js"
import AppError from "../utilis/error.util.js"

const cookieOption ={
  maxAge: 7*24*60*60*1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
     sameSite:'None',
  secure:true

}
const createUser = async(req,res,next) =>{


const { username,fullname ,phone_no,gender,email,password} =req.body

 console.log( username,fullname,phone_no,gender,email,password)

if( !username,!fullname || !phone_no || !gender || !email || !password){
    return next( new AppError('All fields are required' ,400))


}
const usernameExist = User.findOne({username})
if(!usernameExist){
  return next( new AppError('Username must be unique'))
}
const userExist = User.findOne({
   email 
})
if(!userExist){
    return next( new AppError('User Already Exist' ,400))
}



const avatarLocalPath = req.files?.avatar[0]?.path
console.log("file",avatarLocalPath)
//const coverImageLocalPath = req.files?.coverImage[0]?.path


let coverImageLocalPath

if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
  coverImageLocalPath=req.files.coverImage[0].path
}
console.log("coverImage",coverImageLocalPath)

if(!avatarLocalPath){
  throw new AppError(400,"Avatar file is required ")
}


  const avatar = await uploadOnCloudinary(avatarLocalPath)
       const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){


        throw new AppError(400,"Avatar file is required")
       }
       if(!coverImage){


        throw new AppError(400,"coverImage file is required")
       }



const newUser = await User.create({
  username,
fullname,
phone_no,
avatar:avatar.url ,
coverImage:coverImage.url || '',
gender,
email,
password


})


if(!newUser){
    return next(new AppError('user registration failed please try again' ,400))
}




   return res.status(201).json(
    new ApiResponse(200,newUser ,"user registered successfully")

   )






}




const login = async (req ,res ,next) =>{

const {username ,password} =req.body

if(!username || !password){
    return next( new AppError('All fields are required' ,400))
}


const user = await User.findOne({username}).select('+password')


if(!user || !user.comparePassword(password)){
    return next( new AppError('User not found' ,400))
}

const token =  await user.generateJWTtoken()
// console.log(token)

user.password =undefined
res.cookie("token" ,token,cookieOption)
return res.status(200).json(
    new ApiResponse(200,user ,"user logged in successfully")
)






}


const logout = async(req,res ,next) =>{


  res.cookie("token",null ,{

    maxAge:0,
    httpOnly: true,
    secure:true


  })
  res.status(200).json(

    new ApiResponse(200,null ,"user logged out successfully")
  )


}



const getUser = async(req,res) =>{


const userId = req.user.id

try {
  
const user = await User.findById(userId)

return res.status(200).json(
  new ApiResponse(200,user ,"user fetched successfully")
)


} catch (error) {
  
  return next( new AppError('user not found' ,400))
}




}


const editUserDetails =  async (req,res) =>{



  const {fullname ,phone_no,email} = req.body

  if(!fullname || !phone_no || !email){
    throw new AppError(400 ,"All fields are required")
  
  
  }
  
  const user = await User.findByIdAndUpdate(req.user?.id,
  {
  $set:{ // iski help new value set hoga
  
    fullname,
    phone_no,
    email
  }
  
  },
  {new:true}
  
  ).select("-password")
  
  // console.log(user)
  
  return res
  .status(200)
  .json(new ApiResponse(200 ,user ,"Account details updated successfully"))

}





export {createUser ,
  login ,
  logout,
  getUser, 
  editUserDetails,
  




}