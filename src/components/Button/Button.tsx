import styles from './Button.module.css';

interface ButtonProps {
	children: React.ReactNode;
	submit?: boolean;
	onClick?: () => void; // Add the onClick prop here
}

export default function Button({ children, submit, onClick }: ButtonProps) {
	return (
		<button
			className={styles.button}
			type={submit ? 'submit' : 'button'}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
