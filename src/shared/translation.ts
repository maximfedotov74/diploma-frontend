import { ModelOrderStatusEnum } from './api/generated';

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
