import { FC } from 'react'
import EventManagerPage from '../../components/eventManager/EventManager'
import { Footer, Header } from '../../components/shared'

const EventManager: FC = () => {
	return (
		<>
			<Header />
			<EventManagerPage />
			<Footer />
		</>
	)
}

export default EventManager
