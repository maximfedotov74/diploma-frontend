import { ModelCategoryRelation } from '@/shared/api/generated';
import { useGetAllCategories } from '@/shared/api/queries/get-all-categories';
import { useState } from 'react';
import { EditCategory } from '../admin-edit-category/ui/edit-category';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

const CategoriesListItem = ({ item }: { item: ModelCategoryRelation }) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className='flex items-center mb-2'>
				<Button
					variant='link'
					size='sm'
					onClick={() =>
						setOpen(current => {
							if (item.subcategories.length <= 0) {
								return current;
							}
							return !current;
						})
					}
				>
					{item.short_title}
				</Button>
				<div className='ml-auto flex items-center'>
					<EditCategory category={item} />
					<Icon
						icon={open ? 'chevron_up_small_24' : 'chevron_down_small_24'}
						className='h-4 w-4 md:w-6 md:h-6'
					/>
				</div>
			</div>
			{open && item.subcategories.length > 0 && (
				<div className='pl-2 md:pl-3 w-[calc(100%-1rem)]'>
					{item.subcategories.map(c => (
						<CategoriesListItem item={c} key={c.category_id} />
					))}
				</div>
			)}
		</div>
	);
};

export const CategoriesList = (): JSX.Element => {
	const { data: categories } = useGetAllCategories();

	return (
		<div>
			{categories?.map(c => (
				<CategoriesListItem key={c.category_id} item={c} />
			))}
		</div>
	);
};
