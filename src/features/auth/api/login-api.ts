import { ModelLoginDto, postApiAuthLogin } from '@/shared/api/generated';
import { LOGIN, USER_PROFILE } from '@/shared/api/query-keys/user';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useLoginApi = () => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { replace } = useRouter();
	const { mutateAsync: login } = useMutation({
		mutationKey: [LOGIN],
		mutationFn: (dto: ModelLoginDto) => postApiAuthLogin(dto),
		onSuccess: () => {
			replace('/');
			qc.invalidateQueries({ queryKey: [USER_PROFILE] });
		},
		onError: e => {
			toast({ title: e.message });
		},
	});
	return login;
};
