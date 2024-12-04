export async function fetchReviews() {
	try {
		const response = await fetch('/api/reviews')
		if (!response.ok) {
			throw new Error(`Reviews not found: ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error(error)
		return []
	}
}
