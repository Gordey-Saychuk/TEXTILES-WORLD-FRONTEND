import { Product } from '@/types/index';
import { ReactNode } from 'react';

export interface ClientHomeProps {
	NaboryPostelnogo: Product[];
	hits: Product[];
	pleds: Product[];
}

export interface SectionClientProps {
	sliderComponent: ReactNode;
}

export interface SectionProps {
	children: React.ReactNode;
	sliderComponent: React.ReactNode;
}
