import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { UserOrders } from './user-orders';
import { ModelUser } from '@/shared/api/generated';
import { UserFeedback } from './user-feedback';

export const UserInfo = ({ user }: { user: ModelUser }): JSX.Element => {
	return (
		<Tabs defaultValue='orders'>
			<TabsList className='grid w-full grid-cols-3'>
				<TabsTrigger value='orders'>Заказы</TabsTrigger>
				<TabsTrigger value='feedback'>Отзывы</TabsTrigger>
				<TabsTrigger value='questions'>Вопросы</TabsTrigger>
			</TabsList>
			<TabsContent value='orders'>
				<UserOrders userId={user.id} />
			</TabsContent>
			<TabsContent value='feedback'>
				<UserFeedback user={user} />
			</TabsContent>
			<TabsContent value='questions'>Вопросы</TabsContent>
		</Tabs>
	);
};
