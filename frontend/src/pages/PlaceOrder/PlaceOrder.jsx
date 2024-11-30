import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    phone: ""
  });

  const [qrCode, setQrCode] = useState(""); // To store QR code URL
  const [receipt, setReceipt] = useState(null); // To store the uploaded receipt
  const [orderPlaced, setOrderPlaced] = useState(false); // Flag to check if order is placed

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleReceiptUpload = async () => {
    const formData = new FormData();
    formData.append("receipt", receipt); // Add receipt file
    formData.append("orderId", "12345"); // Replace with actual order ID from backend response

    try {
      let response = await axios.post(`${url}/api/order/upload-receipt`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        alert("Thank you for your order!");
        navigate("/thank-you"); // Redirect to thank you page
      } else {
        alert("Error uploading receipt: " + response.data.message);
      }
    } catch (error) {
      console.error("Receipt upload failed:", error);
      alert("Error: Something went wrong with the receipt upload.");
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare orderItems from cartItems
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Adding delivery fee
    };

    try {
      // Send the order data to the backend
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        // Generate QR code for payment
        const qrCodeData = await QRCode.toDataURL(`Pay RM${getTotalCartAmount() + 2}`);
        setQrCode(qrCodeData);

        setOrderPlaced(true); // Mark order as placed
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Error: Something went wrong with the request.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart'); // Redirect if user is not logged in
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart'); // Redirect if cart is empty
    }
  }, [token]);

  return (
    <div className="place-order">
      {!orderPlaced ? (
        <form onSubmit={placeOrder}>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Email address"
            />
            <input
                required
                name="street"
                onChange={onChangeHandler}
                value={data.street}
                type="text"
                placeholder="Street"
            />
            <div className="multi-fields">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
              />
            </div>
            <div className="multi-fields">
              <input
                required
                name="postcode"
                onChange={onChangeHandler}
                value={data.postcode}
                type="text"
                placeholder="Postcode"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
              />
            </div>
            <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="text"
                placeholder="Phone"
            />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>RM{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>RM{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>RM{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button type="submit">PROCEED TO PAYMENT</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="payment-section">
          <h2>Scan to Pay</h2>
          <img src={qrCode} alt="Payment QR Code" />
          <input
            type="file"
            onChange={(e) => setReceipt(e.target.files[0])}
          />
          <button onClick={handleReceiptUpload}>Submit Receipt</button>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;