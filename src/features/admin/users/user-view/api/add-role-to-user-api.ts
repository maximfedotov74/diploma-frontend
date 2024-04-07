import {
	ModelAddRoleToUserDto,
	postApiRoleAddToUser,
} from '@/shared/api/generated';
import { ADD_ROLE_TO_USER } from '@/shared/api/query-keys/role';
import { GET_ALL_USERS } from '@/shared/api/query-keys/user';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddRoleToUser = () => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync } = useMutation({
		mutationKey: [ADD_ROLE_TO_USER],
		mutationFn: (dto: ModelAddRoleToUserDto) => postApiRoleAddToUser(dto),
		onSuccess: () => {
			toast({ title: 'Роль добавлена успешно!' });
			qc.invalidateQueries({
				queryKey: [GET_ALL_USERS],
			});
		},
	});
	return mutateAsync;
};
