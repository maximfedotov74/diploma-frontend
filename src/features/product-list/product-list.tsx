import { ModelAdminProduct } from '@/shared/api/generated';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { EditProduct } from '../edit-product/ui/edit-product';
import { Icon } from '@/shared/ui/icon';
import { useDeleteProductApi } from './delete-product-api';

export const ProductList = ({
	products,
}: {
	products: ModelAdminProduct[];
}): JSX.Element => {
	const { deleteProduct } = useDeleteProductApi();

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px] px-2'>ID</TableHead>
					<TableHead className='px-2'>Название</TableHead>
					<TableHead className='px-2'>Категория</TableHead>
					<TableHead className='px-2'>Бренд</TableHead>
					<TableHead className='text-right px-2'></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map(item => (
					<TableRow key={item.id}>
						<TableCell className='font-medium p-2'>{item.id}</TableCell>
						<TableCell className='break-words p-2 max-w-[120px]'>
							{item.title}
						</TableCell>
						<TableCell className='p-2'>{item.category.title}</TableCell>
						<TableCell className='p-2 text-left'>{item.brand.title}</TableCell>
						<TableCell className='p-2'>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='ghost' size='icon'>
										<Icon icon='more' />
									</Button>
								</PopoverTrigger>
								<PopoverContent className='flex flex-col p-2'>
									<EditProduct product={item} />

									<Button
										variant='ghost'
										onClick={() => deleteProduct(item.id)}
									>
										Удалить
									</Button>
								</PopoverContent>
							</Popover>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
