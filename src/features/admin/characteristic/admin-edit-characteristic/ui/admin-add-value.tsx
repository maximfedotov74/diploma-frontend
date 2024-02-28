import { ModelOption } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AdminAddValueForm } from './admin-add-value-form';

export const AdminAddValue = ({
	option,
}: {
	option: ModelOption;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить значение характеристики
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Добавить значение к {option.title}</DialogTitle>
				</DialogHeader>
				<AdminAddValueForm option={option} />
			</DialogContent>
		</Dialog>
	);
};
