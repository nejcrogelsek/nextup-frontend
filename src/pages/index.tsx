import Head from 'next/head'
import { Footer, Header } from '../components/shared'
import Homepage from '../components/home/Home'

export default function Home() {
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
