'use client';

import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => { 
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}user`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
      } catch (error) {
        console.error('Ошибка при запросе данных:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div> 
      {name ? <h1>Привет, {name}</h1> : <h1>Вы не вошли</h1>}
      <div>У вас пока нет заказов</div>
    </div> 
  );
}
 