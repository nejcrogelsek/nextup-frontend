import { FC } from 'react'
import DateIcon from '../icons/DateIcon'
import LocationIcon from '../icons/LocationIcon'
import Slider from './Slider'

const Home: FC = () => {
	return (
		<div className='home-container w-full bg-alternative lg:w-9/12'>
			<div className='swiper-event-image-wrap pt-24 lg:pt-0 lg:absolute lg:bottom-0 lg:right-0'>
				<Slider />
			</div>
			<div className='m-mt-18 relative z-10 lg:-mt-0 lg:pt-32 lg:z-0'>
				<div className='px-8'>
					<p className='uppercase font-semibold text-white lg:text-black'>Find the best events</p>
					<h1 className='font-semibold mb-8 mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl lg:w-custom2'>Are you looking for your next event?</h1>
					<p className='pb-10 lg:w-custom3 xl:w-custom2'>Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
				</div>
				<div className='bg-white px-8 pt-8 pb-20 lg:bg-transparent'>
					<h2 className='uppercase mb-4 font-semibold'>Find your next event</h2>
					<p className='mb-12 lg:w-custom2'>Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
					<div className='myshadow rounded-2xl lg:flex lg:items-center lg:shadow-none lg:w-custom lg:bg-white'>
						<div className='flex px-4 pt-4 lg:p-0'>
							<LocationIcon width='40' height='40' fill='#2f3c7e' className='ml-2' />
							<input type='text' className='border-0 focus:border-0 focus:ring-0 lg:m-0' />
							<DateIcon width='40' height='40' fill='#2f3c7e' />
							<input type='date' className='border-0 focus:border-0 focus:ring-0 lg:m-0' />
						</div>
						<button className='bg-primary w-full text-white px-4 py-2 rounded-2xl flex justify-center items-center transition hover:bg-black lg:flex-1 lg:max-w-xs'>Search</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
