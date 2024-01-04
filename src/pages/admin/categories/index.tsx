import { withLayout } from '@/layout/with-layout';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

type Category = {
	category_id: number;
	img_path?: string;
	parent_category_id?: number;
	short_title: string;
	slug: string;
	subcategories?: Category[];
	level: number;
	title: string;
};

const AdminCategory: FC = (): JSX.Element => {
	const {
		data: categories,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categories-list'],
		queryFn: async () =>
			fetch('http://localhost:5000/api/category')
				.then(async data => {
					const categories = (await data.json()) as Category[];
					return categories;
				})
				.catch(err => {
					throw new Error(err);
				}),
	});
	return (
		<div>
			<h1>AdminCategory</h1>

			{categories && (
				<ul>
					{categories.map(c => {
						return (
							<li key={c.category_id}>
								<strong>{c.title}</strong>
								{c.subcategories && (
									<ul>
										{c.subcategories.map(c => (
											<li className='pl-3' key={c.category_id}>
												<span>{c.title}</span>
												{c.subcategories && (
													<ul>
														{c.subcategories.map(c => (
															<li key={c.category_id} className='pl-3'>
																<span>{c.title}</span>
																{c.subcategories && (
																	<ul>
																		{c.subcategories.map(c => (
																			<li key={c.category_id} className='pl-3'>
																				<span>{c.title}</span>
																			</li>
																		))}
																	</ul>
																)}
															</li>
														))}
													</ul>
												)}
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
export default withLayout(AdminCategory, 'admin');
