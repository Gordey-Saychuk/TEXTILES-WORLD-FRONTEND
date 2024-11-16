"use client"; 
import React, { useEffect, useState } from 'react';
import styles from "./Card.module.css"; 
import { Product } from '../Section/SectionProps';
import Image from 'next/image';  
import { getReviewsByProductId } from "../../app/lib/api/getReviewsByProductId";

interface Review {
  id: number; 
  rating: number;
  comment: string;
  name: string;  // Имя автора отзыва
  is_verified: boolean;  // Проверен ли отзыв
  created_at: string;  // Дата создания отзыва
  image_url: string | null;  // URL изображения отзыва
  product: number;  // ID продукта
} 

interface CardProps { 
  product: Product;  
}

export default function Card({ product }: CardProps) { 
  const [discount, setDiscount] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);  // Типизация для reviews

  function calculateDiscount(product: Product) {  
    const discountValue = ((Number(product.old_price) - Number(product.price)) / Number(product.old_price)) * 100;
    console.log(discountValue); 
    // Преобразуем discountValue в строку, а затем обратно в число
    setDiscount(parseFloat(discountValue.toFixed(2)));   
  } 

  useEffect(() => {  
    if (product.old_price) {
      calculateDiscount(product);  
    }
  }, [product]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviewsByProductId(product.id);
      setReviews(reviewsData);  
    };

    fetchReviews(); 
  }, [product.id]); 

  return (  
    <div className={styles.card}> 
      <div className={styles.photos}> 
        <div
          className={styles.photo}   
          style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}${product.image_url})` }}
        ></div>
      </div> 
      <div className={styles.body}>   
        <h3 className={styles.title}>{product.name}</h3>    
        <p className={styles.sets}>{product.sets}</p>       
        <div className={styles.reviews}>   
          <Image src="/svg/Card/star.svg" alt="Звезда" width={14} height={14} className={styles.icons} />
          {reviews.length} отзыва
        </div>        
        <div className={styles.prices}> 
          <span className={styles.price}>{product.price} ₽</span> 
          {product.old_price && <span className={styles.oldPrice}>{product.old_price} ₽</span>}
          {product.old_price && <span className={styles.discount}> -{discount}%</span>}
        </div>  
      </div> 
    </div>  
  ); 
}
