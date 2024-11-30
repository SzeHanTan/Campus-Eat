import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import PaymentPage from './pages/PaymentPage';  // Import PaymentPage component

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <ErrorBoundary>
      <>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
            
            {/* Add route for PaymentPage */}
            <Route path='/payment' element={<PaymentPage />} /> 
          </Routes>
        </div>
        <Footer />
      </>
    </ErrorBoundary>
  );
};

export default App;