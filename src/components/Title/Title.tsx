import React, { ReactNode } from "react"; // Import ReactNode
import styles from "./Title.module.css";

interface TitleProps {
  children: ReactNode;  
  link?: boolean; 
}

export default function Title({ children, link }: TitleProps) {
  return (
    <> 
      {link ? (
        <h4 className={styles.title}>{children}</h4>
      ) : (
        <h4 className={styles.titles}>{children}</h4>
      )} 
    </>
  );
}
