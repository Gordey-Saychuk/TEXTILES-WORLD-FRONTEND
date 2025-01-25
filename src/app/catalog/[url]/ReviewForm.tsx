'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './ReviewForm.module.css'; 
import StarRating from '@/components/StarRating/StarRating'; 
import ReviewSlider from '../../../components/ReviewSlider/ReviewSlider'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';


interface Review {
  id: number;
  rating: number;
  comment: string;
  name: string;
  photo?: string;
  createdAt: string;
}

// Тип для нового отзыва
interface NewReview {
  rating: number;
  comment: string;
  name: string;
  photo: File | null;
}

// Функция для загрузки отзывов
async function fetchReviews(productId: number): Promise<Review[]> {     
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

export default function ReviewForm({ productId }: { productId: number }) {
  const [newReview, setNewReview] = useState<NewReview>({ rating: 0, comment: '', name: '', photo: null });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {user} = useSelector(	(state: RootState) => state.auth); 
     
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);


  useEffect(() => {
    async function loadReviews() {
      const reviewsData = await fetchReviews(productId);
      const sortedReviews = reviewsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReviews(sortedReviews); 
    }
    console.log('asdasd', user?.name);    
    loadReviews();
  }, [productId, user?.name]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files; // Сохраняем в переменную для ясности
    if (files && files.length > 0) {
      setNewReview((prevReview) => ({ ...prevReview, photo: files[0] }));
    }
  };
   

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Проверка обязательных полей 
    if (newReview.rating === 0 || newReview.comment.trim() === '' ) {
      toast.error('Пожалуйста, заполните рейтинг, комментарий, имя!');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('rating', newReview.rating.toString());
    formData.append('comment', newReview.comment);
    formData.append('product', productId.toString());
    if (newReview.photo) {  
      formData.append('image_url', newReview.photo);
    } 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}addreviews`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }); 
console.log("asdas", accessToken); 
      if (response.ok) {
        toast.success('Отзыв успешно отправлен на модерацию и будет опубликован в течение 30 минут!');
        setNewReview({ rating: 0, comment: '', name: '', photo: null });
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
    <div className={styles.reviewForme}> 
    <div >
      {reviews.length > 0 && (  
        <div className={styles.ratingSummary}> 
          <p className={styles.ratingProd}> Рейтинг товара:</p>
          <StarRating
  rating={calculateAverageRating(reviews)}
  isInteractive={false}
  onChange={() => {}}
/> 

          <div className={styles.reviewCount}>
            {calculateAverageRating(reviews)} ({reviews.length} отзывов)
          </div>
        </div>
      )} 
      
  
      <p className={styles.reviewTitle}>Отзывы</p>
      <ul className={styles.reviewList}>
        <div> 
          {reviews.length > 0 ? (
            <ReviewSlider reviews={reviews} /> 
          ) : (
            <p className={styles.reviewEmpty}>Пока нет отзывов для этого товара.</p>
          )}
        </div> 
      </ul>
            
      </div> 
      </div> 
      
      <div className={styles.reviewForm}>
        <h2>Оставить отзыв</h2> 
        <form onSubmit={handleSubmit}> 
          <p className={styles.reviewReit}>
             Рейтинг:
            </p>
            <StarRating
              rating={newReview.rating}
              onChange={(value: number) => setNewReview((prevReview) => ({ ...prevReview, rating: value }))}
              isInteractive={true}
            />
          
          <p className={styles.reviewReit}>  
            Комментарий:
            </p> 
            <textarea
            className={styles.textarea} 
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
            />
         
         <p className={styles.reviewReit}> 
  Фото:
</p>
<label htmlFor="photoInput" className={styles.customFileButton}>
  Выберите файл
</label>
<input
  id="photoInput"
  type="file"
  name="photo"
  accept="image/*"
  onChange={handleFileChange}
  className={styles.fileInput}
/>
 
          
    
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
          </button>
        </form>
       
      </div> 



    
      <ToastContainer />  
    </div>
    
  );
}

// Вспомогательная функция для расчета среднего рейтинга
function calculateAverageRating(reviews: Review[]): string {
  if (reviews.length === 0) return '0';
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
} 