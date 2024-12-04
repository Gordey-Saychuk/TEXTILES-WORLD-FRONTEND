export interface Product {
	id: number
	name: string
	description: string
	video_url: string | null
	image_url: string
	image_url1?: string
	image_url2?: string
	image_url3?: string
	image_url4?: string
	image_url5?: string
	image_url6?: string
	image_url7?: string
	image_url8?: string
	image_url9?: string
	image_url10?: string
	price: number
	old_price: number | null
	available: boolean
	sets: string
	material: string
	consist: string
	manufacture: string
	brand: string
	color: string
	url: string
	created_at: string
	updated_at: string
	category: number
	slice: number
}

export interface Products {
	data: Product[]
}
