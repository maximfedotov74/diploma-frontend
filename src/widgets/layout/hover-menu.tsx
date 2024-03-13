import { ModelBrand, ModelCategoryRelation } from '@/shared/api/generated';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { Link } from '@/shared/ui/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/shared/ui/navigation-menu';

export const HoverMenu = ({
	menu,
	brands,
}: {
	brands: ModelBrand[];
	menu: ModelCategoryRelation;
}): JSX.Element => {
	const secondLevel = menu.subcategories;

	return (
		<div className='mt-8 md:block hidden'>
			<NavigationMenu>
				<NavigationMenuList>
					{secondLevel.map(pc => (
						<NavigationMenuItem key={pc.category_id}>
							<NavigationMenuTrigger>{pc.short_title}</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='p-3 w-full lg:w-[500px]'>
									<li className='mb-2'>
										<Link href={`${CATALOG_ROUTE}/${pc.slug}`} variant='menu'>
											{pc.short_title}
										</Link>
									</li>
									{pc.subcategories.map(cc => (
										<li key={cc.category_id} className='mb-2 last:mb-0'>
											<Link href={`${CATALOG_ROUTE}/${cc.slug}`} variant='menu'>
												{cc.short_title}
											</Link>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}

					{brands && brands.length > 0 && (
						<NavigationMenuItem>
							<NavigationMenuTrigger>Бренды</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='p-3 w-full lg:w-[500px]'>
									{brands.map(b => (
										<li key={b.id} className='mb-2 last:mb-0'>
											<Link href={`/`} variant='menu'>
												{b.title}
											</Link>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
