import { Avatar } from '@material-ui/core'
import Link from 'next/link'
import { observer } from 'mobx-react'
import router from 'next/router'
import { FC } from 'react'

const NavDesktop: FC = () => {
	const user = false
	const signout = () => {
		console.log('logout')
		router.push('/')
	}

	return (
		<nav>
			{user ? (
				<>
					<ul>
						<li>
							<Link href='/'>
								<a>Home</a>
							</Link>
						</li>
						<li>
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
					<ul>
						<li>
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
					<ul>
						<li>
							<Link href='/'><a>Home</a></Link>
						</li>
						<li>
							<Link href='/search'><a>Search</a></Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link href='/login'><a>Login</a></Link>
						</li>
						<li>
							<Link href='/signup'><a>Sign up</a></Link>
						</li>
					</ul>
				</>
			)}
		</nav>
	)
}

export default observer(NavDesktop)
