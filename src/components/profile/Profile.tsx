import { FC, useEffect, useState } from 'react'
import Events from './Events'
import SliderVertical from './SliderVertical'

const Search: FC = () => {
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
	return (
		<div className='profile-container'>
			<div className='bg-alternative lg:h-[500px] bg-no-repeat bg-cover flex justify-center items-center'>
				<div className='w-full app-padding mx-auto pt-32 lg:pt-0 text-center'>
					<h1 className='font-semibold text-5xl text-primary leading-12 lg:leading-13 lg:text-65xl'>Floyd Miles</h1>
				</div>
			</div>
			<div className='bg-alternative lg:bg-white lg:flex justify-between max-w-7xl app-padding mx-auto pt-6 pb-12'>
				<div className='w-full lg:w-2/4/2 mb-12 lg:mb-0'>
					<h2 className='capitalize font-medium text-2xl mb-6 text-center lg:text-left'>All upcoming events</h2>
					{isMobile ? <Events type='tick' /> : <SliderVertical />}
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 mt-5 mb-12 rounded-3xl flex justify-center items-center transition hover:bg-black lg:hidden'>Load more</button>
				</div>
				<div className='w-full lg:w-2/4/2'>
					<h2 className='capitalize font-medium text-2xl mb-6 text-center lg:text-left'>Recent events</h2>
					{isMobile ? <Events /> : <SliderVertical />}
					<button type='button' className='bg-primary mx-auto text-white w-max px-8 py-2 mt-5 rounded-3xl flex justify-center items-center transition hover:bg-black lg:hidden'>Load more</button>
				</div>
			</div>
		</div>
	)
}

export default Search
