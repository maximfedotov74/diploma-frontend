import { AdminEditValue } from './admin-edit-value';
import { ModelOptionValue } from '@/shared/api/generated';

export const AdminCharacteristicValues = ({
	values,
}: {
	values: ModelOptionValue[];
}): JSX.Element => {
	return (
		<div>
			{values?.map(v => (
				<div key={v.id} className='flex items-center'>
					<div>{v.value}</div>
					<AdminEditValue value={v} />
				</div>
			))}
		</div>
	);
};
