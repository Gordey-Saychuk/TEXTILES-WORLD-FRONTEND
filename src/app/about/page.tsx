import React from 'react';
import styles from './about.module.css';

import Head from 'next/head';   
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export async function generateMetadata() { 
	return { 
		title: 'О нас - Textiles World',
		description:
			'Интернет-магазин постельного белья Textiles World. Узнайте больше о нашей миссии, продуктах и преимуществах. Качество и стиль для вашего дома.',
		keywords:
			'о нас, Textiles World, постельное белье, интернет-магазин, домашний текстиль, купить постельное белье',
		robots: 'index, follow',
		openGraph: {
			title: 'О нас - Textiles World',
			description:
				'Textiles World - интернет-магазин постельного белья, предлагающий высококачественные изделия для вашего дома. Узнайте больше о нас.',
			url: 'https://textiles-world.ru/about',
			type: 'website',
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'О нас - Textiles World',
			description:
				'Textiles World - ваш источник качественного постельного белья. Узнайте больше о нашей миссии и продуктах.'
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
              "description": "Textiles World - интернет-магазин постельного белья. Узнайте больше о нашей миссии и предложениях.",
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
					<p className={styles.textTitle}> 
						Добро пожаловать в Textiles World — интернет-магазин постельного белья. 
						Мы стремимся сделать ваш дом уютным и комфортным, предоставляя широкий выбор высококачественных комплектов постельного белья по доступным ценам.
					</p>

					<ul className={styles.list}>
						<li className={styles.fontBolds}> 
							<span className={styles.fontBold}>Разнообразие коллекций:</span> В
							нашем каталоге вы найдете разнообразные дизайны и размеры, чтобы
							удовлетворить любые ваши предпочтения.
						</li> 
						<li className={styles.fontBolds}>
							<span className={styles.fontBold}>Качество:</span> Все наши
							изделия выполнены из натуральных и долговечных материалов, что
							гарантирует комфорт и долговечность.
						</li> 
						<li className={styles.fontBolds}>
							<span className={styles.fontBold}>
								Удобство покупки и доставки:
							</span>{' '}
							Легкий процесс оформления заказа и быстрая доставка по всей
							России. Наша служба поддержки всегда на связи, чтобы помочь вам.
						</li>
						<li className={styles.fontBolds}>  
							<span className={styles.fontBold}>Доступные цены:</span> Мы
							уверены, что каждый заслуживает комфортного сна, не переплачивая.
						</li>
					</ul>

					<p className={styles.fontBold}>
						Textiles World — ваш надежный источник идеального сна и уюта.
					</p>
				</div>
			</div>
		</div>
	);
}
 