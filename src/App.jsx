import React, { useEffect } from 'react'
import axios from "./api/axiosconfig"
import { asyncgetproducts } from './store/userActions'
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';
const App = () => {

  const data = useSelector((state) => state.user.data)
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(asyncgetproducts())
  }, [])


  return (
    <div className='min-h-screen w-full px-[10%] font-thin text-white bg-black'>
      <Nav />
      <Mainroutes />
    </div>
  )
};

export default App
