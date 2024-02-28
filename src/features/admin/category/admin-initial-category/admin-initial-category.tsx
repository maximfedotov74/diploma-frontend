import { useRouter } from 'next/router';
import { EditCategory } from '../admin-edit-category/ui/edit-category';
import { useGetCategoryApi } from '@/shared/api/queries/get-category-api';

export const AdminInitialCategory = () => {
	const router = useRouter();

	let categorySlug = '';

	if (router.query.opened && typeof router.query.opened === 'string') {
		categorySlug = router.query.opened;
	}

	const { data: category } = useGetCategoryApi(categorySlug);

	if (!category) {
		return null;
	}

	return <EditCategory category={category} opened />;
};
