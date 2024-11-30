"use client";
import React from "react";
import styles from "./cart.module.css"; 
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { removeItem } from '@/app/GlobalRedux/cartSlice';
import { useRouter } from 'next/navigation'; 
import Button from '@/components/Button/Button'; 

export default function Cart() {
  const { itemsCart, totalPrice, totalQuantity, totalOldPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const router = useRouter(); 

  function delItem(id) {
    dispatch(removeItem({ id }));
  }
   
  return ( 
    <div className={styles.page}>  
    
      <h1 className={styles.title}>Корзина</h1> 
      {itemsCart.length === 0 ? (
        <div className={styles.empty}> 
          <p>Ваша корзина пуста 🛒</p>
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.items}> 
            {itemsCart.map((item) => (
              <li className={styles.item} key={item.id}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image_url}`}
                  alt={item.name}
                  width={80} 
                  height={80} 
                  className={styles.itemImage}
                /> 
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemQuantity}>
                    Кол-во: <span>{item.quantity}</span>
                  </p>
                  </div>     
                  <div> 
                  <div className={styles.price}>{item.price * item.quantity} ₽</div>
                  <div className={styles.oldPrice}> {item.old_price * item.quantity} ₽</div>  
                  <div   className={styles.itemImages} onClick={() => delItem(item.id)}> 
                  <Image    
                  src={`/svg/Cart/trash.svg`}    
                  alt={'Удалить товар'} 
                  width={20}   
                  height={20}   
                  className={styles.itemImage}
                /> 
                  </div>
                  </div> 
              </li>  
            ))}
          </ul>
          <div className={styles.summary}>
            <div className={styles.summaryTitle}> 
              <div className={styles.price}>Итого</div>
              <div className={styles.price}>{totalPrice} ₽</div>
            </div> 
            <div>
              <div className={styles.summaryTitle}> 
                <div>Всего товаров: {totalQuantity}</div>
                <div>{totalOldPrice}</div>   
              </div>
              <div className={styles.summaryTitle}>  
                <div>Скидка</div>
                <div>{totalOldPrice - totalPrice} ₽</div>
                <Button onClick={() => router.push('/checkout')}>Перейти к оформлению</Button>
              </div>
            </div>
            
          </div>
        </div>
      )}
       
    </div>
  );
}
