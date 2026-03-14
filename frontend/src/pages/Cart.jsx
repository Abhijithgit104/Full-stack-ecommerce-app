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
    <div className="container py-5">
      <h1 className="fw-bolder mb-4 heading-font" style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontFamily: 'Outfit, sans-serif' }}>YOUR CART</h1>
      
      {items.length === 0 ? (
        <p className="text-muted-custom fs-5">Your cart is empty.</p>
      ) : (
        <div className="row g-4 mt-2">
          <div className="col-12 col-lg-7 col-xl-8">
            <div className="d-flex flex-column gap-3">
              {Array.isArray(items) && items.map((item) => (
                <div key={item.id} className="d-flex gap-3 gap-md-4 p-3 p-md-4 border border-secondary border-opacity-25 rounded-4 align-items-center">
                  <div className="rounded-3 overflow-hidden flex-shrink-0" style={{ width: '100px', height: '100px', backgroundColor: '#F0EEED' }}>
                    <img src={item.product_details.image} alt={item.product_details.name} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="fs-5 fw-bold mb-1 text-truncate">{item.product_details.name}</h3>
                    <p className="text-muted-custom mb-1 fs-6">Qty: {item.quantity}</p>
                    <p className="fs-5 fw-bold mb-0">${item.product_details.price}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="btn btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '40px', height: '40px' }}
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="p-4 border border-secondary border-opacity-25 rounded-4 sticky-lg-top" style={{ top: '100px' }}>
              <h2 className="fs-4 fw-bold mb-4 font-heading" style={{ fontFamily: 'Outfit, sans-serif' }}>Order Summary</h2>
              
              <div className="d-flex justify-content-between mb-3 text-muted-custom">
                <span>Subtotal</span>
                <span className="fw-medium text-black">${total}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3 text-muted-custom">
                <span>Delivery Fee</span>
                <span className="fw-medium text-black">$15</span>
              </div>
              
              <hr className="my-4 text-secondary opacity-25" />
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 text-black">Total</span>
                <span className="fs-3 fw-bold text-black">${total + 15}</span>
              </div>
              
              <button 
                className="btn btn-black w-100 rounded-pill py-3 fw-medium d-flex justify-content-center align-items-center gap-2" 
                onClick={() => navigate('/checkout')}
              >
                Go to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
