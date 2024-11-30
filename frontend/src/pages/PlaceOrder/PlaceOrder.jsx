import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
    ecoFriendly: false,
    customized: false,
    customizationNotes: "",
  });

  const onChangeHandler = (event) => {
    const { name, type, checked, value } = event.target;

    if (name === "ecoFriendly" && !data.ecoFriendly && checked) {
      alert("No cutlery and plastic bag will be provided. Thank you for reducing waste!");
    }

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery fee
      ecoFriendly: data.ecoFriendly,
      customized: data.customized,
      customizationNotes: data.customizationNotes,
    }

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        // Redirect to the payment page
        if (session_url) {
          navigate('/payment'); // Use navigate instead of window.location.href
        } else {
          alert("Payment session URL not received.");
        }
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Error: Something went wrong.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="postcode" onChange={onChangeHandler} value={data.postcode} type="text" placeholder="Postcode" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />

        <div className="order-options">
          <label className="checkbox-label">
            <span>Eco-Friendly Packaging</span>
            <input
              type="checkbox"
              name="ecoFriendly"
              checked={data.ecoFriendly}
              onChange={onChangeHandler}
            />
          </label>

          <label className="checkbox-label">
            <span>Customized Order</span>
            <input
              type="checkbox"
              name="customized"
              checked={data.customized}
              onChange={onChangeHandler}
            />
          </label>

          {data.customized && (
            <textarea
              name="customizationNotes"
              value={data.customizationNotes}
              onChange={onChangeHandler}
              placeholder="Please specify your customization (e.g., less rice, no vegetable)"
              className="customization-textarea"
            ></textarea>
          )}
        </div>
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;


