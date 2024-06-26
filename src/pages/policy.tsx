import { Meta } from '@/shared/meta/meta';
import { TypographyH1, TypographyP } from '@/shared/ui/typography';
import { AuthLayout } from '@/widgets/layout/auth-layout';

const Policy = (): JSX.Element => {
	return (
		<Meta title='Пользовательское соглашение'>
			<AuthLayout>
				<TypographyH1 className='mb-8 text-2xl'>
					Пользовательское соглашение
				</TypographyH1>
				<TypographyP className='mb-5'>
					Интернет-магазин — Интернет-сайт, являющийся агрегатором информации о
					Товарах (услугах), принадлежащий Family Moda, расположенный в сети
					интернет по адресу ..., где представлены Товары, предлагаемые
					Продавцами для приобретения, а также условия оплаты и доставки Товаров
					Покупателям.
				</TypographyP>
				<TypographyP className='mb-5'>
					{`Агрегатор информации о Товарах (услугах) — сайт в
				информационно-телекоммуникационной сети "Интернет"
				... , на котором потребителю представлена в отношении
				определенного Товара возможность одновременно ознакомиться с
				предложением продавца о заключении договора купли-продажи Товара,
				заключить с продавцом договор купли-продажи, а также произвести
				предварительную оплату указанного Товара путем перевода денежных
				средств владельцу агрегатора (Family Moda) в рамках применяемых форм
				безналичных расчетов.`}
				</TypographyP>

				<TypographyP className='mb-5'>
					Аккаунт – страница Пользователя / Покупателя, доступная после
					прохождения процедуры регистрации на Сайте / в официальном мобильном
					приложении Family Moda, содержащая персональные данные и доступ к
					которой осуществляется с использованием логина и пароля, либо с
					использованием номера телефона и направленного на него кода для входа,
					равно как и доступная с помощью авторизации через иные поддерживаемые
					Сайтом / приложением сервисы. Действия, совершенные через Аккаунт,
					считаются совершенными Пользователем / Покупателем, чьи персональные
					данные указаны в Аккаунте.
				</TypographyP>

				<TypographyP className='mb-5'>
					Товар — обувь, одежда, аксессуары и иные товары, представленные к
					продаже на Сайте.
				</TypographyP>
				<TypographyP className='mb-5'>
					Заказ — должным образом оформленный запрос Покупателя на приобретение
					и доставку по указанному Покупателем адресу / посредством самовывоза
					Товаров, выбранных на Сайте.
				</TypographyP>
				<TypographyP className='mb-5'>
					Покупатель может оформить заказ в Интернет-магазине Family Moda 24
					часа в сутки, 7 дней в неделю, кроме периодов проведения регламентных
					работ или технических сбоев.
				</TypographyP>
				<TypographyP className='mb-5'>
					Предметом настоящего Соглашения является предоставление возможности
					Пользователю приобретать для личных, семейных, домашних и иных нужд,
					не связанных с осуществлением предпринимательской деятельности,
					Товары, представленные в каталоге Интернет-магазина по адресу ...
				</TypographyP>
				<TypographyP className='mb-5'>
					Данное Соглашение распространяется на все виды Товаров и услуг,
					представленных на Сайте, пока такие предложения с описанием
					присутствуют в каталоге Интернет-магазина.
				</TypographyP>
				<TypographyP className='mb-5'>
					Договор розничной купли-продажи считается заключенным с момента выдачи
					Продавцом Покупателю кассового или товарного чека либо иного
					документа, подтверждающего оплату Товара.
				</TypographyP>
			</AuthLayout>
		</Meta>
	);
};

export default Policy;
