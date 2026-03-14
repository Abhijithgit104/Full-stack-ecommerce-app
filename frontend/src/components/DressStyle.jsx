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
    <section className="dress-style section-padding">
      <div className="container style-container">
        <h2 className="heading-md text-center">BROWSE BY DRESS STYLE</h2>
        <div className="style-grid">
          {styles.map((style, index) => (
            <Link 
              key={index} 
              to={`/category/style/${style.name.toLowerCase()}`}
              className={`style-card ${style.large ? 'large' : ''}`}
              style={{ backgroundImage: `url(${style.image})`, textDecoration: 'none' }}
            >
              <h3>{style.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .style-container {
          background: #F0F0F0;
          border-radius: 40px;
          padding: 70px 64px;
        }
        .style-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .style-card {
          height: 289px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
          padding: 25px 36px;
          position: relative;
          cursor: pointer;
          transition: var(--transition);
        }
        .style-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.1);
          border-radius: 20px;
          transition: var(--transition);
        }
        .style-card:hover::before {
          background: rgba(0,0,0,0.2);
        }
        .style-card h3 {
          position: relative;
          z-index: 1;
          color: black;
          font-size: 36px;
          text-transform: capitalize;
        }
        .style-card.large {
          grid-column: span 2;
        }

        @media (max-width: 992px) {
          .style-grid {
            grid-template-columns: 1fr;
          }
          .style-card.large {
            grid-column: span 1;
          }
          .style-container {
            padding: 40px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default DressStyle;
