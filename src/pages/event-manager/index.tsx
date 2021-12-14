import { FC } from 'react'
import EventManagerPage from '../../components/eventManager/EventManager'
import { Footer, Redirect } from '../../components/shared'
import userStore from '../../stores/user.store'

const EventManager: FC = () => {

	if (!userStore.user) {
		return <Redirect to='/signup' />
	}

	return (
		<>
			<EventManagerPage />
			<Footer />
		</>
	)
}

export default EventManager
