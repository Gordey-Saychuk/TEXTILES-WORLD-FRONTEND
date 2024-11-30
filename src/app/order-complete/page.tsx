'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import styles from './orderComplete.module.css';

export default function OrderComplete() {
  const router = useRouter();

  // Переход на главную страницу через 3 секунды после успешного завершения заказа
  useEffect(() => {
    const timer = setTimeout(() => { 
      router.push('/tracking'); 
    }, 3000); // Через 3 секунды
 
    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.orderComplete}>
      <h1>Спасибо за покупку!</h1>
      <p>Ваш заказ успешно оформлен. Мы уже обрабатываем его.</p>
      <p>Вы будете перенаправлены на главную страницу через несколько секунд.</p>
      
      <Button onClick={() => router.push('/')}>Вернуться на главную</Button>
    </div>
  );
}
