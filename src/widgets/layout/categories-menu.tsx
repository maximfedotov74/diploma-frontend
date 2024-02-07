import {
	ModelCategoryModel,
	ModelCategoryRelation,
} from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';
import { GenderMenu } from './gender-menu';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';

const CategoriesMenuItem = ({ item }: { item: ModelCategoryRelation }) => {
	const [open, setOpen] = useState(false);
	return (
		<li>
			<div className='flex items-center mb-2'>
				<Link href='/'>
					<TypographySmall>{item.title}</TypographySmall>
				</Link>
				{item.subcategories.length > 0 && (
					<Icon
						icon='chevron_up_down'
						className='ml-2'
						onClick={() => setOpen(p => !p)}
					/>
				)}
			</div>
			{open && item.subcategories.length > 0 && (
				<ul className='pl-2'>
					{item.subcategories.map(item => (
						<CategoriesMenuItem key={item.category_id} item={item} />
					))}
				</ul>
			)}
		</li>
	);
};

export const CategoriesMenu = ({
	menu,
	topLevels,
	className,
}: {
	menu: ModelCategoryRelation;
	topLevels: ModelCategoryModel[];
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn(className)}>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Icon icon='menu_outline_24' className='w-6 h-6' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='px-1 sm:px-3 py-3'>
					<GenderMenu topLevels={topLevels} className='mb-4' />
					<ul>
						{menu.subcategories.map(item => (
							<CategoriesMenuItem key={item.category_id} item={item} />
						))}
					</ul>
				</SheetContent>
			</Sheet>
		</div>
	);
};
