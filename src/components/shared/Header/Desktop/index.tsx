import { Avatar } from '@material-ui/core'
import Link from 'next/link'
import { observer } from 'mobx-react'
import { FC } from 'react'
import userStore from '../../../../stores/user.store'
import router from 'next/router'

const NavDesktop: FC = () => {
	const signout = () => {
		localStorage.removeItem('user')
		userStore.logout()
	}

	return (
		<nav className='flex-grow flex justify-center items-center relative h-12'>
			{userStore.user ? (
				<>
					<ul className='flex justify-center items-center h-6'>
						<li className='mr-12'>
							<Link href='/'>
								<a>Home</a>
							</Link>
						</li>
						<li className='mr-12'>
							<Link href='/search'>
								<a>Search</a>
							</Link>
						</li>
						<li>
							<Link href='/event-manager'>
								<a>Event manager</a>
							</Link>
						</li>
					</ul>
					<ul className='absolute right-0 top-0 flex justify-center items-center h-12'>
						<li className='mr-4'>
							<button onClick={() => signout()}>Logout</button>
						</li>
						<li>
							<Link href='/profile'>
								<a>
									<Avatar src='undefined' />
								</a>
							</Link>
						</li>
					</ul>
				</>
			) : (
				<>
					<ul className='flex justify-center items-center h-12'>
						<li className='mr-12'>
							<Link href='/'><a>Home</a></Link>
						</li>
						<li className='mr-12'>
							<Link href='/search'><a>Search</a></Link>
						</li>
					</ul>
					<ul className='absolute right-0 top-0 flex justify-center items-center h-12'>
						<li className='mr-10'>
							<Link href='/login'><a>Login</a></Link>
						</li>
						<li>
							<Link href='/signup'><a className='bg-primary w-28 text-white px-4 py-2 rounded-3xl flex justify-center items-center transition hover:bg-black'>Sign up</a></Link>
						</li>
					</ul>
				</>
			)}
		</nav>
	)
}

export default observer(NavDesktop)
