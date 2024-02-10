import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/shared/ui/pagination';
import { cn } from '@/shared/utils/cn';

export const ProductListPagination = ({
	page,
	pages,
	className,
}: {
	pages: number;
	page: number;
	className?: string;
}): JSX.Element => {
	return (
		<Pagination className={cn(className)}>
			<PaginationContent>
				{page > 1 && (
					<PaginationItem>
						<PaginationPrevious href={`/admin/products/?page=${page - 1}`} />
					</PaginationItem>
				)}
				{Array.from({ length: pages }).map((_, idx) => (
					<PaginationItem key={idx + 1}>
						<PaginationLink
							href={`/admin/products/?page=${idx + 1}`}
							isActive={page === idx + 1}
						>
							{idx + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{page + 1 <= pages && (
					<PaginationItem>
						<PaginationNext href={`/admin/products/?page=${page + 1}`} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};
