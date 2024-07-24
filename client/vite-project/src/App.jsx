import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import UserProfile from './pages/profile/UserProfile'
import UserPost from './pages/profile/UserPost'
import SavedPost from './pages/profile/SavedPost'
import UserReels from './pages/profile/UserReels'



function App() {
 

  return (
<BrowserRouter>



<Routes>
<Route path='/' element={<Home/>}/>

<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>

<Route path='/getprofile' element={<UserProfile />}>
<Route index element={<Navigate to="userpost" />} />
          <Route path='userpost' element={<UserPost />} />
          <Route path='usereels' element={<UserReels />} />
          <Route path='savedpost' element={<SavedPost />} />
        </Route>






</Routes>





</BrowserRouter>
  )
}

export default App
