import { FC, useEffect } from 'react'
import { EventBox } from '../shared'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import { observer } from 'mobx-react'
import { motion } from 'framer-motion'

interface Props {
	type?: string
	limit: number
}

const Events: FC<Props> = ({ type, limit }: Props) => {

	const getEvents = async () => {
		if (type) {
			await eventStore.getUpcomingEvents()
		} else {
			await eventStore.getRecent()
		}
	}

	useEffect(() => {
		getEvents()
	}, [])

	return (
		<div>
			{type ?
				<>
					{eventStore.upcomingEvents.slice(0, limit).map((val: IEvent, index: number) => (
						<motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
						</motion.div>
					))}
				</>
				:
				<>
					{eventStore.recentEvents.slice(0, limit).map((val: IEvent, index: number) => (
						<motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
						</motion.div>
					))}
				</>
			}
		</div>
	)
}

export default observer(Events)
