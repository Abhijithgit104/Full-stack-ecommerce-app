import React from 'react';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { useServer } from '../context/ServerContext';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = React.useState(false);
  const { serverReady } = useServer();

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            fill={i < Math.floor(rating) ? "#FFC107" : "none"} 
            color={i < Math.floor(rating) ? "#FFC107" : "#e0e0e0"} 
          />
        ))}
        <span className="rating-text">{rating}/<span className="rating-total">5</span></span>
      </div>
    );
  };

  return (
    <div className="card border-0 h-100 product-card-hover" style={{ cursor: 'pointer', transition: '0.3s' }} onClick={() => navigate(`/product/${product.id}`)}>
      <div className="rounded-4 overflow-hidden mb-3" style={{ background: '#F0EEED', aspectRatio: '1/1.1' }}>
        <img src={product.image} alt={product.name} className="w-100 h-100 object-fit-cover" />
      </div>
      <h3 className="fs-5 fw-bold mb-2 text-truncate">{product.name}</h3>
      {renderStars(product.rating)}
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-4 fw-bold">${product.price}</span>
        {product.old_price && (
          <>
            <span className="fs-4 fw-bold text-decoration-line-through text-black-50">${product.old_price}</span>
            <span className="badge rounded-pill fw-medium" style={{ background: 'rgba(255, 51, 51, 0.1)', color: '#FF3333', fontSize: '12px', padding: '6px 14px' }}>
              -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
            </span>
          </>
        )}
      </div>
      <div className="mt-auto">
        <button 
          className="btn btn-black w-100 rounded-pill fw-medium py-2" 
          disabled={!serverReady}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart({ product: product.id, quantity: 1 }));
            setShowToast(true);
          }}
        >
          {serverReady ? 'Add to Cart' : 'Waking...'}
        </button>
      </div>

      <style>{`
        .product-card-hover:hover {
          transform: translateY(-5px);
        }
        .stars { display: flex; align-items: center; gap: 4px; margin-bottom: 8px; }
        .rating-text { font-size: 14px; margin-left: 8px; font-weight: 500; }
        .rating-total { color: #999; }
      `}</style>
      <Toast 
        message={`${product.name} added to cart!`} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default ProductCard;
