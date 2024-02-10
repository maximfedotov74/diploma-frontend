import { AdminDeleteSize } from '../admin-delete-size/ui/admin-delete-size';
import { useGetAllSizes } from './get-all-sizes-api';

export const AdminSizesList = (): JSX.Element => {
	const { data: sizes } = useGetAllSizes();
	return (
		<div>
			{sizes?.map(s => (
				<div
					className='pb-2 border-b border-primary mb-3 last:mb-0 flex items-center'
					key={s.id}
				>
					<div>{s.value}</div>
					<AdminDeleteSize size={s} />
				</div>
			))}
		</div>
	);
};
