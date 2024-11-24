import styles from './Button.module.css'

export default function Button({ children, submit }: { children: React.ReactNode, submit?: boolean }) { 
  return (  
    <button className={styles.button} type={submit ? "submit" : "button"} >{children}</button>
  )  
}
   