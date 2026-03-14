import React from 'react';
import { Star, Check } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah M.",
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      verified: true,
      rating: 5
    },
    {
      name: "Alex K.",
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      verified: true,
      rating: 5
    },
    {
      name: "James L.",
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true,
      rating: 5
    }
  ];

  return (
    <section className="py-5 overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bolder m-0" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Outfit, sans-serif' }}>OUR HAPPY CUSTOMERS</h2>
          <div className="d-flex gap-3 fs-4 pe-auto" style={{ cursor: 'pointer' }}>
            <span>←</span>
            <span>→</span>
          </div>
        </div>
        
        <div className="d-flex gap-4 overflow-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {reviews.map((review, index) => (
            <div key={index} className="border border-secondary border-opacity-25 rounded-4 p-4 flex-shrink-0" style={{ width: '400px', scrollSnapAlign: 'start', maxWidth: '85vw' }}>
              <div className="d-flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={22} fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <h3 className="fs-5 fw-bold m-0">{review.name}</h3>
                {review.verified && (
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ background: '#01D46A', width: '20px', height: '20px' }}>
                    <Check size={12} color="white" />
                  </div>
                )}
              </div>
              <p className="text-muted-custom mb-0" style={{ lineHeight: 1.6, fontSize: '15px' }}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
