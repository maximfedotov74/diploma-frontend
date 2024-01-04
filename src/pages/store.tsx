import { withLayout } from '@/layout/with-layout';
import {
	decrementAction,
	incrementAction,
	useStore,
} from '@/shared/hooks/store';
import { Transition } from '@headlessui/react';
import { FC, useState } from 'react';

const DisplayValue = ({ item }: { item: any }) => (
	<div>
		{item}: {useStore(state => state[item])}
	</div>
);

const IncrementValue = ({ item }: { item: any }) => (
	<button onClick={() => incrementAction(item)}>Increment {item}</button>
);

const DecrementValue = ({ item }: { item: any }) => (
	<button onClick={() => decrementAction(item)}>Decrement {item}</button>
);

const StorePage: FC = (): JSX.Element => {
	const [open, setOpen] = useState(false);

	const sendReq = async () => {
		fetch('http://localhost:5000/api/order/', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ',
			},
		});
	};

	return (
		<div
			onClick={() => setOpen(p => !p)}
			// style={{
			// 	display: 'grid',
			// 	gridTemplateColumns: '1fr 1fr 1fr',
			// 	maxWidth: 600,
			// 	gap: '1rem',
			// }}
		>
			{/* <IncrementValue item='value1' />
			<DecrementValue item='value1' />
			<DisplayValue item='value1' />
			<IncrementValue item='value2' />
			<DecrementValue item='value2' />
			<DisplayValue item='value2' /> */}
			<button>open</button>
			<Transition
				show={open}
				enter='transition ease-in-out duration-300 transform'
				enterFrom='-translate-x-full'
				enterTo='translate-x-0'
				leave='transition ease-in-out duration-300 transform'
				leaveFrom='translate-x-0'
				leaveTo='-translate-x-full'
			>
				<div className='border border-black p-2'>
					<ul>
						<li>123</li>
						<li>asdasd</li>
						<li>asdasdas</li>
						<li>asdasdsad</li>
					</ul>
				</div>
			</Transition>
		</div>
	);
};

export default withLayout(StorePage);
