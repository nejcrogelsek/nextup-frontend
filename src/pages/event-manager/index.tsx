import { FC } from 'react'
import EventManagerPage from '../../components/eventManager/EventManager'
import { Footer } from '../../components/shared'

const EventManager: FC = () => {
	return (
		<>
			<EventManagerPage />
			<Footer />
		</>
	)
}

export default EventManager
