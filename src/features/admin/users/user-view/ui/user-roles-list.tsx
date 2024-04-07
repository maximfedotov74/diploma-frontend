import { ModelUserRole } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteRoleFromUser } from '../api/delete-role-from-user';

export const UserRolesList = ({
	roles,
	userId,
}: {
	roles: ModelUserRole[];
	userId: number;
}): JSX.Element => {
	const deleteRoleFromUser = useDeleteRoleFromUser();
	return (
		<div>
			<div className='text-xl mb-3'>Список ролей</div>
			<div>
				{roles.map(r => (
					<div
						key={r.id}
						className='mb-3 last:mb-0 text-lg flex items-center justify-between'
					>
						<div>{r.title}</div>
						<Button
							size='icon'
							variant='ghost'
							onClick={() =>
								deleteRoleFromUser({ title: r.title, user_id: userId })
							}
						>
							<Icon icon='delete_outline_24' className='w-5 h-5' />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};
