import styles from './Input.module.css';
import { InputProps } from './InputProps';
import Image from 'next/image';

export default function Input({
	placeholder,
	search,
	type,
	onChange,
	value,
	required,
	...props
}: InputProps) {
	return (
		<div className={styles.inputContainer}>
			<input
				type={type}
				className={styles.input}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				required={required}
				{...props}
			/>
			{search ? (
				<Image
					src="/svg/TopHeader/search.svg"
					alt="Поиск"
					width={20}
					height={20}
					className={styles.icon}
				/>
			) : null}
		</div>
	);
}
