import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'

// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
import SliderItem from './SliderItem'

const defaultData = [{ image: '/event1.png' }, { image: '/event2.png' }, { image: '/event3.png' }, { image: '/event4.png' },]

const Slider: FC = () => {
	const [sliders, setSliders] = useState<{ image: string }[] | []>([])

	useEffect(() => {
		setSliders(defaultData)
	}, [])
	return (
		<>
			<Swiper
				spaceBetween={20}
				slidesPerView={1.2}
				watchOverflow={true}
				breakpoints={{
					1200: {
						width: 1024,
						slidesPerView: 1.5,
					},
					600: {
						width: 600,
						slidesPerView: 1.2,
					},
				}}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper: any) => console.log(swiper)}>
				{sliders.map((item) => (
					<SwiperSlide key={item.image}>
						<SliderItem image={item.image} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default observer(Slider)
