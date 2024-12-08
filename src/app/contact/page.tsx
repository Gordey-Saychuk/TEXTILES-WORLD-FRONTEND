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
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'Контакты - Textiles World',
			description:
				'Контактная информация интернет-магазина Textiles World. Свяжитесь с нами для вопросов по текстилю.'
		},
		alternates: {
			canonical: 'https://textiles-world.ru/contact'
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
			<div className={styles.conteiners}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{ name: 'Контакты', href: '/contact' }
					]}
				/>
				<h1 className={styles.h2}>Контакты</h1>

				<div className={styles.flexColumn}>
					<p>
						Мы всегда на связи и готовы помочь вам с выбором постельного белья и
						штор для вашего дома. Вот как вы можете с нами связаться:
					</p>

					<ul className={styles.contactList}>
						<li>
							<span className={styles.fontBold}>ИП: </span>
							<div>Медведев Родион Николаевич</div>
						</li>
						<li>
							<span className={styles.fontBold}>ИНН: </span>
							<div>503115814622</div>
						</li>
						<li>
							<span className={styles.fontBold}>ОГРНИП: </span>
							<div>32350810021474</div>
						</li>
						<li>
							<span className={styles.fontBold}>Контактный телефон: </span>
							<a href="tel:+79939503108" className={styles.contactLink}>
								+7 (968) 591-98-48
							</a>
						</li>
						<li>
							<span className={styles.fontBold}>Электронная почта: </span>
							<a className={styles.contactLink}>artlampss@yandex.ru</a>
						</li>
						<li>
							<span className={styles.fontBold}>Телефон: </span>
							<a href="tel:+79939503108" className={styles.contactLink}>
								+7 (993) 950-31-08
							</a>
						</li>
						<li>
							<span className={styles.fontBold}>Telegram: </span>
							<a
								href="https://t.me/Manager_Arts"
								className={styles.contactLink}
							>
								@Manager_Arts
							</a>
						</li>
						<li>
							<span className={styles.fontBold}>WhatsApp: </span>
							<a
								href="https://wa.me/79939503108"
								className={styles.contactLink}
							>
								+7 (993) 950-31-08
							</a>
						</li>
						<li>
							<span className={styles.fontBold}>График работы: </span>
							Каждый день - круглосуточно
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
