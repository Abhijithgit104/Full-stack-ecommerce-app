import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, ReceiptText } from 'lucide-react';

const Success = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="bg-white p-4 p-md-5 rounded-5 w-100 text-center" style={{ maxWidth: '700px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <div className="mb-4 animate-scale-up">
          <CheckCircle size={80} color="#00C12B" strokeWidth={1.5} />
        </div>
        
        <h1 className="fw-bolder mb-3" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontFamily: 'Outfit, sans-serif' }}>Order Placed Successfully!</h1>
        <p className="text-muted-custom fs-5 mb-5 px-md-4 lh-base">
          Thank you for your purchase. Your order has been received and is being processed. 
          You will receive a confirmation email shortly.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5 pb-2">
          <Link to="/orders" className="btn btn-black rounded-pill py-3 px-4 px-sm-5 fw-semibold d-flex align-items-center justify-content-center gap-2 btn-hover-lift">
            <ReceiptText size={20} />
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline-secondary rounded-pill py-3 px-4 px-sm-5 fw-semibold d-flex align-items-center justify-content-center gap-2 btn-hover-lift text-black" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="text-start pt-5 border-top border-secondary border-opacity-10">
          <h3 className="fs-4 fw-bold mb-4">What happens next?</h3>
          <div className="row g-4">
            <div className="col-12 col-sm-4">
              <div className="d-flex flex-column gap-3">
                <div className="bg-secondary-custom rounded-circle d-flex align-items-center justify-content-center fw-bold text-black" style={{ width: '32px', height: '32px', fontSize: '14px' }}>1</div>
                <p className="text-muted-custom small m-0 lh-sm">Order confirmation sent to your email</p>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="d-flex flex-column gap-3">
                <div className="bg-secondary-custom rounded-circle d-flex align-items-center justify-content-center fw-bold text-black" style={{ width: '32px', height: '32px', fontSize: '14px' }}>2</div>
                <p className="text-muted-custom small m-0 lh-sm">Warehouse begins processing your items</p>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="d-flex flex-column gap-3">
                <div className="bg-secondary-custom rounded-circle d-flex align-items-center justify-content-center fw-bold text-black" style={{ width: '32px', height: '32px', fontSize: '14px' }}>3</div>
                <p className="text-muted-custom small m-0 lh-sm">Tracking number provided once shipped</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .btn-hover-lift { transition: transform 0.3s ease, background-color 0.3s ease; }
        .btn-hover-lift:hover { transform: translateY(-2px); }
        .btn-outline-secondary:hover { background-color: #F0F0F0 !important; border-color: rgba(0,0,0,0.1) !important; color: #000 !important; }
        .animate-scale-up { animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes scaleUp { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Success;
