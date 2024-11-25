"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FullScreenMenu from '../FullScreenMenu/FullScreenMenu';
import styles from './BottomBar.module.css';
import Image from 'next/image'; 
 
export const BottomBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu state
  };

  const handleLinkClick = () => { 
    setIsMenuOpen(false); // Close menu on link click
  };

  const links = [
    { href: '/', src: '/svg/bottom-bar/webpagehome_85808.svg', alt: 'Home', label: 'Главная', className: styles.smallIcon },
    { href: '#', src: '/svg/bottom-bar/square-menu_icon-icons.com_69888.svg', alt: 'Menu', label: 'Меню', className: styles.smallIcons, onClick: handleMenuClick },
    { href: '/catalog', src: '/svg/bottom-bar/goods_icon_148531.svg', alt: 'Goods', label: 'Каталог', className: styles.largeIcon },
    { href: '/catalog/sale', src: '/svg/bottom-bar/offer_discount_sales_tag_icon_227952.svg', alt: 'Discount', label: 'Скидки', className: styles.largeIcon },
    { href: '/reviews', src: '/svg/bottom-bar/person_feedback_regular_icon_204294.svg', alt: 'Feedback', label: 'Отзывы', className: styles.largeIcon },
  ];

  return ( 
    <>
      <nav className={styles.bottomBar}>
        {links.map((link) => (
          link.href === '#' ? (
            <div key={link.href} className={styles.barItem} onClick={link.onClick}>
              <Image src={link.src} alt={link.alt} className={link.className} width={24} height={24} />
              <span className={styles.iconLabel}>{link.label}</span>
            </div>
          ) : (
            <Link key={link.href} href={link.href} onClick={handleLinkClick}>
              <div className={styles.barItem}>
                <Image src={link.src} alt={link.alt} className={link.className} width={24} height={24} />
                <span className={styles.iconLabel}>{link.label}</span>
              </div>
            </Link>
          )
        ))}
      </nav>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
