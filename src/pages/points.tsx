import {
	ModelDeliveryPoint,
	getApiDeliverySearch,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/accordion';
import { TypographyH1 } from '@/shared/ui/typography';
import { AuthLayout } from '@/widgets/layout/auth-layout';
import { GetStaticProps } from 'next';

const Points = ({ points }: { points: ModelDeliveryPoint[] }): JSX.Element => {
	return (
		<Meta title='Пункты выдачи заказов'>
			<AuthLayout>
				<TypographyH1 className='mb-5 text-2xl'>
					Пункты выдачи заказов
				</TypographyH1>
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
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</AuthLayout>
		</Meta>
	);
};

export default Points;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const points = await getApiDeliverySearch();
		return {
			props: {
				points,
			},
			revalidate: 3600,
		};
	} catch {
		return {
			notFound: true,
		};
	}
};
