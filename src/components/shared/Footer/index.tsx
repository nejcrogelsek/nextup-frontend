import { FC } from 'react'
import Link from 'next/link'

interface Props {
	className?: string
}

const Footer: FC<Props> = ({ className }: Props) => {
	return (
		<footer className='w-full h-24'>
			<div className='flex items-center justify-between max-w-screen-xl mx-auto w-full h-24 app-padding pl-4 md:pl-8 mt-px lg:mt-0'>
				<Link href='/'>
					<a className='transform scale-50 md:scale-100'>
						<img src='/logo.svg' alt='Nextup' className='md:hidden' />
						<img src='/logo.png' alt='Nextup' className='hidden md:block' />
					</a>
				</Link>
				<p className={`text-xs md:text-base text-right ${className}`}>All Rights Reserved | skillupmentor.com</p>
			</div>
		</footer>
	)
}

export default Footer
