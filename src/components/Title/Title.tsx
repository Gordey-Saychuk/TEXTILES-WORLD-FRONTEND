import styles from "./Title.module.css"; 

export default function Title({children}) { 
  return (
    <h4 className={styles.title}>
      {children} 
    </h4> 
  );
}
 