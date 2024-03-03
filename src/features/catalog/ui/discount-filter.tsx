import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const DiscountFilter = (): JSX.Element => {
	const [withDiscount, setWithDiscount] = useState(false);

	const router = useRouter();

	console.log(router.query);

	useEffect(() => {
		const withDiscountQuery = router.query.is_sale as string;
		if (withDiscountQuery) {
			if (withDiscountQuery === '1') {
				setWithDiscount(true);
			}
		} else {
			setWithDiscount(false);
		}
	}, [router]);

	const categorySlug = router.query.categorySlug as string;

	const changeCheked = (v: boolean) => {
		setWithDiscount(v);
		const queryVal = v ? '1' : '0';
		const newQuery = { ...router.query };

		if (v) {
			newQuery.is_sale = queryVal;
		} else {
			delete newQuery.is_sale;
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

	return (
		<div className='flex items-center border border-foreground/60 py-2 px-3 rounded-sm mr-2 mb-2'>
			<Checkbox
				id='with-discount-checkbox'
				checked={withDiscount}
				onCheckedChange={changeCheked}
			/>
			<Label htmlFor='with-discount-checkbox' className='ml-2'>
				Со скидкой
			</Label>
		</div>
	);
};
