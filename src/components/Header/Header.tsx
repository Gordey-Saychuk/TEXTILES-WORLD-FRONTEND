import styles from "./Header.module.css"; 
import Input from "../Input/Input";  
import Image from 'next/image';
 

export default function Header() {
  return ( 
    <div className={styles.topbar}>
            <div className={styles.logo}>  
            TEXTILES WORLD 
      </div>  
   
      <div className={styles.input}>   
        <Input placeholder='Поиск по каталогу'></Input>    
      </div>
 
      <div className={styles.nav}> 
        <ul className={styles.ul}> 
          <li>Каталог</li> 
          <li>Постельное белье</li>
          <li>Хиты продаж</li>   
          <li>Распродажа</li>  
        </ul>
      </div>  
      <div className={styles.phoneBlock}>
        <Image src="/svg/TopHeader/6593795.png" alt="Поиск"  width={20} height={20} className={styles.icon} />
        <Image src="/svg/TopHeader/cart.svg" alt="Поиск"  width={20} height={20} className={styles.icon} />
        
      </div>  
    </div>
  );
}
