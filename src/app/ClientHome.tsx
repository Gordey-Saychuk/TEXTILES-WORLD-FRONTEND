'use client';

import { useState } from 'react';
import styles from './page.module.css';
import SliderSwction from '../components/SliderSwction/SliderSwction';
import SliderTwo from '../components/SliderTwo/SliderTwo';
import Section from '@/components/Section/Section';
import Title from '@/components/Title/Title';
import CardSlider from '@/components/CardSlider/CardSlider';
import Modal from '@/components/Modal/Modal';
import Modals from '@/components/Modals/Modals'; 

import { ClientHomeProps } from '../components/Section/SectionProps';
import Blocks from '@/components/Blocks/Blocks';
import CallBackForm from '@/components/CallBackForm/CallBackForm';
import SEOBlock from '@/components/SEOBlock/SEOBlock';

export default function ClientHome({ data, hits, pleds }: ClientHomeProps) {
  
 
	return (
		<div className={styles.page}>
			<div className={styles.slider}>
				<SliderSwction />
				<SliderTwo />
			</div>
			<Section sliderComponent={<CardSlider data={data} />}>
				<Title link={true}>Хиты продаж</Title>
			</Section>
			<Section sliderComponent={<CardSlider data={hits} />}>
				<Title link={true}>Комплекты постельного</Title>
			</Section>
			<Section sliderComponent={<CardSlider data={pleds} />}>
				<Title link={true}>Пледы</Title>
			</Section>
			<Blocks />
			<CallBackForm />
			<SEOBlock />

			{/* Модальное окно */}
 
    
		</div>
	); 
}
