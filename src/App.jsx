import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//import comps
import HomeComp from './home/home'
import Admin from './admin/admin'
import MasterAdmin from './master/master'
import Login from './auth/login'
import LandingPage from './landing/landing'

function App() {

  const TOKEN = sessionStorage.getItem("USER");

  
  if (!sessionStorage.getItem("USER")) {
    return (
      <>
        <Routes>
          <Route path='/home' element={<HomeComp/>} />
          <Route path='/master' element={<MasterAdmin/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/' element={<LandingPage/>} />
        </Routes>
      </>
    )
  };
  
  if (sessionStorage.getItem("USER")) {
    return(
      <>
        <Routes>
          <Route path='/' element={<Admin/>} />
          <Route path='*' element={<Admin/>} />
        </Routes>
      </>
    );
  };
}

export default App
