import { Transition, Dialog } from '@headlessui/react';
import { FC, Fragment, PropsWithChildren } from 'react';
import { Icon } from '../icon';
import { ModalProps } from './modal-props';
import { Button } from '../button';

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
	closeModal,
	opened,
	children,
	...props
}): JSX.Element => {
	return (
		<Transition appear show={opened} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={closeModal}
				{...props}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black/80' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='relative transform overflow-hidden rounded-none shadow-xl transition-all'>
								<div className='bg-secondary-color p-4 md:p-6'>{children}</div>
								<Button
									variant='simple'
									className='absolute top-4 right-4'
									onClick={closeModal}
								>
									<Icon icon='cancel_16' className='w-6 h-6' />
								</Button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
