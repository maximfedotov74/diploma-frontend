import { ModelCatalogChild } from '@/shared/api/generated';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';

const CatalogCategoriesMenuItem = ({
	item,
	currentSlug,
}: {
	item: ModelCatalogChild;
	currentSlug: string;
}) => {
	const [open, setOpen] = useState(item.active);

	return (
		<li className='mb-2 last:mb-0'>
			{item.subcategories.length > 0 ? (
				<>
					<div
						className={cn('flex items-center mb-2', {
							'bg-primary text-secondary hover:text-secondary p-2 rounded-sm':
								currentSlug === item.slug,
						})}
					>
						<Link
							variant='menu'
							className={cn({
								'hover:text-secondary': currentSlug === item.slug,
							})}
							href={`${CATALOG_ROUTE}/${item.slug}`}
						>
							{item.short_title}
						</Link>
						<button onClick={() => setOpen(p => !p)} className='ml-auto'>
							<Icon
								icon={open ? 'chevron_up_small_24' : 'chevron_down_small_24'}
								className='w-5 h-5'
							/>
						</button>
					</div>
					{open && (
						<ul className='pl-2'>
							{item.subcategories.map(item => (
								<CatalogCategoriesMenuItem
									key={item.category_id}
									item={item}
									currentSlug={currentSlug}
								/>
							))}
						</ul>
					)}
				</>
			) : (
				<Link
					variant='menu'
					href={`${CATALOG_ROUTE}/${item.slug}`}
					className={cn('block', {
						'bg-primary text-secondary hover:text-secondary p-2 rounded-sm':
							currentSlug === item.slug,
					})}
				>
					{item.short_title}
				</Link>
			)}
		</li>
	);
};

export const CatalogCategoriesMenu = ({
	categories,
	currentSlug,
}: {
	categories: ModelCatalogChild[];
	currentSlug: string;
}): JSX.Element => {
	return (
		<ul className='pl-2'>
			{categories.map(item => (
				<CatalogCategoriesMenuItem
					currentSlug={currentSlug}
					key={item.category_id}
					item={item}
				/>
			))}
		</ul>
	);
};
