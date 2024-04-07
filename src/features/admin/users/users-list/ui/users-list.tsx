import { useRouter } from 'next/router';
import { useGetAllUsersApi } from '../api/get-all-users-api';
import { BasePagination } from '@/shared/ui/base-pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table';
import { UserView } from '../../user-view/ui/view-user';

export const UsersList = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	const { data } = useGetAllUsersApi(page);

	const pages = data?.total
		? data.total > 0
			? Math.ceil(data?.total / 16)
			: 1
		: 0;
	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px] px-2'>ID</TableHead>
						<TableHead className='px-2'>Email</TableHead>
						<TableHead className='px-2'>Роли</TableHead>
						<TableHead className='px-2'>ФИО</TableHead>
						<TableHead className='text-right px-2'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.users.map(item => (
						<TableRow key={item.id}>
							<TableCell className='font-medium p-2'>{item.id}</TableCell>
							<TableCell className='break-words p-2 max-w-[120px]'>
								{item.email}
							</TableCell>
							<TableCell className='p-2'>
								<div>{item.roles.map(r => r.title).join(', ')}</div>
							</TableCell>
							<TableCell className='p-2 text-left'>
								<div>
									{item.last_name} {item.first_name} {item.patronymic}
								</div>
							</TableCell>
							<TableCell className='p-2'>
								<UserView user={item} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<BasePagination page={page} pages={pages} />
		</div>
	);
};
