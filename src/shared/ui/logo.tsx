import { cn } from '../utils/cn';
import { Link } from './link';

export const Logo = ({ className }: { className?: string }): JSX.Element => {
	return (
		<div className={cn(className)}>
			<Link variant='menu' href='/' className='text-xl lg:text-3xl'>
				Fam Moda
			</Link>
		</div>
	);
};
