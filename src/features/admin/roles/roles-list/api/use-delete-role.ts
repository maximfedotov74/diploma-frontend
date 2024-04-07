import { deleteApiRoleId } from '@/shared/api/generated';
import { DELETE_ROLE, GET_ALL_ROLES } from '@/shared/api/query-keys/role';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRole = () => {
	const qc = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationKey: [DELETE_ROLE],
		mutationFn: (id: number) => deleteApiRoleId(id),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [GET_ALL_ROLES],
			});
		},
	});
	return mutateAsync;
};
