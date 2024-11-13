"use client";

import React, { ReactNode } from "react"; // Import ReactNode for the correct type
import styles from "./Section.module.css";

// Define the type for the props
interface SectionClientProps {
  sliderComponent: ReactNode; // sliderComponent is expected to be a ReactNode (any JSX or React component)
}

export default function SectionClient({ sliderComponent }: SectionClientProps) {
  return (
    <div className={styles.sections}>
      {sliderComponent}  {/* Render the sliderComponent prop */}
    </div>
  );
} 
