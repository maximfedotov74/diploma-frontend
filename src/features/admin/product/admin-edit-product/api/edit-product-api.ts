import {
	ModelUpdateProductDto,
	patchApiProductId,
} from '@/shared/api/generated';
import { ADMIN_PRODUCTS, EDIT_PRODUCT } from '@/shared/api/query-keys/product';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditProductApi = () => {
	const queryCLient = useQueryClient();
	const { toast } = useToast();

	const { mutateAsync: editProduct } = useMutation({
		mutationKey: [EDIT_PRODUCT],
		mutationFn: ({ dto, id }: { id: number; dto: ModelUpdateProductDto }) =>
			patchApiProductId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ADMIN_PRODUCTS] });
		},
		onError: (e: any) => {
			toast({
				title: e.message,
				duration: 5000,
			});
		},
	});
	return { editProduct };
};
