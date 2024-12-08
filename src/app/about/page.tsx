import React from 'react';
import styles from './about.module.css';

import Head from 'next/head';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export async function generateMetadata() {
	return {
		title: 'О нас - Textiles World',
		description:
			'Интернет-магазин постельного белья и штор Textiles World. Узнайте больше о нашей миссии, продуктах и преимуществах. Качество и стиль для вашего дома.',
		keywords:
			'о нас, Textiles World, постельное белье, шторы, интернет-магазин, домашний текстиль, купить шторы, купить постельное белье',
		robots: 'index, follow',
		openGraph: {
			title: 'О нас - Textiles World',
			description:
				'Textiles World - интернет-магазин постельного белья и штор, предлагающий высококачественные изделия для вашего дома. Узнайте больше о нас.',
			url: 'https://textiles-world.ru/about',
			type: 'website',
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'О нас - Textiles World',
			description:
				'Textiles World - ваш источник качественного постельного белья и штор. Узнайте больше о нашей миссии и продуктах.'
		},
		alternates: {
			canonical: 'https://textiles-world.ru/about'
		}
	};
}

export default function page() {
	return (
		<div className={styles.conteiner}>
			<Head>
				<script type="application/ld+json">
					{`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "О нас - Textiles World",
              "url": "https://textiles-world.ru/about",
              "description": "Textiles World - интернет-магазин постельного белья и штор. Узнайте больше о нашей миссии и предложениях.",
              "publisher": {
                "@type": "Organization",
                "name": "Textiles World"
              }
            }
          `}
				</script>
			</Head>
			<div className={styles.conteiners}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{ name: 'О нас', href: '/about' }
					]}
				/>
				<h1 className={styles.h2}>О нас</h1>

				<div className={styles.flexColumn}>
					<p>
						Добро пожаловать в Textiles World - интернет-магазин, предлагающий
						широкий ассортимент постельного белья и штор. Мы стремимся к тому,
						чтобы сделать ваш дом уютным и стильным, предоставляя
						высококачественные текстильные изделия по доступным ценам.
					</p>

					<ul className={styles.list}>
						<li>
							<span className={styles.fontBold}>Широкий ассортимент:</span> В
							нашем каталоге вы найдете разнообразие комплектов постельного
							белья, штор и других текстильных изделий для дома. Мы предлагаем
							как классические, так и современные модели, чтобы удовлетворить
							любые вкусы и потребности.
						</li>
						<li>
							<span className={styles.fontBold}>Качество и стиль:</span> Все
							наши товары выполнены из натуральных и экологичных материалов, что
							обеспечивает долговечность и комфорт. Мы работаем только с
							проверенными поставщиками, чтобы вы могли быть уверены в качестве
							продукции.
						</li>
						<li>
							<span className={styles.fontBold}>
								Удобная доставка и обслуживание:
							</span>{' '}
							Мы осуществляем доставку по всей России, обеспечивая быстрый и
							удобный процесс оформления заказа. Наши консультанты всегда готовы
							помочь вам с выбором и ответить на все ваши вопросы.
						</li>
						<li>
							<span className={styles.fontBold}>Доступные цены:</span> Мы
							уверены, что каждый заслуживает качественный домашний текстиль, не
							переплачивая за бренд. В Textiles World вы найдете лучшие цены на
							постельное белье и шторы.
						</li>
					</ul>

					<p className={styles.fontBold}>
						Textiles World - это ваш надежный источник домашнего уюта и стиля.
					</p>
				</div>
			</div>
		</div>
	);
}
