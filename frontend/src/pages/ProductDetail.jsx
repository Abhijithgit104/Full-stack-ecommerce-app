import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { Star, Check, ChevronRight, Settings2, Plus, Minus } from 'lucide-react';
import ProductSection from '../components/ProductSection';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, loading } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('#4F4631');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ product: product.id, quantity }));
  };

  if (loading || !product) return <div className="loading-state">Loading...</div>;

  const colors = [
    { name: 'Brown', value: '#4F4631' },
    { name: 'Navy', value: '#31344F' },
    { name: 'Dark Grey', value: '#314F4A' },
  ];

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  const reviews = [
    { name: "Samantha D.", date: "August 14, 2023", rating: 5, text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt." },
    { name: "Alex M.", date: "August 15, 2023", rating: 5, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me." },
    { name: "Ethan R.", date: "August 16, 2023", rating: 4.5, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt." },
    { name: "Olivia P.", date: "August 17, 2023", rating: 5, text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out." },
    { name: "Liam K.", date: "August 18, 2023", rating: 5, text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion." },
    { name: "Ava H.", date: "August 19, 2023", rating: 4.5, text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this t-shirt a conversation starter." },
  ];

  return (
    <div className="product-detail-container">
      {/* Breadcrumbs */}
      <div className="container breadcrumbs">
        <Link to="/">Home</Link> <ChevronRight size={14} /> 
        <Link to="/">Shop</Link> <ChevronRight size={14} /> 
        <Link to="/">Men</Link> <ChevronRight size={14} /> 
        <span className="current">T-shirts</span>
      </div>

      <div className="container">
        <div className="product-main">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="thumbnails">
              {[1, 2, 3].map((i) => (
                <div key={i} className="thumb-item">
                  <img src={product.image} alt="thumbnail" />
                </div>
              ))}
            </div>
            <div className="main-image-wrap">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Product Info */}
          <div className="info-section">
            <h1 className="product-title">{product.name.toUpperCase()}</h1>
            <div className="rating-summary">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating) ? "#FFC107" : "none"} 
                    color={i < Math.floor(product.rating) ? "#FFC107" : "#e0e0e0"} 
                  />
                ))}
              </div>
              <span className="rating-text">{product.rating}/5</span>
            </div>

            <div className="price-tag">
              <span className="current-price">${product.price}</span>
              {product.old_price && (
                <>
                  <span className="old-price">${product.old_price}</span>
                  <span className="discount-badge">-{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%</span>
                </>
              )}
            </div>

            <p className="product-desc">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            <hr className="divider" />

            {/* Select Colors */}
            <div className="selection-group">
              <h4>Select Colors</h4>
              <div className="color-options">
                {colors.map((c) => (
                  <div 
                    key={c.value} 
                    className={`color-blob ${selectedColor === c.value ? 'active' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => setSelectedColor(c.value)}
                  >
                    {selectedColor === c.value && <Check size={14} color="white" />}
                  </div>
                ))}
              </div>
            </div>

            <hr className="divider" />

            {/* Choose Size */}
            <div className="selection-group">
              <h4>Choose Size</h4>
              <div className="size-options">
                {sizes.map((s) => (
                  <button 
                    key={s} 
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <hr className="divider" />

            {/* Add to Cart Actions */}
            <div className="cart-actions">
              <div className="qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
              </div>
              <button className="main-add-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tabs-container">
          <div className="tabs-header">
            <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Product Details</button>
            <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Rating & Reviews</button>
            <button className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')}>FAQs</button>
          </div>
          <div className="tab-content">
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-title-bar">
                  <h3>All Reviews <span className="count">(451)</span></h3>
                  <div className="reviews-controls">
                    <button className="icon-btn"><Settings2 size={20} /></button>
                    <div className="sort-dropdown">Latest <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></div>
                    <button className="write-review-btn">Write a Review</button>
                  </div>
                </div>

                <div className="reviews-grid">
                  {reviews.map((r, i) => (
                    <div key={i} className="review-card">
                      <div className="card-top">
                        <div className="stars">
                          {[...Array(5)].map((_, si) => (
                            <Star 
                              key={si} 
                              size={18} 
                              fill={si < Math.floor(r.rating) ? "#FFC107" : "none"} 
                              color={si < Math.floor(r.rating) ? "#FFC107" : "#e0e0e0"} 
                            />
                          ))}
                        </div>
                        <button className="more-btn">•••</button>
                      </div>
                      <div className="user-info">
                        <strong>{r.name}</strong>
                        <div className="verified-check"><Check size={10} color="white" /></div>
                      </div>
                      <p className="review-text">"{r.text}"</p>
                      <span className="post-date">Posted on {r.date}</span>
                    </div>
                  ))}
                </div>

                <div className="load-more-wrap">
                  <button className="load-more-btn">Load More Reviews</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="suggestions-section">
          <h2 className="section-title">YOU MIGHT ALSO LIKE</h2>
          <ProductSection endpoint="top-selling/" showTitle={false} />
        </div>
      </div>

      <style>{`
        .product-detail-container { padding-top: 24px; padding-bottom: 80px; }
        .breadcrumbs { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 24px; color: rgba(0,0,0,0.6); }
        .breadcrumbs a { text-decoration: none; color: inherit; }
        .breadcrumbs .current { color: black; }
        
        .product-main { display: flex; gap: 40px; margin-bottom: 80px; }
        .gallery-section { display: flex; gap: 14px; flex: 1; }
        .thumbnails { display: flex; flex-direction: column; gap: 14px; }
        .thumb-item { width: 152px; height: 167px; background: #F0EEED; border-radius: 20px; overflow: hidden; cursor: pointer; }
        .thumb-item img { width: 100%; height: 100%; object-fit: cover; }
        .main-image-wrap { flex: 1; background: #F0EEED; border-radius: 20px; overflow: hidden; }
        .main-image-wrap img { width: 100%; height: 100%; object-fit: cover; }

        .info-section { flex: 1; display: flex; flex-direction: column; }
        .product-title { font-size: 40px; font-weight: 800; line-height: 1; margin-bottom: 12px; }
        .rating-summary { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .rating-text { font-size: 14px; color: #000; }
        .price-tag { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .current-price { font-size: 32px; font-weight: 700; }
        .old-price { font-size: 32px; font-weight: 700; color: rgba(0,0,0,0.3); text-decoration: line-through; }
        .discount-badge { background: rgba(255, 51, 51, 0.1); color: #FF3333; padding: 6px 14px; border-radius: 62px; font-size: 14px; font-weight: 500; }
        .product-desc { color: rgba(0,0,0,0.6); line-height: 1.6; margin-bottom: 24px; }
        .divider { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 0; margin-bottom: 24px; }
        
        .selection-group h4 { color: rgba(0,0,0,0.6); font-weight: 400; font-size: 16px; margin-bottom: 16px; }
        .color-options { display: flex; gap: 16px; }
        .color-blob { width: 37px; height: 37px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .color-blob.active { border: 2px solid #000; }
        .size-options { display: flex; gap: 12px; flex-wrap: wrap; }
        .size-btn { padding: 12px 24px; border-radius: 62px; border: none; background: #F0F0F0; color: rgba(0,0,0,0.6); font-size: 16px; cursor: pointer; transition: 0.2s; }
        .size-btn.active { background: #000; color: #fff; }

        .cart-actions { display: flex; gap: 20px; margin-top: 8px; }
        .qty-selector { background: #F0F0F0; border-radius: 62px; display: flex; align-items: center; padding: 0 20px; gap: 24px; }
        .qty-selector button { background: none; border: none; cursor: pointer; padding: 16px 0; }
        .qty-selector span { font-size: 16px; font-weight: 500; min-width: 20px; text-align: center; }
        .main-add-btn { flex: 1; background: #000; color: #fff; border: none; border-radius: 62px; padding: 16px; font-size: 16px; font-weight: 500; cursor: pointer; }

        .tabs-header { display: flex; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 32px; }
        .tabs-header button { flex: 1; background: none; border: none; padding: 24px; font-size: 20px; color: rgba(0,0,0,0.6); cursor: pointer; position: relative; }
        .tabs-header button.active { color: #000; font-weight: 500; }
        .tabs-header button.active::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: #000; }

        .reviews-title-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .reviews-title-bar h3 { font-size: 24px; font-weight: 700; }
        .reviews-title-bar .count { font-weight: 400; color: rgba(0,0,0,0.6); font-size: 16px; }
        .reviews-controls { display: flex; gap: 10px; align-items: center; }
        .icon-btn { width: 48px; height: 48px; border-radius: 50%; border: none; background: #F0F0F0; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .sort-dropdown { background: #F0F0F0; border-radius: 62px; padding: 12px 20px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .write-review-btn { background: #000; color: #fff; border: none; border-radius: 62px; padding: 12px 24px; font-weight: 500; cursor: pointer; }

        .reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 36px; }
        .review-card { border: 1px solid rgba(0,0,0,0.1); border-radius: 20px; padding: 28px; }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .more-btn { background: none; border: none; color: rgba(0,0,0,0.4); font-size: 20px; cursor: pointer; }
        .user-info { display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
        .verified-check { background: #01AB31; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .review-text { color: rgba(0,0,0,0.6); line-height: 1.6; margin-bottom: 24px; }
        .post-date { color: rgba(0,0,0,0.6); font-weight: 500; }

        .load-more-wrap { text-align: center; margin-bottom: 64px; }
        .load-more-btn { background: transparent; border: 1px solid rgba(0,0,0,0.1); padding: 16px 54px; border-radius: 62px; font-weight: 500; cursor: pointer; }

        .section-title { font-size: 48px; font-weight: 800; text-align: center; margin-bottom: 50px; }

        @media (max-width: 1200px) {
          .thumb-item { width: 120px; height: 130px; }
        }
        @media (max-width: 992px) {
          .product-main { flex-direction: column; }
          .gallery-section { flex-direction: column-reverse; }
          .thumbnails { flex-direction: row; }
          .thumb-item { flex: 1; height: 150px; }
          .reviews-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
