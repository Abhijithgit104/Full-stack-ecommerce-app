import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ title = "Success", message, show, onClose, variant = "success" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className="position-fixed" style={{ top: '32px', right: '32px', zIndex: 999999, pointerEvents: 'none' }}>
      <div className={`toast-card ${show ? 'active' : ''}`}>
        <div className="d-flex align-items-center p-3 gap-3">
          <div className={`${variant === 'danger' ? 'bg-danger' : 'bg-black'} text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0`} style={{ width: '44px', height: '44px' }}>
            <CheckCircle size={20} />
          </div>
          <div className="flex-grow-1">
            <h4 className="m-0 text-black fw-bold" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px' }}>{title}</h4>
            <p className="m-0 mt-1 fw-medium text-black-50" style={{ fontSize: '13px' }}>{message}</p>
          </div>
          <button className="btn btn-light bg-secondary-custom p-0 d-flex align-items-center justify-content-center text-secondary toast-close-btn flex-shrink-0" onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '10px', transition: '0.3s' }}>
            <X size={18} />
          </button>
        </div>
        <div className="w-100" style={{ height: '3px', background: 'rgba(0,0,0,0.05)' }}>
          <div className={`h-100 ${variant === 'danger' ? 'bg-danger' : 'bg-black'} toast-progress-bar`} />
        </div>
      </div>

      <style>{`
        .toast-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          min-width: 340px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          pointer-events: auto;
          transform: translateX(120%);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
        }
        .toast-card.active {
          transform: translateX(0);
          opacity: 1;
        }
        .toast-close-btn:hover {
          background: #000 !important;
          color: #fff !important;
          transform: rotate(90deg);
        }
        .toast-progress-bar {
          animation: progress 3s linear forwards;
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
