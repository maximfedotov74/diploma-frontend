import { Button } from '@/shared/ui/button';
import { useIncreaseQuantityApi } from '../api/increase-quantity-api';
import { useReduceQuantityApi } from '../api/reduce-quantity-api';
import { Icon } from '@/shared/ui/icon';

export const QuantityManager = ({
	modelSizeId,
	quantity,
}: {
	modelSizeId: number;
	quantity: number;
}): JSX.Element => {
	const reduceQuantity = useReduceQuantityApi();
	const increaseQuantity = useIncreaseQuantityApi();

	return (
		<div className='flex items-center'>
			<Button
				disabled={quantity === 1}
				onClick={() => reduceQuantity(modelSizeId)}
				variant='ghost'
				size='icon'
			>
				<Icon icon='minus_outline_24' className='w-5 h-5' />
			</Button>
			<div className='mx-3'>{quantity}</div>
			<Button
				onClick={() => increaseQuantity(modelSizeId)}
				variant='ghost'
				size='icon'
			>
				<Icon icon='add_outline_24' className='w-5 h-5' />
			</Button>
		</div>
	);
};
