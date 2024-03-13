import { countAvailablePages } from '@/shared/utils/count-available-pages';
import { Button } from '@/shared/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/shared/ui/pagination';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';

export const FeedbackPagination = ({
	page,
	pages,
	className,
}: {
	pages: number;
	page: number;
	className?: string;
}): JSX.Element => {
	const available = countAvailablePages(pages, page);

	const router = useRouter();

	const changePage = (newPage: number) => {
		router.query.page = newPage.toString();
		router.push({ pathname: router.pathname, query: router.query }, undefined, {
			shallow: true,
		});
	};

	return (
		<Pagination className={cn(className)}>
			<PaginationContent>
				{page > 1 && (
					<PaginationItem>
						<Button onClick={() => changePage(page - 1)} variant='ghost'>
							Назад
						</Button>
					</PaginationItem>
				)}
				{available.map(p => (
					<PaginationItem key={p}>
						<Button
							onClick={() => changePage(p)}
							variant={page === p ? 'outline' : 'ghost'}
						>
							{p}
						</Button>
					</PaginationItem>
				))}
				{page < pages && (
					<PaginationItem>
						<Button onClick={() => changePage(page + 1)} variant='ghost'>
							Далее
						</Button>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};
