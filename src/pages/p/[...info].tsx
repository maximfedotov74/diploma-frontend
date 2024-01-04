import { withLayout } from '@/layout/with-layout';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const ProductHome: FC<{ params: any }> = ({ params }): JSX.Element => {
	return (
		<div>
			<div>
				{JSON.stringify(params)}
				<b className='block'>Model Id: {params.info[0]}</b>
				<b className='block'>Product slug: {params.info[1]}</b>
			</div>
		</div>
	);
};

export default withLayout(ProductHome);

export const getServerSideProps: GetServerSideProps = async ctx => {
	return {
		props: {
			params: ctx.params,
		},
	};
};
