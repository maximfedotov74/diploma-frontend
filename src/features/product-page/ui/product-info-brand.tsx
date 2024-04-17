import { ModelBrand } from '@/shared/api/generated';
import { TypographyP } from '@/shared/ui/typography';

export const ProductInfoBrand = ({
	brand,
}: {
	brand: ModelBrand;
}): JSX.Element => {
	return (
		<div>
			<div className='font-bold text-2xl mb-3'>{brand.title}</div>
			<TypographyP className='max-w-lg'>{brand.description}</TypographyP>
		</div>
	);
};
