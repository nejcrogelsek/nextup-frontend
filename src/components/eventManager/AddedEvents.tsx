import { FC } from 'react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'

const AddedEvents: FC = () => {
	return (
		<div>
			{eventStore.userEvents?.map((item: IEvent, index: number) => (
				<EventBox
					key={index}
					title={item.title}
					description={item.description}
					date_start={item.date_start}
					time_start={item.time_start}
					location={item.location}
					max_visitors={item.max_visitors}
					type='gear'
				/>
			))}
		</div>
	)
}

export default AddedEvents
