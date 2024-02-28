import {
	ModelCreateUserDto,
	postApiAuthRegistration,
} from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';

export const useRegistrationApi = () => {
	const { mutateAsync: registration } = useMutation({
		mutationKey: ['registration'],
		mutationFn: (dto: ModelCreateUserDto) => postApiAuthRegistration(dto),
	});
	return registration;
};
