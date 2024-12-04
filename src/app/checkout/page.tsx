'use client'
import { useSelector } from 'react-redux'
import styles from './checkout.module.css'
import { useState, useEffect } from 'react'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { RootState } from '@/app/GlobalRedux/store'

export default function Checkout() {
	const { itemsCart, totalPrice } = useSelector(
		(state: RootState) => state.cart
	)
	const { isAuthenticated, token } = useSelector(
		(state: RootState) => state.auth
	)
	const router = useRouter()

	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [isClient, setIsClient] = useState(false) // State to check if it's client-side

	// Генерация безопасного уникального ID сессии
	function generateUniqueSessionId() {
		return 'guest-' + crypto.randomUUID() // Использование безопасного криптографического метода
	}

	useEffect(() => {
		setIsClient(true) // Set the state to true after mounting on the client
	}, [])

	useEffect(() => {
		// Только на клиенте
		if (isClient) {
			if (!localStorage.getItem('session_id')) {
				const newSessionId = generateUniqueSessionId()
				localStorage.setItem('session_id', newSessionId)
				console.log('Session ID создан:', newSessionId)
			}
		}
	}, [isClient])

	async function getUser(token: string | null) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}user`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					withCredentials: true
				}
			)
			console.log('Данные пользователя:', response.data)
			return response.data
		} catch (error) {
			console.error('Ошибка получения данных пользователя:', error)
		}
	}

	useEffect(() => {
		if (isAuthenticated && token) {
			getUser(token).then((userData) => {
				console.log('Пользователь:', userData)
				setName(userData?.name || '')
				setEmail(userData?.email || '')
			})
		} else {
			console.log('Пользователь не авторизован')
		}
	}, [isAuthenticated, token])

	const handleCheckout = async () => {
		if (!name || !address || !phone || !email) {
			console.warn('Пожалуйста, заполните все поля')
			alert('Пожалуйста, заполните все поля')
			return
		}

		let userId = null
		let sessionId = null

		if (isAuthenticated && token) {
			const userData = await getUser(token)
			userId = userData?.id
		} else if (isClient) {
			// Получаем session_id, если пользователь не авторизован
			sessionId = localStorage.getItem('session_id')
		}

		const orderData = {
			name,
			address,
			phone,
			email,
			products: itemsCart,
			total_price: String(totalPrice),
			session_id: sessionId, // Добавляем session_id
			user_id: userId // Добавляем user_id, если есть
		}

		console.log('Отправка данных на сервер:', orderData)

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}addorders/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(orderData)
				}
			)

			if (response.ok) {
				const responseData = await response.json()

				const orderId = responseData.id
				console.log('Order successfully created:', orderId)
				alert('Заказ оформлен успешно')

				localStorage.setItem('orderId', orderId)

				router.push('/payment')
			} else {
				const error = await response.json()
				console.error(`Ошибка при оформлении заказа: ${error.message}`)
				alert(`Ошибка при оформлении заказа: ${error.message}`)
			}
		} catch (error) {
			console.error('Ошибка сети или сервера:', error)
			alert('Ошибка сети или сервера')
		}
	}

	return (
		<div className={styles.checkout}>
			<h1>Оформление заказа</h1>
			<div>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Ваше имя"
				/>
				<Input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Ваш адрес"
				/>
				<Input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Ваш телефон"
				/>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Ваш email"
				/>
			</div>
			<div>
				<h3>Товары в корзине:</h3>
				<ul>
					{itemsCart.map((item) => (
						<li key={item.id}>
							{item.name} - {item.quantity} шт. - {item.price * item.quantity} ₽
						</li>
					))}
				</ul>
				<h3>Итого: {totalPrice} ₽</h3>
			</div>
			<Button onClick={handleCheckout}>Оформить заказ</Button>
		</div>
	)
}
