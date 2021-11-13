import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import EventBox from '../shared/eventBox/EventBox'

const UpcomingEvents: FC = () => {

	return (
		<div>
			{eventStore.upcomingEvents.map((item: IEvent, index: number) => (
				<EventBox
					key={index}
					id={item.id}
					title={item.title}
					description={item.description}
					date_start={item.date_start}
					time_start={item.time_start}
					location={item.location}
					max_visitors={item.max_visitors}
					event_image={item.event_image}
					type='search'
				/>
			))}
		</div>
	)
}

export default observer(UpcomingEvents)
