import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderItemCard from './SliderItemCard'
import { IEvent } from '../../interfaces/event.interface'
import { Pagination } from 'swiper'
import eventStore from '../../stores/event.store'


const SliderCard: FC = () => {
	return (
		<div className='relative lg:-mt-20'>
			<Swiper
				modules={[Pagination]}
				spaceBetween={20}
				slidesPerView={3}
				watchOverflow={true}
				pagination={{ el: '.swiper-pagination', type: 'bullets', bulletActiveClass: 'bullet-active', clickable: true }}
				breakpoints={{
					1024: {
						width: 1024,
						slidesPerView: 3
					},
					600: {
						width: 600,
						slidesPerView: 1.2,
					},
					240: {
						slidesPerView: 1.2
					}
				}}
				onSlideChange={() => console.log('Card slide CHANGED')}
				onSwiper={(swiper: any) => console.log(swiper)}
				className='pt-6 pb-8'>
				{eventStore.upcomingEvents.map((item: IEvent, index: number) => (
					<SwiperSlide key={index} className='swiper-slide-card'>
						<SliderItemCard
							image={item.event_image}
							title={item.title}
							date_start={item.date_start}
							time_start={item.time_start}
							location={item.location}
							max_visitors={item.max_visitors}
							event_image={item.event_image}
							description={item.description}
							id={item.id} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className="swiper-pagination !-bottom-4"></div>
		</div>
	)
}

export default observer(SliderCard)
