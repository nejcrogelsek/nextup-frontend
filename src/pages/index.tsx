import Head from 'next/head'
import { Footer, Header } from '../components/shared'
import Homepage from '../components/home/Home'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<div>
			<Head>
				<title>Nextup</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Homepage />
			<Footer />
		</div>
	)
}

export default Home
