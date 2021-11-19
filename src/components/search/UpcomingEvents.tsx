import { observer } from 'mobx-react'
import { FC } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import EventBox from '../shared/eventBox/EventBox'

const UpcomingEvents: FC = () => {

	return (
		<div>
			{eventStore.upcomingEvents.map((val: IEvent, index: number) => (
				<EventBox
					key={index}
					id={val._id}
					title={val.title}
					description={val.description}
					user_id={val.user_id}
					date_start={val.date_start}
					time_start={val.time_start}
					location={val.location}
					max_visitors={val.max_visitors}
					event_image={val.event_image}
					type='search'
				/>
			))}
		</div>
	)
}

export default observer(UpcomingEvents)
