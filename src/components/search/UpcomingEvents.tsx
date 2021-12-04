import { motion } from 'framer-motion'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import { EventBox } from '../shared'

interface Props {
	limit: number
}

const UpcomingEvents: FC<Props> = ({ limit }: Props) => {

	return (
		<div>
			{eventStore.upcomingEvents.slice(0, limit).map((val: IEvent, index: number) => (
				<motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<EventBox
						id={val._id}
						title={val.title}
						url={val.url}
						description={val.description}
						user_id={val.user_id}
						date_start={val.date_start}
						time_start={val.time_start}
						location={val.location}
						max_visitors={val.max_visitors}
						event_image={val.event_image}
						type='search'
					/>
				</motion.div>
			))}
		</div>
	)
}

export default observer(UpcomingEvents)
