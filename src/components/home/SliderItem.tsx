import { FC } from 'react'
import Image from 'next/image'

interface Props {
	image: string
}

const SliderItem: FC<Props> = ({ image }: Props) => {
	return (
		<div>
			<Image
				src={image}
				alt="Picture of the event"
				width={500}
				height={500}
				className='!w-auto !h-auto'
				priority // preload image
			/>
		</div>
	)
}

export default SliderItem
