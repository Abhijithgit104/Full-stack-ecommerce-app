import React from 'react';

const Hero = () => {
  return (
    <section className="bg-secondary-custom position-relative overflow-hidden">
      <div className="container d-flex flex-column flex-lg-row align-items-center" style={{ minHeight: '663px', paddingTop: '40px' }}>
        <div className="flex-grow-1 z-2 pb-5 text-center text-lg-start animate-fade-in" style={{ flexBasis: '50%' }}>
          <h1 className="fw-bolder mb-3" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-muted-custom fs-6 mb-4 mx-auto mx-lg-0" style={{ maxWidth: '545px' }}>
            Browse through our diverse range of meticulously crafted garments, designed 
            to bring out your individuality and cater to your sense of style.
          </p>
          <button className="btn btn-black rounded-pill px-5 py-3 fw-medium" onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </button>
          
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 gap-lg-5 mt-5">
            <div className="text-center text-lg-start">
              <h3 className="fs-1 fw-bold mb-1">200+</h3>
              <p className="text-muted-custom mb-0">International Brands</p>
            </div>
            <div className="d-none d-lg-block border-end border-secondary border-opacity-25" style={{ height: '74px' }}></div>
            <div className="text-center text-lg-start">
              <h3 className="fs-1 fw-bold mb-1">2,000+</h3>
              <p className="text-muted-custom mb-0">High-Quality Products</p>
            </div>
            <div className="d-none d-lg-block border-end border-secondary border-opacity-25" style={{ height: '74px' }}></div>
            <div className="text-center text-lg-start mt-3 mt-lg-0 w-100 w-lg-auto">
              <h3 className="fs-1 fw-bold mb-1">30,000+</h3>
              <p className="text-muted-custom mb-0">Happy Customers</p>
            </div>
          </div>
        </div>
        
        <div className="flex-grow-1 position-relative w-100" style={{ flexBasis: '50%', height: '663px', backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
          <div className="position-absolute text-black" style={{ top: '300px', left: '50px', fontSize: '44px' }}>✦</div>
          <div className="position-absolute text-black" style={{ top: '100px', right: '50px', fontSize: '80px' }}>✦</div>
        </div>
      </div>

      <div className="bg-black py-4">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <span className="text-white fs-3 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>VERSACE</span>
          <span className="text-white fs-3 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>ZARA</span>
          <span className="text-white fs-3 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>GUCCI</span>
          <span className="text-white fs-3 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>PRADA</span>
          <span className="text-white fs-3 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Calvin Klein</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-image { height: 400px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
