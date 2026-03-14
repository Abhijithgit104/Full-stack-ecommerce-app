import React from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import DressStyle from '../components/DressStyle';
import Reviews from '../components/Reviews';

const Home = () => {
  return (
    <>
      <Hero />
      <div id="new-arrivals">
        <ProductSection title="NEW ARRIVALS" endpoint="new-arrivals/" />
      </div>
      <div className="container divider"></div>
      <ProductSection title="TOP SELLING" endpoint="top-selling/" />
      <DressStyle />
      <Reviews />
      <style>{`
        .divider {
          height: 1px;
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
};

export default Home;
