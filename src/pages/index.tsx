import Head from 'next/head'
import { Footer } from '../components/shared'
import Homepage from '../components/home/Home'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className='relative'>
			<Head>
				<title>Nextup</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='absolute top-0 right-0 bottom-0 bg-background-pattern z-0 w-[26%] h-full'></div>
			<Homepage />
			<div className='bg-white myshadow'>
				<div className='max-w-screen-xl bg-white mx-auto'>
					<div className="lg:w-2/4" >
						<Footer className='!text-sm' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
