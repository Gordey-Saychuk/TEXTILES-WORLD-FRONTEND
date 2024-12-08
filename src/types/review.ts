export interface Review {
	id: number;
	rating: number;
	comment: string;
	name: string;
	is_verified: boolean;
	created_at: string;
	image_url: string | null;
	product: number;
}
