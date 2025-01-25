'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import styles from './SliderTwo.module.css';

import { Pagination, Autoplay } from 'swiper/modules';
import Button from '../Button/Button';
import { Link } from 'react-alice-carousel';

export default function SliderTwo() {
	return (
		<Swiper
			modules={[Pagination, Autoplay]}
			className={styles['swiper-container']}
			spaceBetween={20}
			slidesPerView={1}
			pagination={{
				clickable: true
			}}
			autoplay={{ delay: 3000, disableOnInteraction: false }}
			loop
		>
			<SwiperSlide className={styles.slide}>
				<Image 
					src="/jpg/alfabia_bl_a_hrzntl_9a57.jpg"
					alt="Slide 1"
					width={1000}
					height={700}
					className={styles.icon}
				/>
                <div className={styles.text}>  
        <div className={styles.textBox}> 
          <div >Наборы постельного белья</div>
         
             
        </div>
        <Link href='catalog/nabor-postelnogo-belya'> 
        <Button>Смотреть</Button> 
        </Link>
        </div> 
			</SwiperSlide> 
			<SwiperSlide className={styles.slide}>
				<Image
					src="/jpg/3737faf1db1d2fedc0e9d2f0752b09f3.jpg"
					alt="Slide 2" 
					width={1000}
					height={500}
					className={styles.icon}
				/>
                       <div className={styles.text}>  
        <div className={styles.textBox}> 
        
          <div >Купить премиум пледы </div> 
         
              
        </div>
        <Link href='catalog/pledy'> 
        <Button>Смотреть</Button> 
        </Link>  
        </div>  
			</SwiperSlide>
		</Swiper>
	);
}
