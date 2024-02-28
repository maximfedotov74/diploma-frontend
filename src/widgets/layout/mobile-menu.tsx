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
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { CategoriesMenu } from './categories-menu';

export const MobileMenu = ({
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
					<CategoriesMenu category={secondLevel} />
				</SheetContent>
			</Sheet>
		</div>
	);
};
