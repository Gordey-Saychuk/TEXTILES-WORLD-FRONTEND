'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import styles from './Profile.module.css'
import Image from 'next/image'
import { RootState } from '@/app/GlobalRedux/store'
import { getUser, refreshAccessToken } from '@/app/GlobalRedux/authSlice'
import Button from '@/components/Button/Button'
import { Link } from 'react-alice-carousel'

export default function Profile() {
	const { isAuthenticated, user, isLoading } = useSelector(
		(state: RootState) => state.auth
	)
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
    if (isLoading) return; // Ждем завершения загрузки
    if (!isAuthenticated) { 
       
    } else if (!user) {
      dispatch(getUser());
    }
  }, [isAuthenticated, user, isLoading, router, dispatch]);
  
  if (!isAuthenticated || isLoading) {
    return <h1>Загрузка профиля...</h1>;
  } 

	return (
		<div className={styles.page}>
			<div className={styles.profile}>
				<div>
					<Image
						src="/images/profile.png"
						alt="Profile Image"
						width={100}
						height={100}
						className={styles.icon}
					/>
				</div>
				<h1 className={styles.name}>{user?.name}</h1>
				<div className={styles.email}>{user?.email}</div>
			</div>
      <Link href='/tracking'>  
      <Button>Отследить заказ</Button>
      </Link>
			 
		</div>
	)
} 