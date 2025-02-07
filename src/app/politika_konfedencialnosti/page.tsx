import React from 'react';
import styles from './politikakonfedencialnosti.module.css';

import Head from 'next/head';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export async function generateMetadata() {
	return {
		title: 'Политика конфиденциальности - Textiles World',
		description:
			'Политика конфиденциальности интернет-магазина Textiles World. Узнайте, как мы защищаем вашу личную информацию.',
		keywords:
			'политика конфиденциальности, защита данных, конфиденциальность интернет-магазина',
		robots: 'index, follow',
		openGraph: {
			title: 'Политика конфиденциальности - Textiles World',
			description:
				'Узнайте, как мы защищаем вашу личную информацию на сайте Textiles World.',
			url: 'https://textiles-world.ru/politika_konfedencialnosti',
			type: 'website',
			siteName: 'Textiles World'
		},
		twitter: {
			card: 'summary',
			title: 'Политика конфиденциальности в Textiles World',
			description:
				'Узнайте больше о нашей политике защиты данных и конфиденциальности.'
		},
		alternates: {
			canonical: 'https://textiles-world.ru/politika_konfedencialnosti'
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
              "name": "Политика конфиденциальности - Textiles World",
              "url": "https://textiles-world.ru/politika_konfedencialnosti",
              "description": "Политика конфиденциальности интернет-магазина Textiles World. Узнайте, как мы защищаем вашу личную информацию.",
              "publisher": {
                "@type": "Organization",
                "name": "Textiles World",
              }
            }
          `}
				</script>
			</Head>

			<div className={styles.conteiners}>
				<Breadcrumbs
					paths={[
						{ name: 'Главная', href: '/' },
						{
							name: 'Политика конфиденциальности',
							href: '/politika_konfedencialnosti'
						}
					]}
				/>

				<h1 className={styles.h2}>
					Политика конфиденциальности персональных данных
				</h1>

				<div className={styles.flexColumn}>
					<p>
						Настоящая Политика конфиденциальности персональных данных (далее –
						Политика конфиденциальности) действует в отношении всей информации,
						которую сайт интернет-магазин штор и товаров для дома
						textiles-world, (далее – textiles world) расположенный на доменном
						имени textiles-world.ru (а также его субдоменах), может получить о
						Пользователе во время использования сайта textiles-world.ru (а также
						его субдоменов), его программ и его продуктов.
					</p>

					<ul> 
						<li>
							<strong>«Администрация сайта»</strong> (далее – Администрация) –
							уполномоченные сотрудники на управление сайтом интернет-магазин
							штор и товаров для дома textiles world, действующие от имени ИП
							Медведев Р.Н., которые организуют и (или) осуществляют обработку
							персональных данных, а также определяют цели обработки
							персональных данных, состав персональных данных, подлежащих
							обработке, действия (операции), совершаемые с персональными
							данными.
						</li>
						<li>
							<strong>«Персональные данные»</strong> - любая информация,
							относящаяся к прямо или косвенно определенному, или определяемому
							физическому лицу (субъекту персональных данных).
						</li>
						<li>
							<strong>«Обработка персональных данных»</strong> - любое действие
							(операция) или совокупность действий (операций), совершаемых с
							использованием средств автоматизации или без использования таких
							средств с персональными данными, включая сбор, запись,
							систематизацию, накопление, хранение, уточнение (обновление,
							изменение), извлечение, использование, передачу (распространение,
							предоставление, доступ), обезличивание, блокирование, удаление,
							уничтожение персональных данных.
						</li>
						<li>
							<strong>«Конфиденциальность персональных данных»</strong> -
							обязательное для соблюдения Оператором или иным получившим доступ
							к персональным данным лицом требование не допускать их
							распространения без согласия субъекта персональных данных или
							наличия иного законного основания.
						</li>
						<li>
							<strong>
								«Сайт интернет-магазин штор и товаров для дома textiles world
							</strong>{' '}
							- это совокупность связанных между собой веб-страниц, размещенных
							в сети Интернет по уникальному адресу (URL): textiles-world.ru, а
							также его субдоменах.
						</li>
						<li>
							<strong>«Субдомены»</strong> - это страницы или совокупность
							страниц, расположенные на доменах третьего уровня, принадлежащие
							сайту интернет-магазин штор и товаров для дома textiles world, а
							также другие временные страницы, внизу которых указана контактная
							информация Администрации.
						</li>
						<li>
							<strong>
								«Пользователь сайта интернет-магазин штор и товаров для дома
								textiles world
							</strong>{' '}
							(далее Пользователь) – лицо, имеющее доступ к сайту
							интернет-магазин штор и товаров для дома textiles world,
							посредством сети Интернет и использующее информацию, материалы и
							продукты сайта интернет-магазин штор и товаров для дома textiles
							world.
						</li>
						<li>
							<strong>«Cookies»</strong> — небольшой фрагмент данных,
							отправленный веб-сервером и хранимый на компьютере пользователя,
							который веб-клиент или веб-браузер каждый раз пересылает
							веб-серверу в HTTP-запросе при попытке открыть страницу
							соответствующего сайта.
						</li>
						<li>
							<strong>«IP-адрес»</strong> — уникальный сетевой адрес узла в
							компьютерной сети, через который Пользователь получает доступ на
							textiles world.
						</li>
						<li>
							<strong>«Товар»</strong> - продукт, который Пользователь
							заказывает на сайте и оплачивает через платёжные системы.
						</li>
					</ul>

					<h2>Общие положения</h2>
					<p>
						Использование сайта интернет-магазин штор и товаров для дома
						textiles world Пользователем означает согласие с настоящей Политикой
						конфиденциальности и условиями обработки персональных данных
						Пользователя. В случае несогласия с условиями Политики
						конфиденциальности Пользователь должен прекратить использование
						сайта интернет-магазин штор и товаров для дома textiles world.
					</p>
					<p>
						Настоящая Политика конфиденциальности применяется к сайту
						интернет-магазин штор и товаров для дома textiles world. textiles
						world не контролирует и не несет ответственность за сайты третьих
						лиц, на которые Пользователь может перейти по ссылкам, доступным на
						сайте интернет-магазин штор и товаров для дома textiles world.
					</p>
					<p>
						Администрация не проверяет достоверность персональных данных,
						предоставляемых Пользователем.
					</p>

					<h2>Предмет политики конфиденциальности</h2>
					<p>
						Настоящая Политика конфиденциальности устанавливает обязательства
						Администрации по неразглашению и обеспечению режима защиты
						конфиденциальности персональных данных, которые Пользователь
						предоставляет по запросу Администрации при регистрации на сайте
						интернет-магазин штор и товаров для дома textiles world, при
						подписке на информационную e-mail рассылку или при оформлении
						заказа.
					</p>
					<p>
						Персональные данные, разрешённые к обработке в рамках настоящей
						Политики конфиденциальности, предоставляются Пользователем путём
						заполнения форм на сайте интернет-магазин штор и товаров для дома
						textiles world и включают в себя следующую информацию:
					</p>
					<ul>
						<li>фамилию, имя, отчество Пользователя;</li>
						<li>контактный телефон Пользователя;</li>
						<li>адрес электронной почты (e-mail);</li>
						<li>место жительство Пользователя (при необходимости);</li>
						<li>адрес доставки Товара (при необходимости);</li>
						<li>фотографию (при необходимости).</li>
					</ul>
					<p>
						textiles world защищает Данные, которые автоматически передаются при
						посещении страниц:
					</p>
					<ul>
						<li>IP адрес;</li>
						<li>информация из cookies;</li>
						<li>информация о браузере;</li>
						<li>время доступа;</li>
						<li>реферер (адрес предыдущей страницы).</li>
					</ul>
					<p>
						Отключение cookies может повлечь невозможность доступа к частям
						сайта, требующим авторизации.
					</p>
					<p>
						textiles world осуществляет сбор статистики об IP-адресах своих
						посетителей. Данная информация используется с целью предотвращения,
						выявления и решения технических проблем.
					</p>
					<p>
						Любая иная персональная информация неоговоренная выше (история
						посещения, используемые браузеры, операционные системы и т.д.)
						подлежит надежному хранению и нераспространению, за исключением
						случаев, предусмотренных в п.п. 5.2. и 5.3. настоящей Политики
						конфиденциальности.
					</p>

					<h2>Цели сбора персональной информации пользователя</h2>
					<p>
						Персональные данные Пользователя Администрация может использовать в
						целях:
					</p>
					<ul>
						<li>
							Идентификации Пользователя, зарегистрированного на сайте
							интернет-магазин штор и товаров для дома textiles world для его
							дальнейшей авторизации, оформления заказа и других действий.
						</li>
						<li>
							Предоставления Пользователю доступа к персонализированным данным
							сайта интернет-магазин штор и товаров для дома textiles world.
						</li>
						<li>
							Установления с Пользователем обратной связи, включая направление
							уведомлений, запросов, касающихся использования сайта
							интернет-магазин штор и товаров для дома textiles world, оказания
							услуг и обработки запросов и заявок от Пользователя.
						</li>
						<li>
							Определения места нахождения Пользователя для обеспечения
							безопасности, предотвращения мошенничества.
						</li>
						<li>
							Подтверждения достоверности и полноты персональных данных,
							предоставленных Пользователем.
						</li>
						<li>
							Создания учетной записи для использования частей сайта
							интернет-магазин штор и товаров для дома textiles world, если
							Пользователь дал согласие на создание учетной записи.
						</li>
						<li>Уведомления Пользователя по электронной почте.</li>
						<li>
							Предоставления Пользователю эффективной технической поддержки при
							возникновении проблем, связанных с использованием сайта
							интернет-магазин штор и товаров для дома textiles world.
						</li>
						<li>
							Предоставления Пользователю с его согласия специальных
							предложений, информации о ценах, новостной рассылки и иных
							сведений от имени сайта интернет-магазин штор и товаров для дома
							textiles world.
						</li>
						<li>
							Осуществления рекламной деятельности с согласия Пользователя.
						</li>
					</ul>

					<h2>Способы и сроки обработки персональных данных</h2>
					<p>
						Обработка персональных данных осуществляется без ограничения срока,
						любым законным способом, в том числе в информационных системах
						персональных данных с использованием средств автоматизации или без
						использования таких средств.
					</p>
					<p>
						Персональные данные Пользователя обрабатываются в соответствии с
						условиями действующего законодательства Российской Федерации.
					</p>

					<h2>Передача персональных данных</h2>
					<p>
						Персональные данные Пользователя не передаются третьим лицам, кроме
						следующих случаев:
					</p>
					<ul>
						<li>
							По запросу судебных органов и органов следствия в случаях,
							предусмотренных законодательством Российской Федерации.
						</li>
						<li>
							В случае необходимости защиты прав и законных интересов сайта
							интернет-магазин штор и товаров для дома textiles world в рамках
							гражданского процесса.
						</li>
						<li>
							В случае приобретения сайта интернет-магазин штор и товаров для
							дома textiles world третьими лицами, что подразумевает передачу
							личной информации Пользователя потенциальному покупателю.
						</li>
						<li>
							В иных случаях, предусмотренных законодательством Российской
							Федерации.
						</li>
					</ul>

					<h2>Изменение и удаление персональных данных</h2>
					<p>
						Пользователь может в любой момент изменить (обновить, дополнить)
						предоставленные им персональные данные или их часть, а также
						параметры конфиденциальности.
					</p>
					<p>
						Пользователь имеет право на удаление своей учетной записи, а также
						на удаление всех персональных данных, предоставленных Администрации,
						обратившись с соответствующим запросом к Администрации.
					</p>

					<h2>Изменение политики конфиденциальности</h2>
					<p>
						Настоящая Политика конфиденциальности может быть изменена
						Администрацией без предварительного согласования с Пользователем.
					</p>
					<p>
						Новая Политика конфиденциальности вступает в силу с момента ее
						размещения на сайте интернет-магазин штор и товаров для дома
						textiles-world, если иное не предусмотрено условиями настоящей
						Политики конфиденциальности.
					</p>

					<h2>Обратная связь. Заключительные положения</h2>
					<p>
						Все предложения или вопросы по поводу настоящей Политики
						конфиденциальности следует сообщать Администрации сайта
						интернет-магазин штор и товаров для дома textiles-world по следующим
						контактным данным:
					</p>
					<p>Телефон: +7 993 950-31-08</p>
					<p>
						Использование сайта интернет-магазин штор и товаров для дома
						означает принятие всех условий данной Политики конфиденциальности.
					</p>
				</div>
			</div>
		</div>
	);
}
