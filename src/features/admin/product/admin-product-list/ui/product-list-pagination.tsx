import { Button } from '@/shared/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/shared/ui/pagination';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';

export const ProductListPagination = ({
	page,
	pages,
	className,
}: {
	pages: number;
	page: number;
	className?: string;
}): JSX.Element => {
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
				{Array.from({ length: pages }).map((_, idx) => (
					<PaginationItem key={idx + 1}>
						<Button
							onClick={() => changePage(idx + 1)}
							variant={page === idx + 1 ? 'outline' : 'ghost'}
						>
							{idx + 1}
						</Button>
					</PaginationItem>
				))}
				{page + 1 <= pages && (
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
