import { useRef } from 'react';
import styles from './TopHeader.module.css';
import Image from 'next/image';
import { TopHeaderProps } from './TopHeaderProps';
import { Link } from 'react-alice-carousel';
import Button from '../Button/Button'; 

export default function TopHeader({ setActive, setAnchorRef, setActives }: TopHeaderProps) {
	const phoneBlockRef = useRef<HTMLElement | null>(null);

	return (
		<div className={styles.topbar}>
			<div className={styles.topbars}>
				<div>
					<ul className={styles.ul}>
						<Link href="/about">
							{' '}
							<li>О НАС</li>{' '}
						</Link>
						<Link href="/delivery">
							<li>ДОСТАВКА И ОПЛАТА</li>{' '}
						</Link>
						<Link href="/return">
							<li>ВОЗВРАТ</li>{' '}
						</Link>
						<Link href="/contact">
							<li>КОНТАКТЫ</li>{' '}
						</Link>

						<li>ЕЩЕ</li>
					</ul>
				</div>

				<div className={styles.phoneBlock}>
					<div
						ref={(el) => {
							phoneBlockRef.current = el;
							setAnchorRef(el); // el используется, так что ошибки тут нет.
						}}
						className={styles.phoneBlocks}
						onMouseEnter={() => setActive(true)}
						onMouseLeave={() => setActive(false)}
					>
						<a href="tel:+79939503108" className={styles.phone}>
							+7 (993) 950 31 08
						</a>
						<div className={styles.underPhone}>Круглосуточно</div>
					</div>

					<div className={styles.graph}>
						<Image
							src="/svg/TopHeader/graph.svg"
							alt="Иконка сравнения товаров"
							width={40} 
							height={40}
						/> 
						Сравнить 
					</div> 
          <div onClick={ () => setActives(true)} className={styles.button}>
					<Button  >ЗАКАЗАТЬ ЗВОНОК</Button>
          </div>  
				</div> 
			</div> 
		</div> 
	); 
}
