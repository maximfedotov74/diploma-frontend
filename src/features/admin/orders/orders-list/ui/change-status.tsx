import { ModelOrderStatusEnum } from '@/shared/api/generated';
import { useChangeOrderStatus } from '../api/change-order-status';
import { orderStatusTranslate } from '@/shared/translation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

export const ChangeStatus = ({
	orderId,
	currentStatus,
}: {
	orderId: string;
	currentStatus: ModelOrderStatusEnum;
}): JSX.Element => {
	const changeStatus = useChangeOrderStatus(orderId);

	const statuses = Object.keys(orderStatusTranslate).map(key => ({
		title: orderStatusTranslate[key as ModelOrderStatusEnum].title,
		value: key,
		color: orderStatusTranslate[key as ModelOrderStatusEnum].style,
	}));

	const [status, setStatus] = useState<string>(currentStatus);

	return (
		<div className='max-w-xs flex'>
			<Select onValueChange={setStatus} value={status}>
				<SelectTrigger className={cn('mb-3 max-w-[260px]')}>
					<SelectValue placeholder='Статус' />
				</SelectTrigger>
				<SelectContent className='max-w-[260px]'>
					{statuses.map(s => (
						<SelectItem
							key={s.value}
							value={s.value}
							className='flex items-center'
						>
							<div className={cn(s.color)}>{s.title}</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				variant='outline'
				size='icon'
				className='ml-2'
				onClick={() => changeStatus(status as ModelOrderStatusEnum)}
			>
				<Icon icon='done_outline_24' className='w-6 h-6' />
			</Button>
		</div>
	);
};
