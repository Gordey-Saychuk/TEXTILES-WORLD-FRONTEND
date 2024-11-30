'use client';

import styles from './login.module.css';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/components/Title/Title';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useDispatch } from 'react-redux'; // Импорт диспетчера Redux
import { login } from '@/app/GlobalRedux/authSlice'; // Импорт экшена login
 
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch(); // Инициализация диспетчера Redux

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.jwt); // Сохраняем токен в localStorage
      console.log('Перед вызовом dispatch:', data.jwt);
      dispatch(login({ token: data.jwt })); 
      console.log('После вызова dispatch'); 
      
      router.push('/profile'); // Переход на страницу профиля
    } else {
      console.error('Ошибка при авторизации');
    }
  };
 
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
          <Button submit={true}>ОТПРАВИТЬ</Button>
        </form>
      </div>
    </div>
  );
}
 