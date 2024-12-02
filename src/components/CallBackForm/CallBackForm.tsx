"use client";

import { useState } from 'react';
 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './CallBackForm.module.css'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Button from '../Button/Button'; 
 
export default function CallBackForm() { 
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (event) => {
    // Remove spaces from the input value
    const value = event.target.value.replace(/\s+/g, '');
    setPhoneNumber(value);
  };

  const validatePhoneNumber = (number) => {
    // Simple validation for a 11-digit phone number with +7 prefix
    const phoneNumberPattern = /^\+7\d{10}$/;
    return phoneNumberPattern.test(number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if phone number is valid
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Пожалуйста, введите полный номер телефона.');
      return;
    }

    // Prepare form data
    const formData = {
      phone: phoneNumber,
    };

    try { 
      // Send POST request to the API
      const response = await fetch('/api/submit-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, actionType: 'callback' }),
      });

      if (response.ok) {
        toast.success('Запрос на звонок принят. Мы свяжемся с вами!');
        setPhoneNumber(''); // Clear the input field
      } else {
        toast.error('Ошибка при отправке запроса. Попробуйте еще раз.');
      }
    } catch (error) {
      toast.error('Произошла ошибка. Пожалуйста, попробуйте позже.');
      console.error('Error submitting callback request:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Есть вопросы?</h2>
      <p className={styles.zvon}>Звоните нам, и мы поможем вам выбрать идеальный текстиль для вашего дома!</p>
      <p className={styles.phoneNumber}> <a href="tel:+79939503108">+7 993 950 31 08</a></p>
      <p className={styles.description}>
        Или оставьте свой номер телефона, наш консультант свяжется с вами.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}> 
        <label htmlFor="phone" className={styles.label}>
          Введите номер
        </label> 
        <PhoneInput
  country={'ru'}
  value={phoneNumber}
  onChange={(phone) => setPhoneNumber(`+${phone}`)}
  inputClass={styles.input}
  inputProps={{
    required: true,
  }}
/>
        <p className={styles.description}>
          Нажимая на кнопку, я даю согласие на обработку персональных данных  
        </p>  
        
        <div onClick={handleSubmit} >   
        <Button  type="submit" >Перезвоните мне</Button> 
        </div>
      </form> 

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
 