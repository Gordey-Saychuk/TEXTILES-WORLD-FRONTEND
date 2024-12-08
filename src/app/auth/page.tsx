'use client';

import { useState, SyntheticEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Импорт для редиректа
import styles from './auth.module.css';
import Title from '@/components/Title/Title';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

export default function Auth() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			router.push('/profile'); // Перенаправление, если пользователь уже авторизован
		}
	}, [router]);

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}register`,
				{
					name,
					email,
					password
				},
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			console.log('Ответ сервера:', response.data);

			router.push('/login');
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
		}
	};

	return (
		<div className={styles.body}>
			<div className={styles.bodyForm}>
				<Title> Авторизоваться</Title>
				<form className={styles.form} onSubmit={submit}>
					<Input
						value={name}
						required
						onChange={(e) => setName(e.target.value)}
						type="name"
						placeholder="Имя"
					></Input>

					<Input
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					></Input>

					<Input
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Пароль"
					></Input>
					<Button submit={true}>ОТПРАВИТЬ</Button>
				</form>
			</div>
			<div className={styles.bodyForm}>
				<Title> Завести аккаунт</Title>
				<p className={styles.infoTexts}>
					Создайте учетную запись Textiles World, используя свой адрес
					электронной почты.
				</p>
				<div className={styles.infoContainer}>
					<p className={styles.infoText}>
						Зарегистрируйтесь в Textiles World и воспользуйтесь преимуществами
						открытия счета:
					</p>
					<ul className={styles.infoList}>
						<li className={styles.infoItem}>
							Новости и эксклюзивные предложения
						</li>
						<li className={styles.infoItem}>
							История заказов и адресная книга
						</li>
						<li className={styles.infoItem}>
							Сохраняйте товары в список желаний
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
