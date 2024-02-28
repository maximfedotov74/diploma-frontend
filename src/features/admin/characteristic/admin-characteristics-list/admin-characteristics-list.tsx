import { AdminEditCharacteristic } from '../admin-edit-characteristic/ui/admin-edit-characteristic';
import { useGetAllCharacteristics } from '@/shared/api/queries/get-characteristics-list-api';

export const AdminCharacteristicsList = (): JSX.Element => {
	const { data: options } = useGetAllCharacteristics();

	return (
		<div>
			{options?.map(o => (
				<div
					className='pb-2 border-b border-primary mb-3 last:mb-0 flex items-center'
					key={o.id}
				>
					<div>{o.title}</div>
					<AdminEditCharacteristic option={o} />
				</div>
			))}
		</div>
	);
};
