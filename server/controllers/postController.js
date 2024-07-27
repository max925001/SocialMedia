import Post from "../models/postModel.js";
import AppError from "../utilis/error.util.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js";
import User from "../models/userSchema.js";






const createPost = async(req, res,next) =>{
const {title} = req.body
const username = req.user.username
const avatar = req.user.avatar
console.log(avatar)
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
        avatar,
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


    throw new AppError(400,"Post not get")

}


res.status(200).json(

    new ApiResponse(200,posts ,"Post get successfully")
)


}

const like = async(req,res) =>{


const {id} = req.params
console.log(id)



const userId = req.user.id;
console.log(userId)


if(!userId){

 throw new AppError(400,"Please login first")
}



try {
    const post = await Post.findById(id)

if(!post){

    throw new AppError(400,"Post not found")
}

    if(!post.likes.includes(userId)){
        post.likeCount +=1
       post.likes.push(userId)
       
       await post.save()
       
       res.status(200).json(
       
           new ApiResponse(200,post ,"Like  successfully")
       )
       
       
       
       }else{
       
          new ApiResponse(400 ,post ,'user already like the post')

       }

} catch (error) {
    console.log(error)
}


}
const unlike = async(req,res) =>{


const {id} = req.params


const userId = req.user.id;
if(!userId){

    throw new AppError(400,"Please login first")
}


try {
    const post = await Post.findById(id)

if(!post){
    throw new AppError(400,"Post not found")
}

    if(post.likes.includes(userId)){
        post.likeCount -=1
       post.likes =post.likes.filter(user => user != userId)
       
       await post.save()
       
       res.status(200).json(
       
           new ApiResponse(200,post ,"unlike  successfully")
       )
    }else {
        res.status(400).json({ message: 'User has not liked this post' });
      }
    
} catch (error) {
    console.log(error)
    
}

}




const getallpost = async(req,res) =>{


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
  
    try {
        const posts = await Post.find().skip(skip).limit(limit).sort({ _id: 1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts' });
    }


}




// const getallpost = async (req,res) =>{

// const post =  await Post.find({})

// if(!post){

//     throw new AppError(400,"Post not get")
// }

// res.status(200).json(

//     new ApiResponse(200,post ,"Post get successfully")
// )


// }


export {createPost ,getmypost ,like ,unlike,getallpost }