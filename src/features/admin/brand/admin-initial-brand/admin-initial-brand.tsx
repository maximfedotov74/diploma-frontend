import { useGetBrandApi } from '@/shared/api/queries/get-brand-api';
import { useRouter } from 'next/router';
import { EditBrand } from '../admin-edit-brand/ui/edit-brand';

export const AdminInitialBrand = () => {
	const router = useRouter();

	let brandSlug = '';

	if (router.query.opened && typeof router.query.opened === 'string') {
		brandSlug = router.query.opened;
	}

	const { data: brand } = useGetBrandApi(brandSlug);

	if (!brand) {
		return null;
	}

	return <EditBrand brand={brand} opened />;
};
