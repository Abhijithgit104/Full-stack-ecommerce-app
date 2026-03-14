import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + item.product_details.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      await api.post('/orders/', {});
      alert("Order placed successfully!");
      navigate('/orders');
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="shipping-info">
          <h3>Shipping Details</h3>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
        </div>
        <div className="order-summary-box">
          <h3>Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.product_details.name} x {item.quantity}</span>
              <span>${item.product_details.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="total">
            <span>Total</span>
            <span>${total + 15}</span>
          </div>
          <button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
      <style>{`
        .checkout-page { max-width: 1000px; margin: 40px auto; padding: 20px; }
        .checkout-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .shipping-info { display: flex; flex-direction: column; gap: 15px; }
        .shipping-info input { padding: 12px; border: 1px solid #ddd; border-radius: 8px; }
        .order-summary-box { padding: 20px; background: #f9f9f9; border-radius: 12px; }
        .summary-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .total { display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; margin-top: 15px; }
        .order-summary-box button { width: 100%; padding: 15px; background: #000; color: #fff; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Checkout;
