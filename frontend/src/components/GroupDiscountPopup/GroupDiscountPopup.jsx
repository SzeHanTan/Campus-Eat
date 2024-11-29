import React from 'react';
import './GroupDiscountPopup.css';

const GroupDiscountPopup = () => {

    return (
        <div className="group-discount-popup" id='group-discount-popup'>
            <h2>Group Discount Details</h2>
            <p>Get amazing discounts for orders placed in groups of 4 or more!</p>
            <ul>
                <li>10% off for 4-9 orders</li>
                <li>15% off for 10-14 orders</li>
                <li>20% off for 15+ orders</li>
            </ul>
        </div>
    );
};

export default GroupDiscountPopup;
