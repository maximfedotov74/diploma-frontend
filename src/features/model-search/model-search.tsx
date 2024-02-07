import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

export const ModelSearch = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn(className, 'flex items-center')}>
			<Input type='text' className='mr-2' />
			<Button className='' variant='ghost' size='icon'>
				<Icon icon='search_outline_24' className='w-6 h-6' />
			</Button>
		</div>
	);
};
