import { ModelBrand } from '@/shared/api/generated';

export const ProductInfoBrand = ({
	brand,
}: {
	brand: ModelBrand;
}): JSX.Element => {
	return (
		<div>
			<div className='font-bold text-2xl mb-3'>{brand.title}</div>
			<p>{brand.description}</p>
		</div>
	);
};
