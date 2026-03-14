import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useServer } from '../context/ServerContext';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', password: '', email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { serverReady } = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(userData));
    if (register.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm w-100 animate-fade-in" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-5">
          <h1 className="fw-bolder mb-4 font-heading" style={{ fontSize: '32px', fontFamily: 'Outfit, sans-serif' }}>SHOP.CO</h1>
          <h2 className="fs-3 fw-bold mb-2">Create Account</h2>
          <p className="text-muted-custom fs-6 mb-0">Join thousands of happy shoppers today</p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <div>
            <label className="form-label fw-medium text-black fs-6 mb-2">Full Name</label>
            <div className="input-group bg-light rounded-pill p-1 border border-transparent focus-within-border-black transition-all">
              <span className="input-group-text bg-transparent border-0 pe-2 ps-3 text-muted-custom">
                <User size={18} />
              </span>
              <input 
                type="text" 
                className="form-control bg-transparent border-0 shadow-none ps-0 fs-6" 
                placeholder="Enter your name" 
                required
                onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
              />
            </div>
          </div>

          <div>
            <label className="form-label fw-medium text-black fs-6 mb-2">Email Address</label>
            <div className="input-group bg-light rounded-pill p-1 border border-transparent focus-within-border-black transition-all">
              <span className="input-group-text bg-transparent border-0 pe-2 ps-3 text-muted-custom">
                <Mail size={18} />
              </span>
              <input 
                type="email" 
                className="form-control bg-transparent border-0 shadow-none ps-0 fs-6" 
                placeholder="you@example.com" 
                required
                onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
              />
            </div>
          </div>

          <div>
            <label className="form-label fw-medium text-black fs-6 mb-2">Password</label>
            <div className="input-group bg-light rounded-pill p-1 border border-transparent focus-within-border-black transition-all">
              <span className="input-group-text bg-transparent border-0 pe-2 ps-3 text-muted-custom">
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                className="form-control bg-transparent border-0 shadow-none ps-0 fs-6" 
                placeholder="••••••••" 
                required
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-4 bg-danger bg-opacity-10 text-danger text-center fs-6">
              {typeof error === 'string' 
                ? error 
                : (typeof error === 'object' && error !== null
                  ? Object.entries(error).map(([field, msgs]) => (
                      <div key={field}><strong>{field}:</strong> {Array.isArray(msgs) ? msgs.join(', ') : msgs}</div>
                    ))
                  : 'Registration failed. Please check your details.')}
            </div>
          )}

          <button type="submit" className="btn btn-black rounded-pill py-3 px-4 fs-6 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-2" disabled={loading || !serverReady}>
            {!serverReady ? (
              <><span className="spinner-border spinner-border-sm"></span> Connecting to server…</>
            ) : loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                Create Account <UserPlus size={18} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 fs-6">
          <p className="text-muted-custom mb-0">Already have an account? <Link to="/login" className="text-black fw-semibold ms-1" style={{ textDecoration: 'underline' }}>Sign in here</Link></p>
        </div>
      </div>

      <style>{`
        .focus-within-border-black:focus-within { border-color: #000 !important; background-color: #fff !important; }
        .transition-all { transition: all 0.2s ease-in-out; }
        .border-transparent { border-color: transparent !important; }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Register;
