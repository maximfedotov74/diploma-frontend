import {
	ModelActionGender,
	ModelBrand,
	ModelCategoryModel,
	ModelCategoryRelation,
} from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/utils/cn';

import { GenderMenu } from './gender-menu';

import { CategoriesMenu } from './categories-menu';
import { Separator } from '@/shared/ui/separator';
import { BrandsMenu } from './brands-menu';
import { Link } from '@/shared/ui/link';
import { ACTIONS_ROUTE } from '@/shared/constants/routes/public';

export const MobileMenu = ({
	menu,
	topLevels,
	className,
	currentMenu,
	brands,
}: {
	menu: ModelCategoryRelation;
	topLevels: ModelCategoryModel[];
	className?: string;
	currentMenu: ModelActionGender;
	brands: ModelBrand[];
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
					<GenderMenu
						topLevels={topLevels}
						className='mb-4'
						currentMenu={currentMenu}
					/>
					<CategoriesMenu category={secondLevel} />
					<Separator className='my-3' />
					<BrandsMenu brands={brands} genderMenu={currentMenu} />
					<Separator className='my-3' />
					<Link
						className='pl-2 text-primary hover:text-primary font-medium'
						variant='menu'
						href={ACTIONS_ROUTE}
					>
						Все акции
					</Link>
				</SheetContent>
			</Sheet>
		</div>
	);
};
