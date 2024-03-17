import { useRouter } from 'next/router';
import { EditModelProduct } from '../admin-edit-product/ui/edit-model-product';
import { useGetModel } from './admin-get-model';

export const AdminInitialModel = () => {
	const router = useRouter();

	let modelId: number | undefined = undefined;

	if (router.query.opened && !isNaN(Number(router.query.opened))) {
		modelId = Number(router.query.opened);
	}

	const { data: m } = useGetModel(modelId);

	if (!m) {
		return null;
	}

	return <EditModelProduct model={m} opened />;
};
