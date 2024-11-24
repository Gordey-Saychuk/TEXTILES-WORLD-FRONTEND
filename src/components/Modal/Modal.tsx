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
            <a href="tel:+79939503108" className={styles.phone}>+7 (993) 950 31 08</a>
            <div className={styles.underPhone}>Круглосуточно</div>
          </div> 
          <div className={styles.social}>    
            <div className={styles.socialTg}>
            <Image src="/svg/Header/Telegram.webp" alt="Звезда" width={25} height={25} className={styles.icons} />
            Telegram</div>     
            <div className={styles.socialTg}>   
            <Image src="/svg/Header/WhatsApp.webp" alt="Звезда" width={25} height={25} className={styles.icons} />
            Whatsapp</div> 
          </div> 
      </div>
    </div>
  );
}
 