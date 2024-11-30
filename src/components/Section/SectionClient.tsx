"use client";

import { SectionClientProps } from "./SectionProps";
import styles from "./Section.module.css";
 


export default function SectionClient({ sliderComponent }: SectionClientProps) {
  return (
    <div className={styles.sections}>
      {sliderComponent}  
    </div>
  );
} 
