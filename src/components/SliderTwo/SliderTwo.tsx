'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import styles from './SliderTwo.module.css';

import { Pagination, Autoplay } from 'swiper/modules';

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
					src="/images/9.webp"
					alt="Slide 1"
					width={1000}
					height={700}
					className={styles.icon}
				/>
			</SwiperSlide>
			<SwiperSlide className={styles.slide}>
				<Image
					src="/images/9.webp"
					alt="Slide 2"
					width={1000}
					height={500}
					className={styles.icon}
				/>
			</SwiperSlide>
		</Swiper>
	);
}
