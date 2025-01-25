import React from 'react';
import styles from './delivery.module.css';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Head from 'next/head';

export async function generateMetadata() {
	return {
		title: 'Доставка и оплата - Textiles World',
		description:
			'Информация о доставке и оплате в интернет-магазине Textiles World. Быстрая доставка по всей России. Удобные способы оплаты и гарантии возврата.',
		keywords:
			'доставка товара, оплата товара, доставка по России, способы оплаты, стоимость доставки, доставка Textiles World, оплата заказа',
		robots: 'index, follow',
		openGraph: {
			title: 'Доставка и оплата - Textiles World',
			description:
				'Узнайте всё о доставке и оплате товаров в интернет-магазине Textiles World. Быстрая и надежная доставка по всей России. Различные способы оплаты.',
			url: 'https://textiles-world.ru/delivery',
			type: 'website',
			siteName: 'Textiles World',
			image: 'https://textiles-world.ru/subCat/delivery_payment.jpg',
			imageType: 'image/jpg',
			imageWidth: '1200',
			imageHeight: '630'
		},
		twitter: {
			card: 'summary',
			title: 'Доставка и оплата - Textiles World',
			description:
				'Доставка товаров по России в Textiles World: быстро, удобно, надежно. Все способы оплаты доступны на странице оплаты.',
			image: 'https://textiles-world.ru/subCat/delivery_payment.jpg'
		},
		alternates: {
			canonical: 'https://textiles-world.ru/delivery'
		}
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
              "@type": "WebPage",
              "name": "Доставка и оплата - Textiles World",
              "url": "https://textiles-world.ru/delivery",
              "description": "Информация о доставке и оплате товаров в интернет-магазине Textiles World. Быстрая доставка по всей России. Удобные способы оплаты.",
              "publisher": {
                "@type": "Organization",
                "name": "Textiles World",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://textiles-world.ru/logo.jpg"
                }
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Какие сроки доставки?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Доставка по России занимает от 1 до 3 дней в зависимости от региона."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Какие способы оплаты доступны?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Мы предлагаем несколько способов оплаты: банковской картой, через электронные кошельки, а также наличными при получении."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Сколько стоит доставка?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Стоимость доставки начинается от 300₽ и зависит от региона доставки."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Можно ли вернуть товар?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании и сохранен товарный вид."
                    }
                  }
                ]
              },
              "image": "https://textiles-world.ru/subCat/delivery_payment.jpg"
            }
          `}
				</script>
			</Head>

			<div className={styles.conteiners}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{ name: 'Доставка и оплата', href: '/delivery' }
					]}
				/>

				<h1 className={styles.h2}>Доставка и оплата</h1>

				<div className={styles.flexColumn}>
					<p className={styles.textTitle}>
						Мы стараемся, чтобы процесс покупки в Textiles World был максимально удобным и простым для наших клиентов. Ознакомьтесь с важной информацией о доставке и оплате наших товаров.
					</p>

					<h2>Способы доставки</h2> 
					<ul className={styles.list}>   
						<li><b>Пункты выдачи:</b> получайте ваш заказ в удобное время в одном из наших партнерских пунктов выдачи:<b> СДЭК, Boxberry</b>.</li>
						<li><b>Доставка почтой:</b> надежная доставка через почтовую службу России.</li>
					</ul>

					<h2>Стоимость доставки</h2>
					<p className={styles.priceDeliv}> 
						Стоимость доставки начинается от <b>300₽</b> и зависит от вашего региона. 
					</p>

					<h2>Способы оплаты</h2>
					<ul className={styles.list}>
						<li>Оплата банковскими картами: Visa, MasterCard, Мир.</li> 
					</ul>

					<h2>Гарантия возврата</h2>
					<p className={styles.textTitle}> 
						Мы гарантируем возврат средств в случае, если вы получили товар ненадлежащего качества, либо если он не соответствует описанию. Возврат возможен в течение <b>14 дней</b> с момента получения заказа.
					</p>
				</div>
			</div>
		</div>
	); 
}
 