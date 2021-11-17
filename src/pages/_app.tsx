import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { Header } from '../components/shared';
import { useEffect } from 'react';
import userStore from '../stores/user.store';
import { accessTokenFC, refreshTokenFC } from './api/auth.actions';

const progress = new ProgressBar({
	size: 4,
	color: '#2f3c7e',
	className: 'z-50',
	delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);

function NextupApp({ Component, pageProps }) {
	const checkIfAccessTokenExists = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			const res = await accessTokenFC(token)
			if (res.data) {
				userStore.login(res.data)
				await checkForRefreshToken()
			}
		}
	}

	const checkForRefreshToken = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			const payload = JSON.parse(getPayload())
			const expiration = new Date(payload.exp)
			const now = new Date()
			const minutes = 1000 * 60 * 14
			if (expiration.getTime() - now.getTime() < minutes) {
				const res = await refreshTokenFC(payload.email, payload.id, token)
				if (res.data) {
					localStorage.setItem('user', res.data.access_token)
				}
			}
		}
	}

	const getPayload = () => {
		const token: string = localStorage.getItem('user')!
		return atob(token.split('.')[1])
	}

	useEffect(() => {
		checkIfAccessTokenExists()
		const interval = setInterval(() => {
			checkForRefreshToken()
		}, 1000 * 60 * 14)

		return () => clearInterval(interval)
	}, [])

	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}

export default NextupApp;