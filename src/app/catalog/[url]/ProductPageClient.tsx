'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product, Review } from '@/types/index'; 
import styles from './page.module.css';
import { useDispatch } from 'react-redux';
import { addItem } from '@/app/GlobalRedux/cartSlice';
import Modals from '@/components/Modals/Modals'; 
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'; 
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import ReviewForm from './ReviewForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface ProductPageClientProps { 
  product: Product;
} 



export default function ProductPageClient({ product,url }: ProductPageClientProps) {
  const [actives, setActives] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); 
  const dispatch = useDispatch();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!shareMenuRef.current) return; // Убедитесь, что ref не undefined
      if (!shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };
     
  
    // Добавляем обработчик события
    document.addEventListener('mousedown', handleOutsideClick);
  
    // Удаляем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
   
  

  const imageUrls = [
    product.image_url && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url}`, 
    product.image_url1 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url1}`,
    product.image_url2 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url2}`,
    product.image_url3 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url3}`,
    product.image_url4 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url4}`,
    product.image_url5 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url5}`,
    product.image_url6 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url6}`,
    product.image_url7 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url7}`,
    product.image_url8 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url8}`,
    product.image_url9 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url9}`,
    product.image_url10 && `${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url10}`,
  ].filter((url) => url !== null && url !== undefined);
   
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
    
      setIsShareMenuOpen(false);    
     
    }).catch(() => {
      setIsShareMenuOpen(false);  
      toast.success('Не удалось скопировать ссылку.');   
    });
  };

  const handleShareMenuToggle = () => {
    setIsShareMenuOpen((prev) => !prev);
  };
 


  function addToCart() {
    setActives(true);
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      old_price: product.old_price,
      sets: product.sets,
    };
    dispatch(addItem(item));
  }

  return (
    <div className={styles.containerse}> 
    <div className={styles.breadc}>  
      <Breadcrumbs 
        paths={[
          { name: 'Главная', href: '/' },  
          { name: 'Каталог', href: '/catalog' },
          { name: `${product.name}`, href: `/catalog/${url}` }      
        ]}
      />    
      </div> 
      
<div className={styles.raspre}>  

     {imageUrls.length > 0 && ( 
          <div className={styles.gal}>
            <ProductSlider images={imageUrls} productName={product.name} />
           
          </div>
        )}   
    <div className={styles.container}>
       
    <div className={styles.content}>  
    
    
        

        <div className={styles.details}>  
          <div className={styles.detailsName}> 
          <h1 className={styles.title}>{product.name}</h1>  
          <div className={styles.shareWrapper}>
                  <div  onClick={handleShareMenuToggle} className={styles.shareButton}>
                    <Image
                      src="/svg/productPage/share.svg"
                      alt="Поделиться"
                      width={25}
                      height={25}
                      className={styles.icon}  
                      
                    /> 
                  </div> 
                  {isShareMenuOpen && (
          <div ref={shareMenuRef} className={styles.shareMenu}>
                      <a
                        onClick={() => {setIsShareMenuOpen(false)}} 
                        href={`https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareLink}
                      >
                        Поделиться в ВК 
                      </a>
                      <a
                        onClick={() => {setIsShareMenuOpen(false)}}
                        href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareLink}
                      >
                        Поделиться в Telegram
                      </a>
                      <button onClick={copyToClipboard} className={styles.shareLink}>
                        Скопировать ссылку
                      </button>
                    </div>
                  )}
                </div>
              </div> 
          {product.set && ( 
            <p className={styles.par}> {product.set}</p>
          )}




          <div className={`${styles.mobileOnly}`}>
          
            <div className={styles.priceSection}> 
              <span className={styles.sPrice}>{product.price}₽</span>
              {product.old_price && <span className={styles.oldPrice}>{product.old_price}₽</span>}
            </div>
            <div className={styles.btnConteiner}>
              <div className={styles.btn} onClick={addToCart}>
                Добавить в корзину
              </div>
            </div>
          
          </div>  

          <hr />
          <p className={styles.pars}> Характеристики</p>
          <div className={styles.infoGrid}>     
            {product.base_length && (
              <p><strong>Длина:</strong> {product.base_length}</p>
            )}
            {product.additionalLengthPrice && (
              <p><strong>Доп. цена за длину:</strong> ₽{product.additionalLengthPrice}</p>
            )}
            {product.textile && (
              <p><strong>Ткань:</strong> {product.textile}</p>
            )}
            {product.consist && (
              <p><strong>Состав:</strong> {product.consist}</p>
            )}
            {product.set && (
              <p><strong>Комплект:</strong> {product.set}</p>
            )}
            {product.manufacturer && (
              <p><strong>Производитель:</strong> {product.manufacturer}</p>
            )}
            {product.brand && (
              <p><strong>Бренд:</strong> {product.brand}</p>
            )}
            {product.color && (
              <p><strong>Цвет:</strong> {product.color}</p>
            )}
            {product.drawing && (
              <p><strong>Рисунок:</strong> {product.drawing}</p>
            )}
          </div>
          <hr />  
      
        </div>

        <div className={`${styles.desktopOnly}`}> 
          <div className={styles.priceSection}>
            <span className={styles.sPrice}>{product.price}₽</span>
            {product.old_price && <span className={styles.oldPrice}>{product.old_price}₽</span>}
          </div>
          <div className={styles.btnConteiner}>
            <div className={styles.btn} onClick={addToCart}>
              Добавить в корзину
            </div>
          </div>
        </div> 

     
    </div>   
    </div> 
  
    </div> 
    <div className={styles.tabContainere}>
          <div className={styles.tabContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'description' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('description')}
            >
              Описание
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'delivery' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('delivery')}
            > 
              Доставка  
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'questions' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('questions')}
            > 
              Вопросы   
            </button> 
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'description' && (
              <div>
                {product.description && (  
                  <p className={styles.description}><strong>{product.description}</strong></p>
                )}
              </div>
            )}
            {activeTab === 'delivery' && (
              <div>
                <p className={styles.description}>
                  {/* Здесь вы можете добавить информацию о доставке и возврате */}
                  <strong>    Информация о доставке и возврате товара будет здесь.</strong>
              
                   
                </p>
              </div>
            )} 
              {activeTab === 'questions' && ( 
              <div>
                <p className={styles.description}>
                  {/* Здесь вы можете добавить информацию о доставке и возврате */}
                  <strong>    Информация о доставке и возврате товара будет здесь.</strong>
              
                   
                </p>
              </div>
            )} 
          </div> 
          </div>  
    <div className={styles.reviewBody}> 
        <h2 className={styles.reviewTitle}>Оставить отзыв</h2>
        <ReviewForm productId={product.id} />  
      </div>  
      <Modals setActives={setActives} active={actives}>
          <div>
            <div className={styles.modalTitle}>Товар добавлен в корзину</div>
            <div className={styles.buttonsBox}>
              <button onClick={() => setActives(false)} className={styles.button}>
                Продолжить покупки
              </button>
              <Link href="/cart"> 
                <Button>В корзину</Button>
              </Link>
            </div>
          </div>
        </Modals>
        <ToastContainer /> 
      </div> 












 
  );
}
 