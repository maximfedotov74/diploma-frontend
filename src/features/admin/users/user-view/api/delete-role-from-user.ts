import {
	ModelAddRoleToUserDto,
	deleteApiRoleRemoveFromUser,
} from '@/shared/api/generated';
import { DELETE_ROLE_FROM_USER } from '@/shared/api/query-keys/role';
import { GET_ALL_USERS } from '@/shared/api/query-keys/user';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRoleFromUser = () => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync } = useMutation({
		mutationKey: [DELETE_ROLE_FROM_USER],
		mutationFn: (dto: ModelAddRoleToUserDto) =>
			deleteApiRoleRemoveFromUser(dto),
		onSuccess: () => {
			toast({ title: 'Роль пользователя удалена успешно!' });
			qc.invalidateQueries({
				queryKey: [GET_ALL_USERS],
			});
		},
	});
	return mutateAsync;
};
