'use client';

import React, { useState, useEffect } from 'react';
import styles from './ReviewForm.module.css'; 
import StarRating from '../../../components/StarRating/StarRating';
import ReviewSlider from '../../../components/ReviewSlider/ReviewSlider'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Функция для загрузки отзывов
async function fetchReviews(productId) {    
  try { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews/products/${productId}`);
    if (!response.ok) {
      throw new Error(`Reviews not found: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function ReviewForm({ productId }) {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', name: '', photo: null });
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      const reviewsData = await fetchReviews(productId);
      const sortedReviews = reviewsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews);
    }

    loadReviews();
  }, [productId]);

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
    if (newReview.rating === 0 || newReview.comment.trim() === '' || newReview.name.trim() === '') {
      toast.error('Пожалуйста, заполните рейтинг, комментарий, имя!');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('rating', newReview.rating);
    formData.append('comment', newReview.comment);
    formData.append('name', newReview.name);
    formData.append('product_id', productId);
    if (newReview.photo) {
      formData.append('photo', newReview.photo);
    } 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/products${productId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Отзыв успешно отправлен на модерацию и будет опубликован в течение 30 минут!');
        setNewReview({ rating: 0, comment: '', name: '', photo: null });
        // Перезагрузка страницы

        setTimeout(() => {
          window.location.reload(); 
        }, 5000);
     
      } else {
        const errorData = await response.text();
        toast.error('Не удалось отправить отзыв. Попробуйте еще раз.');
        console.error('Failed to submit review:', errorData);
      }
    } catch (error) {
      toast.error('Произошла ошибка при отправке отзыва.');
      console.error('Error submitting review', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewFormContainer}>
      {reviews.length > 0 && ( 
        <div className={styles.ratingSummary}> 
          <p>Рейтинг товара:</p>
          <StarRating rating={calculateAverageRating(reviews)} isInteractive={false} />
          <div className={styles.reviewCount}>
            {calculateAverageRating(reviews)} ({reviews.length} отзывов)
          </div>
        </div>
      )} 
      <div className={styles.reviewForm}>
        <h2>Оставить отзыв</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Рейтинг:
            <StarRating
              rating={newReview.rating}
              onChange={(value) => setNewReview((prevReview) => ({ ...prevReview, rating: value }))}
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
 
      <p>Отзывы</p>
      <ul className={styles.reviewList}>
        <div>
          {reviews.length > 0 ? (
            <ReviewSlider reviews={reviews} />
          ) : (
            <p>Нет отзывов для этого товара.</p>
          )}
        </div> 
      </ul>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

// Вспомогательная функция для расчета среднего рейтинга
function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
}
 