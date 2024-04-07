import {
	ModelCreateUserDto,
	postApiAuthRegistration,
} from '@/shared/api/generated';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useRegistrationApi = () => {
	const { toast } = useToast();

	const { mutateAsync: registration } = useMutation({
		mutationKey: ['registration'],
		mutationFn: (dto: ModelCreateUserDto) => postApiAuthRegistration(dto),
		onSuccess: () => {
			toast({
				title: 'Вы успешно зарегистрированы!',
			});
		},
	});
	return registration;
};
