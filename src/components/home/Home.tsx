import { FC } from 'react'
import Slider from './Slider'

const Home: FC = () => {
	return (
		<div className='home-container w-full bg-alternative lg:w-9/12'>
			<div className='pt-24'>
				<Slider />
			</div>
			<div className='m-mt-18 relative z-10'>
				<div className='px-8'>
					<p className='uppercase font-semibold text-white lg:text-black'>Find the best events</p>
					<h1 className='font-semibold mb-8 mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl'>Are you looking for your next event?</h1>
					<p className='pb-10'>Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
				</div>
				<div className='bg-white px-8 pt-8 pb-20 lg:bg-alternative'>
					<h2 className='uppercase mb-4 font-semibold'>Find your next event</h2>
					<p className='mb-12'>Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
					<div className='myshadow rounded-3xl'>
						<div className='search-control flex px-4 pt-4'>
							<input type='text' className='border-0 focus:border-0 focus:ring-0' />
							<input type='date' className='border-0 focus:border-0 focus:ring-0' />
						</div>
						<button className='bg-primary w-full text-white px-4 py-2 rounded-3xl flex justify-center items-center transition hover:bg-black'>Search</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
