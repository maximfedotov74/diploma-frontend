import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCatalogDiscount = () => {
	const [withDiscount, setWithDiscount] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const withDiscountQuery = router.query.is_sale as string;
		if (withDiscountQuery) {
			if (withDiscountQuery === '1') {
				setWithDiscount(true);
			}
		}
	}, [router]);

	const categorySlug = router.query.categorySlug as string;

	const changeCheked = (v: boolean) => {
		setWithDiscount(v);
	};

	const submitFilters = () => {
		const queryVal = withDiscount ? '1' : '0';
		const newQuery = { ...router.query };
		if (withDiscount) {
			newQuery.is_sale = queryVal;
		} else {
			delete newQuery.is_sale;
		}
		delete newQuery.categorySlug;
		delete newQuery.page;
		router.push(
			{
				pathname: router.pathname.replace('[categorySlug]', categorySlug),
				query: newQuery,
			},
			undefined,
			{ scroll: false }
		);
	};
	return { submitFilters, changeCheked, withDiscount };
};
