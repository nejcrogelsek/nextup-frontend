import Head from 'next/head'
import { Footer, Header } from '../components/shared'
import Homepage from '../components/home/Home'

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Nextup</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			<Homepage />
			<footer className="flex items-center justify-center w-full h-24 border-t">
				<a
					className="flex items-center justify-center"
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/logo.svg" alt="Vercel Logo" className="h-4 ml-2" />
				</a>
			</footer>
			<Footer />
		</div>
	)
}
