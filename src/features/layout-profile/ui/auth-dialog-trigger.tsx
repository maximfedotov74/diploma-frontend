import { Button } from '@/shared/ui/button';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { TypographySmall } from '@/shared/ui/typography';
import { AuthDialog } from './auth-dialog';
import { Icon } from '@/shared/ui/icon';

export const AuthDialogTrigger = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost'>
					<TypographySmall className='sm:block hidden'>
						Вход или регистрация
					</TypographySmall>
					<Icon icon='user_circle_outline_24' className='sm:hidden w-6 h-6' />
				</Button>
			</DialogTrigger>
			<AuthDialog />
		</Dialog>
	);
};
