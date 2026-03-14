import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get('/orders/');
      setOrders(response.data);
    };
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>Order #{order.id}</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
              <span className="status">{order.status}</span>
            </div>
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="item">
                  {item.product_details.name} x {item.quantity} - ${item.price}
                </div>
              ))}
            </div>
            <div className="order-footer">
              <strong>Total: ${order.total_price}</strong>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>No orders found.</p>}
      </div>
      <style>{`
        .orders-page { max-width: 800px; margin: 40px auto; padding: 20px; }
        .order-card { border: 1px solid #ddd; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
        .order-header { display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: bold; }
        .status { color: green; text-transform: capitalize; }
        .order-items { border-top: 1px solid #eee; padding-top: 15px; }
        .item { margin-bottom: 5px; color: #555; }
        .order-footer { margin-top: 15px; text-align: right; }
      `}</style>
    </div>
  );
};

export default Orders;
