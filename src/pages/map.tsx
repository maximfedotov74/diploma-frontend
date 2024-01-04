import { withLayout } from '@/layout/with-layout';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import {
	FullscreenControl,
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
} from '@pbe/react-yandex-maps';

import { FC, useMemo, useRef, useState } from 'react';

interface Shop {
	id: number;
	title: string;
	coords: number[];
}

const placemarks: Shop[] = [
	{ id: 1, title: 'Челябинск, Проспект победы 338', coords: [55.154, 61.4261] },
	{
		id: 2,
		title: 'Челябинск, Комсомольский проспект, 42',
		coords: [55.19632, 61.336033],
	},
];

const MapPage: FC = (): JSX.Element => {
	const key = process.env.NEXT_PUBLIC_YAMAP_KEY;
	const [zoom, setZoom] = useState(9);
	const [center, setCenter] = useState([56.346, 43.847]);
	const [shop, setShop] = useState([55.190734, 61.325999]);
	const mapState = useMemo(
		() => ({ center: center, zoom, controls: [] }),
		[zoom, center]
	);
	const [activeShop, setActiveShop] = useState<Shop | null>(null);

	const handleClick = (e: ymaps.IEvent<MouseEvent>) => {
		//@ts-ignore
		var id = e.get('target').options.get('balloonContent');
		var shop = placemarks.find(p => p.id === +id);
		if (shop) {
			setActiveShop(shop);
		}
	};

	return (
		<YMaps query={{ apikey: key }}>
			<>
				{activeShop && <h2 className='mb-8'>{activeShop.title}</h2>}
				<table>
					<tbody>
						<tr>
							<th>Controlled Map</th>
						</tr>
						<tr>
							<td>
								<Map state={mapState}>
									<FullscreenControl />
									<GeolocationControl options={{ float: 'left' }} />
									{placemarks.map(p => (
										<Placemark
											key={p.id}
											instanceRef={p => {
												if (p) {
													p.events.add('click', handleClick);
												}
											}}
											geometry={p.coords}
											options={{ balloonContent: p.id.toString() }}
										/>
									))}
								</Map>
							</td>
						</tr>
					</tbody>
				</table>
				<p>
					<Button
						className='p-2 mb-2'
						onClick={() => setZoom(zoom => (zoom === 9 ? 12 : 9))}
					>
						Изменить зум
					</Button>
					<Button className='p-2' onClick={() => setCenter([55.154, 61.4261])}>
						В челябинск!
					</Button>
				</p>
			</>
		</YMaps>
	);
};

export default withLayout(MapPage);
