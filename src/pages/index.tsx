import Head from 'next/head'
import { Footer, Header } from '../components/shared'
import Homepage from '../components/home/Home'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className='relative bg-background-pattern'>
			<Head>
				<title>Nextup</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Homepage />
			<div className="lg:w-2/4" >
				<Footer />
			</div>
		</div>
	)
}

export default Home
