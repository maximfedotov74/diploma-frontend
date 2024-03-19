import { PopularSlider } from '@/features/popular-models/ui/popular-slider';
import { CartWrapper } from './cart-wrapper';
import { ModelActionGender } from '@/shared/api/generated';
import { useGetCartApi } from '@/shared/api/queries/get-cart-api';

export const CartPage = ({
	genderMenu,
}: {
	genderMenu: ModelActionGender;
}): JSX.Element => {
	const { data: cart } = useGetCartApi();

	return (
		<>
			<CartWrapper cart={cart} />
			<div className='mt-10'>
				<PopularSlider genderSlug={genderMenu} />
			</div>
		</>
	);
};
