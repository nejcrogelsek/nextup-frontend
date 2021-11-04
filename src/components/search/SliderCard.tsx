import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderItemCard from './SliderItemCard'
import { IEvent } from '../../interfaces/event.interface'
import { Pagination } from 'swiper'

const defaultData: IEvent[] = [
	{ description: '', image: '/event5.png', title: 'Party with Eminem', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 100 },
	{ description: '', image: '/event2.png', title: 'Ultra Split privat party', date_start: '1.2.2020', time_start: '22:00', location: '4140 Parker Rd. Allentown, 31134', max_visitors: 300 },
	{ description: '', image: '/event3.png', title: 'Party with 2Pac & Biggie Smalls', date_start: '1.2.2020', time_start: '19:00', location: '8 Mediteranskih Igara 2, 21000', max_visitors: 200 },
	{ description: '', image: '/event4.png', title: 'Party with 50 Cent', date_start: '1.2.2020', time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 400 },
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
				pagination={{ el: '.swiper-pagination', type: 'bullets', bulletActiveClass: 'bullet-active' }}
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
