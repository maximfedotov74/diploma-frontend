import { UseClickOutsideBlocking } from '@/shared/hooks/use-click-outside-blocking';
import { Icon } from '@/shared/ui/icon';
import { Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { GenderMenuItem } from '../../../../types/gender-menu';
import { GenderMenu } from '../gender-menu';
import { CategoriesMenu } from '@/layout/types/categories-menu';
import { MobileCategotyMenuItem } from './mobile-categoty-menu-item';

type MobileMenuProps = {
	genderMenu: GenderMenuItem[];
	categoriesMenu: CategoriesMenu[];
};

export const MobileMenu: FC<MobileMenuProps> = ({
	genderMenu,
	categoriesMenu,
}): JSX.Element => {
	const { areaRef, buttonRef, isOpened, setOpen } = UseClickOutsideBlocking<
		HTMLButtonElement,
		HTMLDivElement
	>(false, true);

	return (
		<div className='mr-3 md:mr-4'>
			<div>
				<button ref={buttonRef} onClick={() => setOpen(p => !p)}>
					<Icon icon='menu_outline_24' className='w-6 h-6 md:h-8 md:w-8' />
				</button>
			</div>

			<Transition
				show={isOpened}
				as={Fragment}
				enter='transition ease-out duration-300 transform'
				enterFrom='-translate-x-full'
				enterTo='translate-x-0'
				leave='transition ease-in duration-300 transform'
				leaveFrom='translate-x-0'
				leaveTo='-translate-x-full'
			>
				<div className='fixed top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] z-10 bg-transparent'>
					<div
						ref={areaRef}
						className='h-[100vh] md:w-[320px] sm:w-[80%] w-[80%] bg-secondary-color shadow-xl overflow-y-scroll'
					>
						<div className='pl-3 pt-4 mb-5'>
							<GenderMenu items={genderMenu} />
						</div>
						<div>
							<ul>
								{categoriesMenu.map(item => (
									<MobileCategotyMenuItem key={item.id} item={item} />
								))}
							</ul>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
};
