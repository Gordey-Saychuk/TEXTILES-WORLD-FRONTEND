"use client";

import React, { useEffect } from 'react'; 
import styles from './DeliverySelector.module.css';
import Input from '@/components/Input/Input'; 

const DeliverySelector = ({ selectedService, setSelectedService, address, setAddress, setDeliveryFee }) => {
  const handleServiceSelect = (service) => {
    // Обнуляем пункт самовывоза при смене службы доставки
    setAddress(''); 
    setSelectedService(service);
  };
   

  const handlePickupPointChange = (e) => {
    setAddress(e.target.value);
  };
 
  // Когда выбран ПВЗ, устанавливаем плату за доставку
  useEffect(() => { 
    if (selectedService) {
      setDeliveryFee(499); // Устанавливаем стоимость доставки в 500 рублей
    } else { 
      setDeliveryFee(0); // Если ПВЗ не выбран, то нет дополнительной платы
    }
  }, [selectedService, setDeliveryFee]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Выберите службу доставки</h2>
      <div className={styles.deliveryOptions}>
      <button
  type="button" // Убедитесь, что тип кнопки не "submit"
  className={`${styles.deliveryOption} ${selectedService === 'СДЭК' ? styles.selected : ''}`}
  onClick={() => handleServiceSelect('СДЭК')}
> 
    <div className={styles.deliveryImages}>
  <img src="/png/CDEK_logo.svg.png" alt="СДЭК" className={styles.deliveryImage} /> 
  </div>
  {/* <div>СДЭК</div>  */}  
  <div>499₽</div> 
 
</button>

        <button
          type="button" // Убедитесь, что тип кнопки не "submit"
          className={`${styles.deliveryOption} ${selectedService === 'Почта России' ? styles.selected : ''}`}
          onClick={() => handleServiceSelect('Почты России')}
        >  
            <div className={styles.deliveryImages}>
          <img src="/png/images.png" alt="Почта России" className={styles.deliveryImage} />
          </div>
          {/* Почта России + 500 рублей */} 
          <div>499₽</div> 
        </button>
        <button
          type="button" // Убедитесь, что тип кнопки не "submit" 
          className={`${styles.deliveryOption} ${selectedService === 'Боксберри' ? styles.selected : ''}`}
          onClick={() => handleServiceSelect('Боксберри')}
        >
              <div className={styles.deliveryImages}>
          <img src="/svg/boxberry.svg" alt="Боксберри" className={styles.deliveryImage} />
          {/* Боксберри + 500 рублей  */} 
          </div> 
          <div>499₽</div> 
        </button>
        <button
          type="button" // Убедитесь, что тип кнопки не "submit" 
          className={`${styles.deliveryOption} ${selectedService === 'Яндекс' ? styles.selected : ''}`}
          onClick={() => handleServiceSelect('Яндекс')} 
        >   
            <div className={styles.deliveryImages}>
          <img src="/png/Logo-yandexmarket.-kompaktnyi-.png" alt="Яндекс" className={styles.deliveryImage} />
          {/* Боксберри + 500 рублей  */}  
          </div>
          <div>499₽</div> 
        </button>
      </div>

      {selectedService && (
        <div className={styles.form}> 
          <h3 className={styles.formTitle}>Введите адрес ПВЗ для {selectedService}</h3>
       
          		<Input  
               
					value={address}
					onChange={handlePickupPointChange}
					placeholder="Адрес пункта выдачи"  
				/> 
        </div> 
      )}
    </div>
  );
};

export default DeliverySelector;
 