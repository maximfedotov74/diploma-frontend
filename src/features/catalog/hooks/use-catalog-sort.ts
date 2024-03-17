import { CatalogSort, catalogSort } from '@/shared/types/catalog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCatalogSort = () => {
	const [sort, setSort] = useState<CatalogSort>('popular');

	const router = useRouter();

	useEffect(() => {
		const sortQ = router.query.sort as string;

		if (sortQ && Object.hasOwn(catalogSort, sortQ)) {
			setSort(sortQ as CatalogSort);
		}
	}, [router]);

	const categorySlug = router.query.categorySlug as string;

	const onChange = (v: string) => {
		setSort(v as CatalogSort);
	};

	const submitFilters = () => {
		const newQuery = { ...router.query };
		if (sort === 'popular') {
			delete newQuery.sort;
		} else {
			newQuery.sort = sort;
		}
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
	return { submitFilters, onChange, sort };
};
