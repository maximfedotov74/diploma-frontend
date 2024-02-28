import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { TypographySmall } from '@/shared/ui/typography';
import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';
import { Link } from '@/shared/ui/link';
import { ProfileWish } from './profile-wish';
import { useGetProfileApi } from '@/shared/api/queries/get-profile-api';
import { Icon } from '@/shared/ui/icon';

export const ProfilePropdown = () => {
	const { isLoading, data: user } = useGetProfileApi();

	if (isLoading) {
		return <Skeleton className='h-10 w-10 rounded-full' />;
	}

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button>
						<Avatar className='h-10 w-10'>
							<AvatarImage
								asChild
								src={user.avatar_path || '/img/default-avatar.jpg'}
								alt='avatar'
							>
								<Image
									src={user.avatar_path || '/img/default-avatar.jpg'}
									alt='avatar'
									width={100}
									height={100}
								/>
							</AvatarImage>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className=''>
					<DropdownMenuItem className='px-2 py-1.5'>
						<Link
							variant='menu'
							className='flex flex-col items-start'
							href='/lk'
						>
							<TypographySmall className='mb-1 font-semibold'>
								{user.first_name} {user.last_name}
							</TypographySmall>
							<TypographySmall className='text-foreground/60'>
								{user.email}
							</TypographySmall>
						</Link>
					</DropdownMenuItem>
					<Separator className='my-1' />
					<div>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Заказы
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Возвраты
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Отзывы и вопросы
							</Link>
						</DropdownMenuItem>
					</div>
					<Separator className='my-1' />
					<ProfileWish />
					<Separator className='my-1' />
					<div>
						<DropdownMenuItem>
							<Link variant='menu' href='/' className='w-full'>
								Выйти
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Выйти со всех устройств
							</Link>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	if (!isLoading && !user) {
		return (
			<Link href='/auth' prefetch={false} variant='menu'>
				<TypographySmall className='sm:block hidden'>
					Вход или регистрация
				</TypographySmall>
				<Icon icon='user_circle_outline_24' className='sm:hidden w-6 h-6' />
			</Link>
		);
	}
};
