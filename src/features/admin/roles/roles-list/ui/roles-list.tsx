import { Button } from '@/shared/ui/button';
import { useDeleteRole } from '../api/use-delete-role';
import { useGetAllRoles } from '../../../../../shared/api/queries/use-get-all-roles';
import { Icon } from '@/shared/ui/icon';

export const RolesList = (): JSX.Element => {
	const { data } = useGetAllRoles();

	const deleteRole = useDeleteRole();

	return (
		<div className='my-10'>
			{data?.map(r => (
				<div
					key={r.id}
					className='mb-3 last:mb-0 text-lg flex items-center justify-between'
				>
					<div>{r.title}</div>
					<Button size='icon' variant='ghost' onClick={() => deleteRole(r.id)}>
						<Icon icon='delete_outline_24' className='w-5 h-5' />
					</Button>
				</div>
			))}
		</div>
	);
};
