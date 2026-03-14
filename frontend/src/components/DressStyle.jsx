import React from 'react';
import { Link } from 'react-router-dom';

const DressStyle = () => {
  const styles = [
    { name: 'Casual', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=500&auto=format&fit=crop', large: false },
    { name: 'Formal', image: 'https://jadeblue.com/cdn/shop/files/Formals_MOBILE_900x478_px_jpg.jpg?v=1771482519', large: true },
    { name: 'Party', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop', large: true },
    { name: 'Gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop', large: false },
  ];

  return (
    <section className="py-5">
      <div className="container bg-secondary-custom rounded-5 p-4 p-md-5">
        <h2 className="text-center mb-4 pb-2 fw-bolder" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'Outfit, sans-serif' }}>BROWSE BY DRESS STYLE</h2>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <Link 
              to={`/category/style/${styles[0].name.toLowerCase()}`}
              className="d-block rounded-4 overflow-hidden position-relative text-decoration-none style-card"
              style={{ backgroundImage: `url(${styles[0].image})`, height: '289px' }}
            >
              <h3 className="position-absolute top-0 start-0 m-4 text-black fw-bold" style={{ fontSize: '36px', zIndex: 2 }}>{styles[0].name}</h3>
              <div className="position-absolute w-100 h-100 top-0 start-0 overlay"></div>
            </Link>
          </div>
          <div className="col-12 col-md-8">
            <Link 
              to={`/category/style/${styles[1].name.toLowerCase()}`}
              className="d-block rounded-4 overflow-hidden position-relative text-decoration-none style-card"
              style={{ backgroundImage: `url(${styles[1].image})`, height: '289px' }}
            >
              <h3 className="position-absolute top-0 start-0 m-4 text-black fw-bold" style={{ fontSize: '36px', zIndex: 2 }}>{styles[1].name}</h3>
              <div className="position-absolute w-100 h-100 top-0 start-0 overlay"></div>
            </Link>
          </div>
          <div className="col-12 col-md-8">
            <Link 
              to={`/category/style/${styles[2].name.toLowerCase()}`}
              className="d-block rounded-4 overflow-hidden position-relative text-decoration-none style-card"
              style={{ backgroundImage: `url(${styles[2].image})`, height: '289px' }}
            >
              <h3 className="position-absolute top-0 start-0 m-4 text-black fw-bold" style={{ fontSize: '36px', zIndex: 2 }}>{styles[2].name}</h3>
              <div className="position-absolute w-100 h-100 top-0 start-0 overlay"></div>
            </Link>
          </div>
          <div className="col-12 col-md-4">
            <Link 
              to={`/category/style/${styles[3].name.toLowerCase()}`}
              className="d-block rounded-4 overflow-hidden position-relative text-decoration-none style-card"
              style={{ backgroundImage: `url(${styles[3].image})`, height: '289px' }}
            >
              <h3 className="position-absolute top-0 start-0 m-4 text-black fw-bold" style={{ fontSize: '36px', zIndex: 2 }}>{styles[3].name}</h3>
              <div className="position-absolute w-100 h-100 top-0 start-0 overlay"></div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .style-card {
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
        }
        .style-card:hover {
          transform: scale(0.98);
        }
        .overlay {
          background: rgba(0,0,0,0.05);
          transition: background 0.3s ease;
        }
        .style-card:hover .overlay {
          background: rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
};

export default DressStyle;
