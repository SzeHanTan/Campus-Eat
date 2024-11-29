import React from 'react';
import './GroupDiscountPopup.css';

const GroupDiscountPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2>Group Discount Details</h2>
                <p>Get amazing discounts for orders placed in groups of 4 or more!</p>
                <ul>
                    <li>10% off for 4-9 orders</li>
                    <li>15% off for 10-14 orders</li>
                    <li>20% off for 15+ orders</li>
                </ul>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default GroupDiscountPopup;
