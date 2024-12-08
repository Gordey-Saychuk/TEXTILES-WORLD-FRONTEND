import Head from 'next/head';
import ReviewsPage from './ReviewsPage';
import { fetchReviews } from './fetchReviews'; // Assuming you move this to a separate file

export async function generateMetadata() {
	const reviews = await fetchReviews();
	const reviewCount = reviews.length; 
	const averageRating =
		reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount || 0;

	return {
		title: 'Отзывы - Textiles World',
		description: `Посмотрите отзывы о нашем интернет-магазине Textiles World. Более 100 отзывов, средний рейтинг 5 звезд.`,
		keywords:
			'отзывы, Textiles World, рейтинг, постельное белье, шторы, мнения клиентов, оценки, интернет-магазин',
		robots: 'index, follow',
		openGraph: {
			title: 'Отзывы - Textiles World',
			description: `Отзывы о Textiles World. Более 100 отзывов и рейтинг 5 звезд.`,
			url: 'https://textiles-world.ru/reviews',
			type: 'website',
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'Отзывы - Textiles World',
			description: `Посмотрите отзывы о Textiles World. Более 100 отзывов и рейтинг 5 звезд.`
		},
		alternates: {
			canonical: 'https://textiles-world.ru/reviews'
		},
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'ReviewPage',
			name: 'Отзывы - Textiles World',
			url: 'https://textiles-world.ru/reviews',
			description: `Отзывы о Textiles World. Более 100 отзывов и рейтинг 5 звезд.`,
			review: reviews.map((review) => ({
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: 5,
					bestRating: '5'
				},
				author: {
					'@type': 'Person',
					name: review.reviewerName
				},
				reviewBody: review.comment,
				reviewAspect: 'Overall'
			}))
		}
	};
}

export default function Page() {
	return (
		<>
			<Head>
				<title>Отзывы - Textiles World</title>
				<meta
					name="description"
					content="Посмотрите отзывы о нашем интернет-магазине Textiles World."
				/>
				<meta
					name="keywords"
					content="отзывы, Textiles World, рейтинг, постельное белье, шторы, мнения клиентов, оценки, интернет-магазин"
				/>
				<meta name="robots" content="index, follow" />
				<meta property="og:title" content="Отзывы - Textiles World" />
				<meta property="og:description" content="Отзывы о Textiles World." />
				<meta property="og:url" content="https://textiles-world.ru/reviews" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Textiles World" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Отзывы - Textiles World" />
				<meta
					name="twitter:description"
					content="Посмотрите отзывы о Textiles World."
				/>
				<link rel="canonical" href="https://textiles-world.ru/reviews" />
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ReviewPage',
						name: 'Отзывы - Textiles World',
						url: 'https://textiles-world.ru/reviews',
						description: 'Отзывы о Textiles World.',
						review: []
					})}
				</script>
			</Head>
			<ReviewsPage />
		</>
	);
}
