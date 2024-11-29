import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext'; 
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext); 
    const navigate = useNavigate();

    // Calculate the total quantity of items in the cart
    const getTotalItemCount = () => {
        return food_list.reduce((total, item) => {
            return total + (cartItems[item._id] || 0);
        }, 0);
    };

    // Calculate the discount percentage based on total items
    const getDiscountPercentage = () => {
        const totalItems = getTotalItemCount();
        if (totalItems >= 15) return 0.2; // 20% discount for 15+ items
        if (totalItems >= 10) return 0.15; // 15% discount for 10-14 items
        if (totalItems >= 5) return 0.1; // 10% discount for 5-9 items
        return 0; // No discount for fewer than 5 items
    };

    // Calculate subtotal, discount, delivery fee, and total
    const subtotal = getTotalCartAmount();
    const discountPercentage = getDiscountPercentage();
    const discountAmount = subtotal * discountPercentage;
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const grandTotal = subtotal - discountAmount + deliveryFee;

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>RM{item.price.toFixed(2)}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>RM{(item.price * cartItems[item._id]).toFixed(2)}</p>
                                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; // Ensure no undefined elements are rendered
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>RM{subtotal.toFixed(2)}</p>
                        </div>
                        <hr />
                        {discountPercentage > 0 && (
                            <div className="cart-total-details">
                                <p>Group Discount ({(discountPercentage * 100).toFixed(0)}%)</p>
                                <p>-RM{discountAmount.toFixed(2)}</p>
                            </div>
                        )}
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>RM{deliveryFee.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>RM{grandTotal.toFixed(2)}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promo Code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


