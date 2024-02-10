import { ModelOption } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { AdminEditCharacteristicForm } from './admin-edit-characteristic-form';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { AdminCharacteristicValues } from './admin-characteristic-values';
import { AdminAddValue } from './admin-add-value';

export const AdminEditCharacteristic = ({
	option,
}: {
	option: ModelOption;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='ml-auto' variant='ghost' size='icon'>
					<Icon icon='more' className='h-4 w-4 md:w-6 md:h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{option.title}</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue='Характеристика'>
					<TabsList className='grid w-full grid-cols-2 mb-5'>
						<TabsTrigger value='Характеристика'>Характеристика</TabsTrigger>
						<TabsTrigger value='Значения'>Значения</TabsTrigger>
					</TabsList>
					<TabsContent value='Характеристика'>
						<AdminEditCharacteristicForm option={option} />
					</TabsContent>
					<TabsContent value='Значения'>
						<AdminAddValue option={option} />
						<AdminCharacteristicValues id={option.id} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
