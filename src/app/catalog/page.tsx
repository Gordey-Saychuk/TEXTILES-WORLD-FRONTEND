'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Импорт анимации
import { getTovarsCatalog } from '../lib/api/getTovars';
import SliderCatalog from '../../components/SliderCatalog/SliderCatalog';
import Card from '../../components/Card/Card';
import Category from '@/components/Category/Category';
import styles from './ClientCatalog.module.css';
import { Product } from '@/types/index'; 
import Sort from '@/components/Sort/Sort';
import Filters from '@/components/Filters/Filters';
import Image from 'next/image';

export default function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [sortId, setSortId] = useState<string | undefined>('default');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Состояние модального окна

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('categoryId');
    setCurrentPage(page);
    setCategoryId(category ? parseInt(category, 10) : undefined);
  }, [searchParams]);

  // Запрос данных
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTovarsCatalog(
          currentPage,
          8, 
          categoryId,
          sortId
        ); 
        setData(response.results || []);
        setTotalPages(Math.ceil(response.count / 8));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    fetchData();
  }, [currentPage, categoryId, sortId]);

  const handleCategoryChange = (id: number | undefined) => {
    router.push(`/catalog?page=1&categoryId=${id || ''}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/catalog?page=${page}&categoryId=${categoryId || ''}`);
  };

  // Закрытие модалки при клике вне
  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains(styles.modalOverlay)) {
      setIsFilterModalOpen(false);
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <SliderCatalog />
      </div>
      <section className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sort}>
            <div className={styles.sorts}>
              <Category changeCategory={handleCategoryChange} />
              <Image
                src="/svg/catalog/filter.svg"
                alt="фильтры"
                width={38}
                height={38}
                className={styles.icon}
                onClick={() => setIsFilterModalOpen(true)} // Открытие модального окна
              />
            </div>
            <Sort sortId={sortId} changeSort={(i) => setSortId(i)} />
          </div>
          <div className={styles.catalogCard}>
            {data.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              className={`${styles.pagButton} ${
                currentPage === 1 ? styles.pagButtonDis : ''
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Назад
            </button>
            <span className={styles.pagText}>
              {currentPage} из {totalPages}
            </span>
            <button
              className={`${styles.pagButton} ${
                currentPage === totalPages ? styles.pagButtonDis : ''
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        </div>
      </section>

      {/* Модальное окно фильтров */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick} // Закрытие по клику на оверлей
          >
            <motion.div
              className={styles.modalContent}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setIsFilterModalOpen(false)}
              >
                ✕
              </button>
              <h2>Фильтры</h2>
              <Filters
  onApplyFilters={(filters) => {
    console.log('Примененные фильтры:', filters);
    setIsFilterModalOpen(false); // Закрыть модалку после применения
  }}
/>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 