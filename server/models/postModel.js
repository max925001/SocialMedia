import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({


username:{
    type:String,
    required:true

},
avatar:{
    type:String,
},

title:{
    type:String,

},
image:{
    type:String,
    required:true,

},
creater:{
    type:Schema.Types.ObjectId,
    ref:"User",
},
likeCount:{
    type:Number,
    default:0
},
likes:[{
    type:Schema.Types.ObjectId,
    ref:"Post",
    
}],
comments:[{
    type:Schema.Types.ObjectId,
    ref:"Comments",
}],
date:{
    type:Date,
    default:Date.now
}





},{timestamps:true})



const Post = mongoose.model("Post" ,postSchema)

export default Post