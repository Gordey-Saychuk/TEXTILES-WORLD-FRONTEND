'use client'

import styles from './login.module.css'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/components/Title/Title'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useDispatch } from 'react-redux'
import { login } from '@/app/GlobalRedux/authSlice'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	const dispatch = useDispatch()

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		setError('') // Reset any previous errors

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ email, password })
			}
		)

		if (response.ok) {
			const data = await response.json()
			dispatch(
				login({
					accessToken: data.access_token,
					refreshToken: data.refresh_token,
					user: null
				})
			)
			localStorage.setItem('accessToken', data.access_token) // Сохраняем accessToken в localStorage
			localStorage.setItem('refreshToken', data.refresh_token) // Сохраняем refreshToken в localStorage
			router.push('/profile')
		} else {
			const errorData = await response.json()
			setError(errorData.message || 'Ошибка при авторизации')
		}
	}

	return (
		<div className={styles.body}>
			<div className={styles.bodyForm}>
				<Title>Войти</Title>
				<form className={styles.form} onSubmit={submit}>
					<Input
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					/>
					<Input
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Пароль"
					/>
					{error && <div className={styles.error}>{error}</div>}
					<Button submit={true}>ОТПРАВИТЬ</Button>
				</form>
			</div>
		</div>
	)
}
