'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import styles from './Profile.module.css';
import Image from 'next/image';  

export default function Profile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth'); // Перенаправление неавторизованных пользователей
    } else {
      const fetchUserData = async () => { 
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
  
        if (!token) {
          console.error('Пользователь не авторизован');
          return;
        }
        try { 
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}user`, 
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json', 
                 "Authorization": `Bearer ${token}`,
              },
              credentials: 'include', // Обязательно для передачи кук
            }
          );
          
          // Проверка успешности запроса
          if (!response.ok) {
            throw new Error('Ошибка при запросе данных');
          }
  
          const data = await response.json();
          console.log('Ответ сервера:', data); 
          setName(data.name); // Устанавливаем имя пользователя
          setEmail(data.email)
        } catch (error) {
          console.error('Ошибка при запросе данных:', error);
        }
      };
  
      fetchUserData();
    }
  }, [isAuthenticated, router]);

  return ( 
    <div className={styles.page}>     
    <div className={styles.profile}>   
    <div>
    <Image src="/images/profile.png" alt="Slide 1" width={100} height={100} className={styles.icon} />
    </div> 
   
      {name ? <h1 className={styles.name}> {name}</h1> : <h1>Загрузка профиля...</h1>} 
      <div className={styles.email}>{email}</div>
      </div> 
      <div>У вас пока нет заказов</div>
    </div>
  );
}
   