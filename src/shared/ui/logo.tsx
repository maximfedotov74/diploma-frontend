import { cn } from '../utils/cn';
import { SITE_NAME } from '../utils/text-formatting';
import { Link } from './link';

export const Logo = ({ className }: { className?: string }): JSX.Element => {
	return (
		<Link
			variant='menu'
			href='/'
			className={cn('text-xl lg:text-3xl', className)}
			title={`${SITE_NAME} - магазин одежды для всей семьи!`}
		>
			Fam Moda
		</Link>
	);
};
