// components/StarRating/StarRating.js
import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ rating, onChange, isInteractive = false }) => {
	const handleClick = (value) => {
		if (isInteractive && onChange) onChange(value);
	};

	return (
		<div className={styles.ratingStars}>
			{[1, 2, 3, 4, 5].map((star) => (
				<svg
					key={star}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill={star <= rating ? '#ffc107' : '#e0e0e0'}
					onClick={() => handleClick(star)}
					className={styles.star}
				>
					<path d="M12 2l2.35 4.75L20 8l-3.5 3.5 1 5.9-5.4-2.85-5.4 2.85 1-5.9L4 8l5.65-.25L12 2z" />
				</svg>
			))}
		</div>
	);
};

export default StarRating;
