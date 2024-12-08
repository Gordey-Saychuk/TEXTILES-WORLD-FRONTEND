import { useEffect, useState } from 'react';
import { getCategory } from '../../app/lib/api/category';
import styles from './Category.module.css';

interface CategoryProps {
	changeCategory: (id: number | undefined) => void;
}

export default function Category({ changeCategory }: CategoryProps) {
	const [categories, setCategories] = useState<{ id: number; name: string }[]>(
		[]
	);
	const [activeCategory, setActiveCategory] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const data = await getCategory();
				setCategories(data || []);
			} catch (error) {
				console.error('Ошибка загрузки категорий:', error);
			}
		}
		fetchCategories();
	}, []);

	const handleCategoryClick = (id: number | undefined) => {
		setActiveCategory(id); // Устанавливаем активную категорию
		changeCategory(id); // Вызываем функцию родительского компонента
	};

	return (
		<div>
			{categories.length === 0 ? (
				<p>Категории не найдены</p>
			) : (
				<ul className={styles.category}>
					<li
						className={`${styles.categoryItem} ${activeCategory === undefined ? styles.active : ''}`}
						onClick={() => handleCategoryClick(undefined)}
					>
						Все
					</li>
					{categories.map((cat) => (
						<li
							key={cat.id}
							className={`${styles.categoryItem} ${
								activeCategory === cat.id ? styles.active : ''
							}`}
							onClick={() => handleCategoryClick(cat.id)}
						>
							{cat.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
