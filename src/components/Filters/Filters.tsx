'use client';

import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters = ({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setSelectedColors([]);
    setSelectedBrand(null);
  };

  const handleApply = () => {
    const filters = {
      priceRange,
      selectedColors,
      selectedBrand,
    };
    onApplyFilters(filters);
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Фильтры</h2>

      {/* Price Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Ценовой диапазон</h3>
        <div className={styles.rangeInput}>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className={styles.input}
          />
          <span className={styles.dash}>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className={styles.input}
          />
        </div>
      </div>

      {/* Colors */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Цвет</h3>
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <button
              key={color}
              className={`${styles.colorButton} ${
                selectedColors.includes(color) ? styles.colorSelected : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleColorToggle(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Бренд</h3>
        <select
          value={selectedBrand || ''}
          onChange={(e) => setSelectedBrand(e.target.value || null)}
          className={styles.select}
        >
          <option value="">Выберите бренд</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <button onClick={handleReset} className={styles.resetButton}>
          Сбросить
        </button>
        <button onClick={handleApply} className={styles.applyButton}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default Filters;
 