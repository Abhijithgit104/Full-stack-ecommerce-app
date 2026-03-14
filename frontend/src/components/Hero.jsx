import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <h1 className="heading-lg">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p className="hero-desc">
            Browse through our diverse range of meticulously crafted garments, designed 
            to bring out your individuality and cater to your sense of style.
          </p>
          <button className="btn btn-primary" onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </button>
          
          <div className="hero-stats">
            <div className="stat">
              <h3>200+</h3>
              <p>International Brands</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>2,000+</h3>
              <p>High-Quality Products</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>30,000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          {/* We'll use a wrapper and a star icon overlay similar to the design */}
          <div className="star-icon star-small">✦</div>
          <div className="star-icon star-large">✦</div>
        </div>
      </div>

      <div className="brands-bar">
        <div className="container brands-inner">
          <span className="brand">VERSACE</span>
          <span className="brand">ZARA</span>
          <span className="brand">GUCCI</span>
          <span className="brand">PRADA</span>
          <span className="brand">Calvin Klein</span>
        </div>
      </div>

      <style>{`
        .hero {
          background-color: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          display: flex;
          align-items: center;
          min-height: 663px;
          padding-top: 40px;
          padding-bottom: 0;
        }
        .hero-text {
          flex: 1;
          z-index: 2;
          padding-bottom: 40px;
        }
        .hero-desc {
          color: var(--text-muted);
          font-size: 16px;
          margin-bottom: 32px;
          max-width: 545px;
        }
        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        .stat h3 {
          font-size: 40px;
          margin-bottom: 4px;
        }
        .stat p {
          color: var(--text-muted);
          font-size: 16px;
        }
        .stat-divider {
          width: 1px;
          height: 74px;
          background: rgba(0,0,0,0.1);
        }
        .hero-image {
          flex: 1;
          height: 663px;
          background-image: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center bottom;
          position: relative;
        }
        .star-icon {
          position: absolute;
          color: black;
          font-size: 40px;
        }
        .star-small {
          top: 300px;
          left: 50px;
          font-size: 44px;
        }
        .star-large {
          top: 100px;
          right: 50px;
          font-size: 80px;
        }
        .brands-bar {
          background: var(--primary);
          padding: 40px 0;
        }
        .brands-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .brand {
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 700;
        }

        @media (max-width: 992px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
          }
          .hero-desc {
            margin: 0 auto 32px;
          }
          .hero-stats {
            justify-content: center;
          }
          .stat-divider { display: none; }
          .hero-image {
            width: 100%;
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
