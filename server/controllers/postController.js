import Post from "../models/postModel.js";
import AppError from "../utilis/error.util.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js";
import User from "../models/userSchema.js";






const createPost = async(req, res,next) =>{
const {title} = req.body
const username = req.user.username
const user = await User.findOne({username})
if(!username){

    throw new AppError("Please login first",401)
}



try {
    let image
    if(req.file){
        console.log(req.file)
         image =await uploadOnCloudinary(req.file.path)
  
        if(!image){
    
            throw new AppError(400,"Image is required")
        }
    }



    const post = await Post.create({
        username,
        title,
        image:image.url || "",
        creater:req.user.id,
       
    
    })
    if(!post){

        throw new AppError(400,"Post is not created")
    }

res.status(200).json(

    new ApiResponse(200,post ,"Post created successfully")
)


  user.post.push(post._id)

  await user.save()
    
} catch (error) {
    console.log(error)
}








}


const getmypost = async( req,res ) =>{

const userId = req.user.id;

const posts = await Post.find({creater:userId})

if(!posts){


    throw new AppError(400,"Post is not created")

}


res.status(200).json(

    new ApiResponse(200,posts ,"Post created successfully")
)


}

const like = async(req,res) =>{


const {id} = req.params




const userId = req.user.id;


const post = await Post.findByIdAndUpdate(id,{

    $push:{likes:userId}
},{
    new:true
})

if(!post){

    throw new AppError(400,"Post is not created")
}

res.status(200).json(

    new ApiResponse(200,post ,"Like  successfully")
)



}
const unlike = async(req,res) =>{


const {id} = req.params




const userId = req.user.id;
if(!userId){

    throw new AppError(400,"Please login first")
}


const post = await Post.findByIdAndUpdate(id,{

    $pull:{likes:userId}
},{
    new:true
})

if(!post){

    throw new AppError(400,"Post is not like ")
}

res.status(200).json(

    new ApiResponse(200,post ,"unLike  successfully")
)



}



export {createPost ,getmypost ,like ,unlike }