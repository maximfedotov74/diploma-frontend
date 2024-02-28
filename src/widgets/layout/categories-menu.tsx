import { ModelCategoryRelation, ModelChild } from '@/shared/api/generated';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';
import { useState } from 'react';

const CategoriesMenuItem = ({ item }: { item: ModelCategoryRelation }) => {
	const [open, setOpen] = useState(false);

	return (
		<li className='mb-2 last:mb-0'>
			{item.level <= 2 ? (
				<>
					<div className='flex items-center mb-2'>
						<Button
							variant='link'
							size='sm'
							className='p-0'
							onClick={() => setOpen(p => !p)}
						>
							<TypographySmall>{item.short_title}</TypographySmall>
							<Icon icon='chevron_up_down' className='ml-2' />
						</Button>
					</div>
					{open && (
						<ul className='pl-2'>
							<li className='mb-2'>
								<Link variant='menu' href={`${CATALOG_ROUTE}/${item.slug}`}>
									{item.short_title}
								</Link>
							</li>
							{item.subcategories.map(item => (
								<CategoriesMenuItem key={item.category_id} item={item} />
							))}
						</ul>
					)}
				</>
			) : (
				<Link variant='menu' href={`${CATALOG_ROUTE}/${item.slug}`}>
					{item.short_title}
				</Link>
			)}
		</li>
	);
};

export const CategoriesMenu = ({
	category,
}: {
	category: ModelChild[];
}): JSX.Element => {
	return (
		<ul className='pl-2'>
			{category.map(item => (
				<CategoriesMenuItem key={item.category_id} item={item} />
			))}
		</ul>
	);
};
