import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import Input from '../Input/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/GlobalRedux/store';
import { useEffect, useState } from 'react';

export default function Header() {
	const { totalQuantity = 0 } = useSelector(
		(state: RootState) => state.cart || {}
	);
	const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Проверяем статус аутентификации
	const [isSticy, setIsSticy] = useState(false);

	const router = useRouter();

	const handleProfileClick = () => {
		if (isAuthenticated) {
			router.push('/profile');
		} else {
			router.push('/auth');
		}
	};

	function handleScroll() {
		if (window.scrollY > 100) {
			setIsSticy(true);
		} else {
			setIsSticy(false);
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={`${styles.topbars} ${isSticy ? styles.sticky : ''}`}>
			<div className={styles.topbar}>
				<Link href="/" className={styles.logo}>
					TEXTILES WORLD
				</Link>

				<div className={styles.input}>
					<Input search={true} placeholder="Поиск по каталогу" />
				</div>

				<div className={styles.inputs}>
					<Image
						src="/svg/Header/search.svg"
						alt="Поиск"
						width={20}
						height={20}
						className={styles.icon}
					/>
				</div>
 
				<div className={styles.nav}>
					<ul className={styles.ul}>
						<Link className={styles.links} href="/catalog">
							Каталог 
						</Link>
					 
            <Link className={styles.links} href="/catalog/hits"> 
						<li className={styles.links}>Хиты продаж</li>
            </Link>
            <Link className={styles.links} href="/catalog/sale">  
						<li className={styles.linkse}>Распродажа
              <div className={styles.sale} >sale</div> 
            </li> 
            </Link>
					</ul>  
				</div>

				<div className={styles.phoneBlock}>
					<div onClick={handleProfileClick} className={styles.profileIcon}>
						<Image
							src="/svg/TopHeader/6593795.png"
							alt="Профиль"
							width={20}
							height={20}
							className={styles.icon}
						/>
					</div>

					<Link href="/cart" className={styles.cartIcon}>
						<Image
							src="/svg/TopHeader/cart.svg"
							alt="Корзина"
							width={20}
							height={20}
						/>
						{totalQuantity > 0 && (
							<span className={styles.cartBadge}>{totalQuantity}</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
}
