import { useGetAllActions } from '@/shared/api/queries/get-all-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Image from 'next/image';
import { EditAction } from '../admin-edit-action/ui/edit-action';

export const AdminActionsList = (): JSX.Element => {
	const { data: actions } = useGetAllActions();

	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
			{actions?.map(action => (
				<Card key={action.id} className='relative py-4'>
					<CardHeader className='pt-0 pl-1'>
						<CardTitle>{action.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center justify-center'>
							<Image
								className='rounded-lg w-[210px] h-[190px]'
								width={300}
								height={300}
								alt={action.title}
								src={action.img_path || '/img/action-default.png'}
							/>
						</div>
						<div>C: {new Date(action.created_at).toLocaleDateString()}</div>
						<div>До: {new Date(action.end_date).toLocaleDateString()}</div>
						<EditAction action={action} />
					</CardContent>
				</Card>
			))}
		</div>
	);
};
