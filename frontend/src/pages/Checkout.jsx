import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + (item.product_details?.price || 0) * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return alert("Your cart is empty");
    setLoading(true);
    try {
      await api.post('/orders/', {});
      dispatch(clearCart());
      navigate('/success');
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '1000px' }}>
      <h1 className="fw-bolder mb-5 heading-font" style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontFamily: 'Outfit, sans-serif' }}>Checkout</h1>
      
      <div className="row g-5">
        <div className="col-12 col-md-6 order-2 order-md-1">
          <div className="d-flex flex-column gap-3">
            <h3 className="fs-4 fw-bold mb-3 font-heading" style={{ fontFamily: 'Outfit, sans-serif' }}>Shipping Details</h3>
            <input type="text" className="form-control p-3 rounded-3" placeholder="Full Name" />
            <input type="text" className="form-control p-3 rounded-3" placeholder="Address" />
            <input type="text" className="form-control p-3 rounded-3" placeholder="City" />
          </div>
        </div>
        
        <div className="col-12 col-md-6 order-1 order-md-2">
          <div className="p-4 bg-light rounded-4 border border-secondary border-opacity-10">
            <h3 className="fs-4 fw-bold mb-4 font-heading" style={{ fontFamily: 'Outfit, sans-serif' }}>Order Summary</h3>
            
            <div className="d-flex flex-column gap-3">
              {items.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-white rounded-3 border border-secondary border-opacity-10 overflow-hidden flex-shrink-0" style={{ width: '64px', height: '64px' }}>
                      <img src={item.product_details?.image} alt={item.product_details?.name} className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div>
                       <p className="fw-bold fs-6 m-0 text-truncate" style={{ maxWidth: '150px' }}>{item.product_details.name}</p>
                       <p className="text-muted-custom small m-0 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="fw-bold fs-6 text-nowrap pl-2">${item.product_details.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <hr className="my-4 text-secondary opacity-25" />
            
            <div className="d-flex justify-content-between align-items-center fw-bolder fs-5 mt-4">
              <span>Total</span>
              <span>${total + 15}</span>
            </div>
            
            <button 
              className="btn btn-black w-100 rounded-pill py-3 mt-4 fw-semibold" 
              onClick={handlePlaceOrder} 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
