'use client';
import React, { useEffect, useState } from 'react';
import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
	removeItem,
	increaseQuantity,
	decreaseQuantity
} from '@/app/GlobalRedux/cartSlice';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { RootState } from '@/app/GlobalRedux/store';

export default function Cart() {
	const { itemsCart, totalPrice, totalQuantity, totalOldPrice } = useSelector(
		(state: RootState) => state.cart
	);
	const [isClient, setIsClient] = useState(false); // Для проверки, что код выполняется на клиенте

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setIsClient(true); // Когда компонент монтируется, устанавливаем флаг, что код выполняется на клиенте
	}, []);

	function delItem(id: string | number) {
		dispatch(removeItem({ id }));
	}

	function handleIncrease(id: string | number) {
		dispatch(increaseQuantity({ id }));
	}

	function handleDecrease(id: string | number) {
		dispatch(decreaseQuantity({ id }));
	}

	if (!isClient) {
		return null; // Возвращаем null до того, как компонент отрендерится на клиенте
	}

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Корзина</h1>
			{itemsCart.length === 0 ? (
				<div className={styles.empty}>
					<p>Ваша корзина пуста 🛒</p>
				</div>
			) : (
				<div className={styles.content}>
					<ul className={styles.items}>
						{itemsCart.map((item) => {
							const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image_url}`;
							console.log('Image URL:', imageUrl); // Вывод пути в консоль

							return (
								<li className={styles.item} key={item.id}>
									<Image
										src={imageUrl}
										alt={item.name}
										width={80}
										height={80}
										className={styles.itemImage}
									/>
									<div className={styles.itemInfo}>
										<h3 className={styles.itemName}>{item.name}</h3>
										<div className={styles.quantityControl}>
											<button
												className={styles.decreaseButton}
												onClick={() => handleDecrease(item.id)}
												disabled={item.quantity <= 1}
											>
												-
											</button>
											<span>{item.quantity}</span>
											<button
												className={styles.increaseButton}
												onClick={() => handleIncrease(item.id)}
											>
												+
											</button>
										</div>
									</div>
									<div className={styles.boxPrice}>
										<div className={styles.price}>
											{item.price * item.quantity} ₽
										</div>
										<div className={styles.oldPrice}>
											{item.old_price * item.quantity} ₽
										</div>
										<div
											className={styles.itemImages}
											onClick={() => delItem(item.id)}
										>
											<Image
												src={`/svg/Cart/trash.svg`}
												alt={'Удалить товар'}
												width={20}
												height={20}
												className={styles.itemImage}
											/>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
					<div className={styles.summarys}>
						<div className={styles.summary}>
							<div className={styles.summaryTitle}>
								<div className={styles.price}>Итого</div>
								<div className={styles.price}>{totalPrice} ₽</div>
							</div>
							<hr className={styles.line} />
							<div className={styles.blocks}>
								<div className={styles.summaryTitle}>
									<div className={styles.allProduct}>
										Всего товаров: {totalQuantity}
									</div>
									<div className={styles.totalOldPrice}>{totalOldPrice}</div>
								</div>
								<div className={styles.summaryTitle}>
									<div className={styles.allProduct}>Скидка</div>
									<div className={styles.salesProd}>
										{totalOldPrice - totalPrice} ₽
									</div>
								</div>
							</div>
						</div>
						<div className={styles.button}>
							<Button onClick={() => router.push('/checkout')}>
								ПЕРЕЙТИ К ОФОРМЛЕНИЮ
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
