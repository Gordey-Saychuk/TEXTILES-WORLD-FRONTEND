'use client';

import React, { useState, useEffect } from 'react';
import styles from './reviews.module.css';
 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

async function getReviews() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews/`
		);
		console.log(response.data); // Лог результата
		return response.data;
	} catch (e) {
		console.error('Ошибка при загрузке отзывов:', e);
		toast.error('Ошибка при загрузке отзывов');
		return [];
	}
}

// Основной компонент страницы отзывов
export default function ReviewsPage() {
	const [rew, serRew] = useState([]);

	useEffect(() => {
		async function fetchReviews() {
			const r = await getReviews();

			serRew(r);
		}
		fetchReviews();
	}, []);

	return (
		<div className={styles.reviewsPage}>
			<div className={styles.ratingSummary}>
				<h2>Общий рейтинг:</h2>

				<div className={styles.reviewCount}></div>
			</div>

			<button className={styles.toggleButton}>Оставить отзыв</button>

			{true && (
				<div className={styles.reviewForm}>
					<h2>Оставить отзыв о сайте</h2>
					<form>
						<label>Рейтинг:</label>
						<label>
							Комментарий:
							<textarea name="comment" />
						</label>
						<label>
							Ваше имя:
							<input type="text" name="name" />
						</label>
						<label className={styles.fileLabel}>
							Фото:
							<input
								type="file"
								name="photo"
								accept="image/*"
								className={styles.fileInput}
							/>
							<span className={styles.customButton}>Выбрать файл</span>
						</label>
						<button type="submit">
							{true ? 'Отправка...' : 'Отправить отзыв'}
						</button>
					</form>
				</div>
			)}

			<h1>Отзывы</h1>
			<ul className={styles.reviewList}>
				<ul> 
					{rew.map((e) => (
						<li key={e.id}>{e.comment}</li>
					))} 
				</ul>
				{/* отзфыв  */}
			</ul>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
}
