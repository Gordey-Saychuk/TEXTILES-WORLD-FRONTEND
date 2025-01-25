'use client';


import React, { useState, useEffect } from 'react';
import styles from './Filters.module.css'; 
import { FiltersData } from '@/app/catalog/hits/ClientCatalogProps';

  
const Filters = ({ onApplyFilters, urls }: { onApplyFilters: (filters: any) => void; urls: string }) => {
  const [filtersData, setFiltersData] = useState<FiltersData>({
    price_range: { min_price: 0, max_price: 1000 },
    colors: [],
    brands: [],  
    materials: [],
    category: [],
    date_ranges: [],
  });

  const [priceRange, setPriceRange] = useState([filtersData.price_range.min_price, filtersData.price_range.max_price]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Запрос данных фильтров с API
  useEffect(() => { 
    async function fetchFilters() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${urls}`);
        const data = await response.json();
        setFiltersData(data);
        setPriceRange([data.price_range.min_price, data.price_range.max_price]);
      } catch (error) {
        console.error('Ошибка при загрузке фильтров:', error);
      }
    }
    fetchFilters();
  }, []);

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const handleReset = () => {
    setPriceRange([filtersData.price_range.min_price, filtersData.price_range.max_price]);
    setSelectedColors([]);
    setSelectedBrand(null);
    setSelectedMaterials([]);
  };
 
  const handleApply = () => {
    const filters = {
      price_min: priceRange[0],
      price_max: priceRange[1], 
      color: selectedColors.join(','),
      brand: selectedBrand,
      material: selectedMaterials.join(','),
    };
    onApplyFilters(filters);
  };



  return (
    <div className={styles.filters}>
     

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
          {filtersData.colors.map((color: string) => (
          
            <button  
              key={color} 
              onClick={() => handleColorToggle(color)}
              className={`${styles.colorButton} ${selectedColors.includes(color) ? styles.selectedColor : ''}`}
            >{color} </button>
          ))} 
        </div>
      </div>

      {/* Brands */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Бренд</h3>
        <select
          value={selectedBrand || ''}
          onChange={(e) => setSelectedBrand(e.target.value || null)}
          className={styles.select}
        >
          <option value="">Выберите бренд</option>
          {filtersData.brands.map((brand: string) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Materials */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Материал</h3>
        <div className={styles.materialOptions}>
          {filtersData.materials.map((material: string) => (
            <button
              key={material}
 
              className={`${styles.colorButton} ${selectedMaterials.includes(material) ? styles.selectedColor : ''}`}
              onClick={() => handleMaterialToggle(material)}
            >
              {material}
            </button>
          ))}
        </div>
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
 