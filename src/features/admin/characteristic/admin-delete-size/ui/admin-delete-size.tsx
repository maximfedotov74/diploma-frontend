import { ModelSize } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteSizeApi } from '../api/delete-size-api';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export const AdminDeleteSize = ({ size }: { size: ModelSize }): JSX.Element => {
	const deleteSize = useDeleteSizeApi();
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='icon' className='ml-auto'>
					<Icon icon='more' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col p-2'>
				<Button variant='ghost' onClick={() => deleteSize(size.id)}>
					Удалить
				</Button>
			</PopoverContent>
		</Popover>
	);
};
