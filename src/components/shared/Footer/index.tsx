import { FC } from 'react'
import Link from 'next/link'

const Footer: FC = () => {
	return (
		<footer className='flex items-center justify-between w-full h-24 app-padding pl-4 md:pl-8 myshadow mt-px lg:mt-0 bg-white'>
			<Link href='/'>
				<a className='transform scale-50 md:scale-100'>
					<img src='/logo.svg' alt='Nextup' className='md:hidden' />
					<img src='/logo.png' alt='Nextup' className='hidden md:block' />
				</a>
			</Link>
			<p className='text-xs md:text-base text-right'>All Rights Reserved | skillupmentor.com</p>
		</footer>
	)
}

export default Footer
