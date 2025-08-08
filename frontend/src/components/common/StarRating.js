import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, maxRating = 5, size = '1rem', color = '#ffc107', onRatingChange }) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const filled = starValue <= rating;
    
    return (
      <FaStar
        key={index}
        style={{
          color: filled ? color : '#e4e5e9',
          fontSize: size,
          cursor: onRatingChange ? 'pointer' : 'default',
          marginRight: '2px'
        }}
        onClick={() => onRatingChange && onRatingChange(starValue)}
      />
    );
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {stars}
      {onRatingChange && (
        <span style={{ marginLeft: '8px', fontSize: '0.875rem', color: '#666' }}>
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating; 