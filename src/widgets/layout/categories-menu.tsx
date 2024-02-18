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
import { TypographySmall } from '@/shared/ui/typography';
import { Link } from '@/shared/ui/link';

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
								<Link variant='menu' href='/'>
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
				<Link variant='menu' href='/'>
					{item.short_title}
				</Link>
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
	const secondLevel = menu.subcategories;

	return (
		<div className={cn(className, 'md:hidden block')}>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Icon icon='menu_outline_24' className='w-6 h-6' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='px-1 sm:px-3 py-3'>
					<GenderMenu topLevels={topLevels} className='mb-4' />
					<ul className='pl-2'>
						{secondLevel.map(item => (
							<CategoriesMenuItem key={item.category_id} item={item} />
						))}
					</ul>
				</SheetContent>
			</Sheet>
		</div>
	);
};
