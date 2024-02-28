import { ModelAdminProductModelRelation } from '@/shared/api/generated';
import { useGetModelImagesApi } from '../api/get-model-img-api';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteProductModelImgApi } from '../api/delete-model-product-img-api';

export const ModelImgList = ({
	model,
}: {
	model: ModelAdminProductModelRelation;
}): JSX.Element => {
	const { data: images } = useGetModelImagesApi(model.id);
	const deleteImage = useDeleteProductModelImgApi(model.id);

	return (
		<div className='grid grid-cols-3 xs:grid-cols-4  sm:grid-cols-5 md:grid-cols-6 gap-x-2 gap-y-3 lg:grid-cols-7 lg:gap-x-3'>
			{images?.map(img => (
				<div key={img.id} className='relative w-24 sm:w-28'>
					<Image
						width={190}
						height={190}
						className='w-full h-32'
						src={img.img_path}
						alt={`model image id${img.id}`}
					/>
					<Button
						variant='ghost'
						size='icon'
						className='h-5 w-5 absolute top-1 right-1 text-black'
						onClick={() => deleteImage(img.id)}
					>
						<Icon icon='cancel_16' />
					</Button>
				</div>
			))}
		</div>
	);
};
