import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useFilters = (
	key: string,
	type: 'number' | 'string' = 'number'
) => {
	const router = useRouter();
	const [selected, setSelected] = useState<Record<string, any>>({});

	useEffect(() => {
		const currentQuery = router.query[key] as string;
		if (currentQuery) {
			const items = currentQuery.split(',');
			const newSelected: Record<string, any> = {};
			items.forEach(v => {
				if (type === 'number') {
					let value = Number(v);

					if (!isNaN(value)) {
						newSelected[value] = value;
					}
				} else {
					newSelected[v] = v;
				}
			});
			setSelected(newSelected);
		} else {
			setSelected({});
		}
	}, [router, type, key]);

	const checked = (key: string) => {
		return Object.hasOwn(selected, key);
	};

	const onChecked = (id: number | string) => {
		if (checked(id.toString())) {
			const newState = { ...selected };
			delete newState[id.toString()];
			setSelected(newState);
			return;
		}
		const newState = { ...selected };
		newState[id.toString()] = id;
		setSelected(newState);
	};

	const categorySlug = router.query.categorySlug as string;

	const submitFilters = () => {
		const queryValue = Object.values(selected).join(',');

		const newQuery = { ...router.query };

		if (queryValue === '') {
			delete newQuery[key];
		} else {
			newQuery[key] = queryValue;
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

	return { submitFilters, checked, onChecked };
};
