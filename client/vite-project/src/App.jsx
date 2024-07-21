import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
 

  return (
<BrowserRouter>



<Routes>
<Route path='/' element={<Home/>}/>

<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>






</Routes>





</BrowserRouter>
  )
}

export default App
