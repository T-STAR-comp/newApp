import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//import comps
import HomeComp from './home/home'
import Admin from './admin/admin'
import MasterAdmin from './master/master'
import Login from './auth/login'
import LandingPage from './landing/landing'
import PaymentError from '../errors/paymentError'
import Result from '../result/result'
import NotFound from '../errors/404'

function App() {
  
  if (!sessionStorage.getItem("USER")) {
    return (
      <>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path='/home' element={<HomeComp/>} />
          <Route path='/master' element={<MasterAdmin/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/PayError' element={<PaymentError/>} />
          <Route path='/paysuccessOrderID' element={<Result/>} />
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

  if (sessionStorage.getItem("ADMIN")) {
    return(
      <>
        <Routes>
          <Route path='/' element={<MasterAdmin/>} />
          <Route path='*' element={<MasterAdmin/>} />
        </Routes>
      </>
    );
  };
};

export default App
