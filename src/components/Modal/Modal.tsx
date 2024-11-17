import styles from "./Modal.module.css";
import { ModalPrors } from "./ModalPrors";
import Image from 'next/image';  
 
export default function Modal({ active, anchorRef,  setActive}: ModalPrors) {
  if (!anchorRef) return null; 

  const { top, left, height } = anchorRef.getBoundingClientRect();

  return (
    <div
    onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}
      className={`${styles.modal} ${active ? styles.modalActive : ""}`}
      style={{
        position: "absolute",
        top: top + height + window.scrollY , // Под элементом
        left: left + window.scrollX,
      }}
    >
      <div className={styles.modals}>
      <div 
          >
            <div className={styles.phone}>+7 (993) 950 31 08</div>
            <div className={styles.underPhone}>Круглосуточно</div>
          </div> 
          <div className={styles.social}>   
            <div>
            <Image src="/svg/Header/Telegram.webp" alt="Звезда" width={25} height={25} className={styles.icons} />
              TG</div>    
            <div>  
            <Image src="/svg/Header/WhatsApp.webp" alt="Звезда" width={25} height={25} className={styles.icons} />
              WA</div>
          </div> 
      </div>
    </div>
  );
}
 