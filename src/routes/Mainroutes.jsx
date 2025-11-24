import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home.jsx"
import Products from '../pages/Products.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='*' element={<div className="text-white">404 - Page Not Found</div>} />
    </Routes>
  )
}

export default Mainroutes;