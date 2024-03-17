import { useRouter } from 'next/router';
import { useGetAllOrders } from '../api/get-all-orders';
import { BasePagination } from '@/shared/ui/base-pagination';
import { OrderList } from './order-list';
import { DateFilters } from './date-filters';

export const OrdersView = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	let fromDate: undefined | string;

	if (router.query.fromDate && typeof router.query.fromDate === 'string') {
		fromDate = router.query.fromDate;
	}

	let toDate: undefined | string;

	if (router.query.toDate && typeof router.query.toDate === 'string') {
		toDate = router.query.toDate;
	}

	const { data, isLoading } = useGetAllOrders(page, fromDate, toDate);

	const pages = data?.total
		? data.total > 0
			? Math.ceil(data?.total / 8)
			: 1
		: 0;

	return (
		<div className='mb-10'>
			<div className='my-4 text-xl'>Всего: {data?.total}</div>
			<DateFilters from={fromDate} to={toDate} className='mb-5' />
			<OrderList orders={data?.orders} isLoading={isLoading} />
			<BasePagination page={page} pages={pages} className='mt-4' />
		</div>
	);
};
