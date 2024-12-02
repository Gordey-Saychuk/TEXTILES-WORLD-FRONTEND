'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import styles from './Profile.module.css';
import Image from 'next/image';  
import { RootState } from '@/app/GlobalRedux/store';

export default function Profile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);   
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // To track if the component is in the client side

  useEffect(() => { 
    // Set isClient to true after the first render (only in client-side)
    setIsClient(true);

    if (!isAuthenticated) {
      router.push('/auth'); // Redirect unauthenticated users
    } else {
      const fetchUserData = async () => { 
        // This will only be called in the client
        if (isClient) {
          const token = localStorage.getItem('token'); // Access localStorage

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
                credentials: 'include', // Required for cookies
              }
            );
            
            if (!response.ok) {
              throw new Error('Ошибка при запросе данных');
            }
    
            const data = await response.json();
            console.log('Ответ сервера:', data); 
            setName(data.name); // Set user name
            setEmail(data.email); 
          } catch (error) {
            console.error('Ошибка при запросе данных:', error);
          }
        }
      };
  
      fetchUserData();
    }
  }, [isAuthenticated, router, isClient]);

  return ( 
    <div className={styles.page}>     
      <div className={styles.profile}>   
        <div>
          <Image src="/images/profile.png" alt="Profile Image" width={100} height={100} className={styles.icon} />
        </div> 
        {name ? <h1 className={styles.name}>{name}</h1> : <h1>Загрузка профиля...</h1>} 
        <div className={styles.email}>{email}</div>
      </div> 
      <div>У вас пока нет заказов</div>
    </div>
  );
}
 