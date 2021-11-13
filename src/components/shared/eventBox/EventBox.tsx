import { FC } from 'react'
import SettingsIcon from '../../icons/SettingsIcon'
import TickIcon from '../../icons/TickIcon'
import { format } from 'date-fns'
import router from 'next/router'
import eventStore from '../../../stores/event.store'

interface Props {
	className?: string
	id: string
	title: string
	event_image: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string,
	type?: string
}

const EventBox: FC<Props> = ({ className, type, title, event_image, id, max_visitors, location, date_start, time_start, description }: Props) => {

	const updateEvent = () => {
		console.log('UPDATE EVENT')
	}
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
		<div className={`flex justify-between items-center p-2 min:p-4 myshadow rounded-2xl mb-4 bg-white ${className}`}>
			<div className='flex justify-start items-center'>
				<div className='eventbox-column'>
					<span className='block w-12 min:w-16'>1 Apr</span>
					<span className='block'>Fri{' '}{time_start}</span>
				</div>
				<div className='eventbox-column'>
					<span>{title}</span>
					<span>{location}</span>
				</div>
			</div>
			<div>
				{type === 'search' ? <button className='bg-primary mx-auto text-sm md:w-44 text-white px-2 py-2 min:px-4 rounded-xl flex justify-center items-center transition hover:bg-black' onClick={checkEvent}>Check</button>
					: type === 'gear' ? <button className='bg-primary mx-auto text-sm text-white px-5 py-5 rounded-xl flex justify-center items-center transition hover:bg-black' onClick={updateEvent}><SettingsIcon /></button>
						: type === 'tick' ? <button className='bg-primary mx-auto text-sm text-white px-5 py-5 rounded-xl flex justify-center items-center transition hover:bg-black' onClick={checkEvent}><TickIcon /></button>
							: null
				}
			</div>
		</div>
	)
}

export default EventBox
