import React, { useState, useEffect, useRef } from 'react';
import styles from './Sort.module.css';

export default function Sort({ changeSort, sortId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [list] = useState([
    { value: 'default', name: 'По умолчанию' },
    { value: 'price', name: 'По цене' },
    { value: 'old_price', name: 'По старой цене' },
    { value: 'discount', name: 'По скидке' },
  ]);

  const sortRef = useRef(null);

  // Toggle dropdown visibility
  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sorting change
  const handleSortChange = (value: string) => {
    changeSort(value); // Передаем новое значение сортировки
    setIsOpen(false); // Закрываем выпадающий список после выбора
  };

  // Find the selected sort option by its value
  const selectedSort = list.find((item) => item.value === sortId);

  return (
    <div className={styles.sorts} ref={sortRef}>
      <div className={styles.sortButton} onClick={toggleDropdown}>
        Сортировка по:{' '}
        <span className={styles.sortButtons}>
          {' '}
          {selectedSort ? selectedSort.name : 'Выберите сортировку'}{' '}
        </span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {list.map((item) => (
              <li
                key={item.value}
                onClick={() => handleSortChange(item.value)}
                className={styles.item}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
