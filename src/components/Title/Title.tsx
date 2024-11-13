import React, { ReactNode } from "react"; // Import ReactNode
import styles from "./Title.module.css";

interface TitleProps {
  children: ReactNode;  // Explicitly type the children as ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <h4 className={styles.title}>
      {children}
    </h4>
  );
}
 