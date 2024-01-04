import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cva } from 'class-variance-authority';

const wish = [1, 2, 3];

const wishBtn = cva('w-6 h-6 hover:stroke-action-color', {
	variants: {
		variant: {
			active: 'text-action-color stroke-action-color',
			disable: 'text-white stroke-black',
		},
	},
});

type WishBtnProps = {
	modelId: number;
	className?: string;
};

export const WishlistBtn = ({
	modelId,
	className,
}: WishBtnProps): JSX.Element => {
	const inWish = wish.find(item => item === modelId);

	return (
		<Button variant='simple'>
			<Icon
				icon='like_24'
				className={wishBtn({
					variant: inWish ? 'active' : 'disable',
					className,
				})}
			/>
		</Button>
	);
};
