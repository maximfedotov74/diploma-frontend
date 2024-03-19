import { SearchDeliveryPoints } from '@/features/search-delivery-points/search-delivery-points';
import { useSearchDeliveryPoints } from '@/shared/api/queries/search-delivery-points';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/accordion';

import { useRouter } from 'next/router';
import { EditDeliveryPoint } from '../admin-edit-delivery-point/ui/edit-delivery-point';

export const AdminDeliveryPointList = (): JSX.Element => {
	const router = useRouter();

	let withFitting: boolean = false;

	if (router.query.withFitting) {
		if (router.query.withFitting === 'true') {
			withFitting = true;
		}
	}

	let searchText: string = '';

	if (router.query.searchText && typeof router.query.searchText === 'string') {
		searchText = router.query.searchText;
	}

	const { data: points } = useSearchDeliveryPoints(withFitting, searchText);
	return (
		<div className=''>
			<SearchDeliveryPoints searchText={searchText} withFitting={withFitting} />
			<Accordion type='multiple'>
				{points?.map(p => (
					<AccordionItem
						key={p.delivery_point_id}
						value={p.delivery_point_id.toString()}
					>
						<AccordionTrigger>{p.title}</AccordionTrigger>
						<AccordionContent className='relative'>
							<div>{p.city}</div>
							<div>{p.address}</div>
							<div>{p.work_schedule}</div>
							<div>{p.with_fitting ? 'С примеркой' : 'Без примерки'}</div>
							<EditDeliveryPoint point={p} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
