import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'

interface Props {
	type?: string
}

const defaultData: IEvent[] = [
	{ id: 1, user_id: 1, description: 'Iaculis volutpat eget massa s ed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event5.png', title: 'Party with Eminem', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 100 },
	{ id: 2, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event2.png', title: 'Ultra Split privat party', date_start: new Date(Date.now()), time_start: '22:00', location: '4140 Parker Rd. Allentown, 31134', max_visitors: 300 },
	{ id: 3, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event3.png', title: 'Party with 2Pac & Biggie Smalls', date_start: new Date(Date.now()), time_start: '19:00', location: '8 Mediteranskih Igara 2, 21000', max_visitors: 200 },
	{ id: 4, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 5, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 6, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 7, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 8, user_id: 2, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 9, user_id: 2, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 10, user_id: 2, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
]

const SliderVertical: FC<Props> = ({ type }: Props) => {
	const [sliders, setSliders] = useState<IEvent[] | []>([])

	useEffect(() => {
		setSliders(defaultData)
	}, [])
	return (
		<>
			<Swiper
				spaceBetween={20}
				slidesPerView={4.3}
				watchOverflow={true}
				direction='vertical'
				onSlideChange={() => console.log('Event vertical slide CHANGED')}
				onSwiper={(swiper: any) => console.log(swiper)} className='h-[444px] p-1.5'>
				{sliders.map((item: IEvent, index: number) => (
					<SwiperSlide key={index} className='!w-full !h-auto'>
						<EventBox
							title={item.title}
							description={item.description}
							date_start={item.date_start}
							time_start={item.time_start}
							location={item.location}
							max_visitors={item.max_visitors}
							className='!mb-0 !pl-8'
							type={type && type}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default observer(SliderVertical)
