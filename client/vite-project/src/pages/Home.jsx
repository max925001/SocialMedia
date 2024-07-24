import React from 'react'
import HomeLout from '../Layout/HomeLout'
import { useDispatch, useSelector } from 'react-redux'
import { getpost } from '../Redux/Slice/PostSlice'

function Home() {
  const dispatch = useDispatch()
  const post = useSelector((state) =>state.post.post)
  // console.log(post.data)
  return (
    <HomeLout>
  <button onClick={() =>dispatch(getpost())}>button</button>
  {/* {post.data.map((data) =>
  
  <img src={data.image} className='w-40 '/>
  )} */}

    </HomeLout>
  )
}

export default Home
