import { FC } from 'react'

const EventBox: FC = () => {
	return (
		<div className='flex justify-between items-center p-2 min:p-4 myshadow rounded-2xl mb-4'>
			<div className='flex justify-start items-center'>
				<div className='eventbox-column'>
					<span className='block w-12 min:w-16'>1. Aug</span>
					<span className='block'>Fri 22.00</span>
				</div>
				<div className='eventbox-column'>
					<span>Hawaii with Maii on beach Twixie</span>
					<span>1901 Thornridge, Hawaii 81063</span>
				</div>
			</div>
			<div>
				<button className='bg-primary mx-auto text-sm md:w-44 text-white px-2 py-2 min:px-4 rounded-xl flex justify-center items-center transition hover:bg-black'>Check</button>
			</div>
		</div>
	)
}

export default EventBox
