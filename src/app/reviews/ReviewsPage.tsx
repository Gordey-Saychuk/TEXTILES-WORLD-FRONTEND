'use client';

import React, { useState, useEffect } from 'react';
import styles from './reviews.module.css';
import StarRating from '../../components/StarRating/StarRating';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Функция для загрузки отзывов
export async function fetchReviews() { 
	try {  
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews/`);
		if (!response.ok) {
			throw new Error(`Reviews not found: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}

// Основной компонент страницы отзывов
export default function ReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState({
		rating: 0,
		comment: '',
		name: '',
		photo: null
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false); // Состояние для показа формы
 
  const accessToken = useSelector((state) => state.auth.accessToken);

	useEffect(() => {
		async function loadReviews() {
			const reviewsData = await fetchReviews();
			// Сортируем отзывы по дате создания (новые первыми)
			const sortedReviews = reviewsData.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setReviews(sortedReviews);
		}

		loadReviews();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
	};

	const handleFileChange = (e) => {
		setNewReview((prevReview) => ({ ...prevReview, photo: e.target.files[0] }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Проверка обязательных полей
		if (
			newReview.rating === 0 ||
			newReview.comment.trim() === '' ||
			newReview.name.trim() === ''
		) {
			toast.error('Пожалуйста, заполните рейтинг, комментарий, имя!');
			return;
		}

		setIsSubmitting(true);

		const formData = new FormData();
		formData.append('rating', newReview.rating);
		formData.append('comment', newReview.comment);
		formData.append('name', newReview.name);
		if (newReview.photo) {
			formData.append('photo', newReview.photo);
		}
 
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}addreviews`, {
				method: 'POST',
				headers: {
          Authorization: `Bearer ${accessToken}`,
        },
         
				body: formData  
			});

			if (response.ok) {
				const result = await response.json();
				setReviews((prevReviews) => [result, ...prevReviews]); // Добавляем новый отзыв в начало списка
				setNewReview({ rating: 0, comment: '', name: '', photo: null });
				toast.success(
					'Отзыв успешно отправлен на модерацию и будет опубликован в течении 30 минут!'
				);
				setTimeout(() => {
					window.location.reload();
				}, 5000);
			} else {
				const errorText = await response.text();
				toast.error('Не удалось отправить отзыв. Попробуйте еще раз.');
				console.error('Failed to submit review:', errorText);
			}
		} catch (error) {
			toast.error('Произошла ошибка при отправке отзыва.');
			console.error('Error submitting review:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleShowForm = () => {
		setIsFormVisible((prevState) => !prevState);
	};

	const calculateAverageRating = () => {
		if (reviews.length === 0) return 0;
		const total = reviews.reduce((sum, review) => sum + review.rating, 0);
		return (total / reviews.length).toFixed(1);
	};

	const averageRating = calculateAverageRating();
	const reviewCount = reviews.length;

	const schemaMarkup = `
{
  "@context": "https://schema.org",
  "@type": "ReviewPage",
  "name": "Отзывы - Textiles World",
  "url": "https://textiles-world.ru/reviews",
  "description": "Отзывы о Textiles World. Более 100 отзывов и рейтинг 5 звезд.",
  "review": [
    ${reviews
			.map(
				(review) => `
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "${review.rating || '5'}",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "${review.reviewerName || 'Имя клиента'}"
      },
      "reviewBody": "${review.comment || 'Отзыв отсутствует.'}",
      "reviewAspect": "Overall"
    }
    `
			)
			.join(',')}
  ],
  "aggregateRating": { 
    "@type": "AggregateRating",
    "ratingValue": "${averageRating || '5'}", 
    "reviewCount": "${reviewCount || '100'}"
  }
}
`;

	return (
		<div className={styles.reviewsPage}>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: schemaMarkup }}
			/>
			<div className={styles.ratingSummary}>
				<h2>Общий рейтинг:</h2>
				<StarRating rating={averageRating} isInteractive={false} />
				<div className={styles.reviewCount}>
					{averageRating} ({reviewCount}{' '}
					{reviewCount === 1 ? 'отзыв' : 'отзыва'})
				</div>
			</div>

			<button className={styles.toggleButton} onClick={handleShowForm}>
				Оставить отзыв
			</button>

			{isFormVisible && (
				<div className={styles.reviewForm}>
					<h2>Оставить отзыв о сайте</h2>
					<form onSubmit={handleSubmit}>
						<label>
							Рейтинг:
							<StarRating
								rating={newReview.rating}
								onChange={(value) =>
									setNewReview((prevReview) => ({
										...prevReview,
										rating: value
									}))
								}
								isInteractive={true}
							/>
						</label>
						<label>
							Комментарий:
							<textarea
								name="comment"
								value={newReview.comment}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Ваше имя:
							<input
								type="text"
								name="name"
								value={newReview.name}
								onChange={handleInputChange}
							/>
						</label>
						<label className={styles.fileLabel}>
							Фото:
							<input
								type="file"
								name="photo"
								accept="image/*"
								onChange={handleFileChange}
								className={styles.fileInput}
							/>
							<span className={styles.customButton}>Выбрать файл</span>
						</label>
						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
						</button>
					</form>
				</div>
			)}

			<h1>Отзывы</h1>
			<ul className={styles.reviewList}>
				{reviews.map((review) => (
					<li key={review.reviewId}>
						{review.productName && (
							<p>
								<strong>Наименование товара:</strong> {review.productName}
							</p>
						)}
						<p>
							<strong>Рейтинг:</strong>
							<StarRating rating={review.rating} isInteractive={false} />
						</p>
						<p>
							<strong>Имя:</strong> {review.reviewerName}
						</p>
						<p>
							<strong>Комментарий:</strong> {review.comment}
						</p>

						{review.photo && (
							<img className={styles.photo} src={review.photo} alt="Review" />
						)}
					</li>
				))}
			</ul>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
}
