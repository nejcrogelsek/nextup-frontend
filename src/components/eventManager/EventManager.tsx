import { FC, useEffect, useState } from 'react'
import eventStore from '../../stores/event.store'
import userStore from '../../stores/user.store'
import AddEventForm from '../forms/AddEventForm'
import AddedEvents from './AddedEvents'
import SliderVertical from './SliderVertical'

const EventManagerPage: FC = () => {
	const [isMobile, setIsMobile] = useState(true)

	const checkIfMobile = () => {
		if (window.innerWidth < 1024) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	useEffect(() => {
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)
		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	const getAddedEvents = () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			eventStore.getUserEvents(token)
		}
	}

	// useEffect(() => {
	// 	getAddedEvents()
	// }, [userStore.user])
	return (
		<div className='bg-alternative'>
			<div className='event-manager-container pb-20 max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-start pt-44 bg-alternative app-padding'>
				<div className='w-full lg:w-2/4/2 mb-12 lg:mb-0'>
					<h2 className='capitalize font-medium text-2xl mb-8'>Add event</h2>
					<AddEventForm />
				</div>
				<div className='w-full lg:w-2/4/2'>
					<h2 className='capitalize font-medium text-2xl m-mb-18'>Added events</h2>
					{isMobile ? <AddedEvents /> : <SliderVertical />}
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 my-5 rounded-3xl flex justify-center items-center transition hover:bg-black lg:hidden'>Load more</button>
				</div>
			</div>
		</div>
	)
}

export default EventManagerPage
