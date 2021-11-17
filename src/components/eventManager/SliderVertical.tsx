import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'

const SliderVertical: FC = () => {
	return (
		<>
			<Swiper
				spaceBetween={20}
				slidesPerView={4.3}
				watchOverflow={true}
				direction='vertical'
				onSlideChange={() => console.log('Event vertical slide CHANGED')}
				onSwiper={(swiper: any) => console.log(swiper)} className='h-[444px] p-1.5'>
				{eventStore.userEvents?.map((val: IEvent, index: number) => (
					<SwiperSlide key={index} className='!w-full !h-auto'>
						<EventBox
							title={val.title}
							description={val.description}
							date_start={val.date_start}
							time_start={val.time_start}
							location={val.location}
							max_visitors={val.max_visitors}
							id={val._id}
							event_image={val.event_image}
							className='!mb-0 !pl-8'
							type='gear'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default observer(SliderVertical)
