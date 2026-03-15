import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { Star, Check, ChevronRight, ChevronDown, Settings2, Plus, Minus } from 'lucide-react';
import ProductSection from '../components/ProductSection';
import Toast from '../components/Toast';
import { useServer } from '../context/ServerContext';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  const { serverReady } = useServer();
  
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('#4F4631');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (serverReady) {
      dispatch(fetchProductDetail(id));
    }
    window.scrollTo(0, 0);
  }, [dispatch, id, serverReady]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ product: product.id, quantity }));
    setShowToast(true);
  };

  if (loading || !serverReady) {
    return (
      <div className="container py-5 text-center min-vh-50 d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-dark mb-3" role="status"></div>
        <p className="text-muted-custom">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center min-vh-50 d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-danger mb-3">⚠️ Oops!</h2>
        <p className="text-muted-custom mb-4">{error || "Product not found."}</p>
        <button className="btn btn-black rounded-pill px-5 py-2" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

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
    <div className="container py-4 mb-5">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex align-items-center gap-2 text-muted-custom fs-6">
        <Link to="/" className="text-decoration-none text-muted-custom hover-text-black">Home</Link> 
        <ChevronRight size={14} /> 
        <Link to="/" className="text-decoration-none text-muted-custom hover-text-black">Shop</Link> 
        <ChevronRight size={14} /> 
        <Link to="/" className="text-decoration-none text-muted-custom hover-text-black">Men</Link> 
        <ChevronRight size={14} /> 
        <span className="text-black fw-medium">T-shirts</span>
      </nav>

      <div className="row g-5 mb-5 pb-5">
        {/* Image Gallery */}
        <div className="col-12 col-lg-6 d-flex flex-column flex-lg-row gap-3">
          <div className="d-flex flex-row flex-lg-column gap-3 order-2 order-lg-1 thumb-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary-custom rounded-4 overflow-hidden cursor-pointer" style={{ width: 'clamp(80px, 25vw, 152px)', height: 'clamp(90px, 28vw, 167px)', flexShrink: 0 }}>
                <img src={product.image} alt="thumbnail" className="w-100 h-100 object-fit-cover" />
              </div>
            ))}
          </div>
          <div className="bg-secondary-custom rounded-4 overflow-hidden flex-grow-1 order-1 order-lg-2" style={{ maxHeight: '600px' }}>
            <img src={product.image} alt={product.name} className="w-100 h-100 object-fit-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-lg-6 d-flex flex-column">
          <h1 className="fw-bolder mb-3 text-uppercase" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1 }}>{product.name}</h1>
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="d-flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  fill={i < Math.floor(product.rating) ? "#FFC107" : "none"} 
                  color={i < Math.floor(product.rating) ? "#FFC107" : "#e0e0e0"} 
                />
              ))}
            </div>
            <span className="fs-6 text-black">{product.rating}/5</span>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="fs-1 fw-bold">${product.price}</span>
            {product.old_price && (
              <>
                <span className="fs-1 fw-bold text-decoration-line-through text-black-50">${product.old_price}</span>
                <span className="badge rounded-pill fw-medium" style={{ background: 'rgba(255, 51, 51, 0.1)', color: '#FF3333', fontSize: '14px', padding: '6px 14px' }}>
                  -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-custom mb-4" style={{ lineHeight: 1.6 }}>
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
          </p>

          <hr className="text-secondary opacity-25 m-0 mb-4" />

          {/* Select Colors */}
          <div className="mb-4">
            <h4 className="text-muted-custom fw-normal fs-6 mb-3">Select Colors</h4>
            <div className="d-flex gap-3">
              {colors.map((c) => (
                <div 
                  key={c.value} 
                  className={`rounded-circle d-flex align-items-center justify-content-center cursor-pointer`}
                  style={{ 
                    width: '37px', height: '37px', backgroundColor: c.value,
                    border: selectedColor === c.value ? '2px solid #000' : 'none',
                    transition: '0.2s', cursor: 'pointer'
                  }}
                  onClick={() => setSelectedColor(c.value)}
                >
                  {selectedColor === c.value && <Check size={14} color="white" />}
                </div>
              ))}
            </div>
          </div>

          <hr className="text-secondary opacity-25 m-0 mb-4" />

          {/* Choose Size */}
          <div className="mb-4">
            <h4 className="text-muted-custom fw-normal fs-6 mb-3">Choose Size</h4>
            <div className="d-flex gap-3 flex-wrap">
              {sizes.map((s) => (
                <button 
                  key={s} 
                  className={`btn rounded-pill px-4 py-2 fs-6 ${selectedSize === s ? 'btn-black' : 'bg-secondary-custom text-muted-custom hover-bg-light'}`}
                  style={{ border: 'none', cursor: 'pointer', transition: '0.2s' }}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <hr className="text-secondary opacity-25 m-0 mb-4" />

          {/* Add to Cart Actions */}
          <div className="d-flex gap-3 mt-2">
            <div className="bg-secondary-custom rounded-pill d-flex align-items-center px-4 gap-4">
              <button className="btn p-0 border-0" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
              <span className="fs-6 fw-medium text-center" style={{ minWidth: '20px' }}>{quantity}</span>
              <button className="btn p-0 border-0" onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
            </div>
            <button className="btn btn-black flex-grow-1 rounded-pill py-3 px-4 fs-6 fw-medium" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-5 pb-5">
        <ul className="nav nav-pills nav-fill border-bottom border-secondary border-opacity-25 mb-5 pb-0" style={{ cursor: 'pointer' }}>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-0 bg-transparent fs-5 px-3 py-4 ${activeTab === 'details' ? 'active-tab fw-medium text-black' : 'text-muted-custom'}`} 
              onClick={() => setActiveTab('details')}
              style={{ position: 'relative' }}
            >
              Product Details
              {activeTab === 'details' && <div className="position-absolute bottom-0 start-0 w-100 bg-black" style={{ height: '2px' }}></div>}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-0 bg-transparent fs-5 px-3 py-4 ${activeTab === 'reviews' ? 'active-tab fw-medium text-black' : 'text-muted-custom'}`} 
              onClick={() => setActiveTab('reviews')}
              style={{ position: 'relative' }}
            >
              Rating & Reviews
              {activeTab === 'reviews' && <div className="position-absolute bottom-0 start-0 w-100 bg-black" style={{ height: '2px' }}></div>}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-0 bg-transparent fs-5 px-3 py-4 ${activeTab === 'faqs' ? 'active-tab fw-medium text-black' : 'text-muted-custom'}`} 
              onClick={() => setActiveTab('faqs')}
              style={{ position: 'relative' }}
            >
              FAQs
              {activeTab === 'faqs' && <div className="position-absolute bottom-0 start-0 w-100 bg-black" style={{ height: '2px' }}></div>}
            </button>
          </li>
        </ul>
        
        <div className="tab-content">
          {activeTab === 'reviews' && (
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h3 className="fs-4 fw-bold m-0">All Reviews <span className="fw-normal text-muted-custom fs-6">(451)</span></h3>
                <div className="d-flex gap-2 align-items-center">
                  <button className="btn rounded-circle bg-secondary-custom d-flex align-items-center justify-content-center p-0" style={{ width: '48px', height: '48px', border: 'none' }}><Settings2 size={20} /></button>
                  <div className="bg-secondary-custom rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 cursor-pointer">Latest <ChevronDown size={16} /></div>
                  <button className="btn btn-black rounded-pill px-4 py-2 fw-medium text-nowrap">Write a Review</button>
                </div>
              </div>

              <div className="row g-4 mb-5">
                {reviews.map((r, i) => (
                  <div key={i} className="col-12 col-md-6">
                    <div className="border border-secondary border-opacity-25 rounded-4 p-4 h-100">
                      <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex gap-1">
                          {[...Array(5)].map((_, si) => (
                            <Star 
                              key={si} 
                              size={20} 
                              fill={si < Math.floor(r.rating) ? "#FFC107" : "none"} 
                              color={si < Math.floor(r.rating) ? "#FFC107" : "#e0e0e0"} 
                            />
                          ))}
                        </div>
                        <button className="btn p-0 border-0 text-muted-custom fs-4 lh-1">•••</button>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <strong className="fs-5">{r.name}</strong>
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '16px', height: '16px' }}>
                          <Check size={10} color="white" />
                        </div>
                      </div>
                      <p className="text-muted-custom mb-4" style={{ lineHeight: 1.6 }}>"{r.text}"</p>
                      <span className="text-muted-custom fw-medium mt-auto d-block">Posted on {r.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mb-5 pb-4">
                <button className="btn btn-outline-dark rounded-pill px-5 py-3 fw-medium">Load More Reviews</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="mb-5">
        <h2 className="text-center fw-bolder mb-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>YOU MIGHT ALSO LIKE</h2>
        <ProductSection endpoint="?category=top_selling&limit=4" showTitle={false} viewAllLink="top_selling" />
      </div>

      <style>{`
        .hover-text-black:hover { color: #000 !important; }
        .hover-bg-light:hover { background-color: rgba(0,0,0,0.06) !important; color: #000 !important;}
        .btn-outline-dark { border: 1px solid rgba(0,0,0,0.1); color: #000; }
        .btn-outline-dark:hover { background-color: #000; color: #fff; border-color: #000; }
        @media (max-width: 992px) {
           .thumb-container { overflow-x: auto; }
        }
      `}</style>
      <Toast 
        title="Added to Cart"
        message={`${product.name} added to cart!`} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default ProductDetail;
