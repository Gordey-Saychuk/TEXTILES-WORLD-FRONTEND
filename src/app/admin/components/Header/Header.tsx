import React from 'react'; 
import styles from "./Header.module.css"; 
import Title from '@/components/Title/Title';
import Input from '@/components/Input/Input';

export default function Header() {
  return (
    <div className={styles.header}>   
      <Title>Добрый день Гордей</Title>  
      <div className={styles.input}>    	<Input search={true} placeholder="Поиск по товарам" /> </div>  
   
    </div> 
  ); 
} 
