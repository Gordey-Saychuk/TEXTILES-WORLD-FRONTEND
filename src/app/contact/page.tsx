import React from 'react';
import styles from './contact.module.css';

import Head from 'next/head';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export async function generateMetadata() {
	return {
		title: 'Контакты - Textiles World',
		description:
			'Свяжитесь с нами! Контактная информация интернет-магазина Textiles World. Мы всегда готовы помочь с выбором постельного белья и штор. Удобные способы связи и адреса.',
		keywords:
			'контакты, Textiles World, как связаться, интернет-магазин, постельное белье, шторы, обратная связь, телефон, email',
		robots: 'index, follow',
		openGraph: {
			title: 'Контакты - Textiles World',
			description:
				'Свяжитесь с Textiles World по любым вопросам. Мы всегда рады помочь вам с выбором текстиля для дома.',
			url: 'https://textiles-world.ru/contact',
			type: 'website',
			siteName: 'Textiles World',
		},
		twitter: {
			card: 'summary',
			title: 'Контакты - Textiles World',
			description:
				'Контактная информация интернет-магазина Textiles World. Свяжитесь с нами для вопросов по текстилю.',
		},
		alternates: {
			canonical: 'https://textiles-world.ru/contact',
		},
	};
}

export default function page() {
	return (
		<div className={styles.container}>
			<Head>
				<script type="application/ld+json">
					{`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Контакты - Textiles World",
              "url": "https://textiles-world.ru/contact",
              "description": "Свяжитесь с нами для вопросов по текстилю. Контактная информация Textiles World.",
              "publisher": {
                "@type": "Organization",
                "name": "Textiles World"
              }
            }
          `}
				</script>
			</Head>
			<div className={styles.innerContainer}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{ name: 'Контакты', href: '/contact' },
					]}
				/>
				<h1 className={styles.heading}>Контакты</h1>
				<div className={styles.content}>
					<p className={styles.introText}>
						Мы всегда на связи и готовы помочь вам с выбором постельного белья и
						штор для вашего дома. Вот как вы можете с нами связаться:
					</p>

					<ul className={styles.contactList}>
						<li>
							<span className={styles.label}>ИП: </span>Медведев Родион Николаевич
						</li>
						<li>
							<span className={styles.label}>ИНН: </span>503115814622
						</li>
						<li>
							<span className={styles.label}>ОГРНИП: </span>32350810021474
						</li>
						<li>
							<span className={styles.label}>Контактный телефон: </span>
							<a href="tel:+79939503108" className={styles.link}>
								+7 (993) 950-31-08
							</a>
						</li>
						<li>
							<span className={styles.label}>Электронная почта: </span>
							<a href="mailto:artlampss@yandex.ru" className={styles.link}>
								artlampss@yandex.ru
							</a>
						</li>
						<li>
							<span className={styles.label}>Telegram: </span>
							<a
								href="https://t.me/Manager_Arts"
								className={styles.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								@Manager_Arts
							</a>
						</li>
						<li>
							<span className={styles.label}>WhatsApp: </span>
							<a
								href="https://wa.me/79939503108"
								className={styles.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								+7 (993) 950-31-08
							</a>
						</li>
						<li>
							<span className={styles.label}>График работы: </span>
							Каждый день - круглосуточно
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
 