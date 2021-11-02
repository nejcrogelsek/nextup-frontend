import { FC } from 'react'

const Footer: FC = () => {
	return (
		<footer className='flex items-center justify-between w-full h-24 pl-4 pr-8 md:pl-8 myshadow'>
			<a href='/signin' className='transform scale-50 md:scale-100'>
				<img src='/logo.svg' alt='Nextup' className='md:hidden' />
				<img src='/logo.png' alt='Nextup' className='hidden md:block' />
			</a>
			<p className='text-xs md:text-base text-right'>All Rights Reserved | skillupmentor.com</p>
		</footer>
	)
}

export default Footer
