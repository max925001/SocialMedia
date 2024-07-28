import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../Redux/Slice/PostSlice'
import HomeLout from '../Layout/HomeLout'
import ResponsiveCard from './ResponsiveCard'
function Home() {

const [page,setpage] =useState(1)
  const dispatch = useDispatch()
  const allpost = useSelector((state) =>state.post.Allpost)
  const hasMore = useSelector((state) => state.post.hasMore);
  const status = useSelector((state) => state.post.status);
 
 

  useEffect(() =>{

    if (hasMore) {
      dispatch(getAllPost(page));
    }
  },[page,dispatch ,hasMore])



  const handleInfiniteScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1 &&
      status !== 'loading' &&
      hasMore
    ) {
      setpage((prev) => prev + 1);
    }
  }, [status, hasMore]);
  useEffect(()=>{
    window.addEventListener('scroll',handleInfiniteScroll)
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  },[handleInfiniteScroll])
  return (
    <HomeLout>
            <div className=' w-full  p-2 '> 

               <div className='w-full  m-auto bg-red  grid grid-cols-1  sm:grid-cols-1  md:grid-cols-3 gap-2 overflow-hidden border border-red-400 '>

              {
allpost.map((post) =>
( <ResponsiveCard post={post} key={post._id}/>)
)


              }




               </div>






            </div>
    </HomeLout>
  )
}

export default Home
