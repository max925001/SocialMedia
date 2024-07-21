import React from 'react'
import HomeLout from '../Layout/HomeLout'

function Header() {
  return (
  <HomeLout>

<header className='w-full h-16 bg-green-600 '>
<nav className='flex  items-center justify-between pt-3 m-3 '>

<div className='text-red-400 text-3xl'>Logo</div>
<div className=' hidden md:flex items-center justify-between  w-[30vw] text-xl'>
<div>profile</div>
<div>Login</div>
<div>signup</div>






</div>
<div className=' block md:hidden '>three</div>

</nav>




   </header>



  </HomeLout>
  )
}

export default Header
