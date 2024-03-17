import { useRouter } from 'next/router';
import { useGetAllFeedback } from '../api/get-all-feedback';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { TypographySmall } from '@/shared/ui/typography';
import { FeedbackFilter, FeedbackOrder } from '@/shared/types/feedback';
import { Icon } from '@/shared/ui/icon';
import { FeedbackList } from './feedback-list';
import { BasePagination } from '@/shared/ui/base-pagination';

export const FeedbackView = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	let filter = 'all';

	if (router.query.filter) {
		if (Object.hasOwn(FeedbackFilter, router.query.filter as string)) {
			filter = router.query.filter.toString();
		}
	}

	let order = 'asc';

	if (router.query.order) {
		if (Object.hasOwn(FeedbackOrder, router.query.order as string)) {
			order = router.query.order.toString();
		}
	}

	const changeFilter = (v: string) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, filter: v, page: '1' },
			},
			undefined,
			{ shallow: true }
		);
	};

	const changeOrder = (v: string) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, order: v },
			},
			undefined,
			{ shallow: true }
		);
	};

	const { data } = useGetAllFeedback(page, filter, order);

	const pages = data?.total
		? data.total > 0
			? Math.ceil(data?.total / 8)
			: 1
		: 0;

	return (
		<div>
			<TypographySmall className='block my-2'>Фильтр</TypographySmall>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='sm'>
						{FeedbackFilter[filter]}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className='max-h-[200px] overflow-y-scroll'
					align='start'
				>
					{Object.keys(FeedbackFilter).map(v => (
						<DropdownMenuItem
							key={v}
							className='flex items-center'
							onClick={() => changeFilter(v)}
						>
							{filter === v && (
								<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
							)}
							<div>{FeedbackFilter[v]}</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<TypographySmall className='block my-2'>Сортировка</TypographySmall>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='sm'>
						{FeedbackOrder[order]}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className='max-h-[200px] overflow-y-scroll'
					align='start'
				>
					{Object.keys(FeedbackOrder).map(v => (
						<DropdownMenuItem
							key={v}
							className='flex items-center'
							onClick={() => changeOrder(v)}
						>
							{order === v && (
								<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
							)}
							<div>{FeedbackOrder[v]}</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<div className='mt-5'>
				<FeedbackList feedback={data?.feedback || []} />
				<BasePagination page={page} pages={pages} className='mt-4' />
			</div>
		</div>
	);
};
