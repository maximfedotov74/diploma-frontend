import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/utils/cn';
import { parseDate } from '@/shared/utils/parse-date';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const DateFilters = ({
	from,
	to,
	className,
}: {
	from?: string;
	to?: string;
	className?: string;
}): JSX.Element => {
	const router = useRouter();

	const [dateFrom, setDateFrom] = useState(parseDate(from));
	const [dateTo, setDateTo] = useState(parseDate(from));

	useEffect(() => {
		setDateTo(parseDate(to));
	}, [to]);

	useEffect(() => {
		setDateFrom(parseDate(from));
	}, [from]);

	const apply = () => {
		router.query.fromDate = dateFrom ? dateFrom.toISOString() : '';
		router.query.toDate = dateTo ? dateTo.toISOString() : '';

		router.push({ pathname: router.pathname, query: router.query }, undefined, {
			shallow: true,
		});
	};

	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + 1);
	return (
		<div className={cn('flex justify-between', className)}>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button type='button' variant='outline' className='text-left'>
							{dateFrom
								? dateFrom.toLocaleDateString('RU-ru', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
								  })
								: 'Выберите дату: от'}
						</Button>
					</PopoverTrigger>
					<PopoverContent align='start' className='p-2'>
						<Calendar
							mode='single'
							selected={dateFrom}
							onSelect={setDateFrom}
						/>
						<Button onClick={apply} className='w-full mt-3'>
							Применить
						</Button>
					</PopoverContent>
				</Popover>
			</div>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button type='button' variant='outline' className='text-left'>
							{dateTo
								? dateTo.toLocaleDateString('RU-ru', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
								  })
								: 'Выберите дату: до'}
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end' className='p-2'>
						<Calendar mode='single' selected={dateTo} onSelect={setDateTo} />
						<Button onClick={apply} className='w-full mt-3'>
							Применить
						</Button>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
