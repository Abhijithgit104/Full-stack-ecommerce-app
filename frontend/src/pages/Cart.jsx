import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [dispatch, token]);

  const total = Array.isArray(items) ? items.reduce((acc, item) => acc + item.product_details.price * item.quantity, 0) : 0;

  if (!token) return <div className="cart-page">Please login to view your cart.</div>;

  return (
    <div className="cart-page">
      <h1>YOUR CART</h1>
      <div className="cart-content">
        <div className="cart-items">
          {Array.isArray(items) && items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.product_details.image} alt={item.product_details.name} />
              <div className="item-info">
                <h3>{item.product_details.name}</h3>
                <p>Price: ${item.product_details.price}</p>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>Your cart is empty.</p>}
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>$15</span>
          </div>
          <div className="total-row">
            <span>Total</span>
            <span>${total + 15}</span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Go to Checkout →
          </button>
        </div>
      </div>

      <style>{`
        .cart-page { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .cart-content { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-top: 30px; }
        .cart-item { display: flex; gap: 20px; padding: 20px; border: 1px solid #eee; border-radius: 12px; margin-bottom: 20px; }
        .cart-item img { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; }
        .order-summary { padding: 24px; border: 1px solid #eee; border-radius: 20px; height: fit-content; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; color: rgba(0,0,0,0.6); }
        .total-row { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-weight: bold; font-size: 20px; }
        .checkout-btn { width: 100%; padding: 16px; background: #000; color: #fff; border: none; border-radius: 62px; margin-top: 24px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Cart;
