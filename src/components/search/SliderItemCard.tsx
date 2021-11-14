import { FC } from 'react'
import Image from 'next/image'
import LocationIcon from '../icons/LocationIcon'
import PersonFillIcon from '../icons/PersonFillIcon'
import eventStore from '../../stores/event.store'
import router from 'next/router'
import { observer } from 'mobx-react'

interface Props {
	image: string
	title: string
	date_start: Date
	time_start: string
	location: string
	event_image: string
	id: string
	description: string
	max_visitors: number
}

const SliderItemCard: FC<Props> = ({ id, event_image, description, image, title, date_start, time_start, location, max_visitors }: Props) => {
	const checkEvent = () => {
		eventStore.viewedEvent = {
			id,
			title,
			date_start,
			time_start,
			location,
			max_visitors,
			event_image,
			description
		}
		router.push({
			pathname: `/event/${title.replaceAll(' ', '-')}`
		})
	}
	return (
		<div className='max-w-[360px]'>
			<div className='image-wrap'>
				<Image
					src={image}
					alt="Picture of the event"
					width={378}
					height={247}
					className='!w-auto !h-full object-cover'
				/>
			</div>
			<div className='px-4 pb-4'>
				<h3 className='text-2xl text-primary font-medium mt-4 mb-2' onClick={checkEvent}>{title}</h3>
				<div className='flex text-sm'>
					<span>1.1.2020</span>
					<span>{time_start}</span>
				</div>
				<p className='flex justify-between items-center mt-8'>
					<span className='flex items-center font-medium pr-4 text-sm'>
						<LocationIcon className='mr-2' fill='#2f3c7e' width='22' height='20' />
						{location}
					</span>
					<span className='flex items-center font-medium'>
						<PersonFillIcon className='mr-2' fill='#2f3c7e' width='21.5' height='21.5' />
						{max_visitors}
					</span>
				</p>
			</div>
		</div>
	)
}

export default observer(SliderItemCard)
