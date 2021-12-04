import { FC, useEffect, useState } from 'react'
import userStore from '../../stores/user.store'
import Events from './Events'
import SliderVertical from './SliderVertical'

const Search: FC = () => {
	const [isMobile, setIsMobile] = useState(true)
	const [limitUpcoming, setUpcomingLimit] = useState(4);
	const [limitRecent, setRecentLimit] = useState(4);

	const showMoreEvents = (type: number) => {
		if (isMobile) {
			if (type === 1) {
				setUpcomingLimit(limitUpcoming + 4);
			} else {
				setRecentLimit(limitRecent + 4)
			}
		} else {
			if (type === 1) {
				setUpcomingLimit(limitUpcoming + 7);
			} else {
				setRecentLimit(limitRecent + 7)
			}
		}
	}

	const checkIfMobile = () => {
		if (window.innerWidth < 992) {
			setIsMobile(true);
			setUpcomingLimit(4);
			setRecentLimit(4)
		} else {
			setIsMobile(false);
			setUpcomingLimit(7);
			setRecentLimit(7)
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
		<div className='profile-container'>
			<div className='bg-alternative lg:h-[500px] bg-no-repeat bg-cover flex justify-center items-center lg:items-start'>
				<div className='w-full app-padding mx-auto pt-32 lg:pt-36 text-center'>
					<h1 className='font-semibold text-5xl text-primary leading-12 lg:leading-13 lg:text-65xl'>{userStore.user && `${userStore.user.first_name} ${userStore.user.last_name}`}</h1>
				</div>
			</div>
			<div className='bg-alternative lg:bg-transparent lg:flex justify-between max-w-screen-xl app-padding mx-auto pt-6 pb-12 lg:-mt-60'>
				<div className='w-full lg:w-2/4/2 mb-12 lg:mb-0'>
					<h2 className='capitalize font-medium text-2xl mb-6 text-center lg:text-left'>All upcoming events</h2>
					{isMobile ? <Events limit={limitUpcoming} type='tick' /> : <SliderVertical type='tick' />}
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 mt-5 mb-12 rounded-3xl flex justify-center items-center transition hover:bg-black lg:hidden' onClick={() => showMoreEvents(1)}>Load more</button>
				</div>
				<div className='w-full lg:w-2/4/2'>
					<h2 className='capitalize font-medium text-2xl mb-6 text-center lg:text-left'>Recent events</h2>
					{isMobile ? <Events limit={limitRecent} /> : <SliderVertical />}
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 mt-5 rounded-3xl flex justify-center items-center transition hover:bg-black lg:hidden' onClick={() => showMoreEvents(0)}>Load more</button>
				</div>
			</div>
		</div>
	)
}

export default Search
