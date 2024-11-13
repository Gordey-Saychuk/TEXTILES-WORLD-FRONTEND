import styles from "./Input.module.css"; 
import { InputProps } from "./InputProps";
import Image from 'next/image'; 
 
export default function Input({placeholder}: InputProps) {  
  return (   
    <div className={styles.inputContainer}>
    <input className={styles.input} placeholder={placeholder}> 
    
    </input> 
    <Image src="/svg/TopHeader/search.svg" alt="Поиск"  width={20} height={20} className={styles.icon} />
    </div> 
  );   
}   
  