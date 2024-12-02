'use client'; 
 
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // Import CSS module  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Ensure to import ToastContainer in your root component (e.g., _app.js)
import { ToastContainer } from 'react-toastify';
import Button from '../Button/Button';

const Footer = () => {
  const [email, setEmail] = useState(''); 
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Пожалуйста, Введите корректный e-mail');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Введите корректный e-mail');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Вы успешно подписались на рассылку!');
        setEmail('');
      } else {
        toast.error('Что-то пошло не так. Попробуйте еще раз.');
      }
    } catch (error) {
      toast.error('Ошибка сети. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.newsletter}>
          <h2 className={styles.newshead}>Подпишитесь на рассылку</h2>
          <p className={styles.newshead}>Скидки, статьи и новости раз в месяц</p>
          <form className={styles.newsletterForm} aria-label="Newsletter Signup" onSubmit={handleSubmit}>
            <input 
              className={styles.input} 
              type="email" 
              placeholder="Ваш e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              aria-label="Email Address" 
            />
            <div onClick={handleSubmit} > 
            <Button  disabled={loading}>Подписаться</Button>     
            </div>
          </form>
        </div>

        <nav className={styles.catalog}>
          <h3>Каталог</h3>
          <ul className={styles.catalogList}> 
            <li><Link href="/catalog/shtori">Шторы</Link></li> 
            <li><Link href="/catalog/postelnoe-belie">Постельное белье</Link></li>
            <li><Link href="/catalog/nabor-postelnogo-belya">Наборы постельного</Link></li>
            <li><Link href="/catalog/pledy">Пледы</Link></li>  
            <li><Link href="/catalog/prostynya">Простыня</Link></li> 
            <li><Link href="/catalog/tyul">Тюль</Link></li>   
        
          </ul> 
        </nav>

        <nav className={styles.customers}>
          <h3>Покупателям</h3>
          <ul className={styles.customersList}>
            <li><Link href="/return">Обмен и возврат</Link></li> 
            <li><Link href="/delivery">Доставка и оплата</Link></li>
            <li><Link href="/politika_konfedencialnosti">Политика конфиденциальности</Link></li>
          </ul>
        </nav>
   
        <nav className={styles.company}>
          <h3>О компании</h3>
          <ul className={styles.companyList}> 
            <li><Link href="/about">О компании Textiles World</Link></li> 
            <li><Link href="/contact">Контакты</Link></li>
            <li><Link href="/reviews">Отзывы</Link></li> 
          </ul>
        </nav> 

        <address className={styles.contactInfo}> 
          <p>Textiles World | г. Москва</p>   
          <p>ПН-ВС | Круглосуточно</p>  
          <p> 
            <a href="tel:+79939503108">+7 993 950 31 08</a>
          </p> 
        </address> 
 
        <div className={styles.footerBottom}> 
          <p>© TextilesWorld 2012 - 2024</p>
          <p><Link href="/politika_konfedencialnosti">Политика конфиденциальности</Link></p>
        </div>
      </footer>
      <ToastContainer />
    </>
  ); 
};

export default Footer;
