'use client';
import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { Product, Review } from '@/types/index';
import Image from 'next/image';
import { getReviewsByProductId } from '../../app/lib/api/getReviewsByProductId';
import { useDispatch } from 'react-redux';
import { addItem } from '@/app/GlobalRedux/cartSlice';
import Modals from '@/components/Modals/Modals';
import Link from 'next/link';
import Button from '@/components/Button/Button'; 

interface CardProps {
	product: Product;
}

export default function Card({ product }: CardProps) {
	const [discount, setDiscount] = useState<number | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const dispatch = useDispatch();

  const [actives, setActives] = useState(false); 

	function getReviewWord(count: number) {
		const remainder10 = count % 10;
		const remainder100 = count % 100;

		if (remainder100 >= 11 && remainder100 <= 14) {
			return 'отзывов';
		}
		if (remainder10 === 1) {
			return 'отзыв';
		}
		if (remainder10 >= 2 && remainder10 <= 4) {
			return 'отзыва';
		}

		return 'отзывов';
	}

	function calculateDiscount(product: Product) {
		const discountValue =
			((Number(product.old_price) - Number(product.price)) /
				Number(product.old_price)) *
			100;
		console.log(discountValue);
		// Преобразуем discountValue в строку, а затем обратно в число
		setDiscount(parseFloat(discountValue.toFixed(2)));
	}

	useEffect(() => { 
		if (product.old_price) { 
			calculateDiscount(product);  
		}
		console.log(`{product.image_url}`);
	}, [product]);

	useEffect(() => {
		const fetchReviews = async () => {
			const reviewsData = await getReviewsByProductId(product.id);
			setReviews(reviewsData);
		};

		fetchReviews();
	}, [product.id]);

	function itemsCarts() {
    setActives(true); 

		const item = {
			id: product.id,
			name: product.name,
			price: product.price,
			image_url: product.image_url,
			old_price: product.old_price,
      sets: product.sets 
		};

		dispatch(addItem(item));
	}

	return (
		<div className={styles.card}>
        <Link href={`/catalog/${product.url}`}>
			<div className={styles.photos}> 
				<div   
					className={styles.photo}  
					style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url})` }}
				></div>
			</div>
      </Link>
			<div className={styles.body}>
      <Link href={`/catalog/${product.url}`}>
				<h3 className={styles.title}>{product.name}</h3> 
        </Link>
        <Link href={`/catalog/${product.url}`}>
				<p className={styles.sets}>{product.sets}</p>
        </Link>
        <Link href={`/catalog/${product.url}`}>
				<div className={styles.reviews}> 
					<Image
						src="/svg/Card/star.svg"
						alt="Звезда"
						width={14}
						height={14}
						className={styles.icons}
					/>
					{reviews.length} {getReviewWord(reviews.length)}
				</div>
				<div className={styles.prices}>
					<span className={styles.price}>{product.price} ₽</span>
					{product.old_price && (
						<span className={styles.oldPrice}>{product.old_price} ₽</span>
					)}
					{product.old_price && (
						<span className={styles.discount}> -{discount}%</span>
					)}
				</div>
        </Link> 
				<button onClick={itemsCarts} className={styles.button}>
					Добавить в корзину 
				</button>
			</div>
      <Modals setActives={setActives} active={actives}>
        <div> 
        <div className={styles.modalTitle}>Товар добавлен в корзину</div>
        <div className={styles.buttonsBox}> 
        <button onClick={() => {setActives(false);}} className={styles.buttons}>  
					ПРОДОЛЖИТЬ ПОКУПКИ   
				</button>   
        <Link className={styles.buttonLink} onClick={() => {setActives(false);}} href={'./cart'}> 
        <Button>В КОРЗИНУ</Button>    
        </Link> 
        </div> 
        </div>
      </Modals> 
		</div>  
	);
}
