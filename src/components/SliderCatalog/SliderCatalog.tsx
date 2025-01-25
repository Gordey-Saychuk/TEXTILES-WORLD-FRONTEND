'use client';

import styles from './SliderCatalog.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

import { Autoplay } from 'swiper/modules';

interface SliderCatalogProps {
  img: string,
  title: string,
  p: string
}

export default function SliderCatalog({img, title, p}: SliderCatalogProps) { 
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
					<Image 
						src={img}
						alt="Slide 1"
						width={1000}
						height={700}
						className={styles.icon}
					/>
					<div className={styles.textOverlay}> 
						<h2>{title}</h2>
						<p>{p}</p>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	);
}
