import { FC, useEffect, useState } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import EventBox from '../shared/eventBox/EventBox'
const defaultData: IEvent[] = [
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event5.png', title: 'Party with Eminem', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 100 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event2.png', title: 'Ultra Split privat party', date_start: '1.2.2020', time_start: '22:00', location: '4140 Parker Rd. Allentown, 31134', max_visitors: 300 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event3.png', title: 'Party with 2Pac & Biggie Smalls', date_start: '1.2.2020', time_start: '19:00', location: '8 Mediteranskih Igara 2, 21000', max_visitors: 200 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
]
const UpcomingEvents: FC = () => {
	const [sliders, setSliders] = useState<IEvent[] | []>([])

	useEffect(() => {
		setSliders(defaultData)
	}, [])
	return (
		<div>
			{sliders.map((item: IEvent, index: number) => (
				<EventBox
					key={index}
					title={item.title}
					description={item.description}
					date_start={item.date_start}
					time_start={item.time_start}
					location={item.location}
					max_visitors={item.max_visitors}
				/>
			))}
		</div>
	)
}

export default UpcomingEvents
