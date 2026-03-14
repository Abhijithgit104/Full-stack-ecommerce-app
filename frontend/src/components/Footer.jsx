import React from 'react';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-custom mt-5 pt-5 position-relative">
      <div className="container position-absolute top-0 start-50 translate-middle-x" style={{ marginTop: '-75px', zIndex: 10 }}>
        <div className="bg-black rounded-4 p-4 p-md-5 d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4 w-100 mx-auto" style={{ maxWidth: 'calc(100% - 40px)' }}>
          <h2 className="text-white m-0 heading-font" style={{ maxWidth: '550px', fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1 }}>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '350px' }}>
            <div className="input-group bg-white rounded-pill p-1">
              <span className="input-group-text bg-transparent border-0 ps-3"><Mail size={20} className="text-muted" /></span>
              <input type="email" className="form-control border-0 shadow-none bg-transparent" placeholder="Enter your email address" />
            </div>
            <button className="btn btn-light rounded-pill fw-semibold py-2 text-black">Subscribe to Newsletter</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="row g-4 mb-5 pb-4 border-bottom border-secondary border-opacity-25">
          <div className="col-12 col-lg-3 pe-lg-4 text-center text-lg-start">
            <Link to="/" className="text-dark text-decoration-none d-block mb-3 heading-font fw-bolder fs-2">SHOP.CO</Link>
            <p className="text-muted-custom mb-4 mx-auto mx-lg-0" style={{ fontSize: '14px', maxWidth: '250px' }}>
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="d-flex gap-2 justify-content-center justify-content-lg-start">
              <a href="#" className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center bg-white border-opacity-25" style={{ width: '35px', height: '35px' }}><Twitter size={18} /></a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center bg-white border-opacity-25" style={{ width: '35px', height: '35px' }}><Facebook size={18} /></a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center bg-white border-opacity-25" style={{ width: '35px', height: '35px' }}><Instagram size={18} /></a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center bg-white border-opacity-25" style={{ width: '35px', height: '35px' }}><Github size={18} /></a>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2 offset-lg-1">
            <h5 className="fw-semibold mb-3" style={{ fontSize: '14px', letterSpacing: '2px' }}>COMPANY</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/" className="text-muted-custom text-decoration-none">About</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Features</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Works</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Career</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-semibold mb-3" style={{ fontSize: '14px', letterSpacing: '2px' }}>HELP</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/" className="text-muted-custom text-decoration-none">Customer Support</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Delivery Details</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-muted-custom text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-semibold mb-3" style={{ fontSize: '14px', letterSpacing: '2px' }}>FAQ</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/login" className="text-muted-custom text-decoration-none">Account</Link></li>
              <li><Link to="/orders" className="text-muted-custom text-decoration-none">Manage Deliveries</Link></li>
              <li><Link to="/orders" className="text-muted-custom text-decoration-none">Orders</Link></li>
              <li><Link to="/cart" className="text-muted-custom text-decoration-none">Payments</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-semibold mb-3" style={{ fontSize: '14px', letterSpacing: '2px' }}>RESOURCES</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/category/category/new_arrival" className="text-muted-custom text-decoration-none">Free eBooks</Link></li>
              <li><Link to="/category/category/top_selling" className="text-muted-custom text-decoration-none">Development Tutorial</Link></li>
              <li><Link to="/category/style/casual" className="text-muted-custom text-decoration-none">How to - Blog</Link></li>
              <li><Link to="/category/style/formal" className="text-muted-custom text-decoration-none">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-4 text-muted-custom" style={{ fontSize: '14px' }}>
          <p className="mb-3 mb-md-0">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="d-flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="bg-white rounded px-2" style={{ height: '28px', objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="bg-white rounded px-2" style={{ height: '28px', objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="bg-white rounded px-2" style={{ height: '28px', objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="bg-white rounded px-2" style={{ height: '28px', objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Pay_Logo.svg" alt="Google Pay" className="bg-white rounded px-2" style={{ height: '28px', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
      
      <style>{`
        .btn-outline-dark:hover { background-color: #000 !important; color: #fff !important; }
        .heading-font { font-family: 'Outfit', sans-serif; }
      `}</style>
    </footer>
  );
};

export default Footer;
