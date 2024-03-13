import { Button } from '@/shared/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/shared/ui/pagination';
import { cn } from '@/shared/utils/cn';
import { useCatalogPagination } from '../hooks/use-pagination-filter';

export const CatalogPagination = ({
	total,
	className,
}: {
	className?: string;
	total: number;
}): JSX.Element => {
	const { available, changePage, page, pages } = useCatalogPagination(total);
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
