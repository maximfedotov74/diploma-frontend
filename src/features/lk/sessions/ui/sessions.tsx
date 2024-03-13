import { TypographyH1, TypographySmall } from '@/shared/ui/typography';
import { useGetSessions } from '../api/get-sessions';
import { Separator } from '@/shared/ui/separator';
import { Icon } from '@/shared/ui/icon';
import { useRemoveSession } from '../api/remove-session';
import { useRemoveExceptCurrentSession } from '../api/remove-except-current-session';

export const Sessions = (): JSX.Element => {
	const { data: sessionResponse } = useGetSessions();

	const removeSession = useRemoveSession();
	const removeExceptCurrentSession = useRemoveExceptCurrentSession();

	return (
		<>
			<TypographyH1 className='text-2xl font-normal mb-5'>
				Мои сессии
			</TypographyH1>

			{sessionResponse?.current && (
				<div>
					<div className='font-medium text-lg mb-2'>Текущая сессия</div>
					<div>
						<div className='flex items-center mb-2'>
							<div className='mr-2'>
								<Icon
									className='w-8 h-8'
									icon={
										sessionResponse.current.device === 'mobile'
											? 'smartphone_outline_24'
											: 'computer_outline_24'
									}
								/>
							</div>
							<div>
								<div>Браузер: {sessionResponse?.current.browser}</div>
								<div>Операционная система: {sessionResponse?.current.os}</div>
								<div>
									Дата последнего обновления сессии:{' '}
									{new Date(sessionResponse?.current.updated_at).toLocaleString(
										'ru-RU'
									)}
								</div>
							</div>
						</div>
						<button
							className='flex items-center text-action'
							onClick={() =>
								removeExceptCurrentSession(sessionResponse.current.session_id)
							}
						>
							<Icon
								className='w-8 h-8 mr-2'
								icon={'door_arrow_right_outline_24'}
							/>
							<TypographySmall>Завершить другие сеансы</TypographySmall>
						</button>
					</div>
				</div>
			)}

			<Separator className='my-4' />
			<div>
				{sessionResponse?.sessions.map(item => (
					<div className='mb-10 flex items-center' key={item.session_id}>
						<div className='mr-2'>
							<Icon
								className='w-8 h-8'
								icon={
									item.device === 'mobile'
										? 'smartphone_outline_24'
										: 'computer_outline_24'
								}
							/>
						</div>
						<div>
							<div>Браузер: {item.browser}</div>
							<div>Операционная система: {item.os}</div>
							<div>
								Дата последнего обновления сессии:{' '}
								{new Date(item.updated_at).toLocaleString('ru-RU')}
							</div>
							<button
								className='flex items-center text-action mt-2'
								onClick={() => removeSession(item.session_id)}
							>
								<Icon
									className='w-6 h-6 mr-2'
									icon={'door_arrow_right_outline_24'}
								/>
								<TypographySmall>Завершить сеанс</TypographySmall>
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
