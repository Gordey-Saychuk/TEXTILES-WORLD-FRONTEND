import { useRef } from "react";
import styles from "./TopHeader.module.css";
import Image from "next/image";

// Типы для пропсов компонента
interface TopHeaderProps { 
  setActive: (value: boolean) => void;  // Тип для setActive
  setAnchorRef: (el: HTMLElement | null) => void;  // Тип для setAnchorRef
}

export default function TopHeader({ setActive, setAnchorRef }: TopHeaderProps) {
  const phoneBlockRef = useRef<HTMLElement | null>(null);  // Типизация useRef

  return (
    <div className={styles.topbar}>
      <div className={styles.topbars}>
        <div>
          <ul className={styles.ul}>
            <li>О НАС</li>
            <li>ДОСТАВКА И ОПЛАТА</li>
            <li>ВОЗВРАТ</li>
            <li>КОНТАКТЫ</li>
            <li>ЕЩЕ</li>
          </ul>
        </div>

        <div className={styles.phoneBlock}>
          <div
            ref={(el) => {
              phoneBlockRef.current = el;
              setAnchorRef(el);
            }}
            className={styles.phoneBlocks}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)} 
          >
            <a href="tel:+79939503108" className={styles.phone}>+7 (993) 950 31 08</a>
            <div className={styles.underPhone}>Круглосуточно</div>
          </div>

          <div className={styles.graph}>
            <Image
              src="/svg/TopHeader/graph.svg"
              alt="Иконка сравнения товаров"
              width={40}
              height={40}
            />
            Сравнить
          </div>
          <button className={styles.button}>ЗАКАЗАТЬ ЗВОНОК</button>
        </div>
      </div>
    </div>
  );
}
