import React from 'react';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter-section">
        <div className="container newsletter-inner">
          <h2 className="newsletter-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className="newsletter-form">
            <div className="input-wrap">
              <Mail size={20} color="#666" />
              <input type="email" placeholder="Enter your email address" />
            </div>
            <button className="btn-white">Subscribe to Newsletter</button>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-info">
            <h1 className="footer-logo">SHOP.CO</h1>
            <p className="footer-desc">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="social-links">
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Github size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>FAQ</h4>
            <ul>
              <li><a href="#">Account</a></li>
              <li><a href="#">Manage Deliveries</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Payments</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>RESOURCES</h4>
            <ul>
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container footer-bottom">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment-methods">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Pay_Logo.svg" alt="Google Pay" />
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          margin-top: 100px;
          background: #F0F0F0;
        }
        .newsletter-section {
          background: var(--primary);
          border-radius: 20px;
          margin: 0 auto -90px;
          position: relative;
          z-index: 10;
          max-width: 1240px;
          width: calc(100% - 40px);
        }
        .newsletter-inner {
          padding: 36px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }
        .newsletter-title {
          color: white;
          font-size: 40px;
          max-width: 550px;
          line-height: 1.1;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 0 0 350px;
        }
        .input-wrap {
          background: white;
          border-radius: 62px;
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
        }
        .input-wrap input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 16px;
        }
        .btn-white {
          background: white;
          color: black;
          padding: 12px 16px;
          border-radius: 62px;
          font-weight: 600;
          font-size: 16px;
        }
        .footer-main {
          padding-top: 140px;
          padding-bottom: 50px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        .footer-logo {
          font-size: 32px;
          margin-bottom: 25px;
        }
        .footer-desc {
          color: var(--text-muted);
          margin-bottom: 35px;
          max-width: 250px;
        }
        .social-links {
          display: flex;
          gap: 12px;
        }
        .social-links a {
          width: 28px;
          height: 28px;
          background: white;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
        }
        .social-links a:hover {
          background: black;
          color: white;
        }
        .footer-links h4 {
          font-size: 16px;
          letter-spacing: 3px;
          margin-bottom: 25px;
        }
        .footer-links ul li {
          margin-bottom: 20px;
        }
        .footer-links ul li a {
          color: var(--text-muted);
        }
        .footer-bottom {
          border-top: 1px solid rgba(0,0,0,0.1);
          padding-top: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 14px;
        }
        .payment-methods {
          display: flex;
          gap: 12px;
        }
        .payment-methods img {
          height: 30px;
          background: white;
          padding: 5px;
          border-radius: 4px;
        }

        @media (max-width: 992px) {
          .newsletter-inner {
            flex-direction: column;
            text-align: center;
            padding: 30px 20px;
          }
          .newsletter-form {
            width: 100%;
            flex: none;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
