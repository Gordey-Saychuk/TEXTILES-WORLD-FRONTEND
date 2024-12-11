import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import styles from './ReviewSlider.module.css'; 
import StarRating from '../StarRating/StarRating';
import { Autoplay } from 'swiper/modules'; 

const ReviewSlider = ({ reviews }) => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper 
        spaceBetween={20} // Расстояние между слайдами
        slidesPerView={1} // Количество видимых слайдов 
        pagination={{ clickable: true }} // Пагинация
        navigation={false} // Отключить кнопки навигации
        loop={true} // Циклический слайдер
        freeMode={true} // Включить режим свободного перемещения слайдов 
        direction="horizontal" // Убедитесь, что направление горизонтальное
        breakpoints={{
          // Параметры брекпоинтов для различных размеров экрана
          520: {
            slidesPerView: 2, 
            spaceBetween: 10, 
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          

        }}
        
        autoplay={{   // Настройки автопрокрутки
          delay: 2000, // Задержка между прокрутками (в миллисекундах)
          disableOnInteraction: false, // Автопрокрутка не останавливается при взаимодействии
        }}  
        modules={[Autoplay]} 
      > 
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className={styles.reviewSlide}>
            <div className={styles.reviewContent}>
              <StarRating rating={review.rating} isInteractive={false} />
              <p className={styles.nameText}><strong>Имя:</strong> {review.name}</p> 
              <p className={styles.commentText}><strong>Комментарий:</strong> {review.comment}</p>
       
              {review.photo && (
                <div
                  className={styles.reviewPhoto} 
                  style={{ backgroundImage: `url(${review.photo})` }} 
                />
              )}
            </div>
          </SwiperSlide> 
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
