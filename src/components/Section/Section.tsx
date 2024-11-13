import styles from "./Section.module.css";
import { getTovars } from "../../app/lib/api/getTovars";
import SectionClient from "./SectionClient";
  
export default async function Section({children, sliderComponent }) {  
  const data = await getTovars();

  return ( 
    <section className={styles.section}>   
    <div className={styles.title}>   
      {children}
      </div>  
      <SectionClient sliderComponent={sliderComponent} />
    </section>
  );
}
