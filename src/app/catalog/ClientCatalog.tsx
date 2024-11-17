import styles from "./ClientCatalog.module.css";
import SliderCatalog from "../../components/SliderCatalog/SliderCatalog";
import Card from "../../components/Card/Card";
import { Product } from '../../components/Section/SectionProps';

interface ClientCatalogProps { 
  data: Product[];
}

export default function ClientCatalog({ data }: ClientCatalogProps) {
  return (
    <>
      <div className={styles.page}>
        <SliderCatalog />
      </div>
      <section className={styles.sections}>
        <div className={styles.filtre}>фильтры</div>
        <div className={styles.section}>
          <div className={styles.sort}>Сортировка по</div>
          <div className={styles.catalogCard}>
            {data.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
