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
    <section className="reviews section-padding">
      <div className="container">
        <div className="reviews-header">
          <h2 className="heading-md">OUR HAPPY CUSTOMERS</h2>
          <div className="review-arrows">
            <span>←</span>
            <span>→</span>
          </div>
        </div>
        
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <div className="review-user">
                <h3>{review.name}</h3>
                {review.verified && <div className="verified"><Check size={12} color="white" /></div>}
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .review-arrows {
          display: flex;
          gap: 16px;
          font-size: 24px;
        }
        .review-arrows span {
          cursor: pointer;
        }
        .reviews-grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 20px;
        }
        .review-card {
          flex: 0 0 400px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 20px;
          padding: 28px;
          scroll-snap-align: start;
        }
        .review-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 15px;
        }
        .review-user {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .review-user h3 {
          font-size: 20px;
          text-transform: none;
        }
        .verified {
          background: #01AB31;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .review-text {
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .review-card {
            flex: 0 0 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
