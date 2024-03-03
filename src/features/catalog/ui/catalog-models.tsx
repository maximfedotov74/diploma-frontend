import { ProductCard } from '@/features/product-card/product-card';
import { ModelCatalogProductModel } from '@/shared/api/generated';
import { Skeleton } from '@/shared/ui/skeleton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const CatalogModels = ({
	models,
}: {
	models: ModelCatalogProductModel[];
}): JSX.Element => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const enableLoader = () => {
			setLoading(true);
		};
		const disableLoader = () => {
			setLoading(false);
		};

		router.events.on('routeChangeStart', enableLoader);
		router.events.on('routeChangeComplete', disableLoader);

		return () => {
			router.events.off('routeChangeStart', enableLoader);
			router.events.off('routeChangeComplete', disableLoader);
		};
	}, [router]);

	return (
		<div className='grid grid-cols-3 gap-y-3 gap-x-3'>
			{loading ? (
				<>
					{Array.from({ length: 9 }).map((_, idx) => (
						<Skeleton key={idx} className='h-[380px]' />
					))}
				</>
			) : (
				<>
					{models.map(m => (
						<ProductCard key={m.model_id} card={m} />
					))}
				</>
			)}
		</div>
	);
};
