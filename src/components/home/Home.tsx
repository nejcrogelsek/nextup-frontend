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
import Slider from './Slider'

const Home: FC = () => {
	const router = useRouter()
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
				eventStore.isSearching = true
				router.push('/search')
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
		eventStore.searchResults = null
		getUpcomingEvents()
	}, [])

	useEffect(() => {
		if (dateTerm === '') {
			setDateError(false)
		}
	}, [dateTerm])

	return (
		<>
			<ValidationToast error={error} setError={setError} />
			<div className='max-w-screen-xl mx-auto'>
				<div className='absolute w-3/6 h-full -z-10 bg-alternative left-0 top-0'></div>
				<div className='home-container max-w-screen-xl w-full bg-alternative lg:w-9/12'>
					<div className='swiper-event-image-wrap pt-24 lg:pt-0 lg:absolute lg:bottom-0 lg:right-0 z-0'>
						<Slider />
					</div>
					<div className='m-mt-18 relative z-10 lg:-mt-0 lg:pt-32 lg:z-0 lg:w-custom2'>
						<div className='px-8'>
							<p className='uppercase font-medium text-white lg:text-black'>Find the best events</p>
							<h1 className='font-medium mb-8 mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl lg:w-custom2'>Are you looking for your next event?</h1>
							<p className='pb-10 lg:w-custom3 xl:w-custom2'>Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
						</div>
						<div className='bg-white px-8 pt-8 pb-20 lg:bg-transparent'>
							<h2 className='uppercase mb-4 font-medium'>Find your next event</h2>
							<p className='mb-12 lg:w-custom2'>Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
							<div className='myshadow rounded-2xl lg:flex lg:items-center lg:justify-between lg:shadow-none lg:w-[1000px] xl:w-[1108px] lg:bg-white relative'>
								<div className='flex px-4 pt-4 lg:p-0 lg:flex-1'>
									<LocationIcon width='40' height='40' fill='#2f3c7e' className='ml-2' />
									<input type='text' placeholder='Search by location' className='border-0 focus:border-0 focus:ring-0 lg:m-0' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
									<DateIcon width='40' height='40' fill='#2f3c7e' />
									<input
										type='text'
										name='date_start'
										className={dateError ? 'border-0 focus:border-0 focus:ring-0 lg:m-0 text-red-500' : 'border-0 focus:border-0 focus:ring-0 lg:m-0'}
										placeholder='5.12.2022'
										value={dateTerm}
										onChange={(e) => onChangeDate(e)}
									/>
								</div>
								<button className='bg-primary w-full text-white px-4 py-2 rounded-2xl flex justify-center items-center border-[1px] border-primary hover:border-bg-black transition disabled:cursor-not-allowed disabled:hover:bg-primary hover:bg-black hover:border-black lg:flex-1 lg:max-w-xs' disabled={searchTerm === '' && dateTerm === '' ? true : false} onClick={searchFunctionality}>Search</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default observer(Home)
