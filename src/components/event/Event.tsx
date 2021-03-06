import { FC, useEffect, useState } from 'react'
import LocationIcon from '../icons/LocationIcon'
import Image from 'next/image'
import Link from 'next/link'
import PersonFillIcon from '../icons/PersonFillIcon'
import eventStore from '../../stores/event.store'
import userStore from '../../stores/user.store'
import { observer } from 'mobx-react'
import { bookedEvents, bookEventReservation, deleteReservation, getEventByUrl, numOfVisitors } from '../../pages/api/event.actions'
import { useRouter } from 'next/router'
import { ValidationToast } from '../shared'

const Event: FC = () => {
	const router = useRouter()
	const { url } = router.query
	const [error, setError] = useState<any | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [allow, setAllow] = useState<boolean>(false)
	const [canBook, setCanBook] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const bookEvent = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			setIsLoading(true)
			const res = await bookEventReservation(eventStore.viewedEvent.id, token)
			if (res.request) {
				setSuccess(`${userStore.user.first_name} you successfully book reservation for event: ${eventStore.viewedEvent.title}`)
				setAllow(false)
			} else {
				setError(res)
			}
			setIsLoading(false)
		}
	}

	const unbookEvent = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			setIsLoading(true)
			const res = await deleteReservation(eventStore.viewedEvent.id, token)
			if (res.request) {
				setSuccess(`${userStore.user.first_name} you successfully delete reservation for event: ${eventStore.viewedEvent.title}`)
				setAllow(true)
			} else {
				setError(res)
			}
			setIsLoading(false)
		}
	}

	const checkIfUserAlreadyBookedEvent = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token && eventStore.viewedEvent) {
			setIsLoading(true)
			const res = await bookedEvents(eventStore.viewedEvent.id, token)
			const isAllowed = JSON.parse(res.request.response)
			setAllow(isAllowed.allowed)
			setIsLoading(false)
			if (isAllowed.allowed === false) {
				setCanBook(true)
			}
		}
	}

	const checkMaxNumberOfUsers = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token && eventStore.viewedEvent) {
			setIsLoading(true)
			const res = await numOfVisitors(eventStore.viewedEvent.id, token)
			const isAllowed = JSON.parse(res.request.response)
			setCanBook(isAllowed.allowed)
			setIsLoading(false)
		}
	}

	const getEventData = async () => {
		const res = await getEventByUrl(url.toString())
		if (res.request) {
			const data = JSON.parse(JSON.parse(JSON.stringify(res.request.response)))
			eventStore.viewedEvent = {
				id: data._id,
				title: data.title,
				date_start: data.date_start,
				time_start: data.time_start,
				location: data.location,
				max_visitors: data.max_visitors,
				event_image: data.event_image,
				description: data.description,
				url: data.url
			}
		} else {
			setError('No events found.')
		}
	}

	useEffect(() => {
		if (userStore.user) {
			checkIfUserAlreadyBookedEvent()
		}
		checkMaxNumberOfUsers()
	}, [])

	useEffect(() => {
		if (userStore.user) {
			checkIfUserAlreadyBookedEvent()
		}
	}, [canBook])

	useEffect(() => {
		if (!url) {
			return;
		}
		getEventData()
	}, [url])

	return (
		<>
			{isLoading ? <div className='fixed left-0 right-0 top-0 bottom-0 w-full h-screen bg-primary bg-opacity-25 z-50'>
				<div className='flex w-full h-full justify-center items-center'>
					<div className="flex justify-center items-center">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
					</div>
				</div>
			</div> : null}
			{eventStore.viewedEvent ?
				<div className='max-w-screen-xl mx-auto'>
					<ValidationToast error={error} setError={setError} success={success} setSuccess={setSuccess} />
					<div className='absolute w-3/6 h-full -z-10 bg-alternative left-0 top-0'></div>
					<div className='event-container w-full bg-alternative lg:w-9/12'>
						<div className='swiper-event-image-wrap pt-24 lg:pt-0 lg:absolute lg:bottom-0 lg:right-0 lg:h-calc lg:overflow-hidden'>
							<div className='event-image-wrap h-full w-full'>
								<Image
									src={eventStore.viewedEvent.event_image}
									alt="Picture of the event"
									width={500}
									height={500}
									className='!w-auto !h-full object-cover'
									priority
								/>
							</div>
						</div>
						<div className='-mt-8 relative z-10 lg:-mt-0 lg:pt-32 lg:z-0 lg:w-3/5'>
							<div className='px-8 lg:w-[500px] xl:w-[600px]'>
								<p className='flex justify-between items-center text-white lg:text-black'>
									<span>{eventStore.viewedEvent.date_start}</span>
									<span>{eventStore.viewedEvent.time_start}</span>
								</p>
								<h1 className='font-medium mb-8 mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl break-words'>{eventStore.viewedEvent.title}</h1>
								<p className='pb-10 flex justify-between it ems-center'>
									<span className='flex items-center font-medium pr-4'>
										<LocationIcon className='mr-2' fill='#2f3c7e' width='22' height='20' />
										{eventStore.viewedEvent.location}
									</span>
									<span className='flex items-center font-medium'>
										<PersonFillIcon className='mr-2' fill='#2f3c7e' width='21.5' height='21.5' />
										{eventStore.viewedEvent.max_visitors}
									</span>
								</p>
							</div>
							<div className='bg-white px-8 pt-8 pb-20 lg:bg-transparent lg:w-[500px] xl:w-[600px]'>
								<h2 className='uppercase mb-4 font-medium'>Event description:</h2>
								<p className='mb-[2.875rem]'>{eventStore.viewedEvent.description}</p>
								<div className='flex flex-col items-end'>
									{userStore.user ?
										<>
											{canBook ? <button type='button' className='bg-primary text-white w-max px-8 py-4 rounded-2xl flex justify-center items-center transition hover:bg-black' onClick={allow ? bookEvent : unbookEvent}>{allow ? 'Book' : 'Unbook'}</button> :
												<button type='button' disabled={true} className='bg-primary text-white w-max px-8 py-4 rounded-2xl flex justify-center items-center transition cursor-not-allowed'>Full</button>}
										</> :
										<>
											<Link href='/login'><a className='bg-primary text-white w-max px-8 py-3 mb-4 rounded-3xl flex justify-center items-center transition hover:bg-black'>Login</a></Link>
											<p className='text-right'>To attend event you need to login.</p>
										</>}
								</div>
							</div>
						</div>
					</div>
				</div> : null
			}
		</>
	)
}

export default observer(Event)
