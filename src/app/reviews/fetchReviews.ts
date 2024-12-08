export async function fetchReviews() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews/`); 
		if (!response.ok) {
			throw new Error(`Reviews not found: ${response.statusText}`);
		} 
		return await response.json();   
	} catch (error) {
		console.error(error);
		return [];
	}
}
