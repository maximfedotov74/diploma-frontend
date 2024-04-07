import { ModelCreateRoleDto, postApiRole } from '@/shared/api/generated';
import { CREATE_ROLE, GET_ALL_ROLES } from '@/shared/api/query-keys/role';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateRole = () => {
	const qc = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationKey: [CREATE_ROLE],
		mutationFn: (dto: ModelCreateRoleDto) => postApiRole(dto),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [GET_ALL_ROLES],
			});
		},
	});
	return mutateAsync;
};
