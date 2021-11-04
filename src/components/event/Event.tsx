import { FC } from 'react'
import LocationIcon from '../icons/LocationIcon'
import Image from 'next/image'
import Link from 'next/link'
import PersonFillIcon from '../icons/PersonFillIcon'

const Event: FC = () => {
	const user = false
	return (
		<div className='max-w-screen-xl mx-auto'>
			<div className='absolute w-3/6 h-full -z-10 bg-alternative left-0 top-0'></div>
			<div className='event-container w-full bg-alternative lg:w-9/12'>
				<div className='swiper-event-image-wrap pt-24 lg:pt-0 lg:absolute lg:bottom-0 lg:right-0 lg:h-custom lg:overflow-hidden'>
					<div className='event-image-wrap h-full w-full'>
						<Image
							src='/event5.png'
							alt="Picture of the event"
							width={500}
							height={500}
							className='!w-auto !h-full object-cover'
							priority
						/>
					</div>
				</div>
				<div className='-mt-8 relative z-10 lg:-mt-0 lg:pt-32 lg:z-0 lg:w-3/5'>
					<div className='px-8'>
						<p className='flex justify-between items-center text-white lg:text-black'>
							<span>1.2.2020</span>
							<span>20:00</span>
						</p>
						<h1 className='font-medium mb-8 mt-4 text-5xl text-primary leading-12 lg:leading-13 lg:text-6xl'>Party with Eminem</h1>
						<p className='pb-10 flex justify-between items-center'>
							<span className='flex items-center font-medium pr-4'>
								<LocationIcon className='mr-2' fill='#2f3c7e' width='22' height='20' />
								6391 Elgin St. Celina, Delaware
							</span>
							<span className='flex items-center font-medium'>
								<PersonFillIcon className='mr-2' fill='#2f3c7e' width='21.5' height='21.5' />
								100
							</span>
						</p>
					</div>
					<div className='bg-white px-8 pt-8 pb-20 lg:bg-transparent'>
						<h2 className='uppercase mb-4 font-medium'>Event description:</h2>
						<p className='mb-20 lg:w-custom2'>Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum. Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus consequat, massa etiam a sed in. Sollicitudin id dignissim tincidunt ipsum vel morbi diam  ultricies fermentum.</p>
						<div className='flex flex-col items-end'>
							{user ? <button type='button' className='bg-primary text-white w-max px-8 py-4 rounded-2xl flex justify-center items-center transition hover:bg-black'>Book</button> :
								<>
									<Link href='/login'><a className='bg-primary text-white w-max px-8 py-3 mb-4 rounded-3xl flex justify-center items-center transition hover:bg-black'>Login</a></Link>
									<p>To attend event you need to login.</p>
								</>}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Event
