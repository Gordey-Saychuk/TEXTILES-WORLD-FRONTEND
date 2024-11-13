import styles from "./TopHeader.module.css"; 
import Image from 'next/image'; 

export default function TopHeader() {
  return (
    <div className={styles.topbar}>
         <div className={styles.topbars} > 
      <div >
        <ul className={styles.ul}> 
          <li>О НАС</li> 
          <li>ДОСТАВКА И ОПЛАТА</li>
          <li>ВОЗВРАТ</li> 
          <li>КОНТАКТЫ</li> 
          <li>ЕЩЕ</li> 
        </ul>
      </div>
      <div className={styles.phoneBlock}>
        <div>
        <div className={styles.phone}>+7 (993) 950 31 08</div>      
        <div className={styles.underPhone}>Круглосуточно</div> 
        </div> 
        
        <div className={styles.graph}>     
        <Image src="/svg/TopHeader/graph.svg" alt="Иконка сравнения товаров" width={40} height={40} />
          Сравнить</div>
        <button className={styles.button}>ЗАКАЗАТЬ ЗВОНОК</button> 
      </div>  
      </div> 
    </div>
  );
}
 