import {
	ModelUpdateUserDto,
	patchApiUserProfile,
} from '@/shared/api/generated';
import { EDIT_USER_PROFILE, USER_PROFILE } from '@/shared/api/query-keys/user';
import { AUTH_ROUTE } from '@/shared/constants/routes/public';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useEditProfileApi = () => {
	const queryCLient = useQueryClient();
	const router = useRouter();

	const { mutateAsync: editProfile } = useMutation({
		mutationKey: [EDIT_USER_PROFILE],
		mutationFn: (dto: ModelUpdateUserDto) => patchApiUserProfile(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [USER_PROFILE] });
		},
		onError: err => {
			if ('status' in err) {
				if (err.status === 401) {
					router.push(AUTH_ROUTE);
				}
			}
		},
	});
	return editProfile;
};
