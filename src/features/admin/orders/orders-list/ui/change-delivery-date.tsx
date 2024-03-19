import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Icon } from '@/shared/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { parseDate } from '@/shared/utils/parse-date';
import { useState } from 'react';
import { useChangeOrderDeliveryDate } from '../api/change-order-delivery-date';

export const ChangeDeliveryDate = ({
	deliveryDate,
	orderId,
}: {
	deliveryDate?: string;
	orderId: string;
}): JSX.Element => {
	const [date, setDate] = useState(parseDate(deliveryDate));

	const changeDate = useChangeOrderDeliveryDate(orderId);

	const applyDateChange = () => {
		if (date) {
			changeDate(date.toISOString());
		}
	};

	return (
		<div className='mb-3 flex'>
			<Popover>
				<PopoverTrigger asChild>
					<Button type='button' variant='outline' className='text-left'>
						{date
							? `Дата доставки ${date.toLocaleDateString('RU-ru', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
							  })}`
							: 'Выберите дату доставки'}
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='p-2'>
					<Calendar mode='single' selected={date} onSelect={setDate} />
				</PopoverContent>
			</Popover>
			<Button
				onClick={applyDateChange}
				variant='outline'
				size='icon'
				className='ml-2'
			>
				<Icon icon='done_outline_24' className='w-6 h-6' />
			</Button>
		</div>
	);
};
