import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { AdminCharacteristicsList } from '../admin-characteristics-list/admin-characteristics-list';
import { AdminAddCharacteristic } from '../admin-add-characteristic/ui/admin-add-characteristic';
import { AdminAddSize } from '../admin-add-size/ui/admin-add-size';
import { AdminSizesList } from '../admin-sizes-list/admin-sizes-list';

export const AdminCharacteristicsHome = (): JSX.Element => {
	return (
		<Tabs defaultValue='Характеристики'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='Характеристики'>Характеристики</TabsTrigger>
				<TabsTrigger value='Размеры'>Размеры</TabsTrigger>
			</TabsList>
			<TabsContent value='Характеристики'>
				<AdminAddCharacteristic />
				<AdminCharacteristicsList />
			</TabsContent>
			<TabsContent value='Размеры'>
				<AdminAddSize />
				<AdminSizesList />
			</TabsContent>
		</Tabs>
	);
};
