import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { useEffect } from 'react';
import eventStore from '../stores/event.store';

const progress = new ProgressBar({
	size: 4,
	color: '#2f3c7e',
	className: 'z-50',
	delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);

function NextupApp({ Component, pageProps }) {
	const getRecentEvents = async () => {
		await eventStore.getEvents()
	}

	useEffect(() => {
		getRecentEvents()
	}, [])
	return <Component {...pageProps} />;
}

export default NextupApp;