"use client";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

export default function StarRating({ rating }) {
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-premium-gold" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-premium-gold" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-premium-gold" />);
    }
  }

  return <div className="flex">{stars}</div>;
}