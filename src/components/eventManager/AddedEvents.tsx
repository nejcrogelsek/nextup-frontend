import { FC, useEffect } from 'react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import userStore from '../../stores/user.store'

const AddedEvents: FC = () => {
	const getAddedEvents = () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			eventStore.getUserEvents(token)
		}
	}

	useEffect(() => {
		getAddedEvents()
		console.log(eventStore.userEvents)
	}, [userStore.user])

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
