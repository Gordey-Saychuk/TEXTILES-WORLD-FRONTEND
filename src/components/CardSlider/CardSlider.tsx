'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Card from '../Card/Card';
import styles from './CardSlider.module.css';
import { Product } from '@/types/index';

interface CardSliderProps {
	data: Product[];
}

export default function CardSlider({ data }: CardSliderProps) {
	return (
		<Swiper
			className={styles['swiper-container']}
			spaceBetween={15} // Расстояние между карточками
			slidesPerView="auto" // Все слайды отображаются по ширине контента
			freeMode={true} // Свободная прокрутка
			loop={true}
			modules={[FreeMode]}
			watchOverflow={true} // Для учета переполнения
			centeredSlides={false} // Отключить центрирование слайдов
		>
			{data.map((item) => (
				<SwiperSlide key={item.id} className={styles['swiper-slide']}>
					<Card product={item} />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
