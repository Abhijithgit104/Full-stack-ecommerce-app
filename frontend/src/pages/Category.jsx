import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
import { ChevronRight, Settings2, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Category = () => {
  const { type, value } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    fetchProducts();
    window.scrollTo(0, 0);
  }, [type, value, window.location.search]);

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const colors = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06BFF5', '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'];
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  return (
    <div className="category-page container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <ChevronRight size={14} /> 
        <span className="current">{value ? value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ') : 'Shop'}</span>
      </div>

      <div className="category-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <SlidersHorizontal size={20} />
          </div>
          
          <hr className="divider" />
          
          <div className="filter-section">
            {categories.map(cat => (
              <div 
                key={cat} 
                className={`filter-item ${selectedType === cat ? 'active-filter' : ''}`}
                onClick={() => setSelectedType(selectedType === cat ? null : cat)}
              >
                <span>{cat}</span>
                <ChevronRight size={16} color="rgba(0,0,0,0.4)" />
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div className="filter-section">
            <div className="section-title-wrap">
              <h4>Price</h4>
              <ChevronDown size={16} />
            </div>
            <div className="price-slider-wrap">
              <input 
                type="range" 
                min="50" 
                max="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)} 
                className="slider"
              />
              <div className="price-labels">
                <span>$50</span>
                <span>${priceRange}</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="filter-section">
            <div className="section-title-wrap">
              <h4>Colors</h4>
              <ChevronDown size={16} />
            </div>
            <div className="colors-grid">
              {colors.map(color => (
                <div 
                  key={color} 
                  className={`color-dot ${selectedColor === color ? 'active' : ''}`} 
                  style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                  onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                >
                  {selectedColor === color && <Check size={14} color={color === '#FFFFFF' ? 'black' : 'white'} />}
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          <div className="filter-section">
            <div className="section-title-wrap">
              <h4>Size</h4>
              <ChevronDown size={16} />
            </div>
            <div className="sizes-grid">
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-tag ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="divider" />

          <div className="filter-section">
            <div className="section-title-wrap">
              <h4>Dress Style</h4>
              <ChevronDown size={16} />
            </div>
            {dressStyles.map(ds => (
              <Link key={ds} to={`/category/style/${ds.toLowerCase()}`} className="filter-item nav-link">
                <span>{ds}</span>
                <ChevronRight size={16} color="rgba(0,0,0,0.4)" />
              </Link>
            ))}
          </div>

          <button className="apply-filter-btn" onClick={fetchProducts}>Apply Filter</button>
        </aside>

        {/* Main Content */}
        <main className="category-products">
          <div className="products-header">
            <h2>{value ? value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ') : 'All Products'}</h2>
            <div className="header-controls">
              <p>Showing 1-{products.length} of {products.length} Products</p>
              <div className="sort-wrap">
                Sort by: <strong>Most Popular</strong> <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {Array.isArray(products) && products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.length === 0 && <p className="no-products">No products found in this category.</p>}
            </div>
          )}

          <hr className="divider" />

          {/* Pagination */}
          <div className="pagination">
            <button className="page-nav">← Previous</button>
            <div className="page-numbers">
              <span className="active">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>10</span>
            </div>
            <button className="page-nav">Next →</button>
          </div>
        </main>
      </div>

      <style>{`
        .category-page { padding-top: 24px; padding-bottom: 100px; }
        .breadcrumbs { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 24px; color: rgba(0,0,0,0.6); }
        .breadcrumbs a { text-decoration: none; color: inherit; }
        .breadcrumbs .current { color: black; font-weight: 500; }

        .category-layout { display: grid; grid-template-columns: 295px 1fr; gap: 20px; }
        
        .filters-sidebar { border: 1px solid rgba(0,0,0,0.1); border-radius: 20px; padding: 24px; height: fit-content; }
        .filter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .filter-header h3 { font-size: 20px; font-weight: 700; }
        
        .divider { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 24px 0; }
        
        .filter-section { display: flex; flex-direction: column; gap: 16px; }
        .filter-item { display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: rgba(0,0,0,0.6); font-size: 16px; text-decoration: none; transition: 0.2s; }
        .filter-item.active-filter { color: #000; font-weight: 700; }
        
        .section-title-wrap { display: flex; justify-content: space-between; align-items: center; }
        .section-title-wrap h4 { font-size: 20px; font-weight: 700; }
        
        .price-slider-wrap { margin-top: 8px; }
        .slider { width: 100%; height: 6px; background: #F0F0F0; border-radius: 5px; outline: none; -webkit-appearance: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #000; border-radius: 50%; cursor: pointer; }
        .price-labels { display: flex; justify-content: space-between; margin-top: 10px; font-weight: 500; }
        
        .colors-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .color-dot { width: 37px; height: 37px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .color-dot.active { box-shadow: 0 0 0 2px white, 0 0 0 4px #000; }
        
        .sizes-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .size-tag { border: none; background: #F0F0F0; padding: 10px 18px; border-radius: 62px; color: rgba(0,0,0,0.6); font-size: 14px; cursor: pointer; transition: 0.2s; }
        .size-tag.active { background: #000; color: #fff; }
        
        .apply-filter-btn { width: 100%; padding: 16px; background: #000; color: #fff; border: none; border-radius: 62px; margin-top: 24px; font-weight: 500; cursor: pointer; }
        
        .category-products { flex: 1; }
        .products-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
        .products-header h2 { font-size: 32px; font-weight: 700; }
        .header-controls { display: flex; align-items: center; gap: 20px; color: rgba(0,0,0,0.6); font-size: 16px; }
        .sort-wrap { cursor: pointer; }
        .sort-wrap strong { color: black; }
        
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        
        .pagination { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; }
        .page-nav { background: #fff; border: 1px solid rgba(0,0,0,0.1); padding: 8px 14px; border-radius: 8px; cursor: pointer; font-weight: 500; }
        .page-numbers { display: flex; gap: 12px; }
        .page-numbers span { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; color: rgba(0,0,0,0.6); }
        .page-numbers span.active { background: rgba(0,0,0,0.06); color: #000; }

        .loading, .no-products { text-align: center; padding: 100px 0; color: rgba(0,0,0,0.6); grid-column: 1 / -1; }

        @media (max-width: 992px) {
          .category-layout { grid-template-columns: 1fr; }
          .filters-sidebar { display: none; } /* In a real app we'd make this a drawer */
        }
      `}</style>
    </div>
  );
};

export default Category;
