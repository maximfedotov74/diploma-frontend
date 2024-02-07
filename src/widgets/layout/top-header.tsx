import { ChangeThemeButton } from '@/features/change-theme/change-theme-button';
import { Location } from '@/features/layout-location/location';
import { ProfilePropdown } from '@/features/layout-profile/ui/profile-dropdown';

export const TopHeader = (): JSX.Element => {
	return (
		<div className='py-2'>
			<div className='flex items-center'>
				<Location />
				<div className='ml-auto flex items-center'>
					<ProfilePropdown />
					<ChangeThemeButton className='ml-4' />
				</div>
			</div>
		</div>
	);
};
