import styles from './Title.module.css'
import { TitleProps } from './TitleProps'

export default function Title({ children, link }: TitleProps) {
	return (
		<>
			{link ? (
				<h4 className={styles.title}>{children}</h4>
			) : (
				<h4 className={styles.titles}>{children}</h4>
			)}
		</>
	)
}
