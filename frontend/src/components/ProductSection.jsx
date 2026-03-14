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
        const data = response.data;
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
    <section className="product-section section-padding">
      <div className="container">
        {showTitle && <h2 className="heading-md text-center">{title}</h2>}
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="view-all-wrap">
          <Link 
            to={`/category/category/${endpoint.replace('/', '')}`} 
            className="btn-outline" 
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            View All
          </Link>
        </div>
      </div>

      <style>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }
        .view-all-wrap {
          text-align: center;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 16px 54px;
          border-radius: 62px;
          font-weight: 500;
          font-size: 16px;
          transition: var(--transition);
        }
        .btn-outline:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .loading {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};

export default ProductSection;
