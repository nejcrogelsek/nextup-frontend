import { motion } from 'framer-motion'
import { observer } from 'mobx-react'
import router from 'next/router'
import { FC, useEffect, useState } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import DateIcon from '../icons/DateIcon'
import LocationIcon from '../icons/LocationIcon'
import SliderCard from './SliderCard'
import UpcomingEvents from './UpcomingEvents'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const searchForEvent = (val: IEvent) => {
		eventStore.viewedEvent = {
			id: val._id,
			title: val.title,
			date_start: val.date_start,
			time_start: val.time_start,
			location: val.location,
			max_visitors: val.max_visitors,
			event_image: val.event_image,
			description: val.description
		}
		router.push({
			pathname: `/event/${val.title.replaceAll(' ', '-')}`
		})
	}

	const getUpcomingEvents = async () => {
		await eventStore.getUpcomingEvents()
	}

	useEffect(() => {
		getUpcomingEvents()
	}, [])
	return (
		<div className='search-container'>
			<div className='bg-background-search h-500 lg:h-650 bg-no-repeat bg-cover flex justify-center items-center'>
				<div className='max-w-7xl w-full app-padding mx-auto'>
					<p className='uppercase font-medium my-6'>Search for events</p>
					<h1 className='font-medium mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl lg:w-custom2 mb-12 lg:mb-28'>What is next?</h1>
					<div className='bg-white myshadow rounded-3xl lg:flex lg:items-center lg:justify-between lg:shadow-none lg:w-full relative'>
						<div className='flex px-4 pt-4 lg:p-0'>
							<LocationIcon width='40' height='40' fill='#2f3c7e' className='ml-2' />
							<input type='text' placeholder='Search by location' className='border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none' onChange={(e) => setSearchTerm(e.target.value)} />
							<DateIcon width='40' height='40' fill='#2f3c7e' />
							<input type='date' className='border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none' />
						</div>
						{searchTerm === '' ? null :
							<motion.ul initial={{ transform: 'translateY(10%)', opacity: 0 }} animate={{ transform: 'translateY(0%)', opacity: 1 }} className='absolute mt-2 max-h-[224px] overflow-y-auto left-0 right-0 top-full rounded-3xl bg-white z-20'>
								{eventStore.upcomingEvents.filter((val: IEvent) => {
									if (searchTerm === '') {
										return null
									} else if (val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.location.toLowerCase().includes(searchTerm.toLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
										return val
									}
								}).map((val: IEvent, index: number) => (
									<li key={index} className='rounded-3xl p-2'>
										<button type='button' className='px-2 cursor-pointer transition hover:bg-gray-300 block w-full py-2 text-left rounded-3xl' onClick={() => searchForEvent(val)}>
											{val.title}
										</button>
									</li>
								))}
							</motion.ul>}
						<button className='bg-primary w-full text-white px-4 py-2 rounded-3xl flex justify-center items-center transition hover:bg-black lg:flex-1 lg:max-w-xs'>Search</button>
					</div>
				</div>
			</div>
			<div className='max-w-7xl w-full app-padding mx-auto relative'>
				<h2 className='font-normal text-2xl my-6 lg:my-0 lg:absolute lg:-top-6'>Featured events</h2>
				<SliderCard />
				<h2 className='font-normal mt-12 mb-4 text-2xl'>Events</h2>
				<p className='capitalize mb-8'>All upcoming events</p>
				<UpcomingEvents />
				<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 my-8 rounded-3xl flex justify-center items-center transition hover:bg-black'>Load more</button>
			</div>
		</div>
	)
}

export default observer(Search)
