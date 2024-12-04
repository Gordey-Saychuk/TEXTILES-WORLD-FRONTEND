import styles from './Blocks.module.css' // Исправьте путь к CSS файлу, если нужно

const blocksData = [
	{
		id: 1,
		image: '/svg/icons/interest.svg',
		caption: 'Доступные цены и регулярные скидки'
	},
	{
		id: 2,
		image: '/svg/icons/act-price.svg',
		caption: 'Цена производителя, без наценок'
	},
	{
		id: 3,
		image: '/svg/icons/railway.svg',
		caption: 'Доставка по России, Беларуси'
	},
	{
		id: 4,
		image: '/svg/icons/shield.svg',
		caption: '100% гарантия возврата и обмена'
	},
	{
		id: 5,
		image: '/svg/icons/24hours.svg',
		caption: 'Принимаем заказы круглосуточно'
	},
	{
		id: 6,
		image: '/svg/icons/ruler.svg',
		caption: 'Изготовление по вашим размерам'
	}
	// Добавьте свои данные
]

export default function Blocks() {
	return (
		<section className={styles.blocksContainer}>
			{blocksData.map((block) => (
				<div key={block.id} className={styles.blocks}>
					{' '}
					{/* Добавлен key */}
					<div className={styles.block}>
						<img
							src={block.image}
							alt={block.caption}
							className={styles.image}
						/>
					</div>
					<div className={styles.caption}>{block.caption}</div>
				</div>
			))}
		</section>
	)
}
