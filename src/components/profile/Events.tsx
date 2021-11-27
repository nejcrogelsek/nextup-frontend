import { FC, useEffect } from 'react'
import EventBox from '../shared/eventBox/EventBox'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import { observer } from 'mobx-react'

interface Props {
	type?: string
}

const Events: FC<Props> = ({ type }: Props) => {

	const getUpcomingEvents = async () => {
		await eventStore.getUpcomingEvents()
	}

	useEffect(() => {
		getUpcomingEvents()
	}, [])

	return (
		<div>
			{eventStore.upcomingEvents.map((val: IEvent, index: number) => (
				<EventBox
					key={index}
					id={val._id}
					url={val.url}
					user_id={val.user_id}
					event_image={val.event_image}
					title={val.title}
					description={val.description}
					date_start={val.date_start}
					time_start={val.time_start}
					location={val.location}
					max_visitors={val.max_visitors}
					type={type && type}
				/>
			))}
		</div>
	)
}

export default observer(Events)
