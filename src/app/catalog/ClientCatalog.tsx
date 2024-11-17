'use client';

import styles from "./ClientCatalog.module.css";
import SliderCatalog from "../../components/SliderCatalog/SliderCatalog";
import Card from "../../components/Card/Card";
import { Product } from "../../components/Section/SectionProps";

interface ClientCatalogProps {
  initialData: Product[]; // Данные текущей страницы
  totalPages: number; // Общее количество страниц
  currentPage: number; // Текущая страница
}

export default function ClientCatalog({ initialData, totalPages, currentPage }: ClientCatalogProps) {
  // Переход на предыдущую страницу
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPageUrl = `/catalog?page=${currentPage - 1}`;
      window.location.href = prevPageUrl; // Перенаправление на сервер для предыдущей страницы
    }
  };

  // Переход на следующую страницу
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPageUrl = `/catalog?page=${currentPage + 1}`;
      window.location.href = nextPageUrl; // Перенаправление на сервер для следующей страницы
    }
  };

  return (
    <>
      <div className={styles.page}>
        <SliderCatalog />
      </div>
      <section className={styles.sections}>
        <div className={styles.filtre}>Фильтры</div>
        <div className={styles.section}>
          <div className={styles.sort}>Сортировка по</div>
          <div className={styles.catalogCard}>
            {initialData.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
          <div className={styles.pagination}> 
          <button 
           className={`${styles.pagButton} ${currentPage === 1 ? styles.pagButtonDis : null}`} 
          onClick={handlePrevPage} disabled={currentPage === 1}>
            Назад
          </button>
          <span className={styles.pagText}>  
             {currentPage} из {totalPages} 
          </span>
          <button 
          className={`${styles.pagButton} ${currentPage === totalPages ? styles.pagButtonDis : null}`} 
          onClick={handleNextPage}
           disabled={currentPage === totalPages} 
           
           >
            Вперед
          </button>
        </div> 
        </div>
    
      </section>
    </>
  );
} 
 