import axios from 'axios'

export async function getTovars() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
		)
		return response.data.results
	} catch (error) {
		console.error(error)
	}
}

export async function getTovarsCatalog(
	page = 1,
	pageSize = 3,
	categoryId?: number,
	sortId?: string
) {
	try {
		const params: { [key: string]: any } = { page, page_size: pageSize }

		// Если категория выбрана, добавляем её в параметры
		if (categoryId !== undefined) {
			params.category = categoryId
		}
		if (sortId) {
			params.sortId = sortId
		}

		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
			{
				params
			}
		)
		return response.data // Возвращаем весь объект, включая результаты и метаданные
	} catch (error) {
		console.error(error)
		throw new Error('Failed to fetch products')
	}
}

export async function getHits() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/1`
		)
		return response.data.results
	} catch (error) {
		console.error(error)
	}
}

export async function getPleds() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/2`
		)
		return response.data.results
	} catch (error) {
		console.error(error)
	}
}
