'use client';

import { useState } from 'react';
import styles from './CallBackForm.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function CallBackForm() {
  const [phoneNumber, setPhoneNumber] = useState('+7');

  const validatePhoneNumber = (number: string) => {
    // Check if the number is exactly +7XXXXXXXXXX
    const phoneNumberPattern = /^\+7 \d{3} \d{3} \d{4}$/;
    return phoneNumberPattern.test(number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;

    // Prevent deletion of the "+7" prefix
    if (!input.startsWith('+7')) {
      input = '+7';
    }

    // Remove all non-numeric characters except for "+"
    const sanitizedInput = input.replace(/[^+\d]/g, '');

    // Automatically add spaces for better readability
    let formattedNumber = sanitizedInput.slice(0, 2); // Start with +7
    if (sanitizedInput.length > 2) {
      formattedNumber += ' ' + sanitizedInput.slice(2, 5); // Add first group
    }
    if (sanitizedInput.length > 5) {
      formattedNumber += ' ' + sanitizedInput.slice(5, 8); // Add second group
    }
    if (sanitizedInput.length > 8) {
      formattedNumber += ' ' + sanitizedInput.slice(8, 12); // Add last group
    }

    // Limit the input length to 12 characters (+7 XXX XXX XXXX)
    setPhoneNumber(formattedNumber.slice(0, 15));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if phone number is valid
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Пожалуйста, введите корректный номер телефона в формате +7 XXX XXX XXXX.');
      return;
    }

    try {
      // Send POST request to the API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}sendphone/`, {
        phone: phoneNumber.replace(/\s/g, ''), // Remove spaces before sending
      });

      if (response.status === 200) {
        toast.success('Запрос на звонок принят. Мы свяжемся с вами!');
        setPhoneNumber('+7'); // Reset input field
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
      <p className={styles.zvon}>
        Звоните нам, и мы поможем вам выбрать идеальный текстиль для вашего дома!
      </p>
      <p className={styles.phoneNumber}>
        <a href="tel:+79939503108">+7 993 950 31 08</a>
      </p>
      <p className={styles.description}>
        Или оставьте свой номер телефона, наш консультант свяжется с вами.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="phone" className={styles.label}>
          Введите номер
        </label>
        <div className={styles.inputContainer}>
          <input
            type="tel"
            className={styles.input}
            value={phoneNumber}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.submitButton}>
            Перезвоните мне
          </button>
        </div>
        <p className={styles.description}>
          Нажимая на кнопку, я даю согласие на обработку персональных данных
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}
 