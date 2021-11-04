import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderItemCard from './SliderItemCard'
import { IEvent } from '../../interfaces/event.interface'
import { Pagination } from 'swiper'

const defaultData: IEvent[] = [
	{ id: 1, user_id: 1,  description: 'Iaculis volutpat eget massa s ed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event5.png', title: 'Party with Eminem', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 100 },
	{ id: 2, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event2.png', title: 'Ultra Split privat party', date_start: new Date(Date.now()), time_start: '22:00', location: '4140 Parker Rd. Allentown, 31134', max_visitors: 300 },
	{ id: 3, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event3.png', title: 'Party with 2Pac & Biggie Smalls', date_start: new Date(Date.now()), time_start: '19:00', location: '8 Mediteranskih Igara 2, 21000', max_visitors: 200 },
	{ id: 4, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 5, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 6, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 7, user_id: 1,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 8, user_id: 2,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 9, user_id: 2,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
	{ id: 10, user_id: 2,  description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', image: '/event4.png', title: 'Party with 50 Cent', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
]

const SliderCard: FC = () => {
	const [sliders, setSliders] = useState<IEvent[] | []>([])

	useEffect(() => {
		setSliders(defaultData)
	}, [])
	return (
		<div className='relative lg:-mt-20'>
			<Swiper
				modules={[Pagination]}
				spaceBetween={20}
				slidesPerView={1.2}
				watchOverflow={true}
				pagination={{ el: '.swiper-pagination', type: 'bullets', bulletActiveClass: 'bullet-active', clickable: true }}
				breakpoints={{
					1024: {
						width: 1024,
						slidesPerView: 3,
						centeredSlides: true
					},
					600: {
						width: 600,
						slidesPerView: 1.2,
					},
				}}
				onSlideChange={() => console.log('Card slide CHANGED')}
				onSwiper={(swiper: any) => console.log(swiper)}
				className='pt-6 pb-8'>
				{sliders.map((item: IEvent, index: number) => (
					<SwiperSlide key={index} className='swiper-slide-card'>
						<SliderItemCard
							image={item.image}
							title={item.title}
							date_start={item.date_start}
							time_start={item.time_start}
							location={item.location}
							max_visitors={item.max_visitors} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className="swiper-pagination !-bottom-4"></div>
		</div>
	)
}

export default observer(SliderCard)
