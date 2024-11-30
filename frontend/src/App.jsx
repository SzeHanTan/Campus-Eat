import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import PaymentPage from './pages/Payment/PaymentPage';
import PaymentSuccessPage from './pages/Payment/PaymentSuccessPage';
import PaymentFailurePage from './pages/Payment/PaymentFailurePage';
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <ErrorBoundary>
      <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-failure" element={<PaymentFailurePage />} />  
            <Route path='/verify' element={<Verify/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
          </Routes>
        </div>
        <Footer />
      </>
    </ErrorBoundary>
  )
}

export default App
