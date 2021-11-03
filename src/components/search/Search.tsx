import { FC } from 'react'
import DateIcon from '../icons/DateIcon'
import LocationIcon from '../icons/LocationIcon'
import SliderCard from './SliderCard'
import UpcomingEvents from './UpcomingEvents'

const Search: FC = () => {
	return (
		<div className='search-container'>
			<div className='bg-background-search h-500 lg:h-650 bg-no-repeat bg-cover flex justify-center items-center'>
				<div className='max-w-6xl w-full px-8'>
					<p className='uppercase font-medium my-6'>Featured events</p>
					<h1 className='font-medium mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl lg:w-custom2 mb-12 lg:mb-28'>What is next?</h1>
					<div className='bg-white myshadow rounded-3xl lg:flex lg:items-center lg:justify-between lg:shadow-none lg:w-full'>
						<div className='flex px-4 pt-4 lg:p-0'>
							<LocationIcon width='40' height='40' fill='#2f3c7e' className='ml-2' />
							<input type='text' placeholder='Search by location' className='border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none' />
							<DateIcon width='40' height='40' fill='#2f3c7e' />
							<input type='date' className='border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none' />
						</div>
						<button className='bg-primary w-full text-white px-4 py-2 rounded-3xl flex justify-center items-center transition hover:bg-black lg:flex-1 lg:max-w-xs'>Search</button>
					</div>
				</div>
			</div>
			<div className='w-full px-8'>
				<h2 className='font-normal text-2xl my-6 lg:hidden'>Featured events</h2>
				<SliderCard />
				<h2 className='font-normal mt-12 mb-4 text-2xl'>Events</h2>
				<p className='capitalize mb-8'>All upcoming events</p>
				<UpcomingEvents />
				<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 my-8 rounded-3xl flex justify-center items-center transition hover:bg-black'>Load more</button>
			</div>
		</div>
	)
}

export default Search
