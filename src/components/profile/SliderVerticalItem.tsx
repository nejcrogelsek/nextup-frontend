import { FC } from 'react'
import Image from 'next/image'

interface Props {
	image: string
}

const SliderVerticalItem: FC<Props> = ({ image }: Props) => {
	return (
		<div className='swiper-item-wrap h-full'>
			<Image
				src={image}
				alt="Picture of the event"
				width={500}
				height={500}
				className='!w-auto !h-full object-cover'
				priority // preload image
			/>
		</div>
	)
}

export default SliderVerticalItem
