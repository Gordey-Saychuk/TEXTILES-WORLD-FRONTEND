'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import styles from './payment.module.css'

export default function Payment() {
	const [paymentStatus, setPaymentStatus] = useState<string | null>(null) // Explicitly typing paymentStatus as string | null
	const router = useRouter()
	const [orderId, setOrderId] = useState<string | null>(null)

	// Получаем ID заказа из localStorage
	useEffect(() => {
		const storedOrderId = localStorage.getItem('orderId')
		if (storedOrderId) {
			setOrderId(storedOrderId)
		} else {
			router.push('/checkout') // Если нет ID заказа, редирект на страницу оформления
		}
	}, [router])

	const handlePaymentSuccess = async () => {
		if (orderId) {
			// Ensure orderId is not null
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}orders/${orderId}/payment/`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						payment_status: 'Paid'
					})
				}
			)

			if (response.ok) {
				setPaymentStatus('Оплата прошла успешно!')

				setTimeout(() => {
					router.push('/order-complete')
				}, 2000)
			} else {
				setPaymentStatus('Ошибка при обработке платежа.')
			}
		}
	}

	const handlePaymentFailure = async () => {
		if (orderId) {
			// Ensure orderId is not null
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}orders/${orderId}/status`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						payment_status: 'Failed'
					})
				}
			)

			if (response.ok) {
				setPaymentStatus('Ошибка оплаты! Попробуйте еще раз.')
			} else {
				setPaymentStatus('Не удалось обновить статус платежа.')
			}
		}
	}

	return (
		<div className={styles.payment}>
			<h1>Страница оплаты</h1>
			<div>
				<h3>Пожалуйста, завершите оплату.</h3>
				<Button onClick={handlePaymentSuccess}>Оплатить</Button>
				<Button onClick={handlePaymentFailure}>Отменить оплату</Button>
			</div>

			{paymentStatus && <p>{paymentStatus}</p>}
		</div>
	)
}
