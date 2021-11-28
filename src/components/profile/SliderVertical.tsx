import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EventBox } from '../shared'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'

interface Props {
	type?: string
}

const SliderVertical: FC<Props> = ({ type }: Props) => {
	const getUpcomingEvents = async () => {
		await eventStore.getUpcomingEvents()
	}

	useEffect(() => {
		getUpcomingEvents()
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
				{eventStore.upcomingEvents.map((val: IEvent, index: number) => (
					<SwiperSlide key={index} className='!w-full !h-auto'>
						<EventBox
							title={val.title}
							event_image={val.event_image}
							id={val._id}
							url={val.url}
							description={val.description}
							date_start={val.date_start}
							time_start={val.time_start}
							location={val.location}
							max_visitors={val.max_visitors}
							user_id={val.user_id}
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
