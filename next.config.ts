import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'textiles-world.ru', // Разрешённый домен
				pathname: '/api/**' // Разрешённый путь (если изображения хранятся в других директориях, замените на `/**`)
			}
		]
	}
}

export default nextConfig
