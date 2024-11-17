'use client';

import styles from "./SliderCatalog.module.css";
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import 'swiper/css/navigation';  
import 'swiper/css/pagination';
import Image from 'next/image'; 

import { Autoplay } from 'swiper/modules';

export default function SliderCatalog() {   
  return (
    <Swiper
      modules={[Autoplay]}
      className={styles['swiper-container']}
      spaceBetween={20}  
      slidesPerView={1}   
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
    >  
      <SwiperSlide className={styles.slide}>
        <div className={styles.overlay}>
          <Image src="/images/FukuMiAyiR2RezCsxHRT.jpg" alt="Slide 1" width={1000} height={700} className={styles.icon} />
          <div className={styles.textOverlay}>
            <h2>Каталог постельного белья</h2> 
            <p>Каталог постельного белья и текстиля для дома</p> 
          </div>
        </div> 
      </SwiperSlide>
    </Swiper>
  );
}
   