import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductSection = ({ title, endpoint, showTitle = true }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/${endpoint}`);
        const data = Array.isArray(response.data) ? response.data : [];
        // If endpoint contains 'limit', we trust it. Otherwise show only 4.
        setProducts(endpoint.includes('limit') ? data : data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [endpoint]);

  return (
    <section className="py-5">
      <div className="container">
        {showTitle && <h2 className="text-center mb-5 fw-bolder" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Outfit, sans-serif' }}>{title}</h2>}
        {loading ? (
          <div className="text-center text-secondary py-5">Loading products...</div>
        ) : (
          <div className="row g-4 mb-5">
            {Array.isArray(products) && products.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link 
            to={`/category/category/${endpoint.replace('/', '')}`} 
            className="btn btn-outline-dark rounded-pill px-5 py-3 fw-medium" 
          >
            View All
          </Link>
        </div>
      </div>
      <style>{`
        .btn-outline-dark { border: 1px solid rgba(0,0,0,0.1); color: #000; }
        .btn-outline-dark:hover { background-color: #000; color: #fff; border-color: #000; }
      `}</style>
    </section>
  );
};

export default ProductSection;
