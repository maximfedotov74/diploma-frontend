import { ModelOptionValue } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { AdminEditValueForm } from './admin-edit-value-form';

export const AdminEditValue = ({
	value,
}: {
	value: ModelOptionValue;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='ml-auto' variant='ghost' size='icon'>
					<Icon icon='more' className='w-6 h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Значение: {value.value}</DialogTitle>
				</DialogHeader>
				<AdminEditValueForm value={value} />
			</DialogContent>
		</Dialog>
	);
};
