import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import styles from './ReviewSlider.module.css'; 
import StarRating from '../StarRating/StarRating';
import { Autoplay } from 'swiper/modules'; 

const ReviewSlider = ({ reviews }) => {
  return (
    <ul className={styles.reviewList}>
    {reviews.map((review) => (
      <li key={review.reviewId}>
        {review.productName && (
          <p>
            <strong>Наименование товара:</strong> {review.productName}
          </p> 
        )}  
        <div className={styles.reviewReitBox}>  
          <p className={styles.reviewReit}>Рейтинг:</p>
          <StarRating rating={review.rating} isInteractive={false} />
        </div>  
        <p>    
          <span className={styles.reviewName}>Имя:</span> <span className={styles.reviewNamse}>{review.name} </span>
        </p> 
        <p className={styles.reviewComm}>    
          <span className={styles.reviewName}>Комментарий:</span>  <span className={styles.reviewNamse}>{review.comment} </span>
        </p> 
 
        {review.image_url && (   
        <img 
        className={styles.photo}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${review.image_url}`}  // Формируем полный URL
        alt="Review"
      /> 
        )}
      </li>
    ))}
  </ul> 
  );
};

export default ReviewSlider;
