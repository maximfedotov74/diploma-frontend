import { ModelCategoryRelation } from '@/shared/api/generated';
import { Link } from '@/shared/ui/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/shared/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description:
			'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description:
			'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
];

export const HoverMenu = ({
	menu,
}: {
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
										<Link href='/' variant='menu'>
											{pc.short_title}
										</Link>
									</li>
									{pc.subcategories.map(cc => (
										<li key={cc.category_id} className='mb-2 last:mb-0'>
											<Link href='/' variant='menu'>
												{cc.short_title}
											</Link>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
