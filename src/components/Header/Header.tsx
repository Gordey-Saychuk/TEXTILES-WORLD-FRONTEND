import styles from "./Header.module.css"; 
import Input from "../Input/Input";  
import Image from 'next/image';
import Link from "next/link";
 

export default function Header() {
  return ( 
    <div className={styles.topbar}>
            <Link href='/' className={styles.logo}>  
            TEXTILES WORLD 
      </Link>   
   
      <div className={styles.input}>   
        <Input search={true} placeholder='Поиск по каталогу'></Input>    
      </div> 
 
      <div className={styles.nav}>  
        <ul className={styles.ul}> 
          <Link className={styles.links}  href='/catalog'>Каталог</Link> 
          <li className={styles.links}>Постельное белье</li>
          <li className={styles.links}>Хиты продаж</li>    
          <li className={styles.links}>Распродажа</li>  
        </ul>
      </div>  
      <div className={styles.phoneBlock}>  
      <Link   href='/auth'><Image src="/svg/TopHeader/6593795.png" alt="Поиск"  width={20} height={20} className={styles.icon} /></Link> 
        
        <Image src="/svg/TopHeader/cart.svg" alt="Поиск"  width={20} height={20} className={styles.icon} />
        
      </div>  
    </div>
  );
}
