"use client";

import React from "react";
import { Products } from './SectionProps';
import Card from '../Card/Card';
import styles from "./Section.module.css";
 
export default function SectionClient({ sliderComponent  }: Products) {
  return (
    <div className={styles.sections}> 
      {sliderComponent}  
    </div>
  );
}
