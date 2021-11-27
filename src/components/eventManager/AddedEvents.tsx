import { FC, useEffect } from 'react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import userStore from '../../stores/user.store'
import { observer } from 'mobx-react'

const AddedEvents: FC = () => {
	const getAddedEvents = () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			eventStore.getUserEvents(token)
		}
	}

	useEffect(() => {
		getAddedEvents()
	}, [userStore.user])

	return (
		<div>
			{eventStore.userEvents.map((val: IEvent, index: number) => (
				<EventBox
					key={index}
					url={val.url}
					id={val._id}
					user_id={val.user_id}
					title={val.title}
					description={val.description}
					date_start={val.date_start}
					time_start={val.time_start}
					location={val.location}
					max_visitors={val.max_visitors}
					event_image={val.event_image}
					type='gear'
				/>
			))}
		</div>
	)
}

export default observer(AddedEvents)
