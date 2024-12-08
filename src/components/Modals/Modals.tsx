import { Link } from 'react-alice-carousel';
import styles from './Modal.module.css';
import { ModalPrors } from './ModalPrors';
import Image from 'next/image'; 
import { useEffect, useRef } from 'react';
 
 
export default function Modals({ active, setActives }: ModalPrors) {
	const modalRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() =>{ 
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActives(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [setActives]);

	return ( 
		<div 
		 
			className={`${styles.modal} ${active ? styles.modalActive : ''}`}
			 
		>
			<div ref={modalRef}  className={styles.modals}>
				<div>
					<a href="tel:+79939503108" className={styles.phone}>
						+7 (993) 950 31 08
					</a>
					<div className={styles.underPhone}>Круглосуточно</div>
				</div>
				<div className={styles.social}>
					<Link href="tg" className={styles.socialTg}>
						<Image
							src="/svg/Header/Telegram.webp"
							alt="Звезда"
							width={25}
							height={25}
							className={styles.icons}
						/>
						Telegram
					</Link>
					<div className={styles.socialTg}>
						<Image
							src="/svg/Header/WhatsApp.webp"
							alt="Звезда"
							width={25}
							height={25}
							className={styles.icons}
						/>
						Whatsapp
					</div>
				</div> 
			</div>
		</div>
	);
}
