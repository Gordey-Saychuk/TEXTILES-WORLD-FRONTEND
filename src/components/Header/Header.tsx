import { useSelector } from "react-redux";
import styles from "./Header.module.css"; 
import Input from "../Input/Input";  
import Image from 'next/image';
import Link from "next/link";

export default function Header() { 
  const { totalQuantity = 0 } = useSelector((state) => state.cart || {}); // Обеспечиваем начальное значение

  return ( 
    <div className={styles.topbar}>
      <Link href="/" className={styles.logo}>  
        TEXTILES WORLD 
      </Link>   
   
      <div className={styles.input}>   
        <Input search={true} placeholder="Поиск по каталогу" />    
      </div> 

      <div className={styles.inputs}>    
        <Image
          src="/svg/Header/search.svg"  
          alt="Поиск"
          width={20}
          height={20} 
          className={styles.icon}
        />
      </div> 

      <div className={styles.nav}>  
        <ul className={styles.ul}> 
          <Link className={styles.links} href="/catalog">Каталог</Link> 
          <li className={styles.links}>Постельное белье</li>
          <li className={styles.links}>Хиты продаж</li>    
          <li className={styles.links}>Распродажа</li>  
        </ul>
      </div>  

      <div className={styles.phoneBlock}>  
        <Link href="/auth">
          <Image src="/svg/TopHeader/6593795.png" alt="Поиск" width={20} height={20} className={styles.icon} />
        </Link> 
          
        <Link href="/cart">
          <Image src="/svg/TopHeader/cart.svg" alt="Корзина" width={20} height={20} />
        </Link>  
        {totalQuantity} 
      </div>    
    </div>
  );
}
 