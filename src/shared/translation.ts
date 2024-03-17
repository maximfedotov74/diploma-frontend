import {
	ModelOrderConditions,
	ModelOrderStatusEnum,
	ModelPaymentMethodEnum,
} from './api/generated';
import { CatalogSort } from './types/catalog';

export const genderTranslate = {
	men: 'Мужчинам',
	women: 'Женщинам',
	children: 'Детям',
	everyone: 'Общие',
};

export const orderStatusTranslate: Record<
	ModelOrderStatusEnum,
	{ title: string; style: string }
> = {
	canceled: { title: 'Отменен', style: 'text-red-600' },
	completed: { title: 'Завершен', style: 'text-green-600' },
	in_processing: { title: 'В процессе', style: 'text-yellow-600' },
	on_the_way: { title: 'В пути', style: 'text-orange-600' },
	paid: { title: 'Оплачен', style: 'text-blue-600' },
	waiting_for_activation: {
		title: 'Ожидает активации',
		style: 'text-orange-600',
	},
	waiting_for_payment: { title: 'Ожидает оплаты', style: 'text-orange-600' },
};

export const orderConditionsTranslate: Record<ModelOrderConditions, string> = {
	with_fitting: 'С примеркой',
	without_fitting: 'Без примерки',
};

export const orderPaymentMethodTranslate: Record<
	ModelPaymentMethodEnum,
	string
> = {
	online: 'Онлайн оплата',
	upon_receipt: 'Оплата при получении',
};

export const catalogSortTranslate: Record<CatalogSort, string> = {
	price_asc: 'По возрастанию цены',
	price_desc: 'По убыванию цены',
	discount: 'По скидкам',
	popular: 'По популярности',
	new: 'По новизне',
};
