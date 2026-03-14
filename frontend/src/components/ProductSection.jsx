import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useServer } from '../context/ServerContext';

const ProductSection = ({ title, endpoint, showTitle = true }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { serverReady } = useServer();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!serverReady) return;
      
      try {
        setError(null);
        const response = await api.get(`/products/${endpoint}`);
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(endpoint.includes('limit') ? data : data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.detail || err.message || "Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [endpoint, serverReady]);

  return (
    <section className="py-5">
      <div className="container">
        {showTitle && <h2 className="text-center mb-5 fw-bolder" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Outfit, sans-serif' }}>{title}</h2>}
        {loading ? (
          <div className="text-center text-secondary py-5">
            <div className="spinner-border spinner-border-sm me-2"></div>
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center text-danger py-5">
            <p>⚠️ {error}</p>
            <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => window.location.reload()}>Retry</button>
          </div>
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
