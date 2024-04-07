import { ModelBrand, ModelUser } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { UserAddRoles } from './user-add-roles';
import { UserRolesList } from './user-roles-list';
import { UserInfo } from './user-info';

export const UserView = ({ user }: { user: ModelUser }): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Icon icon='more' className='w-6 h-6' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{user.email}</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue='roles'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='roles'>Роли</TabsTrigger>
						<TabsTrigger value='info'>Информация</TabsTrigger>
					</TabsList>
					<TabsContent value='roles'>
						<UserAddRoles
							roles={user.roles}
							userId={user.id}
							className='mb-5'
						/>
						<UserRolesList roles={user.roles} userId={user.id} />
					</TabsContent>
					<TabsContent value='info'>
						<UserInfo user={user} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
