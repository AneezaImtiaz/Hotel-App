import React from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number; // Expected rating value between 0 and 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'star filled' : 'star'}>
        {i <= rating ? '★' : '☆'}
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;