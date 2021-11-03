import { Footer, Header } from '../components/shared'
import EventPage from '../components/event/Event'
import { FC } from 'react'

const Event: FC = () => {
	return (
		<div className='relative bg-background-pattern'>
			<Header />
			<EventPage />
			<div className="lg:w-2/4" >
				<Footer />
			</div>
		</div>
	)
}

export default Event
