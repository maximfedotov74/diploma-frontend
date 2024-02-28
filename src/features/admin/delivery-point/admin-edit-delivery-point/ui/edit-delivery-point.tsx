import { ModelDeliveryPoint } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { EditDeliveryPointForm } from './edit-delivery-point-form';

export const EditDeliveryPoint = ({
	point,
}: {
	point: ModelDeliveryPoint;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='absolute top-2 right-1' variant='ghost' size='icon'>
					<Icon icon='more' className='w-6 h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{point.title}</DialogTitle>
				</DialogHeader>
				<EditDeliveryPointForm point={point} />
			</DialogContent>
		</Dialog>
	);
};
