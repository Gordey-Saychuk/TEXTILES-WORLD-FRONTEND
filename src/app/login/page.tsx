'use client';

import styles from './login.module.css';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/components/Title/Title';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    // Если запрос успешен, редиректим на страницу профиля
    router.push('/profile');
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
      <div className={styles.bodyForm}>
        <Title>Войти</Title>
      </div>
    </div>
  );
}
 