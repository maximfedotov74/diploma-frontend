import { useGetWishlistApi } from '@/shared/api/queries/get-wishlist';
import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';
import { useToggleWishListApi } from './toggle-wishlist-api';

export const ToggleToWishlist = ({
	modelId,
}: {
	modelId: number;
}): JSX.Element => {
	const { data: wish } = useGetWishlistApi();

	const inWish = wish?.find(item => item.model_id === modelId);

	const toggle = useToggleWishListApi();

	return (
		<button onClick={() => toggle(modelId)}>
			<Icon
				icon='like_24'
				className={cn('w-6 h-6 fill-white stroke-black hover:stroke-action', {
					'fill-action': inWish,
				})}
			/>
		</button>
	);
};
