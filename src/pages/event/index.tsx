import { Footer, Header } from '../../components/shared'
import EventPage from '../../components/event/Event'
import { FC } from 'react'

const Event: FC = () => {
	return (
		<div className='relative'>
			<EventPage />
			<div className='bg-white myshadow'>
				<div className='max-w-screen-xl bg-white mx-auto'>
					<div className="lg:w-2/4" >
						<Footer className='!text-sm' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Event
