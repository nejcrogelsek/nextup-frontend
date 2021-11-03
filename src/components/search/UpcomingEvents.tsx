import { FC } from 'react'
import EventBox from './EventBox'

const UpcomingEvents: FC = () => {
	return (
		<div className='upcoming-events-container'>
			<EventBox />
			<EventBox />
			<EventBox />
			<EventBox />
			<EventBox />
			<EventBox />
			<EventBox />
			<EventBox />
		</div>
	)
}

export default UpcomingEvents
