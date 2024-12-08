import styles from './Section.module.css';
import SectionClient from './SectionClient';
import { SectionProps } from './SectionProps';

export default function Section({ children, sliderComponent }: SectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.title}>{children}</div>
			<SectionClient sliderComponent={sliderComponent} />
		</section>
	);
}
