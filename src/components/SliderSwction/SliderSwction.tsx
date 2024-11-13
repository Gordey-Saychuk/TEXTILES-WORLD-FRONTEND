'use client'

import styles from "./SliderSwction.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import Image from 'next/image';

export default function SliderSwction() { 
  return (
    <Swiper
      className={styles['swiper-container']}
      spaceBetween={20}
      slidesPerView={1} 
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      modules={[Navigation]}  // Подключаем модуль Navigation
    >
      <SwiperSlide className={styles.slide}>
        <Image src="/images/AXlHyXuW8ZoFSnue-VoNa9B6Xh2fmMjk76uMy7smdYE=.jfif" alt="Slide 1" width={1000} height={700} className={styles.icon} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <Image src="/images/AXlHyXuW8ZoFSnue-VoNa9B6Xh2fmMjk76uMy7smdYE=.jfif" alt="Slide 2" width={1000} height={500} className={styles.icon} />
      </SwiperSlide>
    </Swiper>
  );
}
 