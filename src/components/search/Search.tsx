import { motion } from 'framer-motion'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { IEvent } from '../../interfaces/event.interface'
import { searchEvent } from '../../pages/api/event.actions'
import eventStore from '../../stores/event.store'
import DateIcon from '../icons/DateIcon'
import LocationIcon from '../icons/LocationIcon'
import { ValidationToast } from '../shared'
import SliderCard from './SliderCard'
import UpcomingEvents from './UpcomingEvents'

const Search: FC = () => {
	const router = useRouter()
	const [isMobile, setIsMobile] = useState(true);
	const [limit, setLimit] = useState(4);
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [dateTerm, setDateTerm] = useState<string>('')
	const [error, setError] = useState<any | null>(null)
	const [dateError, setDateError] = useState<boolean>(false)

	const getUpcomingEvents = async () => {
		await eventStore.getUpcomingEvents()
	}

	const searchFunctionality = async () => {
		if (!dateError) {
			const res = await searchEvent(searchTerm, dateTerm)
			if (res.request) {
				const data = JSON.parse(res.request.response)
				eventStore.searchResults = data
				setSearchTerm('')
				setDateTerm('')
			} else {
				setError(res)
			}
		} else {
			setError({ message: 'Date is not in the right format.' })
		}
	}

	const onChangeDate = (e: any) => {
		setDateTerm(e.target.value)
		if (e.target.value.match(/^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/)) {
			setDateError(false)
		} else {
			setDateError(true)
		}
	}

	useEffect(() => {
		if (eventStore.isSearching) {
			eventStore.isSearching = false
		} else {
			eventStore.searchResults = null
		}
		getUpcomingEvents()
	}, [])

	useEffect(() => {
		if (dateTerm === '') {
			setDateError(false)
		}
	}, [dateTerm])


	const showMoreEvents = () => {
		if (isMobile) {
			setLimit(limit + 4);
		} else {
			setLimit(limit + 7);
		}
	}

	const checkIfMobile = () => {
		if (window.innerWidth < 992) {
			setIsMobile(true);
			setLimit(4);
		} else {
			setIsMobile(false);
			setLimit(7);
		}
	};

	useEffect(() => {
		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);
		return () => {
			window.removeEventListener('resize', checkIfMobile);
		};
	}, []);

	return (
		<>
			<ValidationToast error={error} setError={setError} />
			<div className='search-container'>
				<div className='bg-background-search h-500 lg:h-650 bg-no-repeat bg-cover flex justify-center items-center'>
					<div className='max-w-7xl w-full app-padding mx-auto'>
						<p className='uppercase font-medium my-6'>Search for events</p>
						<h1 className='font-medium mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl lg:w-custom2 mb-12 lg:mb-28'>What is next?</h1>
						<div className='bg-white myshadow rounded-3xl lg:flex lg:items-center lg:justify-between lg:shadow-none lg:w-full relative'>
							<div className='flex px-4 pt-4 lg:p-0'>
								<LocationIcon width='40' height='40' fill='#2f3c7e' className='ml-2' />
								<input type='text' placeholder='Search by location' className='border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
								<DateIcon width='40' height='40' fill='#2f3c7e' />
								<input
									type='text'
									name='date_start'
									className={dateError ? 'border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none text-red-500' : 'border-0 focus:border-0 focus:ring-0 lg:m-0 shadow-none'}
									placeholder='5.12.2022'
									value={dateTerm}
									onChange={(e) => onChangeDate(e)}
								/>
							</div>
							<button className='bg-primary w-full text-white px-4 py-2 rounded-3xl flex justify-center items-center transition hover:bg-black lg:flex-1 lg:max-w-xs disabled:cursor-not-allowed disabled:hover:bg-primary border-[1px] border-primary hover:border-bg-black' disabled={searchTerm === '' && dateTerm === '' ? true : false} onClick={searchFunctionality}>Search</button>
						</div>
					</div>
				</div>
				<div className='max-w-7xl w-full app-padding mx-auto relative'>
					{eventStore.searchResults ? null : <h2 className='font-normal text-2xl my-6 lg:my-0 lg:absolute lg:-top-6'>Featured events</h2>}
					<SliderCard />
					<h2 className='font-normal mt-12 mb-4 text-2xl'>Events</h2>
					<p className='capitalize mb-8'>All upcoming events</p>
					<UpcomingEvents limit={limit} />
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 my-8 rounded-3xl flex justify-center items-center transition hover:bg-black' onClick={showMoreEvents}>Load more</button>
				</div>
			</div>
		</>
	)
}

export default observer(Search)
