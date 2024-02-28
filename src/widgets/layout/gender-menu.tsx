import { ModelCategoryModel } from '@/shared/api/generated';
import { GenderCategoryMenu } from '@/shared/constants/genders';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/utils/cn';

export const GenderMenu = ({
	topLevels,
	className,
	currentMenu,
}: {
	topLevels: ModelCategoryModel[];
	className?: string;
	currentMenu: GenderCategoryMenu;
}): JSX.Element => {
	return (
		<nav className={cn(className)}>
			<ul className='flex items-center'>
				{topLevels.map(cat => (
					<li key={cat.category_id} className='mr-3 last:mr-0'>
						<Link
							href={`/${cat.slug}-home`}
							variant='primary'
							className={cn('text-sm sm:text-base relative', {
								'after:absolute after:top-7 after:left-0 after:h-[2px] after:bg-foreground after:w-full text-foreground':
									currentMenu === cat.slug,
							})}
						>
							{cat.short_title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
