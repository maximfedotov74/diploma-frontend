import { ModelFeedback, ModelUser } from '@/shared/api/generated';
import { useGetAdminUserFeedback } from '../api/get-admin-user-feedback';
import { FeedbackList } from '@/features/admin/feedback/feedback-list/ui/feedback-list';

export const UserFeedback = ({ user }: { user: ModelUser }): JSX.Element => {
	const { data, isLoading } = useGetAdminUserFeedback(user.id);

	const feedback = data?.map(
		f =>
			({
				created_at: f.created_at,
				id: f.id,
				is_hidden: f.is_hidden,
				model_id: f.model.id,
				model_slug: f.model.slug,
				rate: f.rate,
				text: f.text,
				updated_at: f.updated_at,
				user: {
					first_name: user.first_name,
					email: user.email,
					id: user.id,
					avatar: user.avatar_path,
					last_name: user.last_name,
				},
			} as ModelFeedback)
	);

	return (
		<>
			<div className='text-xl mb-3'>Список отзывов</div>
			{isLoading ? (
				<div className='text-lg'>Загрузка...</div>
			) : feedback?.length ? (
				<FeedbackList feedback={feedback} />
			) : (
				<div className='text-lg'>Отзывов нет!</div>
			)}
		</>
	);
};
