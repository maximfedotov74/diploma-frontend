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
import {
	LK_ORDERS_ROUTE,
	LK_ROUTE,
	LOGOUT_ROUTE,
} from '@/shared/constants/routes/public';
import { ProfileOrders } from './profile-orders';

export const ProfilePropdown = () => {
	const { isLoading, isError, data: user } = useGetProfileApi();

	if (isLoading) {
		return <Skeleton className='h-10 w-10 rounded-full' />;
	}

	if (isError) {
		return (
			<Link href='/auth' prefetch={false} variant='menu'>
				<TypographySmall className='sm:block hidden'>
					Вход или регистрация
				</TypographySmall>
				<Icon icon='user_circle_outline_24' className='sm:hidden w-6 h-6' />
			</Link>
		);
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
							href={LK_ROUTE}
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
					<ProfileOrders />
					<Separator className='my-1' />
					<ProfileWish />
					<Separator className='my-1' />
					<div>
						<DropdownMenuItem>
							<Link
								prefetch={false}
								variant='menu'
								href={LOGOUT_ROUTE}
								className='w-full'
							>
								Выйти
							</Link>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
};
