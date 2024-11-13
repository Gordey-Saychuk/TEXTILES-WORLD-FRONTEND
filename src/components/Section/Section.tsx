import styles from "./Section.module.css";
import SectionClient from "./SectionClient";

interface SectionProps {
  children: React.ReactNode;
  sliderComponent: React.ReactNode;  // The correct type for sliderComponent
}

export default function Section({ children, sliderComponent }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        {children}
      </div>
      <SectionClient sliderComponent={sliderComponent} />
    </section>
  );
}
 