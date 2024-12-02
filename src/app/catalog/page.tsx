'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTovarsCatalog } from "../lib/api/getTovars";
import SliderCatalog from "../../components/SliderCatalog/SliderCatalog";
import Card from "../../components/Card/Card";
import Category from "@/components/Category/Category";
import styles from "./ClientCatalog.module.css";
import { Product } from "@/types/index";

export default function Catalog() {
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Получение параметров из URL
    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get('page') || "1", 10);
    const category = queryParams.get('categoryId');
    setCurrentPage(page);
    setCategoryId(category ? parseInt(category, 10) : undefined);

    // Запрос данных
    async function fetchData() {
      const response = await getTovarsCatalog(page, 3, categoryId);
      setData(response.results || []);
      setTotalPages(Math.ceil(response.count / 3));
    }

    fetchData();
  }, [categoryId]);

  const handleCategoryChange = (id: number | undefined) => {
    setCategoryId(id);
    const url = id ? `/catalog?page=${currentPage}&categoryId=${id}` : `/catalog?page=${currentPage}`;
    router.push(url);  // Обновление URL
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPageUrl = `/catalog?page=${currentPage - 1}`;
      window.location.href = prevPageUrl; // Переход на предыдущую страницу
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPageUrl = `/catalog?page=${currentPage + 1}`;
      window.location.href = nextPageUrl; // Переход на следующую страницу
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <SliderCatalog />
      </div>
      <section className={styles.sections}>
        <div className={styles.filtre}>Фильтры</div>
        <div className={styles.section}>
          <div className={styles.sort}>
            <div>
              <Category changeCategory={(id: number) => handleCategoryChange(id)} />
            </div>
            Сортировка по
          </div>
          <div className={styles.catalogCard}>
            {data.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              className={`${styles.pagButton} ${currentPage === 1 ? styles.pagButtonDis : ""}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Назад
            </button>
            <span className={styles.pagText}>
              {currentPage} из {totalPages}
            </span>
            <button
              className={`${styles.pagButton} ${currentPage === totalPages ? styles.pagButtonDis : ""}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
 