import React from 'react'
import styles from './return.module.css'

import Head from 'next/head'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'

export async function generateMetadata() {
	return {
		title: 'Возврат товара - Textiles World',
		description:
			'Политика возврата товара в интернет-магазине Textiles World. Удобный и быстрый возврат сумок в течение 3-7 дней. Узнайте больше о правилах возврата.',
		keywords:
			'возврат товара, политика возврата, возврат сумок, возврат товаров интернет-магазин, возврат денег, обмен товара',
		robots: 'index, follow',
		openGraph: {
			title: 'Возврат товара - Textiles World',
			description:
				'Узнайте все детали о возврате товара в интернет-магазине Textiles World. Возврат сумок в течение 3-7 дней с момента получения.',
			url: 'https://textiles-world.ru/return',
			type: 'website',
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'Политика возврата товара в Textiles World',
			description:
				'Возврат сумок и товаров в Textiles World легко и удобно. Узнайте больше о процессе возврата.'
		},
		alternates: {
			canonical: 'https://textiles-world.ru/return'
		}
	}
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
              "name": "Возврат товара - Textiles World",
              "url": "https://textiles-world.ru/return",
              "description": "Узнайте все о правилах возврата товаров в интернет-магазине Textiles World. Мы предлагаем быстрый и удобный возврат сумок в течение 3-7 дней.",
              "publisher": {
                "@type": "Organization",
                "name": "Textiles World",
            
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Как происходит возврат товара?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Возврат товара осуществляется в течение 3-7 рабочих дней при условии сохранения исходного состояния товара."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Как быстро вернутся деньги за товар?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Возврат денег происходит в течение 3-7 рабочих дней после получения посылки."
                    }
                  }
                ] 
              },
             
            }
          `}
				</script>
			</Head>
			<div className={styles.conteiners}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{ name: 'Возврат', href: '/about' }
					]}
				/>

				<h1 className={styles.h2}>Возврат</h1>

				<div className={styles.flexColumn}>
					<p>
						Вы можете проверить товар в пункте выдачи. Возврат товара
						осуществляется просто, без лишних оформлений. В случае необходимости
						обмена на другой товар, вам нужно вернуть товар и связаться с нами
						для дополнительных инструкций.
					</p>
					<p>
						Деньги вернутся Вам в течение 3-7 рабочих дней с момента получения
						нами вашей посылки, при условии, что товар остался в исходном
						состоянии, сохранен товарный вид, а также упаковка и фабричные
						ярлыки не повреждены.
					</p>
					<h2 className={styles.h2}>Причины замены</h2>

					<p>
						Причины замены: товар не удовлетворил покупателя по своей форме,
						размерам, стилю, цвету или комплектации.
					</p>
				</div>
			</div>
		</div>
	)
}
