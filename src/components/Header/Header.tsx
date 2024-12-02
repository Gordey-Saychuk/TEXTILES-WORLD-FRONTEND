import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import Input from "../Input/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { totalQuantity = 0 } = useSelector((state) => state.cart || {});
  const { isAuthenticated } = useSelector((state) => state.auth); // Проверяем статус аутентификации
  const router = useRouter();
 
  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

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
          <Link className={styles.links} href="/catalog">
            Каталог
          </Link>
          <li className={styles.links}>Постельное белье</li>
          <li className={styles.links}>Хиты продаж</li>
          <li className={styles.links}>Распродажа</li>
        </ul>
      </div>

      <div className={styles.phoneBlock}>
        <div onClick={handleProfileClick} className={styles.profileIcon}>
          <Image
            src="/svg/TopHeader/6593795.png"
            alt="Профиль"
            width={20}
            height={20}
            className={styles.icon}
          />
        </div>

        <Link href="/cart" className={styles.cartIcon}>
          <Image src="/svg/TopHeader/cart.svg" alt="Корзина" width={20} height={20} />
          {totalQuantity > 0 && (
            <span className={styles.cartBadge}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </div>
  );
}
 