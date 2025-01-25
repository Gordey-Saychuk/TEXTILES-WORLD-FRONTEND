// components/Modals/Modals.tsx
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom'; 
import { ModalPrors } from './ModalPrors'; // Переименовал интерфейс для ясности

export default function Modals({ active, setActives, children }: ModalPrors & { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        console.log('Клик вне модального окна');
        setActives(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActives]);
    

  if (!active) return null; // Не рендерить модалку, если она не активна

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${active ? styles.modalActive : ''}`}>
      <div ref={modalRef} className={styles.modals}>
        {children}
      </div>
    </div>, 
    document.body
  ); 
    
} 
