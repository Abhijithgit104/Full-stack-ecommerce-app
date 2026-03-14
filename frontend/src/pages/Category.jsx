import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
import { ChevronRight, Settings2, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useServer } from '../context/ServerContext';

const Category = () => {
  const { type, value } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverReady } = useServer();
  
  // Filter States
  const [priceRange, setPriceRange] = useState(500);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const search = queryParams.get('search');
      
      let url = `/products/?`;
      if (type && value) url += `${type}=${value}&`;
      if (search) url += `search=${search}&`;
      
      // Add advanced filters
      if (selectedType) url += `product_type=${selectedType}&`;
      if (selectedSize) url += `size=${selectedSize}&`;
      if (selectedColor) url += `color=${encodeURIComponent(selectedColor)}&`;
      url += `max_price=${priceRange}&`;
      
      const response = await api.get(url);
      setProducts(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serverReady) {
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [type, value, window.location.search, serverReady]);

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const colors = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06BFF5', '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'];
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  return (
    <div className="container py-4 mb-5">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex align-items-center gap-2 text-muted-custom fs-6">
        <Link to="/" className="text-decoration-none text-muted-custom hover-text-black">Home</Link> 
        <ChevronRight size={14} /> 
        <span className="text-black fw-medium">{value ? value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ') : 'Shop'}</span>
      </nav>

      <div className="row g-4">
        {/* Sidebar Filters */}
        <aside className="col-12 col-lg-3 d-none d-lg-block">
          <div className="border border-secondary border-opacity-25 rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fs-5 fw-bold mb-0">Filters</h3>
              <SlidersHorizontal size={20} className="text-muted-custom" />
            </div>
            
            <hr className="text-secondary opacity-25 my-4" />
            
            <div className="d-flex flex-column gap-3">
              {categories.map(cat => (
                <div 
                  key={cat} 
                  className={`d-flex justify-content-between align-items-center cursor-pointer ${selectedType === cat ? 'text-black fw-bold' : 'text-muted-custom'}`}
                  style={{ cursor: 'pointer', transition: '0.2s' }}
                  onClick={() => setSelectedType(selectedType === cat ? null : cat)}
                >
                  <span>{cat}</span>
                  <ChevronRight size={16} className={`${selectedType === cat ? 'text-black' : 'text-muted-custom'}`} />
                </div>
              ))}
            </div>

            <hr className="text-secondary opacity-25 my-4" />

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fs-5 fw-bold mb-0">Price</h4>
                <ChevronDown size={16} />
              </div>
              <div className="mt-2">
                <input 
                  type="range" 
                  className="form-range"
                  min="50" 
                  max="500" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)} 
                />
                <div className="d-flex justify-content-between mt-2 fw-medium">
                  <span>$50</span>
                  <span>${priceRange}</span>
                </div>
              </div>
            </div>

            <hr className="text-secondary opacity-25 my-4" />

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fs-5 fw-bold mb-0">Colors</h4>
                <ChevronDown size={16} />
              </div>
              <div className="d-flex flex-wrap gap-2">
                {colors.map(color => (
                  <div 
                    key={color} 
                    className={`rounded-circle d-flex align-items-center justify-content-center cursor-pointer`} 
                    style={{ 
                      width: '37px', height: '37px', backgroundColor: color, 
                      border: color === '#FFFFFF' ? '1px solid #ddd' : 'none',
                      boxShadow: selectedColor === color ? `0 0 0 2px white, 0 0 0 4px #000` : 'none',
                      transition: '0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                  >
                    {selectedColor === color && <Check size={14} color={color === '#FFFFFF' ? 'black' : 'white'} />}
                  </div>
                ))}
              </div>
            </div>

            <hr className="text-secondary opacity-25 my-4" />

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fs-5 fw-bold mb-0">Size</h4>
                <ChevronDown size={16} />
              </div>
              <div className="d-flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button 
                    key={size} 
                    className={`btn rounded-pill px-3 py-2 fs-6 ${selectedSize === size ? 'btn-black' : 'bg-secondary-custom text-muted-custom hover-bg-light'}`}
                    style={{ border: 'none', cursor: 'pointer', transition: '0.2s' }}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="text-secondary opacity-25 my-4" />

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fs-5 fw-bold mb-0">Dress Style</h4>
                <ChevronDown size={16} />
              </div>
              {dressStyles.map(ds => (
                <Link key={ds} to={`/category/style/${ds.toLowerCase()}`} className="d-flex justify-content-between align-items-center text-muted-custom text-decoration-none hover-text-black">
                  <span>{ds}</span>
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>

            <button className="btn btn-black w-100 rounded-pill py-3 mt-4 fw-medium" onClick={fetchProducts}>Apply Filter</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-12 col-lg-9">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 gap-3">
            <h2 className="fs-2 fw-bolder m-0">{value ? value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ') : 'All Products'}</h2>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 text-muted-custom fs-6">
              <p className="m-0">Showing 1-{products.length} of {products.length} Products</p>
              <div className="cursor-pointer d-flex align-items-center gap-1" style={{ cursor: 'pointer' }}>
                <span className="d-none d-sm-inline">Sort by:</span> <strong className="text-black">Most Popular</strong> <ChevronDown size={16} className="text-black" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5 text-muted-custom">Loading products...</div>
          ) : (
            <div className="row g-4 mb-5">
              {Array.isArray(products) && products.map(product => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                  <ProductCard product={product} />
                </div>
              ))}
              {products.length === 0 && <p className="text-center w-100 py-5 text-muted-custom">No products found in this category.</p>}
            </div>
          )}

          <hr className="text-secondary opacity-25 mb-4" />

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-secondary rounded-3 px-3 py-2 fw-medium text-black d-flex align-items-center gap-2" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
               ← <span className="d-none d-sm-inline">Previous</span>
            </button>
            <div className="d-flex gap-1 gap-sm-2">
              <span className="btn rounded-3 px-3 py-2 fw-medium bg-black text-white hover-bg-dark">1</span>
              <span className="btn rounded-3 px-3 py-2 fw-medium text-muted-custom hover-bg-light border-0">2</span>
              <span className="btn rounded-3 px-3 py-2 fw-medium text-muted-custom hover-bg-light border-0">3</span>
              <span className="btn rounded-3 px-3 py-2 fw-medium text-muted-custom border-0 pe-none">...</span>
              <span className="btn rounded-3 px-3 py-2 fw-medium text-muted-custom hover-bg-light border-0">10</span>
            </div>
            <button className="btn btn-outline-secondary rounded-3 px-3 py-2 fw-medium text-black d-flex align-items-center gap-2" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
               <span className="d-none d-sm-inline">Next</span> →
            </button>
          </div>
        </main>
      </div>

      <style>{`
        .hover-text-black:hover { color: #000 !important; }
        .hover-bg-light:hover { background-color: rgba(0,0,0,0.06) !important; color: #000 !important;}
        .form-range::-webkit-slider-thumb { background: #000; }
        .form-range::-moz-range-thumb { background: #000; }
        .form-range::-ms-thumb { background: #000; }
      `}</style>
    </div>
  );
};

export default Category;
