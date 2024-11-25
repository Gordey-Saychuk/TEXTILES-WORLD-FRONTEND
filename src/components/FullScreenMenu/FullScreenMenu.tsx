"use client";

import React, { useState } from 'react';
import styles from './FullScreenMenu.module.css'; // Убедитесь, что стили подключены правильно
import { Link } from 'react-alice-carousel';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;  
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState<'shades' | 'bedding'>('shades');

  if (!isOpen) return null;

  return (
    <div className={styles.fullScreenMenu}>
      <div className={styles.switcher}>
        <button
          className={`${styles.switchButton} ${selectedCategory === 'shades' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('shades')}
        >
          Шторы
        </button>
        <button
          className={`${styles.switchButton} ${selectedCategory === 'bedding' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('bedding')}
        >
          Постельное белье
        </button>
      </div>

      <div className={styles.content}>
        {selectedCategory === 'shades' ? (  
          <ul className={styles.list}>       
            <Link href="/catalog/shtori"> <li className={styles.lists}>КАТАЛОГ</li></Link>  
            <Link href="/catalog/tyul"><li className={styles.lists}>ТЮЛЬ</li>  </Link>
          </ul>  
        ) : (     
          <ul className={styles.list}>
            <Link href="/catalog/postelnoe-belie"><li className={styles.lists}>КАТАЛОГ</li></Link> 
            <Link href="/catalog/pledy"> <li className={styles.lists}>ПЛЕДЫ</li></Link>
            <Link href="/catalog/prostynya"><li className={styles.lists}>ПРОСТЫНЯ</li></Link>
            <Link href="/catalog/nabor-postelnogo-belya"> <li className={styles.lists}>НАБОРЫ ПОСТЕЛЬНОГО</li></Link> 
          </ul> 
        )}
      </div>
    </div>
  );
};

export default FullScreenMenu;
