import { ProductCard } from '@/features/product-card/product-card';
import { ModelCatalogProductModel } from '@/shared/api/generated';
import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CATALOG_LIMIT } from '../constants';

export const CatalogModels = ({
	models,
	className,
}: {
	models: ModelCatalogProductModel[];
	className?: string;
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
		<div
			className={cn(
				'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-3',
				className
			)}
		>
			{loading ? (
				<>
					{Array.from({ length: CATALOG_LIMIT }).map((_, idx) => (
						<Skeleton key={idx} className='h-[400px]' />
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
