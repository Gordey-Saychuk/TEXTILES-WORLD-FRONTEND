'use client';
import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { Product, Review } from '@/types/index';
import Image from 'next/image';
import { getReviewsByProductId } from '../../app/lib/api/getReviewsByProductId';
import { useDispatch } from 'react-redux';
import { addItem } from '@/app/GlobalRedux/cartSlice';

interface CardProps {
	product: Product;
}

export default function Card({ product }: CardProps) {
	const [discount, setDiscount] = useState<number | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const dispatch = useDispatch();

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
		console.log(`${product.image_url}`);
	}, [product]);

	useEffect(() => {
		const fetchReviews = async () => {
			const reviewsData = await getReviewsByProductId(product.id);
			setReviews(reviewsData);
		};

		fetchReviews();
	}, [product.id]);

	function itemsCarts() {
		const item = {
			id: product.id,
			name: product.name,
			price: product.price,
			image_url: product.image_url,
			old_price: product.old_price
		};

		dispatch(addItem(item));
	}

	return (
		<div className={styles.card}>
			<div className={styles.photos}>
				<div
					className={styles.photo} 
					style={{ backgroundImage: `url(${product.image_url})` }}
				></div>
			</div>
			<div className={styles.body}>
				<h3 className={styles.title}>{product.name}</h3>
				<p className={styles.sets}>{product.sets}</p>
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
				<button onClick={itemsCarts} className={styles.button}>
					Добавить в корзину
				</button>
			</div>
		</div>
	);
}
