import React from 'react';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      {renderStars(product.rating)}
      <div className="product-pricing">
        <span className="current-price">${product.price}</span>
        {product.old_price && (
          <>
            <span className="old-price">${product.old_price}</span>
            <span className="discount-tag">
              -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
            </span>
          </>
        )}
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart({ product: product.id, quantity: 1 }));
        }}
      >
        Add to Cart
      </button>

      <style>{`
        .product-card {
          flex: 1;
          min-width: 250px;
          cursor: pointer;
          transition: 0.3s;
          position: relative;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image-wrap {
          background: #F0EEED;
          border-radius: 20px;
          aspect-ratio: 1/1.1;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .stars {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        .rating-text {
          font-size: 14px;
          margin-left: 8px;
          font-weight: 500;
        }
        .rating-total {
          color: #999;
        }
        .product-pricing {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .current-price {
          font-size: 24px;
          font-weight: 700;
        }
        .old-price {
          font-size: 24px;
          font-weight: 700;
          color: rgba(0,0,0,0.3);
          text-decoration: line-through;
        }
        .discount-tag {
          background: rgba(255, 51, 51, 0.1);
          color: #FF3333;
          padding: 6px 14px;
          border-radius: 62px;
          font-size: 12px;
          font-weight: 500;
        }
        .add-to-cart-btn {
          width: 100%;
          padding: 12px;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 62px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.3s;
        }
        .add-to-cart-btn:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
