import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Error fetching orders: ' + error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + '/api/order/status', {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Added url as a dependency in case it changes during the component's lifecycle

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items &&
                    order.items.map((item, itemIndex) => {
                      if (itemIndex === order.items.length - 1) {
                        return `${item.name} x ${item.quantity}`;
                      } else {
                        return `${item.name} x ${item.quantity}, `;
                      }
                    })}
                </p>

                <p className="order-item-name">
                  {order.address && order.address.firstName &&
                  order.address.lastName
                    ? order.address.firstName + ' ' + order.address.lastName
                    : 'No name available'}
                </p>

                <div className="order-item-address">
                  <p>{order.address?.street ? order.address.street + ',' : ''}</p>
                  <p>
                    {order.address?.city
                      ? `${order.address.city}, `
                      : ''}
                    {order.address?.state ? `${order.address.state}, ` : ''}
                    {order.address?.country ? `${order.address.country}, ` : ''}
                    {order.address?.zipcode ? order.address.zipcode : ''}
                  </p>
                </div>
                <p className="order-item-phone">
                  {order.address?.phone || 'No phone available'}
                </p>
              </div>
              <p>Items: {order.items?.length}</p>
              <p>RM {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
