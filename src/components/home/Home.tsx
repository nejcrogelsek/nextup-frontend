import { FC } from 'react'
import Slider from './Slider'

const Home: FC = () => {
	return (
		<div className='home-container bg-alternative lg:w-9/12'>
			<div>
				<Slider />
			</div>
			<div>
				<p className='uppercase'>Find the best events</p>
				<h1>Are you looking for your next event?</h1>
				<p>Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
				<div>
					<h2>Find your next event</h2>
					<p>Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
					<div className="search">
						SEARCH
						<button>Search</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
