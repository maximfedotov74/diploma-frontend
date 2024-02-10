import { useGetCharacteristic } from '../api/get-characteristic-by-slug-api';
import { AdminEditValue } from './admin-edit-value';

export const AdminCharacteristicValues = ({
	id,
}: {
	id: number;
}): JSX.Element => {
	const { data: option } = useGetCharacteristic(id);
	return (
		<div>
			{option?.values?.map(v => (
				<div key={v.id} className='flex items-center'>
					<div>{v.value}</div>
					<AdminEditValue value={v} />
				</div>
			))}
		</div>
	);
};
