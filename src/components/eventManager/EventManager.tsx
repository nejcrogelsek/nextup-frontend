import { FC } from 'react'
import AddEventForm from '../forms/AddEventForm'
import SliderVertical from './SliderVertical'

const EventManagerPage: FC = () => {
	return (
		<div className='flex flex-col lg:flex-row justify-center items-center pt-24 bg-alternative app-padding'>
			<div className='w-full lg:w-2/4 mb-12 lg:mb-0'>
				<h2 className='capitalize font-medium text-2xl'>Add event</h2>
				<AddEventForm />
			</div>
			<div className='w-full lg:w-2/4'>
				<h2 className='capitalize font-medium text-2xl'>Added events</h2>
				<SliderVertical />
			</div>
		</div>
	)
}

export default EventManagerPage
