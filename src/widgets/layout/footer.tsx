import {
	ABOUT_PAGE,
	DELIVERY_POINTS,
	POLICY_PAGE,
} from '@/shared/constants/routes/public';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { Logo } from '@/shared/ui/logo';
import { Separator } from '@/shared/ui/separator';
import { WidthContainer } from '@/shared/ui/width-container';
import { cn } from '@/shared/utils/cn';

export const Footer = ({ className }: { className?: string }): JSX.Element => {
	return (
		<footer className={cn('bg-primary py-10', className)}>
			<WidthContainer className='text-secondary'>
				<div className='flex flex-col'>
					<div>
						<Logo className='text-secondary hover:text-secondary' />
						<div>&copy; {new Date().getFullYear()}г. Все права защищены</div>
					</div>
				</div>
				<Separator className='my-5' />
				<div className='flex items-center mb-4'>
					<Link
						href='https://vk.com/fedotovmax42'
						target='_blank'
						prefetch={false}
						className='text-secondary hover:text-blue-500 mr-2'
						title='ВКонтакте'
					>
						<Icon icon='vk' className='w-6 h-6' />
					</Link>
					<Link
						href='https://t.me/maximfed0t0v'
						target='_blank'
						prefetch={false}
						className='text-secondary hover:text-blue-500 mr-2'
						title='Телеграм'
					>
						<Icon icon='tg' className='w-6 h-6' />
					</Link>
					<Link
						href='https://ok.ru/profile/586260387422'
						target='_blank'
						prefetch={false}
						className='text-secondary hover:text-orange-500 mr-2'
						title='Одноклассники'
					>
						<Icon icon='ok' className='w-6 h-6' />
					</Link>
					<Link
						href='https://www.youtube.com/channel/UCjdwCdSi_QsLvPlADJCCWRw'
						target='_blank'
						prefetch={false}
						className='text-secondary hover:text-red-500 mr-2'
						title='Ютуб'
					>
						<Icon icon='youtube' className='w-6 h-6' />
					</Link>
					<Link
						href='https://github.com/maximfedotov74'
						target='_blank'
						prefetch={false}
						className='text-secondary hover:text-secondary'
						title='ГитХаб'
					>
						<Icon icon='git' className='w-6 h-6' />
					</Link>
				</div>
				<div className='flex flex-col'>
					<Link
						className='text-secondary hover:text-muted-foreground mb-2'
						href={POLICY_PAGE}
					>
						Пользовательское соглашение
					</Link>

					<Link
						className='text-secondary hover:text-muted-foreground mb-2'
						href={ABOUT_PAGE}
					>
						О нас
					</Link>
					<Link
						className='text-secondary hover:text-muted-foreground mb-2'
						href={DELIVERY_POINTS}
					>
						Пункты выдачи
					</Link>
				</div>
			</WidthContainer>
		</footer>
	);
};
