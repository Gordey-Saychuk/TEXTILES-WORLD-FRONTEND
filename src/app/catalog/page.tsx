'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getTovarsCatalog } from '../lib/api/getTovars'
import SliderCatalog from '../../components/SliderCatalog/SliderCatalog'
import Card from '../../components/Card/Card'
import Category from '@/components/Category/Category'
import styles from './ClientCatalog.module.css'
import { Product } from '@/types/index'
import Sort from '@/components/Sort/Sort'

export default function Catalog() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [data, setData] = useState<Product[]>([])
	const [totalPages, setTotalPages] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
	const [sortId, setSortId] = useState<string | undefined>('default')

	useEffect(() => {
		const page = parseInt(searchParams.get('page') || '1', 10)
		const category = searchParams.get('categoryId')
		setCurrentPage(page)
		setCategoryId(category ? parseInt(category, 10) : undefined)
	}, [searchParams])

	// Запрос данных
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await getTovarsCatalog(
					currentPage,
					3,
					categoryId,
					sortId
				) // Include sortId in API call
				setData(response.results || [])
				setTotalPages(Math.ceil(response.count / 3))
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
			}
		}
		fetchData()
	}, [currentPage, categoryId, sortId])

	console.log('сорт', sortId)

	const handleCategoryChange = (id: number | undefined) => {
		router.push(`/catalog?page=1&categoryId=${id || ''}`)
	}

	const handlePageChange = (page: number) => {
		router.push(`/catalog?page=${page}&categoryId=${categoryId || ''}`)
	}

	return (
		<div>
			<div className={styles.page}>
				<SliderCatalog />
			</div>
			<section className={styles.sections}>
				<div className={styles.filtre}>Фильтры</div>
				<div className={styles.section}>
					<div className={styles.sort}>
						<Category changeCategory={handleCategoryChange} />
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
		</div>
	)
}
