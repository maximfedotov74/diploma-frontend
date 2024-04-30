import { ModelCatalogPrice } from '@/shared/api/generated';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useCatalogPriceFilter = (price: ModelCatalogPrice) => {
	const [min, setMin] = useState<number>(price.min_price);
	const [max, setMax] = useState<number>(price.max_price);

	useEffect(() => {
		setMin(price.min_price);
		setMax(price.max_price);
	}, [price]);

	const router = useRouter();

	const onMinChange = useCallback(
		(val: number) => {
			if (val < 0 || isNaN(val)) {
				setMin(price.min_price);
				return;
			}
			setMin(val);
		},
		[price.min_price]
	);

	const onMaxChange = useCallback(
		(val: number) => {
			if (val > price.max_price || val < 0 || isNaN(val)) {
				setMax(price.max_price);
				return;
			}
			setMax(val);
		},
		[price.max_price]
	);

	useEffect(() => {
		const priceQuery = router.query.price as string;

		if (priceQuery) {
			const items = priceQuery.split(',');
			let minValue = Number(items[0]);
			let maxValue = Number(items[1]);
			if (isNaN(maxValue) || isNaN(minValue)) {
				return;
			}
			onMaxChange(maxValue);
			onMinChange(minValue);
		}
	}, [router, onMaxChange, onMinChange]);

	const categorySlug = router.query.categorySlug as string;

	const submitFilters = () => {
		const queryValue = `${min},${max}`;

		const newQuery = { ...router.query };

		if (queryValue === '') {
			delete newQuery.price;
		} else {
			newQuery.price = queryValue;
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

	return {
		min,
		max,
		onMaxChange,
		onMinChange,
		submitFilters,
	};
};
