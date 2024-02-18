import dynamic from 'next/dynamic';
import { AdminModelSearchByArticle } from '../../model-search-by-article/ui/admin-model-search';
import { AdminProductView } from './admin-product-view';

const AddProduct = dynamic(
	() =>
		import('@/features/admin-add-product/ui/add-product').then(
			module => module.AddProduct
		),
	{
		ssr: false,
		loading: () => <div>Loading...</div>,
	}
);

export const AdminProductHome = (): JSX.Element => {
	return (
		<>
			<AddProduct />
			<AdminModelSearchByArticle editable />
			<AdminProductView />
		</>
	);
};
