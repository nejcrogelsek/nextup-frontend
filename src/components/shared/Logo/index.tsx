import { FC } from 'react'
import Link from 'next/link'

const Logo: FC = () => {
	return (
		<Link href='/event'>
			<a><img src='./logo.svg' alt='Nextup' className='w-9 h-9 md:w-14 md:h-14' /></a>
		</Link>
	)
}

export default Logo
