import React from 'react';

import s from './Rating.module.scss';
import { starIcon } from '@/components/modules/icons';

export const StarRating = ({ rating }: { rating: number }) => {
  rating = rating < 0 ? 0 : rating > 5 ? 5 : rating;

  return (
    <div className={s.ratingContainer}>
      {new Array(5).fill(0).map((_, i) => (i + 1 <= rating ? starIcon(true) : starIcon(false)))}
    </div>
  );
};

// const StarFilled = () => {
//     return (<span className={s.starColor}>&#9733;</span>);
// };
//
// const StarOutlined = () => {
//     return (<span className={s.starColor}>&#9734;</span>);
// };
