import { Avatar } from '@material-ui/core'
import { observer } from 'mobx-react'
import { FC } from 'react'
import ArrowRightIcon from '../../../icons/ArrowRight'
import CloseIcon from '../../../icons/CloseIcon'
import Link from 'next/link'
import router from 'next/router'
import userStore from '../../../../stores/user.store'

interface Props {
	toggleNav: () => void
	toggle: boolean
}

const NavMobile: FC<Props> = ({ toggleNav, toggle }: Props) => {
	const signout = () => {
		toggleNav()
		localStorage.removeItem('user')
		userStore.logout()
	}

	const navigateTo = (pathname: string) => {
		toggleNav()
		router.push(`${pathname}`)
	}

	return (
		<nav className={toggle ? 'fixed z-20 top-0 left-0 right-0 px-8 py-8 bg-alternative transition transform translate-y-0 myshadow' : 'fixed top-0 left-0 right-0 px-8 py-8 bg-white transition transform -translate-y-full myshadow'}>
			<div>
				<div className='flex justify-end items-center mb-6' onClick={() => toggleNav()}>
					<CloseIcon width='28' height='28' fill='#2f3c7e' />
				</div>
				<ul>
					{userStore.user ? (
						<>
							<li className='mt-6 mb-12'>
								<button className='flex justify-start items-center text-2xl' onClick={() => navigateTo('/profile')}>
									<Avatar src='undefined' className='shadow-md !w-12 !h-12' />
									<span className='ml-8 text-primary'>
										Nejc Rogelšek
									</span>
								</button>
							</li>
							<li className='mb-4'>
								<Link href='/'>
									<a className='flex justify-between items-center'>
										<span className='text-2xl text-primary'>Home</span>
										<ArrowRightIcon fill='#2f3c7e' />
									</a>
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/search'>
									<a className='flex justify-between items-center'>
										<span className='text-2xl text-primary'>Search</span>
										<ArrowRightIcon fill='#2f3c7e' />
									</a>
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/event-manager'>
									<a className='flex justify-between items-center'>
										<span className='text-2xl text-primary'>Event manager</span>
										<ArrowRightIcon fill='#2f3c7e' />
									</a>
								</Link>
							</li>
							<li>
								<button className='flex w-full justify-between items-center' onClick={() => signout()}>
									<span className='text-2xl text-black'>Logout</span>
									<ArrowRightIcon fill='#2d2d2d' />
								</button>
							</li>
						</>
					) : (
						<>
							<li className='mb-4'>
								<Link href='/'>
									<a className='flex justify-between items-center'>
										<span className='text-2xl text-primary'>Home</span>
										<ArrowRightIcon fill='#2f3c7e' />
									</a>
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/search'>
									<a className='flex justify-between items-center'>
										<span className='text-2xl text-primary'>Search</span>
										<ArrowRightIcon fill='#2f3c7e' />
									</a>
								</Link>
							</li>
							<li>
								<Link href='/login'>
									<a className='bg-primary w-full text-white px-4 py-2 rounded-3xl flex justify-center items-center'>Login</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	)
}

export default observer(NavMobile)
