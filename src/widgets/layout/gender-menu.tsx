import { ModelCategoryModel } from '@/shared/api/generated';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const GenderMenu = ({
	topLevels,
	className,
}: {
	topLevels: ModelCategoryModel[];
	className?: string;
}): JSX.Element => {
	const [active, setActive] = useState<string>('men');
	const router = useRouter();

	useEffect(() => {}, [router]);

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
									active === cat.slug,
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
