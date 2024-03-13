import { useRouter } from 'next/router';
import { CATALOG_LIMIT } from '../constants';
import { countAvailablePages } from '@/shared/utils/count-available-pages';

export const useCatalogPagination = (total: number) => {
	const pages = total > 0 ? Math.ceil(total / CATALOG_LIMIT) : 1;

	const router = useRouter();
	const categorySlug = router.query.categorySlug as string;

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}
	const changePage = (newPage: number) => {
		const newQuery = { ...router.query };
		newQuery.page = newPage.toString();
		delete newQuery.categorySlug;

		router.push(
			{
				pathname: router.pathname.replace('[categorySlug]', categorySlug),
				query: newQuery,
			},
			undefined,
			{ scroll: false }
		);
	};

	return {
		available: countAvailablePages(pages, page),
		page,
		changePage,
		pages,
	};
};
