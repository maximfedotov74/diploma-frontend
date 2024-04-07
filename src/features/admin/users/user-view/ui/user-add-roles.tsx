import { ModelUserRole } from '@/shared/api/generated';
import { useGetAllRoles } from '@/shared/api/queries/use-get-all-roles';
import { Button } from '@/shared/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { useState } from 'react';
import { useAddRoleToUser } from '../api/add-role-to-user-api';
import { cn } from '@/shared/utils/cn';

export const UserAddRoles = ({
	roles,
	userId,
	className,
}: {
	roles: ModelUserRole[];
	userId: number;
	className?: string;
}): JSX.Element => {
	const { data } = useGetAllRoles();
	const addRole = useAddRoleToUser();

	const [roleTitle, setRoleTitle] = useState<string | undefined>(undefined);

	const disableBtn = (title: string | undefined) => {
		if (title === undefined) {
			return true;
		}
		return disableItem(title);
	};

	const disableItem = (title: string) => {
		const exist = roles.find(c => c.title === title);
		if (exist) {
			return true;
		}
		return false;
	};

	const addRoleHandler = () => {
		if (roleTitle) {
			addRole({ title: roleTitle, user_id: userId });
		}
	};

	return (
		<div className={cn(className)}>
			<div className='text-xl mb-3'>Добавить роль</div>
			<Select onValueChange={setRoleTitle}>
				<SelectTrigger className='mb-3'>
					<SelectValue placeholder='Выберите роль' />
				</SelectTrigger>
				<SelectContent>
					{data?.map(r => {
						const inRoles = disableItem(r.title);
						return (
							<SelectItem key={r.id} value={r.title} disabled={inRoles}>
								{r.title}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<Button
				onClick={addRoleHandler}
				disabled={roleTitle === undefined || disableBtn(roleTitle)}
				className='w-full text-xs sm:text-sm'
			>
				Сохранить
			</Button>
		</div>
	);
};
