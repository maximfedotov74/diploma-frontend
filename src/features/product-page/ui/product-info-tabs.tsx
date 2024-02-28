import {
	ModelBrand,
	ModelProductModelOptionValue,
} from '@/shared/api/generated';
import { TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import { ProductInfoOptions } from './product-info-options';
import { ProductInfoBrand } from './product-info-brand';

export type InfoOptions = {
	title: string;
	values?: ModelProductModelOptionValue[];
};

export const ProductInfoTabs = ({
	options,
	brand,
}: {
	options: InfoOptions[];
	brand: ModelBrand;
}): JSX.Element => {
	return (
		<Tabs defaultValue='options'>
			<TabsList>
				<TabsTrigger className='mr-6' value='options'>
					О товаре
				</TabsTrigger>
				<TabsTrigger value='brand' className='mr-6'>
					О бренде
				</TabsTrigger>
				<TabsTrigger value='feedback'>Отзывы</TabsTrigger>
			</TabsList>
			<TabsContent value='options'>
				<ProductInfoOptions options={options} />
			</TabsContent>
			<TabsContent value='brand'>
				<ProductInfoBrand brand={brand} />
			</TabsContent>
			<TabsContent value='feedback'>feedback</TabsContent>
		</Tabs>
	);
};
