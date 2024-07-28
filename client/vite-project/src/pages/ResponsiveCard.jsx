// ResponsiveCard.js
import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaTrash, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likes, unlikes } from "../Redux/Slice/PostSlice";

const ResponsiveCard = ({ post }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state?.auth?.data?._id);
  const [likeCount ,setLikeCount] =useState(post?.likes?.length)
  const dispatch = useDispatch()
  const [likeColor, setLikeColor] = useState('text-white');

 const likedByuser = post.likes.includes(userId) ? true : false;
  const handleLike =  async (postId) => {
    console.log("userid",userId)
    
if(isLoggedIn && likeColor =='text-white'){
 await dispatch(likes(postId))
setLikeColor('text-green-500')
setLikeCount(likeCount+1)
console.log("liked")
}else if(isLoggedIn && likeColor =='text-green-500'){
  dispatch(unlikes(postId))
  setLikeColor('text-white')
  setLikeCount(likeCount-1)
  console.log("unliked")
}


 
  }
  useEffect(() =>{

if(likedByuser){
  setLikeColor('text-green-500')
}else{
  setLikeColor('text-white')
}




  },[])
  return (
    <div className=" w-full sm:w-full sm:h-[100vh] relative  h-[100vh] md:w-full md:h-[100vh]  mt-3  m-auto border border-white mb-3 rounded-xl overflow-hidden cursor-pointer">
      <div className="w-full  h-[11vh] flex justify-between items-center overflow-hidden border-b-2">
        <Link>
          {" "}
          <img
            src={post.avatar}
            className="rounded-full m-1 w-16 h-[10vh]"
            alt=""
          />
        </Link>
        <Link>
          <div className="">
            <h2 className="text-white font-bold  text-xl md:text-2xl mr-1">
              {post.username}
            </h2>
          </div>
        </Link>
      </div>
      <div className="w-full  h-[77vh]  sm:h-[77vh]  overflow-hidden object-contain">
        <img
          src={post.image}
          alt=""
          className="w-full  h-[77vh] sm:h-[77vh] "
        />
      </div>

      <div className="w-full  h-[12vh] md:h-[12vh] bg-red-800  flex justify-between items-center overflow-hidden p-4">
        <div className="flex items-center">
          <FaHeart

            className={`text-2xl ${likeColor} cursor-pointer 
            }`}
            onClick={() =>handleLike(post._id)}
          />
          <h3 className="text-2xl text-white ">{likeCount}</h3>
        </div>
        <Link>
          <div className="flex items-center">
            <FaComment className="text-2xl text-white cursor-pointer" />
            <h3 className="text-2xl text-white ">1</h3>
          </div>
        </Link>
        <div className="flex items-center">
          <FaSave className="text-2xl text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCard;
