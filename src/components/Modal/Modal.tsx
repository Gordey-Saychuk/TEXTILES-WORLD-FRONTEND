import styles from "./Modal.module.css";
import { ModalPrors } from "./ModalPrors";

export default function Modal({ active, anchorRef }: ModalPrors) {
  if (!anchorRef) return null;

  const { top, left, height } = anchorRef.getBoundingClientRect();

  return (
    <div
      className={`${styles.modal} ${active ? styles.modalActive : ""}`}
      style={{
        position: "absolute",
        top: top + height + window.scrollY , // Под элементом
        left: left + window.scrollX,
      }}
    >
      <div className={styles.modals}>
      <div 
          >
            <div className={styles.phone}>+7 (993) 950 31 08</div>
            <div className={styles.underPhone}>Круглосуточно</div>
          </div>
      </div>
    </div>
  );
}
 