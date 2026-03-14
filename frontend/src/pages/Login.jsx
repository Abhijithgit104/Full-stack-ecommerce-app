import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <h1 className="logo">SHOP.CO</h1>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <div className="input-field">
              <Mail size={18} />
              <input 
                type="text" 
                placeholder="Enter your username" 
                required
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
              />
            </div>
          </div>

          {error && <div className="error-message">Invalid username or password. Please try again.</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                Sign In <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create an account</Link></p>
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F0F0F0;
          padding: 20px;
        }
        .auth-card {
          background: white;
          width: 100%;
          max-width: 450px;
          padding: 48px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-header .logo {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        .auth-header h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .auth-header p {
          color: rgba(0,0,0,0.5);
          font-size: 14px;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #000;
        }
        .input-field {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F0F0F0;
          border-radius: 62px;
          padding: 12px 20px;
          border: 1px solid transparent;
          transition: 0.2s;
        }
        .input-field:focus-within {
          border-color: #000;
          background: white;
        }
        .input-field input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-size: 16px;
        }
        .input-field svg {
          color: rgba(0,0,0,0.4);
        }
        .error-message {
          background: rgba(255, 51, 51, 0.1);
          color: #FF3333;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          text-align: center;
        }
        .auth-btn {
          background: #000;
          color: #fff;
          border: none;
          border-radius: 62px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
          margin-top: 10px;
        }
        .auth-btn:hover {
          background: #333;
        }
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 14px;
        }
        .auth-footer a {
          color: #000;
          font-weight: 600;
          text-decoration: underline;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
